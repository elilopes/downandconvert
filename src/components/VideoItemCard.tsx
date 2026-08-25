import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Download,
  Scissors,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Music,
  Sliders,
  Volume2,
  VolumeX,
  Sparkles,
  FileAudio,
  Eye,
  RefreshCw,
  CloudUpload,
  ExternalLink,
  Crop,
} from 'lucide-react';
import { VideoItem } from '../types';
import { formatBytes, formatTime } from '../utils/audioEncoder';
import { getAccessToken, googleSignIn } from '../lib/auth';
import { uploadFileToGoogleDrive } from '../lib/googleDrive';

interface VideoItemCardProps {
  item: VideoItem;
  onConvert: (id: string) => void;
  onDownload: (item: VideoItem) => void;
  onRemove: (id: string) => void;
  onOpenTrimmer: (item: VideoItem) => void;
  onOpenCrop?: (item: VideoItem) => void;
  onUpdateOptions: (id: string, newOptions: any) => void;
  isProcessing: boolean;
}

export const VideoItemCard: React.FC<VideoItemCardProps> = ({
  item,
  onConvert,
  onDownload,
  onRemove,
  onOpenTrimmer,
  onOpenCrop,
  onUpdateOptions,
  isProcessing,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(item.duration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [isUploadingDrive, setIsUploadingDrive] = useState(false);
  const [driveUrl, setDriveUrl] = useState<string | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);

  const handleSaveToGoogleDrive = async () => {
    if (!item.outputBlob) return;
    setIsUploadingDrive(true);
    setDriveError(null);
    try {
      let token = await getAccessToken();
      if (!token) {
        const authRes = await googleSignIn();
        token = authRes?.accessToken || null;
      }
      if (!token) {
        throw new Error('Faça login com sua conta Google para salvar no Drive.');
      }
      const extension = item.options.format;
      const cleanName = (item.options.metadata.title || item.name)
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');
      const fileName = `${cleanName}.${extension}`;
      const mimeType = extension === 'mp3' ? 'audio/mp3' : 'audio/wav';

      const res = await uploadFileToGoogleDrive(item.outputBlob, fileName, mimeType, token);
      if (res.webViewLink) {
        setDriveUrl(res.webViewLink);
      } else {
        setDriveUrl('https://drive.google.com');
      }
    } catch (err: any) {
      console.error('Drive upload failed:', err);
      setDriveError(err?.message || 'Erro ao salvar no Google Drive');
    } finally {
      setIsUploadingDrive(false);
    }
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setAudioDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [item.outputUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current || !item.outputUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.warn(e));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const seekTime = pos * audioDuration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const isConvertingThis =
    item.status === 'reading' ||
    item.status === 'decoding' ||
    item.status === 'processing' ||
    item.status === 'encoding';

  const durationToUse = item.options.trim.enabled
    ? Math.max(0, item.options.trim.end - item.options.trim.start)
    : (item.duration || 0);

  let estimatedSize = 0;
  if (durationToUse > 0 && item.options.format === 'mp3') {
    estimatedSize = (item.options.bitrate * 1000 * durationToUse) / 8;
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
      item.status === 'completed'
        ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
        : isConvertingThis
        ? 'bg-slate-900/95 border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
        : item.status === 'error'
        ? 'bg-slate-900/90 border-rose-500/50'
        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Hidden Audio Player for playback when completed */}
      {item.outputUrl && <audio ref={audioRef} src={item.outputUrl} preload="auto" />}

      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Thumbnail & Details */}
          <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto min-w-0">
            {/* Video Thumbnail with Preview Modal trigger */}
            <div className="relative group/thumb shrink-0 w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                />
              ) : (
                <FileAudio className="w-8 h-8 text-slate-600" />
              )}

              {/* Duration badge */}
              {item.duration > 0 && (
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono font-semibold text-slate-200 backdrop-blur-sm">
                  {formatTime(item.duration)}
                </span>
              )}

              {/* Hover to view video */}
              <button
                type="button"
                onClick={() => setShowVideoPreview(true)}
                className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity text-white"
                title="Visualizar vídeo original"
              >
                <Eye className="w-5 h-5 text-slate-200" />
              </button>
            </div>

            {/* Video Metadata & Tags info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md" title={item.name}>
                  {item.options.metadata.title || item.name}
                </h4>
                {item.options.trim.enabled && (
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Scissors className="w-2.5 h-2.5" />
                    Cortado
                  </span>
                )}
                {item.options.crop && item.options.crop.enabled && (
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <Crop className="w-2.5 h-2.5" />
                    Crop: {item.options.crop.width}×{item.options.crop.height}
                  </span>
                )}
                {item.options.equalizer !== 'flat' && (
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    EQ: {item.options.equalizer}
                  </span>
                )}
              </div>

              {/* Info subtitle: size, target format, bitrate */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
                {item.status !== 'completed' && !isConvertingThis ? (
                  <div className="flex items-center gap-1.5">
                    <select
                      value={item.options.format}
                      onChange={(e) => onUpdateOptions(item.id, { ...item.options, format: e.target.value as any })}
                      className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer font-bold uppercase"
                      title="Selecione o formato de saída"
                    >
                      <optgroup label="Áudio">
                        <option value="mp3">MP3</option>
                        <option value="wav">WAV</option>
                        <option value="aac">AAC</option>
                        <option value="m4a">M4A</option>
                        <option value="flac">FLAC</option>
                        <option value="ogg">OGG</option>
                        <option value="wma">WMA</option>
                        <option value="aiff">AIFF</option>
                      </optgroup>
                      <optgroup label="Vídeo">
                        <option value="mp4">MP4</option>
                        <option value="webm">WEBM</option>
                        <option value="mkv">MKV</option>
                        <option value="avi">AVI</option>
                        <option value="mov">MOV</option>
                      </optgroup>
                    </select>

                    {item.file.size > 25 * 1024 * 1024 && ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1" title="Arquivo grande (>25MB) processado no servidor para alta velocidade">
                        ⚡ Servidor Turbo
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-300">
                    {item.options.format}
                  </span>
                )}

                {(item.options.format === 'mp3' || item.options.format === 'aac' || item.options.format === 'm4a' || item.options.format === 'ogg' || item.options.format === 'wma') && item.status !== 'completed' && !isConvertingThis && (
                  <select
                    value={item.options.bitrate}
                    onChange={(e) => onUpdateOptions(item.id, { ...item.options, bitrate: Number(e.target.value) })}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    title="Selecione a qualidade"
                  >
                    <option value={320}>320 kbps</option>
                    <option value={256}>256 kbps</option>
                    <option value={192}>192 kbps</option>
                    <option value={128}>128 kbps</option>
                    <option value={64}>64 kbps</option>
                  </select>
                )}
                {['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) && item.status !== 'completed' && !isConvertingThis && (
                  <select
                    value={item.options.videoQuality || 'medium'}
                    onChange={(e) => onUpdateOptions(item.id, { ...item.options, videoQuality: e.target.value })}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    title="Selecione a qualidade do vídeo"
                  >
                    <option value="high">Alta (Lento)</option>
                    <option value="medium">Média (Padrão)</option>
                    <option value="low">Baixa (Rápido)</option>
                  </select>
                )}
                {(item.options.format === 'mp3' || item.options.format === 'aac' || item.options.format === 'm4a' || item.options.format === 'ogg' || item.options.format === 'wma') && (item.status === 'completed' || isConvertingThis) && (
                  <span>({item.options.bitrate} kbps)</span>
                )}
                {['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) && (item.status === 'completed' || isConvertingThis) && (
                  <span>(Qualidade {item.options.videoQuality === 'high' ? 'Alta' : item.options.videoQuality === 'low' ? 'Baixa' : 'Média'})</span>
                )}

                {item.outputSize ? (
                  <>
                    <span>•</span>
                    <span className="text-emerald-300 font-medium">
                      Final: {formatBytes(item.outputSize)}
                    </span>
                  </>
                ) : estimatedSize > 0 ? (
                  <>
                    <span>•</span>
                    <span className="text-amber-400/90 font-medium">
                      Est. Tam: ~{formatBytes(estimatedSize)}
                    </span>
                  </>
                ) : null}
              </div>

              {/* Artist / Album tags if present */}
              {(item.options.metadata.artist || item.options.metadata.album) && (
                <p className="text-[10px] text-slate-500 truncate mt-1">
                  {[item.options.metadata.artist, item.options.metadata.album].filter(Boolean).join(' - ')}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions & Status */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
            {/* Video Crop Button (for video outputs/files) */}
            {onOpenCrop && (
              <button
                type="button"
                onClick={() => onOpenCrop(item)}
                disabled={isConvertingThis}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 disabled:opacity-50 ${
                  item.options.crop && item.options.crop.enabled
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 hover:bg-cyan-500/30 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700/70 hover:border-slate-600'
                }`}
                title="Recortar enquadramento do vídeo (Stories, Reels, TikTok, 1:1, etc.)"
              >
                <Crop className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.options.crop && item.options.crop.enabled ? 'Recorte Ativo' : 'Recortar (Crop)'}</span>
              </button>
            )}

            {/* Edit / Trim / Split / EQ Options button */}
            <button
              type="button"
              onClick={() => onOpenTrimmer(item)}
              disabled={isConvertingThis || ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/70 hover:border-slate-600 transition-all flex items-center gap-1.5 disabled:opacity-50"
              title={['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) ? "Editor visual disponível apenas para áudio" : "Cortar trechos, dividir em partes, equalizar e editar tags"}
            >
              <Scissors className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cortar / Dividir</span>
            </button>

            {/* Remove from list button */}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              disabled={isConvertingThis}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20 disabled:opacity-50"
              title="Remover vídeo"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Primary Action Button (Convert OR Download + Google Drive) */}
            {item.status === 'completed' ? (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveToGoogleDrive}
                  disabled={isUploadingDrive}
                  className="px-3 py-2 text-xs font-bold rounded-xl text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
                  title="Salvar arquivo direto no seu Google Drive"
                >
                  {isUploadingDrive ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  ) : (
                    <CloudUpload className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{isUploadingDrive ? 'Salvando...' : 'Salvar no Drive'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDownload(item)}
                  className="px-4 py-2 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Baixar {item.options.format.toUpperCase()}</span>
                </button>
              </div>
            ) : isConvertingThis ? (
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{item.progress}%</span>
              </div>
            ) : item.status === 'error' ? (
              <button
                type="button"
                onClick={() => onConvert(item.id)}
                className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Tentar Novamente</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onConvert(item.id)}
                disabled={isProcessing}
                className="px-4 py-2 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Converter</span>
              </button>
            )}
          </div>
        </div>

        {/* Realtime Progress Bar for Conversion */}
        {isConvertingThis && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-cyan-300 flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 animate-spin" />
                {item.progressText || 'Processando áudio...'}
              </span>
              <span className="font-mono font-bold text-cyan-400">{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 transition-all duration-300 rounded-full shadow-sm shadow-cyan-400/50"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {item.status === 'error' && item.error && (
          <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Falha na conversão:</p>
              <p>{item.error}</p>
            </div>
          </div>
        )}

        {/* Completed Audio Player with Waveform Preview */}
        {item.status === 'completed' && item.outputUrl && !['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) && (
          <div className="mt-4 pt-3.5 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20 transition-all"
                title={isPlaying ? 'Pausar' : 'Reproduzir áudio'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-slate-950" />
                ) : (
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                )}
              </button>

              {/* Time Indicators */}
              <div className="text-xs font-mono text-slate-400 w-12 shrink-0">
                {formatTime(currentTime)}
              </div>

              {/* Waveform Scrubber Bar */}
              <div
                onClick={handleSeek}
                className="flex-1 h-8 bg-slate-950/80 rounded-lg p-1 flex items-center gap-0.5 cursor-pointer relative group/wave overflow-hidden border border-slate-800"
              >
                {/* Progress highlight overlay */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none transition-all"
                  style={{ width: `${(currentTime / (audioDuration || 1)) * 100}%` }}
                />

                {/* Waveform Peaks Bars */}
                {Array.from({ length: 48 }).map((_, idx) => {
                  const peakVal = item.waveformPeaks
                    ? item.waveformPeaks[Math.floor((idx / 48) * item.waveformPeaks.length)] || 0.4
                    : 0.3 + Math.sin(idx * 0.5) * 0.3;
                  const progressPct = currentTime / (audioDuration || 1);
                  const isPassed = idx / 48 <= progressPct;

                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-colors duration-150 ${
                        isPassed ? 'bg-emerald-400' : 'bg-slate-700 group-hover/wave:bg-slate-600'
                      }`}
                      style={{
                        height: `${Math.max(15, peakVal * 100)}%`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Total Duration */}
              <div className="text-xs font-mono text-slate-400 w-12 shrink-0 text-right">
                {formatTime(audioDuration)}
              </div>
            </div>
            
            {/* Google Drive upload feedback */}
            {driveUrl && (
              <div className="mt-2.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs flex items-center justify-between gap-2">
                <span className="text-emerald-300 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Arquivo salvo com sucesso no seu Google Drive!
                </span>
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 underline underline-offset-2"
                >
                  <span>Abrir no Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {driveError && (
              <div className="mt-2.5 px-3 py-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center justify-between gap-2">
                <span>{driveError}</span>
                <button
                  type="button"
                  onClick={handleSaveToGoogleDrive}
                  className="font-bold text-rose-400 hover:text-rose-300 underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {showVideoPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-white truncate">{item.name}</h4>
              <button
                type="button"
                onClick={() => setShowVideoPreview(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                ✕
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
              <video
                src={item.status === 'completed' && ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(item.options.format) && item.outputUrl ? item.outputUrl : URL.createObjectURL(item.file)}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
