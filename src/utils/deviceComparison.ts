import { Smartphone as SmartphoneType } from '../data/smartphones';

export interface CategoryComparisonResult {
  category: string;
  winner: string;
  detail: string;
  scores: { phoneId: string; phoneName: string; score: number; highlight: string }[];
}

export interface BestForProfileResult {
  phone: string;
  badge: string;
  profile: string;
}

export interface AlgorithmicComparisonResult {
  id: string;
  createdAt: string;
  source: 'algorithmic' | 'ai';
  phoneIds: string[];
  phoneNames: string[];
  title: string;
  winnerOverall: string;
  winnerReason: string;
  summary: string;
  categories: {
    category: string;
    winner: string;
    detail: string;
  }[];
  bestFor: BestForProfileResult[];
  verdict: string;
  detailedScores: {
    phoneId: string;
    phoneName: string;
    totalScore: number;
    performanceScore: number;
    cameraScore: number;
    batteryScore: number;
    screenScore: number;
    featuresScore: number;
  }[];
}

// Dicionário multilíngue para os textos gerados pelo algoritmo
const i18nTexts: Record<string, any> = {
  PT: {
    vs: 'vs',
    comparisonTitle: 'Duelo Técnico',
    tie: 'Empate Técnico',
    overallWinner: 'Vencedor Geral por Pontuação Técnica',
    winnerReasonPrefix: 'Venceu o confronto com maior pontuação acumulada nas categorias avaliadas.',
    catPerformance: 'Desempenho & Processamento',
    catCamera: 'Câmeras & Fotografia',
    catBattery: 'Bateria & Autonomia',
    catScreen: 'Tela & Qualidade Visual',
    catFeatures: 'Recursos & Conectividade',
    bestForPerformanceBadge: 'Máximo Desempenho / Games',
    bestForCameraBadge: 'Melhor para Fotos / Criadores',
    bestForBatteryBadge: 'Campeão em Autonomia',
    bestForBalanceBadge: 'Melhor Custo-Benefício / Equilíbrio',
    bestForFoldableBadge: 'Inovação & Multitarefa',
    verdictIntro: 'Com base na análise estrita dos dados de engenharia e especificações técnicas:',
    verdictPick: 'se destaca como a escolha mais completa e avançada tecnicamente no geral.',
    summaryIntro: 'Comparativo direto entre as especificações oficiais dos dispositivos.',
  },
  EN: {
    vs: 'vs',
    comparisonTitle: 'Technical Duel',
    tie: 'Technical Tie',
    overallWinner: 'Overall Winner by Technical Score',
    winnerReasonPrefix: 'Won the confrontation with the highest accumulated score across evaluated categories.',
    catPerformance: 'Performance & Processing',
    catCamera: 'Cameras & Photography',
    catBattery: 'Battery & Endurance',
    catScreen: 'Screen & Visual Quality',
    catFeatures: 'Features & Connectivity',
    bestForPerformanceBadge: 'Peak Performance / Gaming',
    bestForCameraBadge: 'Best for Photo / Creators',
    bestForBatteryBadge: 'Battery Champion',
    bestForBalanceBadge: 'Best Value / Balanced',
    bestForFoldableBadge: 'Innovation & Multitasking',
    verdictIntro: 'Based on strict engineering data and technical specifications analysis:',
    verdictPick: 'stands out as the most technically complete and advanced choice overall.',
    summaryIntro: 'Direct side-by-side comparison between the official device specifications.',
  },
  RU: {
    vs: 'против',
    comparisonTitle: 'Техническая дуэль',
    tie: 'Ничья',
    overallWinner: 'Общий победитель по техническим баллам',
    winnerReasonPrefix: 'Победил в сравнении с наивысшим баллом по всем категориям.',
    catPerformance: 'Производительность и процессор',
    catCamera: 'Камеры и фото',
    catBattery: 'Батарея и автономность',
    catScreen: 'Экран и качество изображения',
    catFeatures: 'Функции и связь',
    bestForPerformanceBadge: 'Максимальная производительность / Игры',
    bestForCameraBadge: 'Лучший для фото',
    bestForBatteryBadge: 'Лидер по автономности',
    bestForBalanceBadge: 'Лучший баланс / Цена-качество',
    bestForFoldableBadge: 'Инновации и многозадачность',
    verdictIntro: 'На основе строгого анализа инженерных характеристик:',
    verdictPick: 'выделяется как наиболее сбалансированный и продвинутый выбор.',
    summaryIntro: 'Прямое сравнение официальных технических характеристик устройств.',
  },
  HI: {
    vs: 'बनाम',
    comparisonTitle: 'तकनीकी मुकाबला',
    tie: 'तकनीकी बराबरी',
    overallWinner: 'तकनीकी स्कोर द्वारा समग्र विजेता',
    winnerReasonPrefix: 'मूल्यांकन की गई श्रेणियों में उच्चतम स्कोर के साथ मुकाबला जीता।',
    catPerformance: 'प्रदर्शन और प्रोसेसर',
    catCamera: 'कैमरा और फोटोग्राफी',
    catBattery: 'बैटरी और बैकअप',
    catScreen: 'स्क्रीन और डिस्प्ले',
    catFeatures: 'सुविधाएं और कनेक्टिविटी',
    bestForPerformanceBadge: 'सर्वोच्च प्रदर्शन / गेमिंग',
    bestForCameraBadge: 'फोटोग्राफी के लिए सर्वश्रेष्ठ',
    bestForBatteryBadge: 'बैटरी चैंपियन',
    bestForBalanceBadge: 'सर्वश्रेष्ठ मूल्य / संतुलित',
    bestForFoldableBadge: 'नवाचार और मल्टीटास्किंग',
    verdictIntro: 'इंजीनियरिंग डेटा और तकनीकी विशिष्टताओं के विश्लेषण के आधार पर:',
    verdictPick: 'कुल मिलाकर सबसे पूर्ण और उन्नत विकल्प के रूप में उभरता है।',
    summaryIntro: 'डिवाइस के आधिकारिक विनिर्देशों के बीच सीधा तुलनात्मक विश्लेषण।',
  },
  KO: {
    vs: 'vs',
    comparisonTitle: '스펙 대결',
    tie: '동점',
    overallWinner: '기술 점수 종합 1위',
    winnerReasonPrefix: '평가된 모든 카테고리에서 가장 높은 총점으로 우승했습니다.',
    catPerformance: '성능 및 프로세서',
    catCamera: '카메라 및 사진',
    catBattery: '배터리 및 사용시간',
    catScreen: '화면 및 화질',
    catFeatures: '기능 및 연결성',
    bestForPerformanceBadge: '최고 성능 / 게이밍',
    bestForCameraBadge: '사진 및 크리에이터 추천',
    bestForBatteryBadge: '배터리 챔피언',
    bestForBalanceBadge: '최고의 가성비 / 밸런스',
    bestForFoldableBadge: '혁신 및 멀티태스킹',
    verdictIntro: '엄격한 엔지니어링 스펙 데이터 분석 결과:',
    verdictPick: '전반적으로 가장 완전하고 진보된 선택으로 두각을 나타냅니다.',
    summaryIntro: '기기의 공식 사양을 바탕으로 한 즉각적인 스펙 비교 분석입니다.',
  }
};

