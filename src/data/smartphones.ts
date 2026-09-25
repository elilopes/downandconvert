export interface Smartphone {
  id: string;
  deviceType?: 'smartphone' | 'smartwatch' | 'tablet';
  categoryTier?: 'entrada' | 'intermediário' | 'topo de linha';
  brand: string;
  model: string;
  os: string;
  osVersion?: string;
  releaseYear: number;
  specs: {
    screen: {
      type: string;
      size: number;
      resolution: string;
      refreshRate: number;
      isFoldable: boolean;
    };
    processor: {
      chipset: string;
      cpuBrand: string;
      cores: number;
      architecture: 32 | 64;
    };
    gpu: {
      model: string;
      brand: string;
    };
    ram: number[];
    storage: {
      options: number[];
      expandable: boolean;
    };
    camera: {
      rear: number;
      front: number;
      opticalZoom: number;
      stabilization: boolean;
      faceDetection: boolean;
      recordingResolution: 'HD' | 'FHD' | '2K' | '4K' | '8K';
      slowMotion: boolean;
      maxFocusAngle: number;
      touchFocus: boolean;
    };
    battery: {
      capacity: number;
      chargingTypes: string[];
    };
    performance: {
      antutu: number;
      geekbench: string;
      tdMark: number;
    };
    features: {
      hasGps: boolean;
      hasNfc: boolean;
      network: '3G' | '4G' | '5G' | 'Wi-Fi';
      simCards: 0 | 1 | 2 | 3;
      hasDigitalTv: boolean;
      hasPhysicalKeyboard: boolean;
      hasFingerprint: boolean;
      supportsWhatsApp: boolean;
      simTypes: string[];
      hasCompass: boolean;
      hasUsbOtg: boolean;
    };
  };
}

