export type AudioFormat = 'mp3' | 'wav' | 'aiff' | 'aac' | 'm4a' | 'flac' | 'wma' | 'ogg';
export type VideoFormat = 'mp4' | 'webm' | 'avi' | 'mov' | 'mkv' | 'gif';

export type OutputFormat = AudioFormat | VideoFormat;

export type EqualizerPreset = 'flat' | 'bass-boost' | 'vocal' | 'treble' | 'acoustic' | 'podcast';

export interface ID3Metadata {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  includeCover?: boolean;
  coverImage?: string; // base64 or blob URL
}

export interface CropOptions {
  enabled: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: 'rect' | 'circle';
}

export interface ConversionOptions {
  format: OutputFormat;
  bitrate: 64 | 128 | 192 | 256 | 320;
  sampleRate: 22050 | 44100 | 48000;
  channels: 'stereo' | 'mono';
  volume: number; // 0.1 to 3.0 (1.0 is 100%)
  trim: {
    enabled: boolean;
    start: number; // in seconds
    end: number; // in seconds
  };
  fadeIn: number; // in seconds
  fadeOut: number; // in seconds
  equalizer: EqualizerPreset;
  metadata: ID3Metadata;
  // Video specific options
  videoQuality?: 'high' | 'medium' | 'low' | 'very_low';
  crop?: CropOptions;
}

export type ConversionStatus =
  | 'idle'
  | 'reading'
  | 'decoding'
  | 'processing'
  | 'encoding'
  | 'completed'
  | 'error';

export interface VideoItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  duration: number; // seconds
  thumbnailUrl: string;
  status: ConversionStatus;
  progress: number; // 0 - 100
  progressText: string;
  error?: string;
  options: ConversionOptions;
  
  // Output result
  outputBlob?: Blob;
  outputUrl?: string;
  outputSize?: number;
  
  // Cached audio for quick editing
  audioBuffer?: AudioBuffer;
  waveformPeaks?: number[];
  videoElement?: HTMLVideoElement;
}
