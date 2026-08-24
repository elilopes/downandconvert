import React from 'react';
import { Play, Download, Trash2, Sliders, CheckCircle2, FileArchive, Settings2, Sparkles, RefreshCw } from 'lucide-react';
import { OutputFormat, VideoItem } from '../types';
import { formatBytes } from '../utils/audioEncoder';

interface BatchControlsProps {
  items: VideoItem[];
  globalFormat: OutputFormat;
  setGlobalFormat: (format: OutputFormat) => void;
  globalBitrate: 64 | 128 | 192 | 256 | 320;
  setGlobalBitrate: (bitrate: 64 | 128 | 192 | 256 | 320) => void;
  onConvertAll: () => void;
  onDownloadAllZip: () => void;
  onClearAll: () => void;
  isProcessingAny: boolean;
  isZipping: boolean;
}

export const BatchControls: React.FC<BatchControlsProps> = ({
  items,
  globalFormat,
  setGlobalFormat,
  globalBitrate,
  setGlobalBitrate,
  onConvertAll,
  onDownloadAllZip,
  onClearAll,
  isProcessingAny,
  isZipping,
}) => {
  const completedCount = items.filter((item) => item.status === 'completed').length;
  const pendingCount = items.filter((item) => item.status !== 'completed' && item.status !== 'error').length;
  const totalOriginalSize = items.reduce((acc, item) => acc + item.originalSize, 0);
  const totalOutputSize = items.reduce((acc, item) => acc + (item.outputSize || 0), 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Side: Summary info & Global Format / Bitrate Config */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {items.length} {items.length === 1 ? 'Vídeo' : 'Vídeos'} na fila
            </span>
            {completedCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completedCount} {completedCount === 1 ? 'convertido' : 'convertidos'}
              </span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Format Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-400">Formato:</label>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              {(['mp3', 'wav', 'ogg', 'mp4', 'mkv', 'avi'] as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setGlobalFormat(fmt)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all uppercase ${
                    globalFormat === fmt
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Bitrate Selector (Only relevant for MP3) */}
          {globalFormat === 'mp3' && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-slate-400">Qualidade:</label>
              <select
                value={globalBitrate}
                onChange={(e) => setGlobalBitrate(Number(e.target.value) as 64 | 128 | 192 | 256 | 320)}
                className="bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value={320}>320 kbps (Qualidade Máxima Studio)</option>
                <option value={256}>256 kbps (Muito Alta)</option>
                <option value={192}>192 kbps (Padrão Podcast / Música)</option>
                <option value={128}>128 kbps (Compacto)</option>
                <option value={64}>64 kbps (Voz Leve)</option>
              </select>
            </div>
          )}
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
          {/* Clear List */}
          <button
            type="button"
            onClick={onClearAll}
            disabled={isProcessingAny}
            className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Limpar todos os vídeos"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar Lista</span>
          </button>

          {/* Download All as ZIP (Available when at least 1 completed) */}
          {completedCount > 0 && (
            <button
              type="button"
              onClick={onDownloadAllZip}
              disabled={isZipping}
              className="px-4 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isZipping ? (
                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              ) : (
                <FileArchive className="w-4 h-4 text-cyan-400" />
              )}
              <span>{isZipping ? 'Criando ZIP...' : `Baixar Todos em ZIP (${completedCount})`}</span>
            </button>
          )}

          {/* Convert All Button */}
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={onConvertAll}
              disabled={isProcessingAny}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 disabled:opacity-60"
            >
              {isProcessingAny ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <Play className="w-4 h-4 fill-slate-950" />
              )}
              <span>{isProcessingAny ? 'Convertendo...' : `Converter Todos (${pendingCount})`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
