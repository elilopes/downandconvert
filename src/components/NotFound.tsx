import React from 'react';
import { 
  AlertCircle, 
  Home, 
  RefreshCw, 
  Download, 
  Smartphone, 
  Sparkles, 
  HelpCircle, 
  Shield, 
  FileText, 
  Mail, 
  Map, 
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();

  const siteLinks = [
    {
      title: 'Página Inicial',
      href: '/',
      description: 'Acesse a página principal do aplicativo',
      icon: Home,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
    },
    {
      title: 'Conversor de Vídeo & Áudio',
      href: '/?tab=converter',
      description: 'Converta arquivos locais em MP3, WAV, AAC, FLAC e outros',
      icon: RefreshCw,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    },
    {
      title: 'Downloader de Vídeos & Redes Sociais',
      href: '/?tab=downloader',
      description: 'Baixe mídias do TikTok, Instagram, Facebook, Vimeo e mais',
      icon: Download,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40',
    },
    {
      title: 'Códigos USSD/MMI',
      href: '/?tab=ussd',
      description: 'Lista completa de códigos secretos e operadoras',
      icon: Smartphone,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    },
    {
      title: 'Códigos Populares',
      href: '/?modal=popular',
      description: 'Os códigos USSD mais usados e atalhos rápidos',
      icon: Sparkles,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/40',
    },
    {
      title: 'Como funciona? (FAQ)',
      href: '/?modal=faq',
      description: 'Perguntas frequentes e instruções de uso',
      icon: HelpCircle,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40',
    },
    {
      title: 'Política de Privacidade',
      href: '/privacy',
      description: 'Nossa política de proteção de dados e cookies',
      icon: Shield,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
    {
      title: 'Termos de Uso',
      href: '/terms',
      description: 'Regras e condições de utilização da plataforma',
      icon: FileText,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
    {
      title: 'Contato',
      href: '/contact',
      description: 'Fale conosco para dúvidas, sugestões ou suporte',
      icon: Mail,
      color: 'text-slate-300 bg-slate-800 border-slate-700 group-hover:border-slate-600',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* 404 Header Card */}
      <div className="text-center bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl mb-10 relative overflow-hidden">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4 shadow-lg">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          Erro 404 • Página não encontrada
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Ops! Esta página não existe ou foi movida.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
          O link que você acessou pode estar desatualizado. Use o mapa de links abaixo para navegar diretamente para as páginas e ferramentas ativas do site.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Ir para a Página Inicial</span>
          </a>
          <a
            href="/sitemap.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl text-sm border border-slate-700 transition-all cursor-pointer"
          >
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Abrir sitemap.html</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Directory & Sitemap Links Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Mapa do Site & Seções Disponíveis</span>
          </h2>
          <span className="text-xs text-slate-400">{siteLinks.length} links indexados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {siteLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
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
                  <span className="text-xs font-sans group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

