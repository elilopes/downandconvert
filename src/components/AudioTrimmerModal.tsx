import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  X,
  Scissors,
  Sliders,
  Tag,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Check,
  Music,
  Download,
  Split,
  Layers,
  Sparkles,
  RefreshCw,
  Archive,
  PlusCircle,
  Clock,
  ListOrdered,
  FileAudio,
} from 'lucide-react';
import JSZip from 'jszip';
import { AudioFormat, ConversionOptions, EqualizerPreset, VideoItem } from '../types';
import {
  formatTime,
  formatBytes,
  extractAudioBufferFromVideo,
  generateWaveformPeaks,
  sliceAudioBuffer,
  processAudioBuffer,
  encodeAudioBufferToMp3,
  extractVideoThumbnail,
} from '../utils/audioEncoder';

export interface SplitSegment {
  id: string;
  index: number;
  title: string;
  start: number;
  end: number;
  duration: number;
}

interface AudioTrimmerModalProps {
  item: VideoItem;
  onClose: () => void;
  onSave: (updatedItem: VideoItem, shouldReconvert: boolean) => void;
  onAddSplitItems?: (newItems: VideoItem[]) => void;
}

export const AudioTrimmerModal: React.FC<AudioTrimmerModalProps> = ({
  item,
  onClose,
  onSave,
  onAddSplitItems,
}) => {
  const [activeTab, setActiveTab] = useState<'trim' | 'split' | 'effects' | 'tags'>('trim');

  // Options copy
  const [options, setOptions] = useState<ConversionOptions>({
    ...item.options,
    trim: {
      enabled: item.options.trim.enabled,
      start: item.options.trim.start || 0,
      end: item.options.trim.end > 0 ? item.options.trim.end : item.duration || 10,
    },
    metadata: {
      ...item.options.metadata,
      title: item.options.metadata.title || item.name.replace(/\.[^/.]+$/, ''),
    },
  });

  // AudioBuffer & Waveform loading state
  const [cachedAudioBuffer, setCachedAudioBuffer] = useState<AudioBuffer | null>(item.audioBuffer || null);
  const [cachedPeaks, setCachedPeaks] = useState<number[]>(item.waveformPeaks || []);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(!item.audioBuffer);
  const [loadingProgressText, setLoadingProgressText] = useState<string>('Carregando áudio...');

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSegmentId, setPlayingSegmentId] = useState<string | null>(null);
  const [playbackTime, setPlaybackTime] = useState(options.trim.start);

  // Single Snippet Exporting State
  const [isExportingSnippet, setIsExportingSnippet] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Split Mode State
  const [splitMode, setSplitMode] = useState<'interval' | 'equal'>('interval');
  const [intervalMinutes, setIntervalMinutes] = useState<number>(5); // default: 5 minutes
  const [intervalSeconds, setIntervalSeconds] = useState<number>(0);
  const [equalPartsCount, setEqualPartsCount] = useState<number>(3); // default: 3 parts
  const [isExportingAllPartsZip, setIsExportingAllPartsZip] = useState(false);
  const [exportingPartId, setExportingPartId] = useState<string | null>(null);
  const [zipProgress, setZipProgress] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const duration = cachedAudioBuffer?.duration || item.duration || 10;

  // Ensure AudioBuffer is decoded for fast trimming and previewing
  useEffect(() => {
    let isCancelled = false;
    if (!cachedAudioBuffer && item.file) {
      setIsLoadingAudio(true);
      extractAudioBufferFromVideo(item.file, (stage, progress) => {
        if (!isCancelled) {
          setLoadingProgressText(`${stage} (${progress}%)`);
        }
      })
        .then((buf) => {
          if (!isCancelled) {
            setCachedAudioBuffer(buf);
            const peaks = generateWaveformPeaks(buf, 120);
            setCachedPeaks(peaks);
            setIsLoadingAudio(false);
            if (options.trim.end === 0 || options.trim.end > buf.duration) {
              setOptions((prev) => ({
                ...prev,
                trim: { ...prev.trim, end: buf.duration },
              }));
            }
          }
        })
        .catch((err) => {
          console.warn('Failed to pre-decode audio buffer in modal:', err);
          if (!isCancelled) setIsLoadingAudio(false);
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [item.file]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {}
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsPlaying(false);
    setPlayingSegmentId(null);
  };

  const playPreview = async (customStart?: number, customEnd?: number, segmentId?: string) => {
    if (isPlaying && (!segmentId || playingSegmentId === segmentId)) {
      stopAudio();
      return;
    }

    if (!cachedAudioBuffer) return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioCtx();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    stopAudio();

    const source = ctx.createBufferSource();
    source.buffer = cachedAudioBuffer;

    // Gain node for volume
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(options.volume || 1.0, ctx.currentTime);

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    const start = customStart !== undefined ? customStart : options.trim.enabled ? options.trim.start : 0;
    const end = customEnd !== undefined ? customEnd : options.trim.enabled ? options.trim.end : duration;
    const playDuration = Math.max(0.1, end - start);

    source.start(0, start, playDuration);
    sourceNodeRef.current = source;
    startTimeRef.current = ctx.currentTime - start;
    setIsPlaying(true);
    setPlayingSegmentId(segmentId || null);

    const updatePlayhead = () => {
      if (!sourceNodeRef.current) return;
      const current = ctx.currentTime - startTimeRef.current;
      if (current >= end) {
        stopAudio();
        setPlaybackTime(start);
        return;
      }
      setPlaybackTime(current);
      animFrameRef.current = requestAnimationFrame(updatePlayhead);
    };
    animFrameRef.current = requestAnimationFrame(updatePlayhead);

    source.onended = () => {
      stopAudio();
      setPlaybackTime(start);
    };
  };

  // Draw Waveform & Trimmer region
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    const height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    ctx.clearRect(0, 0, width, height);

    const peaks = cachedPeaks.length > 0 ? cachedPeaks : item.waveformPeaks || [];
    const numBars = peaks.length || 80;
    const barWidth = width / numBars;

    const trimStartPos = options.trim.enabled ? (options.trim.start / duration) * width : 0;
    const trimEndPos = options.trim.enabled ? (options.trim.end / duration) * width : width;

    // Draw unselected dim regions
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    if (trimStartPos > 0) {
      ctx.fillRect(0, 0, trimStartPos, height);
    }
    if (trimEndPos < width) {
      ctx.fillRect(trimEndPos, 0, width - trimEndPos, height);
    }

    // Draw active trim highlight
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.fillRect(trimStartPos, 0, trimEndPos - trimStartPos, height);

    // Draw bars
    for (let i = 0; i < numBars; i++) {
      const peak = peaks[i] || 0.4;
      const barX = i * barWidth;
      const barH = peak * height * 0.82;
      const barY = (height - barH) / 2;

      const isInsideTrim = barX >= trimStartPos && barX <= trimEndPos;

      ctx.fillStyle = isInsideTrim ? '#10b981' : '#334155';
      ctx.beginPath();
      ctx.roundRect(barX + 1, barY, Math.max(2, barWidth - 2), barH, 2);
      ctx.fill();
    }

    // Draw Trim handles
    if (options.trim.enabled) {
      // Start Handle
      ctx.fillStyle = '#34d399';
      ctx.fillRect(trimStartPos - 2, 0, 4, height);
      ctx.beginPath();
      ctx.arc(trimStartPos, 14, 8, 0, Math.PI * 2);
      ctx.fill();

      // End Handle
      ctx.fillStyle = '#34d399';
      ctx.fillRect(trimEndPos - 2, 0, 4, height);
      ctx.beginPath();
      ctx.arc(trimEndPos, height - 14, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Playhead
    if (isPlaying) {
      const playheadX = (playbackTime / duration) * width;
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(playheadX - 1.5, 0, 3, height);
    }
  }, [options.trim, cachedPeaks, item.waveformPeaks, duration, isPlaying, playbackTime]);

  // Calculate split segments
  const splitSegments = useMemo<SplitSegment[]>(() => {
    const totalDuration = duration;
    if (totalDuration <= 0) return [];

    const segments: SplitSegment[] = [];
    const baseTitle = options.metadata.title || item.name.replace(/\.[^/.]+$/, '');

    if (splitMode === 'interval') {
      const intervalInSec = Math.max(5, intervalMinutes * 60 + intervalSeconds);
      let currentStart = 0;
      let idx = 1;

      while (currentStart < totalDuration) {
        const currentEnd = Math.min(totalDuration, currentStart + intervalInSec);
        segments.push({
          id: `seg_${idx}_${Date.now()}`,
          index: idx,
          title: `${baseTitle} - Parte ${idx}`,
          start: currentStart,
          end: currentEnd,
          duration: currentEnd - currentStart,
        });
        currentStart = currentEnd;
        idx++;
      }
    } else {
      // Equal parts
      const parts = Math.max(2, Math.min(30, equalPartsCount));
      const partDuration = totalDuration / parts;

      for (let i = 0; i < parts; i++) {
        const start = i * partDuration;
        const end = i === parts - 1 ? totalDuration : (i + 1) * partDuration;
        segments.push({
          id: `seg_${i + 1}_${Date.now()}`,
          index: i + 1,
          title: `${baseTitle} - Parte ${i + 1}`,
          start,
          end,
          duration: end - start,
        });
      }
    }

    return segments;
  }, [duration, splitMode, intervalMinutes, intervalSeconds, equalPartsCount, options.metadata.title, item.name]);

  // Direct Client-Side Export of Selected Snippet
  const handleExportSnippetNow = async () => {
    if (!cachedAudioBuffer || isExportingSnippet) return;

    setIsExportingSnippet(true);
    setExportProgress(10);
    try {
      // 1. Slice buffer in memory
      const start = options.trim.enabled ? options.trim.start : 0;
      const end = options.trim.enabled ? options.trim.end : duration;
      const slicedBuf = sliceAudioBuffer(cachedAudioBuffer, start, end);

      setExportProgress(35);

      // 2. Process DSP (Volume, EQ, Fade)
      const processedBuf = await processAudioBuffer(
        slicedBuf,
        {
          ...options,
          trim: { enabled: false, start: 0, end: 0 },
        },
        (stage, prog) => {
          setExportProgress(Math.round(35 + (prog / 100) * 25));
        }
      );

      // 3. Extract cover
      let coverBlob: Blob | null = null;
      if (options.metadata.includeCover && item.file) {
        const thumb = await extractVideoThumbnail(item.file, 1.5);
        coverBlob = thumb.blob;
      }

      setExportProgress(65);

      // 4. Encode to MP3
      const snippetBlob = await encodeAudioBufferToMp3(
        processedBuf,
        options,
        coverBlob,
        (prog) => setExportProgress(prog)
      );

      // 5. Trigger download
      const cleanTitle = (options.metadata.title || item.name.replace(/\.[^/.]+$/, ''))
        .replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');
      const filename = options.trim.enabled
        ? `${cleanTitle}_Trecho_${formatTime(start).replace(':', 'm')}s_a_${formatTime(end).replace(':', 'm')}s.mp3`
        : `${cleanTitle}.mp3`;

      const downloadUrl = URL.createObjectURL(snippetBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 500);
    } catch (err) {
      console.error('Failed to export snippet:', err);
    } finally {
      setIsExportingSnippet(false);
      setExportProgress(0);
    }
  };

  // Download a single split part immediately as MP3
  const handleDownloadSinglePart = async (segment: SplitSegment) => {
    if (!cachedAudioBuffer || exportingPartId) return;

    setExportingPartId(segment.id);
    try {
      const slicedBuf = sliceAudioBuffer(cachedAudioBuffer, segment.start, segment.end);
      const processedBuf = await processAudioBuffer(slicedBuf, {
        ...options,
        trim: { enabled: false, start: 0, end: 0 },
      });

      let coverBlob: Blob | null = null;
      if (options.metadata.includeCover && item.file) {
        const thumb = await extractVideoThumbnail(item.file, 1.5);
        coverBlob = thumb.blob;
      }

      const partOptions: ConversionOptions = {
        ...options,
        metadata: {
          ...options.metadata,
          title: segment.title,
          trackNumber: segment.index.toString(),
        },
      };

      const mp3Blob = await encodeAudioBufferToMp3(processedBuf, partOptions, coverBlob);
      const cleanTitle = segment.title.replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');
      const filename = `${cleanTitle}.mp3`;

      const url = URL.createObjectURL(mp3Blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 500);
    } catch (err) {
      console.error('Error downloading single part:', err);
    } finally {
      setExportingPartId(null);
    }
  };

  // Download all split parts packed into a ZIP
  const handleDownloadAllPartsZip = async () => {
    if (!cachedAudioBuffer || isExportingAllPartsZip || splitSegments.length === 0) return;

    setIsExportingAllPartsZip(true);
    setZipProgress('Iniciando empacotamento das partes...');

    try {
      const zip = new JSZip();
      let coverBlob: Blob | null = null;
      if (options.metadata.includeCover && item.file) {
        const thumb = await extractVideoThumbnail(item.file, 1.5);
        coverBlob = thumb.blob;
      }

      for (let i = 0; i < splitSegments.length; i++) {
        const seg = splitSegments[i];
        setZipProgress(`Processando Parte ${i + 1} de ${splitSegments.length}...`);

        const slicedBuf = sliceAudioBuffer(cachedAudioBuffer, seg.start, seg.end);
        const processedBuf = await processAudioBuffer(slicedBuf, {
          ...options,
          trim: { enabled: false, start: 0, end: 0 },
        });

        const partOptions: ConversionOptions = {
          ...options,
          metadata: {
            ...options.metadata,
            title: seg.title,
            trackNumber: seg.index.toString(),
          },
        };

        const mp3Blob = await encodeAudioBufferToMp3(processedBuf, partOptions, coverBlob);
        const cleanName = seg.title.replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');
        zip.file(`${cleanName}.mp3`, mp3Blob);
      }

      setZipProgress('Compactando arquivo ZIP final...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const baseName = (options.metadata.title || item.name.replace(/\.[^/.]+$/, ''))
        .replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');

      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${baseName}_Partes_Divididas_${splitSegments.length}Faixas.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (err) {
      console.error('Failed to export parts ZIP:', err);
    } finally {
      setIsExportingAllPartsZip(false);
      setZipProgress('');
    }
  };

  // Add split segments as individual items to the main queue
  const handleAddPartsToMainQueue = () => {
    if (!onAddSplitItems || splitSegments.length === 0) return;

    const newItems: VideoItem[] = splitSegments.map((seg) => {
      const id = `${Date.now()}_part_${seg.index}_${Math.random().toString(36).substring(2, 7)}`;
      return {
        id,
        file: item.file,
        name: `${seg.title}.mp3`,
        originalSize: Math.round((item.originalSize * seg.duration) / duration),
        duration: seg.duration,
        thumbnailUrl: item.thumbnailUrl,
        status: 'idle',
        progress: 0,
        progressText: 'Pronto para converter',
        options: {
          ...options,
          trim: {
            enabled: true,
            start: seg.start,
            end: seg.end,
          },
          metadata: {
            ...options.metadata,
            title: seg.title,
            trackNumber: seg.index.toString(),
          },
        },
      };
    });

    onAddSplitItems(newItems);
    onClose();
  };

  const handleSave = () => {
    stopAudio();
    const updatedItem: VideoItem = {
      ...item,
      options,
      audioBuffer: cachedAudioBuffer || item.audioBuffer,
      waveformPeaks: cachedPeaks.length > 0 ? cachedPeaks : item.waveformPeaks,
      status: 'idle', // Request re-conversion with new settings
    };
    onSave(updatedItem, true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl my-6 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  Estúdio de Edição & Corte Client-Side
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  100% no Navegador
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">{item.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 p-1 bg-slate-950 rounded-2xl border border-slate-800 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('trim')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'trim'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Cortar Trecho</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'split'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-4 h-4" />
            <span>Dividir em Partes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('effects')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'effects'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Equalizador</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tags')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === 'tags'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Tags & Capa</span>
          </button>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {/* TAB 1: TRIM / CUT */}
          {activeTab === 'trim' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enableTrim"
                    checked={options.trim.enabled}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        trim: { ...options.trim, enabled: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <label htmlFor="enableTrim" className="text-sm font-bold text-white cursor-pointer">
                    Habilitar corte de trecho específico
                  </label>
                </div>

                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 w-fit">
                  Duração total: <strong className="text-slate-200">{formatTime(duration)}</strong>
                </span>
              </div>

              {/* Waveform Canvas with Playhead */}
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-3 h-28 flex flex-col justify-center overflow-hidden">
                {isLoadingAudio ? (
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>{loadingProgressText}</span>
                  </div>
                ) : (
                  <canvas ref={canvasRef} className="w-full h-full rounded-lg cursor-pointer" />
                )}
              </div>

              {/* Start / End numeric controllers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-400">Ponto Inicial (Início)</label>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {formatTime(options.trim.start)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, (options.trim.end || duration) - 0.5)}
                    step={0.1}
                    disabled={!options.trim.enabled}
                    value={options.trim.start}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        trim: { ...options.trim, start: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-emerald-500 cursor-pointer disabled:opacity-40"
                  />
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-400">Ponto Final (Fim)</label>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {formatTime(options.trim.end)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.min(duration, options.trim.start + 0.5)}
                    max={duration}
                    step={0.1}
                    disabled={!options.trim.enabled}
                    value={options.trim.end}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        trim: { ...options.trim, end: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full accent-emerald-500 cursor-pointer disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Trim duration summary & actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-300">
                  {options.trim.enabled ? (
                    <span>
                      Duração do trecho selecionado:{' '}
                      <strong className="text-emerald-400">
                        {formatTime(Math.max(0, options.trim.end - options.trim.start))}
                      </strong>
                    </span>
                  ) : (
                    <span>Áudio completo selecionado para conversão.</span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {cachedAudioBuffer && (
                    <button
                      type="button"
                      onClick={() => playPreview()}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      {isPlaying && !playingSegmentId ? (
                        <Pause className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{isPlaying && !playingSegmentId ? 'Pausar' : 'Ouvir Trecho'}</span>
                    </button>
                  )}

                  {/* Instant Snippet Download Button */}
                  <button
                    type="button"
                    disabled={isExportingSnippet || isLoadingAudio}
                    onClick={handleExportSnippetNow}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/15 disabled:opacity-50"
                  >
                    {isExportingSnippet ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isExportingSnippet
                        ? `Exportando (${exportProgress}%)...`
                        : 'Baixar Trecho Agora (MP3)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPLIT AUDIO INTO PARTS */}
          {activeTab === 'split' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Split className="w-4 h-4 text-emerald-400" />
                      Divisor de Áudios Longos em Partes
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ideal para podcasts, shows, audiolivros e vídeos longos.
                    </p>
                  </div>

                  {/* Split Mode Selector */}
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
                    <button
                      type="button"
                      onClick={() => setSplitMode('interval')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        splitMode === 'interval'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Por Duração / Intervalo
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitMode('equal')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        splitMode === 'equal'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Em Partes Iguais
                    </button>
                  </div>
                </div>

                {/* Split Configuration Controls */}
                <div className="pt-2 border-t border-slate-800/80">
                  {splitMode === 'interval' ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-medium text-slate-300">Dividir a cada:</span>
                      <div className="flex items-center gap-1.5">
                        {[3, 5, 10, 15, 30].map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => {
                              setIntervalMinutes(mins);
                              setIntervalSeconds(0);
                            }}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                              intervalMinutes === mins && intervalSeconds === 0
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {mins} min
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-xs text-slate-400">Personalizado:</span>
                        <input
                          type="number"
                          min={1}
                          max={120}
                          value={intervalMinutes}
                          onChange={(e) => setIntervalMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-14 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white text-center focus:outline-none focus:border-emerald-500"
                        />
                        <span className="text-xs text-slate-400">min</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">
                        Dividir o áudio total em:{' '}
                        <strong className="text-emerald-400">{equalPartsCount} partes iguais</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={2}
                          max={12}
                          step={1}
                          value={equalPartsCount}
                          onChange={(e) => setEqualPartsCount(parseInt(e.target.value))}
                          className="w-36 accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-white w-6 text-center">
                          {equalPartsCount}x
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Segment Timeline Map */}
              <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Mapa das Partes Geradas ({splitSegments.length} faixas)
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Total: {formatTime(duration)}
                  </span>
                </div>

                <div className="h-6 w-full rounded-lg overflow-hidden flex bg-slate-900 border border-slate-800">
                  {splitSegments.map((seg, idx) => {
                    const widthPercent = (seg.duration / duration) * 100;
                    const colors = [
                      'bg-emerald-500/80',
                      'bg-cyan-500/80',
                      'bg-teal-500/80',
                      'bg-indigo-500/80',
                      'bg-amber-500/80',
                    ];
                    const bgCol = colors[idx % colors.length];
                    return (
                      <div
                        key={seg.id}
                        style={{ width: `${widthPercent}%` }}
                        className={`${bgCol} h-full border-r border-slate-950 flex items-center justify-center text-[9px] font-mono font-bold text-slate-950 truncate px-1`}
                        title={`Parte ${seg.index}: ${formatTime(seg.start)} até ${formatTime(seg.end)}`}
                      >
                        P{seg.index}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* List of Split Segments */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {splitSegments.map((seg) => (
                  <div
                    key={seg.id}
                    className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                        {seg.index}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{seg.title}</p>
                        <p className="text-[11px] font-mono text-slate-400">
                          {formatTime(seg.start)} ➔ {formatTime(seg.end)} ({formatTime(seg.duration)})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {cachedAudioBuffer && (
                        <button
                          type="button"
                          onClick={() => playPreview(seg.start, seg.end, seg.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                          title="Pré-escutar esta parte"
                        >
                          {isPlaying && playingSegmentId === seg.id ? (
                            <Pause className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={exportingPartId === seg.id}
                        onClick={() => handleDownloadSinglePart(seg)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700"
                        title="Baixar apenas esta parte em MP3"
                      >
                        {exportingPartId === seg.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                        ) : (
                          <Download className="w-3 h-3 text-emerald-400" />
                        )}
                        <span>MP3</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Batch Split Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleAddPartsToMainQueue}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Adicionar Partes à Fila Principal</span>
                </button>

                <button
                  type="button"
                  disabled={isExportingAllPartsZip || !cachedAudioBuffer}
                  onClick={handleDownloadAllPartsZip}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isExportingAllPartsZip ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Archive className="w-4 h-4" />
                  )}
                  <span>
                    {isExportingAllPartsZip ? zipProgress : `Baixar Todas as ${splitSegments.length} Partes em .ZIP`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EFFECTS & EQUALIZER */}
          {activeTab === 'effects' && (
            <div className="space-y-4">
              {/* Equalizer Presets */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Preset de Equalizador:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'flat', label: 'Padrão / Flat', desc: 'Áudio original sem alterações' },
                    { id: 'bass-boost', label: 'Grave Potente (Bass)', desc: 'Reforço de frequências baixas' },
                    { id: 'vocal', label: 'Voz Clara (Vocal)', desc: 'Realce de frequências vocais' },
                    { id: 'podcast', label: 'Podcast & Entrevista', desc: 'Corte de ruídos e voz limpa' },
                    { id: 'treble', label: 'Agudos / Treble', desc: 'Brilho e nitidez instrumental' },
                    { id: 'acoustic', label: 'Acústico', desc: 'Equilíbrio suave e caloroso' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() =>
                        setOptions({ ...options, equalizer: preset.id as EqualizerPreset })
                      }
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        options.equalizer === preset.id
                          ? 'border-emerald-400 bg-emerald-500/10 text-white shadow-md shadow-emerald-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{preset.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{preset.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Gain Booster */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    Ganho de Volume (Amplificação)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {Math.round((options.volume || 1.0) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={3.0}
                  step={0.05}
                  value={options.volume || 1.0}
                  onChange={(e) => setOptions({ ...options, volume: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>10% (Baixo)</span>
                  <span>100% (Normal)</span>
                  <span>200% (Alto)</span>
                  <span>300% (Máximo)</span>
                </div>
              </div>

              {/* Fade In / Fade Out */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Fade In (Aparecer Suave)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      value={options.fadeIn}
                      onChange={(e) =>
                        setOptions({ ...options, fadeIn: parseFloat(e.target.value) })
                      }
                      className="flex-1 accent-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-emerald-400 w-8 text-right">
                      {options.fadeIn}s
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Fade Out (Desaparecer Suave)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={0.5}
                      value={options.fadeOut}
                      onChange={(e) =>
                        setOptions({ ...options, fadeOut: parseFloat(e.target.value) })
                      }
                      className="flex-1 accent-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-emerald-400 w-8 text-right">
                      {options.fadeOut}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Channels (Stereo / Mono) */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-300">Canais de Áudio</span>
                  <p className="text-[11px] text-slate-500">Stereo (2 canais) ou Mono (1 canal econômico)</p>
                </div>
                <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, channels: 'stereo' })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      options.channels === 'stereo'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400'
                    }`}
                  >
                    Stereo
                  </button>
                  <button
                    type="button"
                    onClick={() => setOptions({ ...options, channels: 'mono' })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      options.channels === 'mono'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-400'
                    }`}
                  >
                    Mono
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ID3 METADATA & COVER */}
          {activeTab === 'tags' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt="Cover Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                )}
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.metadata.includeCover}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          metadata: { ...options.metadata, includeCover: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span className="text-xs font-bold text-white">
                      Embutir miniatura do vídeo como foto de capa no MP3
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-400 mt-1">
                    A imagem aparecerá no tocador do seu celular, computador e central multimídia do carro.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Título da Faixa
                  </label>
                  <input
                    type="text"
                    value={options.metadata.title}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        metadata: { ...options.metadata, title: e.target.value },
                      })
                    }
                    placeholder="Nome da música ou áudio"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Artista / Criador
                  </label>
                  <input
                    type="text"
                    value={options.metadata.artist}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        metadata: { ...options.metadata, artist: e.target.value },
                      })
                    }
                    placeholder="Nome do artista ou canal"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Álbum
                  </label>
                  <input
                    type="text"
                    value={options.metadata.album}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        metadata: { ...options.metadata, album: e.target.value },
                      })
                    }
                    placeholder="Nome do álbum ou série"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Ano</label>
                    <input
                      type="text"
                      value={options.metadata.year}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          metadata: { ...options.metadata, year: e.target.value },
                        })
                      }
                      placeholder="2026"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Gênero</label>
                    <input
                      type="text"
                      value={options.metadata.genre}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          metadata: { ...options.metadata, genre: e.target.value },
                        })
                      }
                      placeholder="Podcast / Pop / Rock"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Salvar Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
