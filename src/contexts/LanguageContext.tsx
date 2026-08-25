import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'PT' | 'EN' | 'RU' | 'HI' | 'KO';

interface Translations {
  [key: string]: {
    PT: string;
    EN: string;
    RU: string;
    HI: string;
    KO: string;
  };
}

const dict: Translations = {
  "header.subtitle": {
    PT: "Converte e baixa vídeos, áudio, reels",
    EN: "Converts and downloads videos, audio, reels",
    RU: "Конвертирует и скачивает видео, аудио, reels",
    HI: "वीडियो, ऑडियो, रील्स कनवर्ट और डाउनलोड करता है",
    KO: "동영상, 오디오, 릴스 변환 및 다운로드"
  },
  "hero.title": {
    PT: "Baixe e converta mídias da web",
    EN: "Download and convert web media",
    RU: "Скачивайте и конвертируйте медиа из интернета",
    HI: "वेब से मीडिया डाउनलोड और कनवर्ट करें",
    KO: "웹에서 미디어 다운로드 및 변환"
  },
  "hero.desc": {
    PT: "Converta vídeos, baixe mídias das redes sociais, grave sua tela ou câmera e salve no seu Google Drive. Corte áudio, corte vídeo, adicione metadados, converta arquivos de mídia localmente no navegador com total privacidade e, pesquise códigos secretos USSD e MMI para celular.",
    EN: "Convert videos, download social media media, record your screen or camera, and save to your Google Drive. Trim audio, trim video, add metadata, convert media files locally in the browser with total privacy, and search secret USSD and MMI mobile codes.",
    RU: "Конвертируйте видео, скачивайте медиа из социальных сетей, записывайте экран или камеру и сохраняйте на свой Google Диск. Обрезайте аудио, обрезайте видео, добавляйте метаданные, конвертируйте медиафайлы локально в браузере с полной конфиденциальностью и ищите секретные коды USSD и MMI для мобильных устройств.",
    HI: "वीडियो कनवर्ट करें, सोशल मीडिया मीडिया डाउनलोड करें, अपनी स्क्रीन या कैमरा रिकॉर्ड करें, और अपने Google ड्राइव में सहेजें। ऑडियो ट्रिम करें, वीडियो ट्रिम करें, मेटाडेटा जोड़ें, पूर्ण गोपनीयता के साथ ब्राउज़र में स्थानीय रूप से मीडिया फ़ाइलों को कनवर्ट करें, और गुप्त USSD और MMI मोबाइल कोड खोजें।",
    KO: "동영상을 변환하고, 소셜 미디어 미디어를 다운로드하고, 화면이나 카메라를 녹화하여 Google 드라이브에 저장하세요. 오디오 다듬기, 비디오 다듬기, 메타데이터 추가, 브라우저에서 로컬로 미디어 파일 변환, 비밀 USSD 및 MMI 모바일 코드 검색을 완벽한 개인정보 보호와 함께 이용하세요."
  },
  "header.free": {
    PT: "Conversor Grátis & Ilimitado",
    EN: "Free & Unlimited Converter",
    RU: "Бесплатный и Безлимитный Конвертер",
    HI: "मुफ़्त और असीमित कनवर्टर",
    KO: "무료 & 무제한 변환기"
  },
  "header.secure": {
    PT: "100% Seguro & Privado",
    EN: "100% Secure & Private",
    RU: "100% Безопасно и Конфиденциально",
    HI: "100% सुरक्षित और निजी",
    KO: "100% 안전 & 비공개"
  },
  "header.nolimit": {
    PT: "Sem Limite de Tamanho",
    EN: "No Size Limit",
    RU: "Без ограничений по размеру",
    HI: "कोई आकार सीमा नहीं",
    KO: "파일 크기 제한 없음"
  },
  "header.how": {
    PT: "Como Funciona?",
    EN: "How it works?",
    RU: "Как это работает?",
    HI: "यह कैसे काम करता है?",
    KO: "이용 방법"
  },
  "dropzone.urlHint": {
    PT: "Baixar a mídia usando a URL (tiktok, instagram, facebook, vimeo) - o youtube está em manutenção.",
    EN: "Download media using URL (tiktok, instagram, facebook, vimeo) - YouTube is under maintenance.",
    RU: "Скачайте медиа по URL (tiktok, instagram, facebook, vimeo) - YouTube находится на обслуживании.",
    HI: "URL का उपयोग करके मीडिया डाउनलोड करें (tiktok, instagram, facebook, vimeo) - YouTube रखरखाव के अधीन है।",
    KO: "URL을 사용하여 미디어 다운로드 (tiktok, instagram, facebook, vimeo) - YouTube는 유지 관리 중입니다."
  },
  "ussd.wikipedia": {
    PT: "Saiba mais sobre esta tecnologia na wikipedia (USSD)",
    EN: "Learn more about this technology on Wikipedia (USSD)",
    RU: "Узнайте больше об этой технологии в Википедии (USSD)",
    HI: "विकिपीडिया पर इस तकनीक के बारे में अधिक जानें (USSD)",
    KO: "Wikipedia에서 이 기술에 대해 자세히 알아보세요 (USSD)"
  },
  "dropzone.placeholder": {
    PT: "Cole o link do YouTube, Instagram, Facebook...",
    EN: "Paste YouTube, Instagram, Facebook link...",
    RU: "Вставьте ссылку YouTube, Instagram, Facebook...",
    HI: "YouTube, Instagram, Facebook लिंक पेस्ट करें...",
    KO: "YouTube, Instagram, Facebook 링크를 붙여넣으세요..."
  },
  "dropzone.paste": {
    PT: "Colar",
    EN: "Paste",
    RU: "Вставить",
    HI: "पेस्ट करें",
    KO: "붙여넣기"
  },
  "dropzone.search": {
    PT: "Pesquisar e Baixar",
    EN: "Search & Download",
    RU: "Поиск и Скачивание",
    HI: "खोजें और डाउनलोड करें",
    KO: "검색 및 다운로드"
  },
  "dropzone.drag": {
    PT: "Arraste e solte seus vídeos aqui",
    EN: "Drag and drop your videos here",
    RU: "Перетащите ваши видео сюда",
    HI: "अपने वीडियो यहां खींचें और छोड़ें",
    KO: "여기에 비디오 파일을 드래그 앤 드롭하세요"
  },
  "dropzone.click": {
    PT: "ou clique para selecionar (MP4, MKV, AVI...)",
    EN: "or click to select (MP4, MKV, AVI...)",
    RU: "или нажмите для выбора (MP4, MKV, AVI...)",
    HI: "या चुनने के लिए क्लिक करें (MP4, MKV, AVI...)",
    KO: "또는 클릭하여 파일 선택 (MP4, MKV, AVI...)"
  },
  "dropzone.record": {
    PT: "Gravar Tela ou Câmera",
    EN: "Record Screen or Camera",
    RU: "Запись экрана или камеры",
    HI: "स्क्रीन या कैमरा रिकॉर्ड करें",
    KO: "화면 또는 카메라 녹화"
  },
  "faq.title": {
    PT: "Perguntas Frequentes",
    EN: "Frequently Asked Questions",
    RU: "Часто задаваемые вопросы",
    HI: "अक्सर पूछे जाने वाले प्रश्न",
    KO: "자주 묻는 질문 (FAQ)"
  },
  "faq.q1": {
    PT: "Quais formatos são suportados?",
    EN: "Which formats are supported?",
    RU: "Какие форматы поддерживаются?",
    HI: "कौन से प्रारूप समर्थित हैं?",
    KO: "어떤 형식이 지원되나요?"
  },
  "faq.a1": {
    PT: "Você pode enviar vídeos MP4, WebM, MOV, MKV e AVI. O áudio pode ser exportado para MP3, WAV, AAC, M4A, FLAC, WMA, OGG e AIFF.",
    EN: "You can upload MP4, WebM, MOV, MKV, and AVI videos. Audio can be exported to MP3, WAV, AAC, M4A, FLAC, WMA, OGG, and AIFF.",
    RU: "Вы можете загружать видео MP4, WebM, MOV, MKV и AVI. Аудио можно экспортировать в MP3, WAV, AAC, M4A, FLAC, WMA, OGG и AIFF.",
    HI: "आप MP4, WebM, MOV, MKV और AVI वीडियो अपलोड कर सकते हैं। ऑडियो को MP3, WAV, AAC, M4A, FLAC, WMA, OGG और AIFF में निर्यात किया जा सकता है।",
    KO: "MP4, WebM, MOV, MKV 및 AVI 비디오를 업로드할 수 있습니다. 오디오는 MP3, WAV, AAC, M4A, FLAC, WMA, OGG 및 AIFF로 내보낼 수 있습니다."
  },
  "faq.q2": {
    PT: "Existe limite de tamanho para o vídeo?",
    EN: "Is there a size limit for the video?",
    RU: "Есть ли ограничение на размер видео?",
    HI: "क्या वीडियो के लिए कोई आकार सीमा है?",
    KO: "비디오 파일 크기 제한이 있나요?"
  },
  "faq.a2": {
    PT: "Não! Como todo o processamento é feito localmente no seu próprio navegador, não há restrições artificiais de tamanho.",
    EN: "No! Since all processing is done locally in your browser, there are no artificial size restrictions.",
    RU: "Нет! Поскольку вся обработка выполняется локально в вашем браузере, искусственных ограничений по размеру нет.",
    HI: "नहीं! चूंकि सभी प्रसंस्करण आपके अपने ब्राउज़र में स्थानीय रूप से किया जाता है, इसलिए कोई कृत्रिम आकार प्रतिबंध नहीं हैं।",
    KO: "아닙니다! 모든 처리가 브라우저에서 로컬로 이루어지므로 인위적인 파일 크기 제한이 없습니다."
  },
  "faq.q3": {
    PT: "A conversão é realmente privada?",
    EN: "Is the conversion really private?",
    RU: "Конвертация действительно конфиденциальна?",
    HI: "क्या रूपांतरण वास्तव में निजी है?",
    KO: "변환 과정은 안전하고 비공개인가요?"
  },
  "faq.a3": {
    PT: "Sim. Seus arquivos originais nunca são enviados para nenhum servidor na nuvem.",
    EN: "Yes. Your original files are never sent to any cloud server.",
    RU: "Да. Ваши исходные файлы никогда не отправляются ни на какой облачный сервер.",
    HI: "हां। आपकी मूल फाइलें कभी भी किसी क्लाउड सर्वर पर नहीं भेजी जाती हैं।",
    KO: "네. 사용자의 원본 파일은 외부 클라우드 서버로 전송되지 않고 로컬에서 안전하게 처리됩니다."
  },
  "faq.close": {
    PT: "Fechar",
    EN: "Close",
    RU: "Закрыть",
    HI: "बंद करें",
    KO: "닫기"
  },
  "footer.terms": {
    PT: "Termos de Uso",
    EN: "Terms of Use",
    RU: "Условия использования",
    HI: "उपयोग की शर्तें",
    KO: "이용약관"
  },
  "footer.privacy": {
    PT: "Política de Privacidade",
    EN: "Privacy Policy",
    RU: "Политика конфиденциальности",
    HI: "गोपनीयता नीति",
    KO: "개인정보처리방침"
  },
  "footer.contact": {
    PT: "Contato",
    EN: "Contact",
    RU: "Контакт",
    HI: "संपर्क करें",
    KO: "문의하기"
  },
  "footer.rights": {
    PT: "Todos os direitos reservados.",
    EN: "All rights reserved.",
    RU: "Все права защищены.",
    HI: "सभी अधिकार सुरक्षित।",
    KO: "모든 권리 보유."
  },
  "error.429.title": {
    PT: "Status 429: Limite de Requisições / Bloqueio Anti-Bot do YouTube",
    EN: "Status 429: Rate Limit / YouTube Anti-Bot Block",
    RU: "Статус 429: Лимит запросов / Защита YouTube от ботов",
    HI: "स्थिति 429: अनुरोध सीमा / YouTube एंटी-बॉट ब्लॉक",
    KO: "상태 429: 요청 한도 초과 / YouTube 봇 방지 차단"
  },
  "error.429.desc": {
    PT: "O YouTube bloqueou temporariamente o download direto via servidor em nuvem (Erro HTTP 429 Too Many Requests).",
    EN: "YouTube has temporarily blocked direct server-side downloads from cloud hosting (HTTP 429 Too Many Requests).",
    RU: "YouTube временно заблокировал прямую загрузку через облачный сервер (Ошибка HTTP 429 Too Many Requests).",
    HI: "YouTube ने क्लाउड सर्वर के माध्यम से सीधे डाउनलोड को अस्थायी रूप से अवरुद्ध कर दिया है (HTTP 429 Too Many Requests)।",
    KO: "YouTube가 클라우드 서버를 통한 직접 다운로드를 일시적으로 차단했습니다 (HTTP 429 Too Many Requests)."
  },
  "error.429.why": {
    PT: "Por que isso acontece? Provedores de hospedagem em nuvem (Render, AWS, DigitalOcean) usam faixas de IP compartilhadas de datacenter. O YouTube impõe restrições automáticas contra esses IPs para evitar extração massiva.",
    EN: "Why does this happen? Cloud hosting providers (Render, AWS, DigitalOcean) use shared datacenter IP ranges. YouTube automatically enforces rate limits on these IPs to prevent mass scraping.",
    RU: "Почему это происходит? Облачные провайдеры (Render, AWS, DigitalOcean) используют общие IP-адреса дата-центров. YouTube автоматически блокирует эти IP-адреса для предотвращения массового скачивания.",
    HI: "ऐसा क्यों होता है? क्लाउड होस्टिंग प्रदाता (Render, AWS, DigitalOcean) साझा डेटासेंटर आईपी का उपयोग करते हैं। YouTube अत्यधिक डाउनलोड रोकने के लिए इन आईपी को स्वचालित रूप से ब्लॉक करता है।",
    KO: "왜 이런 일이 발생하나요? 클라우드 호스팅 제공업체(Render, AWS, DigitalOcean)는 공유 데이터센터 IP 대역을 사용합니다. YouTube는 대량 추출을 방지하기 위해 이러한 IP에 자동 제한을 적용합니다."
  },
  "error.429.solution": {
    PT: "Soluções recomendadas:",
    EN: "Recommended solutions:",
    RU: "Рекомендуемые решения:",
    HI: "अनुशंसित समाधान:",
    KO: "권장 해결 방법:"
  },
  "error.429.sol1": {
    PT: "Arraste e solte o arquivo de vídeo do seu computador (processamento 100% local, ilimitado e privado no seu navegador).",
    EN: "Drag and drop the video file from your computer (100% local, unlimited, and private in your browser).",
    RU: "Перетащите видеофайл со своего компьютера (100% локальная, неограниченная и конфиденциальная обработка в браузере).",
    HI: "अपने कंप्यूटर से वीडियो फ़ाइल खींचें और छोड़ें (आपके ब्राउज़र में 100% स्थानीय, असीमित और निजी)।",
    KO: "컴퓨터에서 동영상 파일을 직접 드래그 앤 드롭하세요 (브라우저 내 100% 로컬, 무제한 및 비공개 처리)."
  },
  "error.429.sol2": {
    PT: "Grave a reprodução em tempo real com o botão 'Gravar Tela ou Câmera'.",
    EN: "Record playback in real-time using the 'Record Screen or Camera' button.",
    RU: "Запишите воспроизведение в реальном времени с помощью кнопки 'Запись экрана или камеры'.",
    HI: "'स्क्रीन या कैमरा रिकॉर्ड करें' बटन का उपयोग करके रीयल-टाइम में रिकॉर्ड करें।",
    KO: "'화면 또는 카메라 녹화' 버튼으로 실시간 재생을 직접 캡처하세요."
  },
  "error.429.sol3": {
    PT: "Teste a conversão de mídia agora mesmo com o botão 'Testar com Vídeo de Exemplo'.",
    EN: "Test media conversion right now using the 'Test with Sample Video' button.",
    RU: "Проверьте конвертацию прямо сейчас с помощью кнопки 'Тестировать с примером видео'.",
    HI: "'नमूना वीडियो के साथ परीक्षण करें' बटन का उपयोग करके अभी मीडिया रूपांतरण का परीक्षण करें।",
    KO: "'샘플 비디오로 테스트' 버튼을 눌러 변환 기능을 즉시 확인해 보세요."
  },
  "faq.q4": {
    PT: "O que significa o erro 'Status 429' ao tentar baixar um link do YouTube?",
    EN: "What does the 'Status 429' error mean when downloading a YouTube link?",
    RU: "Что означает ошибка 'Status 429' при попытке скачать ссылку с YouTube?",
    HI: "YouTube लिंक डाउनलोड करते समय 'Status 429' त्रुटि का क्या अर्थ है?",
    KO: "YouTube 링크를 다운로드할 때 'Status 429' 오류는 무엇을 의미하나요?"
  },
  "faq.a4": {
    PT: "O código HTTP 429 significa 'Too Many Requests' (Muitas Requisições). Como o site está hospedado em servidores de nuvem (como Render/AWS), o YouTube bloqueia o endereço IP do servidor com proteções anti-bot. Para contornar isso com total privacidade e sem limites, você pode arrastar qualquer arquivo de vídeo do seu computador ou usar o recurso 'Gravar Tela ou Câmera'.",
    EN: "HTTP status 429 means 'Too Many Requests'. Because the app is hosted on cloud servers (such as Render/AWS), YouTube blocks data center IP addresses using anti-bot mechanisms. To bypass this seamlessly with full privacy, simply drop your video file directly from your computer or use the built-in Screen/Camera Recorder.",
    RU: "Код HTTP 429 означает 'Too Many Requests' (Слишком много запросов). Так как сервис размещен на облачных серверах (Render/AWS), YouTube блокирует IP-адреса дата-центров защитой от ботов. Чтобы обойти это, просто перетащите видеофайл со своего ПК или используйте функцию записи экрана/камеры.",
    HI: "HTTP कोड 429 का अर्थ है 'Too Many Requests' (अत्यधिक अनुरोध)। चूंकि साइट क्लाउड सर्वर (Render/AWS) पर होस्ट की गई है, YouTube डेटासेंटर आईपी को ब्लॉक कर देता है। आप अपने कंप्यूटर से वीडियो फ़ाइल खींचकर या स्क्रीन रिकॉर्डर का उपयोग करके बिना किसी सीमा के रूपांतरण कर सकते हैं।",
    KO: "HTTP 429 코드는 'Too Many Requests' (너무 많은 요청)를 의미합니다. 웹사이트가 클라우드 서버(Render/AWS 등)에서 호스팅되기 때문에 YouTube는 봇 방지 메커니즘을 통해 데이터센터 IP를 일시 차단합니다. 제한 없이 안전하게 사용하려면 PC에서 직접 파일을 드래그 앤 드롭하거나 내장된 '화면 또는 카메라 녹화' 기능을 사용하세요."
  },
  "ussd.badge": {
    PT: "Utilitários de Telefonia & Android",
    EN: "Telephony & Android Utilities",
    RU: "Утилиты телефонии и Android",
    HI: "टेलीफोनी और एंड्रॉइड यूटिलिटीज",
    KO: "전화 및 안드로이드 유틸리티"
  },
  "ussd.title": {
    PT: "Códigos USSD & MMI",
    EN: "USSD & MMI Codes",
    RU: "USSD и MMI коды",
    HI: "USSD और MMI कोड",
    KO: "USSD 및 MMI 코드"
  },
  "ussd.desc": {
    PT: "Pesquise atalhos rápidos de operadoras (Vivo, Claro, TIM, Oi) para consultar saldo, internet, além de códigos secretos de teste e diagnóstico do seu celular.",
    EN: "Search quick carrier shortcuts (Vivo, Claro, TIM, Oi) to check balance, internet, and secret mobile test & diagnostic codes.",
    RU: "Ищите быстрые сокращения операторов (Vivo, Claro, TIM, Oi) для проверки баланса, интернета, а также секретные коды тестирования и диагностики мобильного телефона.",
    HI: "संतुलन, इंटरनेट और गुप्त मोबाइल परीक्षण और नैदानिक कोड की जांच करने के लिए त्वरित वाहक शॉर्टकट (Vivo, Claro, TIM, Oi) खोजें.",
    KO: "잔액, 인터넷, 휴대전화 테스트 및 진단용 비밀 코드를 확인하기 위한 빠른 통신사 단축키(Vivo, Claro, TIM, Oi)를 검색하세요."
  },
  "ussd.search": {
    PT: "Buscar código, operadora ou função...",
    EN: "Search code, carrier or function...",
    RU: "Поиск кода, оператора или функции...",
    HI: "कोड, ऑपरेटर या फ़ंक्शन खोजें...",
    KO: "코드, 통신사 또는 기능 검색..."
  },
  "ussd.all": {
    PT: "Todas",
    EN: "All",
    RU: "Все",
    HI: "सभी",
    KO: "전체"
  },
  "ussd.universal": {
    PT: "Universal",
    EN: "Universal",
    RU: "Универсальный",
    HI: "सार्वभौमिक",
    KO: "범용"
  },
  "ussd.cat": {
    PT: "Categoria:",
    EN: "Category:",
    RU: "Категория:",
    HI: "श्रेणी:",
    KO: "카테고리:"
  },
  "ussd.cat.all": {
    PT: "Todas as Categorias",
    EN: "All Categories",
    RU: "Все категории",
    HI: "सभी श्रेणियां",
    KO: "모든 카테고리"
  },
  "ussd.cat.saldo": {
    PT: "💰 Saldo",
    EN: "💰 Balance",
    RU: "💰 Баланс",
    HI: "💰 शेष राशि",
    KO: "💰 잔액"
  },
  "ussd.cat.recarga": {
    PT: "💳 Recarga",
    EN: "💳 Recharge",
    RU: "💳 Пополнение",
    HI: "💳 रीचार्ज",
    KO: "💳 충전"
  },
  "ussd.cat.internet": {
    PT: "📶 Internet",
    EN: "📶 Internet",
    RU: "📶 Интернет",
    HI: "📶 इंटरनेट",
    KO: "📶 인터넷"
  },
  "ussd.cat.numero": {
    PT: "📞 Meu Número",
    EN: "📞 My Number",
    RU: "📞 Мой номер",
    HI: "📞 मेरा नंबर",
    KO: "📞 내 번호"
  },
  "ussd.cat.teste": {
    PT: "🛠️ Testes de Hardware",
    EN: "🛠️ Hardware Tests",
    RU: "🛠️ Тесты оборудования",
    HI: "🛠️ हार्डवेयर परीक्षण",
    KO: "🛠️ 하드웨어 테스트"
  },
  "ussd.cat.sistema": {
    PT: "⚙️ Sistema & IMEI",
    EN: "⚙️ System & IMEI",
    RU: "⚙️ Система и IMEI",
    HI: "⚙️ सिस्टम और IMEI",
    KO: "⚙️ 시스템 및 IMEI"
  },
  "ussd.copied": {
    PT: "Copiado",
    EN: "Copied",
    RU: "Скопировано",
    HI: "कॉपी किया गया",
    KO: "복사됨"
  },
  "ussd.tip": {
    PT: "Dica: Se você estiver acessando este site pelo celular, basta clicar no ícone do telefone verde para abrir o discador automático com o código USSD ou MMI pronto para ser executado.",
    EN: "Tip: If you are accessing this site from your mobile phone, simply click the green phone icon to open the automatic dialer with the USSD or MMI code ready to run.",
    RU: "Совет: Если вы заходите на этот сайт с мобильного телефона, просто нажмите на значок зеленого телефона, чтобы открыть автоматический номеронабиратель с готовым к запуску USSD или MMI кодом.",
    HI: "सुझाव: यदि आप अपने मोबाइल फोन से इस साइट पर पहुँच रहे हैं, तो USSD या MMI कोड चलाने के लिए तैयार स्वचालित डायलर खोलने के लिए बस हरे रंग के फोन आइकन पर क्लिक करें।",
    KO: "팁: 휴대전화로 이 사이트에 접속하는 경우 녹색 전화 아이콘을 클릭하기만 하면 실행할 준비가 된 USSD 또는 MMI 코드가 포함된 자동 다이얼러가 열립니다."
  },
  "header.popularCodes": {
    PT: "Códigos Populares",
    EN: "Popular Codes",
    RU: "Популярные коды",
    HI: "लोकप्रिय कोड",
    KO: "인기 코드"
  },
  "popular.modal.title": {
    PT: "Códigos USSD & MMI Mais Pesquisados",
    EN: "Most Searched USSD & MMI Codes",
    RU: "Самые популярные USSD и MMI коды",
    HI: "सबसे अधिक खोजे गए USSD और MMI कोड",
    KO: "가장 많이 검색된 USSD 및 MMI 코드"
  },
  "popular.modal.desc": {
    PT: "Atalhos rápidos mais utilizados para operadoras e diagnóstico de dispositivos móveis.",
    EN: "Most used quick shortcuts for carriers and mobile device diagnostics.",
    RU: "Наиболее используемые быстрые ярлыки для операторов и диагностики мобильных устройств.",
    HI: "वाहकों और मोबाइल डिवाइस निदान के लिए सबसे अधिक उपयोग किए جانے वाले त्वरित शॉर्टकट।",
    KO: "통신사 및 모바일 기기 진단을 위한 가장 많이 사용되는 빠른 단축키입니다."
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('PT');
  
  const t = (key: string): string => {
    if (!dict[key]) return key;
    return dict[key][lang] || dict[key]['PT'] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
