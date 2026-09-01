export interface LocalizedString {
  PT: string;
  EN: string;
  RU: string;
  HI: string;
  KO: string;
}

export type NewsCategory = 'gadgets' | 'inventions' | 'discoveries';

export interface GadgetNewsItem {
  id: string;
  category: NewsCategory;
  categoryLabel: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  lead?: LocalizedString;
  author: string;
  pubDate: string;
  link: string;
}

export const mockedGadgetNews: GadgetNewsItem[] = [
  {
    id: "tecmundo-dyson-escova-ia",
    category: "gadgets",
    categoryLabel: {
      PT: "Gadget & Saúde",
      EN: "Gadget & Health",
      RU: "Гаджеты и здоровье",
      HI: "गैजेट और स्वास्थ्य",
      KO: "가젯 및 건강"
    },
    author: "TecMundo",
    pubDate: "2026-09-01T19:00:00Z",
    link: "https://www.tecmundo.com.br/produto/415707-dyson-lanca-escova-dental-com-camera-ia-e-spray-de-limpeza.htm",
    title: {
      PT: "Dyson lança escova dental inteligente com câmera, IA e spray de limpeza",
      EN: "Dyson launches smart toothbrush with micro-camera, AI, and cleaning spray",
      RU: "Dyson выпустила умную зубную щетку с камерой, ИИ и чистящим спреем",
      HI: "डायसन ने कैमरा, एआई और क्लीनिंग स्प्रे के साथ स्मार्ट टूथब्रश लॉन्च किया",
      KO: "다이슨, 초소형 카메라와 AI 및 세정 스프레이를 탑재한 스마트 칫솔 출시"
    },
    subtitle: {
      PT: "Dispositivo mapeia a cavidade bucal em tempo real e aplica microjatos de precisão",
      EN: "Device maps the oral cavity in real time and applies precision micro-jets",
      RU: "Устройство сканирует полость рта в реальном времени и подает микроструи",
      HI: "डिवाइस वास्तविक समय में मौखिक गुहा का नक्शा बनाता है और सटीक माइक्रो-जेट लागू करता है",
      KO: "실시간 구강 매핑 및 정밀 마이크로 제트 분사로 맞춤형 구강 케어 제공"
    },
    lead: {
      PT: "A fabricante britânica Dyson surpreendeu o mercado ao lançar uma escova de dentes ultratecnológica equipada com microcâmera de alta resolução e visão computacional para orientar a escovação e eliminar 99% das placas bacterianas.",
      EN: "British manufacturer Dyson surprised the market by launching a high-tech toothbrush equipped with a high-resolution micro-camera and computer vision to guide brushing and eliminate 99% of plaque.",
      RU: "Британский производитель Dyson представил высокотехнологичную зубную щетку с микрокамерой высокого разрешения и компьютерным зрением для точного контроля чистки зубов.",
      HI: "ब्रिटिश निर्माता डायसन ने ब्रशिंग का मार्गदर्शन करने और 99% प्लाक को खत्म करने के लिए उच्च-रिज़ॉल्यूशन माइक्रो-कैमरा और कंप्यूटर विज़न से लैस एक हाई-टेक टूथब्रश लॉन्च किया।",
      KO: "영국 다이슨이 고해상도 마이크로 카메라와 컴퓨터 비전 인공지능을 탑재하여 칫솔질 궤적을 안내하고 플라크를 99% 제거하는 프리미엄 스마트 칫솔을 공개했습니다."
    }
  },
  {
    id: "showmetech-tamagotchi-ring",
    category: "gadgets",
    categoryLabel: {
      PT: "Wearable & Smart Ring",
      EN: "Wearable & Smart Ring",
      RU: "Умное кольцо",
      HI: "स्मार्ट रिंग और वियरेबल",
      KO: "스마트 링 및 웨어러블"
    },
    author: "Showmetech",
    pubDate: "2026-08-31T15:34:00Z",
    link: "https://www.showmetech.com.br/tamagotchi-ring-bandai-anel-bichinho-virtual/",
    title: {
      PT: "Tamagotchi Ring: Bandai transforma clássico bichinho virtual em anel inteligente",
      EN: "Tamagotchi Ring: Bandai turns classic virtual pet into a wearable smart ring",
      RU: "Tamagotchi Ring: Bandai превратила культового виртуального питомца в умное кольцо",
      HI: "तमागोची रिंग: बंदाई ने क्लासिक वर्चुअल पेट को स्मार्ट रिंग में बदला",
      KO: "다마고치 링: 반다이, 클래식 가상 애완동물을 웨어러블 스마트 링으로 출시"
    },
    subtitle: {
      PT: "Anel em formato compacto traz tela micro-OLED, sensores táteis e conectividade sem fio",
      EN: "Compact ring features micro-OLED display, touch sensors, and wireless connectivity",
      RU: "Компактное кольцо оснащено микро-OLED экраном, сенсорами касания и беспроводной связью",
      HI: "कॉम्पैक्ट रिंग में माइक्रो-ओएलईडी डिस्प्ले, टच सेंसर और वायरलेस कनेक्टिविटी शामिल है",
      KO: "마이크로 OLED 디스플레이와 터치 센서 및 무선 통신을 갖춘 콤팩트 스마트 링"
    },
    lead: {
      PT: "A Bandai anunciou o Tamagotchi Ring, reimaginando o brinquedo icônico dos anos 90 em formato de anel inteligente com biossensores simples, interações por toque e alimentação do pet virtual através de passos e metas de caminhada diárias.",
      EN: "Bandai announced the Tamagotchi Ring, reimagining the iconic 90s toy into a smart ring form factor with basic biosensors, touch interactions, and feeding your virtual pet through daily step goals.",
      RU: "Bandai анонсировала Tamagotchi Ring, переосмыслив культовую игрушку 90-х в формате носимого умного кольца с базовыми биодатчиками и кормлением питомца за счет шагов.",
      HI: "बंदाई ने तमागोची रिंग की घोषणा की, 90 के दशक के प्रतिष्ठित खिलौने को बुनियादी बायो-सेंसर और स्टेप्स के माध्यम से पालतू जानवर को खाना खिलाने वाली स्मार्ट रिंग के रूप में फिर से तैयार किया।",
      KO: "반다이가 90년대 아이코닉 토이를 스마트 링 형태로 재탄생시킨 다마고치 링을 발표했습니다. 터치 반응형 마이크로 스크린과 걸음 수 연동 육성 시스템을 제공합니다."
    }
  },
  {
    id: "olhardigital-smartwatch-guia",
    category: "gadgets",
    categoryLabel: {
      PT: "Review & Gadgets",
      EN: "Review & Gadgets",
      RU: "Обзоры и гаджеты",
      HI: "रिव्यू और गैजेट्स",
      KO: "리뷰 및 가젯"
    },
    author: "Olhar Digital",
    pubDate: "2026-09-01T19:40:00Z",
    link: "https://olhardigital.com.br/2026/09/01/reviews/smartwatch-bom-mesmo-veja-uma-selecao-com-opcoes-para-todos-os-perfis/",
    title: {
      PT: "Guia de Smartwatches: análise técnica dos melhores relógios inteligentes do mercado",
      EN: "Smartwatch Guide: technical analysis of the top smartwatches on the market",
      RU: "Гид по умным часам: технический анализ лучших моделей на рынке",
      HI: "स्मार्टवॉच गाइड: बाज़ार में उपलब्ध शीर्ष स्मार्ट घड़ियों का तकनीकी विश्लेषण",
      KO: "스마트워치 완벽 가이드: 최신 스마트워치 기술 사양 및 비교 분석"
    },
    subtitle: {
      PT: "Comparativo detalhado de autonomia de bateria, precisão de GPS, sensores cardíacos e custo-benefício",
      EN: "Detailed benchmark of battery life, GPS accuracy, heart-rate sensors, and value",
      RU: "Сравнение автономности, точности GPS, кардиодатчиков и соотношения цены и качества",
      HI: "बैटरी लाइफ, जीपीएस सटीकता, हृदय गति सेंसर और मूल्य का विस्तृत विश्लेषण",
      KO: "배터리 수명, GPS 정밀도, 심박 센서 및 가성비 종합 벤치마크"
    },
    lead: {
      PT: "O Olhar Digital preparou um dossiê com testes de bancada e uso real comparando os principais relógios inteligentes de marcas como Apple, Samsung, Garmin e Amazfit, destacando recursos de ECG, medição de pressão e oxigenação sanguínea.",
      EN: "Olhar Digital published an in-depth benchmark testing the main smartwatches from Apple, Samsung, Garmin, and Amazfit, highlighting ECG features, blood pressure, and SpO2 accuracy.",
      RU: "Olhar Digital провел комплексное тестирование ведущих умных часов Apple, Samsung, Garmin и Amazfit, оценив точность ЭКГ, измерения давления и кислорода в крови.",
      HI: "ओलहार डिजिटल ने ऐप्पल, सैमसंग, गार्मिन और अमेज़फिट की प्रमुख स्मार्टवॉच का गहन परीक्षण किया, जिसमें ईसीजी और रक्त ऑक्सीजन निगरानी की सटीकता पर प्रकाश डाला गया।",
      KO: "올하르 디지털이 애플, 삼성, 가민, 어메이즈핏 등 주요 스마트워치의 심전도(ECG), 산소포화도 및 혈압 측정 정밀도를 실사용 환경에서 심층 비교 분석했습니다."
    }
  },
  {
    id: "exame-huawei-chips-sem-eua",
    category: "inventions",
    categoryLabel: {
      PT: "Hardware & Semicondutores",
      EN: "Hardware & Semiconductors",
      RU: "Полупроводники и чипы",
      HI: "हार्डवेयर और सेमीकंडक्टर",
      KO: "하드웨어 및 반도체"
    },
    author: "Exame Tecnologia",
    pubDate: "2026-09-01T18:00:00Z",
    link: "https://exame.com/tecnologia/huawei-contorna-sancoes-e-promete-chip-de-14-nanometro-sem-tecnologia-dos-eua/",
    title: {
      PT: "Huawei contorna sanções e desenvolve nova litografia sem tecnologia dos EUA",
      EN: "Huawei bypasses sanctions and develops new lithography independent of US tech",
      RU: "Huawei обходит санкции и разрабатывает новую литографию без технологий США",
      HI: "हुआवेई ने प्रतिबंधों को दरकिनार कर अमेरिकी तकनीक के बिना नई लिथोग्राफी विकसित की",
      KO: "화웨이, 미국의 기술 없이 독자 반도체 리소그래피 공정 개발 성공"
    },
    subtitle: {
      PT: "Avanço em máquinas de litografia óptica ultravioleta própria viabiliza produção independente",
      EN: "Breakthrough in proprietary deep-ultraviolet lithography enables sovereign chip manufacturing",
      RU: "Прорыв в собственной глубокой УФ-литографии обеспечивает независимое производство чипов",
      HI: "डीप-अल्ट्रावॉयलेट लिथोग्राफी में प्रगति संप्रभु चिप निर्माण को सक्षम बनाती है",
      KO: "자체 개발 심자외선(DUV) 노광 장비를 통해 독립적인 칩 양산 체제 구축"
    },
    lead: {
      PT: "A gigante asiática registrou novas patentes de equipamentos de litografia que dispensam componentes ocidentais, garantindo a fabricação de processadores e aceleradores neurais para smartphones e data centers de IA.",
      EN: "The Asian giant filed new patents for lithography equipment free of Western components, securing the manufacturing of neural processors for smartphones and AI data centers.",
      RU: "Huawei запатентовала отечественное литографическое оборудование без западных компонентов для производства мобильных процессоров и ИИ-ускорителей.",
      HI: "एशियाई दिग्गज ने पश्चिमी घटकों से मुक्त लिथोग्राफी उपकरणों के लिए नए पेटेंट दायर किए, जिससे स्मार्टफोन और एआई डेटा केंद्रों के लिए प्रोसेसर का उत्पादन सुरक्षित हो गया।",
      KO: "화웨이가 서방 부품에 의존하지 않는 독자 노광 장비 특허를 등록하며 차세대 스마트폰 및 AI 데이터센터용 뉴럴 프로세서의 자체 양산 역량을 입증했습니다."
    }
  },
  {
    id: "showmetech-logitech-abnt2-ergonomico",
    category: "gadgets",
    categoryLabel: {
      PT: "Periféricos & Gadgets",
      EN: "Peripherals & Gadgets",
      RU: "Периферия и гаджеты",
      HI: "पेरिफेरल्स और गैजेट्स",
      KO: "주변기기 및 가젯"
    },
    author: "Showmetech",
    pubDate: "2026-09-01T20:54:00Z",
    link: "https://www.showmetech.com.br/logitech-teclados-abnt2-mouse-almofada-confortavel-brasil/",
    title: {
      PT: "Logitech lança linha de teclados mecânicos ABNT2 e mouse com almofada ergonômica",
      EN: "Logitech launches ABNT2 mechanical keyboards and ergonomic wrist-rest mouse line",
      RU: "Logitech выпустила линейку механических клавиатур и эргономичную мышь",
      HI: "लॉजिटेक ने मैकेनिकल कीबोर्ड और एर्गोनोमिक कलाई-आराम माउस लाइन लॉन्च की",
      KO: "로지텍, 인체공학 손목 받침대 마우스 및 기계식 키보드 신규 라인업 출시"
    },
    subtitle: {
      PT: "Novos periféricos combinam switches silenciosos, conexão multidispositivo e suporte magnético",
      EN: "New peripherals feature quiet switches, multi-device switching, and magnetic memory-foam support",
      RU: "Новые устройства сочетают бесшумные переключатели, мультиподключение и магнитную подставку",
      HI: "नए डिवाइस शांत स्विच, मल्टी-डिवाइस स्विचिंग और मैग्नेटिक सपोर्ट को मिलाते हैं",
      KO: "저소음 기계식 스위치와 멀티 디바이스 무선 페어링 및 마그네틱 메모리폼 지지대 탑재"
    },
    lead: {
      PT: "A Logitech anunciou a chegada de novos modelos de teclados sem fio no padrão brasileiro ABNT2 e mouses verticais com almofadas acolchoadas em espuma viscoelástica para prevenir lesões por esforço repetitivo em longas jornadas de trabalho.",
      EN: "Logitech announced new wireless keyboards tailored with ergonomic wrist-rests and vertical mice with memory foam padding to prevent repetitive strain injuries during long workdays.",
      RU: "Logitech представила новые беспроводные клавиатуры и вертикальные мыши с эффектом памяти для снижения нагрузки на запястья при длительной работе за компьютером.",
      HI: "लॉजिटेक ने लंबे कार्य दिवसों के दौरान दोहरावदार तनाव की चोटों को रोकने के लिए एर्गोनोमिक कलाई-आराम और मेमोरी फोम पैडिंग वाले नए वायरलेस कीबोर्ड और वर्टिकल माउस पेश किए।",
      KO: "로지텍이 장시간 업무 시 손목 터널 증후군을 방지할 수 있는 메모리폼 쿠션 일체형 버티컬 무선 마우스와 기계식 무선 키보드를 공식 출시했습니다."
    }
  },
  {
    id: "showmetech-intel-wildcat-lake",
    category: "inventions",
    categoryLabel: {
      PT: "Processadores & IA",
      EN: "Processors & AI",
      RU: "Процессоры и ИИ",
      HI: "प्रोसेसर और एआई",
      KO: "프로세서 및 AI"
    },
    author: "Showmetech",
    pubDate: "2026-09-01T20:08:00Z",
    link: "https://www.showmetech.com.br/intel-detalha-core-serie-3-wildcat-lake/",
    title: {
      PT: "Intel detalha Core Série 3 Wildcat Lake com NPU integrada para notebooks acessíveis",
      EN: "Intel details Core Series 3 Wildcat Lake with integrated NPU for affordable laptops",
      RU: "Intel раскрыла Core Series 3 Wildcat Lake со встроенным NPU для недорогих ноутбуков",
      HI: "इंटेल ने किफायती लैपटॉप के लिए एकीकृत एनपीयू के साथ कोर सीरीज 3 की घोषणा की",
      KO: "인텔, 보급형 노트북에 강력한 NPU를 탑재한 코어 시리즈 3 와일드캣 레이크 공개"
    },
    subtitle: {
      PT: "Arquitetura com núcleos eficientes democratiza o processamento neural de IA local em PCs",
      EN: "Efficient-core architecture democratizes on-device neural AI processing across budget PCs",
      RU: "Энергоэффективная архитектура делает локальные вычисления ИИ доступными на бюджетных ПК",
      HI: "कुशल आर्किटेक्चर बजट पीसी पर स्थानीय न्यूरल एआई प्रोसेसिंग को सुलभ बनाता है",
      KO: "초고효율 코어 아키텍처로 엔트리 레벨 PC에서도 로컬 AI 연산을 완벽 지원"
    },
    lead: {
      PT: "A Intel revelou especificações da família Core Série 3, codinome Wildcat Lake. Os chips trazem acelerador neural dedicado de 45 TOPS e consumo ultrabaixo de até 15W, permitindo rodar assistentes de IA diretamente no hardware sem depender da nuvem.",
      EN: "Intel unveiled specifications for the Core Series 3 family (Wildcat Lake). The chips pack a dedicated 45 TOPS neural accelerator with ultra-low 15W TDP, enabling on-device AI assistants without cloud reliance.",
      RU: "Intel представила спецификации процессоров Core Series 3 (Wildcat Lake) с нейронным ускорителем на 45 TOPS и энергопотреблением от 15 Вт для автономного запуска ИИ.",
      HI: "इंटेल ने कोर सीरीज 3 (वाइल्डकैट लेक) के विनिर्देशों का खुलासा किया, जिसमें 45 टीओपीएस समर्पित न्यूरल एक्सेलेरेटर और अल्ट्रा-लो 15W बिजली की खपत है।",
      KO: "인텔이 45 TOPS 성능의 전용 NPU와 15W 초저전력 설계를 갖춘 코어 시리즈 3(와일드캣 레이크)를 발표하여 클라우드 연결 없이도 온디바이스 AI를 구동할 수 있게 했습니다."
    }
  },
  {
    id: "exame-wifi-ponto-morto",
    category: "gadgets",
    categoryLabel: {
      PT: "Redes & Conectividade",
      EN: "Networking & Connectivity",
      RU: "Сети и Wi-Fi",
      HI: "नेटवर्किंग और कनेक्टिविटी",
      KO: "네트워크 및 연결성"
    },
    author: "Exame Tecnologia",
    pubDate: "2026-09-01T17:30:00Z",
    link: "https://exame.com/tecnologia/wi-fi-ruim-em-comodo-especifico-como-descobrir-e-resolver-o-ponto-morto/",
    title: {
      PT: "Wi-Fi com sinal fraco no cômodo? Como mapear e eliminar pontos mortos",
      EN: "Weak Wi-Fi in specific rooms? How to map and eliminate dead zones with Mesh tech",
      RU: "Слабый сигнал Wi-Fi в комнате? Как найти и устранить «мертвые зоны» с помощью Mesh",
      HI: "कमरे में कमजोर वाई-फाई सिग्नल? मेश तकनीक से डेड जोन को कैसे मापें और खत्म करें",
      KO: "특정 방에서 끊기는 와이파이? 메쉬 기술로 음영 구역을 진단하고 해결하는 방법"
    },
    subtitle: {
      PT: "Tecnologia Wi-Fi 7 Mesh e analisadores de espectro resolvem interferências de paredes",
      EN: "Wi-Fi 7 Mesh systems and spectrum analyzers resolve wall and RF interference",
      RU: "Системы Wi-Fi 7 Mesh и анализаторы спектра устраняют помехи от стен и бытовых приборов",
      HI: "वाई-फाई 7 मेश सिस्टम और स्पेक्ट्रम विश्लेषक दीवारों और हस्तक्षेप को हल करते हैं",
      KO: "Wi-Fi 7 메쉬 라우터 및 주파수 분석기를 활용하여 벽체 간섭과 신호 저하를 완벽 극복"
    },
    lead: {
      PT: "Especialistas em telecomunicações ensinam como usar roteadores Mesh de última geração e ferramentas de medição de decibéis (RSSI) para cobrir casas inteiras com velocidade gigabit sem quedas de conexão.",
      EN: "Telecommunications experts explain how to leverage modern Mesh routers and RSSI decibel mapping tools to blanket entire homes with seamless gigabit wireless speeds.",
      RU: "Эксперты по телекоммуникациям объясняют, как использовать Mesh-роутеры нового поколения и анализ уровня сигнала RSSI для стабильного гигабитного покрытия по всему дому.",
      HI: "दूरसंचार विशेषज्ञ बताते हैं कि बिना किसी कनेक्शन ड्रॉप के पूरे घरों को गीगाबिट गति से कवर करने के लिए आधुनिक मेश राउटर और आरएसएसआई सिग्नल मैपिंग का उपयोग कैसे करें।",
      KO: "통신 네트워크 전문가들이 최신 와이파이 메쉬 시스템과 RSSI 수신 감도 매핑을 통해 대형 주택에서도 기가비트 무선 속도를 안정적으로 유지하는 노하우를 제시합니다."
    }
  },
  {
    id: "ps5-pro-ai-upscaling",
    category: "gadgets",
    categoryLabel: {
      PT: "Gadget & Hardware",
      EN: "Gadget & Hardware",
      RU: "Гаджет и «железо»",
      HI: "गैजेट और हार्डवेयर",
      KO: "가젯 및 하드웨어"
    },
    author: "Sony Interactive Blog",
    pubDate: "2026-08-15T16:00:00Z",
    link: "https://blog.playstation.com/2024/09/10/welcome-playstation-5-pro-the-most-visually-impressive-way-to-play-games-on-playstation/",
    title: {
      PT: "PlayStation 5 Pro traz upscaling neural PSSR e GPU 67% mais rápida",
      EN: "PlayStation 5 Pro brings PSSR neural upscaling and 67% faster GPU",
      RU: "PlayStation 5 Pro получила нейросетевое масштабирование PSSR и ускоренный на 67% GPU",
      HI: "PlayStation 5 Pro लाया PSSR न्यूरल अपस्केलिंग और 67% तेज़ GPU",
      KO: "PlayStation 5 Pro, PSSR 신경망 업스케일링 및 67% 더 빠른 GPU 탑재"
    },
    subtitle: {
      PT: "Taxas estáveis de 60 e 120 FPS em 4K nativo com Ray Tracing acelerado por hardware",
      EN: "Rock-solid 60 and 120 FPS at native 4K with hardware-accelerated Ray Tracing",
      RU: "Стабильные 60 и 120 кадров/с в 4K с аппаратным ускорением трассировки лучей",
      HI: "हार्डवेयर-त्वरित रे ट्रेसिंग के साथ देशी 4K में स्थिर 60 और 120 FPS",
      KO: "하드웨어 가속 레이 트레이싱을 통한 네이티브 4K 환경에서 안정적인 60/120 FPS 지원"
    },
    lead: {
      PT: "A nova arquitetura introduz um processador customizado com aprendizado de máquina dedicado (PlayStation Spectral Super Resolution), duplicando o desempenho de renderização gráfica em cenas complexas de iluminação.",
      EN: "The new architecture introduces a custom machine-learning processor (PlayStation Spectral Super Resolution), doubling graphics rendering performance in complex lighting scenarios.",
      RU: "Новая архитектура включает специализированный процессор машинного обучения (PlayStation Spectral Super Resolution), удваивая производительность рендеринга графики в сложных сценах освещения.",
      HI: "नई आर्किटेक्चर एक कस्टम मशीन-लर्निंग प्रोसेसर (PlayStation Spectral Super Resolution) पेश करती है, जो जटिल प्रकाश परिदृश्यों में ग्राफिक्स रेंडरिंग प्रदर्शन को दोगुना करती है।",
      KO: "새로운 아키텍처는 전용 머신러닝 프로세서(PlayStation Spectral Super Resolution)를 도입하여 복잡한 조명 시나리오에서 그래픽 렌더링 성능을 두 배로 향상시킵니다."
    }
  },
  {
    id: "apple-vision-pro-spatial",
    category: "gadgets",
    categoryLabel: {
      PT: "Computação Espacial",
      EN: "Spatial Computing",
      RU: "Пространственные вычисления",
      HI: "स्थानिक कंप्यूटिंग",
      KO: "공간 컴퓨팅"
    },
    author: "Apple Cupertino",
    pubDate: "2026-08-10T12:00:00Z",
    link: "https://www.apple.com/visionos/visionos-2/",
    title: {
      PT: "Apple Vision Pro ganha telas virtuais ultrawide no visionOS 2",
      EN: "Apple Vision Pro gains ultrawide virtual displays in visionOS 2",
      RU: "Apple Vision Pro получил ультраширокие виртуальные дисплеи в visionOS 2",
      HI: "Apple Vision Pro को visionOS 2 में अल्ट्रावाइड वर्चुअल डिस्प्ले मिलते हैं",
      KO: "Apple Vision Pro, visionOS 2에서 울트라와이드 가상 디스플레이 지원"
    },
    subtitle: {
      PT: "Novo rastreamento micro-gestual e renderização foveada avançada com duplo chip M2/R1",
      EN: "New micro-gesture tracking and advanced foveated rendering with dual M2/R1 chips",
      RU: "Новое отслеживание микрожестов и фовеальный рендеринг на двух чипах M2/R1",
      HI: "दोहरे M2/R1 चिप्स के साथ नया माइक्रो-जेस्चर ट्रैकिंग और उन्नत फोवेटेड रेंडरिंग",
      KO: "듀얼 M2/R1 칩셋 기반의 새로운 마이크로 제스처 추적 및 고급 포비디드 렌더링"
    },
    lead: {
      PT: "A atualização do headset espacial permite expandir a área de trabalho do Mac para o equivalente a duas telas 4K curvas lado a lado, com latência imperceptível de 12 milissegundos e áudio espacial imersivo.",
      EN: "The spatial headset update allows expanding the Mac desktop to the equivalent of two curved 4K screens side-by-side, with imperceptible 12ms latency and immersive spatial audio.",
      RU: "Обновление пространственной гарнитуры позволяет расширить рабочий стол Mac до эквивалента двух изогнутых 4K-экранов с незаметной задержкой 12 мс и иммерсивным пространственным звуком.",
      HI: "स्थानिक हेडसेट अपडेट मैक डेस्कटॉप को दो घुमावदार 4K स्क्रीन के बराबर विस्तारित करने की अनुमति देता है, जिसमें 12ms की अदृश्य विलंबता और इमर्सिव स्थानिक ऑडियो है।",
      KO: "공간 헤드셋 업데이트를 통해 Mac 데스크톱을 두 개의 커브드 4K 모니터를 나란히 배치한 것과 같은 크기로 확장할 수 있으며, 12ms의 지연 시간과 공간 오디오를 제공합니다."
    }
  },
  {
    id: "dji-mini-4-pro-drone",
    category: "gadgets",
    categoryLabel: {
      PT: "Gadget Aéreo",
      EN: "Aerial Gadget",
      RU: "Аэргаджет",
      HI: "एरियल गैजेट",
      KO: "항공 가젯"
    },
    author: "DJI Brasil",
    pubDate: "2026-08-05T14:30:00Z",
    link: "https://www.dji.com/br/mini-4-pro",
    title: {
      PT: "DJI Mini 4 Pro: Drone ultraleve com detecção omnidirecional de obstáculos",
      EN: "DJI Mini 4 Pro: Ultralight drone with omnidirectional obstacle sensing",
      RU: "DJI Mini 4 Pro: Сверхлегкий дрон со всенаправленным обнаружением препятствий",
      HI: "DJI Mini 4 Pro: सर्वदिशात्मक बाधा संवेदन के साथ अल्ट्रालाइट ड्रोन",
      KO: "DJI Mini 4 Pro: 전방향 장애물 감지 기능을 갖춘 초경량 드론"
    },
    subtitle: {
      PT: "Gravação vertical nativa 4K/60fps HDR, perfil D-Log M de 10 bits e transmissão O4 a 20 km",
      EN: "Native 4K/60fps HDR vertical shooting, 10-bit D-Log M profile, and 20 km O4 transmission",
      RU: "Вертикальная съемка 4K/60fps HDR, 10-битный D-Log M и передача O4 на 20 км",
      HI: "नेटिव 4K/60fps HDR वर्टिकल शूटिंग, 10-बिट D-Log M प्रोफाइल और 20 किमी O4 ट्रांसमिशन",
      KO: "네이티브 4K/60fps HDR 세로 촬영, 10비트 D-Log M 프로필 및 20km O4 송수신 지원"
    },
    lead: {
      PT: "Pesando menos de 249 gramas para dispensar registros de voo burocráticos na maioria dos países, o drone integra sensores de visão estéreo em todas as direções e bateria inteligente de até 34 minutos de autonomia.",
      EN: "Weighing under 249g to bypass bureaucratic registration in most countries, the drone integrates stereo vision sensors in all directions and an intelligent battery offering up to 34 minutes of flight.",
      RU: "При весе менее 249 граммов дрон не требует сложной регистрации во многих странах, оснащен стереодатчиками обзора во всех направлениях и аккумулятором на 34 минуты полета.",
      HI: "अधिकांश देशों में नौकरशाही पंजीकरण से बचने के लिए 249 ग्राम से कम वजन वाला यह ड्रोन सभी दिशाओं में स्टीरियो विजन सेंसर और 34 मिनट की उड़ान प्रदान करने वाली स्मार्ट बैटरी को एकीकृत करता है।",
      KO: "대부분의 국가에서 등록 절차를 면제받는 249g 미만의 무게로, 전방향 스테레오 비전 센서와 최대 34분 비행이 가능한 인텔리전트 배터리를 탑재했습니다."
    }
  },
  {
    id: "baterias-base-agua-zinco-hidrogenio",
    category: "inventions",
    categoryLabel: {
      PT: "Invenção Científica",
      EN: "Scientific Invention",
      RU: "Научное изобретение",
      HI: "वैज्ञानिक आविष्कार",
      KO: "과학적 발명"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-31T10:00:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=baterias-base-agua-usam-zinco-hidrogenio&id=010115260831&ebol=sim",
    title: {
      PT: "Baterias à base de água usam zinco e hidrogênio",
      EN: "Water-based batteries use zinc and hydrogen",
      RU: "Водные батареи используют цинк и водород",
      HI: "पानी आधारित बैटरियां जस्ता और हाइड्रोजन का उपयोग करती हैं",
      KO: "수계 배터리는 아연과 수소를 사용합니다"
    },
    subtitle: {
      PT: "Nova arquitetura eletroquímica elimina riscos de explosão e reduz custos de armazenamento renovável",
      EN: "New electrochemical architecture eliminates explosion risks and cuts renewable storage costs",
      RU: "Новая электрохимическая архитектура исключает риск взрыва и снижает затраты на хранение энергии",
      HI: "नई इलेक्ट्रोकेमिकल आर्किटेक्चर विस्फोट के जोखिम को खत्म करती है और भंडारण लागत को कम करती है",
      KO: "새로운 전기화학 아키텍처로 폭발 위험을 제거하고 재생 에너지 저장 비용을 절감합니다"
    },
    lead: {
      PT: "Pesquisadores desenvolveram uma bateria recarregável com eletrólito aquoso não inflamável que combina ânodos de zinco com desprendimento reversível de hidrogênio, proporcionando alta densidade e ciclo de vida ultralongo para redes de energia limpa.",
      EN: "Researchers developed a rechargeable battery with a non-flammable aqueous electrolyte combining zinc anodes with reversible hydrogen evolution, providing high density and ultra-long lifecycle for clean energy grids.",
      RU: "Исследователи разработали перезаряжаемую батарею с негорючим водным электролитом, объединяющую цинковые аноды с обратимым выделением водорода, обеспечивая высокую плотность и сверхдолгий срок службы для сетей чистой энергии.",
      HI: "शोधकर्ताओं ने गैर-ज्वनलशील जलीय इलेक्ट्रोलाइट के साथ एक रिचार्जेबल बैटरी विकसित की है जो जिंक एनोड को प्रतिवर्ती हाइड्रोजन विकास के साथ जोड़ती है, जो स्वच्छ ऊर्जा ग्रिड के लिए उच्च घनत्व और अल्ट्रा-लॉन्ग जीवन चक्र प्रदान करती है।",
      KO: "연구진은 아연 음극과 가역적 수소 발생 반응을 결합한 비가연성 수계 전해질 기반 충전식 배터리를 개발하여 청정 에너지 그리드를 위한 고밀도 및 초장수명 사이클을 제공합니다."
    }
  },
  {
    id: "bacterias-transistores-vivos",
    category: "discoveries",
    categoryLabel: {
      PT: "Descoberta Científica",
      EN: "Scientific Discovery",
      RU: "Научное открытие",
      HI: "वैज्ञानिक खोज",
      KO: "과학적 발견"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-31T08:30:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=bacterias-transistores-vivos&id=010110260831&ebol=sim",
    title: {
      PT: "Bactérias funcionam como transistores vivos",
      EN: "Bacteria act as living transistors",
      RU: "Бактерии функционируют как живые транзисторы",
      HI: "बैक्टीरिया जीवित ट्रांजिस्टर के रूप में कार्य करते हैं",
      KO: "박테리아가 살아있는 트랜지스터 역할을 합니다"
    },
    subtitle: {
      PT: "Engenharia genética celular cria portas lógicas biológicas para computação orgânica",
      EN: "Cellular genetic engineering creates biological logic gates for organic computing",
      RU: "Клеточная генная инженерия создает биологические логические вентили для органических вычислений",
      HI: "सेलुलर जेनेटिक इंजीनियरिंग ऑर्गेनिक कंप्यूटिंग के लिए जैविक लॉजिक गेट बनाती है",
      KO: "세포 유전공학을 통해 유기 컴퓨팅을 위한 생물학적 논리 게이트 구현"
    },
    lead: {
      PT: "Uma equipe multidisciplinar de biólogos e engenheiros programou cepas bacterianas para comutar sinais bioquímicos em resposta a estímulos moleculares, abrindo caminho para biocomputadores capazes de diagnosticar e tratar doenças in vivo.",
      EN: "A multidisciplinary team of biologists and engineers programmed bacterial strains to switch biochemical signals in response to molecular stimuli, paving the way for biocomputers capable of diagnosing and treating diseases in vivo.",
      RU: "Междисциплинарная группа биологов и инженеров запрограммировала бактериальные штаммы переключать биохимические сигналы в ответ на молекулярные стимулы, открывая путь к биокомпьютерам для диагностики и лечения заболеваний in vivo.",
      HI: "जीवविज्ञानियों और इंजीनियरों की एक बहु-विषयक टीम ने आणविक उत्तेजनाओं के जवाब में जैव रासायनिक संकेतों को बदलने के लिए जीवाणु उपभेदों को प्रोग्राम किया, जिससे इन विवो में बीमारियों का निदान और उपचार करने में सक्षम बायो कंप्यूटर का मार्ग प्रशस्त हुआ।",
      KO: "생물학자와 엔지니어로 구성된 다학제 연구팀은 분자 자극에 반응하여 생화학 신호를 전환하도록 박테리아 균주를 프로그래밍하여 생체 내에서 질병을 진단하고 치료할 수 있는 바이오컴퓨터의 길을 열었습니다."
    }
  },
  {
    id: "microscopio-computacional",
    category: "inventions",
    categoryLabel: {
      PT: "Invenção Científica",
      EN: "Scientific Invention",
      RU: "Научное изобретение",
      HI: "वैज्ञानिक आविष्कार",
      KO: "과학적 발명"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-18T14:15:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=microscopio-computacional&id=010165260818",
    title: {
      PT: "Microscópio computacional revela estrutura celular em 3D",
      EN: "Computational microscope reveals 3D cellular structure",
      RU: "Вычислительный микроскоп раскрывает клеточную структуру в 3D",
      HI: "कम्प्यूटेशनल माइक्रोस्कोप 3D में सेलुलर संरचना को प्रकट करता है",
      KO: "컴퓨테이셔널 현미경으로 3D 세포 구조 포착"
    },
    subtitle: {
      PT: "Algoritmos avançados de óptica difrativa substituem conjuntos pesados de lentes físicas",
      EN: "Advanced diffractive optics algorithms replace heavy physical lens assemblies",
      RU: "Передовые алгоритмы дифракционной оптики заменяют тяжелые физические линзы",
      HI: "उन्नत विवर्तनिक प्रकाशिकी एल्गोरिदम भारी भौतिक लेंस असेंबली को प्रतिस्थापित करते हैं",
      KO: "고급 회절 광학 알고리즘이 무거운 물리적 렌즈 어셈블리를 대체합니다"
    },
    lead: {
      PT: "Combinando sensores de imagem de alta velocidade e modelos computacionais de reconstrução de campo de luz, a nova tecnologia permite observar organelas em células vivas com resolução nanométrica sem a necessidade de corantes fluorescentes tóxicos.",
      EN: "Combining high-speed image sensors and computational light-field reconstruction models, the new technology allows observing organelles in living cells at nanometer resolution without toxic fluorescent dyes.",
      RU: "Объединяя высокоскоростные датчики изображения и вычислительные модели реконструкции светового поля, новая технология позволяет наблюдать органеллы в живых клетках с нанометровым разрешением без токсичных красителей.",
      HI: "हाई-स्पीड इमेज सेंसर और कम्प्यूटेशनल लाइट-फील्ड पुनर्निर्माण मॉडल को मिलाकर, नई तकनीक विषाक्त फ्लोरोसेंट रंगों के बिना नैनोमीटर रिज़ॉल्यूशन पर जीवित कोशिकाओं में जीवों को देखने की अनुमति देती है।",
      KO: "고속 이미지 센서와 컴퓨터 광선장 재구성 모델을 결합하여 독성 형광 염료 없이도 나노미터 해상도로 살아있는 세포 내 소기관을 관찰할 수 있습니다."
    }
  },
  {
    id: "sistema-energia-hibrido",
    category: "inventions",
    categoryLabel: {
      PT: "Invenção Científica",
      EN: "Scientific Invention",
      RU: "Научное изобретение",
      HI: "वैज्ञानिक आविष्कार",
      KO: "과학적 발명"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-26T09:40:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=sistema-energia-hibrido&id=010115260826",
    title: {
      PT: "Sistema de energia híbrido captura sol e chuva simultaneamente",
      EN: "Hybrid energy system captures sun and rain simultaneously",
      RU: "Гибридная энергосистема одновременно улавливает солнце и дождь",
      HI: "हाइब्रिड ऊर्जा प्रणाली एक साथ धूप और बारिश को पकड़ती है",
      KO: "태양광과 빗방울을 동시에 수확하는 하이브리드 에너지 시스템"
    },
    subtitle: {
      PT: "Painéis de dupla ação integram células fotovoltaicas e nanogeradores triboelétricos",
      EN: "Dual-action panels integrate photovoltaic cells and triboelectric nanogenerators",
      RU: "Панели двойного действия объединяют фотоэлектрические элементы и трибоэлектрические наногенераторы",
      HI: "दोहरे प्रभाव वाले पैनल फोटोवोल्टिक कोशिकाओं और ट्राइबोइलेक्ट्रिक नैनोजेनरेटर को एकीकृत करते हैं",
      KO: "광전지 셀과 마찰전기 나노발전기를 통합한 듀얼 액션 패널"
    },
    lead: {
      PT: "A nova tecnologia resolve a queda de rendimento de painéis solares em dias nublados ou chuvosos: as camadas superficiais colhem a energia cinética e o atrito das gotas de chuva, garantindo fornecimento elétrico contínuo em qualquer clima.",
      EN: "The new technology solves solar panels' drop in efficiency on cloudy or rainy days: surface layers harvest the kinetic energy and friction of raindrops, ensuring continuous electric output in all weather conditions.",
      RU: "Новая технология решает проблему снижения эффективности солнечных панелей в пасмурные дни: поверхностные слои улавливают кинетическую энергию и трение капель дождя, гарантируя непрерывное электроснабжение в любую погоду.",
      HI: "नई तकनीक बादल या बारिश के दिनों में सौर पैनलों की दक्षता में गिरावट को हल करती है: सतह की परतें बारिश की बूंदों की गतिज ऊर्जा और घर्षण का उपयोग करती हैं, जिससे हर मौसम में निरंतर बिजली की आपूर्ति सुनिश्चित होती है।",
      KO: "이 신기술은 흐리거나 비 오는 날 태양광 패널의 효율 저하를 해결합니다. 표면층이 빗방울의 운동 에너지와 마찰력을 수확하여 모든 기후 조건에서 지속적인 전력 공급을 보장합니다."
    }
  },
  {
    id: "flexoeletricidade-grafeno",
    category: "discoveries",
    categoryLabel: {
      PT: "Descoberta Científica",
      EN: "Scientific Discovery",
      RU: "Научное открытие",
      HI: "वैज्ञानिक खोज",
      KO: "과학적 발견"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-19T13:00:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=flexoeletricidade-enrugar-grafeno-produz-eletricidade&id=010115260819",
    title: {
      PT: "Flexoeletricidade: enrugar folhas de grafeno produz eletricidade",
      EN: "Flexoelectricity: wrinkling graphene sheets generates electricity",
      RU: "Флексоэлектричество: сминание графеновых листов производит электричество",
      HI: "फ्लेक्सोइलेक्ट्रिसिटी: ग्राफीन शीट को सिकोड़ने से बिजली पैदा होती है",
      KO: "플렉소전기: 그래핀 시트를 주름지게 하면 전기가 생성됩니다"
    },
    subtitle: {
      PT: "Gradientes de curvatura atômica quebram a simetria central e induzem polarização espontânea",
      EN: "Atomic curvature gradients break central symmetry and induce spontaneous polarization",
      RU: "Градиенты атомной кривизны нарушают центральную симметрию и вызывают спонтанную поляризацию",
      HI: "परमाणु वक्रता ढाल केंद्रीय समरूपता को तोड़ते हैं और सहज ध्रुवीकरण को प्रेरित करते हैं",
      KO: "원자 곡률 구배가 중심 대칭을 깨뜨려 자발적 분극을 유도합니다"
    },
    lead: {
      PT: "Físicos demonstraram que dobras mecânicas microscópicas em monocamadas de carbono geram densidades elétricas expressivas, permitindo a criação de nanossensores biomédicos autoalimentados pelo próprio movimento muscular do corpo.",
      EN: "Physicists proved that microscopic mechanical folds in carbon monolayers generate substantial electrical densities, enabling self-powered biomedical nanosensors driven by natural muscle movement.",
      RU: "Физики доказали, что микроскопические механические складки в углеродных монослоях генерируют существенную электрическую плотность, что позволяет создавать автономные биомедицинские нанодатчики, работающие от движения мышц.",
      HI: "भौतिकविदों ने प्रदर्शित किया कि कार्बन मोनोलेयर्स में सूक्ष्म यांत्रिक सिलवटें महत्वपूर्ण विद्युत घनत्व उत्पन्न करती हैं, जिससे प्राकृतिक मांसपेशियों के आंदोलन द्वारा संचालित स्व-संचालित बायोमेडिकल नैनोसेंसर का निर्माण संभव होता है।",
      KO: "물리학자들은 탄소 단일층의 미세한 기계적 주름이 상당한 전기 밀도를 발생시켜 신체 근육 움직임으로 자체 구동되는 생체의학 나노센서를 구현할 수 있음을 입증했습니다."
    }
  }
];
