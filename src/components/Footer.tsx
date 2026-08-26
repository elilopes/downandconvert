import React from 'react';
import { Music, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { VisitorCounter } from './VisitorCounter';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
}) => {
  const { t } = useLanguage();
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-10 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 mb-8">
          <VisitorCounter />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Music className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-base font-bold inline-flex items-center gap-2">
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Down</span>
                  <span className="text-white">&</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Convert</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest px-1 py-0.2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded">
                  Beta
                </span>
              </span>
              <p className="text-xs text-slate-500">{t('footer.rights')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-slate-400">
            <button
              onClick={onOpenTerms}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('footer.terms')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={onOpenPrivacy}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('footer.privacy')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('footer.contact')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/?modal=popular'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('footer.popular')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/?modal=faq'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('footer.howItWorks')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/?tab=converter'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('tabs.converter')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/?tab=downloader'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('tabs.downloader')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/?tab=ussd'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              USSD/MMI
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};


