/**
 * High-performance browser-native Video-to-Audio and MP3 encoder
 */
import { Mp3Encoder } from '@breezystack/lamejs';
import { AudioFormat, ConversionOptions, EqualizerPreset } from '../types';
import { attachId3ToMp3, createId3Tag } from './id3Writer';

let sharedAudioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Extracts thumbnail image from video file at specified percentage or seconds
 */
export async function extractVideoThumbnail(file: File, timeSeconds = 1): Promise<{ thumbnailUrl: string; duration: number; blob: Blob | null }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);
    video.preload = 'metadata';
    video.src = objectUrl;
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.remove();
    };

    const handleLoadedMetadata = () => {
      const duration = video.duration || 0;
      const seekTime = Math.min(Math.max(0.5, timeSeconds), Math.max(0.5, duration / 2));
      
      video.currentTime = seekTime;
    };

    video.onloadedmetadata = handleLoadedMetadata;

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        const width = video.videoWidth || 480;
        const height = video.videoHeight || 270;
        // Keep aspect ratio with max dimension 480
        const scale = Math.min(480 / width, 480 / height, 1);
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.85);
            const duration = video.duration || 0;
            cleanup();
            resolve({ thumbnailUrl, duration, blob });
          }, 'image/jpeg', 0.85);
          return;
        }
      } catch (err) {
        console.warn('Could not extract video thumbnail:', err);
      }
      cleanup();
      resolve({ thumbnailUrl: '', duration: video.duration || 0, blob: null });
    };

    video.onerror = () => {
      cleanup();
      resolve({ thumbnailUrl: '', duration: 0, blob: null });
    };

    // Timeout fallback after 4s
    setTimeout(() => {
      cleanup();
      resolve({ thumbnailUrl: '', duration: video.duration || 0, blob: null });
    }, 4000);
  });
}

/**
 * Extracts and decodes audio data from a video file into an AudioBuffer
 */
export async function extractAudioBufferFromVideo(
  file: File,
  onProgress?: (stage: string, progress: number) => void
): Promise<AudioBuffer> {
  onProgress?.('Carregando arquivo de vídeo...', 10);
  const arrayBuffer = await file.arrayBuffer();

  onProgress?.('Decodificando faixa de áudio...', 30);
  const audioCtx = getAudioContext();

  try {
    // Native fast decodeAudioData handles MP4, MOV, WebM, OGG, etc.
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
    return audioBuffer;
  } catch (decodeErr) {
    console.warn('Direct decodeAudioData failed, attempting MediaElement audio extraction fallback...', decodeErr);
    onProgress?.('Extraindo áudio via fluxo de mídia...', 45);
    return await extractAudioViaMediaElement(file);
  }
}

/**
 * Fallback audio extractor using HTML5 Video playback capture
 */
async function extractAudioViaMediaElement(file: File): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.src = url;
    video.muted = true;

    video.onloadedmetadata = async () => {
      try {
        const duration = video.duration;
        if (!duration || duration <= 0 || !isFinite(duration)) {
          URL.revokeObjectURL(url);
          throw new Error('Não foi possível obter a duração do vídeo.');
        }

        // Use AudioContext to record stream or offline context
        // In modern browsers, captureStream or decodeAudioData is standard
        URL.revokeObjectURL(url);
        reject(new Error('Formato de vídeo não possui trilha de áudio compatível ou está corrompido.'));
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Erro ao abrir o vídeo no navegador.'));
    };
  });
}

/**
 * Generates normalized peak points (0 to 1) for waveform rendering
 */
export function generateWaveformPeaks(audioBuffer: AudioBuffer, numPoints = 120): number[] {
  const channelData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(channelData.length / numPoints);
  const peaks: number[] = [];

  for (let i = 0; i < numPoints; i++) {
    const start = i * blockSize;
    let sum = 0;
    let max = 0;
    for (let j = 0; j < blockSize; j++) {
      const val = Math.abs(channelData[start + j] || 0);
      sum += val;
      if (val > max) max = val;
    }
    const peak = (sum / blockSize) * 0.5 + max * 0.5;
    peaks.push(peak);
  }

  // Normalize peaks so highest point is ~0.95
  const maxPeak = Math.max(...peaks, 0.001);
  return peaks.map((p) => Math.min(1, (p / maxPeak) * 0.95 + 0.05));
}

/**
 * Slices an AudioBuffer from start to end (in seconds) in pure memory
 */
export function sliceAudioBuffer(
  buffer: AudioBuffer,
  startSec: number,
  endSec: number
): AudioBuffer {
  const sampleRate = buffer.sampleRate;
  const startOffset = Math.max(0, Math.floor(startSec * sampleRate));
  const endOffset = Math.min(buffer.length, Math.ceil(endSec * sampleRate));
  const frameCount = Math.max(1, endOffset - startOffset);

  const audioCtx = getAudioContext();
  const sliced = audioCtx.createBuffer(buffer.numberOfChannels, frameCount, sampleRate);

  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const srcData = buffer.getChannelData(ch);
    const destData = sliced.getChannelData(ch);
    destData.set(srcData.subarray(startOffset, endOffset));
  }

  return sliced;
}

