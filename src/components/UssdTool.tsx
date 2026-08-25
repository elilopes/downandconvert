import React, { useState } from 'react';
import { Search, Phone, Wrench, Smartphone, Copy, Check, Filter, ExternalLink, ShieldAlert, Sparkles, Zap } from 'lucide-react';

interface UssdCode {
  code: string;
  title: string;
  description: string;
  carrier: 'vivo' | 'claro' | 'tim' | 'oi' | 'geral' | 'android' | 'samsung' | 'xiaomi' | 'motorola';
  category: 'saldo' | 'recarga' | 'numero' | 'internet' | 'teste' | 'sistema' | 'limpeza';
}

const USSD_DATABASE: UssdCode[] = [
  // Vivo
  { code: '*8000', title: 'Consultar Saldo Vivo', description: 'Recebe um SMS com o saldo de créditos e validade atual.', carrier: 'vivo', category: 'saldo' },
  { code: '*800', title: 'Atendimento Vivo', description: 'Central de atendimento telefônico da operadora Vivo.', carrier: 'vivo', category: 'saldo' },
  { code: '*8486', title: 'Central de Relacionamento Vivo', description: 'Falar diretamente com atendente Vivo.', carrier: 'vivo', category: 'saldo' },
  { code: '*7000', title: 'Recarga Vivo com Cartão', description: 'Recarregue seus créditos informando o cartão de crédito.', carrier: 'vivo', category: 'recarga' },

  // Claro
  { code: '*544#', title: 'Consultar Internet Claro', description: 'Verifica o saldo de internet móvel e bônus disponíveis.', carrier: 'claro', category: 'internet' },
  { code: '*546#', title: 'Consultar Saldo Claro', description: 'Mostra o saldo atual em créditos na tela do celular.', carrier: 'claro', category: 'saldo' },
  { code: '*555#', title: 'Recarga Claro', description: 'Menu interativo para recarga e consulta de benefícios.', carrier: 'claro', category: 'recarga' },
  { code: '*510#', title: 'Descobrir Meu Número Claro', description: 'Exibe o número da linha Claro na tela.', carrier: 'claro', category: 'numero' },

  // TIM
  { code: '*222#', title: 'Consultar Saldo TIM', description: 'Exibe o saldo de créditos e validade na tela.', carrier: 'tim', category: 'saldo' },
  { code: '*144#', title: 'Menu Principal TIM', description: 'Acesse promoções, saldo e atendimento TIM.', carrier: 'tim', category: 'saldo' },
  { code: '*271#', title: 'Descobrir Meu Número TIM', description: 'Mostra o DDD e número do seu chip TIM.', carrier: 'tim', category: 'numero' },
  { code: '*244#', title: 'Recarga TIM', description: 'Serviço rápido de recarga de créditos.', carrier: 'tim', category: 'recarga' },

  // Oi
  { code: '*880#', title: 'Menu Oi Interativo', description: 'Consulte saldo, internet, recargas e promoções.', carrier: 'oi', category: 'saldo' },
  { code: '*800', title: 'Saldo Oi por Voz', description: 'Ouvir o saldo de créditos por ligação automática.', carrier: 'oi', category: 'saldo' },

  // Android & Sistema / Diagnóstico / Testes
  { code: '*#06#', title: 'Consultar IMEI (Universal)', description: 'Exibe o número de série de identificação global do aparelho (IMEI). Essencial para bloqueio em caso de roubo.', carrier: 'geral', category: 'sistema' },
  { code: '*#*#4636#*#*', title: 'Menu de Informações e Diagnóstico', description: 'Mostra estatísticas de uso, bateria, conexão Wi-Fi e testes de rede.', carrier: 'android', category: 'teste' },
  { code: '*#0*#', title: 'Modo de Teste de Hardware (Samsung)', description: 'Testa tela (cores RGB), touch screen, alto-falante, vibração, câmeras e sensores.', carrier: 'samsung', category: 'teste' },
  { code: '*#*#34971539#*#*', title: 'Informações da Câmera', description: 'Exibe detalhes completos sobre o firmware e especificações das lentes da câmera.', carrier: 'android', category: 'sistema' },
  { code: '*#*#7594#*#*', title: 'Alterar Comportamento do Botão Power', description: 'Permite desligar o aparelho diretamente ao segurar o botão power sem exibir o menu.', carrier: 'android', category: 'sistema' },
  { code: '*#*#232338#*#*', title: 'Endereço MAC do Wi-Fi', description: 'Mostra o endereço MAC físico da placa de rede Wi-Fi.', carrier: 'android', category: 'sistema' },
  { code: '*#*#0289#*#*', title: 'Teste de Áudio / Melodia', description: 'Testa o funcionamento dos alto-falantes e campainha do smartphone.', carrier: 'android', category: 'teste' },
  { code: '*#*#0842#*#*', title: 'Teste de Vibração e Luz de Fundo', description: 'Testa o motor de vibração e o brilho da tela.', carrier: 'android', category: 'teste' },
];

