import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Home, 
  RefreshCw, 
  Download, 
  Smartphone, 
  Cpu,
  Newspaper,
  Sparkles, 
  HelpCircle, 
  Shield, 
  FileText, 
  Mail, 
  Map, 
  ExternalLink,
  FileCode,
  Lock,
  ShieldAlert,
  AlertTriangle,
  FileQuestion,
  LogIn,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { googleSignIn } from '../lib/auth';

export type Http40xCode = 400 | 401 | 403 | 404;

interface ErrorDetails {
  code: Http40xCode;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  technicalSource: string;
  possibleCauses: string[];
  recommendedActions: string[];
  icon: React.ComponentType<{ className?: string }>;
  themeColor: {
    badge: string;
    border: string;
    bgGlow: string;
    text: string;
    gradient: string;
  };
}

const ERROR_CONFIGS: Record<Http40xCode, ErrorDetails> = {
  400: {
    code: 400,
    name: 'Bad Request',
    subtitle: 'Requisição Inválida',
    badge: 'Erro 400 • Bad Request',
    description: 'O servidor não conseguiu processar ou entender o pedido enviado devido a uma falha na sintaxe, parâmetros malformados ou cabeçalhos corrompidos.',
    technicalSource: 'MDN Web Docs: O servidor não pode ou não processará a requisição devido a algo percebido como um erro do cliente.',
    possibleCauses: [
      'Parâmetros de URL com formatação ou caracteres inválidos',
      'Upload de arquivo corrompido ou acima do limite permitido',
      'Cookies corrompidos ou cache do navegador desatualizado'
    ],
    recommendedActions: [
      'Remova parâmetros adicionais da barra de endereços',
      'Limpe o cache do navegador e recarregue a página',
      'Verifique se os dados e arquivos enviados estão corretos'
    ],
    icon: AlertTriangle,
    themeColor: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400',
    }
  },
  401: {
    code: 401,
    name: 'Unauthorized',
    subtitle: 'Não Autorizado / Autenticação Necessária',
    badge: 'Erro 401 • Unauthorized',
    description: 'Você precisa fazer login ou fornecer credenciais válidas de autenticação para visualizar esta página ou executar esta operação.',
    technicalSource: 'MDN Web Docs / RFC 9110: A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino.',
    possibleCauses: [
      'Sessão expirada ou usuário não conectado à plataforma',
      'Token de acesso ou chave de API inválida ou ausente',
      'Tentativa de salvar arquivos na nuvem sem autenticar com a conta Google'
    ],
    recommendedActions: [
      'Faça login com sua conta Google para continuar',
      'Renove sua sessão ativa recarregando a página',
      'Verifique se sua conta tem acesso aos recursos de nuvem'
    ],
    icon: Lock,
    themeColor: {
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      border: 'border-blue-500/30',
      bgGlow: 'bg-blue-500/10',
      text: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400',
    }
  },
  403: {
    code: 403,
    name: 'Forbidden',
    subtitle: 'Acesso Proibido',
    badge: 'Erro 403 • Forbidden',
    description: 'O acesso à página ou recurso foi negado pelo servidor, mesmo que você esteja autenticado com uma conta válida.',
    technicalSource: 'MDN Web Docs: O servidor compreendeu a requisição, mas se recusa expressamente a autorizá-la.',
    possibleCauses: [
      'Sua conta não possui nível de permissão ou privilégios de administrador',
      'Restrição de política de segurança, IP ou bloqueio de firewall',
      'Tentativa de acesso direto a diretórios internos protegidos'
    ],
    recommendedActions: [
      'Verifique se você possui as permissões necessárias na sua conta',
      'Retorne às páginas públicas e ferramentas disponíveis no mapa do site',
      'Entre em contato com o suporte se acreditar que é um erro'
    ],
    icon: ShieldAlert,
    themeColor: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      border: 'border-purple-500/30',
      bgGlow: 'bg-purple-500/10',
      text: 'text-purple-400',
      gradient: 'from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400',
    }
  },
  404: {
    code: 404,
    name: 'Not Found',
    subtitle: 'Página Não Encontrada',
    badge: 'Erro 404 • Not Found',
    description: 'A página, rota ou endereço digitado não existe no servidor ou foi transferido permanentemente para outro local.',
    technicalSource: 'GoDaddy / MDN: O servidor não pode encontrar o recurso solicitado. Links que levam a um 404 geralmente são chamados de links quebrados.',
    possibleCauses: [
      'Endereço digitado incorretamente na barra do navegador',
      'Link externo desatualizado ou página arquivada/movida',
      'Extensão de rota não cadastrada no roteador do aplicativo'
    ],
    recommendedActions: [
      'Verifique a digitação da URL na barra de endereços',
      'Use os links ativos do mapa do site para navegar',
      'Retorne à Página Inicial do DownConvert'
    ],
    icon: FileQuestion,
    themeColor: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      border: 'border-rose-500/30',
      bgGlow: 'bg-rose-500/10',
      text: 'text-rose-400',
      gradient: 'from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400',
    }
  }
};

interface NotFoundProps {
  initialCode?: Http40xCode;
}