/**
 * Calcula a pontuação individual de uma categoria para um smartphone específico (0 a 100)
 */
export function calculateDeviceCategoryScores(phone: SmartphoneType) {
  const specs = phone.specs;

  // 1. Performance (Antutu, RAM máxima, Cores, Geekbench)
  let perfScore = 50;
  if (specs.performance?.antutu) {
    // Escala Antutu (0 a 3.500.000)
    perfScore = Math.min(100, Math.round((specs.performance.antutu / 3500000) * 100));
  } else {
    const maxRam = Math.max(...(specs.ram || [4]));
    perfScore = Math.min(100, (maxRam / 24) * 50 + (specs.processor?.cores || 8) * 5);
  }
  const maxRam = Math.max(...(specs.ram || [4]));
  if (maxRam >= 16) perfScore = Math.min(100, perfScore + 5);

  // 2. Câmeras (Traseira MP, Zoom Óptico, OIS, Resolução de Gravação, Câmera Frontal)
  let camScore = 30;
  const rearMp = specs.camera?.rear || 12;
  const frontMp = specs.camera?.front || 8;
  const zoom = specs.camera?.opticalZoom || 1;
  const hasOis = specs.camera?.stabilization ? 15 : 0;
  const recRes = specs.camera?.recordingResolution === '8K' ? 15 : specs.camera?.recordingResolution === '4K' ? 10 : 5;

  camScore = Math.min(100, Math.round((rearMp / 200) * 35 + (frontMp / 60) * 15 + (zoom / 10) * 20 + hasOis + recRes));

  // 3. Bateria (Capacidade mAh, Tipos de Carregamento)
  let batScore = 40;
  const capacity = specs.battery?.capacity || 4000;
  const chargingBonus = (specs.battery?.chargingTypes || []).length * 8;
  batScore = Math.min(100, Math.round((capacity / 6500) * 75 + chargingBonus));

  // 4. Tela (Taxa de atualização Hz, Resolução, Tamanho, Dobrável)
  let screenScore = 40;
  const hz = specs.screen?.refreshRate || 60;
  const isFold = specs.screen?.isFoldable ? 15 : 0;
  const hzBonus = (hz / 144) * 45;
  const sizeBonus = Math.min(25, (specs.screen?.size || 6.1) * 3);
  screenScore = Math.min(100, Math.round(hzBonus + sizeBonus + isFold + 15));

  // 5. Recursos e Conectividade (5G, NFC, GPS, Biometria, eSIM, OTG)
  let featScore = 30;
  if (specs.features?.network === '5G') featScore += 20;
  if (specs.features?.hasNfc) featScore += 15;
  if (specs.features?.hasFingerprint) featScore += 15;
  if (specs.features?.hasGps) featScore += 10;
  if (specs.features?.hasUsbOtg) featScore += 10;
  if (specs.features?.simTypes?.some(s => s.toLowerCase().includes('esim'))) featScore += 10;
  featScore = Math.min(100, featScore);

  // Média Geral Ponderada (Pesos: Desempenho 25%, Câmeras 25%, Bateria 20%, Tela 20%, Recursos 10%)
  const totalScore = Math.round(
    perfScore * 0.25 +
    camScore * 0.25 +
    batScore * 0.20 +
    screenScore * 0.20 +
    featScore * 0.10
  );

  return {
    totalScore,
    performanceScore: perfScore,
    cameraScore: camScore,
    batteryScore: batScore,
    screenScore: screenScore,
    featuresScore: featScore
  };
}

