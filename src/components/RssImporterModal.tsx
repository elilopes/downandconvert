import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  X,
  Rss,
  RefreshCw,
  ShieldCheck,
  Radio,
  Plus,
  CheckCircle2,
  Lock,
  ExternalLink,
  Activity
} from 'lucide-react';

interface RssImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportFeeds: (specificUrl?: string) => Promise<void>;
  onVerifyCurrentLinks: () => Promise<void>;
  isImporting: boolean;
  isCheckingLinks: boolean;
  customFeedUrl: string;
  setCustomFeedUrl: (url: string) => void;
  importStatusMessage: string | null;
  lastSyncTime: string;
  totalActiveNews: number;
  rejected404Count: number;
}

export const RssImporterModal: React.FC<RssImporterModalProps> = ({
  isOpen,
  onClose,
  onImportFeeds,
  onVerifyCurrentLinks,
  isImporting,
  isCheckingLinks,
  customFeedUrl,
  setCustomFeedUrl,
  importStatusMessage,
  lastSyncTime,
  totalActiveNews,
  rejected404Count
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleCustomImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFeedUrl.trim() && !isImporting) {
      onImportFeeds(customFeedUrl.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 my-8">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-md shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Rss className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {t('news.importerTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {t('news.importerDesc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner do Verificador Automático 404 SEMPRE ATIVO */}
        <div className="mt-5 p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
          <div className="p-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                {t('news.verifier404Active')}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Lock className="w-2.5 h-2.5" />
                Sempre Ativo & Obrigatório
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 mt-1 leading-relaxed">
              Toda notícia importada via RSS ou link direto é rigorosamente testada com requisições HTTP 200 OK. Páginas com erro 404, domínios expirados ou links quebrados são descartados e bloqueados automaticamente.
            </p>
          </div>
        </div>

        {/* Ações de Sincronização e Checagem */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onImportFeeds()}
            disabled={isImporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
            <span>{isImporting ? t('news.syncing') : t('news.syncNow')}</span>
          </button>

          <button
            type="button"
            onClick={onVerifyCurrentLinks}
            disabled={isCheckingLinks || isImporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 hover:text-white border border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
          >
            <ShieldCheck className={`w-4 h-4 ${isCheckingLinks ? 'animate-spin text-emerald-400' : 'text-cyan-400'}`} />
            <span>{isCheckingLinks ? 'Verificando Status...' : t('news.checkAllLinks')}</span>
          </button>
        </div>

        {/* Input para Feed RSS Personalizado */}
        <form onSubmit={handleCustomImportSubmit} className="mt-5 space-y-2">
          <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            Adicionar Feed RSS Específico
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="url"
              value={customFeedUrl}
              onChange={(e) => setCustomFeedUrl(e.target.value)}
              placeholder={t('news.customFeedPlaceholder')}
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              disabled={!customFeedUrl.trim() || isImporting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t('news.importButton')}</span>
            </button>
          </div>
        </form>

        {/* Notificação / Feedback de Importação e Verificação */}
        {importStatusMessage && (
          <div className="mt-4 p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-cyan-200 flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{importStatusMessage}</span>
          </div>
        )}

        {/* Telemetria e Estatísticas */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('news.lastSync')}: <strong className="text-white font-mono">{lastSyncTime}</strong>
            </span>
            <span>•</span>
            <span>
              Notícias no feed: <strong className="text-cyan-400 font-mono">{totalActiveNews}</strong>
            </span>
            {rejected404Count > 0 && (
              <>
                <span>•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {rejected404Count} links 404 descartados
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer ml-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
