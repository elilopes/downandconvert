import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, Cpu, Copy, ExternalLink, Zap, Terminal, AlertCircle, RefreshCw, Server, Send } from 'lucide-react';

interface OpenSourceAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProviderStatus {
  groq: boolean;
  deepseek: boolean;
  openrouter: boolean;
  mistral: boolean;
  together: boolean;
  ollama: boolean;
  gemini: boolean;
  openai: boolean;
}

export const OpenSourceAiModal: React.FC<OpenSourceAiModalProps> = ({ isOpen, onClose }) => {
  const [providers, setProviders] = useState<ProviderStatus>({
    groq: false,
    deepseek: false,
    openrouter: false,
    mistral: false,
    together: false,
    ollama: false,
    gemini: false,
    openai: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  
  // Estados da Área de Teste Interativo de IA
  const [testPrompt, setTestPrompt] = useState<string>('Resuma o impacto das IAs Open-Source (Llama 3.3, DeepSeek R1, Qwen 2.5) na tecnologia atual.');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testError, setTestError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/providers');
      const data = await res.json();
      if (data.success && data.providers) {
        setProviders(data.providers);
      }
    } catch {
      // Keep defaults
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setTestResponse(null);
      setTestError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, varName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVar(varName);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  const handleTestAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim() || isTesting) return;

    setIsTesting(true);
    setTestError(null);
    setTestResponse(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt.trim() })
      });
      const data = await res.json();
      if (data.success && data.text) {
        setTestResponse(data.text);
      } else {
        setTestError(data.error || 'Não foi possível obter resposta das IAs.');
      }
    } catch (err: any) {
      setTestError(err.message || 'Falha na conexão com o servidor de IA.');
    } finally {
      setIsTesting(false);
    }
  };

  const envVariables = [
    {
      name: 'GROQ_API_KEY',
      provider: 'Groq Cloud (Ultra-Rápido)',
      models: 'Llama 3.3 (70B), DeepSeek R1 Distill, Qwen 2.5, Mixtral 8x7B, Whisper v3',
      link: 'https://console.groq.com',
      badge: 'Recomendado (Grátis & Rápido)',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'DEEPSEEK_API_KEY',
      provider: 'DeepSeek Oficial',
      models: 'DeepSeek R1 (Raciocínio R1) & DeepSeek V3 (Chat/Código)',
      link: 'https://platform.deepseek.com',
      badge: 'Raciocínio Lógico Pro',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      name: 'OPENROUTER_API_KEY',
      provider: 'OpenRouter (Acesso Unificado)',
      models: 'Llama 3.3 70B, DeepSeek R1/V3, Qwen 2.5 72B, Mixtral 8x7B, Gemma 2',
      link: 'https://openrouter.ai/keys',
      badge: 'Multi-Modelos',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    },
    {
      name: 'MISTRAL_API_KEY',
      provider: 'Mistral AI Oficial',
      models: 'Mistral Large, Mixtral 8x7B, Codestral',
      link: 'https://console.mistral.ai',
      badge: 'IA Europeia / Mixtral',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'TOGETHER_API_KEY',
      provider: 'Together AI',
      models: 'Llama 3.3 70B, DeepSeek R1/V3, Qwen 2.5 72B',
      link: 'https://api.together.ai',
      badge: 'Open-Source Scale',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      name: 'OLLAMA_BASE_URL',
      provider: 'Ollama / Servidor VPS Próprio (ex: Contabo)',
      models: 'Qualquer modelo Open-Source auto-hospedado (ex: http://localhost:11434)',
      link: 'https://ollama.com',
      badge: '100% Privado / VPS',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                Hub de IAs Open-Source
              </h2>
              <p className="text-xs text-slate-400">
                DeepSeek R1/V3 • Llama 3.3 • Qwen 2.5 • Mistral • Whisper • Gemma 2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Onde Salvar as Chaves - Banner Explicativo */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Onde salvar as chaves de API e Variáveis?</span>
              </div>
              <button
                type="button"
                onClick={fetchStatus}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Atualizar Status</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você pode configurar as variáveis de duas formas simples:
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc">
              <li>
                <strong>Opção 1 (AI Studio Secrets):</strong> Adicione o nome da variável e o valor no painel de <strong className="text-cyan-300">Secrets (Configurações do Projeto)</strong> do AI Studio.
              </li>
              <li>
                <strong>Opção 2 (Arquivo .env):</strong> No arquivo <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300 font-mono">.env</code> na raiz do projeto, insira a chave (ex: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">GROQ_API_KEY="sua_chave"</code>).
              </li>
            </ul>
          </div>

          {/* Status dos Provedores Conectados */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Status dos Provedores Detectados em Tempo Real</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Groq Cloud', key: 'groq', label: 'Llama 3.3 / DeepSeek / Whisper' },
                { name: 'DeepSeek AI', key: 'deepseek', label: 'DeepSeek R1 & V3' },
                { name: 'OpenRouter', key: 'openrouter', label: 'Todos os Open-Source' },
                { name: 'Mistral AI', key: 'mistral', label: 'Mixtral 8x7B / Large' },
                { name: 'Together AI', key: 'together', label: 'Llama 3.3 / Qwen' },
                { name: 'Ollama VPS', key: 'ollama', label: 'Contabo / Local' },
                { name: 'Google Gemma', key: 'gemini', label: 'Gemma 2 / Gemini' },
                { name: 'OpenAI', key: 'openai', label: 'GPT-4o / Whisper' }
              ].map((p) => {
                const isActive = providers[p.key as keyof ProviderStatus];
                return (
                  <div
                    key={p.key}
                    className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{p.name}</span>
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> ATIVO
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                          Ausente
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 truncate">{p.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de Variáveis & Links de Cadastro */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Nomes exatos das Variáveis & Onde obter as Chaves</span>
            </h3>

            <div className="space-y-3">
              {envVariables.map((v) => (
                <div key={v.name} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-amber-300 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {v.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${v.badgeColor}`}>
                        {v.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">{v.provider}</div>
                    <div className="text-[11px] text-slate-400">
                      <strong>Modelos:</strong> {v.models}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(v.name, v.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{copiedVar === v.name ? 'Copiado!' : 'Copiar Variável'}</span>
                    </button>

                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                    >
                      <span>Obter Chave</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teste Interativo em Tempo Real */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Testar IAs Open-Source em Ação</span>
            </h3>
            <p className="text-xs text-slate-300">
              Digite uma pergunta para testar a comunicação direta com os provedores Open-Source ativados (Groq, DeepSeek, OpenRouter, Mistral, Ollama ou Gemini).
            </p>

            <form onSubmit={handleTestAi} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="Digite sua pergunta para o modelo open-source..."
                  className="w-full pl-4 pr-24 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isTesting || !testPrompt.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Gerando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Testar</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {testError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{testError}</span>
              </div>
            )}

            {testResponse && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Resposta do Modelo Open-Source:
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(testResponse, 'response')}
                    className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    {copiedVar === 'response' ? 'Copiado!' : 'Copiar Resposta'}
                  </button>
                </div>
                <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {testResponse}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <span className="text-xs text-slate-400">
            Down&Convert • Módulo Open-Source LLM
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
