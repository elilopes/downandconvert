import React, { useEffect, useRef, useState } from 'react';
import { X, Play, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdPlayerModalProps {
  isOpen: boolean;
  onComplete: () => void; // Triggered when ad finishes, is skipped, or fails
  onClose: () => void;
  adTagUrl: string;
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
}) => {
  const videoNode = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [adFinished, setAdFinished] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    if (!isOpen || !videoNode.current || !window.videojs) return;

    setAdFinished(false);
    setAdError(false);

    // Initialize VideoJS Player
    const player = window.videojs(videoNode.current, {
      controls: false, // IMA handles ad controls
      autoplay: true,
      muted: false,
      preload: 'auto',
      fluid: true,
    });
    
    playerRef.current = player;

    const onAdComplete = () => {
      if (!adFinished) {
        setAdFinished(true);
        onComplete();
      }
    };

    try {
      // Initialize IMA plugin
      if (player.ima) {
        player.ima({
          adTagUrl: adTagUrl,
          showCountdown: true,
        });

        // Event listener for Ads completed
        player.on('adsready', () => {
          player.ima.requestAds();
        });

        player.on('adend', onAdComplete);
        player.on('adskip', onAdComplete);
        player.on('adserror', () => {
          console.error('VideoJS IMA Ad Error');
          setAdError(true);
          onAdComplete(); // Ensure user can proceed even if ad fails
        });
        
        // Listen to native ended just in case
        player.on('ended', onAdComplete);
        
        // Initialize ad container
        player.ima.initializeAdDisplayContainer();
      } else {
        // Fallback if plugin fails to load
        setAdError(true);
        onAdComplete();
      }
    } catch (e) {
      console.error('Failed to initialize VideoJS IMA:', e);
      setAdError(true);
      onAdComplete();
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [isOpen, adTagUrl, onComplete, adFinished]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-black border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Patrocinado
            </span>
            <span className="text-xs text-slate-300 font-medium drop-shadow-md">
              Apoie nosso conversor assistindo a este anúncio
            </span>
          </div>
          
          <button
            type="button"
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="p-2 rounded-xl text-white/70 hover:text-white bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
            title="Pular Anúncio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          <div data-vjs-player className="w-full h-full">
            <video
              ref={videoNode}
              className="video-js vjs-default-skin vjs-big-play-centered w-full h-full"
              playsInline
            />
          </div>
          
          {adError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-20 p-6 text-center">
              <AlertCircle className="w-12 h-12 text-slate-500 mb-3" />
              <p className="text-slate-400 mb-4">O anúncio não pôde ser carregado.</p>
              <button
                onClick={onComplete}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors"
              >
                Prosseguir com o Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
