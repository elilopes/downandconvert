import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  Scale, 
  Users, 
  Trophy, 
  Copy, 
  CheckCheck, 
  Plus, 
  Trash2, 
  Search, 
  Smartphone, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Clock,
  Zap,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Smartphone as SmartphoneType, mockedSmartphones } from '../data/smartphones';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../lib/firebase';
import { collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore';

export interface ComparisonCategory {
  category: string;
  winner: string;
  detail: string;
}

export interface BestForProfile {
  phone: string;
  badge: string;
  profile: string;
}

export interface PhoneComparisonRecord {
  id: string;
  createdAt: string;
  phoneIds: string[];
  phoneNames: string[];
  title: string;
  winnerOverall: string;
  winnerReason?: string;
  summary: string;
  categories: ComparisonCategory[];
  bestFor: BestForProfile[];
  verdict: string;
}

interface PhoneComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedPhones?: SmartphoneType[];
  onSelectPhoneToCompare?: (phone: SmartphoneType) => void;
}

export const PhoneComparisonModal: React.FC<PhoneComparisonModalProps> = ({
  isOpen,
  onClose,
  initialSelectedPhones = []
}) => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'duel' | 'community'>('duel');
  const [selectedPhones, setSelectedPhones] = useState<SmartphoneType[]>([]);
  
  // Selector popup state
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [selectorSlotIndex, setSelectorSlotIndex] = useState<number>(0);
  const [selectorSearch, setSelectorSearch] = useState<string>('');
  const [selectorBrandFilter, setSelectorBrandFilter] = useState<string>('all');

  // AI Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [currentComparison, setCurrentComparison] = useState<PhoneComparisonRecord | null>(null);
  const [copiedAnalysis, setCopiedAnalysis] = useState<boolean>(false);

  // Community comparisons state
  const [savedComparisons, setSavedComparisons] = useState<PhoneComparisonRecord[]>([]);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState<boolean>(false);
  const [communitySearch, setCommunitySearch] = useState<string>('');

  // Sincroniza telefones iniciais quando o modal abre
  useEffect(() => {
    if (isOpen) {
      if (initialSelectedPhones.length >= 2) {
        setSelectedPhones(initialSelectedPhones.slice(0, 3));
      } else if (selectedPhones.length === 0) {
        // Sugestão padrão inicial: Galaxy S24 vs iPhone 15
        const s24 = mockedSmartphones.find(p => p.id === 'samsung-galaxy-s24') || mockedSmartphones[0];
        const ip15 = mockedSmartphones.find(p => p.id === 'apple-iphone-15') || mockedSmartphones[1];
        if (s24 && ip15) {
          setSelectedPhones([s24, ip15]);
        }
      }
      loadCommunityComparisons();
    }
  }, [isOpen, initialSelectedPhones]);

  // Carrega comparações feitas por todos os usuários do servidor e do Firestore
  const loadCommunityComparisons = async () => {
    setIsLoadingCommunity(true);
    try {
      // 1. Tenta carregar do backend (data/phone_comparisons.json)
      const res = await fetch('/api/smartphones/comparisons');
      const data = await res.json();
      let list: PhoneComparisonRecord[] = [];
      if (data.success && Array.isArray(data.comparisons)) {
        list = data.comparisons;
      }

      // 2. Tenta complementar com o Firestore
      try {
        const q = query(collection(db, 'phone_comparisons'), limit(30));
        const snap = await getDocs(q);
        snap.forEach((docSnap) => {
          const d = docSnap.data() as PhoneComparisonRecord;
          if (!list.some(c => c.id === d.id)) {
            list.push(d);
          }
        });
      } catch (fbErr) {
        // Firestore silencioso se indisponível
      }

      // Ordena por data decrescente
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSavedComparisons(list);
    } catch (err) {
      console.warn('Erro ao carregar histórico de comparações:', err);
    } finally {
      setIsLoadingCommunity(false);
    }
  };

  const handleStartComparison = async () => {
    if (selectedPhones.length < 2) return;
    setIsGenerating(true);
    setAnalysisError(null);

    try {
      const res = await fetch('/api/smartphones/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phones: selectedPhones,
          language: lang
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.comparison) {
        throw new Error(data.error || 'Não foi possível gerar a análise.');
      }

      const newRecord = data.comparison as PhoneComparisonRecord;
      setCurrentComparison(newRecord);

      // Atualiza lista da comunidade localmente
      setSavedComparisons(prev => [newRecord, ...prev.filter(c => c.id !== newRecord.id)]);

      // Sincroniza com o Firestore
      try {
        await setDoc(doc(db, 'phone_comparisons', newRecord.id), newRecord);
      } catch (fbErr) {
        console.warn('Persistência Firestore em background:', fbErr);
      }
    } catch (err: any) {
      console.error('Erro na comparação com Gemma:', err);
      setAnalysisError(err.message || 'Erro ao conectar à inteligência artificial.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyFormattedAnalysis = async (comp: PhoneComparisonRecord) => {
    const text = `🤖 *${comp.title}* (Análise Gemma IA - Down&Convert)\n\n` +
      `🏆 *Vencedor Geral:* ${comp.winnerOverall}\n` +
      `💡 _${comp.winnerReason || ''}_\n\n` +
      `📌 *Resumo do Duelo:*\n${comp.summary}\n\n` +
      `📊 *Comparativo por Categoria:*\n` +
      comp.categories.map(c => `• *${c.category}:* Vencedor: ${c.winner}\n  ${c.detail}`).join('\n\n') +
      `\n\n🎯 *Para Quem é Cada Aparelho:*\n` +
      comp.bestFor.map(b => `• *${b.phone}* (${b.badge}): ${b.profile}`).join('\n\n') +
      `\n\n🏁 *Veredito Final - Qual Eu Compro?*\n${comp.verdict}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedAnalysis(true);
      setTimeout(() => setCopiedAnalysis(false), 2500);
    } catch {
      setCopiedAnalysis(true);
      setTimeout(() => setCopiedAnalysis(false), 2500);
    }
  };

  const openPhonePicker = (slotIdx: number) => {
    setSelectorSlotIndex(slotIdx);
    setSelectorSearch('');
    setSelectorBrandFilter('all');
    setIsSelectorOpen(true);
  };

  const selectPhoneIntoSlot = (phone: SmartphoneType) => {
    setSelectedPhones(prev => {
      const next = [...prev];
      // Se já estava selecionado em outro slot, remove
      const existingIdx = next.findIndex(p => p.id === phone.id);
      if (existingIdx !== -1 && existingIdx !== selectorSlotIndex) {
        next.splice(existingIdx, 1);
      }
      next[selectorSlotIndex] = phone;
      return next.slice(0, 3);
    });
    setIsSelectorOpen(false);
    setCurrentComparison(null); // Reseta para nova análise
  };

  const removePhoneSlot = (idx: number) => {
    setSelectedPhones(prev => prev.filter((_, i) => i !== idx));
    setCurrentComparison(null);
  };

  // Lista de marcas disponíveis para o filtro do picker
  const availableBrands = useMemo(() => {
    return Array.from(new Set(mockedSmartphones.map(p => p.brand))).sort();
  }, []);

  // Telefones filtrados no seletor
  const filteredPickerPhones = useMemo(() => {
    const q = selectorSearch.toLowerCase().trim();
    return mockedSmartphones.filter(p => {
      const matchesBrand = selectorBrandFilter === 'all' || p.brand === selectorBrandFilter;
      const matchesSearch = !q || p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q) || (p.specs?.processor?.chipset || '').toLowerCase().includes(q);
      return matchesBrand && matchesSearch;
    });
  }, [selectorSearch, selectorBrandFilter]);

  // Comparações da comunidade filtradas
  const filteredCommunity = useMemo(() => {
    const q = communitySearch.toLowerCase().trim();
    if (!q) return savedComparisons;
    return savedComparisons.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.phoneNames.some(n => n.toLowerCase().includes(q)) ||
      c.winnerOverall.toLowerCase().includes(q)
    );
  }, [communitySearch, savedComparisons]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden">
        
        {/* Header com Abas */}
        <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Qual eu compro?</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-wider">
                  Gemma AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Assistente inteligente de comparação e consultoria técnica de smartphones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navegação de Abas */}
            <div className="flex items-center p-1 bg-slate-950/60 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('duel')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'duel'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Novo Duelo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('community')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'community'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Duelos da Comunidade</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                  {savedComparisons.length}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'duel' ? (
            <>
              {/* Seleção dos 2 ou 3 Modelos */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-cyan-400" />
                      Selecione 2 ou 3 modelos para o confronto
                    </h4>
                    <p className="text-xs text-slate-400">
                      O site envia a ficha técnica completa em JSON para o modelo Gemma analisar ponto a ponto.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedPhones.length}/3 selecionados
                  </span>
                </div>

                {/* Grid dos Slots de Aparelhos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[0, 1, 2].map((slotIdx) => {
                    const phone = selectedPhones[slotIdx];
                    if (phone) {
                      return (
                        <div
                          key={slotIdx}
                          className="relative p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-md shadow-cyan-950/20 flex flex-col justify-between group hover:border-cyan-400 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              Modelo {slotIdx + 1}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openPhonePicker(slotIdx)}
                                className="text-[11px] font-semibold text-cyan-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                              >
                                Trocar
                              </button>
                              {selectedPhones.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => removePhoneSlot(slotIdx)}
                                  className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                                  title="Remover 3º modelo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="my-2">
                            <h5 className="text-base font-extrabold text-white leading-tight">
                              {phone.brand} {phone.model}
                            </h5>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {phone.releaseYear} • {phone.os}
                            </p>
                          </div>

                          {/* Destaques Rápidos da Ficha Técnica */}
                          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                            <div>
                              <span className="text-slate-500 block text-[10px]">Tela:</span>
                              <strong>{phone.specs.screen.size}" {phone.specs.screen.refreshRate}Hz</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">CPU:</span>
                              <strong className="truncate block" title={phone.specs.processor.chipset}>
                                {phone.specs.processor.chipset}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Câmera:</span>
                              <strong>{phone.specs.camera.rear}MP</strong> ({phone.specs.camera.opticalZoom}x zoom)
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Bateria:</span>
                              <strong>{phone.specs.battery.capacity} mAh</strong>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Slot Vazio
                    return (
                      <button
                        key={slotIdx}
                        type="button"
                        onClick={() => openPhonePicker(slotIdx)}
                        className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[160px] ${
                          slotIdx < 2
                            ? 'border-cyan-500/40 bg-cyan-950/10 hover:bg-cyan-950/20 text-cyan-300 hover:border-cyan-400'
                            : 'border-slate-800 bg-slate-950/30 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="p-3 rounded-2xl bg-slate-800/80 text-cyan-400 mb-2">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">
                          {slotIdx === 2 ? '+ Adicionar 3º Modelo (Opcional)' : `Escolher Modelo ${slotIdx + 1}`}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          Clique para abrir a lista de smartphones
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Botão de Disparo do Confronto */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Gemma compara câmeras, telas, processador, bateria e custo-benefício</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartComparison}
                    disabled={selectedPhones.length < 2 || isGenerating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>
                      {isGenerating
                        ? 'Gemma Analisando Fichas Técnicas...'
                        : 'Analisar com Gemma: Qual Eu Compro?'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Estado de Carregamento da IA */}
              {isGenerating && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 border border-indigo-500/30 animate-pulse text-center space-y-3">
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-8 h-8 animate-spin" />
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    Gemma IA está cruzando as especificações...
                  </h4>
                  <p className="text-xs text-indigo-300/80 max-w-md mx-auto leading-relaxed">
                    Avaliando pontuações Antutu, qualidade da tela, tecnologias de zoom e sensores fotográficos, autonomia estimada e longevidade de software.
                  </p>
                </div>
              )}

              {/* Mensagem de Erro */}
              {analysisError && (
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-200 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{analysisError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartComparison}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}

              {/* Relatório Completo de Comparação */}
              {currentComparison && !isGenerating && (
                <div className="space-y-5 animate-in fade-in slide-in-from-top-3 duration-300">
                  {/* Banner do Vencedor */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-indigo-950/40 border border-amber-500/40 shadow-xl shadow-amber-950/20 relative overflow-hidden">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1 flex-1 min-w-[260px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            Recomendação Geral da IA
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {currentComparison.title}
                        </h3>
                        <p className="text-base font-bold text-amber-300 mt-1">
                          🏆 Vencedor: {currentComparison.winnerOverall}
                        </p>
                        {currentComparison.winnerReason && (
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                            {currentComparison.winnerReason}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyFormattedAnalysis(currentComparison)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border border-slate-700"
                        title="Copiar análise formatada para WhatsApp ou redes"
                      >
                        {copiedAnalysis ? (
                          <>
                            <CheckCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">Copiado com Sucesso!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar Análise</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Resumo da Análise */}
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Visão Geral do Confronto
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {currentComparison.summary}
                    </p>
                  </div>

                  {/* Perfis de Usuário ("Ideal Para Quem...") */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      Perfil de Cada Aparelho: Para Quem é Indicado?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {currentComparison.bestFor?.map((bf, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 inline-block mb-2">
                              {bf.badge}
                            </span>
                            <h5 className="text-sm font-bold text-white mb-1.5">{bf.phone}</h5>
                            <p className="text-xs text-slate-300 leading-relaxed">{bf.profile}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabela de Categorias */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      Comparativo Detalhado por Categoria
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentComparison.categories?.map((cat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-cyan-300">{cat.category}</span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              🏆 {cat.winner}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{cat.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Veredito Final: Qual Eu Compro? */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-cyan-950/30 border border-emerald-500/30">
                    <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      Veredito Final: Qual eu compro?
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre-line">
                      {currentComparison.verdict}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Aba da Comunidade */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Comparações Feitas por Todos os Usuários
                  </h4>
                  <p className="text-xs text-slate-400">
                    Arquivo coletivo de todos os confrontos de smartphones gerados com Gemma AI
                  </p>
                </div>

                {/* Campo de Busca nos Duelos */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={communitySearch}
                    onChange={(e) => setCommunitySearch(e.target.value)}
                    placeholder="Filtrar modelos (ex: S24, iPhone)..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {isLoadingCommunity ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-spin mx-auto mb-2" />
                  Carregando histórico de comparações...
                </div>
              ) : filteredCommunity.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/40 rounded-2xl border border-slate-800/80">
                  <Scale className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-300">Nenhuma comparação encontrada</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Crie o primeiro confronto na aba "Novo Duelo"!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCommunity.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                            {comp.title}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            • {new Date(comp.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            🏆 {comp.winnerOverall}
                          </span>
                          {comp.phoneNames?.map((name, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                        {comp.summary && (
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                            {comp.summary}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentComparison(comp);
                          setActiveTab('duel');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-xs font-bold transition-all cursor-pointer shrink-0"
                      >
                        <span>Ver Análise</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Pop-up do Seletor de Smartphones */}
        {isSelectorOpen && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800 shrink-0">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  Escolher Smartphone para o Slot {selectorSlotIndex + 1}
                </h4>
                <p className="text-xs text-slate-400">
                  Pesquise por modelo ou filtre por marca no catálogo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSelectorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Barra de Filtro e Busca */}
            <div className="py-3 flex flex-wrap items-center gap-2 shrink-0">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={selectorSearch}
                  onChange={(e) => setSelectorSearch(e.target.value)}
                  placeholder="Pesquisar smartphone, processador..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
              </div>

              {/* Filtro por Marca */}
              <select
                value={selectorBrandFilter}
                onChange={(e) => setSelectorBrandFilter(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="all">Todas as Marcas</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Lista Scrollável de Aparelhos */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pr-1">
              {filteredPickerPhones.map((phone) => {
                const isAlreadySelected = selectedPhones.some(p => p.id === phone.id);
                return (
                  <button
                    key={phone.id}
                    type="button"
                    onClick={() => selectPhoneIntoSlot(phone)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isAlreadySelected
                        ? 'bg-cyan-500/10 border-cyan-500/40'
                        : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] text-cyan-400 font-bold uppercase">
                        {phone.brand}
                      </span>
                      {isAlreadySelected && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Selecionado
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-white mb-1">
                      {phone.model}
                    </h5>
                    <div className="text-[10px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800/80">
                      <div>Tela: {phone.specs.screen.size}" • {phone.specs.screen.refreshRate}Hz</div>
                      <div className="truncate">CPU: {phone.specs.processor.chipset}</div>
                      <div>Câmera: {phone.specs.camera.rear}MP • Bateria: {phone.specs.battery.capacity}mAh</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