export const UssdTool: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCodes = USSD_DATABASE.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(search.toLowerCase()) ||
                          item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCarrier = selectedCarrier === 'todos' || item.carrier === selectedCarrier;
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;

    return matchesSearch && matchesCarrier && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-4 shadow-sm">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Utilitários de Telefonia & Android</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Códigos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">USSD & MMI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Pesquise atalhos rápidos de operadoras (Vivo, Claro, TIM, Oi) para consultar saldo, internet, além de códigos secretos de teste e diagnóstico do seu celular.
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
              placeholder="Buscar código, operadora ou função..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Carrier Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'vivo', label: 'Vivo' },
              { id: 'claro', label: 'Claro' },
              { id: 'tim', label: 'TIM' },
              { id: 'oi', label: 'Oi' },
              { id: 'geral', label: 'Universal' },
              { id: 'samsung', label: 'Samsung/Android' },
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
            <Filter className="w-3 h-3 text-cyan-400" /> Categoria:
          </span>
          {[
            { id: 'todos', label: 'Todas as Categorias' },
            { id: 'saldo', label: '💰 Saldo' },
            { id: 'recarga', label: '💳 Recarga' },
            { id: 'internet', label: '📶 Internet' },
            { id: 'numero', label: '📞 Meu Número' },
            { id: 'teste', label: '🛠️ Testes de Hardware' },
            { id: 'sistema', label: '⚙️ Sistema & IMEI' },
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
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    item.carrier === 'vivo' ? 'bg-purple-950/60 text-purple-300 border-purple-800/60' :
                    item.carrier === 'claro' ? 'bg-red-950/60 text-red-300 border-red-800/60' :
                    item.carrier === 'tim' ? 'bg-blue-950/60 text-blue-300 border-blue-800/60' :
                    item.carrier === 'oi' ? 'bg-amber-950/60 text-amber-300 border-amber-800/60' :
                    item.carrier === 'samsung' ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60' :
                    'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                  }`}>
                    {item.carrier}
                  </span>

                  <span className="text-[10px] text-slate-400 capitalize bg-slate-800/60 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {item.description}
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
                    onClick={() => handleCopy(item.code)}
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
                        <span>Copiado</span>
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
          💡 <strong className="text-slate-300">Dica:</strong> Se você estiver acessando este site pelo celular, basta clicar no ícone do telefone verde para abrir o discador automático com o código USSD ou MMI pronto para ser executado.
        </p>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-2 text-xs">
          <span className="text-slate-500">Saiba mais sobre a tecnologia:</span>
          <a
            href="https://pt.wikipedia.org/wiki/Dados_de_Servi%C3%A7os_Suplementares_N%C3%A3o_estruturados"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1 font-medium"
          >
            Wikipedia (USSD) <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
