import React, { useState } from 'react';
import { Search, Phone, Wrench, Smartphone, Copy, Check, Filter, ExternalLink, ShieldAlert, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { logUssdSearch } from '../lib/ussdTracking';
import { UssdCode, USSD_DATABASE } from '../data/ussdcodes';


interface UssdToolProps {
  focusedUssdId?: string | null;
}

export const UssdTool: React.FC<UssdToolProps> = ({ focusedUssdId }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopyLink = (item: UssdCode) => {
    const url = `${window.location.origin}/${item.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(item.id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleCopy = (item: UssdCode) => {
    navigator.clipboard.writeText(item.code);
    setCopiedCode(item.code);
    logUssdSearch(item.code, item.titleKey);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCodes = focusedUssdId 
    ? USSD_DATABASE.filter(item => item.id === focusedUssdId)
    : USSD_DATABASE.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(search.toLowerCase()) ||
                          t(item.titleKey).toLowerCase().includes(search.toLowerCase()) ||
                          t(item.descKey).toLowerCase().includes(search.toLowerCase());
    
    const matchesCarrier = selectedCarrier === 'todos' || 
                           item.carrier === selectedCarrier || 
                           (selectedCarrier === 'android' && item.carrier === 'samsung') ||
                           (selectedCarrier === 'ios' && item.carrier === 'iphone');
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;

    return matchesSearch && matchesCarrier && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          {t('ussd.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          {t('ussd.desc')}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 mb-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('ussd.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Carrier Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {[
              { id: 'todos', label: t('ussd.all') },
              { id: 'vivo', label: 'Vivo' },
              { id: 'claro', label: 'Claro' },
              { id: 'tim', label: 'TIM' },
              { id: 'oi', label: 'Oi' },
              { id: 'vodafone', label: 'Vodafone' },
              { id: 'geral', label: t('ussd.universal') },
              { id: 'android', label: 'Android' },
              { id: 'ios', label: 'iOS' },
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCarrier(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCarrier === c.id
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> {t('ussd.cat')}
          </span>
          {[
            { id: 'todos', label: t('ussd.cat.all') },
            { id: 'saldo', label: t('ussd.cat.saldo') },
            { id: 'recarga', label: t('ussd.cat.recarga') },
            { id: 'internet', label: t('ussd.cat.internet') },
            { id: 'numero', label: t('ussd.cat.numero') },
            { id: 'teste', label: t('ussd.cat.teste') },
            { id: 'sistema', label: t('ussd.cat.sistema') },
            { id: 'limpeza', label: t('ussd.cat.limpeza') },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                  : 'bg-slate-950/50 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Codes */}
      {filteredCodes.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-300">Nenhum código encontrado</h3>
          <p className="text-xs text-slate-500 mt-1">Tente buscar por outro termo ou selecione outra operadora.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCodes.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 hover:border-cyan-500/50 transition-all group flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      item.carrier === 'vivo' ? 'bg-purple-950/60 text-purple-300 border-purple-800/60' :
                      item.carrier === 'claro' ? 'bg-red-950/60 text-red-300 border-red-800/60' :
                      item.carrier === 'tim' ? 'bg-blue-950/60 text-blue-300 border-blue-800/60' :
                      item.carrier === 'oi' ? 'bg-amber-950/60 text-amber-300 border-amber-800/60' :
                      item.carrier === 'vodafone' ? 'bg-rose-950/60 text-rose-300 border-rose-800/60' :
                      item.carrier === 'samsung' ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60' :
                      item.carrier === 'iphone' ? 'bg-slate-800/60 text-slate-300 border-slate-600/60' :
                      'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                    }`}>
                      {item.carrier}
                    </span>
                    {item.type && (
                      <span 
                        className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded border ${
                          item.type === 'USSD' 
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700/40' 
                            : 'bg-orange-900/30 text-orange-300 border-orange-700/40'
                        }`}
                        title={item.type === 'USSD' ? 'Unstructured Supplementary Service Data (Requer Rede)' : 'Man-Machine Interface (Código Local)'}
                      >
                        {item.type}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 capitalize bg-slate-800/60 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {t(item.titleKey)}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="font-mono font-bold text-cyan-400 text-lg bg-slate-950/80 px-3 py-1 rounded-xl border border-cyan-900/50 tracking-wider">
                  {item.code}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${encodeURIComponent(item.code)}`}
                    title="Disparar no celular"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleCopy(item)}
                    title="Copiar Código"
                    className={`p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold ${
                      copiedCode === item.code
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {copiedCode === item.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t('ussd.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Notice */}
      <div className="mt-12 bg-slate-900/50 border border-cyan-900/30 rounded-2xl p-6 text-center max-w-3xl mx-auto space-y-3">
        <p className="text-xs text-slate-400 leading-relaxed">
          💡 {t('ussd.tip')}
        </p>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-2 text-xs">
          <a
            href="https://pt.wikipedia.org/wiki/Dados_de_Servi%C3%A7os_Suplementares_N%C3%A3o_estruturados"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1.5 font-medium"
          >
            {t('ussd.wikipedia')} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Editorial Content Section for AdSense Policy Compliance */}
      <section className="mt-16 max-w-4xl mx-auto bg-slate-900/70 border border-slate-800/80 rounded-3xl p-8 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          {t('editorial.ussd.title')}
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            {t('editorial.ussd.p1')}
          </p>
          <h3 className="text-sm font-bold text-cyan-300 mt-4">{t('editorial.ussd.h2')}</h3>
          <p>
            {t('editorial.ussd.p2')}
          </p>
          <p>
            {t('editorial.ussd.p3')}
          </p>
          <h3 className="text-sm font-bold text-cyan-300 mt-4">{t('editorial.ussd.h3')}</h3>
          <p>
            {t('editorial.ussd.p4')}
          </p>
        </div>
      </section>
    </div>
  );
};
