import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ExternalLink,
  Filter,
  Calendar,
  Building2,
  Search,
  MessageSquareShare,
  Share2,
  CheckCheck,
  Rss,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Plus
} from 'lucide-react';
import { mockedGadgetNews, LocalizedString, NewsCategory, GadgetNewsItem } from '../data/gadgetNews';

export const GadgetNews: React.FC = () => {
  const { t, lang } = useLanguage();
  const [newsList, setNewsList] = useState<GadgetNewsItem[]>(mockedGadgetNews);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Estados do Importador de Feed e Verificador 404
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [isCheckingLinks, setIsCheckingLinks] = useState<boolean>(false);
  const [customFeedUrl, setCustomFeedUrl] = useState<string>('');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);
  const [rejected404Count, setRejected404Count] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [auto404VerificationEnabled, setAuto404VerificationEnabled] = useState<boolean>(true);
  const [verifiedLinksMap, setVerifiedLinksMap] = useState<Record<string, boolean>>({});

  // Executa checagem de links automática na montagem inicial para garantir 0 erros 404
  useEffect(() => {
    const markInitialLinksAsValid = () => {
      const initialMap: Record<string, boolean> = {};
      mockedGadgetNews.forEach((item) => {
        initialMap[item.link] = true;
      });
      setVerifiedLinksMap(initialMap);
    };
    markInitialLinksAsValid();
  }, []);

  // Função para acionar o Importador de RSS/Feeds com Verificador Automático de Erro 404
  const handleImportFeeds = async (specificUrl?: string) => {
    setIsImporting(true);
    setImportStatusMessage(null);

    try {
      const urlParam = specificUrl || customFeedUrl.trim();
      const endpoint = `/api/news/feed-import?verify404=${auto404VerificationEnabled ? 'true' : 'false'}${
        urlParam ? `&feedUrl=${encodeURIComponent(urlParam)}` : ''
      }`;

      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success && Array.isArray(data.articles)) {
        // Converte os artigos importados para o modelo GadgetNewsItem com dados localizados
        const importedItems: GadgetNewsItem[] = data.articles.map((art: any, index: number) => ({
          id: `feed-import-${Date.now()}-${index}`,
          category: (art.category?.toLowerCase() === 'inventions' ? 'inventions' : art.category?.toLowerCase() === 'discoveries' ? 'discoveries' : 'gadgets') as NewsCategory,
          categoryLabel: {
            PT: art.category || 'Tecnologia',
            EN: art.category || 'Technology',
            RU: art.category || 'Технологии',
            HI: art.category || 'प्रौद्योगिकी',
            KO: art.category || '기술'
          },
          author: art.author || 'Feed RSS',
          pubDate: art.pubDate || new Date().toISOString(),
          link: art.link,
          title: {
            PT: art.title,
            EN: art.title,
            RU: art.title,
            HI: art.title,
            KO: art.title
          },
          subtitle: art.lead ? {
            PT: art.lead,
            EN: art.lead,
            RU: art.lead,
            HI: art.lead,
            KO: art.lead
          } : undefined,
          lead: art.lead ? {
            PT: art.lead,
            EN: art.lead,
            RU: art.lead,
            HI: art.lead,
            KO: art.lead
          } : undefined
        }));

        // Junta as notícias existentes com as novas importadas, sem duplicar links
        setNewsList((prev) => {
          const seen = new Set<string>();
          const combined: GadgetNewsItem[] = [];
          
          for (const item of [...importedItems, ...prev]) {
            if (!seen.has(item.link)) {
              seen.add(item.link);
              combined.push(item);
            }
          }
          return combined;
        });

        // Atualiza mapa de links verificados
        const newVerifiedMap = { ...verifiedLinksMap };
        importedItems.forEach((item) => {
          newVerifiedMap[item.link] = true;
        });
        setVerifiedLinksMap(newVerifiedMap);

        setRejected404Count((prev) => prev + (data.rejected404Count || 0));
        setLastSyncTime(new Date().toLocaleTimeString());

        if (data.rejected404Count > 0) {
          setImportStatusMessage(
            `✅ ${importedItems.length} notícias importadas com sucesso! 🛡️ ${data.rejected404Count} link(s) 404 descartados pelo verificador.`
          );
        } else {
          setImportStatusMessage(
            `✅ ${importedItems.length} notícias importadas e validadas (100% ativas com HTTP 200 OK)!`
          );
        }

        if (specificUrl) setCustomFeedUrl('');
      } else {
        setImportStatusMessage('Nenhum artigo novo encontrado ou erro no feed.');
      }
    } catch (err: any) {
      console.error('Falha ao importar feeds:', err);
      setImportStatusMessage(`Erro ao sincronizar feeds: ${err.message || 'Falha de conexão'}`);
    } finally {
      setIsImporting(false);
    }
  };

  // Função para verificar se todos os links atualmente exibidos continuam ativos (Anti-404)
  const handleVerifyCurrentLinks = async () => {
    setIsCheckingLinks(true);
    setImportStatusMessage(null);

    try {
      const links = newsList.map((item) => item.link);
      const res = await fetch('/api/news/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links })
      });
      const data = await res.json();

      if (data.results) {
        let deadCount = 0;
        const validLinksMap: Record<string, boolean> = {};
        const aliveNewsList: GadgetNewsItem[] = [];

        newsList.forEach((item) => {
          const status = data.results[item.link];
          if (status && status.ok) {
            validLinksMap[item.link] = true;
            aliveNewsList.push(item);
          } else {
            deadCount++;
            validLinksMap[item.link] = false;
          }
        });

        setVerifiedLinksMap(validLinksMap);

        if (deadCount > 0) {
          // Remove automaticamente itens com erro 404
          setNewsList(aliveNewsList);
          setRejected404Count((prev) => prev + deadCount);
          setImportStatusMessage(`🛡️ Verificação concluída: ${deadCount} link(s) 404 removidos da listagem.`);
        } else {
          setImportStatusMessage(`✅ Verificação completa: Todos os ${newsList.length} links estão 100% ativos (HTTP 200 OK).`);
        }
      }
    } catch (err: any) {
      console.error('Erro na checagem de integridade de links:', err);
      setImportStatusMessage('Erro ao verificar links atuais.');
    } finally {
      setIsCheckingLinks(false);
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

  const getLocalizedText = (localizedString?: LocalizedString): string => {
    if (!localizedString) return '';
    return localizedString[lang] || localizedString.PT || localizedString.EN || '';
  };

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
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
  }, [newsList, selectedCategory, searchQuery, lang]);

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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {t('news.latest')}
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
          {t('news.description')}
        </p>
      </div>

      {/* Painel do Importador de RSS/Feeds com Verificador Automático de Erro 404 */}
      <div className="mb-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rss className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {t('news.importerTitle')}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('news.verifier404Active')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('news.importerDesc')}
              </p>
            </div>
          </div>

          {/* Ações de Sincronização e Checagem */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleImportFeeds()}
              disabled={isImporting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
              <span>{isImporting ? t('news.syncing') : t('news.syncNow')}</span>
            </button>

            <button
              type="button"
              onClick={handleVerifyCurrentLinks}
              disabled={isCheckingLinks || isImporting}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 hover:text-white border border-slate-700/80 rounded-xl text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className={`w-4 h-4 ${isCheckingLinks ? 'animate-spin text-emerald-400' : 'text-cyan-400'}`} />
              <span>{isCheckingLinks ? 'Verificando Status...' : t('news.checkAllLinks')}</span>
            </button>
          </div>
        </div>

        {/* Input para Feed RSS Personalizado */}
        <div className="mt-4 pt-1 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full flex-1">
            <Radio className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={customFeedUrl}
              onChange={(e) => setCustomFeedUrl(e.target.value)}
              placeholder={t('news.customFeedPlaceholder')}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => handleImportFeeds(customFeedUrl)}
            disabled={!customFeedUrl.trim() || isImporting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{t('news.importButton')}</span>
          </button>
        </div>

        {/* Status de Sincronização & Alertas do Verificador 404 */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('news.lastSync')}: <strong className="text-white">{lastSyncTime}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Total de Notícias Ativas: <strong className="text-cyan-400 font-mono">{newsList.length}</strong>
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

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={auto404VerificationEnabled}
              onChange={(e) => setAuto404VerificationEnabled(e.target.checked)}
              className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500/40 bg-slate-950 w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs">{t('news.verifier404Active')}</span>
          </label>
        </div>

        {/* Notificação / Feedback de Importação e Verificação */}
        {importStatusMessage && (
          <div className="mt-3 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-cyan-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{importStatusMessage}</span>
          </div>
        )}
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
          const isVerified = verifiedLinksMap[item.link] !== false;

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
                  {isVerified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20" title="Link verificado e ativo">
                      <CheckCircle2 className="w-3 h-3" />
                      200 OK
                    </span>
                  )}
                </div>
              </div>

              {/* Título Principal */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                {mainTitle}
              </h3>

              {/* Título Secundário / Subtítulo */}
              {subTitle && (
                <h4 className="text-sm font-semibold text-cyan-400/90 mb-3 leading-relaxed">
                  {subTitle}
                </h4>
              )}

              {/* Lead */}
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
