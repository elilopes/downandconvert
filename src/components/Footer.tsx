import React from 'react';
import { Music, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../contexts/LanguageContext';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
  onNavigateTab?: (tab: 'converter' | 'downloader' | 'ussd' | 'smartphones' | 'news') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
  onNavigateTab,
}) => {
  const { t, lang, setLang } = useLanguage();

  const handleTabClick = (tab: 'converter' | 'downloader' | 'ussd' | 'smartphones' | 'news') => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    } else {
      window.location.href = tab === 'converter' ? '/' : `/${tab}`;
    }
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-10 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 pt-6 border-t border-slate-900">
          
          {/* Quick Language Links (pt, en, ru, hi, ko) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs py-2 px-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 font-medium flex items-center gap-1.5 mr-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Idiomas / Languages:</span>
            </span>
            {SUPPORTED_LANGUAGES.map((item, idx) => (
              <React.Fragment key={item.code}>
                {idx > 0 && <span className="text-slate-700 hidden sm:inline">•</span>}
                <button
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                    lang === item.code
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={`${item.name} (${item.nativeName}) - Link /${item.slug}`}
                >
                  <span>{item.flag}</span>
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">/{item.slug}</span>
                </button>
              </React.Fragment>
            ))}
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
              onClick={() => handleTabClick('converter')}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('tabs.converter')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => handleTabClick('downloader')}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              {t('tabs.downloader')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => handleTabClick('ussd')}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              USSD/MMI
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => handleTabClick('smartphones')}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors font-medium"
            >
              {t('tabs.smartphones')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => handleTabClick('news')}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors font-medium"
            >
              {t('tabs.news')}
            </button>
            <span className="hidden md:inline">•</span>
            <button
              onClick={() => window.location.href = '/sitemap.html'}
              className="flex items-center gap-1.5 text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              Sitemap
            </button>
          </div>

          {/* Footer content structure */}
        </div>
      </div>
    </footer>
  );
};


