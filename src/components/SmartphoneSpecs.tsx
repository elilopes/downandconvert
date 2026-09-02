import React, { useState, useMemo } from 'react';
import { Smartphone, Cpu, Camera, Battery, Monitor, HardDrive, Search, Filter, Check, MapPin, Wifi, Fingerprint, Maximize2, RotateCcw, Share2, CheckCheck, Layers, MessageSquare, MessageSquareShare, ChevronUp, ChevronDown, Menu, Gamepad2, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockedSmartphones, Smartphone as SmartphoneType } from '../data/smartphones';

interface GameCompatibility {
  title: string;
  genre: string;
  graphics: string;
  fps: string;
  badge: string;
  badgeColor: string;
  note: string;
  isSupported: boolean;
  unsupportedReason?: string;
}

const getCompatibleGamesForPhone = (phone: SmartphoneType): GameCompatibility[] => {
  const antutu = phone.specs.performance?.antutu || 1000000;
  const chipset = phone.specs.processor.chipset.toLowerCase();
  const ramOptions = Array.isArray(phone.specs.ram) ? phone.specs.ram : [phone.specs.ram];
  const maxRam = Math.max(...ramOptions);

  // We want to evaluate these heavy games for all phones:
  // - Call of Duty: Warzone Mobile
  // - Red Dead Redemption
  // - XCOM 2 Collection
  // - Genshin Impact
  // - Wuthering Waves
  // - Resident Evil Village

  const games: GameCompatibility[] = [];

  // 1. Red Dead Redemption
  if (antutu >= 1600000 || chipset.includes('elite') || chipset.includes('gen 3') || chipset.includes('a17') || chipset.includes('a18') || chipset.includes('gen 2')) {
    games.push({
      title: "Red Dead Redemption (Port Oficial)",
      genre: "Ação / Mundo Aberto AAA",
      graphics: antutu >= 1800000 ? "Máximo / Configurações de Console" : "Médio / 30 FPS",
      fps: antutu >= 1800000 ? "60 FPS Estáveis" : "30 FPS Estáveis",
      badge: antutu >= 1800000 ? "Desempenho de Console" : "Configuração Mínima / Moderada",
      badgeColor: antutu >= 1800000 ? "bg-purple-500/10 text-purple-400 border-purple-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30",
      note: antutu >= 1800000 ? "Executa com maestria e taxas de quadros elevadas." : "Executável com ajustes gráficos reduzidos e limitações de taxa de quadros.",
      isSupported: true
    });
  } else {
    games.push({
      title: "Red Dead Redemption (Port Oficial)",
      genre: "Ação / Mundo Aberto AAA",
      graphics: "Incompatível / Não Recomendado",
      fps: "< 20 FPS",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "Hardware insuficiente para rodar o port AAA com fluidez aceitável.",
      isSupported: false,
      unsupportedReason: "Requer GPU e processador mais potentes."
    });
  }

  // 2. Call of Duty: Warzone Mobile
  if (antutu >= 1100000 || maxRam >= 8) {
    games.push({
      title: "Call of Duty: Warzone Mobile",
      genre: "Battle Royale Pesado",
      graphics: antutu >= 1500000 ? "Ultra / Texturas em Alta Resolução" : "Baixo / Configuração Mínima",
      fps: antutu >= 1500000 ? "60 FPS (Fluido)" : "30 - 45 FPS (Instável)",
      badge: antutu >= 1500000 ? "Qualidade Máxima" : "Configuração Mínima Apenas",
      badgeColor: antutu >= 1500000 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30",
      note: antutu >= 1500000 ? "Carregamento instantâneo e alta taxa de quadros." : "Requer gráficos no mínimo e pode apresentar quedas de quadros durante confrontos.",
      isSupported: true
    });
  } else {
    games.push({
      title: "Call of Duty: Warzone Mobile",
      genre: "Battle Royale Pesado",
      graphics: "Incompatível",
      fps: "< 20 FPS",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "O jogo fecha ou apresenta travamentos severos devido a limitações de RAM e chipset.",
      isSupported: false,
      unsupportedReason: "Exige ao menos 8GB de RAM e processador intermediário-alto."
    });
  }

  // 3. XCOM 2 Collection
  if (antutu >= 900000 || maxRam >= 6) {
    games.push({
      title: "XCOM 2 Collection",
      genre: "Estratégia Tática AAA",
      graphics: antutu >= 1400000 ? "Gráficos Máximos" : "Gráficos Mínimos / Desempenho",
      fps: antutu >= 1400000 ? "60 FPS" : "30 FPS",
      badge: antutu >= 1400000 ? "Fluidez Perfeita" : "Configuração Mínima",
      badgeColor: antutu >= 1400000 ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30",
      note: antutu >= 1400000 ? "Transições de turnos extremamente rápidas." : "Funciona na configuração gráfica mínima, com tempos de carregamento maiores.",
      isSupported: true
    });
  } else {
    games.push({
      title: "XCOM 2 Collection",
      genre: "Estratégia Tática AAA",
      graphics: "Incompatível",
      fps: "< 15 FPS",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "Incompatível com a arquitetura ou memória RAM limitada do dispositivo.",
      isSupported: false,
      unsupportedReason: "Exige suporte avançado a OpenGL/Vulkan e mais RAM."
    });
  }

  // 4. Genshin Impact
  if (antutu >= 750000) {
    games.push({
      title: "Genshin Impact",
      genre: "RPG de Mundo Aberto",
      graphics: antutu >= 1500000 ? "Máximo / 60 FPS" : "Médio / Baixo (60 ou 30 FPS)",
      fps: antutu >= 1500000 ? "60 FPS Estáveis" : "30 - 45 FPS",
      badge: antutu >= 1500000 ? "Máxima Performance" : "Configuração Mínima / Moderada",
      badgeColor: antutu >= 1500000 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30",
      note: antutu >= 1500000 ? "Rodando no talo com todas as opções ativadas." : "Necessário reduzir a qualidade gráfica para obter estabilidade.",
      isSupported: true
    });
  } else {
    games.push({
      title: "Genshin Impact",
      genre: "RPG de Mundo Aberto",
      graphics: "Incompatível / Travamentos",
      fps: "< 20 FPS",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "Aparelho não possui capacidade de processamento gráfico para renderizar o mundo aberto.",
      isSupported: false,
      unsupportedReason: "Processador gráfico muito antigo ou de entrada."
    });
  }

  // 5. Wuthering Waves
  if (antutu >= 900000) {
    games.push({
      title: "Wuthering Waves",
      genre: "Action RPG de Mundo Aberto",
      graphics: antutu >= 1500000 ? "Alto / 60 FPS" : "Mínimo / 30 FPS",
      fps: antutu >= 1500000 ? "60 FPS" : "30 FPS (Quedas ocasionais)",
      badge: antutu >= 1500000 ? "Excelente" : "Configuração Mínima",
      badgeColor: antutu >= 1500000 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30",
      note: antutu >= 1500000 ? "Combates fluidos e responsivos." : "Exige gráficos no mínimo para evitar engasgos em lutas com muitos efeitos.",
      isSupported: true
    });
  } else {
    games.push({
      title: "Wuthering Waves",
      genre: "Action RPG de Mundo Aberto",
      graphics: "Incompatível",
      fps: "< 15 FPS",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "Jogo muito pesado para o chipset deste modelo.",
      isSupported: false,
      unsupportedReason: "Falta de suporte a instruções avançadas de GPU."
    });
  }

  // 6. Resident Evil Village / 4 Remake
  if (antutu >= 1700000 || chipset.includes('a17') || chipset.includes('a18') || chipset.includes('elite')) {
    games.push({
      title: "Resident Evil Village / 4 Remake",
      genre: "Survival Horror AAA",
      graphics: "Configurações Altas / Médias",
      fps: "60 FPS",
      badge: "Port AAA Nativo",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      note: "Compatível com ray tracing e renderização de alta fidelidade.",
      isSupported: true
    });
  } else {
    games.push({
      title: "Resident Evil Village / 4 Remake",
      genre: "Survival Horror AAA",
      graphics: "Incompatível / Não Disponível",
      fps: "Não Roda",
      badge: "Não Suportado com Fluidez",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      note: "Requer chips topo de linha específicos com aceleração por hardware dedicada.",
      isSupported: false,
      unsupportedReason: "Exige chipsets da linha Apple A Pro ou Snapdragon de última geração."
    });
  }

  return games;
};

