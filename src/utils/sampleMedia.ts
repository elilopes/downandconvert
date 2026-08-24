/**
 * Generates rich in-browser sample video files with audio tracks for instant demo testing
 */

export interface SampleVideoOption {
  id: string;
  name: string;
  category: string;
  duration: number;
  description: string;
  bpm: number;
}

export const SAMPLE_VIDEOS: SampleVideoOption[] = [
  {
    id: 'lofi-sunset',
    name: 'Pôr do Sol Lo-Fi & Beats',
    category: 'Música & Relax',
    duration: 10,
    description: 'Vídeo animado com acordes suaves de piano e sintetizador suave',
    bpm: 85,
  },
  {
    id: 'podcast-intro',
    name: 'Introdução de Podcast & Locução',
    category: 'Podcast / Voz',
    duration: 8,
    description: 'Apresentação com música tema e voz sintética de teste',
    bpm: 110,
  },
  {
    id: 'synthwave-drive',
    name: 'Synthwave 80s Cyber Neon',
    category: 'Eletrônica / Beat',
    duration: 12,
    description: 'Ritmo energizante anos 80 com linha de baixo marcante',
    bpm: 124,
  },
];

/**
 * Creates a real playable WebM/MP4 video file in-browser with rich visual canvas & synthesized music
 */
export async function generateSampleVideoFile(sample: SampleVideoOption): Promise<File> {
  const width = 640;
  const height = 360;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const fps = 30;
  const totalFrames = sample.duration * fps;
  const canvasStream = canvas.captureStream(fps);

  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const dest = audioCtx.createMediaStreamDestination();

  // Create synthesis music
  createSampleSynthesizerMusic(audioCtx, dest, sample);

  // Combine audio and video streams
  const combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...dest.stream.getAudioTracks(),
  ]);

  let mimeType = 'video/webm;codecs=vp8,opus';
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'video/webm';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = '';
    }
  }

  const mediaRecorder = new MediaRecorder(combinedStream, mimeType ? { mimeType } : undefined);
  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordingPromise = new Promise<File>((resolve, reject) => {
    mediaRecorder.onstop = () => {
      audioCtx.close();
      const blob = new Blob(chunks, { type: mimeType || 'video/webm' });
      const file = new File([blob], `${sample.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.mp4`, {
        type: 'video/mp4',
      });
      resolve(file);
    };
    mediaRecorder.onerror = (err) => {
      audioCtx.close();
      reject(err);
    };
  });

  mediaRecorder.start();

  // Draw animated frames
  let frame = 0;
  const interval = setInterval(() => {
    if (frame >= totalFrames) {
      clearInterval(interval);
      mediaRecorder.stop();
      return;
    }

    const t = frame / fps;
    renderCanvasFrame(ctx, width, height, t, sample);
    frame++;
  }, 1000 / fps);

  return recordingPromise;
}

function renderCanvasFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  sample: SampleVideoOption
) {
  // Dynamic Background Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  if (sample.id === 'lofi-sunset') {
    grad.addColorStop(0, '#31103f');
    grad.addColorStop(0.5, '#78244c');
    grad.addColorStop(1, '#ea6644');
  } else if (sample.id === 'podcast-intro') {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e293b');
    grad.addColorStop(1, '#0284c7');
  } else {
    grad.addColorStop(0, '#0d0221');
    grad.addColorStop(0.5, '#261447');
    grad.addColorStop(1, '#ff3864');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Animated visualizer circle or wave
  const centerX = width / 2;
  const centerY = height / 2 - 20;

  // Draw animated neon circle / sun
  ctx.save();
  ctx.beginPath();
  const pulse = Math.sin(t * 4) * 8;
  const radius = 55 + pulse;
  const sunGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
  sunGrad.addColorStop(0, '#fed7aa');
  sunGrad.addColorStop(0.8, '#f97316');
  sunGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
  ctx.fillStyle = sunGrad;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw dynamic soundwave bars in video
  const numBars = 36;
  const barWidth = 6;
  const spacing = 4;
  const totalW = numBars * (barWidth + spacing);
  const startX = (width - totalW) / 2;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  for (let i = 0; i < numBars; i++) {
    const freq = Math.sin(t * 6 + i * 0.4) * 0.5 + 0.5;
    const barH = 15 + freq * 45;
    const x = startX + i * (barWidth + spacing);
    const y = height - 90 - barH / 2;
    
    // Rounded bars
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, [3]);
    ctx.fill();
  }

  // Titles
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(sample.name, centerX, height - 42);

  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText(`Vídeo de Demonstração • ${Math.floor(t)}s / ${sample.duration}s • 48kHz Stereo`, centerX, height - 20);
}

function createSampleSynthesizerMusic(
  audioCtx: AudioContext,
  dest: MediaStreamAudioDestinationNode,
  sample: SampleVideoOption
) {
  const chords =
    sample.id === 'synthwave-drive'
      ? [
          [220.0, 261.63, 329.63, 392.0], // Am7
          [174.61, 220.0, 261.63, 329.63], // Fmaj7
          [261.63, 329.63, 392.0, 493.88], // Cmaj7
          [196.0, 246.94, 293.66, 349.23], // G7
        ]
      : [
          [261.63, 329.63, 392.0, 523.25], // C
          [220.0, 261.63, 329.63, 440.0],  // Am
          [174.61, 220.0, 261.63, 349.23], // F
          [196.0, 246.94, 293.66, 392.0],  // G
        ];

  const now = audioCtx.currentTime;
  const beatSec = 60 / sample.bpm;
  const chordSec = beatSec * 4;

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.25, now);
  masterGain.connect(dest);

  // Play chord progression
  for (let c = 0; c < Math.ceil(sample.duration / chordSec) + 1; c++) {
    const chordNotes = chords[c % chords.length];
    const startTime = now + c * chordSec;

    chordNotes.forEach((freq, noteIdx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = sample.id === 'synthwave-drive' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Add gentle vibrato
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400 + noteIdx * 300, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + chordSec - 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + chordSec);
    });

    // Rhythm bass kick / click
    const kickOsc = audioCtx.createOscillator();
    const kickGain = audioCtx.createGain();
    kickOsc.type = 'triangle';
    kickOsc.frequency.setValueAtTime(120, startTime);
    kickOsc.frequency.exponentialRampToValueAtTime(35, startTime + 0.3);

    kickGain.gain.setValueAtTime(0.4, startTime);
    kickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

    kickOsc.connect(kickGain);
    kickGain.connect(masterGain);

    kickOsc.start(startTime);
    kickOsc.stop(startTime + 0.4);
  }
}
