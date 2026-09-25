import React from 'react';
import { Smartphone as SmartphoneType } from '../data/smartphones';
import { X, Sparkles, Scale, Eye, Cpu, Monitor, Battery, Camera, Check, Layers, ChevronRight } from 'lucide-react';

interface SimilarDevicesModalProps {
  targetPhone: SmartphoneType | null;
  allPhones: SmartphoneType[];
  onClose: () => void;
  onCompareWith: (targetPhone: SmartphoneType, similarPhone: SmartphoneType) => void;
  onViewSpecs: (phone: SmartphoneType) => void;
}

export interface SimilarPhoneResult {
  phone: SmartphoneType;
  score: number;
  reasons: string[];
}

export function getSimilarDevices(target: SmartphoneType, catalog: SmartphoneType[], limit = 6): SimilarPhoneResult[] {
  const targetAntutu = target.specs.performance?.antutu || 300000;
  const targetTier = target.categoryTier || 'intermediário';
  const targetHz = target.specs.screen.refreshRate || 60;
  const targetScreenType = target.specs.screen.type.toLowerCase();
  const targetBattery = target.specs.battery.capacity || 5000;
  const targetRear = target.specs.camera.rear || 50;
  const targetNetwork = target.specs.features.network;

  return catalog
    .filter(p => p.id !== target.id)
    .map(p => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Categoria (25 pts)
      const pTier = p.categoryTier || 'intermediário';
      if (pTier === targetTier) {
        score += 25;
        reasons.push(`Mesmo segmento (${targetTier.toUpperCase()})`);
      } else {
        score += 10;
      }

      // 2. AnTuTu / Desempenho (30 pts)
      const pAntutu = p.specs.performance?.antutu || 300000;
      const antutuRatio = Math.min(targetAntutu, pAntutu) / (Math.max(targetAntutu, pAntutu) || 1);
      const antutuPoints = Math.round(antutuRatio * 30);
      score += antutuPoints;
      if (antutuRatio >= 0.8) {
        reasons.push(`Desempenho equivalente (~${Math.round(pAntutu / 1000)}k AnTuTu)`);
      }

      // 3. Tela (15 pts)
      const pHz = p.specs.screen.refreshRate || 60;
      if (pHz === targetHz) {
        score += 10;
        reasons.push(`Taxa de atualização de ${pHz}Hz`);
      }
      const pScreenType = p.specs.screen.type.toLowerCase();
      if ((targetScreenType.includes('oled') && pScreenType.includes('oled')) || 
          (targetScreenType.includes('ips') && pScreenType.includes('ips'))) {
        score += 5;
      }

      // 4. Bateria (10 pts)
      const pBattery = p.specs.battery.capacity || 5000;
      if (Math.abs(pBattery - targetBattery) <= 500) {
        score += 10;
        reasons.push(`Bateria de ${pBattery} mAh`);
      }

      // 5. Câmera (10 pts)
      const pRear = p.specs.camera.rear || 50;
      if (Math.abs(pRear - targetRear) <= 12) {
        score += 10;
        reasons.push(`Sensor de câmera de ${pRear} MP`);
      }

      // 6. Conectividade (10 pts)
      if (p.specs.features.network === targetNetwork) {
        score += 10;
        if (targetNetwork === '5G') {
          reasons.push('Conectividade 5G');
        }
      }

      return {
        phone: p,
        score: Math.min(99, Math.max(50, score)),
        reasons
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const SimilarDevicesModal: React.FC<SimilarDevicesModalProps> = ({
  targetPhone,
  allPhones,
  onClose,
  onCompareWith,
  onViewSpecs
}) => {
  if (!targetPhone) return null;

  const similarList = getSimilarDevices(targetPhone, allPhones, 6);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Aparelhos Equivalentes
              </span>
              <span className="text-xs text-slate-400">• Algoritmo de Especificações</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              Modelos Semelhantes ao <span className="text-cyan-300">{targetPhone.brand} {targetPhone.model}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Dispositivos com desempenho, telas, câmeras e categorias mais próximas.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Catalog List of Similar Devices */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {similarList.map(({ phone, score, reasons }) => (
            <div
              key={phone.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Info Left */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-extrabold text-cyan-400">
                    {phone.brand}
                  </span>
                  <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {phone.model}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    {score}% Semelhante
                  </span>
                </div>

                {/* Specifics Highlights */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    <span>{phone.specs.screen.size}" {phone.specs.screen.refreshRate}Hz</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[150px]">{phone.specs.processor.chipset}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-slate-400" />
                    <span>{phone.specs.camera.rear} MP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-slate-400" />
                    <span>{phone.specs.battery.capacity} mAh</span>
                  </div>
                </div>

                {/* Reasons tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {reasons.map((r, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-300 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      ✓ {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Right */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  type="button"
                  onClick={() => onViewSpecs(phone)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ficha Técnica</span>
                </button>

                <button
                  type="button"
                  onClick={() => onCompareWith(targetPhone, phone)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all cursor-pointer shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-slate-950" />
                  <span>Comparar na Tabela</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Pontuação calculada cruzando AnTuTu, câmeras, bateria e tela
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