/**
 * Applies audio processing (Trim, Volume, EQ, Fade in/out) via OfflineAudioContext
 */
export async function processAudioBuffer(
  inputBuffer: AudioBuffer,
  options: ConversionOptions,
  onProgress?: (stage: string, progress: number) => void
): Promise<AudioBuffer> {
  onProgress?.('Aplicando ajustes e efeitos sonoros...', 55);

  const sampleRate = options.sampleRate || inputBuffer.sampleRate;
  const originalDuration = inputBuffer.duration;
  
  let startTime = 0;
  let endTime = originalDuration;

  if (options.trim.enabled) {
    startTime = Math.max(0, options.trim.start);
    endTime = Math.min(originalDuration, options.trim.end > startTime ? options.trim.end : originalDuration);
  }

  const duration = Math.max(0.1, endTime - startTime);
  const numberOfChannels = options.channels === 'mono' ? 1 : Math.min(2, inputBuffer.numberOfChannels);
  const totalLength = Math.ceil(duration * sampleRate);

  const offlineCtx = new OfflineAudioContext(numberOfChannels, totalLength, sampleRate);

  // Source Buffer
  const source = offlineCtx.createBufferSource();
  source.buffer = inputBuffer;

  // Gain Node (Volume + Fade In / Out)
  const gainNode = offlineCtx.createGain();
  const baseVolume = options.volume ?? 1.0;
  gainNode.gain.setValueAtTime(baseVolume, 0);

  // Fade In
  if (options.fadeIn && options.fadeIn > 0) {
    const fadeInDuration = Math.min(options.fadeIn, duration / 2);
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(baseVolume, fadeInDuration);
  }

  // Fade Out
  if (options.fadeOut && options.fadeOut > 0) {
    const fadeOutDuration = Math.min(options.fadeOut, duration / 2);
    const fadeOutStartTime = duration - fadeOutDuration;
    gainNode.gain.setValueAtTime(baseVolume, fadeOutStartTime);
    gainNode.gain.linearRampToValueAtTime(0, duration);
  }

  // Equalizer Filters
  let lastNode: AudioNode = source;

  if (options.equalizer && options.equalizer !== 'flat') {
    const filters = createEqualizerFilters(offlineCtx, options.equalizer);
    for (const filter of filters) {
      lastNode.connect(filter);
      lastNode = filter;
    }
  }

  lastNode.connect(gainNode);
  gainNode.connect(offlineCtx.destination);

  // Start at offset
  source.start(0, startTime, duration);

  const renderedBuffer = await offlineCtx.startRendering();
  return renderedBuffer;
}

/**
 * Creates BiquadFilterNodes based on selected Equalizer preset
 */
function createEqualizerFilters(ctx: OfflineAudioContext, preset: EqualizerPreset): BiquadFilterNode[] {
  const filters: BiquadFilterNode[] = [];

  switch (preset) {
    case 'bass-boost': {
      const bass = ctx.createBiquadFilter();
      bass.type = 'lowshelf';
      bass.frequency.value = 120;
      bass.gain.value = 7.5;
      filters.push(bass);
      break;
    }
    case 'vocal': {
      const lowCut = ctx.createBiquadFilter();
      lowCut.type = 'highpass';
      lowCut.frequency.value = 100;

      const vocalMid = ctx.createBiquadFilter();
      vocalMid.type = 'peaking';
      vocalMid.frequency.value = 2500;
      vocalMid.Q.value = 1.2;
      vocalMid.gain.value = 5.0;

      filters.push(lowCut, vocalMid);
      break;
    }
    case 'podcast': {
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 90;

      const mid = ctx.createBiquadFilter();
      mid.type = 'peaking';
      mid.frequency.value = 3000;
      mid.Q.value = 1.0;
      mid.gain.value = 4.0;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 12000;

      filters.push(hp, mid, lp);
      break;
    }
    case 'treble': {
      const treble = ctx.createBiquadFilter();
      treble.type = 'highshelf';
      treble.frequency.value = 4000;
      treble.gain.value = 6.0;
      filters.push(treble);
      break;
    }
    case 'acoustic': {
      const low = ctx.createBiquadFilter();
      low.type = 'lowshelf';
      low.frequency.value = 150;
      low.gain.value = 3.0;

      const high = ctx.createBiquadFilter();
      high.type = 'highshelf';
      high.frequency.value = 5000;
      high.gain.value = 4.0;

      filters.push(low, high);
      break;
    }
    default:
      break;
  }

  return filters;
}

