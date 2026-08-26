import React, { useEffect, useRef, useState } from 'react';
import { X, Play, AlertCircle, Sparkles, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdPlayerModalProps {
  isOpen: boolean;
  onComplete: () => void; // Triggered when ad finishes, is skipped, or user proceeds
  onClose: () => void;
  adTagUrl: string;
  countdownSeconds?: number;
}

// Ensure TypeScript knows about global videojs
declare global {
  interface Window {
    videojs: any;
  }
}

export const AdPlayerModal: React.FC<AdPlayerModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  adTagUrl,
  countdownSeconds = 5,
}) => {
  const { t } = useLanguage();
  const videoNode = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [adFinished, setAdFinished] = useState(false);
  const [adError, setAdError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);
  const [canProceed, setCanProceed] = useState(false);

  // Reset and handle countdown timer whenever modal opens
  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(countdownSeconds);
      setCanProceed(false);
      setAdFinished(false);
      setAdError(false);
      return;
    }

    setTimeLeft(countdownSeconds);
    setCanProceed(false);
    setAdFinished(false);
    setAdError(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanProceed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdownSeconds]);

  // Attempt to load VideoJS + IMA
  useEffect(() => {
    if (!isOpen || !videoNode.current) return;

    if (!window.videojs) {
      console.warn('VideoJS is not loaded. Displaying fallback sponsored card.');
      setAdError(true);
      return;
    }

    try {
      // Initialize VideoJS Player
      const player = window.videojs(videoNode.current, {
        controls: false,
        autoplay: true,
        muted: false,
        preload: 'auto',
        fluid: true,
      });

      playerRef.current = player;

      const handleAdDone = () => {
        setAdFinished(true);
        setCanProceed(true);
      };

      // Initialize IMA plugin if available
      if (player.ima) {
        player.ima({
          adTagUrl: adTagUrl,
          showCountdown: true,
        });

        player.on('adsready', () => {
          player.ima.requestAds();
        });

        player.on('adend', handleAdDone);
        player.on('adskip', handleAdDone);
        player.on('adserror', (err: any) => {
          console.warn('VideoJS IMA Ad note/error:', err);
          setAdError(true);
        });

        player.on('ended', handleAdDone);

        player.ima.initializeAdDisplayContainer();
      } else {
        setAdError(true);
      }
    } catch (e) {
      console.warn('Failed to initialize VideoJS IMA:', e);
      setAdError(true);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (err) {}
        playerRef.current = null;
      }
    };
  }, [isOpen, adTagUrl]);

  if (!isOpen) return null;

  const handleProceed = () => {
    onComplete();
    onClose();
  };

  const handleClose = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Decorative blur lights */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Patrocinado
            </span>
            <span className="text-xs text-slate-300 font-medium truncate">
              Apoie nosso conversor assistindo a este anúncio
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ad Video or Sponsored Interactive Card */}
        <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden">
          {!adError ? (
            <div data-vjs-player className="w-full h-full">
              <video
                ref={videoNode}
                className="video-js vjs-default-skin vjs-big-play-centered w-full h-full"
                playsInline
              />
            </div>
          ) : (
            /* Fallback Sponsored Content */
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-3 animate-pulse">
                <Sparkles className="w-7 h-7 text-slate-950" />
              </div>
              <h4 className="text-base font-extrabold text-white max-w-sm">
                🚀 Conversor de Mídias em Alta Performance
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Converta e baixe vídeos e áudios sem limites em máxima fidelidade sonora.
              </p>

              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors shadow-md"
              >
                <span>Acessar Recursos Especiais</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Countdown Badge overlay */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono font-bold text-slate-200 flex items-center gap-1.5 shadow-lg z-20">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            {timeLeft > 0 && !adFinished ? (
              <span>Download em {timeLeft}s</span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Pronto!
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/60">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            <span>Anuncie Conosco</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={handleProceed}
            disabled={timeLeft > 0 && !adFinished}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              canProceed || adFinished || timeLeft === 0
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 hover:from-cyan-400 hover:to-emerald-300 shadow-lg shadow-cyan-500/25 cursor-pointer scale-105'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-60 pointer-events-none'
            }`}
          >
            <span>
              {timeLeft > 0 && !adFinished
                ? `Aguarde (${timeLeft}s)`
                : 'Prosseguir com o Download'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
