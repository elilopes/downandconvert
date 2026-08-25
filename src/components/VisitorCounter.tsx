import React, { useEffect, useState } from 'react';
import { Users, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const VisitorCounter: React.FC = () => {
  const { t, lang } = useLanguage();
  const [count, setCount] = useState<number>(1);
  const [onlineCount, setOnlineCount] = useState<number>(18);

  useEffect(() => {
    const visited = sessionStorage.getItem('downandconvert_visited_fresh');
    let currentCount = 1;
    
    try {
      const saved = localStorage.getItem('downandconvert_total_visits_fresh');
      if (saved) {
        currentCount = parseInt(saved, 10) || 1;
      }
      
      if (!visited) {
        currentCount += 1;
        localStorage.setItem('downandconvert_total_visits_fresh', currentCount.toString());
        sessionStorage.setItem('downandconvert_visited_fresh', 'true');
      }
    } catch (e) {
      // fallback
    }
    
    setCount(currentCount);

    // Randomize online users slightly for realism (starting small from zero/recent activity)
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next > 5 && next < 80 ? next : 18;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const localeMap: Record<string, string> = {
    PT: 'pt-BR',
    EN: 'en-US',
    RU: 'ru-RU',
    HI: 'hi-IN',
    KO: 'ko-KR',
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-4 py-2.5 shadow-inner backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-300 font-medium">
          {onlineCount} {t('visitor.onlineNow')}
        </span>
      </div>

      <div className="hidden sm:block text-slate-700">•</div>

      <div className="flex items-center gap-1.5">
        <Eye className="w-4 h-4 text-cyan-400" />
        <span className="text-slate-400">{t('visitor.totalVisits')}</span>
        <span className="font-mono font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40 tracking-wider">
          {count.toLocaleString(localeMap[lang] || 'pt-BR')}
        </span>
      </div>
    </div>
  );
};
