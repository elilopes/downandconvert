import React, { useRef, useState, useEffect } from 'react';
import { 
  UploadCloud, 
  Video, 
  Radio, 
  Sparkles, 
  Film, 
  FileVideo, 
  Disc3, 
  Link as LinkIcon, 
  AlertCircle, 
  Search, 
  Clipboard, 
  Youtube, 
  Play, 
  Plus, 
  RefreshCw, 
  LogIn, 
  User as UserIcon,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  FileUp,
  X
} from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/auth';
import type { User } from 'firebase/auth';
import { SponsoredAdModal } from './SponsoredAdModal';
import { useLanguage } from '../contexts/LanguageContext';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onOpenRecorder: () => void;
  onOpenSampleModal: () => void;
  isProcessing?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  onOpenRecorder,
  onOpenSampleModal,
  isProcessing = false,
}) => {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [show429Details, setShow429Details] = useState(true);
  const [videoInfo, setVideoInfo] = useState<any>(null); // For pasted URL info
  const [isDownloading, setIsDownloading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sponsored Ad state
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const rawFiles: File[] = Array.from(e.dataTransfer.files);
    const droppedFiles = rawFiles.filter((file: File) => {
      return (
        file.type.startsWith('video/') ||
        file.type.startsWith('audio/') ||
        /\.(mp4|mkv|webm|mov|avi|flv|3gp|m4v|ts|wmv|mpg|mpeg|mp3|wav|ogg|aac|m4a)$/i.test(file.name)
      );
    });

    if (droppedFiles.length > 0) {
      onFilesSelected(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
      e.target.value = '';
    }
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
    if (!searchInput.trim()) return;

    const query = searchInput.trim();
    const isHttp = query.startsWith('http://') || query.startsWith('https://');

    // Trigger sponsored modal first, then proceed with the search/download
    setPendingAction(() => () => {
      if (isHttp) {
        downloadUrl(query);
      } else {
        performSearch(query);
      }
    });
    setIsAdOpen(true);
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError('');
    setErrorDetails(null);
    try {
      // Busca de vídeos via endpoint do servidor (yt-search)
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

  const [downloadMode, setDownloadMode] = useState<'audio' | 'video'>('audio');
  const [videoQuality, setVideoQuality] = useState<'highest' | '360p' | 'lowest'>('highest');

  const downloadUrl = async (url: string, title?: string) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setSearchError('');
    setErrorDetails(null);

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
              message: 'O provedor bloqueou temporariamente a requisição no servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
            });
            return;
          }

          const isServerRetryable = response.status === 500 || response.status === 502 || response.status === 503 || response.status === 504;
          if (attempt <= maxRetries && isServerRetryable) {
            const delayMs = Math.pow(2, attempt - 1) * 1500; // 1.5s, 3.0s
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

        if (downloadMode === 'video') {
          // Se for vídeo, baixa diretamente para o PC em vez de jogar na fila de conversão de áudio
          const downloadAnchor = document.createElement('a');
          downloadAnchor.href = URL.createObjectURL(blob);
          downloadAnchor.download = filename;
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          document.body.removeChild(downloadAnchor);
          // Clean up object URL after a short delay
          setTimeout(() => URL.revokeObjectURL(downloadAnchor.href), 100);
        } else {
          // Modo áudio (adiciona ao Dropzone para converter/cortar)
          const file = new File([blob], filename, { type: blob.type || 'audio/mp4' });
          onFilesSelected([file]);
        }

        setSearchInput('');
        setVideoInfo(null);
        setSearchResults([]);
        setSearchError('');
        return; // Success, exit
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
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*,.mp4,.mkv,.webm,.mov,.avi,.flv,.3gp,.m4v,.ts,.wmv"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Login Options & Search */}
      <div className="mb-6 relative z-10 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-1 gap-2 sm:gap-0">
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-400 font-medium">Baixar por URL (YouTube, TikTok, Instagram, Facebook, Vimeo, etc.) ou Pesquisar (YouTube)</p>
            <div className="flex items-center gap-2">
              <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 w-fit">
                <button
                  onClick={() => setDownloadMode('audio')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${downloadMode === 'audio' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Extrair Áudio
                </button>
                <button
                  onClick={() => setDownloadMode('video')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${downloadMode === 'video' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Baixar Vídeo
                </button>
              </div>
              
              {downloadMode === 'video' && (
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value as any)}
                  className="bg-slate-800 text-[11px] text-slate-300 border border-slate-700 rounded-lg px-2 py-1.5 outline-none hover:border-slate-600 transition-colors focus:border-emerald-500 cursor-pointer"
                >
                  <option value="highest">Alta (Até 720p)</option>
                  <option value="360p">Média (360p)</option>
                  <option value="lowest">Baixa Qualidade</option>
                </select>
              )}
            </div>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <UserIcon className="w-3.5 h-3.5" /> {user.displayName || 'Conectado'}
              </span>
              <button 
                onClick={handleLogout}
                className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="group flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/80 px-2 py-1 rounded-md border border-slate-700/60 w-fit"
            >
              <LogIn className="w-3 h-3 text-emerald-500 group-hover:text-emerald-400" />
              {isLoggingIn ? 'Conectando...' : 'Login Opcional (Bypass Anti-Bot na Busca)'}
            </button>
          )}
        </div>
        <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-2xl p-1.5 focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
          <div className="pl-3 pr-2 text-slate-400">
            {isSearching || isDownloading ? <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" /> : <Youtube className="w-5 h-5" />}
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
              onClick={() => { setSearchInput(''); setSearchResults([]); setVideoInfo(null); setSearchError(''); }}
              className="p-1.5 text-slate-400 hover:text-slate-200 mr-1"
            >
              <AlertCircle className="w-4 h-4 opacity-0" />
              <span className="text-xs">X</span>
            </button>
          )}
          <button
            onClick={handleSearchClick}
            disabled={isSearching || isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 mr-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white text-xs font-semibold border border-emerald-500 transition-colors"
            title={t('dropzone.search')}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('dropzone.search')}</span>
          </button>
          <button
            onClick={handlePasteClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            title={t('dropzone.paste')}
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('dropzone.paste')}</span>
          </button>
        </div>

        {/* Error 429 Rich Explanatory Card */}
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

            {/* Explanation Section */}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                      <FileUp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white group-hover:text-emerald-300">Carregar Arquivo Local</p>
                      <p className="text-[10px] text-slate-400 truncate">100% privado e sem limites</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRecorder();
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSampleModal();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white group-hover:text-indigo-300">Vídeo de Exemplo</p>
                      <p className="text-[10px] text-slate-400 truncate">Testar conversão agora</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {searchError && !errorDetails?.is429 && (
          <div className="mt-2 text-rose-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-rose-950/30 rounded-xl border border-rose-900/50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" /> 
              <span>{searchError}</span>
            </div>
            <button
              onClick={() => setSearchError('')}
              className="text-[11px] text-rose-400 hover:text-rose-200 underline ml-auto shrink-0"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && !isSearching && !videoInfo && (
          <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-xl z-20 max-h-80 overflow-y-auto">
            {searchResults.map((vid) => (
              <div key={vid.id} className="flex items-center gap-3 p-2 hover:bg-slate-800/80 rounded-xl transition-colors group cursor-pointer" onClick={() => downloadUrl(vid.url, vid.title)}>
                <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden border border-slate-700">
                  <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] text-white font-mono">{vid.duration}</span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate" title={vid.title}>{vid.title}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{vid.author}</p>
                </div>
                <button className="shrink-0 p-2 text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center ${
          isDragOver
            ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01] shadow-2xl shadow-emerald-500/20'
            : 'border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 hover:border-emerald-500/60 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-emerald-500/10'
        }`}
      >
        {/* Glow ambient effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-700 -z-10" />

        {/* Center Icon with Pulse */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <UploadCloud className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors animate-bounce" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 bg-slate-900 rounded-xl border border-slate-700 shadow-md">
            <Disc3 className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Text Content */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
          {t('dropzone.drag')}
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed">
          {t('dropzone.click')}
        </p>

        {/* Format Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {['MP4', 'MKV', 'WebM', 'MOV', 'AVI', 'FLV', '3GP', 'TS', 'M4V'].map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/60 shadow-sm"
            >
              .{fmt.toLowerCase()}
            </span>
          ))}
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ➔ .MP3 (320 kbps)
          </span>
        </div>

        {/* Safe Badge Note & Size Limit */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/60 px-4 py-1.5 rounded-full border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Conversão 100% no navegador • Máx. 250MB por arquivo
          </div>
        </div>
      </div>

      {/* Alternative Input Options Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {/* Sample Video Button */}
        <button
          type="button"
          onClick={onOpenSampleModal}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all shadow-md group text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Testar com Vídeo de Exemplo</span>
        </button>

        {/* Record Video/Screen Button */}
        <button
          type="button"
          onClick={onOpenRecorder}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all shadow-md group text-sm font-medium"
        >
          <Radio className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          <span>{t('dropzone.record')}</span>
        </button>
      </div>

      {/* Sponsored Interstitial Ad Modal on Search/Download */}
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
    </div>
  );
};

