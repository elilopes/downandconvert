import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  Disc3, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  FileAudio,
  FileVideo,
  Zap,
  Layers
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onOpenRecorder: () => void;
  onOpenSampleModal: () => void;
  isProcessing?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  onOpenRecorder,
  onOpenSampleModal,
  isProcessing = false,
}) => {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const rawFiles: File[] = Array.from(e.dataTransfer.files);
    const droppedFiles = rawFiles.filter((file: File) => {
      return (
        file.type.startsWith('video/') ||
        file.type.startsWith('audio/') ||
        /\.(mp4|mkv|webm|mov|avi|flv|3gp|m4v|ts|wmv|mpg|mpeg|mp3|wav|ogg|aac|m4a)$/i.test(file.name)
      );
    });

    if (droppedFiles.length > 0) {
      onFilesSelected(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
      e.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*,.mp4,.mkv,.webm,.mov,.avi,.flv,.3gp,.m4v,.ts,.wmv,.mpg,.mpeg"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center ${
          isDragOver
            ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01] shadow-2xl shadow-emerald-500/20'
            : 'border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 hover:border-emerald-500/60 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-emerald-500/10'
        }`}
      >
        {/* Glow ambient effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-700 -z-10" />

        {/* Center Icon with Pulse */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <UploadCloud className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors animate-bounce" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 bg-slate-900 rounded-xl border border-slate-700 shadow-md">
            <Disc3 className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Text Content */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
          {t('dropzone.drag')}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed">
          {t('dropzone.click')}
        </p>

        {/* Format Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {['MP4', 'MKV', 'WebM', 'MOV', 'AVI', 'FLV', '3GP', 'TS', 'M4V'].map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/60 shadow-sm"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ➔ .MP3, .WAV, .AAC, .FLAC, .OGG
          </span>
        </div>

        {/* Safe Badge Note & Size Limit */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/60 px-4 py-1.5 rounded-full border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Conversão 100% no navegador • Máx. 250MB por arquivo • Sem envio para servidores
          </div>
        </div>
      </div>

      {/* Alternative Input Options Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {/* Sample Video Button */}
        <button
          type="button"
          onClick={onOpenSampleModal}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all shadow-md group text-sm font-medium cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Testar com Vídeo de Exemplo</span>
        </button>

        {/* Record Video/Screen Button */}
        <button
          type="button"
          onClick={onOpenRecorder}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all shadow-md group text-sm font-medium cursor-pointer"
        >
          <Radio className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          <span>{t('dropzone.record')}</span>
        </button>
      </div>
    </div>
  );
};
