import React, { useState } from 'react';
import { Sparkles, X, Play, Music2, Radio, Disc, RefreshCw } from 'lucide-react';
import { SAMPLE_VIDEOS, SampleVideoOption, generateSampleVideoFile } from '../utils/sampleMedia';

interface SampleModalProps {
  onClose: () => void;
  onSampleGenerated: (file: File) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ onClose, onSampleGenerated }) => {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleSelectSample = async (sample: SampleVideoOption) => {
    try {
      setGeneratingId(sample.id);
      const file = await generateSampleVideoFile(sample);
      onSampleGenerated(file);
      onClose();
    } catch (e) {
      console.error('Failed to generate sample video:', e);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Vídeos de Demonstração</h3>
              <p className="text-xs text-slate-400">Gere um vídeo animado com música para testar</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sample Options List */}
        <div className="space-y-3 mt-4">
          {SAMPLE_VIDEOS.map((sample) => {
            const isGenerating = generatingId === sample.id;
            return (
              <div
                key={sample.id}
                onClick={() => !generatingId && handleSelectSample(sample)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isGenerating
                    ? 'border-amber-400 bg-amber-500/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shrink-0 flex items-center justify-center shadow-md">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      {sample.id === 'lofi-sunset' ? (
                        <Music2 className="w-5 h-5 text-amber-400" />
                      ) : sample.id === 'podcast-intro' ? (
                        <Radio className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Disc className="w-5 h-5 text-pink-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{sample.name}</h4>
                    <p className="text-xs text-slate-400">{sample.description}</p>
                    <span className="inline-block text-[10px] font-semibold text-amber-400/90 mt-1">
                      {sample.duration} segundos • {sample.bpm} BPM • {sample.category}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isGenerating ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Gerando...</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold text-slate-200 transition-all flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Usar</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-5">
          O vídeo será sintetizado instantaneamente em seu navegador com faixa de áudio real.
        </p>
      </div>
    </div>
  );
};
