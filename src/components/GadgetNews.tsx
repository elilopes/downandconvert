import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, ExternalLink, Filter, Calendar, Building2, Search, Share2, CheckCheck, RefreshCw, Clock, MessageSquareShare } from 'lucide-react';
import { mockedGadgetNews, LocalizedString, NewsCategory, GadgetNewsItem } from '../data/gadgetNews';

export const GadgetNews: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(() => {
    const saved = localStorage.getItem('gadget_news_last_sync');
    if (saved) {
      try { return new Date(saved); } catch (e) { /* ignore */ }
    }
    return new Date();
  });

  const handleCopyLink = () => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('tab', 'news');
      navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareNewsItem = async (item: GadgetNewsItem) => {
    const title = getLocalizedText(item.title);
    const subtitle = getLocalizedText(item.subtitle);
    const lead = getLocalizedText(item.lead);
    const shareText = `📰 *${title}*\n${subtitle ? `\n_${subtitle}_\n` : ''}\n${lead ? `${lead}\n` : ''}\n🔗 Fonte (${item.author}): ${item.link}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: lead || subtitle || title,
          url: item.link
        });
        setCopiedItemId(item.id);
        setTimeout(() => setCopiedItemId(null), 2500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // continue to copy
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedItemId(item.id);
      setTimeout(() => setCopiedItemId(null), 2500);
    } catch (err) {
      setCopiedItemId(item.id);
      setTimeout(() => setCopiedItemId(null), 2500);
    }
  };

  const handleShareWhatsApp = (item: GadgetNewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const title = getLocalizedText(item.title);
    const text = `📰 *${title}*\n\n${item.link}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSyncNews = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const now = new Date();
      setLastSyncTime(now);
      localStorage.setItem('gadget_news_last_sync', now.toISOString());
      setIsSyncing(false);
    }, 900);
  };

  const nextSyncFormatted = useMemo(() => {
    const syncIntervalMs = 48 * 60 * 60 * 1000;
    const nextSync = new Date(lastSyncTime.getTime() + syncIntervalMs);
    const diffHours = Math.max(1, Math.round((nextSync.getTime() - Date.now()) / (1000 * 60 * 60)));
    return `${diffHours}h`;
  }, [lastSyncTime]);

  const getLocalizedText = (localizedString?: LocalizedString): string => {
    if (!localizedString) return '';
    return localizedString[lang] || localizedString.PT || localizedString.EN || '';
  };

  const filteredNews = useMemo(() => {
    return mockedGadgetNews.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const title = getLocalizedText(item.title).toLowerCase();
      const subtitle = getLocalizedText(item.subtitle).toLowerCase();
      const lead = getLocalizedText(item.lead).toLowerCase();
      const author = item.author.toLowerCase();
      const query = searchQuery.toLowerCase();

      return (
        title.includes(query) ||
        subtitle.includes(query) ||
        lead.includes(query) ||
        author.includes(query)
      );
    });
  }, [selectedCategory, searchQuery, lang]);

  const categoryFilters: { id: NewsCategory | 'all'; labelKey: string }[] = [
    { id: 'all', labelKey: 'news.filterAll' },
    { id: 'gadgets', labelKey: 'news.filterGadgets' },
    { id: 'inventions', labelKey: 'news.filterInventions' },
    { id: 'discoveries', labelKey: 'news.filterDiscoveries' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('news.latest')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {t('news.latest')}
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
          {t('news.description')}
        </p>

        {/* 48h Sync Indicator & Action Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">{t('news.autoUpdate48h')}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {t('news.nextSyncIn')} <strong>{nextSyncFormatted}</strong>
            </span>
          </div>

          <button
            onClick={handleSyncNews}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 shadow-sm"
            title={t('news.syncNow')}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t('news.syncing') : t('news.syncNow')}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700/80 rounded-xl transition-all font-semibold text-xs whitespace-nowrap cursor-pointer shadow-sm"
            title="Copiar link direto para esta aba"
          >
            {copiedLink ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copiar Link da Aba</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/40 p-3 sm:p-4 rounded-2xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categoryFilters.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('smartphones.searchPlaceholder')}
            className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
          />
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => {
          const mainTitle = getLocalizedText(item.title);
          const subTitle = getLocalizedText(item.subtitle);
          const leadContent = getLocalizedText(item.lead);
          const categoryTag = getLocalizedText(item.categoryLabel);

          return (
            <article
              key={item.id}
              className="flex flex-col bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-cyan-500/5 relative overflow-hidden group"
            >
              {/* Category & Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                    item.category === 'gadgets'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : item.category === 'inventions'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {categoryTag}
                </span>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {item.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {new Date(item.pubDate).toLocaleDateString(
                      lang === 'PT'
                        ? 'pt-BR'
                        : lang === 'RU'
                        ? 'ru-RU'
                        : lang === 'HI'
                        ? 'hi-IN'
                        : lang === 'KO'
                        ? 'ko-KR'
                        : 'en-US'
                    )}
                  </span>
                </div>
              </div>

              {/* Título Principal (Obrigatório) */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                {mainTitle}
              </h3>

              {/* Título Secundário / Subtítulo (Opcional - exibido se existir) */}
              {subTitle && (
                <h4 className="text-sm font-semibold text-cyan-400/90 mb-3 leading-relaxed">
                  {subTitle}
                </h4>
              )}

              {/* Lead (Opcional - exibido se existir) */}
              {leadContent && (
                <p className="text-sm text-slate-300/90 leading-relaxed mb-6 flex-1 text-justify sm:text-left">
                  {leadContent}
                </p>
              )}

              {/* Footer with share buttons and link to original publication */}
              <div className="mt-auto pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {t('news.source')}: <strong className="text-slate-300">{item.author}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* WhatsApp Quick Share */}
                  <button
                    type="button"
                    onClick={(e) => handleShareWhatsApp(item, e)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    title="Compartilhar no WhatsApp"
                  >
                    <MessageSquareShare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  {/* Share button */}
                  <button
                    type="button"
                    onClick={() => handleShareNewsItem(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      copiedItemId === item.id
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700'
                    }`}
                    title={t('news.shareNews')}
                  >
                    {copiedItemId === item.id ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t('news.copiedNotification')}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{t('news.shareNews')}</span>
                      </>
                    )}
                  </button>

                  {/* Read original article */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>{t('news.readMore')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredNews.length === 0 && (
        <div className="py-16 text-center bg-slate-900/30 border border-slate-800/60 rounded-2xl">
          <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">{t('smartphones.noResults')}</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t('smartphones.tryDifferentFilters')}</p>
        </div>
      )}
    </div>
  );
};
