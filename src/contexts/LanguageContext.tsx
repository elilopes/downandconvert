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
  },
  "editorial.media.title": {
    PT: "Guia Definitivo de Conversão de Mídia e Privacidade no Navegador",
    EN: "Definitve Guide to Media Conversion and Browser Privacy",
    RU: "Официальное руководство по конвертации медиа и конфиденциальности в браузере",
    HI: "मीडिया रूपांतरण और ब्राउज़र गोपनीयता के लिए निश्चित मार्गदर्शिका",
    KO: "미디어 변환 및 브라우저 개인정보 보호를 위한 완벽 가이드"
  },
  "editorial.media.p1": {
    PT: "O Down&Convert é uma ferramenta profissional e multifuncional projetada para processamento de arquivos multimídia, conversão de formatos de áudio e vídeo (MP3, WAV, MP4, WebM, FLAC, etc.), gravação de tela e câmera, e gerenciamento de arquivos diretamente no seu navegador com total privacidade.",
    EN: "Down&Convert is a professional and multifunctional tool designed for multimedia file processing, audio and video format conversion (MP3, WAV, MP4, WebM, FLAC, etc.), screen and camera recording, and file management directly in your browser with complete privacy.",
    RU: "Down&Convert — это профессиональный многофункциональный инструмент для обработки мультимедиа, конвертации аудио и видео (MP3, WAV, MP4, WebM, FLAC и т.д.), записи экрана и управления файлами прямо в вашем браузере с полной конфиденциальностью.",
    HI: "Down&Convert मल्टीमीडिया फ़ाइल प्रसंस्करण, ऑडियो और वीडियो प्रारूप रूपांतरण (MP3, WAV, MP4, WebM, FLAC, आदि), स्क्रीन और कैमरा रिकॉर्डिंग, और पूर्ण गोपनीयता के साथ सीधे आपके ब्राउज़र में फ़ाइल प्रबंधन के लिए डिज़ाइन किया गया एक पेशेवर उपकरण है।",
    KO: "Down&Convert는 멀티미디어 파일 처리, 오디오 및 비디오 포맷 변환(MP3, WAV, MP4, WebM, FLAC 등), 화면 및 카메라 녹화, 브라우저 내 파일 관리를 완전한 개인정보 보호와 함께 제공하는 전문 멀티기능 도구입니다."
  },
  "editorial.media.h2": {
    PT: "Processamento Local e Privacidade de Dados",
    EN: "Local Processing and Data Privacy",
    RU: "Локальная обработка и конфиденциальность данных",
    HI: "स्थानीय प्रसंस्करण और डेटा गोपनीयता",
    KO: "로컬 처리 및 데이터 개인정보 보호"
  },
  "editorial.media.p2": {
    PT: "Diferente de plataformas tradicionais que enviam seus arquivos para servidores remotos na nuvem, nossa aplicação utiliza tecnologias avançadas de WebAssembly e FFmpeg rodando localmente no seu dispositivo. Isso garante que seus arquivos pessoais, gravações e mídias nunca saiam do seu computador, oferecendo máxima segurança e confidencialidade.",
    EN: "Unlike traditional platforms that upload your files to remote cloud servers, our application uses advanced WebAssembly and FFmpeg technologies running locally on your device. This ensures your personal files, recordings, and media never leave your computer, offering maximum security and confidentiality.",
    RU: "В отличие от традиционных платформ, загружающих файлы на удаленные облачные серверы, наше приложение использует передовые технологии WebAssembly и FFmpeg, работающие локально на вашем устройстве. Это гарантирует, что ваши личные файлы и записи никогда не покидают компьютер.",
    HI: "पारंपरिक प्लेटफार्मों के विपरीत जो आपकी फ़ाइलों को रिमोट क्लाउड सर्वर पर अपलोड करते हैं, हमारा एप्लिकेशन आपके डिवाइस पर स्थानीय रूप से चलने वाली उन्नत WebAssembly और FFmpeg तकनीकों का उपयोग करता है। यह सुनिश्चित करता है कि आपकी व्यक्तिगत फ़ाइलें कभी भी आपके कंप्यूटर से बाहर न जाएं।",
    KO: "파일을 원격 클라우드 서버에 업로드하는 전통적인 플랫폼과 달리, 당사 앱은 기기에서 로컬로 실행되는 고급 WebAssembly 및 FFmpeg 기술을 활용합니다. 이를 통해 개인 파일과 녹화물이 컴퓨터 외부로 유출되지 않고 최고 수준의 보안을 보장합니다."
  },
  "editorial.media.h3": {
    PT: "Como Utilizar os Recursos de Edição",
    EN: "How to Use Editing Features",
    RU: "Как использовать функции редактирования",
    HI: "संपादन सुविधाओं का उपयोग कैसे करें",
    KO: "편집 기능 사용 방법"
  },
  "editorial.media.p3": {
    PT: "Nossa plataforma permite cortar trechos de áudio e vídeo com precisão de milissegundos, ajustar taxas de bits (bitrate) para otimizar o tamanho do arquivo, adicionar metadados personalizados (artista, álbum, capa) e integrar perfeitamente seus downloads com o Google Drive.",
    EN: "Our platform allows you to trim audio and video clips with millisecond precision, adjust bitrates to optimize file size, add custom metadata (artist, album, cover art), and seamlessly integrate your downloads with Google Drive.",
    RU: "Наша платформа позволяет обрезать аудио и видеоклипы с точностью до миллисекунды, настраивать битрейт для оптимизации размера файлов, добавлять пользовательские метаданные (исполнитель, альбом, обложка) и интегрировать загрузки с Google Диском.",
    HI: "हमारा प्लेटफ़ॉर्म आपको मिलीसेकंड सटीकता के साथ ऑडियो और वीडियो क्लिप ट्रिम करने, फ़ाइल आकार को अनुकूलित करने के लिए बिटrate समायोजित करने, कस्टम मेटाडेटा (कलाकार, एल्बम, कवर आर्ट) जोड़ने और Google ड्राइव के साथ अपने डाउनलोड को सहजता से एकीकृत करने की अनुमति देता है.",
    KO: "당사 플랫폼은 밀리초 단위의 정밀도로 오디오 및 비디오 클립을 다듬고, 파일 크기를 최적화하기 위해 비트레이트를 조절하고, 맞춤형 메타데이터(아티스트, 앨범, 커버 아트)를 추가하며, Google 드라이브와 다운로드를 원활하게 연동할 수 있도록 지원합니다."
  },
  "editorial.ussd.title": {
    PT: "Guia Completo sobre Códigos USSD e MMI em Dispositivos Móveis",
    EN: "Complete Guide to USSD and MMI Codes on Mobile Devices",
    RU: "Полное руководство по кодам USSD и MMI на мобильных устройствах",
    HI: "मोबाइल उपकरणों पर USSD और MMI कोड के लिए पूर्ण मार्गदर्शिका",
    KO: "모바일 기기의 USSD 및 MMI 코드 완벽 가이드"
  },
  "editorial.ussd.p1": {
    PT: "Os códigos USSD (Unstructured Supplementary Service Data) e sequências MMI (Man-Machine Interface) são protocolos de comunicação fundamentais utilizados por redes de telefonia celular GSM, 3G, 4G e 5G para interagir em tempo real com os sistemas centrais da operadora e com o hardware do smartphone.",
    EN: "USSD (Unstructured Supplementary Service Data) codes and MMI (Man-Machine Interface) sequences are fundamental communication protocols used by GSM, 3G, 4G, and 5G cellular networks to interact in real-time with operator core systems and smartphone hardware.",
    RU: "Коды USSD (Unstructured Supplementary Service Data) и последовательности MMI (Man-Machine Interface) — это фундаментальные протоколы связи, используемые сотовыми сетями GSM, 3G, 4G и 5G для взаимодействия в реальном времени с центральными системами оператора.",
    HI: "USSD (Unstructured Supplementary Service Data) कोड और MMI (Man-Machine Interface) अनुक्रम ऑपरेटर कोर सिस्टम और स्मार्टफोन हार्डवेयर के साथ वास्तविक समय में बातचीत करने के लिए GSM, 3G, 4G और 5G सेलुलर नेटवर्क द्वारा उपयोग किए जाने वाले मूलभूत संचार प्रोटोकॉल हैं।",
    KO: "USSD(Unstructured Supplementary Service Data) 코드 및 MMI(Man-Machine Interface) 시퀀스는 GSM, 3G, 4G 및 5G 셀룰러 네트워크가 통신사 코어 시스템 및 스마트폰 하드웨어와 실시간으로 상호 작용하는 데 사용하는 핵심 통신 프로토콜입니다."
  },
  "editorial.ussd.h2": {
    PT: "Para que servem os códigos USSD e de Diagnóstico?",
    EN: "What are USSD and Diagnostic Codes Used For?",
    RU: "Для чего используются USSD и диагностические коды?",
    HI: "USSD और नैदानिक ​​कोड किसके लिए उपयोग किए जाते हैं?",
    KO: "USSD 및 진단 코드는 어떤 용도로 사용되나요?"
  },
  "editorial.ussd.p2": {
    PT: "Diferente das mensagens SMS tradicionais, as requisições USSD estabelecem uma sessão em tempo real que permite consultar saldos de créditos instantaneamente, verificar franquias de dados móveis, realizar recargas de emergência, solicitar o número da linha ou acessar menus interativos de atendimento ao cliente (como *800#, *544#, entre outros).",
    EN: "Unlike traditional SMS messages, USSD requests establish a real-time session allowing instant balance checks, mobile data allowance verification, emergency recharges, line number retrieval, or access to interactive customer service menus (such as *800#, *544#, among others).",
    RU: "В отличие от традиционных SMS-сообщений, запросы USSD устанавливают сеанс в реальном времени, позволяя мгновенно проверять баланс, интернет-трафик, выполнять экстренное пополнение счета или получать доступ к интерактивным меню (*800#, *544# и др.).",
    HI: "पारंपरिक एसएमएस संदेशों के विपरीत, USSD अनुरोध एक वास्तविक समय सत्र स्थापित करते हैं जो तत्काल शेष राशि की जांच, मोबाइल डेटा भत्ता सत्यापन, आपातकालीन रीचार्ज, या इंटरैक्टिव ग्राहक सेवा मेनू तक पहुंच की अनुमति देते हैं।",
    KO: "전통적인 SMS 메시지와 달리 USSD 요청은 실시간 세션을 설정하여 잔액 즉시 조회, 모바일 데이터 잔여량 확인, 비상 충전, 회선 번호 확인 또는 대고객 대화형 메뉴(*800#, *544# 등) 접근을 가능하게 합니다."
  },
  "editorial.ussd.p3": {
    PT: "Já os códigos MMI iniciados por asteriscos e hashtags (como *#06# para verificação do IMEI ou *#*#4636#*#* para estatísticas avançadas de bateria e rede) operam diretamente no nível de firmware e sistema operacional do aparelho, sendo ferramentas indispensáveis para técnicos, usuários avançados e verificações de segurança ao adquirir um smartphone usado.",
    EN: "Meanwhile, MMI codes starting with asterisks and hashtags (such as *#06# for IMEI verification or *#*#4636#*#* for advanced battery and network statistics) operate directly at the firmware and OS level, serving as essential tools for technicians, power users, and security checks when purchasing a used smartphone.",
    RU: "В свою очередь, коды MMI, начинающиеся с звездочек и решеток (например, *#06# для проверки IMEI или *#*#4636#*#* для расширенной статистики сети), работают на уровне прошивки и ОС, являясь незаменимыми инструментами для технических специалистов.",
    HI: "तारांकन और हैशटैग से शुरू होने वाले MMI कोड (जैसे IMEI सत्यापन के लिए *#06# या उन्नत बैटरी और नेटवर्क आँकड़ों के लिए *#*#4636#*#*) सीधे फर्मवेयर और OS स्तर पर काम करते हैं, जो तकनीکشियनों और उन्नत उपयोगकर्ताओं के लिए आवश्यक उपकरण हैं।",
    KO: "또한 별표와 해시태그로 시작하는 MMI 코드(IMEI 확인용 *#06# 또는 고급 배터리/네트워크 통계용 *#*#4636#*#*)는 펌웨어 및 OS 수준에서 직접 작동하므로 기술자, 파워 유저 및 중고 스마트폰 구매 시 보안 검사에 필수적인 도구입니다."
  },
  "editorial.ussd.h3": {
    PT: "Segurança e Boas Práticas",
    EN: "Security and Best Practices",
    RU: "Безопасность и лучшие практики",
    HI: "सुरक्षा और सर्वोत्तम प्रथाएं",
    KO: "보안 및 모범 사례"
  },
  "editorial.ussd.p4": {
    PT: "Recomendamos sempre utilizar canais oficiais e códigos validados por sua operadora de telefonia (Vivo, Claro, TIM, Oi). Evite digitar códigos desconhecidos recebidos de fontes não confiáveis, pois comandos avançados de fábrica podem restaurar padrões ou redefinir configurações de rede do seu dispositivo.",
    EN: "We always recommend using official channels and codes validated by your telecom operator (Vivo, Claro, TIM, Oi). Avoid typing unknown codes received from untrusted sources, as advanced factory commands can restore defaults or reset your device's network settings.",
    RU: "Мы всегда рекомендуем использовать официальные каналы и коды вашего оператора связи. Избегайте ввода неизвестных кодов из ненадежных источников.",
    HI: "हम हमेशा अपने टेलीकॉम ऑपरेटर द्वारा मान्य आधिकारिक चैनलों और कोड का उपयोग करने की सलाह देते हैं। अविश्वसनीय स्रोतों से प्राप्त अज्ञात कोड टाइप करने से बचें।",
    KO: "통신사에서 검증된 공식 채널과 코드를 항상 사용할 것을 권장합니다. 신뢰할 수 없는 출처의 알 수 없는 코드는 기기 네트워크 설정을 초기화할 수 있으므로 입력하지 마십시오."
  },
  "contact.emailLabel": {
    PT: "E-mail de Contato / Suporte",
    EN: "Contact / Support Email",
    RU: "Электронная почта / Поддержка",
    HI: "संपर्क / सहायता ईमेल",
    KO: "연락처 / 지원 이메일"
  },
  "ussd.code.vivo.8000.title": {
    PT: "Consultar Saldo Vivo",
    EN: "Check Vivo Balance",
    RU: "Проверить баланс Vivo",
    HI: "विवो शेष जांचें",
    KO: "비보 잔액 확인"
  },
  "ussd.code.vivo.8000.desc": {
    PT: "Recebe um SMS com o saldo de créditos e validade atual.",
    EN: "Receive an SMS with your credit balance and current validity.",
    RU: "Получите SMS с балансом кредитов и сроком действия.",
    HI: "क्रेडिट शेष और वर्तमान वैधता के साथ एक एसएमएस प्राप्त करें।",
    KO: "크레딧 잔액과 유효 기간이 담긴 SMS를 받습니다."
  },
  "ussd.code.vivo.800.title": {
    PT: "Atendimento Vivo",
    EN: "Vivo Customer Service",
    RU: "Обслуживание клиентов Vivo",
    HI: "विवो ग्राहक सेवा",
    KO: "비보 고객센터"
  },
  "ussd.code.vivo.800.desc": {
    PT: "Central de atendimento telefônico da operadora Vivo.",
    EN: "Vivo carrier telephone customer service center.",
    RU: "Телефонный центр обслуживания абонентов Vivo.",
    HI: "विवो ऑपरेटर टेलीफोन ग्राहक सेवा केंद्र।",
    KO: "비보 통신사 전화 고객센터입니다."
  },
  "ussd.code.vivo.8486.title": {
    PT: "Central de Relacionamento Vivo",
    EN: "Vivo Relationship Center",
    RU: "Центр обслуживания Vivo",
    HI: "विवो संबंध केंद्र",
    KO: "비보 관계 센터"
  },
  "ussd.code.vivo.8486.desc": {
    PT: "Falar diretamente com atendente Vivo.",
    EN: "Speak directly with a Vivo representative.",
    RU: "Поговорить напрямую с оператором Vivo.",
    HI: "विवो प्रतिनिधि से सीधे बात करें।",
    KO: "비보 상담원과 직접 통화합니다."
  },
  "ussd.code.vivo.7000.title": {
    PT: "Recarga Vivo com Cartão",
    EN: "Vivo Recharge with Card",
    RU: "Пополнение Vivo с карты",
    HI: "कार्ड के साथ विवो रीचार्ज",
    KO: "카드로 비보 충전"
  },
  "ussd.code.vivo.7000.desc": {
    PT: "Recarregue seus créditos informando o cartão de crédito.",
    EN: "Recharge your credits using your credit card information.",
    RU: "Пополните баланс с помощью кредитной карты.",
    HI: "क्रेडिट कार्ड की जानकारी देकर अपना क्रेडिट रीचार्ज करें।",
    KO: "신용카드 정보를 입력하여 크레딧을 충전합니다."
  },
  "ussd.code.claro.544.title": {
    PT: "Consultar Internet Claro",
    EN: "Check Claro Internet",
    RU: "Проверить интернет Claro",
    HI: "क्लارو इंटरनेट जांचें",
    KO: "클라로 인터넷 확인"
  },
  "ussd.code.claro.544.desc": {
    PT: "Verifica o saldo de internet móvel e bônus disponíveis.",
    EN: "Check mobile internet balance and available bonuses.",
    RU: "Проверьте баланс мобильного интернета и доступные бонусы.",
    HI: "मोबाइल इंटरनेट शेष और उपलब्ध बोनस की जाँच करें।",
    KO: "모바일 인터넷 잔여량 및 사용 가능한 보너스를 확인합니다."
  },
  "ussd.code.claro.546.title": {
    PT: "Consultar Saldo Claro",
    EN: "Check Claro Balance",
    RU: "Проверить баланс Claro",
    HI: "क्लارو शेष जांचें",
    KO: "클라로 잔액 확인"
  },
  "ussd.code.claro.546.desc": {
    PT: "Mostra o saldo atual em créditos na tela do celular.",
    EN: "Displays your current credit balance on the phone screen.",
    RU: "Показывает текущий баланс кредитов на экране телефона.",
    HI: "फ़ोन स्क्रीन पर आपका वर्तमान क्रेडिट शेष प्रदर्शित करता है।",
    KO: "휴대폰 화면에 현재 크레딧 잔액을 표시합니다."
  },
  "ussd.code.claro.555.title": {
    PT: "Recarga Claro",
    EN: "Claro Recharge",
    RU: "Пополнение Claro",
    HI: "क्लارو रीचार्ज",
    KO: "클라로 충전"
  },
  "ussd.code.claro.555.desc": {
    PT: "Menu interativo para recarga e consulta de benefícios.",
    EN: "Interactive menu for recharge and benefits consultation.",
    RU: "Интерактивное меню для пополнения и проверки бонусов.",
    HI: "रीचार्ज और लाभ परामर्श के लिए इंटरैक्टिव मेनू।",
    KO: "충전 및 혜택 조회를 위한 대화형 메뉴입니다."
  },
  "ussd.code.claro.510.title": {
    PT: "Descobrir Meu Número Claro",
    EN: "Find My Claro Number",
    RU: "Узнать свой номер Claro",
    HI: "मेरा क्लارو नंबर खोजें",
    KO: "내 클라로 번호 찾기"
  },
  "ussd.code.claro.510.desc": {
    PT: "Exibe o número da linha Claro na tela.",
    EN: "Displays your Claro line number on the screen.",
    RU: "Отображает номер вашей линии Claro на экране.",
    HI: "स्क्रीन पर आपकी क्लارو लाइन का नंबर प्रदर्शित करता है।",
    KO: "화면에 클라로 회선 번호를 표시합니다."
  },
  "ussd.code.tim.222.title": {
    PT: "Consultar Saldo TIM",
    EN: "Check TIM Balance",
    RU: "Проверить баланс TIM",
    HI: "टिम शेष जांचें",
    KO: "팀 잔액 확인"
  },
  "ussd.code.tim.222.desc": {
    PT: "Exibe o saldo de créditos e validade na tela.",
    EN: "Displays credit balance and validity on screen.",
    RU: "Отображает баланс кредитов и срок действия на экране.",
    HI: "स्क्रीन पर क्रेडिट शेष और वैधता प्रदर्शित करता है।",
    KO: "화면에 크레딧 잔액과 유효 기간을 표시합니다."
  },
  "ussd.code.tim.144.title": {
    PT: "Menu Principal TIM",
    EN: "TIM Main Menu",
    RU: "Главное меню TIM",
    HI: "टिम मुख्य मेनू",
    KO: "팀 메인 메뉴"
  },
  "ussd.code.tim.144.desc": {
    PT: "Acesse promoções, saldo e atendimento TIM.",
    EN: "Access TIM promotions, balance, and support.",
    RU: "Доступ к акциям, балансу и поддержке TIM.",
    HI: "टिम प्रचार, शेष और समर्थन तक पहुंचें।",
    KO: "팀 프로모션, 잔액 및 지원을 이용하세요."
  },
  "ussd.code.tim.271.title": {
    PT: "Descobrir Meu Número TIM",
    EN: "Find My TIM Number",
    RU: "Узнать свой номер TIM",
    HI: "मेरा टिम नंबर खोजें",
    KO: "내 팀 번호 찾기"
  },
  "ussd.code.tim.271.desc": {
    PT: "Mostra o DDD e número do seu chip TIM.",
    EN: "Shows the area code and number of your TIM SIM card.",
    RU: "Показывает код города и номер вашей сим-карты TIM.",
    HI: "आपके टिम सिम कार्ड का क्षेत्र कोड और नंबर दिखाता है।",
    KO: "팀 유심칩의 지역번호와 번호를 보여줍니다."
  },
  "ussd.code.tim.244.title": {
    PT: "Recarga TIM",
    EN: "TIM Recharge",
    RU: "Пополнение TIM",
    HI: "टिम रीचार्ज",
    KO: "팀 충전"
  },
  "ussd.code.tim.244.desc": {
    PT: "Serviço rápido de recarga de créditos.",
    EN: "Fast credit recharge service.",
    RU: "Быстрая услуга пополнения кредитов.",
    HI: "तेज़ क्रेडिट रीचार्ज सेवा।",
    KO: "빠른 크레딧 충전 서비스입니다."
  },
  "ussd.code.oi.880.title": {
    PT: "Menu Oi Interativo",
    EN: "Oi Interactive Menu",
    RU: "Интерактивное меню Oi",
    HI: "ऑई इंटरैक्टिव मेनू",
    KO: "오이 인터랙티브 메뉴"
  },
  "ussd.code.oi.880.desc": {
    PT: "Consulte saldo, internet, recargas e promoções.",
    EN: "Check balance, internet, recharges, and promotions.",
    RU: "Проверяйте баланс, интернет, пополнения и акции.",
    HI: "शेष, इंटरनेट, रीचार्ज और प्रचार की जाँच करें।",
    KO: "잔액, 인터넷, 충전 및 프로모션을 확인하세요."
  },
  "ussd.code.oi.800.title": {
    PT: "Saldo Oi por Voz",
    EN: "Oi Voice Balance",
    RU: "Баланс Oi по голосу",
    HI: "आवाज द्वारा ऑई शेष",
    KO: "음성 오이 잔액"
  },
  "ussd.code.oi.800.desc": {
    PT: "Ouvir o saldo de créditos por ligação automática.",
    EN: "Listen to credit balance through an automated call.",
    RU: "Прослушать баланс кредитов через автоматический вызов.",
    HI: "स्वचालित कॉल के माध्यम से क्रेडिट शेष सुनें।",
    KO: "자동 전화를 통해 크레딧 잔액을 들을 수 있습니다."
  },
  "ussd.code.geral.06.title": {
    PT: "Consultar IMEI (Universal)",
    EN: "Check IMEI (Universal)",
    RU: "Проверить IMEI (Универсальный)",
    HI: "IMEI जांचें (सार्वभौमिक)",
    KO: "IMEI 확인 (공통)"
  },
  "ussd.code.geral.06.desc": {
    PT: "Exibe o número de série de identificação global do aparelho (IMEI). Essencial para bloqueio em caso de roubo.",
    EN: "Displays the device's global identification serial number (IMEI). Essential for blocking in case of theft.",
    RU: "Отображает глобальный серийный номер устройства (IMEI). Необходимо для блокировки в случае кражи.",
    HI: "डिवाइस का वैश्विक पहचान सीरियल नंबर (IMEI) प्रदर्शित करता है। चोरी होने पर ब्लॉक करने के लिए आवश्यक।",
    KO: "기기의 글로벌 식별 일련번호(IMEI)를 표시합니다. 도난 시 차단에 필수적입니다."
  },
  "ussd.code.android.4636.title": {
    PT: "Menu de Informações e Diagnóstico",
    EN: "Information and Diagnostic Menu",
    RU: "Меню информации и диагностики",
    HI: "सूचना और नैदानिक मेनू",
    KO: "정보 및 진단 메뉴"
  },
  "ussd.code.android.4636.desc": {
    PT: "Mostra estatísticas de uso, bateria, conexão Wi-Fi e testes de rede.",
    EN: "Shows usage statistics, battery, Wi-Fi connection, and network tests.",
    RU: "Показывает статистику использования, батарею, Wi-Fi и сетевые тесты.",
    HI: "उपयोग के आँकड़े, बैटरी, वाई-फाई कनेक्शन और नेटवर्क परीक्षण दिखाता है।",
    KO: "사용 통계, 배터리, Wi-Fi 연결 및 네트워크 테스트를 보여줍니다."
  },
  "ussd.code.samsung.0.title": {
    PT: "Modo de Teste de Hardware (Samsung)",
    EN: "Hardware Test Mode (Samsung)",
    RU: "Режим тестирования оборудования (Samsung)",
    HI: "हार्डवेयर परीक्षण मोड (सैमसंग)",
    KO: "하드웨어 테스트 모드 (삼성)"
  },
  "ussd.code.samsung.0.desc": {
    PT: "Testa tela (cores RGB), touch screen, alto-falante, vibração, câmeras e sensores.",
    EN: "Tests screen (RGB colors), touch screen, speaker, vibration, cameras, and sensors.",
    RU: "Тестирует экран (RGB), сенсорный экран, динамик, вибрацию, камеры и датчики.",
    HI: "स्क्रीन (RGB रंग), टच स्क्रीन, स्पीकर, कंपन, कैमरे और सेंसर का परीक्षण करता है।",
    KO: "화면(RGB 색상), 터치스크린, 스피커, 진동, 카메라, 센서를 테스트합니다."
  },
  "ussd.code.android.34971539.title": {
    PT: "Informações da Câmera",
    EN: "Camera Information",
    RU: "Информация о камере",
    HI: "कैमरा जानकारी",
    KO: "카메라 정보"
  },
  "ussd.code.android.34971539.desc": {
    PT: "Exibe detalhes completos sobre o firmware e especificações das lentes da câmera.",
    EN: "Displays complete details about firmware and camera lens specifications.",
    RU: "Отображает полную информацию о прошивке и спецификациях объективов камеры.",
    HI: "फर्मवेयर और कैमरा लेंस विनिर्देशों के बारे में पूरी जानकारी प्रदर्शित करता है।",
    KO: "펌웨어 및 카메라 렌즈 사양에 대한 전체 세부 정보를 표시합니다."
  },
  "ussd.code.android.7594.title": {
    PT: "Alterar Comportamento do Botão Power",
    EN: "Change Power Button Behavior",
    RU: "Изменить поведение кнопки питания",
    HI: "पावर बटन व्यवहार बदलें",
    KO: "전원 버튼 동작 변경"
  },
  "ussd.code.android.7594.desc": {
    PT: "Permite desligar o aparelho diretamente ao segurar o botão power sem exibir o menu.",
    EN: "Allows turning off the device directly by holding the power button without displaying the menu.",
    RU: "Позволяет выключать устройство напрямую при удержании кнопки питания без меню.",
    HI: "मेनू प्रदर्शित किए बिना पावर बटन दबाए रखकर सीधे डिवाइस को बंद करने की अनुमति देता है।",
    KO: "메뉴를 표시하지 않고 전원 버튼을 길게 눌러 기기를 직접 끌 수 있습니다."
  },
  "ussd.code.android.232338.title": {
    PT: "Endereço MAC do Wi-Fi",
    EN: "Wi-Fi MAC Address",
    RU: "MAC-адрес Wi-Fi",
    HI: "वाई-फाई मैक एड्रेस",
    KO: "Wi-Fi MAC 주소"
  },
  "ussd.code.android.232338.desc": {
    PT: "Mostra o endereço MAC físico da placa de rede Wi-Fi.",
    EN: "Shows the physical MAC address of the Wi-Fi network card.",
    RU: "Показывает физический MAC-адрес сетевой карты Wi-Fi.",
    HI: "वाई-फाई नेटवर्क कार्ड का भौतिक मैक एड्रेस दिखाता है।",
    KO: "Wi-Fi 네트워크 카드의 물리적 MAC 주소를 표시합니다."
  },
  "ussd.code.android.0289.title": {
    PT: "Teste de Áudio / Melodia",
    EN: "Audio / Melody Test",
    RU: "Тест аудио / мелодии",
    HI: "ऑडियो / मेलोडी परीक्षण",
    KO: "오디오 / 멜로디 테스트"
  },
  "ussd.code.android.0289.desc": {
    PT: "Testa o funcionamento dos alto-falantes e campainha do smartphone.",
    EN: "Tests the operation of the smartphone speakers and ringer.",
    RU: "Тестирует работу динамиков и звонка смартфона.",
    HI: "स्मार्टफोन स्पीकर और रिंगर के संचालन का परीक्षण करता है।",
    KO: "스마트폰 스피커 및 벨소리 작동을 테스트합니다."
  },
  "ussd.code.android.0842.title": {
    PT: "Teste de Vibração e Luz de Fundo",
    EN: "Vibration and Backlight Test",
    RU: "Тест вибрации и подсветки",
    HI: "कंपन और बैकलाइट परीक्षण",
    KO: "진동 및 백라이트 테스트"
  },
  "ussd.code.android.0842.desc": {
    PT: "Testa o motor de vibração e o brilho da tela.",
    EN: "Tests the vibration motor and screen brightness.",
    RU: "Тестирует моторчик вибрации и яркость экрана.",
    HI: "कंपन मोटर और स्क्रीन चमक का परीक्षण करता है।",
    KO: "진동 모터와 화면 밝기를 테스트합니다."
  },
  "dropzone.extractAudio": {
    PT: "Extrair Áudio",
    EN: "Extract Audio",
    RU: "Извлечь аудио",
    HI: "ऑडियो निकालें",
    KO: "오디오 추출"
  },
  "dropzone.downloadVideo": {
    PT: "Baixar Vídeo",
    EN: "Download Video",
    RU: "Скачать видео",
    HI: "वीडियो डाउनलोड करें",
    KO: "비디오 다운로드"
  },
  "quality.highest": {
    PT: "Alta (Até 720p)",
    EN: "Highest (Up to 720p)",
    RU: "Высокое (До 720p)",
    HI: "सर्वोच्च (720p तक)",
    KO: "최고 (720p까지)"
  },
  "quality.medium": {
    PT: "Média (360p)",
    EN: "Medium (360p)",
    RU: "Среднее (360p)",
    HI: "मध्यम (360p)",
    KO: "중간 (360p)"
  },
  "quality.lowest": {
    PT: "Baixa Qualidade",
    EN: "Lowest Quality",
    RU: "Низкое качество",
    HI: "निम्न गुणवत्ता",
    KO: "낮은 화질"
  },
  "quality.video.high": {
    PT: "Alta (Lento)",
    EN: "High (Slow)",
    RU: "Высокое (Медленно)",
    HI: "उच्च (धीमा)",
    KO: "높음 (느림)"
  },
  "quality.video.medium": {
    PT: "Média (Padrão)",
    EN: "Medium (Standard)",
    RU: "Среднее (Стандарт)",
    HI: "मध्यम (मानक)",
    KO: "중간 (표준)"
  },
  "quality.video.low": {
    PT: "Baixa (Rápido)",
    EN: "Low (Fast)",
    RU: "Низкое (Быстро)",
    HI: "कम (तेज़)",
    KO: "낮음 (빠름)"
  },
  "ad.modal.title": {
    PT: "Aguarde um instante para iniciar sua conversão / download",
    EN: "Please wait a moment to start your conversion / download",
    RU: "Пожалуйста, подождите немного, чтобы начать конвертацию / загрузку",
    HI: "कृपया अपनी रूपांतरण / डाउनलोड शुरू होने के लिए एक क्षण प्रतीक्षा करें",
    KO: "변환 / 다운로드가 시작될 때까지 잠시 기다려 주세요"
  },
  "ad.modal.wait": {
    PT: "Espere {seconds}s p/ baixar",
    EN: "Wait {seconds}s to download",
    RU: "Подождите {seconds}с для скачивания",
    HI: "डाउनलोड करने के लिए {seconds}s प्रतीक्षा करें",
    KO: "다운로드하려면 {seconds}초 기다리세요"
  },
  "ad.modal.continue": {
    PT: "Continuar para o download agora ➔",
    EN: "Continue to download now ➔",
    RU: "Продолжить загрузку сейчас ➔",
    HI: "अब डाउनलोड जारी रखें ➔",
    KO: "지금 다운로드 계속하기 ➔"
  },
  "visitor.onlineNow": {
    PT: "online agora",
    EN: "online now",
    RU: "онлайн сейчас",
    HI: "ऑनलाइन अभी",
    KO: "온라인 접속 중"
  },
  "visitor.totalVisits": {
    PT: "Acessos Totais:",
    EN: "Total Visits:",
    RU: "Всего визитов:",
    HI: "कुल विजिट:",
    KO: "총 방문수:"
  },
  "cookie.banner.text": {
    PT: "Utilizamos cookies para melhorar sua experiência e personalizar conteúdo. Ao continuar navegando, você concorda com nosso uso de cookies.",
    EN: "We use cookies to improve your experience and personalize content. By continuing to browse, you agree to our use of cookies.",
    RU: "Мы используем файлы cookie для улучшения вашего опыта и персонализации контента. Продолжая просматривать сайт, вы соглашаетесь на использование нами файлов cookie.",
    HI: "हम आपके अनुभव को बेहतर बनाने और सामग्री को वैयक्तिकृत करने के लिए कुकीज़ का उपयोग करते हैं। ब्राउज़िंग जारी रखकर, आप हमारी कुकीज़ के उपयोग के लिए सहमत हैं।",
    KO: "당사는 귀하의 경험을 향상시키고 콘텐츠를 개인화하기 위해 쿠키를 사용합니다. 브라우징을 계속함으로써 귀하는 당사의 쿠키 사용에 동의하게 됩니다."
  },
  "cookie.banner.button": {
    PT: "Entendido",
    EN: "Got it",
    RU: "Понятно",
    HI: "समझ गया",
    KO: "알겠습니다"
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
