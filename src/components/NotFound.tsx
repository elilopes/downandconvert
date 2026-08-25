import React from 'react';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <AlertCircle className="w-16 h-16 text-emerald-500 mb-6" />
      <h1 className="text-3xl font-bold text-white mb-2">Página não encontrada</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <a
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
      >
        <Home className="w-4 h-4" />
        Voltar para a página inicial
      </a>
    </div>
  );
};
