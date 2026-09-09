export interface Smartphone {
  id: string;
  deviceType?: 'smartphone' | 'smartwatch' | 'tablet';
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
  }
];