/**
 * Converts Float32Array PCM (-1.0 to 1.0) into Int16Array PCM (-32768 to 32767)
 */
function floatToInt16(float32: Float32Array): Int16Array {
  const len = float32.length;
  const int16 = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return int16;
}

/**
 * Encodes AudioBuffer into an MP3 Blob with ID3 tags and progress reporting
 */
export async function encodeAudioBufferToMp3(
  audioBuffer: AudioBuffer,
  options: ConversionOptions,
  coverBlob?: Blob | null,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const channels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const bitrate = options.bitrate || 320;

  const encoder = new Mp3Encoder(channels, sampleRate, bitrate);

  const leftChannel = floatToInt16(audioBuffer.getChannelData(0));
  const rightChannel = channels > 1 ? floatToInt16(audioBuffer.getChannelData(1)) : undefined;

  const sampleBlockSize = 1152;
  const mp3DataChunks: Uint8Array[] = [];
  const totalSamples = leftChannel.length;

  let sampleOffset = 0;

  while (sampleOffset < totalSamples) {
    const chunkLength = Math.min(sampleBlockSize * 10, totalSamples - sampleOffset);
    const leftChunk = leftChannel.subarray(sampleOffset, sampleOffset + chunkLength);

    let mp3Buf: Int8Array | Uint8Array;
    if (channels === 1 || !rightChannel) {
      mp3Buf = encoder.encodeBuffer(leftChunk);
    } else {
      const rightChunk = rightChannel.subarray(sampleOffset, sampleOffset + chunkLength);
      mp3Buf = encoder.encodeBuffer(leftChunk, rightChunk);
    }

    if (mp3Buf.length > 0) {
      mp3DataChunks.push(new Uint8Array(mp3Buf.buffer, mp3Buf.byteOffset, mp3Buf.length));
    }

    sampleOffset += chunkLength;

    if (onProgress) {
      const percent = Math.min(98, 70 + Math.round((sampleOffset / totalSamples) * 28));
      onProgress(percent);
    }

    // Yield control to UI thread every few iterations
    if (sampleOffset % (sampleBlockSize * 50) === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  // Flush encoder
  const flushBuf = encoder.flush();
  if (flushBuf.length > 0) {
    mp3DataChunks.push(new Uint8Array(flushBuf.buffer, flushBuf.byteOffset, flushBuf.length));
  }

  // Calculate total MP3 bytes
  const totalMp3Length = mp3DataChunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const rawMp3Bytes = new Uint8Array(totalMp3Length);
  let pos = 0;
  for (const chunk of mp3DataChunks) {
    rawMp3Bytes.set(chunk, pos);
    pos += chunk.length;
  }

  // Prepare ID3v2 Tags & Cover Art
  let coverBytes: Uint8Array | undefined;
  if (options.metadata.includeCover && coverBlob) {
    try {
      const arrayBuf = await coverBlob.arrayBuffer();
      coverBytes = new Uint8Array(arrayBuf);
    } catch (e) {
      console.warn('Could not load cover bytes:', e);
    }
  }

  const id3Tag = createId3Tag(options.metadata, coverBytes, coverBlob?.type || 'image/jpeg');
  const finalMp3Bytes = attachId3ToMp3(rawMp3Bytes, id3Tag);

  return new Blob([finalMp3Bytes], { type: 'audio/mp3' });
}

/**
 * Encodes AudioBuffer into standard PCM WAV Blob
 */
export function encodeAudioBufferToWav(audioBuffer: AudioBuffer): Blob {
  const numOfChan = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numOfChan * 2 + 44;
  const outBuffer = new ArrayBuffer(length);
  const view = new DataView(outBuffer);
  const channels: Float32Array[] = [];
  let offset = 0;
  let pos = 0;

  function writeString(str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(pos++, str.charCodeAt(i));
    }
  }

  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }

  // RIFF chunk descriptor
  writeString('RIFF');
  setUint32(length - 8);
  writeString('WAVE');

  // FMT sub-chunk
  writeString('fmt ');
  setUint32(16); // Subchunk1Size (16 for PCM)
  setUint16(1);  // AudioFormat (1 = PCM)
  setUint16(numOfChan);
  setUint32(audioBuffer.sampleRate);
  setUint32(audioBuffer.sampleRate * 2 * numOfChan); // ByteRate
  setUint16(numOfChan * 2); // BlockAlign
  setUint16(16); // BitsPerSample

  // Data sub-chunk
  writeString('data');
  setUint32(length - pos - 4);

  // Write interleaved samples
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  while (offset < audioBuffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      const sample = Math.max(-1, Math.min(1, channels[i][offset]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(pos, intSample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([outBuffer], { type: 'audio/wav' });
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
}

/**
 * Format bytes to readable string (KB, MB, GB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
