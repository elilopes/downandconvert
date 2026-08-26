import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const VisitorCounter: React.FC = () => {
  const { t, lang } = useLanguage();
  const [count, setCount] = useState<number>(0);
  const [onlineCount, setOnlineCount] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;
    let sessionId = sessionStorage.getItem('downandconvert_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('downandconvert_session_id', sessionId);
    }

    const initCounter = async () => {
      try {
        const statsRef = doc(db, 'stats', 'visitors');
        
        // Track unique visit
        const visited = sessionStorage.getItem('downandconvert_visited_firebase');
        if (!visited) {
          const docSnap = await getDoc(statsRef);
          if (!docSnap.exists()) {
            await setDoc(statsRef, { count: 1 }).catch(() => {});
          } else {
            await updateDoc(statsRef, { count: increment(1) }).catch(() => {});
          }
          sessionStorage.setItem('downandconvert_visited_firebase', 'true');
        }

        // Fetch current count
        const currentSnap = await getDoc(statsRef);
        if (currentSnap.exists() && isMounted) {
          setCount(currentSnap.data().count);
        }
      } catch (err) {
        console.warn('Visitor stats unavailable (offline)');
      }
    };

    const updatePresence = async () => {
      try {
        if (!sessionId) return;
        const presenceRef = doc(db, 'online_users', sessionId);
        await setDoc(presenceRef, { lastSeen: serverTimestamp() }).catch(() => {});
      } catch (err) {
        console.warn('Presence update unavailable (offline)');
      }
    };

    const fetchOnlineUsers = async () => {
      try {
        const oneMinuteAgo = Timestamp.fromMillis(Date.now() - 60000);
        const q = query(collection(db, 'online_users'), where('lastSeen', '>=', oneMinuteAgo));
        const querySnapshot = await getDocs(q);
        if (isMounted) {
          setOnlineCount(Math.max(1, querySnapshot.size));
        }
      } catch (err) {
        console.warn('Online users unavailable (offline)');
      }
    };

    // Initial calls
    initCounter();
    updatePresence();
    fetchOnlineUsers();

    // Set up intervals
    const presenceInterval = setInterval(updatePresence, 30000); // update every 30s
    const onlineCheckInterval = setInterval(fetchOnlineUsers, 30000); // check every 30s
    const statsCheckInterval = setInterval(async () => {
      try {
        const statsRef = doc(db, 'stats', 'visitors');
        const snap = await getDoc(statsRef);
        if (snap.exists() && isMounted) {
          setCount(snap.data().count);
        }
      } catch (e) {}
    }, 60000); // Refresh total count every minute

    return () => {
      isMounted = false;
      clearInterval(presenceInterval);
      clearInterval(onlineCheckInterval);
      clearInterval(statsCheckInterval);
    };
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

