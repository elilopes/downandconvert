import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, Clock, CheckCircle2, Volume2, Video as VideoIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface SponsoredAdConfig {
  adType?: 'card' | 'youtube' | 'image' | 'custom_html';
  title?: string;
  adTitle?: string;
  adDescription?: string;
  adLink?: string;
  imageUrl?: string;
  youtubeId?: string; // e.g. "dQw4w9WgXcQ"
  customHtml?: string;
  countdownSeconds?: number;
}

interface SponsoredAdModalProps extends SponsoredAdConfig {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const SponsoredAdModal: React.FC<SponsoredAdModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  adType = 'card',
  title,
  adTitle = '🚀 Hospedagem & Ferramentas Digitais de Alta Performance',
  adDescription = 'Aproveite até 75% OFF em servidores ultra-rápidos e recursos para criadores.',
  adLink = 'https://google.com',
  imageUrl = '',
  youtubeId = '',
  countdownSeconds = 5,
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);
  const [canSkip, setCanSkip] = useState(false);

  const displayTitle = title || t('ad.modal.title');

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(countdownSeconds);
      setCanSkip(false);
      return;
    }

    setTimeLeft(countdownSeconds);
    setCanSkip(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdownSeconds]);

  if (!isOpen) return null;

  const handleSkipOrProceed = () => {
    if (timeLeft > 0) return; // Prevent clicking if timer is running
    onProceed();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden">
        {/* Decorative blur lights */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Patrocinado
            </span>
            <span className="text-xs text-slate-400 font-medium truncate max-w-[240px] sm:max-w-none">
              {displayTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
            title="Fechar e cancelar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ad Content based on adType */}
        <div className="mt-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
          {/* YouTube Video Embed */}
          {adType === 'youtube' && youtubeId ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
                title="Sponsored Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : adType === 'image' && imageUrl ? (
            /* Custom Image Banner */
            <a
              href={adLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video w-full relative group/img overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={adTitle}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div>
                  <h4 className="text-sm font-bold text-white">{adTitle}</h4>
                  <p className="text-xs text-slate-300">{adDescription}</p>
                </div>
              </div>
            </a>
          ) : (
            /* Interactive Card (Default) */
            <div className="aspect-video w-full bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 animate-pulse">
                <Sparkles className="w-7 h-7 text-slate-950" />
              </div>
              <h4 className="text-base font-extrabold text-white max-w-xs">{adTitle}</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">{adDescription}</p>

              <a
                href={adLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors shadow-md"
              >
                <span>Acessar Oferta Especial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Countdown badge over media */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono font-bold text-slate-200 flex items-center gap-1.5 shadow-lg">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            {timeLeft > 0 ? (
              <span>Download em {timeLeft}s</span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Pronto!
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <a
            href={adLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <span>Anuncie Conosco</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={handleSkipOrProceed}
            disabled={timeLeft > 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              timeLeft === 0
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-emerald-500/20 cursor-pointer scale-105'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-60 pointer-events-none'
            }`}
          >
            <span>
              {timeLeft > 0 ? t('ad.modal.wait').replace('{seconds}', String(timeLeft)) : t('ad.modal.continue')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