export const mockedSmartphones: Smartphone[] = [
  {
    id: "xiaomi-18-fold",
    deviceType: "smartphone",
    brand: "Xiaomi",
    model: "18 Fold",
    os: "Android",
    osVersion: "HyperOS 3.0 (Android 16)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Foldable LTPO OLED (HyperDisplay)", size: 8.03, resolution: "2200 x 2480", refreshRate: 120, isFoldable: true },
      processor: { chipset: "XRING O3", cpuBrand: "Xiaomi", cores: 8, architecture: 64 },
      gpu: { model: "XRING Immersion GPU", brand: "Xiaomi" },
      ram: [16, 24],
      storage: { options: [512, 1024], expandable: false },
      camera: { rear: 200, front: 32, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 3450000, geekbench: '3500/10800', tdMark: 24500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "iphone-duo",
    deviceType: "smartphone",
    brand: "Apple",
    model: "iPhone Duo",
    os: "iOS",
    osVersion: "iOS 20",
    releaseYear: 2026,
    specs: {
      screen: { type: "Foldable Super Retina XDR OLED", size: 7.9, resolution: "2340 x 2520", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Apple A20 Pro", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple 6-Core GPU (Ray Tracing Gen 3)", brand: "Apple GPU" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 48, front: 24, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 3200000, geekbench: '3600/9800', tdMark: 23000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-z-fold-8",
    deviceType: "smartphone",
    brand: "Samsung",
    model: "Galaxy Z Fold 8",
    os: "Android",
    osVersion: "One UI 8 (Android 16)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Dynamic AMOLED 2X Dobrável", size: 7.85, resolution: "2184 x 2316", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Elite Gen 2 for Galaxy", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 850", brand: "Adreno" },
      ram: [16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 200, front: 12, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5400, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 3350000, geekbench: '3400/10200', tdMark: 24000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "sanyo-w33sa",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Sanyo",
    model: "W33SA",
    os: "Outro",
    osVersion: "KDDI au BREW 3.1",
    releaseYear: 2005,
    specs: {
      screen: { type: "IPS TFT LCD Giratório", size: 2.4, resolution: "240 x 320", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Qualcomm MSM6550", cpuBrand: "Qualcomm", cores: 1, architecture: 32 },
      gpu: { model: "Qualcomm 2D/3D Accelerator", brand: "Qualcomm" },
      ram: [0.5],
      storage: { options: [1], expandable: true },
      camera: { rear: 1.3, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 68, touchFocus: false },
      battery: { capacity: 830, chargingTypes: ['Micro-USB'] },
      performance: { antutu: 15000, geekbench: '50/120', tdMark: 200 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 1, hasDigitalTv: true, hasPhysicalKeyboard: true, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Mini-SIM (2FF)'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "galaxy-a30",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A30",
    os: "Android",
    osVersion: "Android 9.0 (Pie), atualizável para Android 10 (One UI 2.0)",
    releaseYear: 2019,
    specs: {
      screen: { type: "Super AMOLED Infinity-U", size: 6.4, resolution: "1080 x 2340", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos 7904", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G71 MP2", brand: "Mali" },
      ram: [3, 4],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 16, front: 16, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 130000, geekbench: '280/1000', tdMark: 1200 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-a30s",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A30s",
    os: "Android",
    osVersion: "Android 9.0 (Pie), atualizável para Android 11 (One UI 3.1)",
    releaseYear: 2019,
    specs: {
      screen: { type: "Super AMOLED Infinity-V", size: 6.4, resolution: "720 x 1560", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos 7904", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G71 MP2", brand: "Mali" },
      ram: [3, 4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 25, front: 16, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 132000, geekbench: '285/1020', tdMark: 1220 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-a50",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A50",
    os: "Android",
    osVersion: "Android 9.0 (Pie), atualizável para Android 11 (One UI 3.1)",
    releaseYear: 2019,
    specs: {
      screen: { type: "Super AMOLED Infinity-U", size: 6.4, resolution: "1080 x 2340", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos 9610", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [4, 6],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 25, front: 25, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 175000, geekbench: '345/1300', tdMark: 1450 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-a51",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A51",
    os: "Android",
    osVersion: "Android 10, atualizável para Android 13 (One UI 5.0)",
    releaseYear: 2020,
    specs: {
      screen: { type: "Super AMOLED Infinity-O", size: 6.5, resolution: "1080 x 2400", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos 9611", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [4, 6, 8],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 32, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 215000, geekbench: '350/1320', tdMark: 1600 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-j6",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Samsung",
    model: "Galaxy J6",
    os: "Android",
    osVersion: "Android 8.0 (Oreo), atualizável para Android 10",
    releaseYear: 2018,
    specs: {
      screen: { type: "Super AMOLED Infinity Display", size: 5.6, resolution: "720 x 1480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos 7870 Octa", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-T830 MP1", brand: "Mali" },
      ram: [2, 3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 76, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro-USB'] },
      performance: { antutu: 65000, geekbench: '140/730', tdMark: 600 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g5s-plus-tv",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G5S Plus TV",
    os: "Android",
    osVersion: "Android 7.1.1 (Nougat), atualizável para Android 8.1 (Oreo)",
    releaseYear: 2017,
    specs: {
      screen: { type: "IPS LCD Full HD", size: 5.5, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 625", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 506", brand: "Adreno" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 84, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro-USB', 'Turbo'] },
      performance: { antutu: 80000, geekbench: '170/850', tdMark: 800 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-c-plus",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Motorola",
    model: "Moto C Plus",
    os: "Android",
    osVersion: "Android 7.0 (Nougat)",
    releaseYear: 2017,
    specs: {
      screen: { type: "TFT LCD HD", size: 5.0, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6737", cpuBrand: "MediaTek", cores: 4, architecture: 64 },
      gpu: { model: "Mali-T720 MP2", brand: "Mali" },
      ram: [1, 2],
      storage: { options: [16], expandable: true },
      camera: { rear: 8, front: 2, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 71, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['Micro-USB'] },
      performance: { antutu: 38000, geekbench: '110/450', tdMark: 400 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g6-plus",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G6 Plus",
    os: "Android",
    osVersion: "Android 8.0 (Oreo), atualizável para Android 9.0 (Pie)",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD Max Vision 18:9", size: 5.9, resolution: "1080 x 2160", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 630", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 508", brand: "Adreno" },
      ram: [4, 6],
      storage: { options: [64], expandable: true },
      camera: { rear: 12, front: 8, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 78, touchFocus: true },
      battery: { capacity: 3200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 105000, geekbench: '210/1050', tdMark: 1000 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g7-power",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G7 Power",
    os: "Android",
    osVersion: "Android 9.0 (Pie), atualizável para Android 10",
    releaseYear: 2019,
    specs: {
      screen: { type: "IPS LCD Max Vision 19:9", size: 6.2, resolution: "720 x 1570", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 632", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 506", brand: "Adreno" },
      ram: [3, 4],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 12, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 78, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 135000, geekbench: '260/1180', tdMark: 1150 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-q7-plus",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "LG",
    model: "Q7 Plus",
    os: "Android",
    osVersion: "Android 8.1 (Oreo)",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD FullVision 18:9", size: 5.5, resolution: "1080 x 2160", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6750S", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-T860 MP2", brand: "Mali" },
      ram: [4],
      storage: { options: [64], expandable: true },
      camera: { rear: 16, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 100, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 68000, geekbench: '150/780', tdMark: 650 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k9-tv",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K9 TV",
    os: "Android",
    osVersion: "Android 7.1.2 (Nougat)",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD HD", size: 5.0, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 210", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 304", brand: "Adreno" },
      ram: [2],
      storage: { options: [16], expandable: true },
      camera: { rear: 8, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 72, touchFocus: true },
      battery: { capacity: 2500, chargingTypes: ['Micro-USB'] },
      performance: { antutu: 35000, geekbench: '95/360', tdMark: 300 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "s25-ultra",
    brand: "Samsung",
    model: "Galaxy S25 Ultra",
    os: "Android",
    releaseYear: 2025,
    specs: {
      screen: { type: "Dynamic AMOLED 2X", size: 6.8, resolution: "1440 x 3120", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Elite", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 830", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 200, front: 12, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2500000, geekbench: '3000/7500', tdMark: 18000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-s24-exynos",
    brand: "Samsung",
    model: "Galaxy S24 (Exynos)",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "Dynamic AMOLED 2X", size: 6.2, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 2400", cpuBrand: "Samsung", cores: 10, architecture: 64 },
      gpu: { model: "Xclipse 940", brand: "Xclipse" },
      ram: [8],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 50, front: 12, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1700000, geekbench: '2100/6500', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "iphone-15-pro",
    brand: "Apple",
    model: "iPhone 15 Pro",
    os: "iOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Super Retina XDR OLED", size: 6.1, resolution: "1179 x 2556", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Apple A17 Pro", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple A17 GPU 6-core", brand: "Apple GPU" },
      ram: [8],
      storage: { options: [128, 256, 512, 1024], expandable: false },
      camera: { rear: 48, front: 12, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3274, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1600000, geekbench: '2900/7200', tdMark: 15000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "pixel-8-pro",
    brand: "Google",
    model: "Pixel 8 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.7, resolution: "1344 x 2992", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Google Tensor G3", cpuBrand: "Google", cores: 9, architecture: 64 },
      gpu: { model: "Mali-G715 Immortalis", brand: "Mali" },
      ram: [12],
      storage: { options: [128, 256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 10.5, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 114, touchFocus: true },
      battery: { capacity: 5050, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1100000, geekbench: '1700/4400', tdMark: 9000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-14-ultra",
    brand: "Xiaomi",
    model: "14 Ultra",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO AMOLED", size: 6.73, resolution: "1440 x 3200", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2200/7000', tdMark: 17000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-13t-pro",
    brand: "Xiaomi",
    model: "Xiaomi 13T Pro (Dimensity)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "CrystalRes AMOLED", size: 6.67, resolution: "1220 x 2712", refreshRate: 144, isFoldable: false },
      processor: { chipset: "MediaTek Dimensity 9200+", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Immortalis-G715 MC11", brand: "Immortalis" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 20, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1500000, geekbench: '1900/5200', tdMark: 12000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-a54",
    brand: "Samsung",
    model: "Galaxy A54",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Super AMOLED", size: 6.4, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 1380", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MP5", brand: "Mali" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 510000, geekbench: '1000/2800', tdMark: 2800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a33-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A33 5G",
    os: "Android",
    osVersion: "Android 12 (One UI 4.1), atualizável para Android 16",
    releaseYear: 2022,
    specs: {
      screen: { type: "Super AMOLED 90Hz (Gorilla Glass 5)", size: 6.4, resolution: "1080 x 2400", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Exynos 1280", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68", brand: "Mali" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 48, front: 13, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 430000, geekbench: '740/1900', tdMark: 2100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a06",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Samsung",
    model: "Galaxy A06",
    os: "Android",
    osVersion: "Android 14 (One UI 6.1)",
    releaseYear: 2024,
    specs: {
      screen: { type: "PLS LCD", size: 6.7, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio G85", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [4, 6],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 240000, geekbench: '420/1350', tdMark: 1200 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a07-4g",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Samsung",
    model: "Galaxy A07 4G",
    os: "Android",
    osVersion: "Android 15 (One UI 7.0)",
    releaseYear: 2025,
    specs: {
      screen: { type: "PLS LCD 90Hz", size: 6.7, resolution: "720 x 1600", refreshRate: 90, isFoldable: false },
      processor: { chipset: "MediaTek Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [4, 6],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 380000, geekbench: '710/1850', tdMark: 1800 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a15-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A15 5G",
    os: "Android",
    osVersion: "Android 14 (One UI 6.0)",
    releaseYear: 2024,
    specs: {
      screen: { type: "Super AMOLED 90Hz", size: 6.5, resolution: "1080 x 2340", refreshRate: 90, isFoldable: false },
      processor: { chipset: "MediaTek Dimensity 6100+", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 400000, geekbench: '690/1900', tdMark: 1900 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a16-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A16 5G",
    os: "Android",
    osVersion: "Android 14 (One UI 6.1)",
    releaseYear: 2024,
    specs: {
      screen: { type: "Super AMOLED 90Hz", size: 6.7, resolution: "1080 x 2340", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Exynos 1330", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MP2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 430000, geekbench: '740/2000', tdMark: 2000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a17-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A17 5G",
    os: "Android",
    osVersion: "Android 16 (One UI 8.0)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Super AMOLED 120Hz", size: 6.6, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 1380", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MP5", brand: "Mali" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 540000, geekbench: '1020/2850', tdMark: 2900 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a36-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A36 5G",
    os: "Android",
    osVersion: "Android 15 (One UI 7.0)",
    releaseYear: 2025,
    specs: {
      screen: { type: "Super AMOLED 120Hz", size: 6.6, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 6 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 710", brand: "Adreno" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 12, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 620000, geekbench: '1050/2950', tdMark: 3200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a55-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A55 5G",
    os: "Android",
    osVersion: "Android 14 (One UI 6.1)",
    releaseYear: 2024,
    specs: {
      screen: { type: "Super AMOLED 120Hz (Gorilla Glass Victus+)", size: 6.6, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 1480", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Xclipse 530 (AMD RDNA 2)", brand: "Xclipse" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 720000, geekbench: '1150/3350', tdMark: 4100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-a56-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A56 5G",
    os: "Android",
    osVersion: "Android 15 (One UI 7.0)",
    releaseYear: 2025,
    specs: {
      screen: { type: "Super AMOLED 120Hz (1600 nits)", size: 6.6, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 1580", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Xclipse 540", brand: "Xclipse" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 12, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 890000, geekbench: '1320/3800', tdMark: 5200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "apple-iphone-16",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Apple",
    model: "iPhone 16",
    os: "iOS",
    osVersion: "iOS 18",
    releaseYear: 2024,
    specs: {
      screen: { type: "Super Retina XDR OLED (Ceramic Shield)", size: 6.1, resolution: "1179 x 2556", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A18", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple A18 GPU 5-core", brand: "Apple GPU" },
      ram: [8],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 48, front: 12, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3561, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1650000, geekbench: '3200/8100', tdMark: 16000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-iphone-17",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Apple",
    model: "iPhone 17",
    os: "iOS",
    osVersion: "iOS 19",
    releaseYear: 2025,
    specs: {
      screen: { type: "LTPO Super Retina XDR OLED 120Hz", size: 6.3, resolution: "1206 x 2622", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Apple A19", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple A19 GPU 5-core", brand: "Apple GPU" },
      ram: [8],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 48, front: 24, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3700, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1950000, geekbench: '3600/9200', tdMark: 19000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-iphone-6",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Apple",
    model: "iPhone 6",
    os: "iOS",
    osVersion: "iOS 8.0, atualizável para iOS 12.5.7",
    releaseYear: 2014,
    specs: {
      screen: { type: "IPS Retina HD", size: 4.7, resolution: "750 x 1334", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A8", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR GX6450", brand: "PowerVR" },
      ram: [1],
      storage: { options: [16, 32, 64, 128], expandable: false },
      camera: { rear: 8, front: 1.2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 1810, chargingTypes: ['Lightning'] },
      performance: { antutu: 80000, geekbench: '320/610', tdMark: 1100 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: false, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-iphone-6-plus",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Apple",
    model: "iPhone 6 Plus",
    os: "iOS",
    osVersion: "iOS 8.0, atualizável para iOS 12.5.7",
    releaseYear: 2014,
    specs: {
      screen: { type: "IPS Retina HD", size: 5.5, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A8", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR GX6450", brand: "PowerVR" },
      ram: [1],
      storage: { options: [16, 64, 128], expandable: false },
      camera: { rear: 8, front: 1.2, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 2915, chargingTypes: ['Lightning'] },
      performance: { antutu: 82000, geekbench: '325/620', tdMark: 1120 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: false, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-iphone-6s",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Apple",
    model: "iPhone 6s",
    os: "iOS",
    osVersion: "iOS 9.0, atualizável para iOS 15.8.3",
    releaseYear: 2015,
    specs: {
      screen: { type: "IPS Retina HD (3D Touch)", size: 4.7, resolution: "750 x 1334", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A9", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR GT7600", brand: "PowerVR" },
      ram: [2],
      storage: { options: [16, 32, 64, 128], expandable: false },
      camera: { rear: 12, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 90, touchFocus: true },
      battery: { capacity: 1715, chargingTypes: ['Lightning'] },
      performance: { antutu: 170000, geekbench: '550/1020', tdMark: 1800 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-iphone-6s-plus",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Apple",
    model: "iPhone 6s Plus",
    os: "iOS",
    osVersion: "iOS 9.0, atualizável para iOS 15.8.3",
    releaseYear: 2015,
    specs: {
      screen: { type: "IPS Retina HD (3D Touch)", size: 5.5, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A9", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR GT7600", brand: "PowerVR" },
      ram: [2],
      storage: { options: [16, 32, 64, 128], expandable: false },
      camera: { rear: 12, front: 5, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 90, touchFocus: true },
      battery: { capacity: 2750, chargingTypes: ['Lightning'] },
      performance: { antutu: 175000, geekbench: '560/1040', tdMark: 1850 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "xiaomi-redmi-a5",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Xiaomi",
    model: "Redmi A5",
    os: "Android",
    osVersion: "Android 15 (Go Edition)",
    releaseYear: 2025,
    specs: {
      screen: { type: "IPS LCD 90Hz", size: 6.71, resolution: "720 x 1650", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [3, 4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 13, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 100, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 220000, geekbench: '380/1250', tdMark: 950 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-redmi-14c",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Xiaomi",
    model: "Redmi 14C",
    os: "Android",
    osVersion: "Android 14 (HyperOS)",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.88, resolution: "720 x 1640", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Helio G81 Ultra", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5160, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 260000, geekbench: '430/1400', tdMark: 1150 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-redmi-note-14-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Xiaomi",
    model: "Redmi Note 14 5G",
    os: "Android",
    osVersion: "Android 14 (HyperOS)",
    releaseYear: 2024,
    specs: {
      screen: { type: "OLED 120Hz (2100 nits)", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Dimensity 7025 Ultra", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "IMG BXM-8-256", brand: "PowerVR" },
      ram: [6, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5110, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 480000, geekbench: '820/2200', tdMark: 2400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-redmi-15c",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Xiaomi",
    model: "Redmi 15C",
    os: "Android",
    osVersion: "Android 15 (HyperOS 2.0)",
    releaseYear: 2025,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.88, resolution: "720 x 1640", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Helio G85 Ultra", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 280000, geekbench: '460/1480', tdMark: 1250 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-poco-x6-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Xiaomi",
    model: "POCO X6 5G",
    os: "Android",
    osVersion: "Android 14 (HyperOS)",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED 120Hz (1800 nits, Dolby Vision)", size: 6.67, resolution: "1220 x 2712", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 7s Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 710", brand: "Adreno" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 64, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 600000, geekbench: '1020/2980', tdMark: 3100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-poco-x7-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Xiaomi",
    model: "POCO X7 5G",
    os: "Android",
    osVersion: "Android 15 (HyperOS 2.0)",
    releaseYear: 2025,
    specs: {
      screen: { type: "AMOLED 120Hz (3000 nits)", size: 6.67, resolution: "1220 x 2712", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Dimensity 7300 Ultra", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G615 MC2", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 20, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 710000, geekbench: '1120/3250', tdMark: 3900 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "iphone-13",
    brand: "Apple",
    model: "iPhone 13",
    os: "iOS",
    releaseYear: 2021,
    specs: {
      screen: { type: "Super Retina XDR OLED", size: 6.1, resolution: "1170 x 2532", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A15 Bionic", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple A15 GPU 4-core", brand: "Apple GPU" },
      ram: [4],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 12, front: 12, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3240, chargingTypes: ['Lightning', 'Sem fio', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1700/4600', tdMark: 8500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "z-fold-5",
    brand: "Samsung",
    model: "Galaxy Z Fold 5",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable Dynamic AMOLED 2X", size: 7.6, resolution: "1812 x 2176", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 10, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4400, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1550000, geekbench: '2000/5300', tdMark: 13000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-z-flip-5",
    brand: "Samsung",
    model: "Galaxy Z Flip 5",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable Dynamic AMOLED 2X", size: 6.7, resolution: "1080 x 2640", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 12, front: 10, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3700, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1450000, geekbench: '1900/5100', tdMark: 12500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g-dtv",
    brand: "Motorola",
    model: "Moto G (Digital TV)",
    os: "Android",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.2, resolution: "720 x 1520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 450", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 506", brand: "Adreno" },
      ram: [3, 4],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB/V8'] },
      performance: { antutu: 90000, geekbench: '150/700', tdMark: 400 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "unihertz-titan-pocket",
    brand: "Unihertz",
    model: "Titan Pocket (Teclado Físico)",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 3.1, resolution: "716 x 720", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P70", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [6],
      storage: { options: [128], expandable: true },
      camera: { rear: 16, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 200000, geekbench: '300/1400', tdMark: 1000 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: true, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "iphone-se-2022",
    brand: "Apple",
    model: "iPhone SE (3ª Geração)",
    os: "iOS",
    releaseYear: 2022,
    specs: {
      screen: { type: "Retina IPS LCD", size: 4.7, resolution: "750 x 1334", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A15 Bionic", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple A15 GPU 4-core", brand: "Apple GPU" },
      ram: [4],
      storage: { options: [64, 128, 256], expandable: false },
      camera: { rear: 12, front: 7, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 2018, chargingTypes: ['Lightning', 'Sem fio', 'Turbo'] },
      performance: { antutu: 750000, geekbench: '1700/4500', tdMark: 8000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "sony-xperia-1-v",
    brand: "Sony",
    model: "Xperia 1 V",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED 4K HDR", size: 6.5, resolution: "1644 x 3840", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512], expandable: true },
      camera: { rear: 48, front: 12, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1450000, geekbench: '1900/5100', tdMark: 13000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-50-pro",
    brand: "Motorola",
    model: "Edge 50 Pro",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "pOLED Super HD", size: 6.7, resolution: "1220 x 2712", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 7 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 720", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1100/3100', tdMark: 6000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-moto-g35-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G35 5G",
    os: "Android",
    osVersion: "Android 14 (Hello UI)",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 120Hz (1000 nits)", size: 6.72, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Unisoc T760", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC4", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 460000, geekbench: '760/2150', tdMark: 2200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-moto-g53-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G53 5G",
    os: "Android",
    osVersion: "Android 13 (My UX), atualizável para Android 14",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.5, resolution: "720 x 1600", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 480+ 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Adreno" },
      ram: [4, 8],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 370000, geekbench: '680/1750', tdMark: 1750 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-moto-g62-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G62 5G",
    os: "Android",
    osVersion: "Android 12 (My UX), atualizável para Android 13",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.5, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 480 Plus Qualcomm SM4350-AC", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Adreno" },
      ram: [4, 6],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 385000, geekbench: '700/1800', tdMark: 1800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "redmi-note-13-4g",
    brand: "Xiaomi",
    model: "Redmi Note 13 4G",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 685", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 610", brand: "Adreno" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 108, front: 16, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 340000, geekbench: '400/1400', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "acer-liquid-e700",
    brand: "Acer",
    model: "Liquid E700 (Triple SIM)",
    os: "Android",
    osVersion: "Android 4.4 KitKat",
    releaseYear: 2014,
    specs: {
      screen: { type: "IPS LCD", size: 5.0, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6582", cpuBrand: "MediaTek", cores: 4, architecture: 32 },
      gpu: { model: "Mali-400 MP2", brand: "Mali" },
      ram: [2],
      storage: { options: [16], expandable: true },
      camera: { rear: 8, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 90, touchFocus: true },
      battery: { capacity: 3500, chargingTypes: ['USB/V8'] },
      performance: { antutu: 18000, geekbench: '50/150', tdMark: 200 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 3, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nokia-3310-3g",
    brand: "Nokia",
    model: "3310 3G Classic",
    os: "Feature OS",
    osVersion: "Series 30+",
    releaseYear: 2017,
    specs: {
      screen: { type: "TFT Color", size: 2.4, resolution: "240 x 320", refreshRate: 30, isFoldable: false },
      processor: { chipset: "SC7701 32-bit", cpuBrand: "Unisoc", cores: 1, architecture: 32 },
      gpu: { model: "Mali-400", brand: "Mali" },
      ram: [1],
      storage: { options: [32], expandable: true },
      camera: { rear: 2, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 60, touchFocus: false },
      battery: { capacity: 1200, chargingTypes: ['USB/V8'] },
      performance: { antutu: 0, geekbench: '-', tdMark: 0 },
      features: { hasGps: false, hasNfc: false, network: '3G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: true, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "galaxy-pocket-3g",
    brand: "Samsung",
    model: "Galaxy Pocket Neo 3G",
    os: "Android",
    osVersion: "Android 4.1.2 Jelly Bean",
    releaseYear: 2014,
    specs: {
      screen: { type: "TFT", size: 3.0, resolution: "240 x 320", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Cortex-A9 32-bit", cpuBrand: "Broadcom", cores: 1, architecture: 32 },
      gpu: { model: "VideoCore IV", brand: "Broadcom" },
      ram: [1],
      storage: { options: [4], expandable: true },
      camera: { rear: 2, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 60, touchFocus: false },
      battery: { capacity: 1200, chargingTypes: ['USB/V8'] },
      performance: { antutu: 12000, geekbench: '40/100', tdMark: 100 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Mini-SIM (2FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "iphone-4s-classic",
    brand: "Apple",
    model: "iPhone 4S (iOS 9)",
    os: "iOS",
    osVersion: "iOS 9.3.6",
    releaseYear: 2011,
    specs: {
      screen: { type: "IPS Retina", size: 3.5, resolution: "640 x 960", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A5", cpuBrand: "Apple", cores: 2, architecture: 32 },
      gpu: { model: "PowerVR SGX543MP2", brand: "PowerVR" },
      ram: [1],
      storage: { options: [8, 16, 32, 64], expandable: false },
      camera: { rear: 8, front: 0.3, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 90, touchFocus: true },
      battery: { capacity: 1432, chargingTypes: ['30 pinos'] },
      performance: { antutu: 25000, geekbench: '100/200', tdMark: 500 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  // =========================================================================
  // APARELHOS COM ANDROID 5.0 E 5.1 (LOLLIPOP)
  // =========================================================================
  {
    id: "galaxy-s4-lollipop",
    brand: "Samsung",
    model: "Galaxy S4 (Lollipop 5.0.1)",
    os: "Android",
    osVersion: "Android 5.0.1 Lollipop",
    releaseYear: 2013,
    specs: {
      screen: { type: "Super AMOLED", size: 5.0, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 600", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 320", brand: "Adreno" },
      ram: [2],
      storage: { options: [16, 32, 64], expandable: true },
      camera: { rear: 13, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 2600, chargingTypes: ['USB/V8'] },
      performance: { antutu: 42000, geekbench: '280/850', tdMark: 850 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-note3-lollipop",
    brand: "Samsung",
    model: "Galaxy Note 3 (Lollipop 5.0)",
    os: "Android",
    osVersion: "Android 5.0 Lollipop",
    releaseYear: 2013,
    specs: {
      screen: { type: "Super AMOLED", size: 5.7, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 800", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 330", brand: "Adreno" },
      ram: [3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 13, front: 2, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 3200, chargingTypes: ['USB/V8'] },
      performance: { antutu: 55000, geekbench: '350/1100', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "galaxy-gran-prime-lollipop",
    brand: "Samsung",
    model: "Galaxy Gran Prime Duos TV (Lollipop 5.0.2)",
    os: "Android",
    osVersion: "Android 5.0.2 Lollipop",
    releaseYear: 2014,
    specs: {
      screen: { type: "TFT", size: 5.0, resolution: "540 x 960", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 410", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno 306", brand: "Adreno" },
      ram: [1],
      storage: { options: [8], expandable: true },
      camera: { rear: 8, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 2600, chargingTypes: ['USB/V8'] },
      performance: { antutu: 28000, geekbench: '150/450', tdMark: 400 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "moto-g2-lollipop",
    brand: "Motorola",
    model: "Moto G (2ª Geração DTV - Lollipop 5.0.2)",
    os: "Android",
    osVersion: "Android 5.0.2 Lollipop",
    releaseYear: 2014,
    specs: {
      screen: { type: "IPS LCD", size: 5.0, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 400", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 305", brand: "Adreno" },
      ram: [1],
      storage: { options: [8, 16], expandable: true },
      camera: { rear: 8, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: true, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 2070, chargingTypes: ['USB/V8'] },
      performance: { antutu: 24000, geekbench: '140/480', tdMark: 350 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g1-lollipop",
    brand: "Motorola",
    model: "Moto G (1ª Geração - Lollipop 5.1)",
    os: "Android",
    osVersion: "Android 5.1 Lollipop",
    releaseYear: 2013,
    specs: {
      screen: { type: "IPS LCD", size: 4.5, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 400", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 305", brand: "Adreno" },
      ram: [1],
      storage: { options: [8, 16], expandable: false },
      camera: { rear: 5, front: 1.3, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: true, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 2070, chargingTypes: ['USB/V8'] },
      performance: { antutu: 21000, geekbench: '130/430', tdMark: 320 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-e2-lollipop",
    brand: "Motorola",
    model: "Moto E (2ª Geração 3G - Lollipop 5.0.2)",
    os: "Android",
    osVersion: "Android 5.0.2 Lollipop",
    releaseYear: 2015,
    specs: {
      screen: { type: "IPS LCD", size: 4.5, resolution: "540 x 960", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 200", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 302", brand: "Adreno" },
      ram: [1],
      storage: { options: [8], expandable: true },
      camera: { rear: 5, front: 0.3, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 2390, chargingTypes: ['USB/V8'] },
      performance: { antutu: 18000, geekbench: '100/310', tdMark: 220 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-g3-lollipop",
    brand: "LG",
    model: "LG G3 (Lollipop 5.0)",
    os: "Android",
    osVersion: "Android 5.0 Lollipop",
    releaseYear: 2014,
    specs: {
      screen: { type: "True HD-IPS LCD", size: 5.5, resolution: "1440 x 2560", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 801", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 330", brand: "Adreno" },
      ram: [2, 3],
      storage: { options: [16, 32], expandable: true },
      camera: { rear: 13, front: 2.1, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['USB/V8', 'Sem fio'] },
      performance: { antutu: 52000, geekbench: '340/1050', tdMark: 1100 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "sony-xperia-z1-lollipop",
    brand: "Sony",
    model: "Xperia Z1 (Lollipop 5.1.1)",
    os: "Android",
    osVersion: "Android 5.1.1 Lollipop",
    releaseYear: 2013,
    specs: {
      screen: { type: "Triluminos TFT", size: 5.0, resolution: "1080 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 800", cpuBrand: "Qualcomm", cores: 4, architecture: 32 },
      gpu: { model: "Adreno 330", brand: "Adreno" },
      ram: [2],
      storage: { options: [16], expandable: true },
      camera: { rear: 20.7, front: 2, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['USB/V8'] },
      performance: { antutu: 54000, geekbench: '350/1150', tdMark: 1180 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Micro-SIM (3FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }

  ,
  {
    id: "ulefone-armor-24",
    brand: "Ulefone",
    model: "Armor 24",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.78, resolution: "1080 x 2460", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G96", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 64, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 22000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 380000, geekbench: '700/2000', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "doogee-v-max",
    brand: "Doogee",
    model: "V Max",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 1080", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 22000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 500000, geekbench: '800/2300', tdMark: 2200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "cubot-kingkong-9",
    brand: "Cubot",
    model: "KingKong 9",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 100, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 10600, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 400000, geekbench: '700/2000', tdMark: 1300 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nothing-phone-2",
    brand: "Nothing",
    model: "Phone (2)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.7, resolution: "1080 x 2412", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8+ Gen 1", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 730", brand: "Adreno" },
      ram: [8, 12],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4700, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1050000, geekbench: '1700/4500', tdMark: 10000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nubia-red-magic-9-pro",
    brand: "Nubia",
    model: "Red Magic 9 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.8, resolution: "1116 x 2480", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2200/7000', tdMark: 18000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "iqoo-12",
    brand: "iQOO",
    model: "12",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.78, resolution: "1260 x 2800", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2050000, geekbench: '2100/6800', tdMark: 17500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "oppo-find-x7-ultra",
    brand: "Oppo",
    model: "Find X7 Ultra",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO AMOLED", size: 6.82, resolution: "1440 x 3168", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 6, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2000000, geekbench: '2150/6900', tdMark: 17000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "infinix-note-40-pro",
    brand: "Infinix",
    model: "Note 40 Pro",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 6.78, resolution: "1080 x 2436", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 7020", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "IMG BXM-8-256", brand: "IMG" },
      ram: [8],
      storage: { options: [256], expandable: false },
      camera: { rear: 108, front: 32, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 450000, geekbench: '900/2300', tdMark: 2500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "umidigi-a15",
    brand: "Umidigi",
    model: "A15",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.7, resolution: "720 x 1650", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Unisoc T616", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 64, front: 16, opticalZoom: 1, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 90, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 250000, geekbench: '400/1500', tdMark: 700 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "oneplus-12",
    brand: "OnePlus",
    model: "12",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO AMOLED", size: 6.82, resolution: "1440 x 3168", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16, 24],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5400, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2100/6900', tdMark: 17800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "google-pixel-8-pro",
    brand: "Google",
    model: "Pixel 8 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.7, resolution: "1344 x 2992", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Tensor G3", cpuBrand: "Google", cores: 9, architecture: 64 },
      gpu: { model: "Immortalis-G715s MC10", brand: "Mali" },
      ram: [12],
      storage: { options: [128, 256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 10.5, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5050, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1150000, geekbench: '1700/4400', tdMark: 9500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "honor-magic-6-pro",
    brand: "Honor",
    model: "Magic 6 Pro",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO OLED", size: 6.8, resolution: "1280 x 2800", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 2.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5600, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2050000, geekbench: '2200/7100', tdMark: 17500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "huawei-pura-70-ultra",
    brand: "Huawei",
    model: "Pura 70 Ultra",
    os: "HarmonyOS",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO OLED", size: 6.8, resolution: "1260 x 2844", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Kirin 9010", cpuBrand: "HiSilicon", cores: 8, architecture: 64 },
      gpu: { model: "Maleoon 910", brand: "Maleoon" },
      ram: [16],
      storage: { options: [512, 1024], expandable: false },
      camera: { rear: 50, front: 13, opticalZoom: 3.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 950000, geekbench: '1400/4400', tdMark: 8000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "sony-xperia-1-vi",
    brand: "Sony",
    model: "Xperia 1 VI",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO OLED", size: 6.5, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512], expandable: true },
      camera: { rear: 48, front: 12, opticalZoom: 7.1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1800000, geekbench: '2100/6800', tdMark: 17000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  }


  ,
  {
    id: "ulefone-power-armor-18t",
    brand: "Ulefone",
    model: "Power Armor 18T",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 900", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 9600, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 480000, geekbench: '730/2100', tdMark: 2500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "ulefone-armor-22",
    brand: "Ulefone",
    model: "Armor 22",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G96", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 64, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6600, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 340000, geekbench: '500/1600', tdMark: 1100 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "ulefone-armor-x13",
    brand: "Ulefone",
    model: "Armor X13",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.52, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Helio G36", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [6],
      storage: { options: [64], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6320, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 150000, geekbench: '200/800', tdMark: 400 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "ulefone-note-16-pro",
    brand: "Ulefone",
    model: "Note 16 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.52, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [8],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4400, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 230000, geekbench: '300/1200', tdMark: 650 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "doogee-s100",
    brand: "Doogee",
    model: "S100",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 10800, chargingTypes: ['USB tipo C', 'Turbo', 'Sem fio'] },
      performance: { antutu: 390000, geekbench: '700/1900', tdMark: 1250 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "doogee-v30t",
    brand: "Doogee",
    model: "V30T",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 1080", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 10800, chargingTypes: ['USB tipo C', 'Turbo', 'Sem fio'] },
      performance: { antutu: 520000, geekbench: '800/2300', tdMark: 2200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "doogee-s110",
    brand: "Doogee",
    model: "S110",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 50, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 10800, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 385000, geekbench: '700/1900', tdMark: 1250 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "doogee-n50",
    brand: "Doogee",
    model: "N50",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.52, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [8],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 240000, geekbench: '350/1300', tdMark: 680 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "cubot-kingkong-star",
    brand: "Cubot",
    model: "KingKong Star",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.78, resolution: "1080 x 2460", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Dimensity 700", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 100, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 10600, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 350000, geekbench: '600/1700', tdMark: 1100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "cubot-p80",
    brand: "Cubot",
    model: "P80",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MT8788V", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 48, front: 24, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 220000, geekbench: '300/1200', tdMark: 600 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "cubot-x70",
    brand: "Cubot",
    model: "X70",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.58, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 100, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 380000, geekbench: '700/1900', tdMark: 1250 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "cubot-note-50",
    brand: "Cubot",
    model: "Note 50",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.56, resolution: "720 x 1612", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 230000, geekbench: '350/1300', tdMark: 650 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nothing-phone-1",
    brand: "Nothing",
    model: "Phone (1)",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "OLED", size: 6.55, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 778G+", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 642L", brand: "Adreno" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 590000, geekbench: '820/2900', tdMark: 2500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nothing-phone-2a",
    brand: "Nothing",
    model: "Phone (2a)",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 6.7, resolution: "1080 x 2412", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 7200 Pro", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G610 MC4", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 700000, geekbench: '1100/2600', tdMark: 4100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nothing-cmf-phone-1",
    brand: "Nothing",
    model: "CMF Phone 1",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 7300", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G615 MC2", brand: "Mali" },
      ram: [8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 650000, geekbench: '1000/2500', tdMark: 3800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nothing-phone-2a-plus",
    brand: "Nothing",
    model: "Phone (2a) Plus",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 6.7, resolution: "1080 x 2412", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 7350 Pro", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G610 MC4", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [256], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 740000, geekbench: '1200/2700', tdMark: 4300 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nubia-z60-ultra",
    brand: "Nubia",
    model: "Z60 Ultra",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.8, resolution: "1116 x 2480", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [12, 16, 24],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 12, opticalZoom: 3.3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2200/7000', tdMark: 18000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nubia-red-magic-8-pro",
    brand: "Nubia",
    model: "Red Magic 8 Pro",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "AMOLED", size: 6.8, resolution: "1116 x 2480", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1300000, geekbench: '1400/5200', tdMark: 13000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nubia-z50s-pro",
    brand: "Nubia",
    model: "Z50S Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.78, resolution: "1260 x 2800", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 1024], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 3.4, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1550000, geekbench: '2000/5500', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "nubia-neo-5g",
    brand: "Nubia",
    model: "Neo 5G",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.6, resolution: "1080 x 2408", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Unisoc T820", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: false },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 420000, geekbench: '750/2200', tdMark: 1400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "iqoo-11",
    brand: "iQOO",
    model: "11",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "LTPO4 AMOLED", size: 6.78, resolution: "1440 x 3200", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8, 12, 16],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1300000, geekbench: '1450/5000', tdMark: 13500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "iqoo-neo-9-pro",
    brand: "iQOO",
    model: "Neo 9 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO AMOLED", size: 6.78, resolution: "1260 x 2800", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Dimensity 9300", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Immortalis-G720 MC12", brand: "Mali" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5160, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2200/7400', tdMark: 17000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "iqoo-z8",
    brand: "iQOO",
    model: "Z8",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.64, resolution: "1080 x 2388", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 8200", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G610 MC6", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 64, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 980000, geekbench: '1200/3900', tdMark: 6000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "iqoo-12-pro",
    brand: "iQOO",
    model: "12 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.78, resolution: "1440 x 3200", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Adreno" },
      ram: [16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2150000, geekbench: '2250/7100', tdMark: 18500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oppo-find-x6-pro",
    brand: "Oppo",
    model: "Find X6 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO3 AMOLED", size: 6.82, resolution: "1440 x 3168", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 2.8, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1350000, geekbench: '1500/5000', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oppo-reno-11-pro",
    brand: "Oppo",
    model: "Reno 11 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.74, resolution: "1240 x 2772", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8+ Gen 1", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 730", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4700, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1100000, geekbench: '1300/4000', tdMark: 10500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oppo-find-n3",
    brand: "Oppo",
    model: "Find N3",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable LTPO3 OLED", size: 7.82, resolution: "2268 x 2440", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [512, 1024], expandable: false },
      camera: { rear: 48, front: 20, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4805, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1400000, geekbench: '1500/5000', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oppo-a98-5g",
    brand: "Oppo",
    model: "A98 5G",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.72, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 695 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Adreno" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 64, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 410000, geekbench: '900/2100', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "infinix-zero-30-5g",
    brand: "Infinix",
    model: "Zero 30 5G",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.78, resolution: "1080 x 2400", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Dimensity 8020", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G77 MC9", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [256], expandable: false },
      camera: { rear: 108, front: 50, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 750000, geekbench: '1000/3200', tdMark: 4500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "infinix-gt-10-pro",
    brand: "Infinix",
    model: "GT 10 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 8050", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G77 MC9", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1100/3300', tdMark: 4600 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "infinix-note-30-vip",
    brand: "Infinix",
    model: "Note 30 VIP",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 8050", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G77 MC9", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 810000, geekbench: '1100/3300', tdMark: 4650 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "infinix-hot-40-pro",
    brand: "Infinix",
    model: "Hot 40 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.78, resolution: "1080 x 2460", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 420000, geekbench: '730/2000', tdMark: 1300 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "umidigi-a13-pro-max",
    brand: "Umidigi",
    model: "A13 Pro Max 5G",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 6.8, resolution: "1080 x 2460", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Dimensity 900", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 64, front: 24, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5150, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 480000, geekbench: '750/2150', tdMark: 2550 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "umidigi-g5",
    brand: "Umidigi",
    model: "G5",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.6, resolution: "720 x 1612", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [8],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 240000, geekbench: '350/1300', tdMark: 650 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "umidigi-bison-2-pro",
    brand: "Umidigi",
    model: "Bison 2 Pro",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 6.5, resolution: "1080 x 2400", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Helio P90", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GM9446", brand: "PowerVR" },
      ram: [8],
      storage: { options: [256], expandable: true },
      camera: { rear: 48, front: 24, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6150, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 260000, geekbench: '400/1500', tdMark: 900 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "umidigi-a11-pro-max",
    brand: "Umidigi",
    model: "A11 Pro Max",
    os: "Android",
    releaseYear: 2021,
    specs: {
      screen: { type: "IPS LCD", size: 6.8, resolution: "1080 x 2460", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Helio G80", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [8],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 24, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5150, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 220000, geekbench: '350/1300', tdMark: 700 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oneplus-11",
    brand: "OnePlus",
    model: "11",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO3 Fluid AMOLED", size: 6.7, resolution: "1440 x 3216", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8, 16],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1300000, geekbench: '1500/5000', tdMark: 13500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oneplus-12r",
    brand: "OnePlus",
    model: "12R",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "LTPO4 AMOLED", size: 6.78, resolution: "1264 x 2780", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8, 16],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1450000, geekbench: '1550/5100', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oneplus-nord-3",
    brand: "OnePlus",
    model: "Nord 3",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Fluid AMOLED", size: 6.74, resolution: "1240 x 2772", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 9000", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MC10", brand: "Mali" },
      ram: [8, 16],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1050000, geekbench: '1150/3300', tdMark: 8000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "oneplus-open",
    brand: "OnePlus",
    model: "Open",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable LTPO3 Flexi-fluid AMOLED", size: 7.82, resolution: "2268 x 2440", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [16],
      storage: { options: [512], expandable: false },
      camera: { rear: 48, front: 20, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4805, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1400000, geekbench: '1500/5000', tdMark: 14000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "google-pixel-8",
    brand: "Google",
    model: "Pixel 8",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.2, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Tensor G3", cpuBrand: "Google", cores: 8, architecture: 64 },
      gpu: { model: "Immortalis-G715s MC10", brand: "Mali" },
      ram: [8],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 10.5, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4575, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1050000, geekbench: '1600/4300', tdMark: 9200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "google-pixel-7-pro",
    brand: "Google",
    model: "Pixel 7 Pro",
    os: "Android",
    releaseYear: 2022,
    specs: {
      screen: { type: "LTPO AMOLED", size: 6.7, resolution: "1440 x 3120", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Tensor G2", cpuBrand: "Google", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MP7", brand: "Mali" },
      ram: [12],
      storage: { options: [128, 256, 512], expandable: false },
      camera: { rear: 50, front: 10.8, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 850000, geekbench: '1400/3500', tdMark: 6500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "google-pixel-7a",
    brand: "Google",
    model: "Pixel 7a",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.1, resolution: "1080 x 2400", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Tensor G2", cpuBrand: "Google", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MP7", brand: "Mali" },
      ram: [8],
      storage: { options: [128], expandable: false },
      camera: { rear: 64, front: 13, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4385, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1350/3300', tdMark: 6400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "google-pixel-fold",
    brand: "Google",
    model: "Pixel Fold",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable OLED", size: 7.6, resolution: "1840 x 2208", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Tensor G2", cpuBrand: "Google", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MP7", brand: "Mali" },
      ram: [12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 48, front: 8, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4821, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 830000, geekbench: '1400/3400', tdMark: 6450 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "honor-magic-5-pro",
    brand: "Honor",
    model: "Magic 5 Pro",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.81, resolution: "1312 x 2848", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8, 12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 12, opticalZoom: 3.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1450000, geekbench: '1500/5000', tdMark: 13500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "honor-90",
    brand: "Honor",
    model: "90",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 6.7, resolution: "1200 x 2664", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 7 Gen 1", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 644", brand: "Adreno" },
      ram: [8, 12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 200, front: 50, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 700000, geekbench: '1000/3000', tdMark: 3500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "honor-magic-v2",
    brand: "Honor",
    model: "Magic V2",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable LTPO OLED", size: 7.92, resolution: "2156 x 2344", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 2.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1500000, geekbench: '1600/5100', tdMark: 14500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "honor-200-pro",
    brand: "Honor",
    model: "200 Pro",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "OLED", size: 6.78, resolution: "1224 x 2700", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8s Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 735", brand: "Adreno" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 2.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1600000, geekbench: '1800/5500', tdMark: 15000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "huawei-mate-60-pro",
    brand: "Huawei",
    model: "Mate 60 Pro",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.82, resolution: "1212 x 2616", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Kirin 9000S", cpuBrand: "HiSilicon", cores: 8, architecture: 64 },
      gpu: { model: "Maleoon 910", brand: "Maleoon" },
      ram: [12],
      storage: { options: [256, 512, 1024], expandable: true },
      camera: { rear: 50, front: 13, opticalZoom: 3.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 900000, geekbench: '1300/4000', tdMark: 7000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "huawei-p60-pro",
    brand: "Huawei",
    model: "P60 Pro",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO OLED", size: 6.67, resolution: "1220 x 2700", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8+ Gen 1", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 730", brand: "Adreno" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: true },
      camera: { rear: 48, front: 13, opticalZoom: 3.5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4815, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1100000, geekbench: '1400/4200', tdMark: 10500 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "huawei-mate-x3",
    brand: "Huawei",
    model: "Mate X3",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Foldable OLED", size: 7.85, resolution: "2224 x 2496", refreshRate: 120, isFoldable: true },
      processor: { chipset: "Snapdragon 8+ Gen 1", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 730", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512, 1024], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4800, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1050000, geekbench: '1350/4100', tdMark: 10000 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "huawei-nova-11-pro",
    brand: "Huawei",
    model: "Nova 11 Pro",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.78, resolution: "1200 x 2652", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 778G 4G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 642L", brand: "Adreno" },
      ram: [8],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 60, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 530000, geekbench: '800/2900', tdMark: 2500 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "sony-xperia-1-v-alt",
    brand: "Sony",
    model: "Xperia 1 V",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.5, resolution: "1644 x 3840", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [12],
      storage: { options: [256, 512], expandable: true },
      camera: { rear: 48, front: 12, opticalZoom: 5.2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1400000, geekbench: '1500/5000', tdMark: 13000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "sony-xperia-5-v",
    brand: "Sony",
    model: "Xperia 5 V",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.1, resolution: "1080 x 2520", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Adreno" },
      ram: [8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 48, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1420000, geekbench: '1550/5100', tdMark: 13500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "sony-xperia-10-v",
    brand: "Sony",
    model: "Xperia 10 V",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED", size: 6.1, resolution: "1080 x 2520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 695", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Adreno" },
      ram: [6, 8],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 8, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 400000, geekbench: '900/2100', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }
  ,
  {
    id: "sony-xperia-pro-i",
    brand: "Sony",
    model: "Xperia PRO-I",
    os: "Android",
    releaseYear: 2021,
    specs: {
      screen: { type: "OLED", size: 6.5, resolution: "1644 x 3840", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 888", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 660", brand: "Adreno" },
      ram: [12],
      storage: { options: [512], expandable: true },
      camera: { rear: 12, front: 8, opticalZoom: 2.1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1100/3400', tdMark: 6000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  }

  ,
  {
    id: "apple-watch-series-9",
    deviceType: "smartwatch",
    brand: "Apple",
    model: "Watch Series 9",
    os: "watchOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Retina LTPO OLED", size: 1.9, resolution: "396 x 484", refreshRate: 60, isFoldable: false },
      processor: { chipset: "S9 SiP", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR", brand: "Apple" },
      ram: [1],
      storage: { options: [64], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 308, chargingTypes: ['Sem fio', 'Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "samsung-galaxy-watch-6-classic",
    deviceType: "smartwatch",
    brand: "Samsung",
    model: "Galaxy Watch 6 Classic",
    os: "Wear OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Super AMOLED", size: 1.5, resolution: "480 x 480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos W930", cpuBrand: "Samsung", cores: 2, architecture: 64 },
      gpu: { model: "Mali-G68", brand: "Mali" },
      ram: [2],
      storage: { options: [16], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 425, chargingTypes: ['Sem fio'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "garmin-fenix-7-pro",
    deviceType: "smartwatch",
    brand: "Garmin",
    model: "Fenix 7 Pro",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "MIP Transflective", size: 1.3, resolution: "260 x 260", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Garmin Custom", cpuBrand: "Garmin", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Garmin" },
      ram: [1],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 500, chargingTypes: ['Magnético', 'Solar'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "amazfit-gtr-4",
    deviceType: "smartwatch",
    brand: "Amazfit",
    model: "GTR 4",
    os: "Zepp OS",
    releaseYear: 2022,
    specs: {
      screen: { type: "AMOLED", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Dual-Core", cpuBrand: "Amazfit", cores: 2, architecture: 32 },
      gpu: { model: "Integrated", brand: "Amazfit" },
      ram: [1],
      storage: { options: [2], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 475, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "huawei-watch-gt-4",
    deviceType: "smartwatch",
    brand: "Huawei",
    model: "Watch GT 4",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Kirin A1", cpuBrand: "HiSilicon", cores: 2, architecture: 32 },
      gpu: { model: "Integrated", brand: "Huawei" },
      ram: [1],
      storage: { options: [4], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 524, chargingTypes: ['Sem fio'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "xiaomi-watch-2-pro",
    deviceType: "smartwatch",
    brand: "Xiaomi",
    model: "Watch 2 Pro",
    os: "Wear OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5+ Gen 1", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A702", brand: "Adreno" },
      ram: [2],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 495, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "apple-watch-ultra-2",
    deviceType: "smartwatch",
    brand: "Apple",
    model: "Watch Ultra 2",
    os: "watchOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Retina LTPO OLED", size: 1.92, resolution: "502 x 410", refreshRate: 60, isFoldable: false },
      processor: { chipset: "S9 SiP", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR", brand: "Apple" },
      ram: [1],
      storage: { options: [64], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 564, chargingTypes: ['Sem fio', 'Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }

  ,
  {
    id: "samsung-galaxy-watch-5-pro",
    deviceType: "smartwatch",
    brand: "Samsung",
    model: "Galaxy Watch 5 Pro",
    os: "Wear OS",
    releaseYear: 2022,
    specs: {
      screen: { type: "Super AMOLED", size: 1.4, resolution: "450 x 450", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Exynos W920", cpuBrand: "Samsung", cores: 2, architecture: 64 },
      gpu: { model: "Mali-G68", brand: "Mali" },
      ram: [1.5],
      storage: { options: [16], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 590, chargingTypes: ['Sem fio'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "garmin-epix-pro-gen-2",
    deviceType: "smartwatch",
    brand: "Garmin",
    model: "Epix Pro (Gen 2)",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.3, resolution: "416 x 416", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Garmin Custom", cpuBrand: "Garmin", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Garmin" },
      ram: [1],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 400, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "apple-watch-se-2",
    deviceType: "smartwatch",
    brand: "Apple",
    model: "Watch SE (2022)",
    os: "watchOS",
    releaseYear: 2022,
    specs: {
      screen: { type: "Retina LTPO OLED", size: 1.78, resolution: "448 x 368", refreshRate: 60, isFoldable: false },
      processor: { chipset: "S8 SiP", cpuBrand: "Apple", cores: 2, architecture: 64 },
      gpu: { model: "PowerVR", brand: "Apple" },
      ram: [1],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 296, chargingTypes: ['Sem fio', 'Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "google-pixel-watch-2",
    deviceType: "smartwatch",
    brand: "Google",
    model: "Pixel Watch 2",
    os: "Wear OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.2, resolution: "384 x 384", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5 Gen 1", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A702", brand: "Adreno" },
      ram: [2],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 306, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "huawei-watch-ultimate",
    deviceType: "smartwatch",
    brand: "Huawei",
    model: "Watch Ultimate",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPO AMOLED", size: 1.5, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Kirin A1", cpuBrand: "HiSilicon", cores: 2, architecture: 32 },
      gpu: { model: "Integrated", brand: "Huawei" },
      ram: [1],
      storage: { options: [4], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 530, chargingTypes: ['Sem fio'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "amazfit-t-rex-ultra",
    deviceType: "smartwatch",
    brand: "Amazfit",
    model: "T-Rex Ultra",
    os: "Zepp OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.39, resolution: "454 x 454", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Dual-Core", cpuBrand: "Amazfit", cores: 2, architecture: 32 },
      gpu: { model: "Integrated", brand: "Amazfit" },
      ram: [1],
      storage: { options: [4], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 500, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "ticwatch-pro-5",
    deviceType: "smartwatch",
    brand: "Mobvoi",
    model: "TicWatch Pro 5",
    os: "Wear OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED + ULP Display", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5+ Gen 1", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A702", brand: "Adreno" },
      ram: [2],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 628, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "oneplus-watch-2",
    deviceType: "smartwatch",
    brand: "OnePlus",
    model: "Watch 2",
    os: "Wear OS + RTOS",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5 + BES2700", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A702", brand: "Adreno" },
      ram: [2],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 500, chargingTypes: ['Magnético', 'VOOC'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "withings-scanwatch-2",
    deviceType: "smartwatch",
    brand: "Withings",
    model: "ScanWatch 2",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED + Analog", size: 0.63, resolution: "282 ppi", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Custom", cpuBrand: "Withings", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Withings" },
      ram: [0.5],
      storage: { options: [1], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 150, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: false, hasNfc: false, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "garmin-venu-3",
    deviceType: "smartwatch",
    brand: "Garmin",
    model: "Venu 3",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.4, resolution: "454 x 454", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Garmin Custom", cpuBrand: "Garmin", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Garmin" },
      ram: [1],
      storage: { options: [8], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 400, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "huawei-watch-fit-3",
    deviceType: "smartwatch",
    brand: "Huawei",
    model: "Watch Fit 3",
    os: "HarmonyOS",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED", size: 1.82, resolution: "480 x 408", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Kirin Custom", cpuBrand: "HiSilicon", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Huawei" },
      ram: [1],
      storage: { options: [4], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 400, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "xiaomi-smart-band-8-pro",
    deviceType: "smartwatch",
    brand: "Xiaomi",
    model: "Smart Band 8 Pro",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.74, resolution: "336 x 480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Custom", cpuBrand: "Xiaomi", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Xiaomi" },
      ram: [0.5],
      storage: { options: [1], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 289, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: true, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  }
  ,
  {
    id: "polar-vantage-v3",
    deviceType: "smartwatch",
    brand: "Polar",
    model: "Vantage V3",
    os: "Proprietary OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED", size: 1.39, resolution: "454 x 454", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Custom 275MHz", cpuBrand: "Polar", cores: 1, architecture: 32 },
      gpu: { model: "Integrated", brand: "Polar" },
      ram: [0.5],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 488, chargingTypes: ['Magnético'] },
      performance: { antutu: 0, geekbench: '0/0', tdMark: 0 },
      features: { hasGps: true, hasNfc: false, network: '3G', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "apple-ipad-10",
    deviceType: "tablet",
    brand: "Apple",
    model: "iPad 10.9 (10ª Geração - Wi-Fi)",
    os: "iPadOS",
    releaseYear: 2022,
    specs: {
      screen: { type: "Liquid Retina IPS LCD", size: 10.9, resolution: "1640 x 2360", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A14 Bionic", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple GPU 4-Core", brand: "Apple" },
      ram: [4],
      storage: { options: [64, 256], expandable: false },
      camera: { rear: 12, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 7606, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 730000, geekbench: '2100/4900', tdMark: 8200 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "apple-ipad-air-m2",
    deviceType: "tablet",
    brand: "Apple",
    model: "iPad Air 11 (M2 - Wi-Fi)",
    os: "iPadOS",
    releaseYear: 2024,
    specs: {
      screen: { type: "Liquid Retina IPS LCD", size: 11.0, resolution: "1640 x 2360", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple M2", cpuBrand: "Apple", cores: 8, architecture: 64 },
      gpu: { model: "Apple GPU 10-Core", brand: "Apple" },
      ram: [8],
      storage: { options: [128, 256, 512, 1024], expandable: false },
      camera: { rear: 12, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 7606, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1450000, geekbench: '2600/10000', tdMark: 14500 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "apple-ipad-pro-11-m4",
    deviceType: "tablet",
    brand: "Apple",
    model: "iPad Pro 11 (M4 - Wi-Fi)",
    os: "iPadOS",
    releaseYear: 2024,
    specs: {
      screen: { type: "Ultra Retina Tandem OLED", size: 11.0, resolution: "1668 x 2420", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Apple M4", cpuBrand: "Apple", cores: 9, architecture: 64 },
      gpu: { model: "Apple GPU 10-Core", brand: "Apple" },
      ram: [8, 16],
      storage: { options: [256, 512, 1024, 2048], expandable: false },
      camera: { rear: 12, front: 12, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 8160, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2500000, geekbench: '3700/14500', tdMark: 19000 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "apple-ipad-mini-6",
    deviceType: "tablet",
    brand: "Apple",
    model: "iPad Mini 6 (Wi-Fi)",
    os: "iPadOS",
    releaseYear: 2021,
    specs: {
      screen: { type: "Liquid Retina IPS LCD", size: 8.3, resolution: "1488 x 2266", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Apple A15 Bionic", cpuBrand: "Apple", cores: 6, architecture: 64 },
      gpu: { model: "Apple GPU 5-Core", brand: "Apple" },
      ram: [4],
      storage: { options: [64, 256], expandable: false },
      camera: { rear: 12, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 5124, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '2100/5400', tdMark: 9000 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-tab-s9-ultra",
    deviceType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S9 Ultra (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Dynamic AMOLED 2X", size: 14.6, resolution: "1848 x 2960", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2 for Galaxy", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: true },
      camera: { rear: 13, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 11200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1550000, geekbench: '2100/5600', tdMark: 14000 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-tab-s9",
    deviceType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S9 (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "Dynamic AMOLED 2X", size: 11.0, resolution: "1600 x 2560", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2 for Galaxy", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Qualcomm" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 13, front: 12, opticalZoom: 1, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 8400, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1530000, geekbench: '2050/5500', tdMark: 13800 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-tab-s9-fe",
    deviceType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab S9 FE (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 10.9, resolution: "1440 x 2304", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Exynos 1380", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MP5", brand: "Mali" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 8, front: 12, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: false, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 8000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 540000, geekbench: '1000/2800', tdMark: 3200 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-tab-a9-plus",
    deviceType: "tablet",
    brand: "Samsung",
    model: "Galaxy Tab A9+ (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "TFT LCD", size: 11.0, resolution: "1200 x 1920", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Snapdragon 695 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Qualcomm" },
      ram: [4, 8],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 8, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 7040, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 410000, geekbench: '900/2000', tdMark: 1800 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-pad-6",
    deviceType: "tablet",
    brand: "Xiaomi",
    model: "Pad 6 (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 144Hz", size: 11.0, resolution: "1800 x 2880", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 870", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 650", brand: "Qualcomm" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 105, touchFocus: true },
      battery: { capacity: 8840, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 800000, geekbench: '1300/3400', tdMark: 5500 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "xiaomi-pad-6s-pro",
    deviceType: "tablet",
    brand: "Xiaomi",
    model: "Pad 6S Pro 12.4 (Wi-Fi)",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 3K 144Hz", size: 12.4, resolution: "2032 x 3048", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 740", brand: "Qualcomm" },
      ram: [8, 12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 105, touchFocus: true },
      battery: { capacity: 10000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1600000, geekbench: '2100/5600', tdMark: 14200 },
      features: { hasGps: false, hasNfc: true, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lenovo-tab-p12",
    deviceType: "tablet",
    brand: "Lenovo",
    model: "Tab P12 (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "LTPS LCD 3K", size: 12.7, resolution: "1840 x 2944", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Dimensity 7050", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 8, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: false, maxFocusAngle: 102, touchFocus: true },
      battery: { capacity: 10200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 560000, geekbench: '950/2400', tdMark: 2800 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lenovo-tab-m11",
    deviceType: "tablet",
    brand: "Lenovo",
    model: "Tab M11 (Wi-Fi)",
    os: "Android",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 90Hz", size: 11.0, resolution: "1200 x 1920", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Helio G88", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 8, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 7040, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 270000, geekbench: '400/1400', tdMark: 1200 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "amazon-fire-hd-10",
    deviceType: "tablet",
    brand: "Amazon",
    model: "Fire HD 10 (2023 - Wi-Fi)",
    os: "Fire OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 10.1, resolution: "1200 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8186A", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 5, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 6500, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 300000, geekbench: '450/1500', tdMark: 1300 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "google-pixel-tablet",
    deviceType: "tablet",
    brand: "Google",
    model: "Pixel Tablet (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 10.95, resolution: "1600 x 2560", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Google Tensor G2", cpuBrand: "Google", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MP7", brand: "Mali" },
      ram: [8],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 8, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 84, touchFocus: true },
      battery: { capacity: 7020, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 830000, geekbench: '1400/3500', tdMark: 6500 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "oneplus-pad",
    deviceType: "tablet",
    brand: "OnePlus",
    model: "Pad (Wi-Fi)",
    os: "Android",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 144Hz", size: 11.61, resolution: "2000 x 2800", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Dimensity 9000", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G710 MC10", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 9510, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 1050000, geekbench: '1700/4400', tdMark: 9800 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "huawei-matepad-pro-13",
    deviceType: "tablet",
    brand: "Huawei",
    model: "MatePad Pro 13.2 (Wi-Fi)",
    os: "HarmonyOS",
    releaseYear: 2023,
    specs: {
      screen: { type: "OLED 144Hz", size: 13.2, resolution: "1920 x 2880", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Kirin 9000S", cpuBrand: "HiSilicon", cores: 8, architecture: 64 },
      gpu: { model: "Maleoon 910", brand: "HiSilicon" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 13, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 95, touchFocus: true },
      battery: { capacity: 10100, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 950000, geekbench: '1300/4100', tdMark: 7200 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS MOTOROLA ---
  {
    id: "moto-g17",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Motorola",
    model: "Moto G17",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "IPS LCD", size: 6.6, resolution: "720 x 1612", refreshRate: 90, isFoldable: false },
      processor: { chipset: "MediaTek Helio G85", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [4, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 270000, geekbench: '420/1450', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-razr-60-ultra",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Motorola",
    model: "Razr 60 Ultra",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "Foldable LTPO AMOLED 165Hz", size: 6.9, resolution: "1080 x 2640", refreshRate: 165, isFoldable: true },
      processor: { chipset: "Snapdragon 8s Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 735", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 110, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1650000, geekbench: '2100/6400', tdMark: 14500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-60-fusion-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Edge 60 Fusion 5G",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "P-OLED Curvado 144Hz", size: 6.7, resolution: "1080 x 2400", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 7s Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 710", brand: "Qualcomm" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 680000, geekbench: '1020/2950', tdMark: 4800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-60-pro",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Motorola",
    model: "Edge 60 Pro",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "P-OLED 144Hz HDR10+", size: 6.7, resolution: "1220 x 2712", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8s Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 735", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 122, touchFocus: true },
      battery: { capacity: 4500, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 1520000, geekbench: '2050/5800', tdMark: 13200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-70",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Edge 70",
    os: "Android",
    osVersion: "Android 16 / Hello UI",
    releaseYear: 2026,
    specs: {
      screen: { type: "P-OLED 144Hz", size: 6.7, resolution: "1080 x 2400", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 7 Gen 4", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 725", brand: "Qualcomm" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 980000, geekbench: '1350/3900', tdMark: 7500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-70-fusion-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Edge 70 Fusion 5G",
    os: "Android",
    osVersion: "Android 16 / Hello UI",
    releaseYear: 2026,
    specs: {
      screen: { type: "P-OLED 144Hz", size: 6.7, resolution: "1080 x 2400", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Dimensity 7400 5G", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G615 MC2", brand: "Mali" },
      ram: [8, 12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 780000, geekbench: '1150/3200', tdMark: 5400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-edge-70-pro",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Motorola",
    model: "Edge 70 Pro",
    os: "Android",
    osVersion: "Android 16 / Hello UI",
    releaseYear: 2026,
    specs: {
      screen: { type: "P-OLED 165Hz HDR10+", size: 6.78, resolution: "1440 x 3120", refreshRate: 165, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Elite", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 830", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 50, front: 50, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 125, touchFocus: true },
      battery: { capacity: 5100, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2850000, geekbench: '3100/9800', tdMark: 21000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-razr-70-ultra",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Motorola",
    model: "Razr 70 Ultra",
    os: "Android",
    osVersion: "Android 16 / Hello UI",
    releaseYear: 2026,
    specs: {
      screen: { type: "Foldable LTPO P-OLED 165Hz", size: 6.9, resolution: "1080 x 2640", refreshRate: 165, isFoldable: true },
      processor: { chipset: "Snapdragon 8 Elite", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 830", brand: "Qualcomm" },
      ram: [16],
      storage: { options: [512, 1024], expandable: false },
      camera: { rear: 50, front: 32, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4300, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2750000, geekbench: '3000/9500', tdMark: 20000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g06",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Motorola",
    model: "Moto G06",
    os: "Android",
    osVersion: "Android 15 (Go Edition)",
    releaseYear: 2025,
    specs: {
      screen: { type: "IPS LCD 90Hz", size: 6.56, resolution: "720 x 1612", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Unisoc T606", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MP1", brand: "Mali" },
      ram: [4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 16, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 78, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 240000, geekbench: '380/1320', tdMark: 1000 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g56-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G56 5G",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.6, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 7025 5G", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "IMG BXM-8-256", brand: "Imagination" },
      ram: [8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 82, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 520000, geekbench: '820/2300', tdMark: 3100 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g84-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G84 5G",
    os: "Android",
    osVersion: "Android 13 / 14",
    releaseYear: 2023,
    specs: {
      screen: { type: "P-OLED 120Hz", size: 6.55, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 695 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Qualcomm" },
      ram: [8, 12],
      storage: { options: [256], expandable: true },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 430000, geekbench: '680/1950', tdMark: 2400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "moto-g86-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Motorola",
    model: "Moto G86 5G",
    os: "Android",
    osVersion: "Android 15 / Hello UI",
    releaseYear: 2025,
    specs: {
      screen: { type: "P-OLED 120Hz", size: 6.67, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 7s Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 710", brand: "Qualcomm" },
      ram: [12],
      storage: { options: [256, 512], expandable: true },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 650000, geekbench: '980/2800', tdMark: 4400 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "motorola-signature-5g",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Motorola",
    model: "Motorola Signature 5G",
    os: "Android",
    osVersion: "Android 16 / Hello UI",
    releaseYear: 2026,
    specs: {
      screen: { type: "P-OLED Quad-Curved 165Hz HDR10+", size: 6.8, resolution: "1440 x 3200", refreshRate: 165, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Elite Ultra", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 830", brand: "Qualcomm" },
      ram: [16, 24],
      storage: { options: [512, 1024], expandable: false },
      camera: { rear: 200, front: 60, opticalZoom: 10, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 130, touchFocus: true },
      battery: { capacity: 5500, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 3100000, geekbench: '3200/10200', tdMark: 23500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS LG ---
  {
    id: "lg-g7-thinq",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "LG",
    model: "G7 ThinQ",
    os: "Android",
    osVersion: "Android 8.0 (Atualizável para 10)",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD Super Bright", size: 6.1, resolution: "1440 x 3120", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 845", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 630", brand: "Qualcomm" },
      ram: [4, 6],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 16, front: 8, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 107, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 340000, geekbench: '520/2100', tdMark: 2800 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-g8s-thinq",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "LG",
    model: "G85 ThinQ (G8s ThinQ)",
    os: "Android",
    osVersion: "Android 9.0 (Atualizável para 11)",
    releaseYear: 2019,
    specs: {
      screen: { type: "OLED FullVision", size: 6.21, resolution: "1080 x 2248", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 855", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 640", brand: "Qualcomm" },
      ram: [6],
      storage: { options: [128], expandable: true },
      camera: { rear: 12, front: 8, opticalZoom: 2, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 137, touchFocus: true },
      battery: { capacity: 3550, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 450000, geekbench: '710/2600', tdMark: 3500 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-g8x-thinq",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "LG",
    model: "G8X ThinQ",
    os: "Android",
    osVersion: "Android 9.0 (Atualizável para 12)",
    releaseYear: 2019,
    specs: {
      screen: { type: "OLED (Dual Screen Suporte)", size: 6.4, resolution: "1080 x 2340", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 855", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 640", brand: "Qualcomm" },
      ram: [6],
      storage: { options: [128], expandable: true },
      camera: { rear: 12, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 136, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 470000, geekbench: '730/2700', tdMark: 3700 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k10-2017",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K10",
    os: "Android",
    osVersion: "Android 7.0 Nougat",
    releaseYear: 2017,
    specs: {
      screen: { type: "IPS LCD", size: 5.3, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6750", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-T860 MP2", brand: "Mali" },
      ram: [2],
      storage: { options: [16, 32], expandable: true },
      camera: { rear: 13, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 2800, chargingTypes: ['Micro USB'] },
      performance: { antutu: 65000, geekbench: '130/500', tdMark: 350 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k11",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K11",
    os: "Android",
    osVersion: "Android 7.1.2 Nougat",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD", size: 5.3, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6750", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-T860 MP2", brand: "Mali" },
      ram: [2],
      storage: { options: [16], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro USB'] },
      performance: { antutu: 68000, geekbench: '135/520', tdMark: 380 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k11-plus",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K11+",
    os: "Android",
    osVersion: "Android 7.1.2 Nougat",
    releaseYear: 2018,
    specs: {
      screen: { type: "IPS LCD", size: 5.3, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6750", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-T860 MP2", brand: "Mali" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro USB'] },
      performance: { antutu: 72000, geekbench: '140/550', tdMark: 400 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: true, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k12",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K12",
    os: "Android",
    osVersion: "Android 8.1 Oreo",
    releaseYear: 2019,
    specs: {
      screen: { type: "IPS LCD", size: 5.7, resolution: "720 x 1440", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 16, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro USB'] },
      performance: { antutu: 85000, geekbench: '150/780', tdMark: 450 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k12-max",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K12 MAX",
    os: "Android",
    osVersion: "Android 9.0 Pie",
    releaseYear: 2019,
    specs: {
      screen: { type: "IPS LCD", size: 6.26, resolution: "720 x 1520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 3500, chargingTypes: ['Micro USB'] },
      performance: { antutu: 88000, geekbench: '155/800', tdMark: 470 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k12-prime",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "LG",
    model: "K12 Prime",
    os: "Android",
    osVersion: "Android 9.0 Pie",
    releaseYear: 2019,
    specs: {
      screen: { type: "IPS LCD", size: 6.26, resolution: "720 x 1520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [64], expandable: true },
      camera: { rear: 16, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 3500, chargingTypes: ['Micro USB'] },
      performance: { antutu: 90000, geekbench: '160/820', tdMark: 490 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k22",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K22",
    os: "Android",
    osVersion: "Android 10 (Go Edition)",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.2, resolution: "720 x 1520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Qualcomm QM215", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno 308", brand: "Qualcomm" },
      ram: [2],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 78, touchFocus: true },
      battery: { capacity: 3000, chargingTypes: ['Micro USB'] },
      performance: { antutu: 55000, geekbench: '100/320', tdMark: 280 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k35",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K35",
    os: "Android",
    osVersion: "Android 10",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.5, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 95000, geekbench: '165/850', tdMark: 510 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k41",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K41",
    os: "Android",
    osVersion: "Android 9.0 (Atualizável para 10)",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.5, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 92000, geekbench: '160/830', tdMark: 500 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k41s",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K41S",
    os: "Android",
    osVersion: "Android 9.0 Pie",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.55, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 94000, geekbench: '162/840', tdMark: 505 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k50s",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K50s",
    os: "Android",
    osVersion: "Android 9.0 Pie",
    releaseYear: 2019,
    specs: {
      screen: { type: "IPS LCD", size: 6.5, resolution: "720 x 1520", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P22", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [32], expandable: true },
      camera: { rear: 13, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['Micro USB'] },
      performance: { antutu: 91000, geekbench: '158/825', tdMark: 495 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k52",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "LG",
    model: "K52",
    os: "Android",
    osVersion: "Android 10",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.6, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P23", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [3],
      storage: { options: [64], expandable: true },
      camera: { rear: 48, front: 13, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 105000, geekbench: '180/920', tdMark: 580 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k62",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "LG",
    model: "K62",
    os: "Android",
    osVersion: "Android 10",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD", size: 6.6, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P35", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 48, front: 28, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 115, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 115000, geekbench: '195/1020', tdMark: 650 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-k71",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "LG",
    model: "K71",
    os: "Android",
    osVersion: "Android 10",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD (Stylus Pen)", size: 6.8, resolution: "1080 x 2460", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P35", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "PowerVR GE8320", brand: "PowerVR" },
      ram: [4],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 32, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 120000, geekbench: '200/1050', tdMark: 680 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "lg-velvet-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "LG",
    model: "Velvet 5G",
    os: "Android",
    osVersion: "Android 10 (Atualizável para 12)",
    releaseYear: 2020,
    specs: {
      screen: { type: "P-OLED Curvado", size: 6.8, resolution: "1080 x 2460", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon 765G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 620", brand: "Qualcomm" },
      ram: [6, 8],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4300, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 380000, geekbench: '610/1900', tdMark: 2200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS SAMSUNG & APPLE ---
  {
    id: "samsung-galaxy-a57",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Samsung",
    model: "Galaxy A57 5G",
    os: "Android",
    osVersion: "One UI 8.0 (Android 16)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Super AMOLED 120Hz", size: 6.6, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Exynos 1580", cpuBrand: "Samsung", cores: 8, architecture: 64 },
      gpu: { model: "Xclipse 540", brand: "AMD RDNA" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 50, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 820000, geekbench: '1220/3500', tdMark: 5800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-s26",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Samsung",
    model: "Galaxy S26 5G",
    os: "Android",
    osVersion: "One UI 8.1 (Android 16)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Dynamic AMOLED 2X 120Hz LTPO", size: 6.36, resolution: "1080 x 2340", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Elite Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 840", brand: "Qualcomm" },
      ram: [12],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 12, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4200, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 2600000, geekbench: '3100/9400', tdMark: 19500 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "samsung-galaxy-s26-ultra",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Samsung",
    model: "Galaxy S26 Ultra",
    os: "Android",
    osVersion: "One UI 8.1 (Android 16)",
    releaseYear: 2026,
    specs: {
      screen: { type: "Dynamic AMOLED 2X Flat 144Hz LTPO", size: 6.9, resolution: "1440 x 3120", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Elite Gen 2 for Galaxy", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 840", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512, 1024], expandable: false },
      camera: { rear: 200, front: 12, opticalZoom: 5, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 5500, chargingTypes: ['USB tipo C', 'Sem fio', 'Turbo'] },
      performance: { antutu: 3150000, geekbench: '3400/10500', tdMark: 24000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS MOBVOI ---
  {
    id: "mobvoi-ticwatch-pro-5-enduro",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Mobvoi",
    model: "TicWatch Pro 5 Enduro",
    os: "Wear OS",
    osVersion: "Wear OS 3.5",
    releaseYear: 2024,
    specs: {
      screen: { type: "OLED Dual Display (Ultra-low Power)", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5+ Gen 1", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A702", brand: "Qualcomm" },
      ram: [2],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 628, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 180000, geekbench: '280/850', tdMark: 800 },
      features: { hasGps: true, hasNfc: true, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "mobvoi-ticwatch-pro-3-ultra-gps",
    deviceType: "smartwatch",
    categoryTier: "intermediário",
    brand: "Mobvoi",
    model: "TicWatch Pro 3 Ultra GPS",
    os: "Wear OS",
    osVersion: "Wear OS 3.0",
    releaseYear: 2021,
    specs: {
      screen: { type: "AMOLED + FSTN Dual Display", size: 1.4, resolution: "454 x 454", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon Wear 4100", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno 504", brand: "Qualcomm" },
      ram: [1],
      storage: { options: [8], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 577, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 120000, geekbench: '210/620', tdMark: 500 },
      features: { hasGps: true, hasNfc: true, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "mobvoi-ticwatch-e3",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Mobvoi",
    model: "TicWatch E3",
    os: "Wear OS",
    osVersion: "Wear OS 3.0",
    releaseYear: 2021,
    specs: {
      screen: { type: "HD 2.5D Glass Display", size: 1.3, resolution: "360 x 360", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon Wear 4100", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno 504", brand: "Qualcomm" },
      ram: [1],
      storage: { options: [8], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 380, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 110000, geekbench: '190/580', tdMark: 450 },
      features: { hasGps: true, hasNfc: true, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "mobvoi-ticwatch-gth-2",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Mobvoi",
    model: "TicWatch GTH 2",
    os: "Proprietary OS",
    releaseYear: 2022,
    specs: {
      screen: { type: "TFT HD Touchscreen", size: 1.72, resolution: "356 x 400", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Realtek RTL8762D", cpuBrand: "Realtek", cores: 1, architecture: 32 },
      gpu: { model: "Integrated 2D GPU", brand: "Realtek" },
      ram: [0.5],
      storage: { options: [1], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 260, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 25000, geekbench: '50/150', tdMark: 100 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "mobvoi-ticwatch-pro-6",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Mobvoi",
    model: "TicWatch Pro 6",
    os: "Wear OS",
    osVersion: "Wear OS 5.0",
    releaseYear: 2026,
    specs: {
      screen: { type: "Dual Layer OLED LTPO Ultra-bright", size: 1.47, resolution: "480 x 480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Snapdragon W5+ Gen 2", cpuBrand: "Qualcomm", cores: 4, architecture: 64 },
      gpu: { model: "Adreno A710", brand: "Qualcomm" },
      ram: [2],
      storage: { options: [64], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 680, chargingTypes: ['Carregador Magnético', 'Sem fio'] },
      performance: { antutu: 220000, geekbench: '350/1100', tdMark: 1200 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 1, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['eSIM'], hasCompass: true, hasUsbOtg: false }
    }
  },

  // --- NOVOS MODELOS ACER ---
  {
    id: "acer-iconia-tab-p11",
    deviceType: "tablet",
    categoryTier: "intermediário",
    brand: "Acer",
    model: "Iconia Tab P11 (Wi-Fi)",
    os: "Android",
    osVersion: "Android 14",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 90Hz", size: 11.0, resolution: "2000 x 1200", refreshRate: 90, isFoldable: false },
      processor: { chipset: "MediaTek Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 13, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 8000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 420000, geekbench: '720/2000', tdMark: 2500 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "acer-iconia-tab-m10",
    deviceType: "tablet",
    categoryTier: "entrada",
    brand: "Acer",
    model: "Iconia Tab M10 (Wi-Fi)",
    os: "Android",
    osVersion: "Android 13",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 10.1, resolution: "1920 x 1200", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Kompanio 500", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 8, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 6000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 250000, geekbench: '380/1300', tdMark: 1100 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "acer-predator-shot-5g",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Acer",
    model: "Predator Shot 5G",
    os: "Android",
    osVersion: "Android 15 (Predator Gaming OS)",
    releaseYear: 2025,
    specs: {
      screen: { type: "AMOLED Gaming 165Hz", size: 6.78, resolution: "1080 x 2440", refreshRate: 165, isFoldable: false },
      processor: { chipset: "Snapdragon 8 Gen 3", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 750", brand: "Qualcomm" },
      ram: [12, 16],
      storage: { options: [256, 512], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '8K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 6500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 2100000, geekbench: '2300/7100', tdMark: 18000 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "acer-liquid-jade-z",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Acer",
    model: "Liquid Jade Z",
    os: "Android",
    osVersion: "Android 5.0 Lollipop",
    releaseYear: 2015,
    specs: {
      screen: { type: "IPS LCD Zero Air Gap", size: 5.0, resolution: "720 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT6732", cpuBrand: "MediaTek", cores: 4, architecture: 64 },
      gpu: { model: "Mali-T760MP2", brand: "Mali" },
      ram: [1, 2],
      storage: { options: [8, 16], expandable: true },
      camera: { rear: 13, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 2300, chargingTypes: ['Micro USB'] },
      performance: { antutu: 32000, geekbench: '80/300', tdMark: 180 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "acer-iconia-tab-10",
    deviceType: "tablet",
    categoryTier: "intermediário",
    brand: "Acer",
    model: "Iconia Tab 10 A3-A50",
    os: "Android",
    osVersion: "Android 7.0 Nougat",
    releaseYear: 2017,
    specs: {
      screen: { type: "IPS LCD Quantum Dot", size: 10.1, resolution: "1200 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8176", cpuBrand: "MediaTek", cores: 6, architecture: 64 },
      gpu: { model: "PowerVR GX6250", brand: "PowerVR" },
      ram: [4],
      storage: { options: [64], expandable: true },
      camera: { rear: 5, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 6600, chargingTypes: ['Micro USB'] },
      performance: { antutu: 80000, geekbench: '140/600', tdMark: 400 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS AMAZFIT ---
  {
    id: "amazfit-t-rex-3",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Amazfit",
    model: "T-Rex 3",
    os: "Zepp OS",
    osVersion: "Zepp OS 4.0",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED Outdoor 2000 nits", size: 1.5, resolution: "480 x 480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Huangshan 2S Dual-Core", cpuBrand: "Huami", cores: 2, architecture: 32 },
      gpu: { model: "Zepp GPU 2", brand: "Huami" },
      ram: [0.5],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 700, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 40000, geekbench: '80/280', tdMark: 200 },
      features: { hasGps: true, hasNfc: true, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "amazfit-cheetah-pro",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Amazfit",
    model: "Cheetah Pro",
    os: "Zepp OS",
    osVersion: "Zepp OS 3.0",
    releaseYear: 2023,
    specs: {
      screen: { type: "AMOLED 1000 nits", size: 1.45, resolution: "480 x 480", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Huangshan 2S", cpuBrand: "Huami", cores: 2, architecture: 32 },
      gpu: { model: "Zepp GPU", brand: "Huami" },
      ram: [0.5],
      storage: { options: [4], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 440, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 35000, geekbench: '70/250', tdMark: 180 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "amazfit-gts-4",
    deviceType: "smartwatch",
    categoryTier: "intermediário",
    brand: "Amazfit",
    model: "GTS 4",
    os: "Zepp OS",
    osVersion: "Zepp OS 2.0",
    releaseYear: 2022,
    specs: {
      screen: { type: "AMOLED HD", size: 1.75, resolution: "390 x 450", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Huangshan 2S", cpuBrand: "Huami", cores: 2, architecture: 32 },
      gpu: { model: "Zepp GPU", brand: "Huami" },
      ram: [0.5],
      storage: { options: [2.3], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 300, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 30000, geekbench: '60/220', tdMark: 150 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "amazfit-gtr-4-v2",
    deviceType: "smartwatch",
    categoryTier: "intermediário",
    brand: "Amazfit",
    model: "GTR 4",
    os: "Zepp OS",
    osVersion: "Zepp OS 2.0",
    releaseYear: 2022,
    specs: {
      screen: { type: "AMOLED Anti-glare Glass", size: 1.43, resolution: "466 x 466", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Huangshan 2S", cpuBrand: "Huami", cores: 2, architecture: 32 },
      gpu: { model: "Zepp GPU", brand: "Huami" },
      ram: [0.5],
      storage: { options: [2.3], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 475, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 32000, geekbench: '65/230', tdMark: 160 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "amazfit-bip-5-unity",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Amazfit",
    model: "Bip 5 Unity",
    os: "Zepp OS",
    osVersion: "Zepp OS 3.0",
    releaseYear: 2024,
    specs: {
      screen: { type: "TFT HD Curved Glass", size: 1.91, resolution: "320 x 380", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Huangshan 2S Micro", cpuBrand: "Huami", cores: 1, architecture: 32 },
      gpu: { model: "Zepp Lite GPU", brand: "Huami" },
      ram: [0.25],
      storage: { options: [0.5], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 300, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 20000, geekbench: '40/120', tdMark: 90 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },

  // --- NOVOS MODELOS AMAZON ---
  {
    id: "amazon-fire-max-11",
    deviceType: "tablet",
    categoryTier: "intermediário",
    brand: "Amazon",
    model: "Fire Max 11 (Wi-Fi)",
    os: "Fire OS",
    osVersion: "Fire OS 8",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 2K", size: 11.0, resolution: "2000 x 1200", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8188J", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 8, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 7500, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 380000, geekbench: '680/1850', tdMark: 2200 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "amazon-fire-hd-8-plus",
    deviceType: "tablet",
    categoryTier: "entrada",
    brand: "Amazon",
    model: "Fire HD 8 Plus (2022 - Wi-Fi)",
    os: "Fire OS",
    osVersion: "Fire OS 8",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 8.0, resolution: "800 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8169A", cpuBrand: "MediaTek", cores: 6, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 5, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 70, touchFocus: true },
      battery: { capacity: 4850, chargingTypes: ['USB tipo C', 'Sem fio'] },
      performance: { antutu: 190000, geekbench: '290/980', tdMark: 850 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "amazon-fire-7-2022",
    deviceType: "tablet",
    categoryTier: "entrada",
    brand: "Amazon",
    model: "Fire 7 (2022 - Wi-Fi)",
    os: "Fire OS",
    osVersion: "Fire OS 8",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD", size: 7.0, resolution: "600 x 1024", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8168V", cpuBrand: "MediaTek", cores: 4, architecture: 64 },
      gpu: { model: "Mali-G52 MC1", brand: "Mali" },
      ram: [2],
      storage: { options: [16, 32], expandable: true },
      camera: { rear: 2, front: 2, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 70, touchFocus: true },
      battery: { capacity: 3750, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 130000, geekbench: '180/620', tdMark: 500 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "amazon-fire-hd-10-kids-pro",
    deviceType: "tablet",
    categoryTier: "entrada",
    brand: "Amazon",
    model: "Fire HD 10 Kids Pro (2023 - Wi-Fi)",
    os: "Fire OS",
    osVersion: "Fire OS 8",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD Full HD", size: 10.1, resolution: "1200 x 1920", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek MT8186A", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G52 MC2", brand: "Mali" },
      ram: [3],
      storage: { options: [32, 64], expandable: true },
      camera: { rear: 5, front: 5, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 75, touchFocus: true },
      battery: { capacity: 6500, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 300000, geekbench: '450/1500', tdMark: 1300 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: false, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: true }
    }
  },
  {
    id: "amazon-fire-max-13-pro",
    deviceType: "tablet",
    categoryTier: "topo de linha",
    brand: "Amazon",
    model: "Fire Max 13 Pro (Wi-Fi)",
    os: "Fire OS",
    osVersion: "Fire OS 9",
    releaseYear: 2026,
    specs: {
      screen: { type: "IPS LCD 120Hz 2.5K", size: 13.0, resolution: "2560 x 1600", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Kompanio 900T", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G68 MC4", brand: "Mali" },
      ram: [8],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 13, front: 8, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 85, touchFocus: true },
      battery: { capacity: 9000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 750000, geekbench: '1100/3100', tdMark: 5200 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS NOKIA ---
  {
    id: "nokia-xr21-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Nokia",
    model: "Nokia XR21 5G (Rugged)",
    os: "Android",
    osVersion: "Android 13 (Atualizável para 15)",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 120Hz Gorilla Glass Victus", size: 6.49, resolution: "1080 x 2400", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Snapdragon 695 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Qualcomm" },
      ram: [6],
      storage: { options: [128], expandable: false },
      camera: { rear: 64, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 4800, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 420000, geekbench: '670/1920', tdMark: 2350 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nokia-g42-5g",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Nokia",
    model: "Nokia G42 5G",
    os: "Android",
    osVersion: "Android 13",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 90Hz", size: 6.56, resolution: "720 x 1612", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Snapdragon 480+ 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Qualcomm" },
      ram: [4, 6],
      storage: { options: [128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 380000, geekbench: '590/1750', tdMark: 1900 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nokia-c32",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Nokia",
    model: "Nokia C32",
    os: "Android",
    osVersion: "Android 13",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD", size: 6.5, resolution: "720 x 1600", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Unisoc SC9863A1", cpuBrand: "Unisoc", cores: 8, architecture: 64 },
      gpu: { model: "IMG8322", brand: "Imagination" },
      ram: [3, 4],
      storage: { options: [64, 128], expandable: true },
      camera: { rear: 50, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 78, touchFocus: true },
      battery: { capacity: 5000, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 140000, geekbench: '210/820', tdMark: 600 },
      features: { hasGps: true, hasNfc: false, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nokia-x30-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Nokia",
    model: "Nokia X30 5G",
    os: "Android",
    osVersion: "Android 12 (Atualizável para 14)",
    releaseYear: 2022,
    specs: {
      screen: { type: "AMOLED 90Hz PureDisplay", size: 6.43, resolution: "1080 x 2400", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Snapdragon 695 5G", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 619", brand: "Qualcomm" },
      ram: [6, 8],
      storage: { options: [128, 256], expandable: false },
      camera: { rear: 50, front: 16, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: 'FHD', slowMotion: true, maxFocusAngle: 123, touchFocus: true },
      battery: { capacity: 4200, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 410000, geekbench: '660/1900', tdMark: 2300 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "nokia-hmd-skyline",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Nokia",
    model: "HMD Skyline (Nokia Lineage)",
    os: "Android",
    osVersion: "Android 14 (Reparabilidade Gen 2)",
    releaseYear: 2024,
    specs: {
      screen: { type: "P-OLED 144Hz HDR10+", size: 6.55, resolution: "1080 x 2400", refreshRate: 144, isFoldable: false },
      processor: { chipset: "Snapdragon 7s Gen 2", cpuBrand: "Qualcomm", cores: 8, architecture: 64 },
      gpu: { model: "Adreno 710", brand: "Qualcomm" },
      ram: [8, 12],
      storage: { options: [128, 256], expandable: true },
      camera: { rear: 108, front: 50, opticalZoom: 4, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 4600, chargingTypes: ['USB tipo C', 'Sem fio', 'MagSafe', 'Turbo'] },
      performance: { antutu: 670000, geekbench: '1010/2900', tdMark: 4700 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)', 'eSIM'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS POLAR ---
  {
    id: "polar-vantage-m3",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Polar",
    model: "Polar Vantage M3",
    os: "Polar OS",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED Gorilla Glass 3", size: 1.28, resolution: "416 x 416", refreshRate: 60, isFoldable: false },
      processor: { chipset: "STMicroelectronics STM32WB", cpuBrand: "STMicro", cores: 2, architecture: 32 },
      gpu: { model: "Polar GPU 2", brand: "STMicro" },
      ram: [0.25],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 310, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 30000, geekbench: '60/200', tdMark: 120 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "polar-grit-x2-pro",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Polar",
    model: "Polar Grit X2 Pro",
    os: "Polar OS",
    releaseYear: 2024,
    specs: {
      screen: { type: "AMOLED Sapphire Glass Outdoor", size: 1.39, resolution: "454 x 454", refreshRate: 60, isFoldable: false },
      processor: { chipset: "STMicroelectronics STM32WB55", cpuBrand: "STMicro", cores: 2, architecture: 32 },
      gpu: { model: "Polar GPU Pro", brand: "STMicro" },
      ram: [0.25],
      storage: { options: [32], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 488, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 35000, geekbench: '70/220', tdMark: 140 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "polar-pacer-pro",
    deviceType: "smartwatch",
    categoryTier: "intermediário",
    brand: "Polar",
    model: "Polar Pacer Pro",
    os: "Polar OS",
    releaseYear: 2022,
    specs: {
      screen: { type: "MIP Reflective Display", size: 1.2, resolution: "240 x 240", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Nordic nRF52840", cpuBrand: "Nordic", cores: 1, architecture: 32 },
      gpu: { model: "MIP 2D Engine", brand: "Nordic" },
      ram: [0.1],
      storage: { options: [0.032], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 273, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 15000, geekbench: '30/100', tdMark: 70 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "polar-ignite-3",
    deviceType: "smartwatch",
    categoryTier: "intermediário",
    brand: "Polar",
    model: "Polar Ignite 3",
    os: "Polar OS",
    releaseYear: 2022,
    specs: {
      screen: { type: "Curved AMOLED Glass", size: 1.28, resolution: "416 x 416", refreshRate: 60, isFoldable: false },
      processor: { chipset: "STMicroelectronics STM32WB", cpuBrand: "STMicro", cores: 2, architecture: 32 },
      gpu: { model: "Polar GPU", brand: "STMicro" },
      ram: [0.25],
      storage: { options: [0.032], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 215, chargingTypes: ['Carregador Magnético'] },
      performance: { antutu: 25000, geekbench: '50/180', tdMark: 110 },
      features: { hasGps: true, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: true, hasUsbOtg: false }
    }
  },
  {
    id: "polar-unite",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Polar",
    model: "Polar Unite",
    os: "Polar OS",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD Touchscreen", size: 1.2, resolution: "240 x 204", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Nordic nRF52840", cpuBrand: "Nordic", cores: 1, architecture: 32 },
      gpu: { model: "Nordic 2D", brand: "Nordic" },
      ram: [0.1],
      storage: { options: [0.016], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 174, chargingTypes: ['Carregador USB Clip'] },
      performance: { antutu: 10000, geekbench: '20/70', tdMark: 50 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },

  // --- NOVOS MODELOS UNIHERTZ ---
  {
    id: "unihertz-tank-3-pro-5g",
    deviceType: "smartphone",
    categoryTier: "topo de linha",
    brand: "Unihertz",
    model: "Unihertz Tank 3 Pro 5G (Com Projetor)",
    os: "Android",
    osVersion: "Android 13",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD 120Hz Rugged", size: 6.79, resolution: "1080 x 2460", refreshRate: 120, isFoldable: false },
      processor: { chipset: "Dimensity 8200 5G", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G610 MC6", brand: "Mali" },
      ram: [16, 18],
      storage: { options: [512], expandable: true },
      camera: { rear: 200, front: 50, opticalZoom: 3, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 23800, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 920000, geekbench: '1250/3800', tdMark: 6800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "unihertz-jelly-max-5g",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Unihertz",
    model: "Unihertz Jelly Max 5G (Mini 5G)",
    os: "Android",
    osVersion: "Android 14",
    releaseYear: 2024,
    specs: {
      screen: { type: "IPS LCD Compact", size: 5.05, resolution: "720 x 1520", refreshRate: 90, isFoldable: false },
      processor: { chipset: "Dimensity 7300 5G", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G615 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 100, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '4K', slowMotion: true, maxFocusAngle: 118, touchFocus: true },
      battery: { capacity: 4000, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 680000, geekbench: '1020/2950', tdMark: 4800 },
      features: { hasGps: true, hasNfc: true, network: '5G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "unihertz-titan-slim",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Unihertz",
    model: "Unihertz Titan Slim (Teclado QWERTY)",
    os: "Android",
    osVersion: "Android 11",
    releaseYear: 2022,
    specs: {
      screen: { type: "IPS LCD Touch", size: 4.2, resolution: "768 x 1280", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P70", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [6],
      storage: { options: [256], expandable: false },
      camera: { rear: 48, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 4100, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 220000, geekbench: '320/1150', tdMark: 950 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: true, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "unihertz-8849-tank-2",
    deviceType: "smartphone",
    categoryTier: "intermediário",
    brand: "Unihertz",
    model: "Unihertz 8849 Tank 2 (Projetor DLP)",
    os: "Android",
    osVersion: "Android 13",
    releaseYear: 2023,
    specs: {
      screen: { type: "IPS LCD 120Hz", size: 6.79, resolution: "1080 x 2460", refreshRate: 120, isFoldable: false },
      processor: { chipset: "MediaTek Helio G99", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G57 MC2", brand: "Mali" },
      ram: [12],
      storage: { options: [256], expandable: true },
      camera: { rear: 108, front: 32, opticalZoom: 0, stabilization: true, faceDetection: true, recordingResolution: '2K', slowMotion: true, maxFocusAngle: 120, touchFocus: true },
      battery: { capacity: 15500, chargingTypes: ['USB tipo C', 'Turbo'] },
      performance: { antutu: 420000, geekbench: '720/2000', tdMark: 2500 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },
  {
    id: "unihertz-atom-l",
    deviceType: "smartphone",
    categoryTier: "entrada",
    brand: "Unihertz",
    model: "Unihertz Atom L (Mini Rugged Walkie-Talkie)",
    os: "Android",
    osVersion: "Android 10 (Atualizável para 11)",
    releaseYear: 2020,
    specs: {
      screen: { type: "IPS LCD Gorilla Glass", size: 4.0, resolution: "640 x 1136", refreshRate: 60, isFoldable: false },
      processor: { chipset: "MediaTek Helio P60", cpuBrand: "MediaTek", cores: 8, architecture: 64 },
      gpu: { model: "Mali-G72 MP3", brand: "Mali" },
      ram: [6],
      storage: { options: [128], expandable: true },
      camera: { rear: 48, front: 8, opticalZoom: 0, stabilization: false, faceDetection: true, recordingResolution: 'FHD', slowMotion: false, maxFocusAngle: 80, touchFocus: true },
      battery: { capacity: 4300, chargingTypes: ['USB tipo C'] },
      performance: { antutu: 200000, geekbench: '300/1100', tdMark: 900 },
      features: { hasGps: true, hasNfc: true, network: '4G', simCards: 2, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: true, supportsWhatsApp: true, simTypes: ['Nano-SIM (4FF)'], hasCompass: true, hasUsbOtg: true }
    }
  },

  // --- NOVOS MODELOS WITHINGS ---
  {
    id: "withings-scanwatch-horizon",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Withings",
    model: "Withings ScanWatch Horizon (Diver Hybrid)",
    os: "Withings OS",
    releaseYear: 2021,
    specs: {
      screen: { type: "PMOLED Sub-display + Sapphire Glass", size: 0.63, resolution: "128 x 64", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Ambiq Micro Apollo3", cpuBrand: "Ambiq", cores: 1, architecture: 32 },
      gpu: { model: "Monochrome PMOLED Controller", brand: "Ambiq" },
      ram: [0.05],
      storage: { options: [0.016], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 200, chargingTypes: ['Dock Magnético'] },
      performance: { antutu: 12000, geekbench: '25/80', tdMark: 40 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "withings-scanwatch-light",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Withings",
    model: "Withings ScanWatch Light",
    os: "Withings OS",
    releaseYear: 2023,
    specs: {
      screen: { type: "Grayscale OLED Sub-display", size: 0.63, resolution: "128 x 64", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Ambiq Micro Apollo3 Blue", cpuBrand: "Ambiq", cores: 1, architecture: 32 },
      gpu: { model: "Monochrome OLED Engine", brand: "Ambiq" },
      ram: [0.05],
      storage: { options: [0.016], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 180, chargingTypes: ['Dock Magnético'] },
      performance: { antutu: 10000, geekbench: '20/70', tdMark: 35 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "withings-move-ecg",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Withings",
    model: "Withings Move ECG",
    os: "Withings OS",
    releaseYear: 2019,
    specs: {
      screen: { type: "Mostrador Analógico + Ponteiros", size: 1.2, resolution: "Analog Dial", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Nordic nRF52832", cpuBrand: "Nordic", cores: 1, architecture: 32 },
      gpu: { model: "Analog Servo Driver", brand: "Nordic" },
      ram: [0.02],
      storage: { options: [0.008], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 220, chargingTypes: ['Bateria Botão CR2430'] },
      performance: { antutu: 5000, geekbench: '10/30', tdMark: 20 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "withings-steel-hr",
    deviceType: "smartwatch",
    categoryTier: "entrada",
    brand: "Withings",
    model: "Withings Steel HR",
    os: "Withings OS",
    releaseYear: 2017,
    specs: {
      screen: { type: "OLED Sub-display + Analógico", size: 0.5, resolution: "128 x 32", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Nordic nRF52832", cpuBrand: "Nordic", cores: 1, architecture: 32 },
      gpu: { model: "OLED Driver", brand: "Nordic" },
      ram: [0.02],
      storage: { options: [0.008], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 150, chargingTypes: ['Dock Magnético'] },
      performance: { antutu: 6000, geekbench: '12/35', tdMark: 22 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  },
  {
    id: "withings-scanwatch-nova",
    deviceType: "smartwatch",
    categoryTier: "topo de linha",
    brand: "Withings",
    model: "Withings ScanWatch Nova (Luxury Hybrid)",
    os: "Withings OS",
    releaseYear: 2024,
    specs: {
      screen: { type: "OLED High-Contrast Sub-display + Sapphire", size: 0.63, resolution: "128 x 64", refreshRate: 60, isFoldable: false },
      processor: { chipset: "Ambiq Micro Apollo4", cpuBrand: "Ambiq", cores: 1, architecture: 32 },
      gpu: { model: "OLED Ultra-low Engine", brand: "Ambiq" },
      ram: [0.1],
      storage: { options: [0.032], expandable: false },
      camera: { rear: 0, front: 0, opticalZoom: 0, stabilization: false, faceDetection: false, recordingResolution: 'HD', slowMotion: false, maxFocusAngle: 0, touchFocus: false },
      battery: { capacity: 220, chargingTypes: ['Dock Magnético'] },
      performance: { antutu: 15000, geekbench: '30/90', tdMark: 50 },
      features: { hasGps: false, hasNfc: false, network: 'Wi-Fi', simCards: 0, hasDigitalTv: false, hasPhysicalKeyboard: false, hasFingerprint: false, supportsWhatsApp: true, simTypes: ['Sem suporte'], hasCompass: false, hasUsbOtg: false }
    }
  }
];
