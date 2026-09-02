import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  X,
  Link2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  Layers,
  FileText,
  ShieldCheck,
  Eye,
  Plus
} from 'lucide-react';
import { GadgetNewsItem, NewsCategory } from '../data/gadgetNews';

interface AddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNews: (newItem: GadgetNewsItem) => void;
}

export const AddNewsModal: React.FC<AddNewsModalProps> = ({ isOpen, onClose, onAddNews }) => {
  const { t, lang } = useLanguage();

  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [lead, setLead] = useState('');
  const [category, setCategory] = useState<NewsCategory>('gadgets');
  const [author, setAuthor] = useState('');

  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  // Auto-detectar informações a partir do Link via API
  const handleAutoDetect = async () => {
    if (!link.trim()) {
      setErrorMessage('Por favor, informe a URL da notícia primeiro.');
      return;
    }

    try {
      new URL(link.trim());
    } catch {
      setErrorMessage('URL inválida. Certifique-se de incluir https:// no início.');
      return;
    }

    setIsDetecting(true);
    setErrorMessage(null);
    setSuccessStatus(null);

    try {
      const res = await fetch('/api/news/extract-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Não foi possível extrair os dados desta notícia.');
      }

      const meta = data.data;
      if (meta.title) setTitle(meta.title);
      if (meta.lead) setLead(meta.lead);
      if (meta.author) setAuthor(meta.author);
      if (meta.category && ['gadgets', 'inventions', 'discoveries'].includes(meta.category)) {
        setCategory(meta.category as NewsCategory);
      }

      setIsVerified(true);
      setSuccessStatus('Metadados detectados com sucesso e link 100% verificado (HTTP 200 OK)!');
    } catch (err: any) {
      console.error('Erro na detecção automática:', err);
      setErrorMessage(err.message || 'Erro ao conectar ao link da notícia.');
      setIsVerified(false);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!link.trim()) {
      setErrorMessage('O link da notícia é obrigatório.');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('O título da notícia é obrigatório.');
      return;
    }

    if (!lead.trim()) {
      setErrorMessage('O resumo / lead da notícia é obrigatório.');
      return;
    }

    const finalAuthor = author.trim() || 'Fonte da Web';

    const categoryLabels: Record<NewsCategory, { PT: string; EN: string; RU: string; HI: string; KO: string }> = {
      gadgets: {
        PT: 'Gadget & Tech',
        EN: 'Gadget & Tech',
        RU: 'Гаджеты и технологии',
        HI: 'गैजेट और तकनीक',
        KO: '가젯 및 기술'
      },
      inventions: {
        PT: 'Invenções & IA',
        EN: 'Inventions & AI',
        RU: 'Изобретения и ИИ',
        HI: 'आविष्कार और एआई',
        KO: '발명 및 AI'
      },
      discoveries: {
        PT: 'Ciência & Descobertas',
        EN: 'Science & Discoveries',
        RU: 'Наука и открытия',
        HI: 'विज्ञान और खोजें',
        KO: '과학 및 발견'
      }
    };

    const newItem: GadgetNewsItem = {
      id: `custom-news-${Date.now()}`,
      category,
      categoryLabel: categoryLabels[category],
      author: finalAuthor,
      pubDate: new Date().toISOString(),
      link: link.trim(),
      title: {
        PT: title.trim(),
        EN: title.trim(),
        RU: title.trim(),
        HI: title.trim(),
        KO: title.trim()
      },
      subtitle: subtitle.trim() ? {
        PT: subtitle.trim(),
        EN: subtitle.trim(),
        RU: subtitle.trim(),
        HI: subtitle.trim(),
        KO: subtitle.trim()
      } : undefined,
      lead: {
        PT: lead.trim(),
        EN: lead.trim(),
        RU: lead.trim(),
        HI: lead.trim(),
        KO: lead.trim()
      }
    };

    onAddNews(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-md shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Plus className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t('news.addNewsTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {t('news.addNewsDesc')}
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

        {/* Error / Success feedback */}
        {errorMessage && (
          <div className="mt-4 p-3.5 bg-red-950/40 border border-red-500/30 rounded-xl text-xs sm:text-sm text-red-300 flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successStatus && (
          <div className="mt-4 p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs sm:text-sm text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successStatus}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* URL Input with Auto-detect action */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                {t('news.pasteLink')} <span className="text-red-400">*</span>
              </span>
              {isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Link Ativo (HTTP 200 OK)
                </span>
              )}
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="url"
                required
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setIsVerified(false);
                }}
                placeholder="https://www.exemplo.com.br/noticia-tecnologia-gadget..."
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button
                type="button"
                onClick={handleAutoDetect}
                disabled={isDetecting || !link.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className={`w-4 h-4 text-cyan-400 ${isDetecting ? 'animate-spin' : ''}`} />
                <span>{isDetecting ? t('news.detecting') : t('news.autoDetect')}</span>
              </button>
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              {t('news.articleTitle')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Empresa lança novo processador quântico de bolso..."
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Subtítulo / Linha Fina (Opcional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('news.articleSubtitle')}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Dispositivo atinge velocidade recorde com 90% menos consumo de energia"
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Lead / Resumo */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t('news.articleLead')} <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              placeholder="Ex: Engenheiros e cientistas apresentaram os primeiros resultados práticos do protótipo em conferência internacional..."
              className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            />
          </div>

          {/* Categoria & Autor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {t('news.articleCategory')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
              >
                <option value="gadgets">{t('news.filterGadgets')}</option>
                <option value="inventions">{t('news.filterInventions')}</option>
                <option value="discoveries">{t('news.filterDiscoveries')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                {t('news.articleAuthor')}
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ex: TecMundo, Olhar Digital, G1..."
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Pré-visualização do Card ao Vivo */}
          {(title || lead) && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 mb-2">
                <Eye className="w-3.5 h-3.5" />
                Prévia de como aparecerá no site:
              </span>
              <div className="bg-slate-950/70 border border-cyan-500/20 rounded-2xl p-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10">
                    {category === 'gadgets' ? 'Gadget & Tech' : category === 'inventions' ? 'Invenções & IA' : 'Ciência & Descobertas'}
                  </span>
                  <span>{author || 'Fonte da Web'} • Hoje</span>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                  {title || 'Título da Notícia'}
                </h4>
                {subtitle && (
                  <p className="text-xs text-cyan-300/90 mt-1 font-medium">{subtitle}</p>
                )}
                {lead && (
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{lead}</p>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('news.publishNews')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