export const NotFound: React.FC<NotFoundProps> = ({ initialCode }) => {
  const { t } = useLanguage();
  const [selectedCode, setSelectedCode] = useState<Http40xCode>(() => {
    if (initialCode && ERROR_CONFIGS[initialCode]) return initialCode;
    
    // Check URL parameters for explicit error code (?code=400, ?error=403, ?status=401, etc.)
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const codeParam = searchParams.get('code') || searchParams.get('error') || searchParams.get('status');
      if (codeParam === '400') return 400;
      if (codeParam === '401') return 401;
      if (codeParam === '403') return 403;
      if (codeParam === '404') return 404;
    }
    return 404;
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const currentError = ERROR_CONFIGS[selectedCode];
  const ErrorIcon = currentError.icon;

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await googleSignIn();
      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleClearUrlAndGoHome = () => {
    window.location.href = '/';
  };

  const siteLinks = [
    {
      title: 'Página Inicial',
      href: '/',
      description: 'Acesse a página principal do aplicativo com todas as ferramentas integradas',
      icon: Home,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
    },
    {
      title: 'Conversor de Vídeo & Áudio',
      href: '/',
      description: 'Converta arquivos locais em MP3, MP4, WAV, AAC, FLAC, OGG, AVI, MKV e outros formatos',
      icon: RefreshCw,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    },
    {
      title: 'Downloader de Vídeos & Redes Sociais',
      href: '/downloader',
      description: 'Baixe mídias do TikTok, Instagram, Facebook, Vimeo, YouTube e outras plataformas',
      icon: Download,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40',
    },
    {
      title: 'Códigos USSD/MMI',
      href: '/ussd',
      description: 'Lista completa e interativa de códigos secretos, diagnósticos e operadoras',
      icon: Smartphone,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    },
    {
      title: 'Especificações de Celulares',
      href: '/smartphones',
      description: 'Catálogo e ficha técnica detalhada de smartphones com filtros avançados de hardware',
      icon: Cpu,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20 group-hover:border-violet-500/40',
    },
    {
      title: 'Notícias de Tecnologia & Gadgets',
      href: '/news',
      description: 'Últimas novidades, lançamentos, inovações e descobertas atualizadas periodicamente',
      icon: Newspaper,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20 group-hover:border-sky-500/40',
    },
    {
      title: 'Códigos Populares',
      href: '/popular',
      description: 'Os códigos USSD e atalhos mais consultados pela comunidade em tempo real',
      icon: Sparkles,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/40',
    },
    {
      title: 'Como funciona? (FAQ)',
      href: '/faq',
      description: 'Perguntas frequentes, dicas e instruções detalhadas de utilização',
      icon: HelpCircle,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40',
    },
    {
      title: 'Política de Privacidade',
      href: '/privacy',
      description: 'Nossa política de proteção de dados, tratamento de cookies e segurança',
      icon: Shield,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
    {
      title: 'Termos de Uso',
      href: '/terms',
      description: 'Regras, responsabilidades e condições de utilização da plataforma',
      icon: FileText,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
    {
      title: 'Contato & Suporte',
      href: '/contact',
      description: 'Fale conosco para tirar dúvidas, enviar sugestões ou relatar problemas',
      icon: Mail,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
    {
      title: 'Mapa do Site (XML)',
      href: '/sitemap.xml',
      description: 'Estrutura XML indexada para motores de busca e rastreadores web',
      icon: FileCode,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* 40X Family Error Code Tabs */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Diagnóstico de Erros HTTP (Família 40X):</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center">
          {([400, 401, 403, 404] as Http40xCode[]).map((code) => {
            const isSelected = selectedCode === code;
            const cfg = ERROR_CONFIGS[code];
            return (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedCode(code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? `${cfg.themeColor.badge} shadow-md border ring-1 ring-white/10`
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <span>HTTP {code}</span>
                <span className="text-[10px] opacity-75 font-normal">({cfg.name})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Error Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-10 relative overflow-hidden text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className={`p-4 rounded-2xl ${currentError.themeColor.bgGlow} ${currentError.themeColor.border} border ${currentError.themeColor.text} shadow-lg shrink-0`}>
            <ErrorIcon className="w-12 h-12" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${currentError.themeColor.badge}`}>
                {currentError.badge}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {currentError.subtitle}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              {currentError.name} — {currentError.subtitle}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mb-4 leading-relaxed max-w-3xl">
              {currentError.description}
            </p>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-400 mb-6 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-300">Definição Técnica:</strong> {currentError.technicalSource}
              </span>
            </div>

            {/* Diagnostic Grid: Causes & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Possíveis Causas</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {currentError.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400/80 mt-0.5">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ações Recomendadas</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {currentError.recommendedActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400/80 mt-0.5">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Ir para a Página Inicial</span>
              </a>

              {selectedCode === 401 && (
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loginSuccess ? 'Login Realizado!' : isLoggingIn ? 'Conectando...' : 'Fazer Login com Google'}</span>
                </button>
              )}

              {selectedCode === 400 && (
                <button
                  type="button"
                  onClick={handleClearUrlAndGoHome}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Redefinir Parâmetros da URL</span>
                </button>
              )}

              <a
                href="/sitemap.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <Map className="w-3.5 h-3.5 text-emerald-400" />
                <span>Abrir sitemap.html</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Abrir sitemap.xml</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Directory & Sitemap Links Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Mapa do Site & Seções Ativas</span>
          </h2>
          <span className="text-xs text-slate-400">{siteLinks.length} links indexados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {siteLinks.map((item) => {
            const Icon = item.icon;
            const isExternalFile = item.href.endsWith('.html') || item.href.endsWith('.xml');
            return (
              <a
                key={item.href}
                href={item.href}
                target={isExternalFile ? '_blank' : undefined}
                rel={isExternalFile ? 'noopener noreferrer' : undefined}
                className="group flex flex-col p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl border ${item.color} transition-all group-hover:scale-110 shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-emerald-400/80 transition-colors">
                  <span className="truncate">{item.href}</span>
                  <span className="text-xs font-sans group-hover:translate-x-0.5 transition-transform">
                    {isExternalFile ? '↗' : '→'}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};