/**
 * Função principal React/TypeScript para comparar 2 ou 3 dispositivos 100% de forma algorítmica
 */
export interface DeviceRecommendation {
  phone: SmartphoneType;
  rank: number;
  score: number;
  badge: string;
  badgeColor: string;
  highlightTitle: string;
  keySpecs: string;
  recommendationReason: string;
}

/**
 * Retorna as melhores sugestões de dispositivos para Câmera Selfie (Frontal)
 */
export function getBestSelfieCameraDevices(
  phones: SmartphoneType[],
  limitCount: number = 6
): DeviceRecommendation[] {
  // Filtra apenas smartphones
  const smartphonesOnly = phones.filter(p => p.deviceType !== 'smartwatch');

  const scored = smartphonesOnly.map(phone => {
    const cam = phone.specs.camera;
    const frontMp = cam?.front || 0;
    const rearMp = cam?.rear || 0;
    const hasFace = cam?.faceDetection ? 15 : 0;
    const hasStab = cam?.stabilization ? 12 : 0;
    const recBonus = cam?.recordingResolution === '8K' ? 20 : cam?.recordingResolution === '4K' ? 14 : cam?.recordingResolution === '2K' ? 8 : 4;
    const antutuBonus = Math.min(15, ((phone.specs.performance?.antutu || 300000) / 3000000) * 15);

    // Pontuação balanceada para selfies
    const score = Math.round((frontMp * 1.2) + hasFace + hasStab + recBonus + antutuBonus);

    let badge = 'Selfie Pro';
    let badgeColor = 'bg-pink-500/10 text-pink-400 border-pink-500/30';
    let highlightTitle = `${frontMp} MP Frontal Ultra-Nítida`;

    if (frontMp >= 50) {
      badge = 'Sensacional 50MP+';
      badgeColor = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      highlightTitle = `Sensor Selfie de ${frontMp} MP com Resolução Extrema`;
    } else if (frontMp >= 32) {
      badge = 'Selfie Studio 32MP';
      badgeColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      highlightTitle = `Câmera Frontal de ${frontMp} MP para Vlogs e Redes`;
    } else if (phone.brand.toLowerCase() === 'apple') {
      badge = 'TrueDepth & HDR';
      badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      highlightTitle = `Sensor TrueDepth ${frontMp} MP com Foco Automático e 4K60`;
    }

    const keySpecs = `Frontal: ${frontMp} MP • Gravação: ${cam?.recordingResolution || 'FHD'} • ${cam?.faceDetection ? 'Detecção Facial' : 'Foco Automático'}${cam?.stabilization ? ' • Estabilização' : ''}`;
    const recommendationReason = `Excelente processamento de tons de pele, nitidez destacada para fotos frontais e suporte a chamadas de vídeo em altíssima definição.`;

    return {
      phone,
      rank: 0,
      score,
      badge,
      badgeColor,
      highlightTitle,
      keySpecs,
      recommendationReason
    };
  });

  // Ordena pelo score decrescente
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limitCount).map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

