import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  Plus,
  PlusCircle,
  Sparkles,
  Lightbulb,
  Trash2,
  Flame,
  BadgeCheck,
  X,
  Clock,
  Target,
  Copy,
  Maximize2,
  ChevronUp,
  BookOpen,
  Zap
} from 'lucide-react';
import { mockedGadgetNews, LocalizedString, NewsCategory, GadgetNewsItem, NewsSummaryData } from '../data/gadgetNews';
import { AddNewsModal } from './AddNewsModal';
import { RssImporterModal } from './RssImporterModal';
import { generateAlgorithmicNewsSummary } from '../utils/newsSummarizer';

const STORAGE_KEY_CUSTOM_NEWS = 'user_custom_gadget_news_v1';

// Helper para verificar e excluir notícias que possuem a palavra "jogo", "jogos", "game", "games" ou trailers/filmes
export const isGameOrExcludedNews = (itemOrTitle?: any): boolean => {
  if (!itemOrTitle) return false;

  let titleText = '';
  let subtitleText = '';
  let leadText = '';
  let linkClean = '';

  const extractString = (val?: LocalizedString | string): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return [val.PT, val.EN, val.RU, val.HI, val.KO].filter(Boolean).join(' ');
  };

  if (typeof itemOrTitle === 'string') {
    titleText = itemOrTitle;
  } else if ('PT' in itemOrTitle || 'EN' in itemOrTitle) {
    titleText = extractString(itemOrTitle);
  } else if (typeof itemOrTitle === 'object') {
    titleText = extractString(itemOrTitle.title);
    subtitleText = extractString(itemOrTitle.subtitle);
    leadText = extractString(itemOrTitle.lead);
    if (itemOrTitle.link) {
      // Remove parâmetros de rastreamento/UTM
      linkClean = itemOrTitle.link.split('?')[0].replace(/[-_./]/g, ' ');
    }
  }

  const combinedText = `${titleText} ${subtitleText} ${leadText}`.toLowerCase();
  const cleanLink = linkClean.toLowerCase();

  // 1. Jogos / Games / Consoles / Trailers / Filmes
  const gamePattern = /\b(jogos?|games?|gamer|gamers|gaming|gameplay|jogabilidade|jogador|jogadores|videogames?|video\s+games?)\b/i;
  if (gamePattern.test(combinedText) || gamePattern.test(cleanLink)) {
    return true;
  }

  const otherPattern = /\b(trailer|trailers|filme|filmes|playstation|ps5|ps4|ps3|ps2|xbox|nintendo|switch|pokemon|pokémon|gta|elden ring|god of war|voxel)\b/i;
  if (otherPattern.test(combinedText) || otherPattern.test(cleanLink)) {
    return true;
  }

  // 2. Processos Judiciais / Investigações Legais / Escândalos / Cambridge Analytica
  const legalPattern = /\b(cambridge\s+analytica|departamento\s+de\s+justiça|sem\s+nenhuma\s+acusação|sem\s+nenhuma\s+acusacao|culpada?\s+nos?\s+eua|investigação\s+sobre|investigacao\s+sobre|processo\s+judicial|tribunal|julgamento|suprema\s+corte)\b/i;
  if (legalPattern.test(combinedText) || legalPattern.test(cleanLink)) {
    return true;
  }

  // 3. Política / Eleições / Votação / Aplicativos Governamentais Eleitorais (e-Título)
  const politicsPattern = /\b(eleição|eleições|eleicao|eleicoes|votação|votacao|e-título|e-titulo|justiça\s+eleitoral|urna\s+eletrônica|urnas\s+eletrônicas|candidatos?|partido\s+político)\b/i;
  if (politicsPattern.test(combinedText) || politicsPattern.test(cleanLink)) {
    return true;
  }

  // 4. Setor Automotivo / Recalls de Carros / Montadoras
  const automotivePattern = /\b(recall|volkswagen|audi|toyota|chevrolet|fiat|ford|renault|risco\s+na\s+direção|risco\s+na\s+direcao|risco\s+de\s+incêndio|montadoras?|veículos\s+convocados)\b/i;
  if (automotivePattern.test(combinedText) || automotivePattern.test(cleanLink)) {
    return true;
  }

  // 5. Listas de Lançamentos de Streaming / Colunas de Opinião Genérica de Entretenimento
  const streamingPattern = /\b(lançamentos?\s+d[ao]|lancamentos?\s+d[ao]|o\s+que\s+chega\s+n[ao]|você\s+não\s+precisa\s+assistir|voce\s+nao\s+precisa\s+assistir|o\s+que\s+assistir|dicas\s+de\s+filmes|séries\s+da\s+semana|series\s+da\s+semana)\b/i;
  if (streamingPattern.test(combinedText) || streamingPattern.test(cleanLink)) {
    return true;
  }

  return false;
};

