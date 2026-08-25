import React, { useState, useRef, useEffect } from 'react';
import { Music, ShieldCheck, Sparkles, Zap, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onOpenFAQ }) => {
  const { lang, setLang, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'PT', name: 'Português' },
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'KO', name: '한국어' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 ring-1 ring-white/20">
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
        </div>

        {/* Badges and Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {t('header.free')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t('header.secure')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-cyan-300">
              <Zap className="w-4 h-4 text-cyan-400" />
              {t('header.nolimit')}
            </span>
          </div>

          <button
            onClick={onOpenFAQ}
            className="text-xs font-medium px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors hidden sm:inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t('header.how')}
          </button>

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs font-medium"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline-block">{lang}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
            
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Language);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        lang === l.code
                          ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {l.name}
                      {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
