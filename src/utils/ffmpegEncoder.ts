import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { ConversionOptions, AudioFormat } from '../types';

let ffmpeg: FFmpeg | null = null;

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg) {
    return ffmpeg;
  }
  
  ffmpeg = new FFmpeg();
  
  // Loading single-threaded version to avoid SharedArrayBuffer / CORS headers issues
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  return ffmpeg;
}

const toBlobURL = async (url: string, mimeType: string): Promise<string> => {
  const resp = await fetch(url);
  const blob = await resp.blob();
  return URL.createObjectURL(new Blob([blob], { type: mimeType }));
};

export async function encodeWithFFmpeg(
  wavBlob: Blob,
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const ff = await getFFmpeg();
  
  // Write input file
  const inputName = 'input.wav';
  const formatExt = options.format === 'aac' ? 'aac' : 
                   options.format === 'm4a' ? 'm4a' :
                   options.format === 'flac' ? 'flac' :
                   options.format === 'wma' ? 'wma' :
                   options.format === 'aiff' ? 'aiff' :
                   options.format === 'ogg' ? 'ogg' : 'mp3';
                   
  const outputName = `output.${formatExt}`;
  
  await ff.writeFile(inputName, await fetchFile(wavBlob));
  
  ff.on('progress', ({ progress, time }) => {
    if (onProgress) {
      onProgress(Math.min(99, Math.round(progress * 100)));
    }
  });

  // Prepare ffmpeg arguments
  const args = ['-i', inputName];
  
  // Add metadata
  if (options.metadata.title) args.push('-metadata', `title=${options.metadata.title}`);
  if (options.metadata.artist) args.push('-metadata', `artist=${options.metadata.artist}`);
  if (options.metadata.album) args.push('-metadata', `album=${options.metadata.album}`);
  if (options.metadata.genre) args.push('-metadata', `genre=${options.metadata.genre}`);

  // Format specific arguments
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
      // Fallback
      args.push('-b:a', `${options.bitrate}k`);
  }
  
  args.push(outputName);
  
  // Run ffmpeg
  await ff.exec(args);
  
  const data = await ff.readFile(outputName);
  
  // Cleanup
  await ff.deleteFile(inputName);
  await ff.deleteFile(outputName);
  
  let mimeType = 'audio/mpeg';
  if (formatExt === 'aac') mimeType = 'audio/aac';
  else if (formatExt === 'm4a') mimeType = 'audio/mp4';
  else if (formatExt === 'flac') mimeType = 'audio/flac';
  else if (formatExt === 'wma') mimeType = 'audio/x-ms-wma';
  else if (formatExt === 'ogg') mimeType = 'audio/ogg';
  else if (formatExt === 'aiff') mimeType = 'audio/aiff';
  
  return new Blob([data], { type: mimeType });
}
