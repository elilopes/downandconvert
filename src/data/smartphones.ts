export interface Smartphone {
  id: string;
  brand: string;
  model: string;
  os: string;
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
      network: '3G' | '4G' | '5G';
      simCards: 1 | 2 | 3;
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
  }
];
