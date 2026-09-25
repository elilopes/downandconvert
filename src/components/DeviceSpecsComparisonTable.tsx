import React, { useState } from 'react';
import { 
  Smartphone as SmartphoneIcon, 
  Cpu, 
  Tv, 
  Camera, 
  Battery, 
  Wifi, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRightLeft, 
  Award,
  Layers,
  Copy,
  CheckCheck
} from 'lucide-react';
import { Smartphone as SmartphoneType } from '../data/smartphones';

interface DeviceSpecsComparisonTableProps {
  phones: SmartphoneType[];
  onSelectPhoneToChange?: (slotIndex: number) => void;
  onRemovePhone?: (slotIndex: number) => void;
}

interface SpecRow {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  getValue: (phone: SmartphoneType) => {
    display: string;
    subtext?: string;
    isAdvantage?: boolean;
    rawNumeric?: number;
  };
}

interface SpecSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  badgeCount?: number;
  rows: SpecRow[];
}

export const DeviceSpecsComparisonTable: React.FC<DeviceSpecsComparisonTableProps> = ({
  phones,
  onSelectPhoneToChange,
  onRemovePhone
}) => {
  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  if (!phones || phones.length < 2) {
    return (
      <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400">
        <ArrowRightLeft className="w-8 h-8 text-cyan-400 mx-auto mb-3 opacity-60" />
        <p className="font-bold text-white text-base">Selecione pelo menos 2 aparelhos</p>
        <p className="text-xs text-slate-400 mt-1">
          A tabela comparativa lado a lado exibirá todas as especificações técnicas em colunas paralelas.
        </p>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper para formatar câmeras completas
  const getCameraDetail = (phone: SmartphoneType) => {
    const rear = phone.specs.camera.rear;
    // Detalhes de sensores múltiplos conhecidos
    let configuration = `${rear} MP`;
    if (phone.model.includes('G35')) {
      configuration = '50 Mp + 8 Mp';
    } else if (phone.model.includes('G62')) {
      configuration = '50 Mp + 8 Mp + 2 Mp';
    } else if (rear >= 108) {
      configuration = `${rear} Mp + 8 Mp + 2 Mp`;
    } else if (rear >= 50 && phone.specs.camera.opticalZoom > 0) {
      configuration = `${rear} Mp + 12 Mp + 10 Mp (${phone.specs.camera.opticalZoom}x Zoom)`;
    } else if (rear >= 50) {
      configuration = `${rear} Mp + 8 Mp Ultra-wide`;
    }
    return configuration;
  };

  // Helper para SIM cards
  const getSimDetail = (phone: SmartphoneType) => {
    const types = phone.specs.features.simTypes || [];
    const hasEsim = types.some(t => t.toLowerCase().includes('esim'));
    const isDual = phone.specs.features.simCards >= 2;

    if (hasEsim && isDual) {
      return { display: 'Dual SIM (Nano-SIM + eSIM)', highlight: true };
    }
    if (isDual) {
      return { display: 'Dual SIM (Nano-SIM)', highlight: false };
    }
    if (phone.specs.features.simCards === 1) {
      return { display: 'Single SIM (Nano-SIM)', highlight: false };
    }
    return { display: types.join(', ') || 'Nano-SIM', highlight: hasEsim };
  };

  // Seções da Ficha Técnica estilo TudoCelular / GSMArena
  const sections: SpecSection[] = [
    {
      id: 'geral',
      title: 'DADOS PRINCIPAIS & SISTEMA',
      icon: <SmartphoneIcon className="w-4 h-4 text-cyan-400" />,
      rows: [
        {
          label: 'Dispositivo / Modelo',
          getValue: (p) => ({
            display: `${p.brand} ${p.model}`,
            subtext: `Lançamento: ${p.releaseYear}`
          })
        },
        {
          label: 'Sistema Operacional',
          sublabel: 'Versão e Interface de Usuário',
          getValue: (p) => {
            const osText = p.osVersion || p.os;
            // Verifica versão mais recente
            const isLatest = phones.every(other => {
              const currentYear = p.releaseYear || 2020;
              const otherYear = other.releaseYear || 2020;
              return currentYear >= otherYear;
            });
            return {
              display: osText,
              isAdvantage: isLatest && (p.osVersion?.includes('14') || p.osVersion?.includes('15') || p.osVersion?.includes('16'))
            };
          }
        },
        {
          label: 'Cartão SIM (Chip)',
          sublabel: 'Formatos suportados e eSIM',
          getValue: (p) => {
            const sim = getSimDetail(p);
            return {
              display: sim.display,
              isAdvantage: sim.highlight
            };
          }
        },
        {
          label: 'Categoria / Linha',
          getValue: (p) => ({
            display: p.categoryTier ? p.categoryTier.toUpperCase() : 'INTERMEDIÁRIO',
            subtext: p.deviceType ? `Tipo: ${p.deviceType}` : 'Smartphone'
          })
        },
        {
          label: 'Ano de Lançamento',
          getValue: (p) => {
            const maxYear = Math.max(...phones.map(x => x.releaseYear || 0));
            return {
              display: `${p.releaseYear}`,
              isAdvantage: p.releaseYear === maxYear && phones.some(x => x.releaseYear < maxYear)
            };
          }
        }
      ]
    },
    {
      id: 'hardware',
      title: 'PROCESSAMENTO & MEMÓRIA',
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
      rows: [
        {
          label: 'Chipset (Processador)',
          sublabel: 'Modelo e Fabricante',
          getValue: (p) => ({
            display: p.specs.processor.chipset,
            subtext: `${p.specs.processor.cpuBrand} • ${p.specs.processor.cores} Núcleos (${p.specs.processor.architecture}-bit)`
          })
        },
        {
          label: 'GPU (Placa Gráfica)',
          getValue: (p) => ({
            display: p.specs.gpu.model,
            subtext: p.specs.gpu.brand
          })
        },
        {
          label: 'Memória RAM',
          getValue: (p) => {
            const maxRam = Math.max(...p.specs.ram);
            const globalMaxRam = Math.max(...phones.flatMap(x => x.specs.ram));
            return {
              display: p.specs.ram.map(r => `${r} GB`).join(' / '),
              isAdvantage: maxRam === globalMaxRam && phones.some(x => Math.max(...x.specs.ram) < globalMaxRam)
            };
          }
        },
        {
          label: 'Armazenamento Interno',
          getValue: (p) => {
            const maxStorage = Math.max(...p.specs.storage.options);
            const globalMaxStorage = Math.max(...phones.flatMap(x => x.specs.storage.options));
            return {
              display: p.specs.storage.options.map(s => `${s} GB`).join(' / '),
              isAdvantage: maxStorage === globalMaxStorage && phones.some(x => Math.max(...x.specs.storage.options) < globalMaxStorage)
            };
          }
        },
        {
          label: 'Slot de Expansão (MicroSD)',
          getValue: (p) => ({
            display: p.specs.storage.expandable ? 'Sim (Expansível via MicroSD)' : 'Não possui slot MicroSD',
            isAdvantage: p.specs.storage.expandable
          })
        },
        {
          label: 'Benchmark AnTuTu',
          sublabel: 'Pontuação de Performance Geral',
          getValue: (p) => {
            const maxScore = Math.max(...phones.map(x => x.specs.performance.antutu || 0));
            const isWinner = p.specs.performance.antutu === maxScore && phones.some(x => (x.specs.performance.antutu || 0) < maxScore);
            return {
              display: p.specs.performance.antutu ? `~${p.specs.performance.antutu.toLocaleString('pt-BR')} pontos` : 'N/D',
              isAdvantage: isWinner
            };
          }
        },
        {
          label: 'Geekbench (Single / Multi)',
          getValue: (p) => ({
            display: p.specs.performance.geekbench || 'N/D'
          })
        }
      ]
    },
    {
      id: 'tela',
      title: 'TELA & DISPLAY',
      icon: <Tv className="w-4 h-4 text-emerald-400" />,
      rows: [
        {
          label: 'Tamanho da Tela',
          getValue: (p) => {
            const maxSize = Math.max(...phones.map(x => x.specs.screen.size || 0));
            return {
              display: `${p.specs.screen.size} polegadas`,
              isAdvantage: p.specs.screen.size === maxSize && phones.some(x => (x.specs.screen.size || 0) < maxSize)
            };
          }
        },
        {
          label: 'Resolução',
          getValue: (p) => ({
            display: p.specs.screen.resolution,
            subtext: p.specs.screen.resolution.includes('2400') ? 'Full HD+' : 'HD / Outro'
          })
        },
        {
          label: 'Tecnologia do Painel',
          getValue: (p) => ({
            display: p.specs.screen.type,
            isAdvantage: p.specs.screen.type.toLowerCase().includes('oled') || p.specs.screen.type.toLowerCase().includes('amoled')
          })
        },
        {
          label: 'Taxa de Atualização',
          getValue: (p) => {
            const maxHz = Math.max(...phones.map(x => x.specs.screen.refreshRate || 60));
            return {
              display: `${p.specs.screen.refreshRate} Hz`,
              isAdvantage: p.specs.screen.refreshRate === maxHz && maxHz > 60
            };
          }
        },
        {
          label: 'Formato Dobrável',
          getValue: (p) => ({
            display: p.specs.screen.isFoldable ? 'Sim (Tela Flexível / Fold)' : 'Convencional (Plana)'
          })
        }
      ]
    },
    {
      id: 'camera',
      title: 'CÂMERAS & VÍDEO',
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      rows: [
        {
          label: 'Câmera Traseira (Configuração)',
          sublabel: 'Sensores Traseiros',
          getValue: (p) => {
            const cameraText = getCameraDetail(p);
            return {
              display: cameraText,
              subtext: `Sensor Principal: ${p.specs.camera.rear} MP`
            };
          }
        },
        {
          label: 'Câmera Frontal (Selfie)',
          getValue: (p) => {
            const maxFront = Math.max(...phones.map(x => x.specs.camera.front || 0));
            return {
              display: `${p.specs.camera.front} MP`,
              isAdvantage: p.specs.camera.front === maxFront && phones.some(x => (x.specs.camera.front || 0) < maxFront)
            };
          }
        },
        {
          label: 'Gravação de Vídeo',
          getValue: (p) => {
            const res = p.specs.camera.recordingResolution;
            return {
              display: `${res} (${res === '4K' ? '2160p' : res === '8K' ? '4320p' : '1080p'})`,
              isAdvantage: res === '4K' || res === '8K'
            };
          }
        },
        {
          label: 'Estabilização de Imagem',
          getValue: (p) => ({
            display: p.specs.camera.stabilization ? 'Sim (Óptica / Digital OIS)' : 'Digital Padrão (EIS)',
            isAdvantage: p.specs.camera.stabilization
          })
        },
        {
          label: 'Zoom Óptico Dedicado',
          getValue: (p) => ({
            display: p.specs.camera.opticalZoom > 0 ? `${p.specs.camera.opticalZoom}x Óptico` : 'Apenas Zoom Digital',
            isAdvantage: p.specs.camera.opticalZoom > 0
          })
        },
        {
          label: 'Câmera Lenta (Slow Motion)',
          getValue: (p) => ({
            display: p.specs.camera.slowMotion ? 'Suporta Câmera Lenta' : 'Não suporta'
          })
        }
      ]
    },
    {
      id: 'bateria',
      title: 'BATERIA & CARREGAMENTO',
      icon: <Battery className="w-4 h-4 text-emerald-400" />,
      rows: [
        {
          label: 'Capacidade da Bateria',
          getValue: (p) => {
            const maxCap = Math.max(...phones.map(x => x.specs.battery.capacity || 0));
            return {
              display: `${p.specs.battery.capacity} mAh`,
              isAdvantage: p.specs.battery.capacity === maxCap && phones.some(x => (x.specs.battery.capacity || 0) < maxCap)
            };
          }
        },
        {
          label: 'Conector & Carregamento',
          getValue: (p) => ({
            display: p.specs.battery.chargingTypes.join(', ') || 'USB tipo C',
            isAdvantage: p.specs.battery.chargingTypes.includes('Turbo') || p.specs.battery.chargingTypes.includes('Sem fio')
          })
        }
      ]
    },
    {
      id: 'recursos',
      title: 'CONECTIVIDADE & RECURSOS',
      icon: <Wifi className="w-4 h-4 text-sky-400" />,
      rows: [
        {
          label: 'Conectividade Móvel',
          getValue: (p) => ({
            display: p.specs.features.network,
            isAdvantage: p.specs.features.network === '5G'
          })
        },
        {
          label: 'NFC (Pagamento por Aproximação)',
          getValue: (p) => ({
            display: p.specs.features.hasNfc ? 'Possui NFC' : 'Sem NFC',
            isAdvantage: p.specs.features.hasNfc
          })
        },
        {
          label: 'Leitor Biométrico (Impressão Digital)',
          getValue: (p) => ({
            display: p.specs.features.hasFingerprint ? 'Sim (Lateral / Na tela)' : 'Não possui',
            isAdvantage: p.specs.features.hasFingerprint
          })
        },
        {
          label: 'GPS Integrado',
          getValue: (p) => ({
            display: p.specs.features.hasGps ? 'GPS, GLONASS, Galileo' : 'Não'
          })
        },
        {
          label: 'Bússola & USB OTG',
          getValue: (p) => ({
            display: `Bússola: ${p.specs.features.hasCompass ? 'Sim' : 'Não'} • OTG: ${p.specs.features.hasUsbOtg ? 'Sim' : 'Não'}`
          })
        },
        {
          label: 'TV Digital Integrada',
          getValue: (p) => ({
            display: p.specs.features.hasDigitalTv ? 'Possui TV Digital HD' : 'Não possui'
          })
        }
      ]
    }
  ];

  // Filtro de apenas diferenças
  const filterRows = (rows: SpecRow[]) => {
    if (!onlyDifferences) return rows;
    return rows.filter(row => {
      const values = phones.map(p => row.getValue(p).display);
      // Verifica se todos os valores são iguais
      const allSame = values.every(v => v === values[0]);
      return !allSame;
    });
  };

  const handleCopyTable = () => {
    let text = `TABELA COMPARATIVA DE ESPECIFICAÇÕES:\n`;
    text += `Dispositivos: ${phones.map(p => `${p.brand} ${p.model}`).join(' vs ')}\n\n`;

    sections.forEach(sec => {
      text += `=== ${sec.title} ===\n`;
      sec.rows.forEach(r => {
        text += `${r.label}:\n`;
        phones.forEach(p => {
          const val = r.getValue(p);
          text += `  • ${p.brand} ${p.model}: ${val.display} ${val.subtext ? `(${val.subtext})` : ''}\n`;
        });
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Controles da Tabela */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white">Tabela Comparativa Lado a Lado</span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            {phones.length} Aparelhos em Confronto
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão Apenas Diferenças */}
          <button
            type="button"
            onClick={() => setOnlyDifferences(!onlyDifferences)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyDifferences
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <span>{onlyDifferences ? '✓ Apenas Diferenças' : 'Mostrar Apenas Diferenças'}</span>
          </button>

          {/* Botão Copiar Tabela */}
          <button
            type="button"
            onClick={handleCopyTable}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            title="Copiar texto da tabela comparativa"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-bold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Ficha</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Container Principal da Tabela */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[620px]">
          {/* Cabeçalho com os Aparelhos Comparados */}
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
              <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider w-1/4 min-w-[170px] bg-slate-900/95 backdrop-blur-sm border-r border-slate-800/80">
                Especificação
              </th>
              {phones.map((phone, idx) => (
                <th
                  key={phone.id || idx}
                  className={`p-4 text-left ${
                    phones.length === 2 ? 'w-[37.5%]' : 'w-1/3'
                  } bg-slate-900/95 backdrop-blur-sm border-r last:border-r-0 border-slate-800/80`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase text-cyan-400 tracking-wider">
                        {phone.brand}
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                        {phone.model}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>{phone.releaseYear}</span>
                        <span>•</span>
                        <span className="truncate max-w-[140px]">{phone.os}</span>
                      </div>
                    </div>

                    {onSelectPhoneToChange && (
                      <button
                        type="button"
                        onClick={() => onSelectPhoneToChange(idx)}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-[10px] font-bold text-cyan-300 transition-all cursor-pointer shrink-0"
                        title="Trocar este smartphone"
                      >
                        Trocar
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo com as Seções e Linhas de Especificações */}
          <tbody className="divide-y divide-slate-800/60">
            {sections.map((section) => {
              const visibleRows = filterRows(section.rows);
              if (visibleRows.length === 0) return null;

              const isCollapsed = collapsedSections[section.id];

              return (
                <React.Fragment key={section.id}>
                  {/* Cabeçalho da Seção */}
                  <tr className="bg-slate-900/90 border-t-2 border-slate-800">
                    <td
                      colSpan={phones.length + 1}
                      onClick={() => toggleSection(section.id)}
                      className="p-3 text-xs font-black text-cyan-300 tracking-wider uppercase cursor-pointer hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {section.icon}
                          <span>{section.title}</span>
                          <span className="text-[10px] text-slate-400 normal-case font-normal">
                            ({visibleRows.length} itens)
                          </span>
                        </div>
                        <div className="p-1 text-slate-400 hover:text-white">
                          {isCollapsed ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Linhas da Seção */}
                  {!isCollapsed &&
                    visibleRows.map((row, rIdx) => {
                      return (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-900/40 transition-colors group"
                        >
                          {/* Nome da Especificação */}
                          <td className="p-3.5 text-xs text-slate-300 font-bold border-r border-slate-800/80 bg-slate-950/70 group-hover:bg-slate-900/60">
                            <div>{row.label}</div>
                            {row.sublabel && (
                              <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                                {row.sublabel}
                              </div>
                            )}
                          </td>

                          {/* Valores para cada Aparelho */}
                          {phones.map((phone, pIdx) => {
                            const val = row.getValue(phone);
                            return (
                              <td
                                key={phone.id || pIdx}
                                className={`p-3.5 text-xs border-r last:border-r-0 border-slate-800/80 align-top ${
                                  val.isAdvantage
                                    ? 'bg-emerald-950/20 text-emerald-200'
                                    : 'text-slate-200'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-1.5">
                                  <div>
                                    <div className={`font-extrabold ${val.isAdvantage ? 'text-emerald-300' : 'text-white'}`}>
                                      {val.display}
                                    </div>
                                    {val.subtext && (
                                      <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                                        {val.subtext}
                                      </div>
                                    )}
                                  </div>

                                  {val.isAdvantage && (
                                    <span
                                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0"
                                      title="Vantagem técnica detectada"
                                    >
                                      <Check className="w-3 h-3" />
                                      <span>Destaque</span>
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legenda de Ajuda */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span>Verde / Destaque: Vantagem de especificação identificada</span>
          </div>
        </div>
        <div>
          Formato e cruzamento técnico 100% em tempo real (Sem latência)
        </div>
      </div>
    </div>
  );
};