const NETWORK_STEPS = ['any', '3G', '4G', '5G'];
const STORAGE_STEPS = [0, 32, 64, 128, 256, 512, 1024];
const SELFIE_STEPS = [0, 8, 12, 16, 32, 50, 60];
const SCREEN_STEPS = [0, 3, 4, 5, 6, 7, 8];
  const BATTERY_STEPS = [0, 1000, 2000, 3000, 4000, 5000, 6000];
const RECORDING_RES_STEPS = ['any', 'HD', 'FHD', '2K', '4K', '8K'] as const;
const RES_RANK_MAP: Record<string, number> = { 'HD': 1, 'FHD': 2, '2K': 3, '4K': 4, '8K': 5 };

export const SmartphoneSpecs: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);
  const [isFiltersMinimized, setIsFiltersMinimized] = useState<boolean>(false);
  const [selectedPhoneForGames, setSelectedPhoneForGames] = useState<SmartphoneType | null>(null);
  
  // Basic Filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);
  const [selectedCpuBrands, setSelectedCpuBrands] = useState<string[]>([]);
  const [selectedGpuBrands, setSelectedGpuBrands] = useState<string[]>([]);
  
  // Specs Filters
  const [minRam, setMinRam] = useState<number>(0);
  const [storageStepIndex, setStorageStepIndex] = useState<number>(0);
  const [minCores, setMinCores] = useState<number>(0);
  const [minScreenSize, setMinScreenSize] = useState<number>(0);
  const [selfieStepIndex, setSelfieStepIndex] = useState<number>(0);
  const [recResIndex, setRecResIndex] = useState<number>(0); // 0: any, 1: HD, 2: FHD, 3: 2K, 4: 4K, 5: 8K
  
  // Select Filters
  const [architecture, setArchitecture] = useState<'any' | '32' | '64'>('any');
  const [simCards, setSimCards] = useState<'any' | '1' | '2' | '3'>('any');
  const [networkIndex, setNetworkIndex] = useState<number>(0);
  
  // Boolean Filters
  const [digitalTv, setDigitalTv] = useState<boolean>(false);
  const [physicalKeyboard, setPhysicalKeyboard] = useState<boolean>(false);
  const [foldable, setFoldable] = useState<boolean>(false);
  const [expandableMemory, setExpandableMemory] = useState<boolean>(false);
  const [opticalZoom, setOpticalZoom] = useState<boolean>(false);
  const [stabilization, setStabilization] = useState<boolean>(false);
  const [faceDetection, setFaceDetection] = useState<boolean>(false);
  const [fingerprint, setFingerprint] = useState<boolean>(false);
  const [hasGps, setHasGps] = useState<boolean>(false);
  const [supportsWhatsApp, setSupportsWhatsApp] = useState<boolean>(false);
  const [minBattery, setMinBattery] = useState<number>(0);
  const [selectedSimTypes, setSelectedSimTypes] = useState<string[]>([]);
  const [selectedChargingTypes, setSelectedChargingTypes] = useState<string[]>([]);
  const [hasCompass, setHasCompass] = useState<boolean>(false);
  const [hasUsbOtg, setHasUsbOtg] = useState<boolean>(false);
  const [hasNfc, setHasNfc] = useState<boolean>(false);
  const [slowMotion, setSlowMotion] = useState<boolean>(false);

  const allBrands = useMemo(() => Array.from(new Set(mockedSmartphones.map(s => s.brand))).sort(), []);
  const allOS = useMemo(() => Array.from(new Set(mockedSmartphones.map(s => s.os))).sort(), []);
  const allSimTypes = useMemo(() => ['Padrão (1FF)', 'Mini-SIM (2FF)', 'Micro-SIM (3FF)', 'Nano-SIM (4FF)', 'eSIM'], []);
  const allChargingTypes = useMemo(() => ['USB/V8', 'USB tipo C', 'Sem fio', '30 pinos', 'Lightning', 'Turbo'], []);
  const allCpuBrands = useMemo(() => Array.from(new Set(mockedSmartphones.map(s => s.specs.processor.cpuBrand).filter(Boolean))).sort(), []);
  const allGpuBrands = useMemo(() => Array.from(new Set(mockedSmartphones.map(s => s.specs.gpu.brand).filter(Boolean))).sort(), []);

  const minStorage = STORAGE_STEPS[storageStepIndex] || 0;
  const minFrontCamera = SELFIE_STEPS[selfieStepIndex] || 0;

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleOS = (os: string) => {
    setSelectedOS(prev => prev.includes(os) ? prev.filter(o => o !== os) : [...prev, os]);
  };

  const toggleCpuBrand = (cpu: string) => {
    setSelectedCpuBrands(prev => prev.includes(cpu) ? prev.filter(c => c !== cpu) : [...prev, cpu]);
  };

  const toggleGpuBrand = (gpu: string) => {
    setSelectedGpuBrands(prev => prev.includes(gpu) ? prev.filter(g => g !== gpu) : [...prev, gpu]);
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedOS([]);
    setSelectedCpuBrands([]);
    setSelectedGpuBrands([]);
    setMinRam(0);
    setStorageStepIndex(0);
    setMinCores(0);
    setMinScreenSize(0);
    setSelfieStepIndex(0);
    setRecResIndex(0);
    setArchitecture('any');
    setSimCards('any');
    setNetworkIndex(0);
    setDigitalTv(false);
    setPhysicalKeyboard(false);
    setFoldable(false);
    setExpandableMemory(false);
    setOpticalZoom(false);
    setStabilization(false);
    setFaceDetection(false);
    setFingerprint(false);
    setHasGps(false);
    setSupportsWhatsApp(false);
    setMinBattery(0);
    setSelectedSimTypes([]);
    setSelectedChargingTypes([]);
    setHasCompass(false);
    setHasUsbOtg(false);
    setHasNfc(false);
    setSlowMotion(false);
    setSearchTerm('');
  };

  const handleCopyLink = () => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('tab', 'smartphones');
      navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSharePhone = async (phone: typeof mockedSmartphones[0]) => {
    const p = phone.specs;
    const ramText = p.ram.join('/') + 'GB';
    const romText = Math.max(...p.storage.options) + 'GB' + (p.storage.expandable ? ' (Expansível)' : '');
    const text = `📱 *${phone.brand} ${phone.model}* (${phone.releaseYear} • ${phone.os})\n\n` +
      `• 📺 Tela: ${p.screen.size}" ${p.screen.type} (${p.screen.resolution} • ${p.screen.refreshRate}Hz)\n` +
      `• ⚙️ Processador: ${p.processor.chipset} (${p.processor.cpuBrand} ${p.processor.cores} cores)\n` +
      `• 🎮 GPU: ${p.gpu.brand} ${p.gpu.model}\n` +
      `• 💾 Memória: RAM ${ramText} | ROM ${romText}\n` +
      `• 📸 Câmeras: ${p.camera.rear}MP Traseira • ${p.camera.front}MP Frontal (${p.camera.recordingResolution})\n` +
      `• 🔋 Bateria: ${p.battery.capacity} mAh\n` +
      `• 📶 Rede: ${p.features.network} • ${p.features.simCards} SIM${p.features.hasNfc ? ' • NFC' : ''}${p.features.hasGps ? ' • GPS' : ''}\n` +
      `• 💬 WhatsApp: ${p.features.supportsWhatsApp ? 'Compatível ✅' : 'Sem suporte ❌'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${phone.brand} ${phone.model} - Ficha Técnica`,
          text: text
        });
        setCopiedPhoneId(phone.id);
        setTimeout(() => setCopiedPhoneId(null), 2500);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // fallback to clipboard
        }
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhoneId(phone.id);
      setTimeout(() => setCopiedPhoneId(null), 2500);
    } catch (err) {
      setCopiedPhoneId(phone.id);
      setTimeout(() => setCopiedPhoneId(null), 2500);
    }
  };

  const handleShareWhatsAppPhone = (phone: typeof mockedSmartphones[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const p = phone.specs;
    const text = `📱 *${phone.brand} ${phone.model}* (${phone.releaseYear})\n• Tela: ${p.screen.size}" ${p.screen.type} ${p.screen.refreshRate}Hz\n• CPU: ${p.processor.chipset}\n• RAM: ${p.ram.join('/')}GB | Bateria: ${p.battery.capacity}mAh\n• Câmeras: ${p.camera.rear}MP / ${p.camera.front}MP`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (selectedOS.length > 0) count += selectedOS.length;
    if (selectedCpuBrands.length > 0) count += selectedCpuBrands.length;
    if (selectedGpuBrands.length > 0) count += selectedGpuBrands.length;
    if (minRam > 0) count++;
    if (minStorage > 0) count++;
    if (minCores > 0) count++;
    if (minScreenSize > 0) count++;
    if (minFrontCamera > 0) count++;
    if (recResIndex > 0) count++;
    if (architecture !== 'any') count++;
    if (simCards !== 'any') count++;
    if (networkIndex > 0) count++;
    if (digitalTv) count++;
    if (physicalKeyboard) count++;
    if (foldable) count++;
    if (expandableMemory) count++;
    if (opticalZoom) count++;
    if (stabilization) count++;
    if (faceDetection) count++;
    if (fingerprint) count++;
    if (hasGps) count++;
    if (supportsWhatsApp) count++;
    if (minBattery > 0) count++;
    count += selectedSimTypes.length;
    count += selectedChargingTypes.length;
    if (hasCompass) count++;
    if (hasUsbOtg) count++;
    if (hasNfc) count++;
    if (slowMotion) count++;
    if (searchTerm.trim().length > 0) count++;
    return count;
  }, [selectedBrands, selectedOS, selectedCpuBrands, selectedGpuBrands, minRam, minStorage, minCores, minScreenSize, minFrontCamera, recResIndex, architecture, simCards, networkIndex, digitalTv, physicalKeyboard, foldable, expandableMemory, opticalZoom, stabilization, faceDetection, fingerprint, hasGps, supportsWhatsApp, minBattery, selectedSimTypes, selectedChargingTypes, hasCompass, hasUsbOtg, hasNfc, slowMotion, searchTerm]);

  const filteredPhones = useMemo(() => {
    return mockedSmartphones.filter(phone => {
      const p = phone.specs;
      const matchesSearch = phone.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            phone.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(phone.brand);
      const matchesOS = selectedOS.length === 0 || selectedOS.includes(phone.os);
      const matchesCpuBrand = selectedCpuBrands.length === 0 || selectedCpuBrands.includes(p.processor.cpuBrand);
      const matchesGpuBrand = selectedGpuBrands.length === 0 || selectedGpuBrands.includes(p.gpu.brand);
      const matchesRam = minRam === 0 || Math.max(...p.ram) === minRam;
      const matchesStorage = minStorage === 0 || Math.max(...p.storage.options) === minStorage;
      const matchesMinCores = minCores === 0 || p.processor.cores === minCores;
      const matchesArchitecture = architecture === 'any' || String(p.processor.architecture) === architecture;
      const matchesSimCards = simCards === 'any' || String(p.features.simCards) === simCards;
      const matchesDigitalTv = !digitalTv || p.features.hasDigitalTv;
      const matchesPhysicalKeyboard = !physicalKeyboard || p.features.hasPhysicalKeyboard;
      const matchesFoldable = !foldable || p.screen.isFoldable;
      const matchesNetwork = networkIndex === 0 || p.features.network === NETWORK_STEPS[networkIndex];
      const matchesExpandable = !expandableMemory || p.storage.expandable;
      const matchesMinScreen = minScreenSize === 0 || Math.floor(p.screen.size) === minScreenSize;
      const matchesMinFrontCam = minFrontCamera === 0 || p.camera.front === minFrontCamera;
      const matchesBattery = minBattery === 0 || p.battery.capacity === minBattery;
      const matchesSimTypes = selectedSimTypes.length === 0 || selectedSimTypes.every(st => p.features.simTypes.includes(st));
      const matchesChargingTypes = selectedChargingTypes.length === 0 || selectedChargingTypes.every(ct => p.battery.chargingTypes.includes(ct));
      const matchesCompass = !hasCompass || p.features.hasCompass;
      const matchesUsbOtg = !hasUsbOtg || p.features.hasUsbOtg;
      const matchesNfc = !hasNfc || p.features.hasNfc;
      const matchesSlowMotion = !slowMotion || p.camera.slowMotion;
      const matchesOpticalZoom = !opticalZoom || p.camera.opticalZoom > 0;
      const matchesStabilization = !stabilization || p.camera.stabilization;
      const matchesFaceDetection = !faceDetection || p.camera.faceDetection;
      const matchesFingerprint = !fingerprint || p.features.hasFingerprint;
      const matchesWhatsApp = !supportsWhatsApp || p.features.supportsWhatsApp;
      
      // Resolução de gravação em slider hierárquico
      const phoneResRank = RES_RANK_MAP[p.camera.recordingResolution] || 0;
      const matchesRecRes = recResIndex === 0 || phoneResRank === recResIndex;

      const matchesGps = !hasGps || p.features.hasGps;

      return matchesSearch && matchesBrand && matchesOS && matchesCpuBrand && matchesGpuBrand &&
             matchesRam && matchesStorage && matchesMinCores && matchesArchitecture &&
             matchesSimCards && matchesDigitalTv && matchesPhysicalKeyboard && matchesFoldable &&
             matchesNetwork && matchesExpandable && matchesMinScreen && matchesMinFrontCam &&
             matchesOpticalZoom && matchesStabilization && matchesFaceDetection && matchesFingerprint &&
             matchesRecRes && matchesGps && matchesWhatsApp && matchesBattery && matchesSimTypes && matchesChargingTypes && matchesCompass && matchesUsbOtg && matchesNfc && matchesSlowMotion;
    });
  }, [searchTerm, selectedBrands, selectedOS, selectedCpuBrands, selectedGpuBrands, minRam, minStorage, minCores, architecture, simCards, digitalTv, physicalKeyboard, foldable, networkIndex, expandableMemory, minScreenSize, minFrontCamera, opticalZoom, stabilization, faceDetection, fingerprint, recResIndex, hasGps, supportsWhatsApp, minBattery, selectedSimTypes, selectedChargingTypes, hasCompass, hasUsbOtg, hasNfc, slowMotion]);

  const CheckboxFilter: React.FC<{ label: string, checked: boolean, onChange: (c: boolean) => void, textSize?: string }> = ({ label, checked, onChange, textSize = "text-sm" }) => (
    <label className="flex items-center gap-2 cursor-pointer group select-none">
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${checked ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-slate-400'}`}>
        {checked && <Check className="w-3 h-3 text-slate-950" />}
      </div>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={`${textSize} text-slate-300 group-hover:text-white transition-colors`}>{label}</span>
    </label>
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto py-8 px-4 flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      
      {/* Sidebar Filters */}
      <aside className={`w-full ${isFiltersMinimized ? 'lg:w-20' : 'lg:w-80'} shrink-0 flex flex-col gap-6 transition-all duration-300`}>
        <div className={`bg-slate-900/60 border border-slate-800 rounded-2xl ${isFiltersMinimized ? 'p-3 lg:p-3 lg:h-auto overflow-hidden' : 'p-5 lg:h-[84vh] overflow-y-auto custom-scrollbar'} shadow-lg transition-all`}>
          <div className={`flex ${isFiltersMinimized ? 'lg:flex-col lg:items-center' : 'items-center justify-between'} gap-2 mb-3 lg:mb-5 sticky top-0 bg-slate-900/95 py-2.5 z-10 backdrop-blur-md border-b border-slate-800`}>
            <div 
              className={`flex items-center gap-2 cursor-pointer select-none group ${isFiltersMinimized ? 'lg:justify-center lg:w-full' : ''}`} 
              onClick={() => setIsFiltersMinimized(prev => !prev)}
              title={isFiltersMinimized ? "Expandir Filtros & Categorias" : "Minimizar Filtros & Categorias"}
            >
              <Menu className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0" />
              {!isFiltersMinimized && (
                <h2 className="font-bold text-white text-base sm:text-lg group-hover:text-cyan-200 transition-colors">{t('smartphones.filters')}</h2>
              )}
              {activeFiltersCount > 0 && (
                <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className={`flex items-center gap-2 ${isFiltersMinimized ? 'lg:flex-col lg:w-full' : ''}`}>
              {!isFiltersMinimized && activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  title="Limpar todos os filtros"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Limpar ({activeFiltersCount})</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsFiltersMinimized(prev => !prev)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer w-full flex items-center justify-center"
                title={isFiltersMinimized ? "Expandir Filtros & Categorias" : "Minimizar Filtros & Categorias"}
              >
                {isFiltersMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {!isFiltersMinimized && (
            <div className="space-y-6 animate-in fade-in duration-200">
            {/* General */}
            <div>
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Geral</h3>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.brand')}</span>
                  <div className="flex flex-col gap-1.5">
                    {allBrands.map(brand => (
                      <CheckboxFilter key={brand} label={brand} checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} textSize="text-xs" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.os')}</span>
                  {allOS.map(os => (
                    <CheckboxFilter key={os} label={os} checked={selectedOS.includes(os)} onChange={() => toggleOS(os)} />
                  ))}
                </div>

                
                {/* Battery Size Slider */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minBattery')}</span>
                    <span className="text-cyan-400 font-bold">{minBattery === 0 ? t('smartphones.any') : `${minBattery}mAh`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={BATTERY_STEPS.length - 1}
                    step="1"
                    value={BATTERY_STEPS.indexOf(minBattery) !== -1 ? BATTERY_STEPS.indexOf(minBattery) : 0}
                    onChange={(e) => setMinBattery(BATTERY_STEPS[Number(e.target.value)])}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1 px-0.5 select-none">
                    {BATTERY_STEPS.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMinBattery(val)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${minBattery === val ? 'text-cyan-400 font-extrabold scale-110' : ''}`}
                      >
                        {val === 0 ? t('smartphones.any') : `${val/1000}k`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rede / Network Slider */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.network')}</span>
                    <span className="text-cyan-400 font-bold">
                      {networkIndex === 0 ? t('smartphones.any') : NETWORK_STEPS[networkIndex]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="1"
                    value={networkIndex}
                    onChange={(e) => setNetworkIndex(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1 px-0.5 select-none">
                    {NETWORK_STEPS.map((netOpt, idx) => (
                      <button
                        key={netOpt}
                        type="button"
                        onClick={() => setNetworkIndex(idx)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${networkIndex === idx ? 'text-cyan-400 font-extrabold scale-110' : ''}`}
                      >
                        {netOpt === 'any' ? t('smartphones.any') : netOpt}
                      </button>
                    ))}
                  </div>
                </div>

                
                {/* SIM Types */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.simType')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {allSimTypes.map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedSimTypes(prev => prev.includes(st) ? prev.filter(x => x !== st) : [...prev, st])}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${selectedSimTypes.includes(st) ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:border-slate-500'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                
                {/* Charging Types */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.chargingType')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {allChargingTypes.map(ct => (
                      <button
                        key={ct}
                        type="button"
                        onClick={() => setSelectedChargingTypes(prev => prev.includes(ct) ? prev.filter(x => x !== ct) : [...prev, ct])}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${selectedChargingTypes.includes(ct) ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:border-slate-500'}`}
                      >
                        {ct}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIM Cards Buttons */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.simCards')}</span>
                  <div className="grid grid-cols-4 gap-1">
                    {(['any', '1', '2', '3'] as const).map(simOpt => (
                      <button
                        key={simOpt}
                        type="button"
                        onClick={() => setSimCards(simOpt)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                          simCards === simOpt
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        {simOpt === 'any' ? t('smartphones.any') : `${simOpt} SIM`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Screen */}
            <div>
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Tela</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minScreenSize')}</span>
                    <span className="text-cyan-400 font-bold">{minScreenSize === 0 ? t('smartphones.any') : `${minScreenSize}"+`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={SCREEN_STEPS.length - 1}
                    step="1"
                    value={SCREEN_STEPS.indexOf(minScreenSize) !== -1 ? SCREEN_STEPS.indexOf(minScreenSize) : 0}
                    onChange={(e) => setMinScreenSize(SCREEN_STEPS[Number(e.target.value)])}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números padrão embaixo do slide */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 px-0.5 select-none">
                    {SCREEN_STEPS.map(sizeVal => (
                      <button
                        key={sizeVal}
                        type="button"
                        onClick={() => setMinScreenSize(sizeVal)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${minScreenSize === sizeVal ? 'text-cyan-400 font-bold' : ''}`}
                      >
                        {sizeVal === 0 ? '0' : `${sizeVal}"`}
                      </button>
                    ))}
                  </div>
                </div>
                <CheckboxFilter label={t('smartphones.foldable')} checked={foldable} onChange={setFoldable} />
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Performance */}
            <div>
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Performance & Hardware</h3>
              <div className="flex flex-col gap-4">
                
                {/* RAM Slider com números padrões */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minRam')}</span>
                    <span className="text-cyan-400 font-bold">{minRam === 0 ? t('smartphones.any') : `${minRam}GB`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    step="2"
                    value={minRam}
                    onChange={(e) => setMinRam(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números padrões embaixo do slide de RAM */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 px-0.5 select-none">
                    {[0, 2, 4, 6, 8, 12, 16].map(ramVal => (
                      <button
                        key={ramVal}
                        type="button"
                        onClick={() => setMinRam(ramVal)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${minRam === ramVal ? 'text-cyan-400 font-bold scale-110' : ''}`}
                        title={`${ramVal}GB`}
                      >
                        {ramVal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Armazenamento Slider com números padrões */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minStorage')}</span>
                    <span className="text-cyan-400 font-bold">{minStorage === 0 ? t('smartphones.any') : `${minStorage}GB`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={STORAGE_STEPS.length - 1}
                    step="1"
                    value={storageStepIndex}
                    onChange={(e) => setStorageStepIndex(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números padrões embaixo do slide de Armazenamento */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 px-0.5 select-none">
                    {STORAGE_STEPS.map((stVal, idx) => (
                      <button
                        key={stVal}
                        type="button"
                        onClick={() => setStorageStepIndex(idx)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${storageStepIndex === idx ? 'text-cyan-400 font-bold scale-110' : ''}`}
                        title={`${stVal}GB`}
                      >
                        {stVal === 1024 ? '1T' : stVal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Núcleos Slider com números padrões */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minCores')}</span>
                    <span className="text-cyan-400 font-bold">{minCores === 0 ? t('smartphones.any') : `${minCores} Cores`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="2"
                    value={minCores}
                    onChange={(e) => setMinCores(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números padrões embaixo do slide de Núcleos */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 px-0.5 select-none">
                    {[0, 2, 4, 6, 8, 10].map(coreVal => (
                      <button
                        key={coreVal}
                        type="button"
                        onClick={() => setMinCores(coreVal)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${minCores === coreVal ? 'text-cyan-400 font-bold scale-110' : ''}`}
                        title={`${coreVal} Cores`}
                      >
                        {coreVal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro: Marca da CPU */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      {t('smartphones.cpuBrand')}
                    </span>
                    {selectedCpuBrands.length > 0 && (
                      <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-1.5 py-0.5 rounded font-bold">
                        {selectedCpuBrands.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {allCpuBrands.map(cpu => {
                      const isSelected = selectedCpuBrands.includes(cpu);
                      return (
                        <button
                          key={cpu}
                          type="button"
                          onClick={() => toggleCpuBrand(cpu)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                          }`}
                        >
                          {cpu}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filtro: Marca da GPU */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      {t('smartphones.gpuBrand')}
                    </span>
                    {selectedGpuBrands.length > 0 && (
                      <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded font-bold">
                        {selectedGpuBrands.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {allGpuBrands.map(gpu => {
                      const isSelected = selectedGpuBrands.includes(gpu);
                      return (
                        <button
                          key={gpu}
                          type="button"
                          onClick={() => toggleGpuBrand(gpu)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                          }`}
                        >
                          {gpu}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Architecture Buttons */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-medium text-slate-400">{t('smartphones.architecture')}</span>
                  <div className="grid grid-cols-3 gap-1">
                    {(['any', '32', '64'] as const).map(archOpt => (
                      <button
                        key={archOpt}
                        type="button"
                        onClick={() => setArchitecture(archOpt)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                          architecture === archOpt
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        {archOpt === 'any' ? t('smartphones.any') : `${archOpt}-bit`}
                      </button>
                    ))}
                  </div>
                </div>

                <CheckboxFilter label={t('smartphones.expandableMemory')} checked={expandableMemory} onChange={setExpandableMemory} />
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Camera */}
            <div>
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Câmera & Vídeo</h3>
              <div className="flex flex-col gap-4">
                
                {/* Câmera Selfie Slider com números padrões */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.minFrontCamera')}</span>
                    <span className="text-cyan-400 font-bold">{minFrontCamera === 0 ? t('smartphones.any') : `${minFrontCamera}MP`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={SELFIE_STEPS.length - 1}
                    step="1"
                    value={selfieStepIndex}
                    onChange={(e) => setSelfieStepIndex(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números padrões embaixo do slide de Câmera Selfie */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 px-0.5 select-none">
                    {SELFIE_STEPS.map((selfieVal, idx) => (
                      <button
                        key={selfieVal}
                        type="button"
                        onClick={() => setSelfieStepIndex(idx)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${selfieStepIndex === idx ? 'text-cyan-400 font-bold scale-110' : ''}`}
                        title={selfieVal === 0 ? t('smartphones.any') : `${selfieVal}MP`}
                      >
                        {selfieVal === 0 ? t('smartphones.any') : selfieVal}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Resolução de Gravação em SLIDER com os números/nomes embaixo (qualquer, HD, FHD, 2k, 4k, 8k) */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>{t('smartphones.recordingResolution')}</span>
                    <span className="text-cyan-400 font-bold">
                      {recResIndex === 0 ? t('smartphones.any') : `${RECORDING_RES_STEPS[recResIndex]}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={recResIndex}
                    onChange={(e) => setRecResIndex(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  {/* Números/etiquetas embaixo do slide na sequência solicitada */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1 px-0.5 select-none">
                    {['Qualquer', 'HD', 'FHD', '2K', '4K', '8K'].map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setRecResIndex(idx)}
                        className={`hover:text-cyan-400 cursor-pointer transition-colors ${recResIndex === idx ? 'text-cyan-400 font-extrabold scale-110' : ''}`}
                        title={idx === 0 ? t('smartphones.any') : label}
                      >
                        {idx === 0 ? t('smartphones.any') : label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1 border-t border-slate-800/60">
                  </div>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Features */}
            
            {/* Camera Features Section */}
            <div className="mb-6 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">{t('smartphones.cameraFeatures')}</h3>
              <div className="flex flex-col gap-3">
                <CheckboxFilter label={t('smartphones.opticalZoom')} checked={opticalZoom} onChange={setOpticalZoom} />
                <CheckboxFilter label={t('smartphones.stabilization')} checked={stabilization} onChange={setStabilization} />
                <CheckboxFilter label={t('smartphones.faceDetection')} checked={faceDetection} onChange={setFaceDetection} />
                <CheckboxFilter label={t('smartphones.slowMotion')} checked={slowMotion} onChange={setSlowMotion} />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">{t('smartphones.features')}</h3>
              <div className="flex flex-col gap-3">
                <CheckboxFilter label={t('smartphones.supportsWhatsApp')} checked={supportsWhatsApp} onChange={setSupportsWhatsApp} />
                <CheckboxFilter label="GPS" checked={hasGps} onChange={setHasGps} />
                <CheckboxFilter label={t('smartphones.biometric')} checked={fingerprint} onChange={setFingerprint} />
                <CheckboxFilter label={t('smartphones.nfc')} checked={hasNfc} onChange={setHasNfc} />
                <CheckboxFilter label={t('smartphones.compass')} checked={hasCompass} onChange={setHasCompass} />
                <CheckboxFilter label={t('smartphones.usbOtg')} checked={hasUsbOtg} onChange={setHasUsbOtg} />
                <CheckboxFilter label={t('smartphones.digitalTv')} checked={digitalTv} onChange={setDigitalTv} />
                <CheckboxFilter label={t('smartphones.physicalKeyboard')} checked={physicalKeyboard} onChange={setPhysicalKeyboard} />
              </div>
            </div>
          </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header Title */}
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('smartphones.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t('smartphones.subtitle')}
            </p>
          </div>
        </div>

        {/* Search Bar & Share Link */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder={t('smartphones.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
            />
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700/80 rounded-2xl transition-all font-semibold text-xs whitespace-nowrap cursor-pointer shadow-sm"
            title="Copiar link direto para esta aba"
          >
            {copiedLink ? (
              <>
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Copiar Link da Aba</span>
              </>
            )}
          </button>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Exibindo <strong>{filteredPhones.length}</strong> modelo{filteredPhones.length !== 1 ? 's' : ''}</span>
          {activeFiltersCount > 0 && (
            <span className="text-cyan-400">{activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} ativo{activeFiltersCount !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredPhones.map(phone => {
            const p = phone.specs;
            return (
              <div key={phone.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all p-5 flex flex-col relative group">
                
                {/* Decorative glowing gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Header */}
                <div className="mb-5 pb-4 border-b border-slate-800/80 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-500">{phone.brand}</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-0.5">{phone.model}</h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1">
                    <span className="text-[10px] font-bold text-slate-300">{phone.releaseYear}</span>
                    <span className="text-[10px] text-slate-600">•</span>
                    <span className="text-[10px] font-bold text-slate-300">{phone.os}</span>
                    <span className="text-[10px] text-slate-600">•</span>
                    <span className="text-[10px] font-bold text-emerald-400">{p.features.network}</span>
                  </div>
                </div>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 flex-1">
                  {/* Screen */}
                  <div className="flex items-start gap-3">
                    <Monitor className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold truncate" title={`${p.screen.size}" ${p.screen.type}`}>{p.screen.size}" {p.screen.type}</div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1">{p.screen.resolution} • {p.screen.refreshRate}Hz</div>
                      {p.screen.isFoldable && <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mt-1.5">{t('smartphones.foldable')}</div>}
                    </div>
                  </div>
                  
                  {/* Processor & GPU */}
                  <div className="flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold truncate" title={p.processor.chipset}>{p.processor.chipset}</div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
                        CPU: <span className="text-cyan-300 font-semibold">{p.processor.cpuBrand}</span> ({p.processor.cores} cores, {p.processor.architecture}-bit)
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate" title={p.gpu.model}>
                        GPU: <span className="text-emerald-300 font-semibold">{p.gpu.brand}</span> ({p.gpu.model})
                      </div>
                    </div>
                  </div>

                  {/* Memory */}
                  <div className="flex items-start gap-3">
                    <HardDrive className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold">RAM: {p.ram.join('/')}GB</div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
                        ROM: {Math.max(...p.storage.options)}GB {p.storage.expandable ? '(Expansível)' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Camera */}
                  <div className="flex items-start gap-3">
                    <Camera className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold">{p.camera.rear}MP (Tras) • {p.camera.front}MP (Front)</div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
                        Vídeo: <span className="text-cyan-300 font-bold">{p.camera.recordingResolution}</span>
                        {p.camera.opticalZoom > 0 ? ` • ${p.camera.opticalZoom}x Zoom` : ''}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connectivity/Extras */}
                  <div className="flex items-start gap-3">
                    <Wifi className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold">{p.features.simCards} SIM Card{p.features.simCards > 1 ? 's' : ''}</div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1 flex flex-wrap gap-1.5">
                        {p.features.hasNfc && <span>NFC</span>}
                        {p.features.hasGps && <span>GPS</span>}
                        {p.features.hasDigitalTv && <span className="text-amber-400 font-semibold">TV Digital</span>}
                      </div>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="flex items-start gap-3">
                    <Battery className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm text-slate-200 font-bold">{p.battery.capacity} mAh</div>
                    </div>
                  </div>

                  
                  {/* Camera Extras */}
                  <div className="flex items-start gap-3 mt-1">
                    <Maximize2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-xs text-slate-400 truncate">{t('smartphones.maxFocusAngle')}: <span className="text-slate-300 font-semibold">{p.camera.maxFocusAngle}°</span></div>
                      <div className="text-xs text-slate-400 truncate">{t('smartphones.touchFocus')}: <span className="text-slate-300 font-semibold">{p.camera.touchFocus ? t('smartphones.yes') : t('smartphones.no')}</span></div>
                    </div>
                  </div>
                  
                  {/* Performance */}
                  <div className="flex items-start gap-3 col-span-2 mt-2 pt-2 border-t border-slate-800/60">
                    <RotateCcw className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex flex-wrap gap-x-4 gap-y-1 w-full">
                      <div className="text-xs text-slate-400">{t('smartphones.antutu')}: <span className="text-cyan-400 font-bold">{p.performance?.antutu?.toLocaleString() || '-'}</span></div>
                      <div className="text-xs text-slate-400">{t('smartphones.geekbench')}: <span className="text-emerald-400 font-bold">{p.performance?.geekbench || '-'}</span></div>
                      <div className="text-xs text-slate-400">{t('smartphones.3dmark')}: <span className="text-purple-400 font-bold">{p.performance?.tdMark?.toLocaleString() || '-'}</span></div>
                    </div>
                  </div>

                  {/* Badges Extras */}
                  <div className="col-span-2 pt-2 border-t border-slate-800/60 mt-1">
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-wider items-center">
                      {p.features.supportsWhatsApp ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-emerald-400" /> WhatsApp OK
                        </span>
                      ) : (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-rose-400" /> Sem WhatsApp
                        </span>
                      )}
                      {p.features.hasFingerprint && <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">{t('smartphones.fingerprint')}</span>}
                      {p.camera.faceDetection && <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">{t('smartphones.faceDetection')}</span>}
                      {p.camera.stabilization && <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md">{t('smartphones.stabilization')}</span>}
                      {p.features.hasPhysicalKeyboard && <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md">{t('smartphones.physicalKeyboard')}</span>}
                    </div>
                  </div>
                </div>

                {/* Share Actions Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium truncate">
                    {phone.brand} {phone.model}
                  </span>

                  <div className="flex items-center gap-2 ml-auto">
                    {/* Quick WhatsApp Share */}
                    <button
                      type="button"
                      onClick={(e) => handleShareWhatsAppPhone(phone, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      title="Compartilhar no WhatsApp"
                    >
                      <MessageSquareShare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>

                    {/* Share / Copy Specs button */}
                    <button
                      type="button"
                      onClick={() => handleSharePhone(phone)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        copiedPhoneId === phone.id
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700'
                      }`}
                      title={t('smartphones.sharePhone')}
                    >
                      {copiedPhoneId === phone.id ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t('smartphones.shareSuccess')}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{t('smartphones.sharePhone')}</span>
                        </>
                      )}
                    </button>

                    {/* Game Compatibility Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedPhoneForGames(phone)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                      title="Jogos pesados suportados com fluidez"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>🎮 Jogos</span>
                    </button>
                  </div>
                </div>
                
              </div>
            );
          })}

          {filteredPhones.length === 0 && (
            <div className="col-span-1 xl:col-span-2 py-16 flex flex-col items-center justify-center text-center bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl p-6">
              <Maximize2 className="w-12 h-12 text-slate-600 mb-3" />
              <h2 className="text-lg font-bold text-slate-300">{t('smartphones.noResults')}</h2>
              <p className="text-sm text-slate-500 mt-1 mb-4">{t('smartphones.tryDifferentFilters')}</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-all cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Game Compatibility Modal */}
      {selectedPhoneForGames && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">Desempenho em Jogos Pesados</span>
                  <h2 className="text-lg sm:text-xl font-black text-white">{selectedPhoneForGames.brand} {selectedPhoneForGames.model}</h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedPhoneForGames(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-4 flex-1">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Processador & Chipset</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedPhoneForGames.specs.processor.chipset}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">AnTuTu Benchmark</div>
                    <div className="text-sm font-bold text-cyan-400 mt-0.5">{selectedPhoneForGames.specs.performance?.antutu?.toLocaleString() || 'N/A'}</div>
                  </div>
                  <div className="text-right border-l border-slate-800 pl-3">
                    <div className="text-xs text-slate-400">GPU</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedPhoneForGames.specs.gpu.model}</div>
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Compatibilidade com Jogos Pesados (Warzone Mobile, Red Dead, XCOM 2, Genshin, Wuthering Waves, RE Village):</h3>

              <div className="grid grid-cols-1 gap-3">
                {getCompatibleGamesForPhone(selectedPhoneForGames).map((game, idx) => (
                  <div key={idx} className={`bg-slate-950/40 border ${game.isSupported ? 'border-slate-800/80 hover:border-purple-500/30' : 'border-red-950/60 bg-red-950/10'} rounded-2xl p-4 flex flex-col gap-2 transition-all`}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {game.isSupported ? (
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold text-xs shrink-0">
                            ✕
                          </div>
                        )}
                        <h4 className={`font-bold text-sm sm:text-base ${game.isSupported ? 'text-white' : 'text-red-200 line-through decoration-red-500/60'}`}>{game.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${game.badgeColor}`}>
                          {game.badge}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${game.isSupported ? 'text-cyan-400 bg-cyan-950/60 border-cyan-900/60' : 'text-red-400 bg-red-950/60 border-red-900/60'}`}>
                          {game.fps}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Gênero: <strong className="text-slate-300">{game.genre}</strong></span>
                      <span>Configuração: <strong className={game.isSupported ? 'text-purple-300' : 'text-red-300'}>{game.graphics}</strong></span>
                    </div>
                    <p className={`text-xs p-2.5 rounded-xl border mt-1 ${game.isSupported ? 'text-slate-300 bg-slate-900/60 border-slate-800' : 'text-red-300/90 bg-red-950/30 border-red-900/40'}`}>
                      {game.note} {game.unsupportedReason && <span className="block mt-1 font-semibold text-red-400">Motivo: {game.unsupportedReason}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">Estimativas baseadas em benchmarks reais e testes de hardware.</span>
              <button
                onClick={() => setSelectedPhoneForGames(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


