import React from 'react';
import { ShieldCheck, Zap, Sliders, Music, Award, HardDriveDownload } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400',
      title: '100% Seguro e Privado',
      description:
        'A conversão ocorre localmente no motor do seu navegador. Seus arquivos de vídeo nunca são enviados para a nuvem.',
    },
    {
      icon: Award,
      color: 'from-cyan-500 to-blue-400',
      textColor: 'text-cyan-400',
      title: 'Áudio MP3 até 320 kbps',
      description:
        'Extração de máxima pureza acústica em 48kHz Stereo ou Mono com taxa de bits personalizável (64k até 320k).',
    },
    {
      icon: Sliders,
      color: 'from-purple-500 to-indigo-400',
      textColor: 'text-purple-400',
      title: 'Corte Preciso & Equalizador',
      description:
        'Defina trecho inicial e final, amplifique o volume até 300% e aplique reforço de graves ou clareza de voz.',
    },
    {
      icon: Music,
      color: 'from-amber-500 to-orange-400',
      textColor: 'text-amber-400',
      title: 'Tags ID3 & Capa Embutida',
      description:
        'Preencha título, artista e álbum, ou use a miniatura do próprio vídeo como imagem de capa do arquivo MP3.',
    },
    {
      icon: Zap,
      color: 'from-rose-500 to-pink-400',
      textColor: 'text-rose-400',
      title: 'Sem Limite de Tamanho',
      description:
        'Converta arquivos grandes de 500MB, 1GB ou mais sem travamentos, filas de espera ou cobranças ocultas.',
    },
    {
      icon: HardDriveDownload,
      color: 'from-teal-500 to-emerald-400',
      textColor: 'text-teal-400',
      title: 'Download Direto no Dispositivo',
      description:
        'Baixe cada áudio diretamente no seu celular ou computador com um clique, ou baixe todos compactados em arquivo .ZIP.',
    },
  ];

  return (
    <div className="my-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Por que usar o <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AudioMorph</span>?
        </h3>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Tecnologia moderna Web Audio para conversões ultra-rápidas sem depender de servidores remotos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all group hover:bg-slate-900/90 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${feat.textColor}`} />
                </div>
              </div>
              <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
