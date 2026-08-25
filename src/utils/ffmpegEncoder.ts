import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { ConversionOptions } from '../types';

let ffmpegInstance: FFmpeg | null = null;
let isLoadingInstance = false;

const toBlobURL = async (url: string, mimeType: string): Promise<string> => {
  const resp = await fetch(url);
  const blob = await resp.blob();
  return URL.createObjectURL(new Blob([blob], { type: mimeType }));
};

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    return ffmpegInstance;
  }

  if (isLoadingInstance) {
    // Wait for existing load promise
    while (isLoadingInstance) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (ffmpegInstance && ffmpegInstance.loaded) {
      return ffmpegInstance;
    }
  }

  isLoadingInstance = true;

  try {
    const ff = new FFmpeg();
    
    // Single-threaded core build for maximum compatibility across browsers
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
    const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

    await ff.load({
      coreURL,
      wasmURL,
    });

    ffmpegInstance = ff;
    return ffmpegInstance;
  } catch (err) {
    console.error('Falha ao inicializar WebAssembly FFmpeg:', err);
    ffmpegInstance = null;
    throw new Error('Não foi possível inicializar o conversor WebAssembly no seu navegador. Certifique-se de usar um navegador atualizado.');
  } finally {
    isLoadingInstance = false;
  }
}

export async function resetFFmpeg(): Promise<void> {
  if (ffmpegInstance) {
    try {
      ffmpegInstance.terminate();
    } catch {
      // ignore
    }
    ffmpegInstance = null;
  }
}

