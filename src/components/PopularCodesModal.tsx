import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, Phone, Flame, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PopularCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToUssd: () => void;
}

const POPULAR_CODES = [
  { code: '*#06#', titleKey: 'ussd.code.geral.06.title', carrier: 'Universal', descKey: 'ussd.code.geral.06.desc' },
  { code: '*544#', titleKey: 'ussd.code.claro.544.title', carrier: 'Claro', descKey: 'ussd.code.claro.544.desc' },
  { code: '*8000', titleKey: 'ussd.code.vivo.8000.title', carrier: 'Vivo', descKey: 'ussd.code.vivo.8000.desc' },
  { code: '*222#', titleKey: 'ussd.code.tim.222.title', carrier: 'TIM', descKey: 'ussd.code.tim.222.desc' },
  { code: '*#*#4636#*#*', titleKey: 'ussd.code.android.4636.title', carrier: 'Android', descKey: 'ussd.code.android.4636.desc' },
  { code: '*#0*#', titleKey: 'ussd.code.samsung.0.title', carrier: 'Samsung', descKey: 'ussd.code.samsung.0.desc' },
];

export const PopularCodesModal: React.FC<PopularCodesModalProps> = ({ isOpen, onClose, onNavigateToUssd }) => {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/35 text-cyan-400">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t('popular.modal.title')}</h3>
              <p className="text-xs text-slate-400">{t('popular.modal.desc')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {POPULAR_CODES.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-cyan-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                    {item.carrier}
                  </span>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {t(item.titleKey)}
                  </h4>
                </div>
                <p className="text-xs text-slate-400">{t(item.descKey)}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-cyan-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-sm tracking-wider">
                  {item.code}
                </span>

                <a
                  href={`tel:${encodeURIComponent(item.code)}`}
                  title="Disparar no celular"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleCopy(item.code)}
                  title="Copiar"
                  className={`p-2 rounded-xl transition-all ${
                    copiedCode === item.code ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copiedCode === item.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateToUssd();
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <span>Ver todos os códigos e operadoras</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
          >
            {t('faq.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
