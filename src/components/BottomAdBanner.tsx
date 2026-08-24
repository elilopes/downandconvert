import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

interface BottomAdBannerProps {
  /**
   * Seu ID de Cliente do AdSense (ex: "ca-pub-1234567890123456").
   * Deixe vazio para usar o banner patrocinado customizado padrão.
   */
  adClient?: string;
  /**
   * O ID do Bloco de Anúncios criado no AdSense (ex: "9876543210").
   */
  adSlot?: string;
  /**
   * Modo do anúncio: 'adsense' | 'custom'
   */
  mode?: 'adsense' | 'custom';
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const BottomAdBanner: React.FC<BottomAdBannerProps> = ({
  adClient = '',
  adSlot = '',
  mode = 'custom',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Inicializa o bloco de anúncios do AdSense se estiver no modo adsense
  useEffect(() => {
    if (mode === 'adsense' && adClient && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense render error:', err);
      }
    }
  }, [mode, adClient, adSlot]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 py-2 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 shadow-2xl transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* AdSense Real Banner Mode */}
        {mode === 'adsense' && adClient && adSlot ? (
          <div className="flex-1 overflow-hidden min-h-[50px] flex items-center justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '100%', maxHeight: '60px' }}
              data-ad-client={adClient}
              data-ad-slot={adSlot}
              data-ad-format="horizontal"
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          /* Custom Sponsor Banner (Default) */
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              Anúncio
            </span>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                <span>🚀 Hospedagem Cloud & Domínios Ultra-Rápidos</span>
                <span className="hidden md:inline-block text-[11px] font-normal text-emerald-400">
                  — Desconto de 75% com ativação imediata!
                </span>
              </p>
              {!isMinimized && (
                <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                  Turbine seus projetos com servidores NVMe e certificado SSL gratuito.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Right: CTA Button & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {mode === 'custom' && (
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>Conferir Oferta</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            title={isMinimized ? 'Expandir banner' : 'Minimizar banner'}
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            title="Fechar anúncio"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
