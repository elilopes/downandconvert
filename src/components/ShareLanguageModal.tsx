import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Globe, Sparkles, MessageCircle, Send, Twitter } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../contexts/LanguageContext';

interface ShareLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareLanguageModal: React.FC<ShareLanguageModalProps> = ({ isOpen, onClose }) => {
  const { lang, setLang, t, getLanguageUrl } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];
  const currentQueryUrl = getLanguageUrl(lang, false);
  const currentPathUrl = getLanguageUrl(lang, true);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleNativeShare = async (targetLang: Language) => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || currentLangInfo;
    const url = getLanguageUrl(targetLang, false);
    const title = `${t(`seo.title.converter`)} (${langInfo.name})`;
    const text = `${t('seo.desc.converter')} - Acesse em ${langInfo.name}:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        setShareFeedback(t('share.copied'));
        setTimeout(() => setShareFeedback(null), 2500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // fallback to clipboard
        }
      }
    }

    handleCopy(url, `main-${targetLang}`);
  };

  const getWhatsAppShareUrl = (targetLang: Language) => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || currentLangInfo;
    const url = getLanguageUrl(targetLang, false);
    const msg = `⚡ *Down&Convert* (${langInfo.name})\n${t('seo.desc.converter')}\n\n👉 Acesse agora: ${url}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  };

  const getTelegramShareUrl = (targetLang: Language) => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || currentLangInfo;
    const url = getLanguageUrl(targetLang, false);
    const msg = `Down&Convert (${langInfo.name}) - ${t('seo.desc.converter')}`;
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(msg)}`;
  };

  const getTwitterShareUrl = (targetLang: Language) => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || currentLangInfo;
    const url = getLanguageUrl(targetLang, false);
    const text = `Down&Convert (${langInfo.name}) - ${t('seo.desc.converter')}`;
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-300">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>{t('share.modal.title')}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {t('share.modal.desc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Active Language Featured Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-950 to-emerald-950/20 border border-cyan-500/30 shadow-lg relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentLangInfo.flag}</span>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 block">
                    {t('share.currentLang')}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {currentLangInfo.name} ({currentLangInfo.nativeName})
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNativeShare(lang)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{shareFeedback || t('share.nativeShare')}</span>
              </button>
            </div>

            {/* Quick Share Buttons (WhatsApp, Telegram, X) */}
            <div className="flex items-center gap-2 pt-2 pb-3 border-b border-slate-800/80">
              <a
                href={getWhatsAppShareUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={getTelegramShareUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60 transition-colors"
                title="Compartilhar no Telegram"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
              <a
                href={getTwitterShareUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Compartilhar no X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>
            </div>

            {/* Active URLs */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-500 font-mono">Link com Parâmetro (?lang={currentLangInfo.slug}):</span>
                  <span className="font-mono text-cyan-300 truncate select-all">{currentQueryUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(currentQueryUrl, 'current-query')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                    copiedKey === 'current-query'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copiedKey === 'current-query' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'current-query' ? t('share.copied') : t('share.copyLink')}</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-slate-500 font-mono">Link Direto Amigável (/{currentLangInfo.slug}):</span>
                  <span className="font-mono text-emerald-300 truncate select-all">{currentPathUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(currentPathUrl, 'current-path')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                    copiedKey === 'current-path'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copiedKey === 'current-path' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'current-path' ? t('share.copied') : t('share.copyLink')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* All Languages Direct Links Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{t('share.allLanguages')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.map((item) => {
                const queryUrl = getLanguageUrl(item.code, false);
                const pathUrl = getLanguageUrl(item.code, true);
                const isSelected = item.code === lang;

                return (
                  <div
                    key={item.code}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/20 border-cyan-500/40 ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.flag}</span>
                          <div>
                            <span className="text-sm font-bold text-white block leading-tight">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {item.nativeName}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Ativo
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 font-mono text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800/80 my-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-500">Path:</span>
                          <span className="text-emerald-300 select-all truncate">/{item.slug}</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-500">Query:</span>
                          <span className="text-cyan-300 select-all truncate">?lang={item.slug}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLang(item.code);
                        }}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'text-cyan-400 hover:text-cyan-300'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ Idioma Ativo' : 'Mudar Idioma'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(pathUrl, `path-${item.code}`)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                            copiedKey === `path-${item.code}`
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                          title={`Copiar ${pathUrl}`}
                        >
                          {copiedKey === `path-${item.code}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>/{item.slug}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(queryUrl, `query-${item.code}`)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                            copiedKey === `query-${item.code}`
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                          }`}
                          title={`Copiar ${queryUrl}`}
                        >
                          {copiedKey === `query-${item.code}` ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                          <span>?lang</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanatory Info Card */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <p className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Como funcionam os links de idioma?</span>
            </p>
            <p>
              Qualquer usuário ou amigo que abrir o link com o prefixo (ex: <code className="text-emerald-300">/ru</code> ou <code className="text-cyan-300">?lang=ru</code>) terá a interface, botões, notícias e descrições do conversor e códigos USSD renderizados <strong>automaticamente no idioma especificado</strong>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
