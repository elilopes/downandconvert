import React, { useState, useRef, useEffect } from 'react';
import { Music, ShieldCheck, Sparkles, Flame, Globe, ChevronDown, Smartphone, Palette, Moon, Sun, Eye, Contrast, Share2, Copy, Check, Cpu } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme, Theme } from '../contexts/ThemeContext';
import { PopularCodesModal } from './PopularCodesModal';
import { ShareLanguageModal } from './ShareLanguageModal';
import { OpenSourceAiModal } from './OpenSourceAiModal';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenFAQ: () => void;
  onNavigateToUssd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onOpenFAQ, onNavigateToUssd }) => {
  const { lang, setLang, t, getLanguageUrl } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [isPopularModalOpen, setIsPopularModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOpenSourceModalOpen, setIsOpenSourceModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'PT', name: 'Português', flag: '🇧🇷', slug: 'pt' },
    { code: 'EN', name: 'English', flag: '🇺🇸', slug: 'en' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺', slug: 'ru' },
    { code: 'HI', name: 'हिन्दी', flag: '🇮🇳', slug: 'hi' },
    { code: 'KO', name: '한국어', flag: '🇰🇷', slug: 'ko' },
  ];

  const handleCopyLangLink = (e: React.MouseEvent, targetLang: Language) => {
    e.stopPropagation();
    const url = getLanguageUrl(targetLang, false);
    navigator.clipboard.writeText(url);
    setCopiedCode(targetLang);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="https://downandconvert.onrender.com"
            className="flex items-center gap-3.5 group hover:opacity-95 transition-opacity cursor-pointer"
            title="Down&Convert"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Music className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Down</span>
                  <span className="text-white">&</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Convert</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t('header.subtitle')}
              </p>
            </div>
          </a>

          {/* Badges and Actions */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {t('header.free')}
              </span>
            </div>

            {/* IAs Open-Source Hub Button */}
            <button
              onClick={() => setIsOpenSourceModalOpen(true)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Hub de IAs Open-Source"
            >
              <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="hidden sm:inline">IAs Open-Source</span>
            </button>

            {/* Popular Codes Modal Button */}
            <button
              onClick={() => setIsPopularModalOpen(true)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{t('header.popularCodes')}</span>
            </button>

            {/* Share Site in Language Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-cyan-500/50 text-cyan-300 hover:text-white transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              title={t('header.share')}
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{t('header.share')}</span>
            </button>

            <button
              onClick={onOpenFAQ}
              className="text-xs font-medium px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors hidden sm:inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {t('header.how')}
            </button>

            {/* Theme Selector */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className="flex items-center justify-center p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="Aparência"
              >
                <Palette className="w-4 h-4 text-slate-400" />
              </button>
              
              {themeOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    <button
                      onClick={() => { setTheme('dark'); setThemeOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 cursor-pointer ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                      <Moon className="w-3.5 h-3.5" /> {t('theme.dark')}
                    </button>
                    <button
                      onClick={() => { setTheme('light'); setThemeOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 cursor-pointer ${theme === 'light' ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                      <Sun className="w-3.5 h-3.5" /> {t('theme.light')}
                    </button>
                    <button
                      onClick={() => { setTheme('colorblind'); setThemeOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 cursor-pointer ${theme === 'colorblind' ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                      <Eye className="w-3.5 h-3.5" /> {t('theme.colorblind')}
                    </button>
                    <button
                      onClick={() => { setTheme('high-contrast'); setThemeOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center gap-2 cursor-pointer ${theme === 'high-contrast' ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                    >
                      <Contrast className="w-3.5 h-3.5" /> {t('theme.highContrast')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs font-medium cursor-pointer"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              
              {langOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    {languages.map((l) => (
                      <div
                        key={l.code}
                        onClick={() => {
                          setLang(l.code as Language);
                          setLangOpen(false);
                        }}
                        className={`px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer group ${
                          lang === l.code
                            ? 'bg-cyan-500/15 text-cyan-300 font-bold'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{l.flag}</span>
                          <span>{l.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Copy Language Link button */}
                          <button
                            type="button"
                            onClick={(e) => handleCopyLangLink(e, l.code as Language)}
                            className="p-1 rounded hover:bg-slate-600 text-slate-400 hover:text-cyan-300 transition-colors"
                            title={`Copiar link ${l.name} (?lang=${l.slug})`}
                          >
                            {copiedCode === l.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          
                          {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                        </div>
                      </div>
                    ))}

                    {/* Open Full Share Modal Option */}
                    <div className="pt-1 mt-1 border-t border-slate-700/80 px-2 pb-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLangOpen(false);
                          setIsShareModalOpen(true);
                        }}
                        className="w-full py-1.5 px-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/40 text-cyan-400 hover:text-cyan-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Ver Links pt, en, ru, hi, ko</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <PopularCodesModal
        isOpen={isPopularModalOpen}
        onClose={() => setIsPopularModalOpen(false)}
        onNavigateToUssd={onNavigateToUssd}
      />

      <ShareLanguageModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <OpenSourceAiModal
        isOpen={isOpenSourceModalOpen}
        onClose={() => setIsOpenSourceModalOpen(false)}
      />
    </>
  );
};
