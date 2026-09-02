import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  X,
  Sparkles,
  Lightbulb,
  ExternalLink,
  Plus,
  Check,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  Send,
  Link2,
  CheckCircle2,
  Flame,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { GadgetNewsItem, NewsCategory } from '../data/gadgetNews';

interface SuggestionItem {
  id: string;
  title: string;
  lead: string;
  category: NewsCategory;
  categoryLabel: string;
  author: string;
  link: string;
  pubDate: string;
  trendingTag?: string;
}

interface SuggestNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNews: (newItem: GadgetNewsItem) => void;
}

export const SuggestNewsModal: React.FC<SuggestNewsModalProps> = ({ isOpen, onClose, onAddNews }) => {
  const { t, lang } = useLanguage();

  const [activeTab, setActiveTab] = useState<'curated' | 'custom'>('curated');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Form de Sugestão Customizada
  const [suggestLink, setSuggestLink] = useState('');
  const [suggestComment, setSuggestComment] = useState('');
  const [suggestName, setSuggestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Carregar sugestões da API
  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch('/api/news/suggestions');
      const data = await res.json();
      if (data.success && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Erro ao buscar sugestões:', err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
      setSubmitFeedback(null);
      setSubmitError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Adicionar uma notícia sugerida diretamente ao feed
  const handlePublishSuggestion = (sug: SuggestionItem) => {
    const categoryLabels: Record<NewsCategory, { PT: string; EN: string; RU: string; HI: string; KO: string }> = {
      gadgets: {
        PT: sug.categoryLabel || 'Gadget & Tech',
        EN: sug.categoryLabel || 'Gadget & Tech',
        RU: 'Гаджеты и технологии',
        HI: 'गैजेट और तकनीक',
        KO: '가젯 및 기술'
      },
      inventions: {
        PT: sug.categoryLabel || 'Invenções & IA',
        EN: sug.categoryLabel || 'Inventions & AI',
        RU: 'Изобретения и ИИ',
        HI: 'आविष्कार और एआई',
        KO: '발명 및 AI'
      },
      discoveries: {
        PT: sug.categoryLabel || 'Ciência & Descobertas',
        EN: sug.categoryLabel || 'Science & Discoveries',
        RU: 'Наука и открытия',
        HI: 'विज्ञान और खोजें',
        KO: '과학 및 발견'
      }
    };

    const newItem: GadgetNewsItem = {
      id: `suggested-${sug.id}-${Date.now()}`,
      category: sug.category,
      categoryLabel: categoryLabels[sug.category],
      author: sug.author,
      pubDate: sug.pubDate,
      link: sug.link,
      title: {
        PT: sug.title,
        EN: sug.title,
        RU: sug.title,
        HI: sug.title,
        KO: sug.title
      },
      lead: {
        PT: sug.lead,
        EN: sug.lead,
        RU: sug.lead,
        HI: sug.lead,
        KO: sug.lead
      }
    };

    onAddNews(newItem);
    setAddedIds((prev) => ({ ...prev, [sug.id]: true }));
  };

  // Enviar formulário de sugestão com auto-validação
  const handleCustomSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitFeedback(null);

    if (!suggestLink.trim()) {
      setSubmitError('Por favor informe o link da notícia sugerida.');
      return;
    }

    try {
      new URL(suggestLink.trim());
    } catch {
      setSubmitError('Link inválido. Inclua https://');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Extrai metadados e valida o link contra erro 404
      const metaRes = await fetch('/api/news/extract-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: suggestLink.trim() })
      });
      const metaData = await metaRes.json();

      if (!metaRes.ok || !metaData.success) {
        throw new Error(metaData.error || 'O link sugerido não pôde ser verificado ou está fora do ar.');
      }

      const meta = metaData.data;

      // 2. Publica automaticamente no feed da sessão do usuário
      const newItem: GadgetNewsItem = {
        id: `user-suggest-${Date.now()}`,
        category: (meta.category || 'gadgets') as NewsCategory,
        categoryLabel: {
          PT: 'Sugestão da Comunidade',
          EN: 'Community Suggestion',
          RU: 'Предложение сообщества',
          HI: 'समुदाय का सुझाव',
          KO: '커뮤니티 제안'
        },
        author: meta.author || suggestName.trim() || 'Sugestão Enviada',
        pubDate: new Date().toISOString(),
        link: suggestLink.trim(),
        title: {
          PT: meta.title,
          EN: meta.title,
          RU: meta.title,
          HI: meta.title,
          KO: meta.title
        },
        subtitle: suggestComment.trim() ? {
          PT: suggestComment.trim(),
          EN: suggestComment.trim(),
          RU: suggestComment.trim(),
          HI: suggestComment.trim(),
          KO: suggestComment.trim()
        } : undefined,
        lead: {
          PT: meta.lead,
          EN: meta.lead,
          RU: meta.lead,
          HI: meta.lead,
          KO: meta.lead
        }
      };

      onAddNews(newItem);
      setSubmitFeedback('🎉 Sugestão validada com sucesso (HTTP 200 OK) e adicionada ao feed do site!');
      setSuggestLink('');
      setSuggestComment('');
      setSuggestName('');
    } catch (err: any) {
      setSubmitError(err.message || 'Erro ao processar sua sugestão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 shadow-md shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {t('news.suggestTitle')}
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Em Alta
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {t('news.suggestDesc')}
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-800/80 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'curated'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pautas & Matérias Recomendadas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Sugerir Meu Link de Notícia</span>
          </button>
        </div>

        {/* Tab 1: Pautas & Sugestões Curadas */}
        {activeTab === 'curated' && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Selecione uma pauta para publicar no site instantaneamente com verificação Anti-404:
              </span>
              <button
                type="button"
                onClick={fetchSuggestions}
                disabled={loadingSuggestions}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSuggestions ? 'animate-spin' : ''}`} />
                <span>Atualizar Pautas</span>
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
              {suggestions.map((sug) => {
                const isAdded = addedIds[sug.id];
                return (
                  <div
                    key={sug.id}
                    className="bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        {sug.trendingTag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {sug.trendingTag}
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                          {sug.categoryLabel}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          {sug.author}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                        {sug.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                        {sug.lead}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={sug.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                        title="Ler fonte original"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handlePublishSuggestion(sug)}
                        disabled={isAdded}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                            : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-cyan-500/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t('news.suggestAdded')}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t('news.suggestAddToSite')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Sugerir Meu Link de Notícia */}
        {activeTab === 'custom' && (
          <form onSubmit={handleCustomSuggestionSubmit} className="mt-5 space-y-4">
            {submitError && (
              <div className="p-3.5 bg-red-950/40 border border-red-500/30 rounded-xl text-xs sm:text-sm text-red-300 flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitFeedback && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs sm:text-sm text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{submitFeedback}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-amber-400" />
                {t('news.pasteLink')} <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                required
                value={suggestLink}
                onChange={(e) => setSuggestLink(e.target.value)}
                placeholder="https://g1.globo.com/tecnologia/... ou https://tecmundo.com.br/..."
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Seu Nome ou Fonte (Opcional)
                </label>
                <input
                  type="text"
                  value={suggestName}
                  onChange={(e) => setSuggestName(e.target.value)}
                  placeholder="Ex: Carlos Silva / Colaborador"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Comentário / Por que é relevante? (Opcional)
                </label>
                <input
                  type="text"
                  value={suggestComment}
                  onChange={(e) => setSuggestComment(e.target.value)}
                  placeholder="Ex: Lançamento imperdível do novo chip de IA..."
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>O verificador inteligente irá extrair o título, resumo, portal e testar se a URL está 100% ativa sem erro 404 antes de adicioná-la.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Fechar
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !suggestLink.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Sparkles className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>{isSubmitting ? 'Verificando & Adicionando...' : 'Validar e Publicar no Feed'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
