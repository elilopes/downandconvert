import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Youtube, 
  Play, 
  Plus, 
  RefreshCw, 
  LogIn, 
  User as UserIcon,
  AlertCircle,
  Info,
  ShieldAlert,
  X,
  Clipboard,
  Sparkles,
  FileUp,
  Radio,
  Download,
  Check,
  Video,
  Music,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/auth';
import type { User } from 'firebase/auth';
import { SponsoredAdModal } from './SponsoredAdModal';
import { AdPlayerModal } from './AdPlayerModal';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoDownloaderProps {
  onFilesSelected: (files: File[]) => void;
  onOpenRecorder: () => void;
  onOpenSampleModal: () => void;
  onNavigateToConverter?: () => void;
  isProcessing?: boolean;
}

export const VideoDownloader: React.FC<VideoDownloaderProps> = ({
  onFilesSelected,
  onOpenRecorder,
  onOpenSampleModal,
  onNavigateToConverter,
  isProcessing = false,
}) => {
  const { t } = useLanguage();

  // Search and URL state
  const [searchInput, setSearchInput] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'vimeo' | 'twitter' | 'unknown'>('youtube');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState('');
  const [errorDetails, setErrorDetails] = useState<{
    is429: boolean;
    message: string;
    code?: number;
  } | null>(null);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Download mode & quality
  const [downloadMode, setDownloadMode] = useState<'audio' | 'video'>('video');
  const [videoQuality, setVideoQuality] = useState<'highest' | '360p' | 'lowest'>('highest');

  // Sponsored Ad state
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // VAST Ad State
  const [showVastAd, setShowVastAd] = useState(false);
  const [pendingVastAction, setPendingVastAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const val = searchInput.toLowerCase();
    if (!val) {
      setPlatform('youtube');
      return;
    }
    
    if (val.includes('tiktok.com')) setPlatform('tiktok');
    else if (val.includes('instagram.com')) setPlatform('instagram');
    else if (val.includes('facebook.com') || val.includes('fb.watch')) setPlatform('facebook');
    else if (val.includes('vimeo.com')) setPlatform('vimeo');
    else if (val.includes('twitter.com') || val.includes('x.com')) setPlatform('twitter');
    else if (val.includes('youtube.com') || val.includes('youtu.be')) setPlatform('youtube');
    else setPlatform('unknown');
  }, [searchInput]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, tkn) => {
        setUser(user);
        setToken(tkn);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSearchInput(text);
    } catch (err) {
      console.warn('Falha ao ler a área de transferência', err);
    }
  };

  const handleSearchClick = () => {
    setSearchError('');
    setErrorDetails(null);
    setSearchResults([]);
    setDownloadSuccess(null);
    if (!searchInput.trim()) return;

    const query = searchInput.trim();
    const isHttp = query.startsWith('http://') || query.startsWith('https://');

    // Trigger VAST Video Ad modal first, then proceed with the search/download
    setPendingVastAction(() => () => {
      if (isHttp) {
        downloadUrl(query);
      } else {
        performSearch(query);
      }
    });
    setShowVastAd(true);
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError('');
    setErrorDetails(null);
    try {
      const res = await fetch(`/api/yt/search?q=${encodeURIComponent(query)}`);

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        let is429 = res.status === 429;
        let msg = errorText;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed.code === 429 || parsed.error === 'RATE_LIMIT_429') is429 = true;
          msg = parsed.message || msg;
        } catch (e) {
          if (errorText.includes('429') || errorText.includes('Too Many Requests') || errorText.includes('Anti-Bot')) {
            is429 = true;
          }
        }
        if (is429) {
          setErrorDetails({
            is429: true,
            code: 429,
            message: 'O YouTube bloqueou temporariamente as requisições do servidor em nuvem (Status 429: Too Many Requests / Proteção Anti-Bot).'
          });
          return;
        }
        throw new Error(msg || 'Falha ao buscar vídeos no YouTube');
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setSearchError('Nenhum resultado encontrado. Tente outros termos ou cole o link direto.');
      } else {
        setSearchResults(data);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchError(
        err.message || 'Erro ao pesquisar vídeos. Tente colar o link direto do vídeo.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const downloadUrl = async (url: string, title?: string) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setSearchError('');
    setErrorDetails(null);
    setDownloadSuccess(null);

    const maxRetries = 2;
    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        const isHttp = url.startsWith('http://') || url.startsWith('https://');

        const fetchUrl = isHttp
          ? `/api/yt/download?url=${encodeURIComponent(url)}&mode=${downloadMode}&quality=${videoQuality}` 
          : url;

        const response = await fetch(fetchUrl);
        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          let is429 = response.status === 429;
          let detailedMsg = errText;
          try {
            const parsed = JSON.parse(errText);
            if (parsed.code === 429 || parsed.error === 'RATE_LIMIT_429') {
              is429 = true;
            }
            detailedMsg = parsed.message || detailedMsg;
          } catch(e) {
            if (errText.includes('429') || errText.includes('Too Many Requests') || errText.includes('Anti-Bot') || errText.includes('Sign in to confirm')) {
              is429 = true;
            }
          }

          if (is429) {
            setErrorDetails({
              is429: true,
              code: 429,
              message: detailedMsg || 'O provedor bloqueou temporariamente a requisição no servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
            });
            return;
          }

          const isServerRetryable = response.status === 500 || response.status === 502 || response.status === 503 || response.status === 504;
          if (attempt <= maxRetries && isServerRetryable) {
            const delayMs = Math.pow(2, attempt - 1) * 1500;
            console.warn(`[downloadUrl] Falha ${response.status} na tentativa ${attempt}/${maxRetries + 1}. Tentando novamente em ${delayMs}ms...`);
            setSearchError(`Servidor ocupado (${response.status}). Tentando novamente em ${(delayMs / 1000).toFixed(1)}s (Tentativa ${attempt + 1}/${maxRetries + 1})...`);
            await new Promise((r) => setTimeout(r, delayMs));
            continue;
          }

          throw new Error(detailedMsg || `Erro ao baixar arquivo (status ${response.status}).`);
        }

        const blob = await response.blob();
        
        let filename = 'media.mp4';
        if (isHttp) {
          const contentDisposition = response.headers.get('content-disposition');
          if (contentDisposition && contentDisposition.includes('filename="')) {
            filename = decodeURIComponent(contentDisposition.split('filename="')[1].split('"')[0]);
          } else {
            filename = title ? `${title}.${downloadMode === 'video' ? 'mp4' : 'm4a'}` : `media_${downloadMode}.${downloadMode === 'video' ? 'mp4' : 'm4a'}`;
          }
        } else {
          filename = url.split('/').pop()?.split('?')[0] || 'media.mp4';
        }

        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(blob);
        downloadAnchor.download = filename;
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        setTimeout(() => URL.revokeObjectURL(downloadAnchor.href), 100);
        
        if (downloadMode === 'video') {
          setDownloadSuccess(`Vídeo "${filename}" baixado com sucesso!`);
        } else {
          setDownloadSuccess(`Áudio "${filename}" baixado com sucesso!`);
        }

        setSearchInput('');
        setVideoInfo(null);
        setSearchResults([]);
        setSearchError('');
        return;
      } catch (err: unknown) {
        lastError = err;
        if (attempt <= maxRetries) {
          const delayMs = Math.pow(2, attempt - 1) * 1500;
          console.warn(`[downloadUrl] Erro na tentativa ${attempt}. Tentando novamente em ${delayMs}ms...`, err);
          setSearchError(`Falha temporária de conexão. Tentando novamente em ${(delayMs / 1000).toFixed(1)}s (Tentativa ${attempt + 1}/${maxRetries + 1})...`);
          await new Promise((r) => setTimeout(r, delayMs));
        }
      }
    }

    const msg = lastError instanceof Error ? lastError.message : 'Falha ao buscar URL.';
    setSearchError(msg);
    setIsDownloading(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Downloader Hero */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>Downloader de Mídias Web & Redes Sociais</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
          Baixe Vídeos & Mídias da Web
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Cole links diretos de TikTok, Instagram Reels, Facebook Vídeos, Twitter/X, Vimeo e YouTube para baixar em alta qualidade ou extrair áudio direto.
        </p>
      </div>

      {/* Main Search / URL Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
        <div className="flex flex-col gap-4">
          {/* Controls Bar: Mode Switch, Quality, Auth */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-slate-400 font-semibold">Modo de Download:</span>
              <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700 w-fit">
                <button
                  onClick={() => setDownloadMode('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    downloadMode === 'video' 
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Baixar Vídeo (MP4)</span>
                </button>
                <button
                  onClick={() => setDownloadMode('audio')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    downloadMode === 'audio' 
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Extrair Áudio</span>
                </button>
              </div>

              {downloadMode === 'video' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">Qualidade:</span>
                  <select
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value as any)}
                    className="bg-slate-800 text-xs text-slate-300 border border-slate-700 rounded-lg px-2.5 py-1.5 outline-none hover:border-slate-600 transition-colors focus:border-emerald-500 cursor-pointer font-medium"
                  >
                    <option value="highest">Máxima (1080p / 720p)</option>
                    <option value="360p">Média (360p)</option>
                    <option value="lowest">Mais Leve (240p)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Optional Auth Button */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <UserIcon className="w-3.5 h-3.5" /> {user.displayName || 'Conectado'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-slate-400 hover:text-rose-300 underline underline-offset-2 transition-colors ml-1"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="group flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/80 px-3 py-1.5 rounded-xl border border-slate-700/60 w-fit"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-400" />
                <span>{isLoggingIn ? 'Conectando...' : 'Login Opcional (Bypass Anti-Bot)'}</span>
              </button>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex items-center bg-slate-950/80 border border-slate-700/90 rounded-2xl p-2 focus-within:border-cyan-500/80 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
            <div className="pl-3 pr-2 text-slate-400">
              {isSearching || isDownloading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
              ) : (
                <Youtube className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <input
              type="text"
              placeholder={t('dropzone.placeholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm py-2 px-1 placeholder:text-slate-500"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setSearchResults([]); setVideoInfo(null); setSearchError(''); setDownloadSuccess(null); }}
                className="p-2 text-slate-400 hover:text-slate-200 mr-1"
                title="Limpar"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handlePasteClipboard}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors mr-2 cursor-pointer"
              title={t('dropzone.paste')}
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('dropzone.paste')}</span>
            </button>
            <button
              onClick={handleSearchClick}
              disabled={isSearching || isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Baixando...' : isSearching ? 'Buscando...' : 'Baixar Mídia'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 px-1">
            {t('dropzone.urlHint')}
          </p>

          {/* Success Banner */}
          {downloadSuccess && (
            <div className="mt-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{downloadSuccess}</span>
              </div>
              <button
                onClick={() => setDownloadSuccess(null)}
                className="text-xs text-emerald-400 hover:text-white underline shrink-0"
              >
                Fechar
              </button>
            </div>
          )}

          {/* Error Message */}
          {searchError && !errorDetails?.is429 && (
            <div className="mt-2 text-rose-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3 bg-rose-950/30 rounded-xl border border-rose-900/50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" /> 
                <span>{searchError}</span>
              </div>
              <button
                onClick={() => setSearchError('')}
                className="text-[11px] text-rose-400 hover:text-rose-200 underline ml-auto shrink-0 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          )}

          {/* Error 429 Explanatory Card */}
          {errorDetails?.is429 && (
            <div className="mt-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 p-4 sm:p-5 text-left shadow-xl shadow-amber-950/20 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-amber-200">
                        {t('error.429.title')}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        HTTP 429 Too Many Requests
                      </span>
                    </div>
                    <p className="text-xs text-amber-300/90 mt-0.5">
                      {t('error.429.desc')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setErrorDetails(null)}
                  className="p-1 text-amber-400/70 hover:text-amber-200 hover:bg-amber-500/10 rounded-lg transition-colors shrink-0"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3.5 pt-3 border-t border-amber-500/20 text-xs text-slate-300 space-y-2.5">
                <div className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-slate-300 text-[11px] sm:text-xs">
                    {t('error.429.why')}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-amber-200 text-xs mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {t('error.429.solution')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToConverter && onNavigateToConverter()}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white group-hover:text-emerald-300">Ir para o Conversor</p>
                        <p className="text-[10px] text-slate-400 truncate">100% privado e sem limites</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenRecorder}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white group-hover:text-cyan-300">Gravar Tela / Câmera</p>
                        <p className="text-[10px] text-slate-400 truncate">Captura em tempo real</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenSampleModal}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-left transition-all group cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white group-hover:text-indigo-300">Vídeo de Exemplo</p>
                        <p className="text-[10px] text-slate-400 truncate">Testar agora</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && !isSearching && !videoInfo && (
            <div className="mt-4 bg-slate-950 border border-slate-700/80 rounded-2xl p-3 shadow-xl max-h-96 overflow-y-auto space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
                Resultados da Busca (Clique para Baixar)
              </h4>
              {searchResults.map((vid) => (
                <div 
                  key={vid.id} 
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-800/80 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-slate-700" 
                  onClick={() => {
                    setPendingVastAction(() => () => downloadUrl(vid.url, vid.title));
                    setShowVastAd(true);
                  }}
                >
                  <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-black">
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] text-white font-mono">{vid.duration}</span>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-300" title={vid.title}>{vid.title}</h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{vid.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 font-medium">
                        {downloadMode === 'video' ? 'Baixar MP4' : 'Extrair Áudio'}
                      </span>
                    </div>
                  </div>
                  <button className="shrink-0 p-2.5 rounded-xl bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-300 transition-colors font-bold text-xs flex items-center gap-1">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Supported Platforms Grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { name: 'TikTok', tag: 'Vídeos & Sons', color: 'border-rose-500/30 text-rose-400 bg-rose-500/5' },
          { name: 'Instagram', tag: 'Reels & Stories', color: 'border-pink-500/30 text-pink-400 bg-pink-500/5' },
          { name: 'Facebook', tag: 'Watch & Posts', color: 'border-blue-500/30 text-blue-400 bg-blue-500/5' },
          { name: 'Twitter / X', tag: 'Vídeos & GIFs', color: 'border-slate-500/30 text-slate-300 bg-slate-500/5' },
          { name: 'Vimeo', tag: 'HD & 4K', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' },
          { name: 'YouTube', tag: 'Manutenção', color: 'border-amber-500/30 text-amber-400 bg-amber-500/5' },
        ].map((plat) => (
          <div
            key={plat.name}
            className={`p-3 rounded-2xl border ${plat.color} text-center flex flex-col items-center justify-center`}
          >
            <span className="text-xs font-bold text-white">{plat.name}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">{plat.tag}</span>
          </div>
        ))}
      </div>

      {/* Sponsored Ad Modal */}
      <SponsoredAdModal
        isOpen={isAdOpen}
        onClose={() => {
          setIsAdOpen(false);
          setPendingAction(null);
        }}
        onProceed={() => {
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />

      {/* VAST Video Ad Modal */}
      <AdPlayerModal
        isOpen={showVastAd}
        adTagUrl="https://youradexchange.com/video/select.php?r=12052110"
        onClose={() => {
          setShowVastAd(false);
          setPendingVastAction(null);
        }}
        onComplete={() => {
          setShowVastAd(false);
          if (pendingVastAction) {
            pendingVastAction();
            setPendingVastAction(null);
          }
        }}
      />
    </div>
  );
};
