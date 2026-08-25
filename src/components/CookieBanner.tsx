import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Cookie } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_given');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_given', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-sm shadow-2xl animate-slideUp">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-slate-300 text-xs leading-relaxed">
          <Cookie className="w-5 h-5 text-emerald-500 shrink-0" />
          <p>{t('cookie.banner.text')}</p>
        </div>
        <button
          onClick={handleAccept}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
        >
          {t('cookie.banner.button')}
        </button>
      </div>
    </div>
  );
};
