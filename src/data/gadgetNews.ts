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
      HI: "शोधकर्ताओं ने गैर-ज्वलनशील जलीय इलेक्ट्रोलाइट के साथ एक रिचार्जेबल बैटरी विकसित की है जो जिंक एनोड को प्रतिवर्ती हाइड्रोजन विकास के साथ जोड़ती है, जो स्वच्छ ऊर्जा ग्रिड के लिए उच्च घनत्व और अल्ट्रा-लॉन्ग जीवन चक्र प्रदान करती है।",
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
    id: "biscoito-comestivel-plastico-reciclado",
    category: "discoveries",
    categoryLabel: {
      PT: "Descoberta Científica",
      EN: "Scientific Discovery",
      RU: "Научное открытие",
      HI: "वैज्ञानिक खोज",
      KO: "과학적 발견"
    },
    author: "Inovação Tecnológica",
    pubDate: "2026-08-25T11:00:00Z",
    link: "https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=biscoito-comestivel-plastico-reciclado&id=010125260825",
    title: {
      PT: "Biscoito comestível sintetizado a partir de plástico reciclado",
      EN: "Edible biscuit synthesized from recycled plastic",
      RU: "Съедобное печенье синтезировано из переработанного пластика",
      HI: "रीसायकल प्लास्टिक से खाद्य बिस्कुट का संश्लेषण",
      KO: "재활용 플라스틱으로 합성한 식용 비스킷 개발"
    },
    subtitle: {
      PT: "Biorrefinarias microbianas convertem resíduos plásticos em biomassa proteica segura",
      EN: "Microbial biorefineries convert plastic waste into safe protein biomass",
      RU: "Микробные биоперерабатывающие заводы превращают пластиковые отходы в безопасную белковую биомассу",
      HI: "माइक्रोबियल बायो-रिफाइनरियां प्लास्टिक कचरे को सुरक्षित प्रोटीन बायोमास में परिवर्तित करती हैं",
      KO: "미생물 바이오 정제소를 통해 플라스틱 폐기물을 안전한 단백질 바이오매스로 전환"
    },
    lead: {
      PT: "Cientistas utilizaram enzimas geneticamente aprimoradas para decompor o polietileno de garrafas e embalagens em ácidos graxos essenciais, que foram metabolizados por leveduras alimentícias para criar biscoitos nutricionais e seguros para consumo.",
      EN: "Scientists used genetically enhanced enzymes to break down bottle polyethylene into essential fatty acids, which were metabolized by food yeast to create nutritious and food-safe biscuits.",
      RU: "Ученые использовали генетически улучшенные ферменты для расщепления полиэтилена бутылок на жирные кислоты, которые затем перерабатывались пищевыми дрожжами в питательное и безопасное печенье.",
      HI: "वैज्ञानिकों ने बोतलों के पॉलीथीन को आवश्यक फैटी एसिड में तोड़ने के लिए आनुवंशिक रूप से उन्नत एंजाइमों का उपयोग किया, जिसे खाद्य खमीर द्वारा पौष्टिक और सुरक्षित बिस्कुट बनाने के लिए चयापचय किया गया था।",
      KO: "과학자들은 유전적으로 강화된 효소를 사용하여 페트병 폴리에틸렌을 필수 지방산으로 분해하고, 이를 식품용 효모로 대사하여 영양가 있고 안전한 비스킷을 만들었습니다."
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
  },
  {
    id: "galaxy-ring-wearable",
    category: "gadgets",
    categoryLabel: {
      PT: "Gadget Inovador",
      EN: "Innovative Gadget",
      RU: "Инновационный гаджет",
      HI: "अभिनव गैजेट",
      KO: "혁신적인 가젯"
    },
    author: "Samsung Tech Lab",
    pubDate: "2026-08-20T10:00:00Z",
    link: "https://www.samsung.com",
    title: {
      PT: "Samsung Galaxy Ring: Anel inteligente com 7 dias de bateria e biossensores",
      EN: "Samsung Galaxy Ring: Smart ring with 7-day battery life and biosensors",
      RU: "Samsung Galaxy Ring: Умное кольцо с 7 днями автономной работы и биосенсорами",
      HI: "सैमसंग गैलेक्सी रिंग: 7 दिन की बैटरी लाइफ और बायो-सेंसर वाली स्मार्ट रिंग",
      KO: "삼성 갤럭시 링: 7일 배터리 수명 및 바이오센서 탑재 스마트 링"
    },
    subtitle: {
      PT: "Monitoramento de sono em nível clínico, temperatura da pele e pontuação de vitalidade diária",
      EN: "Clinical-grade sleep monitoring, skin temperature tracking, and daily vitality score",
      RU: "Клинический мониторинг сна, измерение температуры кожи и оценка ежедневной жизненной энергии",
      HI: "क्लिनिकल-ग्रेड नींद की निगरानी, त्वचा के तापमान की ट्रैकिंग और दैनिक जीवन शक्ति स्कोर",
      KO: "임상 수준의 수면 모니터링, 피부 온도 추적 및 일일 활력 점수 제공"
    },
    lead: {
      PT: "Construído em titânio de grau aeroespacial, o wearable miniaturiza sensores ópticos de fotopletismografia e acelerômetros para monitorar saúde cardiovascular contínua sem o peso de um smartwatch convencional.",
      EN: "Crafted from aerospace-grade titanium, the wearable miniaturizes optical photoplethysmography sensors and accelerometers to monitor continuous cardiovascular health without smartwatch bulk.",
      RU: "Выполненный из титана аэрокосмического класса, носимый гаджет миниатюризирует оптические датчики фотоплетизмографии и акселерометры для непрерывного мониторинга здоровья сердечно-сосудистой системы.",
      HI: "एयरोस्पेस-ग्रेड टाइटेनियम से तैयार, यह वियरेबल स्मार्टवॉच के वजन के बिना निरंतर हृदय स्वास्थ्य की निगरानी के लिए ऑप्टिकल फोटोप्लेथिस्मोग्राफी सेंसर और एक्सेलेरोमीटर को छोटा करता है।",
      KO: "항공우주 등급의 티타늄으로 제작된 이 웨어러블은 광학 맥파 센서와 가속도계를 소형화하여 스마트워치의 부피감 없이 지속적인 심혈관 건강을 모니터링합니다."
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
    author: "Sony Interactive",
    pubDate: "2026-08-15T16:00:00Z",
    link: "https://www.playstation.com",
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
    link: "https://www.apple.com",
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
    author: "DJI Innovations",
    pubDate: "2026-08-05T14:30:00Z",
    link: "https://www.dji.com",
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
  }
];