// Alias para compatibilidade total
export const isTrailerOrMovieNews = (itemOrTitle?: any): boolean => {
  return isGameOrExcludedNews(itemOrTitle);
};

// Helper para verificar notícias com link ou título inconsistente
export const isInvalidOrOutdatedNews = (item: { link?: string; title?: LocalizedString | string }): boolean => {
  if (!item) return false;
  if (
    item.link?.includes('anuncios-do-gamescom') ||
    item.link?.includes('gamescom') ||
    item.link === 'https://canaltech.com.br/rss/' ||
    item.link === 'https://canaltech.com.br/rss'
  ) {
    return true;
  }
  const titleText = typeof item.title === 'string'
    ? item.title
    : [item.title?.PT, item.title?.EN].filter(Boolean).join(' ');
  if (
    titleText.includes('Óculos de Realidade Aumentada Leves com Display Holográfico') ||
    titleText.includes('Processadores Fotônicos Integrados realizam cálculos de IA')
  ) {
    return true;
  }
  return false;
};

// Helper para gerar identificadores únicos e estáveis para cada notícia sem colisão de slugs
export const generateNewsItemId = (prefix: string, link: string = '', title?: string, index?: number): string => {
  // Extrai o slug limpo do link sem parâmetros de rastreamento (como UTM do Flipboard)
  const cleanUrl = link.split('?')[0].replace(/\/+$/, '');
  const urlParts = cleanUrl.split('/').filter(Boolean);
  const slug = urlParts.length > 0
    ? urlParts[urlParts.length - 1].replace(/[^a-zA-Z0-9]/g, '-').slice(0, 35)
    : 'item';

  // Hash determinístico baseado no link e no título
  let hash = 0;
  const seed = `${link}###${title || ''}`;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const hashHex = Math.abs(hash).toString(36);
  return `${prefix}-${slug}-${hashHex}-${index ?? 0}`;
};