export async function encodeWithFFmpeg(
  inputBlob: Blob,
  options: ConversionOptions,
  onProgress?: (progress: number) => void,
  isVideo: boolean = false
): Promise<Blob> {
  let ff: FFmpeg;
  try {
    ff = await getFFmpeg();
  } catch (err) {
    await resetFFmpeg();
    throw err;
  }

  const uniqueId = Math.random().toString(36).substring(2, 8);
  const inputExt = isVideo ? (options.format === 'webm' ? 'webm' : 'mp4') : 'wav';
  const inputName = `input_${uniqueId}.${inputExt}`;

  const formatExt = options.format === 'aac' ? 'aac' :
                   options.format === 'm4a' ? 'm4a' :
                   options.format === 'flac' ? 'flac' :
                   options.format === 'wma' ? 'wma' :
                   options.format === 'aiff' ? 'aiff' :
                   options.format === 'ogg' ? 'ogg' :
                   options.format === 'mp4' ? 'mp4' :
                   options.format === 'webm' ? 'webm' :
                   options.format === 'avi' ? 'avi' :
                   options.format === 'mov' ? 'mov' :
                   options.format === 'mkv' ? 'mkv' : 'mp3';

  const outputName = `output_${uniqueId}.${formatExt}`;

  const progressHandler = ({ progress }: { progress: number }) => {
    if (onProgress && progress >= 0) {
      onProgress(Math.min(99, Math.max(1, Math.round(progress * 100))));
    }
  };

  try {
    ff.on('progress', progressHandler);

    // Fetch and write file into virtual memory
    const fileData = await fetchFile(inputBlob);
    await ff.writeFile(inputName, fileData);

    const args: string[] = ['-i', inputName];

    if (isVideo) {
      // Build video filter chain (crop + scale)
      const vFilters: string[] = [];
      if (options.crop && options.crop.enabled && options.crop.width > 0 && options.crop.height > 0) {
        const cropW = Math.max(2, Math.floor(options.crop.width / 2) * 2);
        const cropH = Math.max(2, Math.floor(options.crop.height / 2) * 2);
        const cropX = Math.max(0, Math.floor(options.crop.x));
        const cropY = Math.max(0, Math.floor(options.crop.y));
        vFilters.push(`crop=${cropW}:${cropH}:${cropX}:${cropY}`);
      }
      vFilters.push("scale='min(1280,iw)':-2");
      const vfString = vFilters.join(',');

      // Optimized parameters for browser WebAssembly memory safety
      const preset = options.videoQuality === 'high' ? 'fast' : options.videoQuality === 'low' ? 'ultrafast' : 'veryfast';
      const crf = options.videoQuality === 'high' ? '22' : options.videoQuality === 'low' ? '30' : '26';

      switch (options.format) {
        case 'webm':
          // Scale to max 720p to prevent WASM heap memory overflow
          args.push('-vf', vfString, '-c:v', 'libvpx-vp9', '-crf', crf, '-b:v', '0', '-cpu-used', '4', '-c:a', 'libopus', '-threads', '1');
          break;
        case 'mp4':
        case 'mkv':
        case 'mov':
          // Scale to max 720p with ultrafast/veryfast for stability in browser
          args.push('-vf', vfString, '-c:v', 'libx264', '-preset', preset, '-crf', crf, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-threads', '1');
          break;
        case 'avi':
          args.push('-vf', vfString, '-c:v', 'mpeg4', '-q:v', '6', '-c:a', 'libmp3lame', '-threads', '1');
          break;
        default:
          if (vFilters.length > 0) {
            args.push('-vf', vfString, '-c:v', 'libx264', '-preset', preset, '-c:a', 'copy');
          } else {
            args.push('-c:v', 'copy', '-c:a', 'copy');
          }
      }
    } else {
      // Audio metadata
      if (options.metadata.title) args.push('-metadata', `title=${options.metadata.title}`);
      if (options.metadata.artist) args.push('-metadata', `artist=${options.metadata.artist}`);
      if (options.metadata.album) args.push('-metadata', `album=${options.metadata.album}`);
      if (options.metadata.genre) args.push('-metadata', `genre=${options.metadata.genre}`);

      // Audio codecs
      switch (options.format) {
        case 'aac':
        case 'm4a':
          args.push('-c:a', 'aac', '-b:a', `${options.bitrate}k`);
          break;
        case 'flac':
          args.push('-c:a', 'flac');
          break;
        case 'wma':
          args.push('-c:a', 'wmav2', '-b:a', `${options.bitrate}k`);
          break;
        case 'ogg':
          args.push('-c:a', 'libvorbis', '-b:a', `${options.bitrate}k`);
          break;
        case 'aiff':
          args.push('-c:a', 'pcm_s16be');
          break;
        default:
          args.push('-b:a', `${options.bitrate}k`);
      }
    }

    args.push(outputName);

    // Execute FFmpeg
    const exitCode = await ff.exec(args);

    if (exitCode !== 0) {
      throw new Error(`FFmpeg finalizou com código de erro ${exitCode}.`);
    }

    const data = await ff.readFile(outputName);

    let mimeType = 'audio/mpeg';
    if (isVideo) {
      mimeType = options.format === 'mkv' ? 'video/x-matroska' : `video/${formatExt}`;
    } else {
      if (formatExt === 'aac') mimeType = 'audio/aac';
      else if (formatExt === 'm4a') mimeType = 'audio/mp4';
      else if (formatExt === 'flac') mimeType = 'audio/flac';
      else if (formatExt === 'wma') mimeType = 'audio/x-ms-wma';
      else if (formatExt === 'ogg') mimeType = 'audio/ogg';
      else if (formatExt === 'aiff') mimeType = 'audio/aiff';
    }

    return new Blob([data], { type: mimeType });
  } catch (err: unknown) {
    console.error('Erro na codificação FFmpeg:', err);
    // On any memory access or execution error, reset the instance to prevent zombie state
    await resetFFmpeg();

    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes('memory access out of bounds') || errMsg.includes('OOM')) {
      throw new Error('O vídeo é muito pesado para a memória do navegador. Tente um arquivo menor ou converta diretamente para MP3/WAV.');
    }
    throw new Error(`Falha na conversão via WebAssembly: ${errMsg}`);
  } finally {
    // Virtual file system cleanup
    try {
      ff.off('progress', progressHandler);
      await ff.deleteFile(inputName).catch(() => {});
      await ff.deleteFile(outputName).catch(() => {});
    } catch {
      // Ignore cleanup errors
    }
  }
}
