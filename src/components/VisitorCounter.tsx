import React, { useEffect, useState } from 'react';
import { Users, Eye, Sparkles } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(1542890);
  const [onlineCount, setOnlineCount] = useState<number>(142);

  useEffect(() => {
    // Check if visit already counted in this session
    const visited = sessionStorage.getItem('downandconvert_visited');
    let currentCount = 1542890;
    
    try {
      const saved = localStorage.getItem('downandconvert_total_visits');
      if (saved) {
        currentCount = parseInt(saved, 10);
      }
      
      if (!visited) {
        currentCount += 1;
        localStorage.setItem('downandconvert_total_visits', currentCount.toString());
        sessionStorage.setItem('downandconvert_visited', 'true');
      }
    } catch (e) {
      // fallback
    }
    
    setCount(currentCount);

    // Randomize online users slightly for realism
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next > 90 && next < 350 ? next : 142;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-4 py-2.5 shadow-inner backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-300 font-medium">{onlineCount} online agora</span>
      </div>

      <div className="hidden sm:block text-slate-700">•</div>

      <div className="flex items-center gap-1.5">
        <Eye className="w-4 h-4 text-cyan-400" />
        <span className="text-slate-400">Acessos Totais:</span>
        <span className="font-mono font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40 tracking-wider">
          {count.toLocaleString('pt-BR')}
        </span>
      </div>
    </div>
  );
};