export const GadgetNews: React.FC = () => {
  const { t, lang } = useLanguage();
  const [newsList, setNewsList] = useState<GadgetNewsItem[]>(() =>
    mockedGadgetNews.filter(
      (item) => !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)
    )
  );
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Estados do Resumidor Inteligente em Tópicos com Gemma AI
  const [summaries, setSummaries] = useState<Record<string, NewsSummaryData>>(() => {
    try {
      const saved = localStorage.getItem('gemma_news_summaries_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [loadingSummaryId, setLoadingSummaryId] = useState<string | null>(null);
  const [summaryErrors, setSummaryErrors] = useState<Record<string, string | null>>({});
  const [expandedSummaryIds, setExpandedSummaryIds] = useState<Record<string, boolean>>({});
  const [copiedSummaryId, setCopiedSummaryId] = useState<string | null>(null);
  const [modalSummaryItem, setModalSummaryItem] = useState<{ item: GadgetNewsItem; summary: NewsSummaryData } | null>(null);

  // Estados dos Modais de Adicionar & Importador RSS
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState<boolean>(false);

  // Estados da Importação Automática Flipboard (Período 48h)
  const [isFlipboardSyncing, setIsFlipboardSyncing] = useState<boolean>(false);
  const [flipboardArticlesCount, setFlipboardArticlesCount] = useState<number>(0);

  // Estados do Importador de Feed e Verificador 404
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [isCheckingLinks, setIsCheckingLinks] = useState<boolean>(false);
  const [customFeedUrl, setCustomFeedUrl] = useState<string>('');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);
  const [rejected404Count, setRejected404Count] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [auto404VerificationEnabled, setAuto404VerificationEnabled] = useState<boolean>(true);
  const [verifiedLinksMap, setVerifiedLinksMap] = useState<Record<string, boolean>>({});

  // Função para importação automática das notícias da revista eletrônica do Flipboard no período de 48 horas
  const autoImportFlipboard48h = useCallback(async (silent = false) => {
    if (!silent) setIsFlipboardSyncing(true);
    try {
      const res = await fetch('/api/news/flipboard-auto-import?hours=48');
      const data = await res.json();
      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        const importedItems: GadgetNewsItem[] = data.articles.map((art: any, index: number) => ({
          id: generateNewsItemId('flipboard-48h', art.link, art.title, index),
          category: (art.category?.toLowerCase() === 'inventions' ? 'inventions' : art.category?.toLowerCase() === 'discoveries' ? 'discoveries' : 'gadgets') as NewsCategory,
          categoryLabel: {
            PT: art.category || 'TechViva Flipboard',
            EN: art.category || 'TechViva Flipboard',
            RU: art.category || 'TechViva Flipboard',
            HI: art.category || 'TechViva Flipboard',
            KO: art.category || 'TechViva Flipboard'
          },
          author: art.author || 'TechViva Flipboard',
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

        const validImported = importedItems.filter(
          (item) => !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)
        );

        setNewsList((prev) => {
          const seenLinks = new Set<string>();
          const seenIds = new Set<string>();
          const combined: GadgetNewsItem[] = [];
          for (const item of [...validImported, ...prev]) {
            if (!seenLinks.has(item.link) && !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)) {
              seenLinks.add(item.link);
              let finalId = item.id;
              if (seenIds.has(finalId)) {
                finalId = `${item.id}-${combined.length}`;
              }
              seenIds.add(finalId);
              combined.push({ ...item, id: finalId });
            }
          }
          return combined;
        });

        setVerifiedLinksMap((prev) => {
          const updated = { ...prev };
          validImported.forEach((item) => {
            updated[item.link] = true;
          });
          return updated;
        });

        setFlipboardArticlesCount(validImported.length);
        setLastSyncTime(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Importação automática Flipboard falhou:', err);
    } finally {
      if (!silent) setIsFlipboardSyncing(false);
    }
  }, []);

  // Dispara importação automática do Flipboard (período de 48h) ao carregar a página
  useEffect(() => {
    autoImportFlipboard48h();

    // Sincronização periódica em background a cada 30 minutos
    const interval = setInterval(() => {
      autoImportFlipboard48h(true);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoImportFlipboard48h]);

  // Carrega notícias salvas localmente pelo usuário e inicializa lista
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_NEWS);
      if (saved) {
        const parsedCustom: GadgetNewsItem[] = JSON.parse(saved);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          // Higieniza removendo notícias de jogos/games, trailers, filmes e links desatualizados e saneia IDs antigos/duplicados
          const seenStoredIds = new Set<string>();
          const cleanedCustom: GadgetNewsItem[] = [];
          parsedCustom.forEach((item, idx) => {
            if (!isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)) {
              let safeId = item.id;
              if (!safeId || seenStoredIds.has(safeId) || safeId === 'flipboard-48h-echViva-Gadgets-e-Games-Brasil') {
                safeId = generateNewsItemId('custom-saved', item.link, item.title?.PT || '', idx);
              }
              seenStoredIds.add(safeId);
              cleanedCustom.push({ ...item, id: safeId });
            }
          });
          localStorage.setItem(STORAGE_KEY_CUSTOM_NEWS, JSON.stringify(cleanedCustom));

          setNewsList((prev) => {
            const seenLinks = new Set<string>();
            const seenIds = new Set<string>();
            const combined: GadgetNewsItem[] = [];
            for (const item of [...cleanedCustom, ...prev]) {
              if (
                !seenLinks.has(item.link) &&
                !isGameOrExcludedNews(item) &&
                !isInvalidOrOutdatedNews(item)
              ) {
                seenLinks.add(item.link);
                let finalId = item.id;
                if (seenIds.has(finalId)) {
                  finalId = `${item.id}-${combined.length}`;
                }
                seenIds.add(finalId);
                combined.push({ ...item, id: finalId });
              }
            }
            return combined;
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar notícias customizadas do localStorage:', e);
    }

    const initialMap: Record<string, boolean> = {};
    mockedGadgetNews.forEach((item) => {
      initialMap[item.link] = true;
    });
    setVerifiedLinksMap(initialMap);
  }, []);

  // Adiciona nova notícia (por URL ou sugerida) à lista e persiste
  const handleAddNewItem = (newItem: GadgetNewsItem) => {
    if (isGameOrExcludedNews(newItem)) {
      setImportStatusMessage('⚠️ Notícias contendo "jogo", "jogos", "game", "games" ou trailers/filmes não são permitidas.');
      return;
    }
    if (isInvalidOrOutdatedNews(newItem)) {
      setImportStatusMessage('⚠️ Esta notícia possui link ou título inconsistente e foi descartada.');
      return;
    }

    setNewsList((prev) => {
      // Remove duplicados pelo link se já existirem
      const filtered = prev.filter((item) => item.link !== newItem.link && item.id !== newItem.id);
      const updated = [newItem, ...filtered];

      // Salva itens customizados no localStorage
      try {
        const savedRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_NEWS);
        const existingCustom: GadgetNewsItem[] = savedRaw ? JSON.parse(savedRaw) : [];
        const customFiltered = existingCustom.filter(
          (item) => item.link !== newItem.link && !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)
        );
        const newCustomList = [newItem, ...customFiltered];
        localStorage.setItem(STORAGE_KEY_CUSTOM_NEWS, JSON.stringify(newCustomList));
      } catch (e) {
        console.warn('Falha ao salvar no localStorage:', e);
      }

      return updated;
    });

    setVerifiedLinksMap((prev) => ({ ...prev, [newItem.link]: true }));
    setImportStatusMessage(`🎉 Notícia "${getLocalizedText(newItem.title)}" foi adicionada e publicada com sucesso no feed!`);
  };

  // Remove notícia customizada
  const handleDeleteCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewsList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        const savedRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_NEWS);
        if (savedRaw) {
          const existingCustom: GadgetNewsItem[] = JSON.parse(savedRaw);
          const newCustomList = existingCustom.filter((item) => item.id !== id);
          localStorage.setItem(STORAGE_KEY_CUSTOM_NEWS, JSON.stringify(newCustomList));
        }
      } catch (err) {
        console.warn('Erro ao atualizar localStorage ao deletar notícia:', err);
      }
      return updated;
    });
    setImportStatusMessage('Notícia removida da sua listagem.');
  };

  // Função para acionar o Importador de RSS/Feeds com Verificador Automático de Erro 404
  const handleImportFeeds = async (specificUrl?: string) => {
    setIsImporting(true);
    setImportStatusMessage(null);

    try {
      const urlParam = specificUrl || customFeedUrl.trim();
      // O Verificador Automático de Erro 404 é SEMPRE ativo de forma obrigatória
      const endpoint = `/api/news/feed-import?verify404=true${
        urlParam ? `&feedUrl=${encodeURIComponent(urlParam)}` : ''
      }`;

      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success && Array.isArray(data.articles)) {
        // Converte os artigos importados para o modelo GadgetNewsItem com dados localizados
        const importedItems: GadgetNewsItem[] = data.articles.map((art: any, index: number) => ({
          id: generateNewsItemId('feed-import', art.link, art.title, index),
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

        // Filtra os itens importados excluindo jogos, games, trailers, filmes e links inválidos
        const validImportedItems = importedItems.filter(
          (item) => !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)
        );

        // Junta as notícias existentes com as novas importadas, sem duplicar links nem IDs
        setNewsList((prev) => {
          const seenLinks = new Set<string>();
          const seenIds = new Set<string>();
          const combined: GadgetNewsItem[] = [];
          
          for (const item of [...validImportedItems, ...prev]) {
            if (!seenLinks.has(item.link) && !isGameOrExcludedNews(item) && !isInvalidOrOutdatedNews(item)) {
              seenLinks.add(item.link);
              let finalId = item.id;
              if (seenIds.has(finalId)) {
                finalId = `${item.id}-${combined.length}`;
              }
              seenIds.add(finalId);
              combined.push({ ...item, id: finalId });
            }
          }
          return combined;
        });

        // Atualiza mapa de links verificados
        const newVerifiedMap = { ...verifiedLinksMap };
        validImportedItems.forEach((item) => {
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

  // Função para gerar o resumo da notícia usando inicialmente funções React/JS locais e Node.js, com IA como fallback
  const handleSummarizeNews = async (item: GadgetNewsItem, forceAi: boolean = false) => {
    // Se já foi gerado e não está forçando refinamento por IA, apenas alterna visibilidade
    if (summaries[item.id] && !forceAi) {
      setExpandedSummaryIds((prev) => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
      return;
    }

    setLoadingSummaryId(item.id);
    setSummaryErrors((prev) => ({ ...prev, [item.id]: null }));

    try {
      const title = getLocalizedText(item.title);
      const subtitle = getLocalizedText(item.subtitle);
      const lead = getLocalizedText(item.lead);
      const category = getLocalizedText(item.categoryLabel);

      // 1. Gera INSTANTANEAMENTE o resumo técnico local usando funções React/JS (0ms, 100% offline)
      const localAlgoSummary = generateAlgorithmicNewsSummary({
        title: item.title,
        subtitle: item.subtitle,
        lead: item.lead,
        category: item.categoryLabel || item.category,
        author: item.author
      }, lang);

      // Define e exibe imediatamente o resumo local
      setSummaries((prev) => {
        const updated = { ...prev, [item.id]: localAlgoSummary };
        try {
          localStorage.setItem('gemma_news_summaries_v1', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      setExpandedSummaryIds((prev) => ({
        ...prev,
        [item.id]: true
      }));

      // 2. Se forçado refinamento por IA, consulta o servidor Node.js/Gemma AI
      if (forceAi) {
        const res = await fetch('/api/news/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            subtitle,
            lead,
            category,
            link: item.link,
            author: item.author,
            language: lang,
            useAi: true
          })
        });

        const data = await res.json();
        if (res.ok && data.success && data.summary) {
          setSummaries((prev) => {
            const updated = { ...prev, [item.id]: data.summary };
            try {
              localStorage.setItem('gemma_news_summaries_v1', JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      }
    } catch (err: any) {
      console.warn('Mantendo o resumo técnico algorítmico local:', err);
    } finally {
      setLoadingSummaryId(null);
    }
  };

  // Função para copiar tópicos gerados com formatação amigável
  const handleCopySummary = async (item: GadgetNewsItem, summary: NewsSummaryData) => {
    const title = getLocalizedText(item.title);
    const bulletsText = summary.topics?.map((t) => `${t.icon || '•'} *${t.title}:* ${t.detail}`).join('\n\n') || '';
    const formatted = `⚡ *${title}* (Resumo Gemma IA)\n⏱️ Leitura rápida: ${summary.readTime || '30s'}\n\n${summary.oneLineTake ? `💡 _${summary.oneLineTake}_\n\n` : ''}📌 *Tópicos Principais:*\n${bulletsText}\n\n🎯 *Por que isso importa:* ${summary.whyItMatters || ''}\n🔗 Notícia completa: ${item.link}`;

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedSummaryId(item.id);
      setTimeout(() => setCopiedSummaryId(null), 2500);
    } catch {
      setCopiedSummaryId(item.id);
      setTimeout(() => setCopiedSummaryId(null), 2500);
    }
  };

  const filteredNews = useMemo(() => {
    const seenIds = new Set<string>();
    return newsList.filter((item) => {
      // Exclui estritamente notícias de jogos/games ("jogo", "jogos", "game", "games"), trailers, filmes ou links inválidos
      if (isGameOrExcludedNews(item) || isInvalidOrOutdatedNews(item)) {
        return false;
      }

      // Previne rigorosamente qualquer duplicação de chave no React
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);

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
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t('news.latest')}
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
            {t('news.description')}
          </p>
        </div>

        {/* Botões de Ação: RSS Importer, Flipboard 48h Status & Add news */}
        <div className="flex items-center gap-2 flex-wrap justify-center shrink-0">
          {/* Botão de Atualizar Notícias (Revista Digital TechViva Flipboard & Portais de Tecnologia) */}
          <button
            type="button"
            onClick={() => autoImportFlipboard48h(false)}
            disabled={isFlipboardSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer group disabled:opacity-60"
            title="Atualizar notícias da revista digital TechViva Flipboard e principais portais de gadgets e invenções tecnológicas"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isFlipboardSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
            <span>
              {isFlipboardSyncing ? 'Atualizando...' : 'Atualizar'}
            </span>
          </button>

          {/* Botão para abrir o Modal do Importador de RSS */}
          <button
            type="button"
            onClick={() => setIsRssModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-cyan-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer group"
            title={t('news.importerTitle')}
          >
            <Rss className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>{t('news.openRssImporter')}</span>
          </button>

          {/* Botão Add news (tamanho reduzido) */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer group"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>{t('news.addNewsBtn')}</span>
          </button>
        </div>
      </div>

      {/* Notificação Compacta de Status (se houver mensagem de importação/remoção) */}
      {importStatusMessage && (
        <div className="mb-6 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl text-xs sm:text-sm text-cyan-200 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{importStatusMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setImportStatusMessage(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
            placeholder={t('news.searchPlaceholder')}
            className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
          />
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item, index) => {
          const mainTitle = getLocalizedText(item.title);
          const subTitle = getLocalizedText(item.subtitle);
          const leadContent = getLocalizedText(item.lead);
          const categoryTag = getLocalizedText(item.categoryLabel);
          const isVerified = verifiedLinksMap[item.link] !== false;
          const isCustom = item.id.startsWith('custom-') || item.id.startsWith('user-suggest-') || item.id.startsWith('suggested-');

          return (
            <article
              key={item.id || `news-card-${index}`}
              className={`flex flex-col bg-slate-900/60 border rounded-2xl p-6 transition-all hover:shadow-xl relative overflow-hidden group ${
                isCustom
                  ? 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-cyan-500/10 bg-slate-900/80'
                  : 'border-slate-800/80 hover:border-cyan-500/40 hover:shadow-cyan-500/5'
              }`}
            >
              {/* Category & Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
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

                  {isCustom && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-amber-500/20 text-cyan-300 border border-cyan-500/30">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Comunidade
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-400">
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
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20" title="Link verificado e ativo (HTTP 200 OK)">
                      <CheckCircle2 className="w-3 h-3" />
                      200 OK
                    </span>
                  )}
                  {isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteCustomItem(item.id, e)}
                      title="Remover esta notícia customizada"
                      className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
                <p className="text-sm text-slate-300/90 leading-relaxed mb-4 flex-1 text-justify sm:text-left">
                  {leadContent}
                </p>
              )}

              {/* Painel de Carregamento da Síntese Gemma AI */}
              {loadingSummaryId === item.id && (
                <div className="mb-5 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 animate-pulse flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 shrink-0">
                    <Sparkles className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-indigo-200">Gemma AI analisando artigo...</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    </div>
                    <p className="text-[11px] text-indigo-300/80 leading-relaxed">
                      Lendo o conteúdo e sintetizando os pontos-chave, novidades técnicas e impactos práticos em tópicos.
                    </p>
                  </div>
                </div>
              )}

              {/* Erro na Síntese */}
              {summaryErrors[item.id] && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-center justify-between gap-3 text-xs text-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{summaryErrors[item.id]}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSummarizeNews(item)}
                    className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Resumo Inteligente Formatado em Tópicos */}
              {summaries[item.id] && expandedSummaryIds[item.id] && (
                <div className="mb-5 rounded-2xl bg-slate-950/85 border border-indigo-500/35 p-4 shadow-lg shadow-indigo-950/20 animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* Cabeçalho do Resumo */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        Resumo Técnico Escaneável
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSummarizeNews(item, true)}
                        className="inline-flex items-center gap-1 text-[11px] text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        title="Refinar este resumo com Gemma IA"
                      >
                        <Sparkles className={`w-3 h-3 text-purple-400 ${loadingSummaryId === item.id ? 'animate-spin' : ''}`} />
                        <span>Refinar com IA</span>
                      </button>
                      {summaries[item.id].readTime && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {summaries[item.id].readTime}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Botão Copiar Tópicos */}
                      <button
                        type="button"
                        onClick={() => handleCopySummary(item, summaries[item.id])}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        title={t('news.copySummary')}
                      >
                        {copiedSummaryId === item.id ? (
                          <>
                            <CheckCheck className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">{t('news.copiedSummary')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>{t('news.copySummary')}</span>
                          </>
                        )}
                      </button>

                      {/* Botão Abrir em Modal Focado */}
                      <button
                        type="button"
                        onClick={() => setModalSummaryItem({ item, summary: summaries[item.id] })}
                        className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Modo leitor em janela cheia"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Botão Recolher */}
                      <button
                        type="button"
                        onClick={() => setExpandedSummaryIds((prev) => ({ ...prev, [item.id]: false }))}
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={t('news.hideSummary')}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Frase de Impacto (One-line Take) */}
                  {summaries[item.id].oneLineTake && (
                    <div className="mb-3.5 px-3 py-2 rounded-xl bg-indigo-500/10 border-l-2 border-indigo-400 text-xs sm:text-sm text-indigo-100 italic leading-relaxed">
                      "{summaries[item.id].oneLineTake}"
                    </div>
                  )}

                  {/* Lista de Tópicos Importantes */}
                  <div className="space-y-2.5">
                    {summaries[item.id].topics?.map((topic, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 flex items-start gap-3 transition-colors"
                      >
                        <span className="text-base select-none shrink-0 mt-0.5">
                          {topic.icon || '⚡'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-100 mb-1">
                            {topic.title}
                          </h5>
                          <p className="text-xs text-slate-300/90 leading-relaxed">
                            {topic.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Por que isso importa (Why It Matters) */}
                  {summaries[item.id].whyItMatters && (
                    <div className="mt-3.5 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs flex items-start gap-2.5">
                      <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-emerald-300 block mb-0.5">
                          {t('news.whyItMatters')}:
                        </span>
                        <p className="text-emerald-100/90 leading-relaxed text-xs">
                          {summaries[item.id].whyItMatters}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags / Palavras-chave */}
                  {summaries[item.id].keywords && summaries[item.id].keywords!.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-900">
                      {summaries[item.id].keywords!.map((kw, kwIdx) => (
                        <span
                          key={kwIdx}
                          className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800/80"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer with share buttons and link to original publication */}
              <div className="mt-auto pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {t('news.source')}: <strong className="text-slate-300">{item.author}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Botão Resumir Notícia com Gemma AI */}
                  <button
                    type="button"
                    onClick={() => handleSummarizeNews(item)}
                    disabled={loadingSummaryId === item.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                      expandedSummaryIds[item.id]
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
                        : 'bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 hover:from-indigo-500/25 hover:via-purple-500/25 hover:to-cyan-500/25 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-400/50'
                    }`}
                    title="Gemma IA lê o artigo e extrai os pontos mais importantes em tópicos rápidos"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-indigo-400 ${loadingSummaryId === item.id ? 'animate-spin' : ''}`} />
                    <span>
                      {loadingSummaryId === item.id
                        ? t('news.summarizing')
                        : expandedSummaryIds[item.id]
                        ? t('news.hideSummary')
                        : t('news.summarizeBtn')}
                    </span>
                  </button>

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

      {/* Modal de Adicionar Notícia por Link com Auto-Detecção */}
      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNews={handleAddNewItem}
      />

      {/* Modal do Importador de RSS & Feeds */}
      <RssImporterModal
        isOpen={isRssModalOpen}
        onClose={() => setIsRssModalOpen(false)}
        onImportFeeds={handleImportFeeds}
        onVerifyCurrentLinks={handleVerifyCurrentLinks}
        isImporting={isImporting}
        isCheckingLinks={isCheckingLinks}
        customFeedUrl={customFeedUrl}
        setCustomFeedUrl={setCustomFeedUrl}
        importStatusMessage={importStatusMessage}
        lastSyncTime={lastSyncTime}
        totalActiveNews={newsList.length}
        rejected404Count={rejected404Count}
      />

      {/* Modal de Leitura Focada de Resumo (Gemma AI Reader Mode) */}
      {modalSummaryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Gemma AI • Síntese Completa
                  </span>
                  {modalSummaryItem.summary.readTime && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {modalSummaryItem.summary.readTime}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {getLocalizedText(modalSummaryItem.item.title)}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{modalSummaryItem.item.author}</span>
                  <span>•</span>
                  <span>{new Date(modalSummaryItem.item.pubDate).toLocaleDateString()}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalSummaryItem(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-4">
              {modalSummaryItem.summary.oneLineTake && (
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border-l-4 border-indigo-400 text-sm sm:text-base text-indigo-100 italic leading-relaxed">
                  "{modalSummaryItem.summary.oneLineTake}"
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  {t('news.summaryTitle')}
                </h4>
                {modalSummaryItem.summary.topics?.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3.5"
                  >
                    <span className="text-xl select-none shrink-0 mt-0.5">{topic.icon || '⚡'}</span>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm sm:text-base font-bold text-white mb-1">{topic.title}</h5>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{topic.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {modalSummaryItem.summary.whyItMatters && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm flex items-start gap-3">
                  <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-300 block mb-1">
                      {t('news.whyItMatters')}:
                    </strong>
                    <p className="text-emerald-100 leading-relaxed">{modalSummaryItem.summary.whyItMatters}</p>
                  </div>
                </div>
              )}

              {modalSummaryItem.summary.keywords && modalSummaryItem.summary.keywords.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  {modalSummaryItem.summary.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleCopySummary(modalSummaryItem.item, modalSummaryItem.summary)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {copiedSummaryId === modalSummaryItem.item.id ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-300" />
                    <span>{t('news.copiedSummary')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t('news.copySummary')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={modalSummaryItem.item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>{t('news.readMore')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setModalSummaryItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