/**
 * Retorna as melhores sugestões de dispositivos para Câmeras com Vídeo em Alta Resolução (8K e 4K com OIS)
 */
export function getBestHighResVideoDevices(
  phones: SmartphoneType[],
  limitCount: number = 6
): DeviceRecommendation[] {
  const smartphonesOnly = phones.filter(p => p.deviceType !== 'smartwatch');

  const scored = smartphonesOnly.map(phone => {
    const cam = phone.specs.camera;
    const rearMp = cam?.rear || 0;
    const zoom = cam?.opticalZoom || 1;
    const hasOis = cam?.stabilization ? 25 : 0;
    const hasSlowMo = cam?.slowMotion ? 10 : 0;
    const hasTouchFocus = cam?.touchFocus ? 8 : 0;
    
    let resPoints = 5;
    if (cam?.recordingResolution === '8K') resPoints = 45;
    else if (cam?.recordingResolution === '4K') resPoints = 30;
    else if (cam?.recordingResolution === '2K') resPoints = 18;
    else if (cam?.recordingResolution === 'FHD') resPoints = 10;

    const sensorBonus = Math.min(20, (rearMp / 200) * 20);
    const zoomBonus = Math.min(15, (zoom / 10) * 15);
    const antutuBonus = Math.min(10, ((phone.specs.performance?.antutu || 300000) / 3000000) * 10);

    const score = Math.round(resPoints + hasOis + sensorBonus + zoomBonus + hasSlowMo + hasTouchFocus + antutuBonus);

    let badge = 'Vídeo 4K Pro';
    let badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    let highlightTitle = `Gravação em ${cam?.recordingResolution || '4K'} Estabilizada`;

    if (cam?.recordingResolution === '8K') {
      badge = 'Cinema 8K Ultra';
      badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      highlightTitle = `Filmagem Master 8K com Sensor de ${rearMp} MP`;
    } else if (cam?.recordingResolution === '4K' && cam?.stabilization) {
      badge = 'Vídeo 4K60 OIS';
      badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      highlightTitle = `Gravação 4K Estabilizada com Zoom Óptico ${zoom > 0 ? `${zoom}x` : 'Digital'}`;
    }

    const keySpecs = `Gravação: ${cam?.recordingResolution || 'FHD'} • Traseira: ${rearMp} MP • OIS: ${cam?.stabilization ? 'Sim (Óptica)' : 'Não'} • Zoom: ${zoom}x`;
    const recommendationReason = `Conjunto óptico calibrado para gravação contínua sem tremidos, alta faixa dinâmica (HDR) e máxima resolução para edição e transmissão profissional.`;

    return {
      phone,
      rank: 0,
      score,
      badge,
      badgeColor,
      highlightTitle,
      keySpecs,
      recommendationReason
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limitCount).map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

/**
 * Função principal React/TypeScript para comparar 2 ou 3 dispositivos 100% de forma algorítmica
 */
export function compareDevicesAlgorithmically(
  phones: SmartphoneType[],
  lang: string = 'PT'
): AlgorithmicComparisonResult {
  const currentLang = i18nTexts[lang] || i18nTexts['PT'];
  const phoneNames = phones.map(p => `${p.brand} ${p.model}`);
  const phoneIds = phones.map(p => p.id);
  const title = `${phoneNames.join(` ${currentLang.vs} `)}: ${currentLang.comparisonTitle}`;

  // Calcula pontuações de todos os aparelhos
  const detailedScores = phones.map(p => {
    const scores = calculateDeviceCategoryScores(p);
    return {
      phoneId: p.id,
      phoneName: `${p.brand} ${p.model}`,
      ...scores
    };
  });

  // Determina vencedor de Desempenho
  const sortedByPerf = [...detailedScores].sort((a, b) => b.performanceScore - a.performanceScore);
  const perfWinnerPhone = phones.find(p => p.id === sortedByPerf[0].phoneId)!;
  const perfDetail = `${perfWinnerPhone.brand} ${perfWinnerPhone.model} lidera em processamento com ${perfWinnerPhone.specs.processor?.chipset || 'chipset avançado'}${perfWinnerPhone.specs.performance?.antutu ? ` (Antutu: ${perfWinnerPhone.specs.performance.antutu.toLocaleString()} pts)` : ''} e até ${Math.max(...(perfWinnerPhone.specs.ram || [8]))}GB RAM.`;

  // Determina vencedor de Câmeras
  const sortedByCam = [...detailedScores].sort((a, b) => b.cameraScore - a.cameraScore);
  const camWinnerPhone = phones.find(p => p.id === sortedByCam[0].phoneId)!;
  const camDetail = `${camWinnerPhone.brand} ${camWinnerPhone.model} se destaca no conjunto óptico com sensor de ${camWinnerPhone.specs.camera?.rear}MP, zoom óptico de ${camWinnerPhone.specs.camera?.opticalZoom || 1}x e gravação em ${camWinnerPhone.specs.camera?.recordingResolution || '4K'}.`;

  // Determina vencedor de Bateria
  const sortedByBat = [...detailedScores].sort((a, b) => b.batteryScore - a.batteryScore);
  const batWinnerPhone = phones.find(p => p.id === sortedByBat[0].phoneId)!;
  const batDetail = `${batWinnerPhone.brand} ${batWinnerPhone.model} entrega maior autonomia com tanque de ${batWinnerPhone.specs.battery?.capacity} mAh e suporte a ${batWinnerPhone.specs.battery?.chargingTypes?.join(', ') || 'carregamento rápido'}.`;

  // Determina vencedor de Tela
  const sortedByScreen = [...detailedScores].sort((a, b) => b.screenScore - a.screenScore);
  const screenWinnerPhone = phones.find(p => p.id === sortedByScreen[0].phoneId)!;
  const screenDetail = `${screenWinnerPhone.brand} ${screenWinnerPhone.model} oferece a melhor experiência visual com painel ${screenWinnerPhone.specs.screen?.type} de ${screenWinnerPhone.specs.screen?.size}" a ${screenWinnerPhone.specs.screen?.refreshRate}Hz.`;

  // Determina vencedor de Recursos
  const sortedByFeat = [...detailedScores].sort((a, b) => b.featuresScore - a.featuresScore);
  const featWinnerPhone = phones.find(p => p.id === sortedByFeat[0].phoneId)!;
  const featDetail = `${featWinnerPhone.brand} ${featWinnerPhone.model} traz conectividade completa com rede ${featWinnerPhone.specs.features?.network}, NFC, biometria e suporte a múltiplos SIMs.`;

  const categories = [
    {
      category: currentLang.catPerformance,
      winner: `${perfWinnerPhone.brand} ${perfWinnerPhone.model}`,
      detail: perfDetail
    },
    {
      category: currentLang.catCamera,
      winner: `${camWinnerPhone.brand} ${camWinnerPhone.model}`,
      detail: camDetail
    },
    {
      category: currentLang.catBattery,
      winner: `${batWinnerPhone.brand} ${batWinnerPhone.model}`,
      detail: batDetail
    },
    {
      category: currentLang.catScreen,
      winner: `${screenWinnerPhone.brand} ${screenWinnerPhone.model}`,
      detail: screenDetail
    },
    {
      category: currentLang.catFeatures,
      winner: `${featWinnerPhone.brand} ${featWinnerPhone.model}`,
      detail: featDetail
    }
  ];

  // Determina vencedor Geral
  const sortedByTotal = [...detailedScores].sort((a, b) => b.totalScore - a.totalScore);
  const isTie = sortedByTotal.length > 1 && sortedByTotal[0].totalScore === sortedByTotal[1].totalScore;
  const overallWinner = isTie 
    ? currentLang.tie 
    : sortedByTotal[0].phoneName;

  const winnerDevice = phones.find(p => `${p.brand} ${p.model}` === sortedByTotal[0].phoneName) || phones[0];
  const winnerReason = isTie
    ? 'Ambos os modelos entregam equilíbrio técnico equivalente, variando de acordo com a preferência de sistema operacional e design.'
    : `${currentLang.winnerReasonPrefix} (${sortedByTotal[0].totalScore}/100 pontos técnicos totais), com vantagens claras em hardware e durabilidade.`;

  // Perfis recomendados para cada aparelho
  const bestFor: BestForProfileResult[] = phones.map(phone => {
    const scores = detailedScores.find(s => s.phoneId === phone.id)!;
    let badge = currentLang.bestForBalanceBadge;
    let profile = `Ideal para uso equilibrado diário, com bom balanço entre tela, bateria (${phone.specs.battery?.capacity} mAh) e performance.`;

    if (phone.specs.screen?.isFoldable) {
      badge = currentLang.bestForFoldableBadge;
      profile = `Indicado para entusiastas de inovação e produtividade que buscam tela expansível e multitarefa avançada.`;
    } else if (scores.performanceScore >= 85 || (phone.specs.performance?.antutu && phone.specs.performance.antutu > 2000000)) {
      badge = currentLang.bestForPerformanceBadge;
      profile = `Perfeito para quem busca velocidade extrema, jogos pesados com altas taxas de quadros e longevidade de processamento.`;
    } else if (scores.cameraScore >= 80 || phone.specs.camera?.rear >= 100 || (phone.specs.camera?.opticalZoom || 1) >= 3) {
      badge = currentLang.bestForCameraBadge;
      profile = `Recomendado para criadores de conteúdo, fotos noturnas detalhadas e filmagens de alta qualidade.`;
    } else if (scores.batteryScore >= 80 || phone.specs.battery?.capacity >= 5500) {
      badge = currentLang.bestForBatteryBadge;
      profile = `Excelente para quem prioriza longa autonomia e não quer se preocupar com recargas durante o dia.`;
    }

    return {
      phone: `${phone.brand} ${phone.model}`,
      badge,
      profile
    };
  });

  // Resumo
  const summary = `${currentLang.summaryIntro}\n` +
    `Neste duelo entre ${phoneNames.join(' e ')}, comparamos métricas reais de processador (${phones.map(p => p.specs.processor?.chipset).filter(Boolean).join(' vs ')}), câmeras (${phones.map(p => `${p.specs.camera?.rear}MP`).join(' vs ')}) e autonomia de bateria (${phones.map(p => `${p.specs.battery?.capacity}mAh`).join(' vs ')}).`;

  // Veredito final
  const verdict = `${currentLang.verdictIntro}\n` +
    `🏆 O **${winnerDevice.brand} ${winnerDevice.model}** ${currentLang.verdictPick}\n\n` +
    `• Se o seu foco principal for **máximo desempenho e longevidade**, o **${perfWinnerPhone.brand} ${perfWinnerPhone.model}** entrega a melhor resposta técnica.\n` +
    `• Se o seu foco for **fotografia e produção visual**, o **${camWinnerPhone.brand} ${camWinnerPhone.model}** conta com os sensores e recursos ópticos mais consistentes.\n` +
    `• Se a sua prioridade for **ficar longe da tomada**, o **${batWinnerPhone.brand} ${batWinnerPhone.model}** é a escolha imbatível.`;

  return {
    id: 'comp-alg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    source: 'algorithmic',
    phoneIds,
    phoneNames,
    title,
    winnerOverall: overallWinner,
    winnerReason,
    summary,
    categories,
    bestFor,
    verdict,
    detailedScores
  };
}
