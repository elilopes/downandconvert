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
  "seo.title.converter": {
    PT: "Conversor de mídias (vídeos e áudios) | Down&Convert",
    EN: "Media Converter (Videos & Audio) | Down&Convert",
    RU: "Конвертер медиа (видео и аудио) | Down&Convert",
    HI: "मीडिया कनवर्टर (वीडियो और ऑडियो) | Down&Convert",
    KO: "미디어 변환기 (비디오 및 오디오) | Down&Convert"
  },
  "seo.desc.converter": {
    PT: "Converta vídeos ou áudios em vários formatos, e outros ajustes, gratuito e ilimitado.",
    EN: "Convert videos or audio to various formats, with custom adjustments, free and unlimited.",
    RU: "Конвертируйте видео или аудио в различные форматы с дополнительными настройками, бесплатно и без ограничений.",
    HI: "विभिन्न प्रारूपों में वीडियो या ऑडियो कनवर्ट करें, अन्य समायोजन के साथ, मुफ्त और असीमित।",
    KO: "다양한 형식으로 비디오나 오디오를 변환하고 추가 설정을 조절하세요, 무료 및 무제한."
  },
  "seo.title.downloader": {
    PT: "Baixar Vídeos Grátis | Down&Convert",
    EN: "Download Videos for Free | Down&Convert",
    RU: "Скачать видео бесплатно | Down&Convert",
    HI: "मुफ्त में वीडियो डाउनलोड करें | Down&Convert",
    KO: "무료로 비디오 다운로드 | Down&Convert"
  },
  "seo.desc.downloader": {
    PT: "Salve vídeos e áudios das suas redes sociais facilmente.",
    EN: "Easily save videos and audio from your social networks.",
    RU: "Легко сохраняйте видео и аудио из ваших социальных сетей.",
    HI: "अपने सोशल नेटवर्क से वीडियो और ऑडियो आसानी से सहेजें।",
    KO: "소셜 네트워크의 비디오와 오디오를 간편하게 저장하세요."
  },
  "seo.title.ussd": {
    PT: "Códigos USSD | Down&Convert",
    EN: "USSD Codes | Down&Convert",
    RU: "USSD коды | Down&Convert",
    HI: "USSD कोड | Down&Convert",
    KO: "USSD 코드 | Down&Convert"
  },
  "seo.desc.ussd": {
    PT: "Lista completa de códigos secretos USSD para sua operadora.",
    EN: "Complete list of secret USSD codes for your carrier.",
    RU: "Полный список секретных USSD кодов для вашего оператора.",
    HI: "आपके कैरियर के लिए गुप्त USSD कोड की पूरी सूची।",
    KO: "통신사를 위한 비밀 USSD 코드 전체 목록입니다."
  },
  "seo.title.smartphones": {
    PT: "Especificações de Smartphones | Down&Convert",
    EN: "Smartphone Specifications | Down&Convert",
    RU: "Характеристики смартфонов | Down&Convert",
    HI: "स्मार्टफोन विनिर्देश | Down&Convert",
    KO: "스마트폰 사양 | Down&Convert"
  },
  "seo.desc.smartphones": {
    PT: "Compare e descubra especificações detalhadas de smartphones.",
    EN: "Compare and discover detailed smartphone specifications.",
    RU: "Сравнивайте и узнавайте подробные характеристики смартфонов.",
    HI: "स्मार्टफोन के विस्तृत विनिर्देशों की तुलना करें और खोजें।",
    KO: "자세한 스마트폰 사양을 비교하고 확인하세요."
  },
  "seo.title.news": {
    PT: "Notícias de Tecnologia | Down&Convert",
    EN: "Technology News | Down&Convert",
    RU: "Новости технологий | Down&Convert",
    HI: "प्रौद्योगिकी समाचार | Down&Convert",
    KO: "기술 뉴스 | Down&Convert"
  },
  "seo.desc.news": {
    PT: "Fique por dentro das últimas notícias sobre gadgets e tecnologia.",
    EN: "Stay up to date with the latest gadgets and technology news.",
    RU: "Будьте в курсе последних новостей о гаджетах и технологиях.",
    HI: "गैजेट्स और प्रौद्योगिकी समाचारों के साथ अद्यतित रहें।",
    KO: "가젯 및 기술 뉴스에 대한 최신 소식을 받아보세요."
  },
  "header.subtitle": {
    PT: "by TechViva!",
    EN: "by TechViva!",
    RU: "by TechViva!",
    HI: "by TechViva!",
    KO: "by TechViva!"
  },
  "hero.title": {
    PT: "Baixe e converta mídias da web",
    EN: "Download and convert web media",
    RU: "Скачивайте и конвертируйте медиа из интернета",
    HI: "वेब से मीडिया डाउनलोड और कनवर्ट करें",
    KO: "웹에서 미디어 다운로드 및 변환"
  },
  "hero.desc": {
    PT: "Baixe mídias das redes sociais; converta vários formatos; códigos secretos do celular; notícias de gadgets e invenções; análise de celulares; crop de vídeo. by TechViva!",
    EN: "Download social media; convert various formats; phone secret codes; gadget & invention news; phone reviews; video crop. by TechViva!",
    RU: "Скачивайте медиа из соцсетей; конвертируйте в различные форматы; секретные коды телефонов; новости о гаджетах и изобретениях; анализ смартфонов; обрезка видео. by TechViva!",
    HI: "सोशल मीडिया डाउनलोड करें; विभिन्न प्रारूपों में कनवर्ट करें; फोन के गुप्त कोड; गैजेट और आविष्कार समाचार; स्मार्टफोन समीक्षा; वीडियो क्रॉप। by TechViva!",
    KO: "소셜 미디어 다운로드; 다양한 형식 변환; 휴대폰 비밀 코드; 가젯 및 발명 소식; 스마트폰 분석; 비디오 크롭. by TechViva!"
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
  "theme.dark": {
    PT: "Modo Escuro",
    EN: "Dark Mode",
    RU: "Тёмный режим",
    HI: "डार्क मोड",
    KO: "다크 모드"
  },
  "theme.light": {
    PT: "Modo Claro",
    EN: "Light Mode",
    RU: "Светлый режим",
    HI: "लाइट मोड",
    KO: "라이트 모드"
  },
  "theme.colorblind": {
    PT: "Modo Daltônico",
    EN: "Colorblind Mode",
    RU: "Режим для дальтоников",
    HI: "कलरब्लाइंड मोड",
    KO: "색맹 모드"
  },
  "theme.highContrast": {
    PT: "Super Contraste",
    EN: "High Contrast",
    RU: "Супер контраст",
    HI: "उच्च कंट्रास्ट",
    KO: "고대비 모드"
  },
  "dropzone.urlHint": {
    PT: "Baixar a mídia usando a URL (tiktok, instagram, facebook, vimeo e youtube)",
    EN: "Download media using URL (tiktok, instagram, facebook, vimeo and youtube)",
    RU: "Скачайте медиа по URL (tiktok, instagram, facebook, vimeo и youtube)",
    HI: "URL का उपयोग करके मीडिया डाउनलोड करें (tiktok, instagram, facebook, vimeo और youtube)",
    KO: "URL을 사용하여 미디어 다운로드 (tiktok, instagram, facebook, vimeo 및 youtube)"
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
    PT: "Arraste e solte suas mídias aqui para converter (áudio ou vídeo)",
    EN: "Drag and drop your media here to convert (audio or video)",
    RU: "Перетащите ваши медиафайлы сюда для конвертации (аудио или видео)",
    HI: "कन्वर्ट करने के लिए अपनी मीडिया यहां खींचें और छोड़ें (ऑडियो या वीडियो)",
    KO: "변환할 미디어 파일을 여기에 드래그 앤 드롭하세요 (오디오 또는 비디오)"
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
    PT: "Pesquise códigos USSD e MMI",
    EN: "Search USSD and MMI Codes",
    RU: "Поиск USSD и MMI кодов",
    HI: "USSD और MMI कोड खोजें",
    KO: "USSD 및 MMI 코드 검색"
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
  "ussd.cat.limpeza": {
    PT: "🧹 Limpeza & Logs",
    EN: "🧹 Clean & Logs",
    RU: "🧹 Очистка и логи",
    HI: "🧹 सफाई और लॉग",
    KO: "🧹 청소 및 로그"
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
  "ussd.code.vivo.activate52.title": {
    PT: "Ativar Siga-me (Vivo fora de SP) (*52*...)",
    EN: "Activate Call Forwarding (Vivo) (*52*...)",
    RU: "Включить переадресацию (Vivo) (*52*...)",
    HI: "कॉल अग्रेषण सक्रिय करें (वीवो) (*52*...)",
    KO: "착신 전환 활성화 (Vivo) (*52*...)"
  },
  "ussd.code.vivo.activate52.desc": {
    PT: "No Brasil, ativa o Siga-me (encaminhamento de chamadas) para clientes Vivo de regiões fora de São Paulo. Disque *52*NúmeroCelular# e ligue (desative com #52#).",
    EN: "In Brazil, activates Call Forwarding for Vivo customers outside São Paulo. Dial *52*PhoneNumber# and press call (deactivate with #52#).",
    RU: "В Бразилии: включает переадресацию для абонентов Vivo за пределами Сан-Паулу. Наберите *52*НомерТелефона# и вызов (отключение: #52#).",
    HI: "ब्राज़ील में साओ पाउलो के बाहर वीवो ग्राहकों के लिए कॉल फ़ॉरवर्डिंग सक्रिय करता है। *52*फ़ोननंबर# डायल करें (निष्क्रिय: #52#)।",
    KO: "브라질의 상파울루 외곽 Vivo 고객용 착신 전환 활성화 코드. *52*전화번호# 입력 후 통화 (비활성화: #52#)."
  },
  "ussd.code.vivo.deactivate52.title": {
    PT: "Desativar Siga-me (Vivo fora de SP) (#52#)",
    EN: "Deactivate Call Forwarding (Vivo) (#52#)",
    RU: "Отключить переадресацию (Vivo) (#52#)",
    HI: "कॉल अग्रेषण निष्क्रिय करें (वीवो) (#52#)",
    KO: "착신 전환 비활성화 (Vivo) (#52#)"
  },
  "ussd.code.vivo.deactivate52.desc": {
    PT: "Cancela o redirecionamento de chamadas (Siga-me) para a operadora Vivo fora de São Paulo (#52#).",
    EN: "Cancels call forwarding for the Vivo carrier outside São Paulo (#52#).",
    RU: "Отменяет переадресацию звонков для оператора Vivo за пределами Сан-Паулу (#52#).",
    HI: "साओ पाउलो के बाहर वीवो कैरियर के लिए कॉल फ़ॉरवर्डिंग रद्द करता है (#52#)।",
    KO: "상파울루 외곽 Vivo 통신사의 착신 전환을 취소합니다 (#52#)."
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
  "ussd.code.samsung.9900.title": {
    PT: "Limpeza SysDump / Dumpstate (*#9900#)",
    EN: "SysDump / Dumpstate Cleanup (*#9900#)",
    RU: "Очистка SysDump / Dumpstate (*#9900#)",
    HI: "SysDump / Dumpstate सफाई (*#9900#)",
    KO: "SysDump / Dumpstate 정리 (*#9900#)"
  },
  "ussd.code.samsung.9900.desc": {
    PT: "Acessa o menu SysDump no Samsung/Android para excluir logs temporários de logcat/dumpstate, liberar armazenamento interno e gerar relatórios de depuração.",
    EN: "Accesses the SysDump menu on Samsung/Android to delete temporary logcat/dumpstate logs, free up internal storage, and generate debug reports.",
    RU: "Открывает меню SysDump на Samsung/Android для удаления временных логов dumpstate/logcat, освобождения памяти и создания отчетов отладки.",
    HI: "Samsung/Android पर SysDump मेनू खोलता है ताकि अस्थायी logcat/dumpstate लॉग हटाए जा सकें, मेमोरी खाली की जा सके और डिबग रिपोर्ट बनाई जा सके।",
    KO: "Samsung/Android에서 SysDump 메뉴에 접속하여 임시 logcat/dumpstate 로그를 삭제하고 저장 공간을 확보하며 디버그 보고서를 생성합니다."
  },
  "ussd.code.samsung.2663.title": {
    PT: "Firmware TSP e TSK (*#2663#)",
    EN: "TSP & TSK Firmware (*#2663#)",
    RU: "Прошивка TSP и TSK (*#2663#)",
    HI: "फर्मवेयर TSP और TSK (*#2663#)",
    KO: "TSP 및 TSK 펌웨어 (*#2663#)"
  },
  "ussd.code.samsung.2663.desc": {
    PT: "Exibe e atualiza a versão de firmware da tela de toque (TSP), teclas de toque (TSK) e módulos de hardware.",
    EN: "Displays and updates firmware versions for the touch screen (TSP), touch keys (TSK), and hardware modules.",
    RU: "Отображает и обновляет версии прошивки сенсорного экрана (TSP), сенсорных клавиш (TSK) и модулей оборудования.",
    HI: "टच स्क्रीन (TSP), टच कीज़ (TSK) और हार्डवेयर मॉड्यूल के फर्मवेयर संस्करण प्रदर्शित और अपडेट करता है।",
    KO: "터치스크린(TSP), 터치키(TSK) 및 하드웨어 모듈의 펌웨어 버전을 확인하고 업데이트합니다."
  },
  "ussd.code.geral.puk05.title": {
    PT: "Desbloqueio de PUK (*#05#)",
    EN: "PUK Unlock (*#05#)",
    RU: "Разблокировка PUK (*#05#)",
    HI: "PUK अनलॉक (*#05#)",
    KO: "PUK 잠금 해제 (*#05#)"
  },
  "ussd.code.geral.puk05.desc": {
    PT: "Código para consultar o status ou desbloquear chip SIM bloqueado por PUK (*#05#).",
    EN: "Code to check status or unlock a PUK-locked SIM card (*#05#).",
    RU: "Код для проверки статуса или разблокировки SIM-карты, заблокированной PUK (*#05#).",
    HI: "PUK-लॉक सिम कार्ड की स्थिति जांचने या अनलॉक करने का कोड (*#05#)।",
    KO: "PUK으로 잠긴 SIM 카드의 상태를 확인하거나 잠금 해제하는 코드입니다 (*#05#)."
  },
  "ussd.code.samsung.9090.title": {
    PT: "Diagnóstico e Service Mode (*#9090#)",
    EN: "Diagnostic & Service Mode (*#9090#)",
    RU: "Диагностика и Service Mode (*#9090#)",
    HI: "निदान और सर्विस मोड (*#9090#)",
    KO: "진단 및 서비스 모드 (*#9090#)"
  },
  "ussd.code.samsung.9090.desc": {
    PT: "Acessa o modo de configuração de diagnóstico para depuração de rede, UART e parâmetros avançados de comunicação.",
    EN: "Accesses diagnostic configuration mode for network debugging, UART, and advanced communication parameters.",
    RU: "Открывает режим настройки диагностики для отладки сети, UART и расширенных параметров связи.",
    HI: "नेटवर्क डिबगिंग, UART और उन्नत संचार मापदंडों के लिए डायग्नोस्टिक कॉन्फ़िगरेशन मोड खोलता है।",
    KO: "네트워크 디버깅, UART 및 고급 통신 매개변수를 위한 진단 구성 모드에 접속합니다."
  },
  "ussd.code.samsung.0228.title": {
    PT: "Status e Calibragem da Bateria (*#0228#)",
    EN: "Battery Status & Calibration (*#0228#)",
    RU: "Статус и калибровка батареи (*#0228#)",
    HI: "बैटरी की स्थिति और अंशांकन (*#0228#)",
    KO: "배터리 상태 및 보정 (*#0228#)"
  },
  "ussd.code.samsung.0228.desc": {
    PT: "Exibe informações detalhadas sobre a rede, voltagem e permite calibrar a bateria em dispositivos Samsung.",
    EN: "Displays detailed information about network, voltage, and allows battery calibration on Samsung devices.",
    RU: "Отображает подробную информацию о сети, напряжении и позволяет откалибровать батарею на устройствах Samsung.",
    HI: "सैमसंग उपकरणों पर नेटवर्क, वोल्टेज के बारे में विस्तृत जानकारी प्रदर्शित करता है और बैटरी अंशांकन की अनुमति देता है।",
    KO: "삼성 기기에서 네트워크, 전압에 대한 자세한 정보를 표시하고 배터리 보정을 허용합니다."
  },
  "ussd.code.iphone.3001.title": {
    PT: "Field Test Mode / Força do Sinal (*3001#12345#*)",
    EN: "Field Test Mode / Signal Strength (*3001#12345#*)",
    RU: "Field Test Mode / Уровень сигнала (*3001#12345#*)",
    HI: "फील्ड टेस्ट मोड / सिग्नल शक्ति (*3001#12345#*)",
    KO: "필드 테스트 모드 / 신호 강도 (*3001#12345#*)"
  },
  "ussd.code.iphone.3001.desc": {
    PT: "Acessa o Field Test Mode no iPhone para ver a força do sinal em dBm e dados técnicos da rede celular (desligue o Wi-Fi antes).",
    EN: "Accesses Field Test Mode on iPhone to view signal strength in dBm and technical cellular network data (turn off Wi-Fi first).",
    RU: "Открывает Field Test Mode на iPhone для просмотра уровня сигнала в дБм и технических данных сотовой сети (сначала отключите Wi-Fi).",
    HI: "dBm में सिग्नल शक्ति और तकनीकी सेलुलर नेटवर्क डेटा देखने के लिए iPhone पर फील्ड टेस्ट मोड तक पहुँचता है (पहले वाई-फाई बंद करें)।",
    KO: "iPhone에서 필드 테스트 모드에 접속하여 dBm 단위의 신호 강도와 기술적인 셀룰러 네트워크 데이터를 확인합니다 (먼저 Wi-Fi를 끄세요)."
  },
  "ussd.code.geral.61.title": {
    PT: "Encaminhamento (Sem Resposta) (*#61#)",
    EN: "Call Forwarding (No Reply) (*#61#)",
    RU: "Переадресация (Нет ответа) (*#61#)",
    HI: "कॉल फ़ॉरवर्डिंग (कोई उत्तर नहीं) (*#61#)",
    KO: "착신 전환 (무응답) (*#61#)"
  },
  "ussd.code.geral.61.desc": {
    PT: "Consulta o status e o número de destino para chamadas não atendidas. Atenção: este código apenas consulta o status. Para ativar, digite o número de destino: *61*NúmeroCelular# e ligue (desative com #61#).",
    EN: "Checks forwarding status and destination number for unanswered calls. Note: this code only queries status. To activate, enter the destination phone number: dial *61*PhoneNumber# (deactivate with #61#).",
    RU: "Проверяет статус и номер назначения для неотвеченных вызовов. Внимание: код только проверяет статус. Для активации наберите номер назначения: *61*НомерТелефона# (отключение: #61#).",
    HI: "अनुत्तरित कॉल के लिए अग्रेषण स्थिति और गंतव्य नंबर की जांच करता है। ध्यान दें: यह कोड केवल स्थिति जांचता है। सक्रिय करने के लिए गंतव्य नंबर दर्ज करें: *61*फ़ोननंबर# (निष्क्रिय: #61#)।",
    KO: "전화를 받지 않을 때의 착신 전환 상태와 대상 번호를 확인합니다. 주의: 이 코드는 상태만 조회합니다. 활성화하려면 대상 전화번호를 입력하세요: *61*전화번호# (비활성화: #61#)."
  },
  "ussd.code.geral.activate61.title": {
    PT: "Ativar Encaminhamento (Claro) (*61*...)",
    EN: "Activate Forwarding if No Reply (*61*...)",
    RU: "Включить переадресацию при не ответе (*61*...)",
    HI: "उत्तर न मिलने पर अग्रेषण सक्रिय करें (*61*...)",
    KO: "무응답 시 착신 전환 활성화 (*61*...)"
  },
  "ussd.code.geral.activate61.desc": {
    PT: "No Brasil, usado pela Claro para encaminhar chamadas não atendidas em 20s. Disque *61*NúmeroCelular# e aperte ligar. Para cancelar, disque #61#.",
    EN: "Forwards unanswered calls to another phone number. Dial *61*PhoneNumber# and call. To cancel, dial #61#.",
    RU: "Переадресовывает неотвеченные звонки на другой номер. Наберите *61*НомерТелефона# и вызов. Для отмены наберите #61#.",
    HI: "अनुत्तरित कॉल किसी अन्य नंबर पर अग्रेषित करता है। *61*फ़ोननंबर# डायल करें। रद्द करने के लिए #61# डायल करें।",
    KO: "받지 않은 전화를 다른 휴대폰 번호로 착신 전환합니다. *61*전화번호# 입력 후 통화. 취소하려면 #61#."
  },
  "ussd.code.geral.deactivate61.title": {
    PT: "Desativar Encaminhamento Não Atendida (#61#)",
    EN: "Deactivate Forwarding if No Reply (#61#)",
    RU: "Отключить переадресацию при не ответе (#61#)",
    HI: "उत्तर न मिलने पर अग्रेषण निष्क्रिय करें (#61#)",
    KO: "무응답 시 착신 전환 비활성화 (#61#)"
  },
  "ussd.code.geral.deactivate61.desc": {
    PT: "Desativa o redirecionamento de chamadas quando você não atende (#61# ou ##61#).",
    EN: "Deactivates call forwarding when calls are unanswered (#61# or ##61#).",
    RU: "Отключает переадресацию вызовов при отсутствии ответа (#61# или ##61#).",
    HI: "कॉल का उत्तर न मिलने पर कॉल अग्रेषण को निष्क्रिय करता है (#61# या ##61#)।",
    KO: "전화를 받지 못했을 때의 착신 전환을 비활성화합니다 (#61# 또는 ##61#)."
  },
  "ussd.code.geral.67.title": {
    PT: "Encaminhamento (Ocupado) (*#67#)",
    EN: "Call Forwarding (Busy) (*#67#)",
    RU: "Переадресация (Занято) (*#67#)",
    HI: "कॉल फ़ॉरवर्डिंग (व्यस्त) (*#67#)",
    KO: "착신 전환 (통화 중) (*#67#)"
  },
  "ussd.code.geral.67.desc": {
    PT: "Consulta se as ligações são desviadas quando você está em outra ligação ou rejeita a chamada. Para ativar, é necessário digitar o número de destino: *63*NúmeroCelular# ou *67*NúmeroCelular# (desative com #63# ou #67#).",
    EN: "Checks if calls are forwarded when you are on another call or decline. To activate, enter the destination phone number: *63*PhoneNumber# or *67*PhoneNumber# (deactivate with #63# or #67#).",
    RU: "Проверяет статус переадресации, когда линия занята или вызов отклонен. Для активации введите номер назначения: *63*НомерТелефона# или *67*НомерТелефона# (отключение: #63# или #67#).",
    HI: "जांचता है कि क्या लाइन व्यस्त होने पर कॉल पुनर्निर्देशित की जाती हैं। सक्रिय करने के लिए गंतव्य नंबर दर्ज करें: *63*फ़ोननंबर# या *67*फ़ोननंबर# (निष्क्रिय: #63# या #67#)।",
    KO: "통화 중이거나 전화를 거절했을 때의 착신 전환 상태를 확인합니다. 활성화하려면 대상 전화번호를 입력하세요: *63*전화번호# 또는 *67*전화번호# (비활성화: #63# 또는 #67#)."
  },
  "ussd.code.geral.activate63.title": {
    PT: "Ativar Encaminhamento Ocupado (Claro) (*63*...)",
    EN: "Activate Forwarding When Busy (*63*...)",
    RU: "Включить переадресацию при занятости (*63*...)",
    HI: "व्यस्त होने पर अग्रेषण सक्रिय करें (*63*...)",
    KO: "통화 중 착신 전환 활성화 (*63*...)"
  },
  "ussd.code.geral.activate63.desc": {
    PT: "No Brasil, usado pela Claro para encaminhar chamadas quando a linha estiver ocupada. Disque *63*NúmeroCelular# e aperte chamar (para cancelar, disque #63#).",
    EN: "Forwards calls when your line is busy or rejected. Dial *63*PhoneNumber# and press call (to cancel, dial #63#).",
    RU: "Переадресовывает звонки при занятости или сбросе. Наберите *63*НомерТелефона# и вызов (для отмены наберите #63#).",
    HI: "लाइन व्यस्त होने या अस्वीकार करने पर कॉल अग्रेषित करता है। *63*फ़ोननंबर# डायल करें (रद्द करने के लिए #63#)।",
    KO: "통화 중이거나 수신 거절 시 전화를 다른 번호로 착신 전환합니다. *63*전화번호# 입력 후 통화 (취소: #63#)."
  },
  "ussd.code.geral.deactivate63.title": {
    PT: "Desativar Encaminhamento Se Ocupado (#63#)",
    EN: "Deactivate Forwarding When Busy (#63#)",
    RU: "Отключить переадресацию при занятости (#63#)",
    HI: "व्यस्त होने पर अग्रेषण निष्क्रिय करें (#63#)",
    KO: "통화 중 착신 전환 비활성화 (#63#)"
  },
  "ussd.code.geral.deactivate63.desc": {
    PT: "Cancela o encaminhamento de chamadas para quando a linha estiver ocupada (#63#).",
    EN: "Cancels call forwarding when the line is busy (#63#).",
    RU: "Отменяет переадресацию вызовов при занятой линии (#63#).",
    HI: "लाइन व्यस्त होने पर कॉल अग्रेषण रद्द करता है (#63#)।",
    KO: "통화 중 착신 전환을 취소합니다 (#63#)."
  },
  "ussd.code.geral.activate67.title": {
    PT: "Ativar Encaminhamento Ocupado GSM (*67*...)",
    EN: "Activate Busy Forwarding GSM (*67*...)",
    RU: "Включить переадресацию при занятости GSM (*67*...)",
    HI: "व्यस्त अग्रेषण सक्रिय करें GSM (*67*...)",
    KO: "통화 중 착신 전환 활성화 GSM (*67*...)"
  },
  "ussd.code.geral.activate67.desc": {
    PT: "Padrão universal GSM para encaminhar chamadas se a linha estiver ocupada. Digite *67*NúmeroCelular# e ligue (desative com #67#).",
    EN: "Universal GSM standard to forward calls when the line is busy. Dial *67*PhoneNumber# and call (deactivate with #67#).",
    RU: "Универсальный стандарт GSM для переадресации при занятой линии. Наберите *67*НомерТелефона# и вызов (отключение: #67#).",
    HI: "लाइन व्यस्त होने पर कॉल अग्रेषित करने के लिए सार्वभौमिक जीएसएम मानक। *67*फ़ोननंबर# डायल करें (निष्क्रिय: #67#)।",
    KO: "통화 중일 때 전화를 착신 전환하는 범용 GSM 표준입니다. *67*전화번호# 입력 후 통화 (비활성화: #67#)."
  },
  "ussd.code.geral.deactivate67.title": {
    PT: "Desativar Encaminhamento Ocupado GSM (#67#)",
    EN: "Deactivate Busy Forwarding GSM (#67#)",
    RU: "Отключить переадресацию при занятости GSM (#67#)",
    HI: "व्यस्त अग्रेषण निष्क्रिय करें GSM (#67#)",
    KO: "통화 중 착신 전환 비활성화 GSM (#67#)"
  },
  "ussd.code.geral.deactivate67.desc": {
    PT: "Desativa o encaminhamento de chamadas da linha ocupada no padrão universal GSM (#67# ou ##67#).",
    EN: "Deactivates busy call forwarding under universal GSM standard (#67# or ##67#).",
    RU: "Отключает переадресацию вызовов при занятой линии по стандарту GSM (#67# или ##67#).",
    HI: "यूनिवर्सल जीएसएम मानक के तहत व्यस्त कॉल अग्रेषण को निष्क्रिय करता है (#67# या ##67#)।",
    KO: "범용 GSM 표준에 따른 통화 중 착신 전환을 비활성화합니다 (#67# 또는 ##67#)."
  },
  "ussd.code.geral.31.title": {
    PT: "Ocultar Identificador de Chamadas (#31#)",
    EN: "Hide Caller ID (#31#)",
    RU: "Скрыть Caller ID (#31#)",
    HI: "कॉलर आईडी छुपाएं (#31#)",
    KO: "발신자 번호 표시 제한 (#31#)"
  },
  "ussd.code.geral.31.desc": {
    PT: "Disque #31# seguido do número do destinatário para ocultar seu número (Caller ID) em uma ligação específica.",
    EN: "Dial #31# followed by the recipient's number to hide your Caller ID for a specific call.",
    RU: "Наберите #31# перед номером получателя, чтобы скрыть свой номер (Caller ID) для конкретного звонка.",
    HI: "किसी विशिष्ट कॉल के लिए अपनी कॉलर आईडी छिपाने के लिए प्राप्तकर्ता के नंबर से पहले #31# डायल करें।",
    KO: "특정 통화에서 발신자 번호를 숨기려면 수신자 번호 앞에 #31#을 누르세요."
  },
  "ussd.code.geral.21.title": {
    PT: "Status de Encaminhamento Geral (*#21#)",
    EN: "General Call Forwarding Status (*#21#)",
    RU: "Статус переадресации вызовов (*#21#)",
    HI: "सामान्य कॉल अग्रेषण स्थिति (*#21#)",
    KO: "일반 착신 전환 상태 (*#21#)"
  },
  "ussd.code.geral.21.desc": {
    PT: "Verifica se há encaminhamento de chamadas ativo no seu número. Atenção: este código apenas consulta o status. Para ativar, é necessário digitar o número de destino: disque *21*NúmeroCelular# e ligue (desative com #21#).",
    EN: "Checks if there is any call forwarding active on your number. Note: this code only checks status. To activate, enter the destination phone number: dial *21*PhoneNumber# (deactivate with #21#).",
    RU: "Проверяет наличие активной переадресации на вашем номере. Внимание: этот код только проверяет статус. Для активации введите номер назначения: наберите *21*НомерТелефона# (отключение: #21#).",
    HI: "जांच करता है कि क्या आपके नंबर पर कोई कॉल अग्रेषण सक्रिय है। ध्यान दें: यह केवल स्थिति जांचता है। सक्रिय करने के लिए गंतव्य फ़ोन नंबर दर्ज करें: *21*फ़ोननंबर# (निष्क्रिय: #21#)।",
    KO: "번호에 활성화된 착신 전환이 있는지 확인합니다. 주의: 이 코드는 상태만 조회합니다. 활성화하려면 대상 전화번호를 입력하세요: *21*전화번호# (비활성화: #21#)."
  },
  "ussd.code.geral.activate21.title": {
    PT: "Ativar Siga-me (Claro/Oi/TIM) (*21*...)",
    EN: "Activate All Call Forwarding (*21*...)",
    RU: "Включить полную переадресацию (*21*...)",
    HI: "सभी कॉल अग्रेषण सक्रिय करें (*21*...)",
    KO: "모든 착신 전환 활성화 (*21*...)"
  },
  "ussd.code.geral.activate21.desc": {
    PT: "No Brasil (Claro, Oi, TIM), ativa o Siga-me (desvio de todas as chamadas). Disque *21*NúmeroCelular# e aperte chamar. Para cancelar, disque #21#.",
    EN: "Forwards all incoming calls unconditionally to another number. Dial *21*PhoneNumber# and press call. To cancel, dial #21#.",
    RU: "Безусловно переадресовывает все входящие вызовы на другой номер. Наберите *21*НомерТелефона# и вызов. Для отмены наберите #21#.",
    HI: "बिना शर्त सभी आने वाली कॉल किसी अन्य नंबर पर अग्रेषित करता है। *21*फ़ोननंबर# डायल करें। रद्द करने के लिए #21# डायल करें।",
    KO: "수신되는 모든 전화를 조건 없이 다른 번호로 착신 전환합니다. *21*전화번호# 입력 후 통화. 취소하려면 #21#."
  },
  "ussd.code.geral.deactivate21.title": {
    PT: "Desativar Encaminhamento Total (#21#)",
    EN: "Deactivate All Call Forwarding (#21#)",
    RU: "Отключить полную переадресацию (#21#)",
    HI: "सभी कॉल अग्रेषण निष्क्रिय करें (#21#)",
    KO: "모든 착신 전환 비활성화 (#21#)"
  },
  "ussd.code.geral.deactivate21.desc": {
    PT: "Cancela o encaminhamento total incondicional de todas as chamadas (#21# ou ##21#), voltando a tocar diretamente no seu aparelho.",
    EN: "Cancels unconditional call forwarding for all calls (#21# or ##21#), resuming ringing directly on your device.",
    RU: "Отменяет безусловную переадресацию всех вызовов (#21# или ##21#), возвращая вызовы на ваш аппарат.",
    HI: "सभी कॉल के लिए बिना शर्त कॉल अग्रेषण रद्द करता है (#21# या ##21#)।",
    KO: "모든 통화의 무조건 착신 전환을 취소하고 (#21# 또는 ##21#) 본인 기기에서 직접 수신합니다."
  },
  "ussd.code.geral.43.title": {
    PT: "Chamada em Espera (*#43#)",
    EN: "Call Waiting Status (*#43#)",
    RU: "Статус ожидания вызова (*#43#)",
    HI: "कॉल प्रतीक्षा स्थिति (*#43#)",
    KO: "통화 대기 상태 (*#43#)"
  },
  "ussd.code.geral.43.desc": {
    PT: "Confere se a chamada em espera está ativa. Use *43# para ativar e #43# para desativar.",
    EN: "Checks if call waiting is active. Use *43# to activate and #43# to deactivate.",
    RU: "Проверяет, активно ли ожидание вызова. Используйте *43# для включения и #43# для отключения.",
    HI: "जांच करता है कि कॉल प्रतीक्षा सक्रिय है या नहीं। सक्रिय करने के लिए *43# और निष्क्रिय करने के लिए #43# का उपयोग करें।",
    KO: "통화 대기가 활성화되어 있는지 확인합니다. 활성화하려면 *43#, 비활성화하려면 #43#을 사용하세요."
  },
  "ussd.code.geral.33.title": {
    PT: "Barramento de Chamadas (*#33#)",
    EN: "Call Barring Status (*#33#)",
    RU: "Статус запрета вызовов (*#33#)",
    HI: "कॉल बैरिंग स्थिति (*#33#)",
    KO: "발신 제한 상태 (*#33#)"
  },
  "ussd.code.geral.33.desc": {
    PT: "Verifica o status da restrição/barramento de chamadas de voz, SMS e dados.",
    EN: "Checks the status of call barring for voice, SMS, and data.",
    RU: "Проверяет статус запрета вызовов для голоса, SMS и данных.",
    HI: "वॉयस, एसएमएस और डेटा के लिए कॉल बैरिंग की स्थिति की जांच करता है।",
    KO: "음성, SMS 및 데이터에 대한 발신 제한 상태를 확인합니다."
  },
  "ussd.code.iphone.smsc.title": {
    PT: "Centro de Mensagens SMS (*#5005*7672#)",
    EN: "SMS Message Center (*#5005*7672#)",
    RU: "Центр SMS-сообщений (*#5005*7672#)",
    HI: "एसएमएस संदेश केंद्र (*#5005*7672#)",
    KO: "SMS 메시지 센터 (*#5005*7672#)"
  },
  "ussd.code.iphone.smsc.desc": {
    PT: "Consulta o número da central de mensagens (SMS) configurado na sua operadora.",
    EN: "Checks the SMS message center number configured on your carrier.",
    RU: "Проверяет номер центра SMS-сообщений, настроенный у вашего оператора.",
    HI: "आपके वाहक पर कॉन्फ़िगर किए गए एसएमएस संदेश केंद्र नंबर की जांच करता है।",
    KO: "이동통신사에 설정된 SMS 메시지 센터 번호를 확인합니다."
  },
  "ussd.code.iphone.alerttest.title": {
    PT: "Testar Sistema de Alerta (*5005*25371#)",
    EN: "Test Emergency Alerts (*5005*25371#)",
    RU: "Тест системы оповещения (*5005*25371#)",
    HI: "आपातकालीन अलर्ट का परीक्षण करें (*5005*25371#)",
    KO: "긴급 재난 문자 테스트 (*5005*25371#)"
  },
  "ussd.code.iphone.alerttest.desc": {
    PT: "Verifica se o sistema de alertas de emergência da rede celular está funcionando no iPhone.",
    EN: "Checks if the cellular network's emergency alert system is working on the iPhone.",
    RU: "Проверяет работу системы экстренных оповещений сотовой сети на iPhone.",
    HI: "जांच करता है कि सेलुलर नेटवर्क का आपातकालीन अलर्ट सिस्टम iPhone पर काम कर रहा है या नहीं।",
    KO: "셀룰러 네트워크의 긴급 재난 문자 시스템이 iPhone에서 작동하는지 확인합니다."
  },
  "ussd.code.iphone.alertdisable.title": {
    PT: "Desativar Alertas de Rede (*5005*25370#)",
    EN: "Disable Emergency Alerts (*5005*25370#)",
    RU: "Отключить оповещения сети (*5005*25370#)",
    HI: "आपातकालीन अलर्ट अक्षम करें (*5005*25370#)",
    KO: "긴급 재난 문자 비활성화 (*5005*25370#)"
  },
  "ussd.code.iphone.alertdisable.desc": {
    PT: "Desativa temporariamente o sistema de alertas de emergência pelo painel do iPhone.",
    EN: "Temporarily disables the emergency alert system through the iPhone dashboard.",
    RU: "Временно отключает систему экстренных оповещений через панель iPhone.",
    HI: "iPhone डैशबोर्ड के माध्यम से आपातकालीन अलर्ट सिस्टम को अस्थायी रूप से अक्षम करता है।",
    KO: "iPhone 대시보드를 통해 일시적으로 긴급 재난 문자 시스템을 비활성화합니다."
  },
  "ussd.code.iphone.data.title": {
    PT: "Uso de Dados (*3282#)",
    EN: "Data Usage (*3282#)",
    RU: "Использование данных (*3282#)",
    HI: "डेटा उपयोग (*3282#)",
    KO: "데이터 사용량 (*3282#)"
  },
  "ussd.code.iphone.data.desc": {
    PT: "Mostra informações de uso de dados celulares e franquia (funciona apenas em algumas operadoras).",
    EN: "Shows cellular data usage and plan information (works only on certain carriers).",
    RU: "Показывает информацию об использовании сотовых данных и тарифе (работает только у некоторых операторов).",
    HI: "सेलुलर डेटा उपयोग और योजना की जानकारी दिखाता है (केवल कुछ वाहकों पर काम करता है)।",
    KO: "셀룰러 데이터 사용량 및 요금제 정보를 표시합니다 (일부 이동통신사에서만 작동)."
  },
  "ussd.code.iphone.3370.title": {
    PT: "Modo EFR - Qualidade de Voz (*3370#)",
    EN: "EFR Mode - Voice Quality (*3370#)",
    RU: "Режим EFR - Качество голоса (*3370#)",
    HI: "EFR मोड - आवाज़ की गुणवत्ता (*3370#)",
    KO: "EFR 모드 - 통화 음질 향상 (*3370#)"
  },
  "ussd.code.iphone.3370.desc": {
    PT: "Ativa o modo Enhanced Full Rate (EFR) no iPhone para melhorar a nitidez e qualidade do som em chamadas celulares. Use #3370# para desativar.",
    EN: "Enables Enhanced Full Rate (EFR) mode on iPhone to improve voice clarity and sound quality during calls. Use #3370# to disable.",
    RU: "Включает режим Enhanced Full Rate (EFR) на iPhone для улучшения четкости речи при звонках. Используйте #3370# для отключения.",
    HI: "कॉल के दौरान आवाज़ की स्पष्टता में सुधार के लिए iPhone पर EFR मोड सक्षम करता है। अक्षम करने के लिए #3370# का उपयोग करें।",
    KO: "iPhone에서 통화 중 음성 선명도와 음질을 향상시키기 위해 EFR 모드를 활성화합니다. 비활성화하려면 #3370#을 사용하세요."
  },
  "ussd.code.iphone.activate43.title": {
    PT: "Ativar Chamada em Espera (*43#)",
    EN: "Activate Call Waiting (*43#)",
    RU: "Включить ожидание вызова (*43#)",
    HI: "कॉल प्रतीक्षा सक्रिय करें (*43#)",
    KO: "통화 대기 활성화 (*43#)"
  },
  "ussd.code.iphone.activate43.desc": {
    PT: "Ativa a chamada em espera no iPhone. Se alguém ligar enquanto você estiver em uma chamada, você ouvirá um aviso sonoro.",
    EN: "Enables call waiting on iPhone. You will receive a tone notification if another call comes in while you are talking.",
    RU: "Включает ожидание вызова на iPhone. Вы услышите сигнал, если поступит второй звонок.",
    HI: "iPhone पर कॉल प्रतीक्षा सक्षम करता है। बातचीत के दौरान दूसरी कॉल आने पर आपको बीप सुनाई देगी।",
    KO: "iPhone에서 통화 대기를 활성화합니다. 통화 중 다른 전화가 오면 알림음을 받습니다."
  },
  "ussd.code.iphone.deactivate43.title": {
    PT: "Desativar Chamada em Espera (#43#)",
    EN: "Deactivate Call Waiting (#43#)",
    RU: "Отключить ожидание вызова (#43#)",
    HI: "कॉल प्रतीक्षा निष्क्रिय करें (#43#)",
    KO: "통화 대기 비활성화 (#43#)"
  },
  "ussd.code.iphone.deactivate43.desc": {
    PT: "Desativa a função de chamada em espera no iPhone. Quem ligar enquanto a linha estiver ocupada ouvirá sinal de ocupado.",
    EN: "Disables call waiting on iPhone. Callers will hear a busy tone if your line is engaged.",
    RU: "Отключает функцию ожидания вызова на iPhone.",
    HI: "iPhone पर कॉल प्रतीक्षा अक्षम करता है। व्यस्त होने पर कॉल करने वाले को व्यस्त टोन सुनाई देगी।",
    KO: "iPhone에서 통화 대기를 비활성화합니다. 통화 중 전화가 걸려오면 통화 중 신호음이 들립니다."
  },
  "ussd.code.iphone.hide31.title": {
    PT: "Chamada Anônima / Ocultar Número (*31# + número)",
    EN: "Anonymous Call / Hide Number (*31# + number)",
    RU: "Анонимный звонок / Скрыть номер (*31# + номер)",
    HI: "अनाम कॉल / नंबर छुपाएं (*31# + नंबर)",
    KO: "발신 번호 표시 제한 (*31# + 번호)"
  },
  "ussd.code.iphone.hide31.desc": {
    PT: "Disque *31# antes do número desejado (ex: *31#11999998888) para fazer uma chamada oculta sem exibir seu identificador.",
    EN: "Dial *31# before the destination number to make an anonymous call hiding your caller ID.",
    RU: "Наберите *31# перед нужным номером, чтобы скрыть свой номер при звонке.",
    HI: "अपनी कॉलर आईडी छुपाकर कॉल करने के लिए गंतव्य नंबर से पहले *31# डायल करें।",
    KO: "발신자 번호를 숨기고 전화를 걸려면 대상 번호 앞에 *31#을 누르세요."
  },
  "ussd.code.iphone.imei.title": {
    PT: "Consultar IMEI do iPhone (*#06#)",
    EN: "Check iPhone IMEI (*#06#)",
    RU: "Проверить IMEI iPhone (*#06#)",
    HI: "iPhone IMEI जांचें (*#06#)",
    KO: "iPhone IMEI 확인 (*#06#)"
  },
  "ussd.code.iphone.imei.desc": {
    PT: "Exibe instantaneamente o número de série IMEI do iPhone. Essencial para verificar se o aparelho é original e para bloqueio em caso de furto.",
    EN: "Instantly displays the iPhone's IMEI number. Essential for checking authenticity and blocking if stolen.",
    RU: "Мгновенно отображает номер IMEI iPhone. Необходимо для проверки подлинности и блокировки при краже.",
    HI: "iPhone का IMEI नंबर तुरंत प्रदर्शित करता है। प्रामाणिकता की जांच और चोरी होने पर ब्लॉक करने के लिए आवश्यक।",
    KO: "iPhone의 IMEI 일련번호를 즉시 표시합니다. 정품 확인 및 분실/도난 시 기기 차단에 필수입니다."
  },
  "ussd.code.iphone.tests0.title": {
    PT: "Menu de Testes de Componentes (*#0*#)",
    EN: "Component Test Menu (*#0*#)",
    RU: "Меню тестирования компонентов (*#0*#)",
    HI: "घटक परीक्षण मेनू (*#0*#)",
    KO: "부품 테스트 메뉴 (*#0*#)"
  },
  "ussd.code.iphone.tests0.desc": {
    PT: "Menu de testes de hardware (tela, cores, sensores, vibração). Nota: muito comum em Android/Samsung; no iPhone o menu técnico oficial é o Field Test (*3001#12345#*).",
    EN: "Hardware test menu (screen, colors, sensors, vibration). Note: native on Android/Samsung; on iPhone the official technical menu is Field Test (*3001#12345#*).",
    RU: "Меню тестирования оборудования (экран, датчики, вибрация). Примечание: нативно для Android/Samsung; на iPhone официальное меню — Field Test (*3001#12345#*).",
    HI: "हार्डवेयर परीक्षण मेनू (स्क्रीन, सेंसर, कंपन)। ध्यान दें: Android/सैमसंग पर देशी; iPhone पर आधिकारिक मेनू फील्ड टेस्ट (*3001#12345#*) है।",
    KO: "하드웨어 테스트 메뉴(화면, 센서, 진동). 참고: Android/Samsung 기기 기본 기능이며, iPhone의 공식 엔지니어링 메뉴는 Field Test(*3001#12345#*)입니다."
  },
  "ussd.code.geral.646.title": {
    PT: "Minutos Usados e Saldo (#646# / #MIN#)",
    EN: "Used Minutes and Balance (#646# / #MIN#)",
    RU: "Использованные минуты и баланс (#646# / #MIN#)",
    HI: "उपयोग किए गए मिनट और शेष (#646# / #MIN#)",
    KO: "사용된 통화 분수 및 잔액 (#646# / #MIN#)"
  },
  "ussd.code.geral.646.desc": {
    PT: "Consulta o consumo de minutos do plano por SMS (646 soletra MIN no teclado). Muito comum em operadoras norte-americanas (AT&T, T-Mobile, Verizon).",
    EN: "Checks plan minute usage via SMS (646 spells MIN on keypad). Widely used by North American carriers (AT&T, T-Mobile, Verizon).",
    RU: "Проверяет расход минут по тарифу через SMS (646 соответствует слову MIN на клавиатуре). Популярно у операторов США (AT&T, T-Mobile, Verizon).",
    HI: "एसएमएस के माध्यम से योजना के मिनटों के उपयोग की जांच करता है (646 कीपैड पर MIN बनाता है)।",
    KO: "SMS로 요금제 음성 통화 사용량을 확인합니다 (키패드에서 646은 MIN). 북미 통신사(AT&T, T-Mobile, Verizon)에서 주로 사용됩니다."
  },
  "ussd.code.geral.100.title": {
    PT: "Descobrir Próprio Número (*#100#)",
    EN: "Find Own Number (*#100#)",
    RU: "Узнать собственный номер (*#100#)",
    HI: "अपना नंबर खोजें (*#100#)",
    KO: "본인 휴대폰 번호 확인 (*#100#)"
  },
  "ussd.code.geral.100.desc": {
    PT: "Exibe o próprio número da linha na tela em operadoras GSM compatíveis (como Vodafone UK, O2, Giffgaff, Rogers).",
    EN: "Displays your own phone number on screen across compatible GSM carriers (such as Vodafone UK, O2, Giffgaff, Rogers).",
    RU: "Отображает собственный номер телефона на экране в совместимых сетях GSM (Vodafone UK, O2, Giffgaff, Rogers).",
    HI: "संगत GSM वाहकों (जैसे Vodafone UK, O2, Giffgaff, Rogers) पर स्क्रीन पर अपना फ़ोन नंबर प्रदर्शित करता है।",
    KO: "호환되는 GSM 통신사(Vodafone UK, O2, Giffgaff, Rogers 등)에서 화면에 본인 전화번호를 표시합니다."
  },
  "ussd.code.geral.101.title": {
    PT: "Número / Registro HLR (*#101#)",
    EN: "HLR Number / Register (*#101#)",
    RU: "Номер / Реестр HLR (*#101#)",
    HI: "HLR नंबर / रजिस्टर (*#101#)",
    KO: "HLR 번호 / 등록 정보 (*#101#)"
  },
  "ussd.code.geral.101.desc": {
    PT: "Consulta o identificador de registro no HLR (Home Location Register) ou saldo em operadoras GSM europeias.",
    EN: "Queries the registration identifier in the Home Location Register (HLR) or balance on European GSM networks.",
    RU: "Запрашивает идентификатор регистрации в Home Location Register (HLR) или баланс в европейских сетях GSM.",
    HI: "यूरोपीय GSM नेटवर्क पर होम लोकेशन रजिस्टर (HLR) या बैलेंस में पंजीकरण पहचानकर्ता की जांच करता है।",
    KO: "유럽 GSM 네트워크에서 홈 위치 등록기(HLR) 등록 식별자 또는 잔액을 조회합니다."
  },
  "ussd.code.geral.102.title": {
    PT: "Número da Central de Serviços (*#102#)",
    EN: "Service Center Number (*#102#)",
    RU: "Номер сервисного центра (*#102#)",
    HI: "सेवा केंद्र नंबर (*#102#)",
    KO: "서비스 센터 번호 (*#102#)"
  },
  "ussd.code.geral.102.desc": {
    PT: "Consulta o número do centro de comutação ou central de serviços vinculado ao chip na rede celular.",
    EN: "Queries the switching center or service center number associated with the SIM card on the cellular network.",
    RU: "Запрашивает номер центра обслуживания или коммутации, связанного с SIM-картой в сети.",
    HI: "सेलुलर नेटवर्क पर सिम कार्ड से जुड़े सेवा केंद्र नंबर की जांच करता है।",
    KO: "셀룰러 네트워크에서 SIM 카드와 연결된 서비스 센터 번호를 조회합니다."
  },
  "ussd.code.geral.103.title": {
    PT: "Hora Oficial da Rede Celular (*#103#)",
    EN: "Official Cellular Network Time (*#103#)",
    RU: "Официальное время сотовой сети (*#103#)",
    HI: "आधिकारिक सेलुलर नेटवर्क समय (*#103#)",
    KO: "공식 셀룰러 네트워크 시간 (*#103#)"
  },
  "ussd.code.geral.103.desc": {
    PT: "Consulta a data e o horário oficiais transmitidos diretamente pelo relógio da central da rede GSM.",
    EN: "Queries the official date and time transmitted directly from the GSM network central clock.",
    RU: "Запрашивает официальную дату и время, передаваемые непосредственно центральными часами сети GSM.",
    HI: "जीएसएम नेटवर्क सेंट्रल क्लॉक से सीधे प्रसारित आधिकारिक तिथि और समय की जांच करता है।",
    KO: "GSM 네트워크 중앙 시계에서 직접 전송되는 공식 날짜 및 시간을 조회합니다."
  },
  "ussd.code.geral.104.title": {
    PT: "Número da Caixa Postal / Correio de Voz (*#104#)",
    EN: "Voicemail Center Number (*#104#)",
    RU: "Номер центра голосовой почты (*#104#)",
    HI: "वॉइसमेल केंद्र नंबर (*#104#)",
    KO: "음성 사서함 센터 번호 (*#104#)"
  },
  "ussd.code.geral.104.desc": {
    PT: "Mostra o número de discagem direta configurado para a caixa postal/correio de voz na sua operadora.",
    EN: "Shows the direct dialing number configured for the voicemail center on your carrier.",
    RU: "Показывает номер прямого набора, настроенный для голосовой почты у вашего оператора.",
    HI: "आपके वाहक पर वॉइसमेल केंद्र के लिए कॉन्फ़िगर किया गया डायरेक्ट डायलिंग नंबर दिखाता है।",
    KO: "통신사에 설정된 음성 사서함 센터 직통 다이얼 번호를 표시합니다."
  },
  "ussd.code.geral.105.title": {
    PT: "Número de Suporte da Central (*#105#)",
    EN: "Network Support Center Number (*#105#)",
    RU: "Номер центра поддержки сети (*#105#)",
    HI: "नेटवर्क सहायता केंद्र नंबर (*#105#)",
    KO: "네트워크 고객 지원 센터 번호 (*#105#)"
  },
  "ussd.code.geral.105.desc": {
    PT: "Informa o número da central de assistência técnica e suporte operacional da operadora de telefonia.",
    EN: "Provides the technical assistance and operational support center number for the telecom carrier.",
    RU: "Предоставляет номер центра технической помощи и поддержки оператора связи.",
    HI: "टेलीकॉम ऑपरेटर के तकनीकी सहायता और संचालन सहायता केंद्र का नंबर प्रदान करता है।",
    KO: "이동통신사의 기술 지원 및 운영 지원 센터 번호를 제공합니다."
  },
  "ussd.code.geral.147.title": {
    PT: "Última Chamada Recebida (*#147#)",
    EN: "Last Incoming Caller Number (*#147#)",
    RU: "Номер последнего входящего звонка (*#147#)",
    HI: "अंतिम आने वाली कॉल का नंबर (*#147#)",
    KO: "최근 수신 전화번호 확인 (*#147#)"
  },
  "ussd.code.geral.147.desc": {
    PT: "Informa o número da última pessoa que ligou para você (serviço 'Call Return' muito tradicional no Reino Unido e Europa, equivalente ao 1471).",
    EN: "Returns the phone number of the last caller who dialed your phone ('Call Return' service common in the UK and Europe, similar to 1471).",
    RU: "Показывает номер последнего звонившего абонента (услуга Call Return, популярная в Великобритании и Европе, аналог 1471).",
    HI: "आपको कॉल करने वाले अंतिम कॉलर का नंबर बताता है (यूके और यूरोप में 1471 के समान सेवा)।",
    KO: "최근 나에게 전화를 건 마지막 발신자의 전화번호를 안내합니다 (영국 및 유럽의 1471 통화 회신 서비스와 유사)."
  },
  "ussd.code.geral.activate43.title": {
    PT: "Ativar Chamada em Espera Universal (*43#)",
    EN: "Activate Call Waiting Universal (*43#)",
    RU: "Включить ожидание вызова универсально (*43#)",
    HI: "सार्वभौमिक कॉल प्रतीक्षा सक्रिय करें (*43#)",
    KO: "통화 대기 전역 활성화 (*43#)"
  },
  "ussd.code.geral.activate43.desc": {
    PT: "Padrão universal GSM (3GPP). Permite receber aviso sonoro de uma segunda chamada enquanto você conversa na linha principal.",
    EN: "Universal GSM 3GPP standard. Enables audio tone notification for incoming second calls while you are on an active call.",
    RU: "Универсальный стандарт GSM 3GPP. Позволяет получать звуковой сигнал о втором звонке во время разговора.",
    HI: "सार्वभौमिक GSM 3GPP मानक। बातचीत के दौरान दूसरी इनकमिंग कॉल की टोन सूचना सक्षम करता है।",
    KO: "범용 GSM 3GPP 표준. 통화 중에 걸려오는 두 번째 전화에 대한 신호음 알림을 활성화합니다."
  },
  "ussd.code.geral.deactivate43.title": {
    PT: "Desativar Chamada em Espera Universal (#43#)",
    EN: "Deactivate Call Waiting Universal (#43#)",
    RU: "Отключить ожидание вызова универсально (#43#)",
    HI: "सार्वभौमिक कॉल प्रतीक्षा निष्क्रिय करें (#43#)",
    KO: "통화 대기 전역 비활성화 (#43#)"
  },
  "ussd.code.geral.deactivate43.desc": {
    PT: "Padrão universal GSM (3GPP). Desliga a chamada em espera em qualquer celular; chamadas simultâneas ouvirão sinal de ocupado.",
    EN: "Universal GSM 3GPP standard. Disables call waiting on any phone; simultaneous incoming calls will receive a busy signal.",
    RU: "Универсальный стандарт GSM 3GPP. Отключает ожидание вызова на любом телефоне; занятые абоненты услышат сигнал «занято».",
    HI: "सार्वभौमिक GSM 3GPP मानक। किसी भी फ़ोन पर कॉल प्रतीक्षा अक्षम करता है; व्यस्त होने पर कॉल करने वाले को व्यस्त टोन मिलेगी।",
    KO: "범용 GSM 3GPP 표준. 모든 휴대폰에서 통화 대기를 끕니다. 통화 중 걸려오는 전화는 통화 중 신호음을 수신합니다."
  },
  "ussd.code.geral.78.title": {
    PT: "Não Perturbe / DND (*78)",
    EN: "Do Not Disturb / DND (*78)",
    RU: "Не беспокоить / DND (*78)",
    HI: "डोंट डिस्टर्ब / DND (*78)",
    KO: "방해 금지 / DND (*78)"
  },
  "ussd.code.geral.78.desc": {
    PT: "Código vertical de rede (NANP/VoIP/PBX). Ativa o modo 'Não Perturbe', direcionando ligações diretamente para a caixa postal. Para cancelar use *79.",
    EN: "Vertical service code (NANP/VoIP/PBX). Activates 'Do Not Disturb', sending incoming calls straight to voicemail. Use *79 to cancel.",
    RU: "Вертикальный код (NANP/VoIP/АТС). Включает режим «Не беспокоить», перенаправляя звонки прямо на голосовую почту. Для отключения наберите *79.",
    HI: "वर्टिकल सेवा कोड। 'डू नॉट डिस्टर्ब' सक्रिय करता है, कॉलों को सीधे वॉइसमेल पर भेजता है। रद्द करने के लिए *79 का उपयोग करें।",
    KO: "수직 서비스 코드(NANP/VoIP/PBX). '방해 금지'를 활성화하여 전화를 음성 사서함으로 바로 넘깁니다. 해제하려면 *79를 누르세요."
  },
  "ussd.code.vodafone.1345.title": {
    PT: "Saldo Pré-Pago Vodafone UK (*#1345#)",
    EN: "Vodafone UK Prepaid Balance (*#1345#)",
    RU: "Баланс предоплаты Vodafone UK (*#1345#)",
    HI: "वोडाफोन यूके प्रीपेड शेष (*#1345#)",
    KO: "Vodafone 영국 선불 잔액 조회 (*#1345#)"
  },
  "ussd.code.vodafone.1345.desc": {
    PT: "Exibe instantaneamente na tela o saldo de créditos e validade da linha pré-paga (Pay As You Go) da Vodafone UK.",
    EN: "Instantly displays credit balance and validity for Vodafone Pay As You Go prepaid lines on screen.",
    RU: "Мгновенно отображает баланс и срок действия предоплаченной линии Vodafone UK (Pay As You Go) на экране.",
    HI: "स्क्रीन पर वोडाफोन यूके पे ऐज़ यू गो प्रीपेड लाइनों के लिए तुरंत क्रेडिट बैलेंस और वैधता प्रदर्शित करता है।",
    KO: "Vodafone UK Pay As You Go 선불 요금제의 크레딧 잔액과 유효 기간을 화면에 즉시 표시합니다."
  },
  "ussd.code.vodafone.174.title": {
    PT: "Menu de Saldo e Recargas Vodafone (*174#)",
    EN: "Vodafone Balance & Top-Up Menu (*174#)",
    RU: "Меню баланса и пополнения Vodafone (*174#)",
    HI: "वोडाफोन बैलेंस और टॉप-अप मेनू (*174#)",
    KO: "Vodafone 잔액 및 충전 메뉴 (*174#)"
  },
  "ussd.code.vodafone.174.desc": {
    PT: "Menu interativo USSD da Vodafone (Irlanda, Espanha e Europa) para consultar saldo, pacotes de dados e efetuar recargas.",
    EN: "Interactive Vodafone USSD menu (Ireland, Spain, Europe) to check balance, data packages, and perform top-ups.",
    RU: "Интерактивное меню USSD Vodafone (Ирландия, Испания, Европа) для проверки баланса, пакетов данных и пополнения счета.",
    HI: "शेष राशि, डेटा पैकेज की जांच करने और टॉप-अप करने के लिए वोडाफोन इंटरैक्टिव यूएसएसडी मेनू।",
    KO: "잔액, 데이터 패키지를 확인하고 충전할 수 있는 Vodafone 대화형 USSD 메뉴(아일랜드, 스페인, 유럽 등)입니다."
  },
  "ussd.code.correios.225.title": {
    PT: "Consultar Saldo e Consumo (Correios)",
    EN: "Check Balance and Usage (Correios)",
    RU: "Проверить баланс и использование (Correios)",
    HI: "बैलेंस और उपयोग की जांच करें (क्रेयोस)",
    KO: "잔액 및 사용량 확인 (Correios)"
  },
  "ussd.code.correios.225.desc": {
    PT: "Consulta o saldo, consumo de dados móveis, SMS e minutos disponíveis, além da validade do plano no Correios Celular (*225#).",
    EN: "Checks balance, mobile data usage, SMS, available minutes, and plan validity on Correios Celular (*225#).",
    RU: "Проверяет баланс, использование мобильных данных, SMS, доступные минуты и срок действия тарифа на Correios Celular (*225#).",
    HI: "क्रेयोस सेल्युलर (*225#) पर बैलेंस, मोबाइल डेटा उपयोग, एसएमएस, उपलब्ध मिनट और प्लान की वैधता की जांच करता है।",
    KO: "Correios Celular(*225#)에서 잔액, 모바일 데이터 사용량, SMS, 남은 통화 시간 및 요금제 유효 기간을 확인합니다."
  },
  "ussd.code.correios.221.title": {
    PT: "Descobrir o Próprio Número (Correios)",
    EN: "Find Your Own Number (Correios)",
    RU: "Узнать свой номер (Correios)",
    HI: "अपना नंबर खोजें (क्रेयोस)",
    KO: "내 번호 찾기 (Correios)"
  },
  "ussd.code.correios.221.desc": {
    PT: "Exibe na tela o seu número de telefone da operadora Correios Celular (*221#).",
    EN: "Displays your phone number for the Correios Celular carrier on the screen (*221#).",
    RU: "Отображает на экране ваш номер телефона оператора Correios Celular (*221#).",
    HI: "स्क्रीन पर आपके क्रेयोस सेल्युलर कैरियर का फ़ोन नंबर प्रदर्शित करता है (*221#)।",
    KO: "Correios Celular 통신사의 전화번호를 화면에 표시합니다 (*221#)."
  },
  "ussd.code.correios.220.title": {
    PT: "Ativação de Chip Correios Celular",
    EN: "Correios Celular SIM Activation",
    RU: "Активация SIM-карты Correios Celular",
    HI: "क्रेयोस सेल्युलर सिम सक्रियण",
    KO: "Correios Celular SIM 활성화"
  },
  "ussd.code.correios.220.desc": {
    PT: "Menu interativo para ativação de um novo chip (SIM card) da operadora Correios Celular (*220#).",
    EN: "Interactive menu to activate a new SIM card from the Correios Celular carrier (*220#).",
    RU: "Интерактивное меню для активации новой SIM-карты оператора Correios Celular (*220#).",
    HI: "क्रेयोस सेल्युलर कैरियर (*220#) से नए सिम कार्ड को सक्रिय करने के लिए इंटरैक्टिव मेनू।",
    KO: "Correios Celular 통신사의 새 SIM 카드를 활성화하는 대화형 메뉴입니다 (*220#)."
  },
  "ussd.code.fintech.334.title": {
    PT: "M-Pesa Mobile Banking (*334#)",
    EN: "M-Pesa Mobile Banking (*334#)",
    RU: "Мобильный банкинг M-Pesa (*334#)",
    HI: "एम-पेसा मोबाइल बैंकिंग (*334#)",
    KO: "M-Pesa 모바일 뱅킹 (*334#)"
  },
  "ussd.code.fintech.334.desc": {
    PT: "Canal USSD do M-Pesa (maior FinTech da África) para transferências P2P, pagamentos e saques via celular sem internet.",
    EN: "M-Pesa USSD channel (Africa's largest FinTech) for P2P transfers, payments, and withdrawals via mobile without internet.",
    RU: "USSD-канал M-Pesa (крупнейший финтех Африки) для P2P-переводов, платежей и снятия средств с мобильного без интернета.",
    HI: "एम-पेसा (अफ्रीका का सबसे बड़ा फिनटेक) यूएसएसडी चैनल पी2पी ट्रांसफर, भुगतान और बिना इंटरनेट के मोबाइल से निकासी के लिए।",
    KO: "인터넷 없이 모바일을 통한 P2P 송금, 결제 및 출금을 지원하는 아프리카 최대 핀테크 M-Pesa의 USSD 채널입니다."
  },
  "ussd.code.fintech.151.title": {
    PT: "EcoCash Mobile Money (*151#)",
    EN: "EcoCash Mobile Money (*151#)",
    RU: "Мобильные деньги EcoCash (*151#)",
    HI: "इकोकैश मोबाइल मनी (*151#)",
    KO: "EcoCash 모바일 머니 (*151#)"
  },
  "ussd.code.fintech.151.desc": {
    PT: "Acesso rápido aos serviços financeiros móveis EcoCash (carteira digital) para pagamentos e gestão de saldo.",
    EN: "Quick access to EcoCash mobile financial services (digital wallet) for payments and balance management.",
    RU: "Быстрый доступ к мобильным финансовым услугам EcoCash (цифровой кошелек) для платежей и управления балансом.",
    HI: "भुगतान और शेष प्रबंधन के लिए इकोकैश मोबाइल वित्तीय सेवाओं (डिजिटल वॉलेट) तक त्वरित पहुंच।",
    KO: "결제 및 잔액 관리를 위한 EcoCash 모바일 금융 서비스(디지털 지갑)에 빠르게 접속합니다."
  },
  "ussd.code.iot.0011.title": {
    PT: "Diagnóstico de Rede IoT / POS (*#0011#)",
    EN: "IoT / POS Network Diagnostics (*#0011#)",
    RU: "Диагностика сети IoT / POS (*#0011#)",
    HI: "IoT / POS नेटवर्क डायग्नोस्टिक्स (*#0011#)",
    KO: "IoT / POS 네트워크 진단 (*#0011#)"
  },
  "ussd.code.iot.0011.desc": {
    PT: "Exibe força do sinal, banda e torre (Cell ID). Fundamental para diagnosticar falhas de conexão em Máquinas de Cartão (POS) e telemetria.",
    EN: "Displays signal strength, band, and tower (Cell ID). Essential for diagnosing connection failures in POS machines and telemetry.",
    RU: "Отображает уровень сигнала, диапазон и вышку (Cell ID). Важно для диагностики сбоев подключения в POS-терминалах и телеметрии.",
    HI: "सिग्नल शक्ति, बैंड और टावर (सेल आईडी) प्रदर्शित करता है। POS मशीनों और टेलीमेट्री में कनेक्शन विफलताओं के निदान के लिए आवश्यक।",
    KO: "신호 강도, 대역 및 기지국(Cell ID)을 표시합니다. 카드 결제기(POS) 및 원격 측정의 연결 오류 진단에 필수적입니다."
  },
  "ussd.code.iot.7353.title": {
    PT: "Teste de Hardware Smart POS (*#7353#)",
    EN: "Smart POS Hardware Test (*#7353#)",
    RU: "Тест оборудования Smart POS (*#7353#)",
    HI: "स्मार्ट POS हार्डवेयर टेस्ट (*#7353#)",
    KO: "스마트 POS 하드웨어 테스트 (*#7353#)"
  },
  "ussd.code.iot.7353.desc": {
    PT: "Menu de diagnóstico rápido para testar tela, câmera e áudio em terminais de pagamento Android (Smart POS) e dispositivos IoT.",
    EN: "Quick diagnostic menu to test screen, camera, and audio on Android payment terminals (Smart POS) and IoT devices.",
    RU: "Меню быстрой диагностики для проверки экрана, камеры и звука на платежных терминалах Android (Smart POS) и устройствах IoT.",
    HI: "एंड्रॉइड पेमेंट टर्मिनलों (स्मार्ट POS) और IoT उपकरणों पर स्क्रीन, कैमरा और ऑडियो का परीक्षण करने के लिए त्वरित नैदानिक मेनू।",
    KO: "Android 결제 단말기(스마트 POS) 및 IoT 기기의 화면, 카메라, 오디오를 테스트하는 빠른 진단 메뉴입니다."
  },
  "ussd.code.geral.pin04.title": {
    PT: "Alterar Código PIN (**04*...)",
    EN: "Change SIM PIN (**04*...)",
    RU: "Сменить PIN-код SIM (**04*...)",
    HI: "सिम पिन बदलें (**04*...)",
    KO: "SIM PIN 변경 (**04*...)"
  },
  "ussd.code.geral.pin04.desc": {
    PT: "Padrão oficial 3GPP/GSM: altera a senha PIN principal do chip SIM digitando **04*PIN_antigo*PIN_novo*PIN_novo#.",
    EN: "Official 3GPP/GSM standard: changes the primary SIM PIN by dialing **04*oldPIN*newPIN*newPIN#.",
    RU: "Официальный стандарт 3GPP/GSM: меняет основной PIN-код SIM-карты набором **04*старыйPIN*новыйPIN*новыйPIN#.",
    HI: "आधिकारिक 3GPP/GSM मानक: **04*पुरानाPIN*नयाPIN*नयाPIN# डायल करके प्राथमिक सिम पिन बदलें।",
    KO: "공식 3GPP/GSM 표준: **04*기존PIN*새PIN*새PIN#을 입력하여 기본 SIM PIN 번호를 변경합니다."
  },
  "ussd.code.geral.pin042.title": {
    PT: "Alterar Código PIN2 (**042*...)",
    EN: "Change SIM PIN2 (**042*...)",
    RU: "Сменить PIN2 SIM (**042*...)",
    HI: "सिम पिन 2 बदलें (**042*...)",
    KO: "SIM PIN2 변경 (**042*...)"
  },
  "ussd.code.geral.pin042.desc": {
    PT: "Padrão 3GPP (SIM Phase 2): altera a senha secundária PIN2 (usada para FDN e discagem fixa) discando **042*PIN2_antigo*PIN2_novo*PIN2_novo#.",
    EN: "3GPP standard (Phase 2 SIM): changes secondary PIN2 (used for Fixed Dialing Numbers/FDN) by dialing **042*oldPIN2*newPIN2*newPIN2#.",
    RU: "Стандарт 3GPP (SIM Phase 2): меняет вторичный код PIN2 (для фиксированного набора FDN) набором **042*старыйPIN2*новыйPIN2*новыйPIN2#.",
    HI: "3GPP मानक (चरण 2 सिम): **042*पुरानाPIN2*नयाPIN2*नयाPIN2# डायल करके द्वितीयक PIN2 बदलें।",
    KO: "3GPP 표준(Phase 2 SIM): **042*기존PIN2*새PIN2*새PIN2#을 입력하여 보조 PIN2(고정 다이얼링 FDN용)를 변경합니다."
  },
  "ussd.code.geral.puk05unlock.title": {
    PT: "Desbloquear PIN por PUK (**05*...)",
    EN: "Unlock PIN via PUK (**05*...)",
    RU: "Разблокировка PIN через PUK (**05*...)",
    HI: "PUK द्वारा पिन अनलॉक करें (**05*...)",
    KO: "PUK으로 PIN 잠금 해제 (**05*...)"
  },
  "ussd.code.geral.puk05unlock.desc": {
    PT: "Desbloqueia o chip travado por erro de PIN e define novo PIN usando o PUK de 8 dígitos: **05*PUK*PIN_novo*PIN_novo#.",
    EN: "Unblocks a PIN-blocked SIM card and sets a new PIN using the 8-digit PUK: **05*PUK*newPIN*newPIN#.",
    RU: "Разблокирует заблокированную PIN-кодом SIM-карту и задает новый PIN с помощью 8-значного PUK: **05*PUK*новыйPIN*новыйPIN#.",
    HI: "8-अंकीय PUK का उपयोग करके अवरुद्ध सिम कार्ड को अनलॉक करें और नया पिन सेट करें: **05*PUK*नयाPIN*नयाPIN#।",
    KO: "8자리 PUK 코드를 사용하여 잠긴 SIM을 해제하고 새 PIN을 설정합니다: **05*PUK*새PIN*새PIN#."
  },
  "ussd.code.geral.puk052unlock.title": {
    PT: "Desbloquear PIN2 por PUK2 (**052*...)",
    EN: "Unlock PIN2 via PUK2 (**052*...)",
    RU: "Разблокировка PIN2 через PUK2 (**052*...)",
    HI: "PUK2 द्वारा पिन 2 अनलॉक करें (**052*...)",
    KO: "PUK2로 PIN2 잠금 해제 (**052*...)"
  },
  "ussd.code.geral.puk052unlock.desc": {
    PT: "Desbloqueia a função PIN2 travada em chips Phase 2 utilizando a chave mestre PUK2: **052*PUK2*PIN2_novo*PIN2_novo#.",
    EN: "Unblocks a locked PIN2 feature on Phase 2 SIM cards using master PUK2 key: **052*PUK2*newPIN2*newPIN2#.",
    RU: "Разблокирует заблокированный PIN2 на SIM-картах Phase 2 с помощью ключа PUK2: **052*PUK2*новыйPIN2*новыйPIN2#.",
    HI: "मास्टर PUK2 कुंजी का उपयोग करके फेज़ 2 सिम कार्ड पर लॉक किए गए PIN2 को अनलॉक करें: **052*PUK2*नयाPIN2*नयाPIN2#।",
    KO: "마스터 PUK2 키를 사용하여 Phase 2 SIM 카드의 잠긴 PIN2 기능을 해제합니다: **052*PUK2*새PIN2*새PIN2#."
  },
  "ussd.code.geral.dolar900.title": {
    PT: "Cotação do Dólar e Câmbio (*900*1#)",
    EN: "USD Dollar Exchange Rate (*900*1#)",
    RU: "Курс доллара и валют (*900*1#)",
    HI: "अमेरिकी डॉलर विनिमय दर (*900*1#)",
    KO: "달러 환율 및 외환 시세 (*900*1#)"
  },
  "ussd.code.geral.dolar900.desc": {
    PT: "Serviço interativo de valor adicionado (VAS) para consulta rápida da cotação do dólar e taxas de câmbio na tela via USSD.",
    EN: "Interactive Value-Added Service (VAS) to quickly query live USD exchange rates and currency quotes via USSD.",
    RU: "Интерактивный сервис (VAS) для быстрого запроса актуального курса доллара США и котировок валют через USSD.",
    HI: "यूएसएसडी के माध्यम से अमेरिकी डॉलर की विनिमय दरों और मुद्रा दरों को तुरंत जानने के लिए इंटरैक्टिव सेवा।",
    KO: "USSD를 통해 미국 달러 환율 및 외환 시세를 즉시 확인하는 대화형 부가 서비스(VAS)입니다."
  },
  "ussd.code.geral.vvm004.title": {
    PT: "Status Desvio Caixa Postal (*#004#)",
    EN: "Voicemail Divert Status (*#004#)",
    RU: "Статус переадресации на голосовую почту (*#004#)",
    HI: "वॉइसमेल डायवर्ट स्थिति (*#004#)",
    KO: "음성 사서함 착신 전환 상태 (*#004#)"
  },
  "ussd.code.geral.vvm004.desc": {
    PT: "Padrão universal 3GPP GSM: verifica todos os desvios condicionais (ocupado, sem resposta, fora de alcance) para o correio de voz.",
    EN: "Universal 3GPP GSM standard: checks all conditional call forwardings (busy, unanswered, unreachable) to voicemail.",
    RU: "Универсальный стандарт 3GPP GSM: проверяет условную переадресацию (занято, нет ответа, вне зоны) на голосовую почту.",
    HI: "सार्वभौमिक 3GPP GSM मानक: वॉइसमेल पर सभी सशर्त कॉल अग्रेषण (व्यस्त, अनुत्तरित, पहुंच से बाहर) की जांच करता है।",
    KO: "범용 3GPP GSM 표준: 통화 중, 무응답, 연결 불가 시 음성 사서함으로의 조건부 착신 전환을 확인합니다."
  },
  "ussd.code.geral.voicemail555.title": {
    PT: "Caixa Postal / Correio de Voz (*555)",
    EN: "Voicemail Access & Messages (*555)",
    RU: "Доступ к голосовой почте (*555)",
    HI: "वॉइसमेल एक्सेस और संदेश (*555)",
    KO: "음성 사서함 및 메시지 확인 (*555)"
  },
  "ussd.code.geral.voicemail555.desc": {
    PT: "Acessa diretamente a caixa postal para ouvir, gerenciar e apagar recados de voz recebidos (utilizado em operadoras como Vivo e Claro).",
    EN: "Directly accesses voicemail to listen to, manage, and delete voice messages (used by carriers such as Vivo and Claro).",
    RU: "Прямой доступ к голосовой почте для прослушивания, управления и удаления голосовых сообщений.",
    HI: "प्राप्त वॉइस संदेशों को सुनने, प्रबंधित करने और हटाने के लिए वॉइसमेल पर सीधा कॉल।",
    KO: "수신된 음성 메시지를 청취, 관리 및 삭제하기 위한 음성 사서함 직접 연결 코드입니다."
  },
  "ussd.code.geral.bank99.title": {
    PT: "Extrato Bancário e Mobile Banking (*99#)",
    EN: "Bank Mini-Statement & USSD Banking (*99#)",
    RU: "Банковская выписка и мобильный банкинг (*99#)",
    HI: "बैंक मिनी-स्टेटमेंट और यूएसएसडी बैंकिंग (*99#)",
    KO: "은행 명세서 및 USSD 모바일 뱅킹 (*99#)"
  },
  "ussd.code.geral.bank99.desc": {
    PT: "Padrão universal de Mobile Banking sem internet (NUUP): permite consultar saldo, mini-extrato de transações e transferências bancárias via USSD.",
    EN: "Universal offline mobile banking standard (NUUP): check account balances, mini-statements, and perform banking transactions without internet.",
    RU: "Универсальный стандарт мобильного банкинга без интернета (NUUP): проверка баланса, мини-выписка и переводы через USSD.",
    HI: "बिना इंटरनेट मोबाइल बैंकिंग मानक (NUUP): यूएसएसडी के जरिए बैंक बैलेंस, मिनी स्टेटमेंट और फंड ट्रांसफर की सुविधा।",
    KO: "인터넷 없는 범용 오프라인 뱅킹 표준(NUUP): USSD로 계좌 잔액, 최근 거래 내역(미니 명세서)을 조회하고 이체합니다."
  },
  "ussd.code.geral.bank4004.title": {
    PT: "Extrato e Serviços Bancários BB (*4004#)",
    EN: "Bank Statement & Banking Menu (*4004#)",
    RU: "Банковская выписка и меню услуг (*4004#)",
    HI: "बैंक स्टेटमेंट और बैंकिंग सेवाएं (*4004#)",
    KO: "은행 거래 내역 및 뱅킹 메뉴 (*4004#)"
  },
  "ussd.code.geral.bank4004.desc": {
    PT: "Canal USSD interativo de mobile banking (Banco do Brasil): consulta rápida de saldo, lançamentos recentes e extrato de conta corrente.",
    EN: "Interactive USSD mobile banking channel: quick query of balances, recent account transactions, and bank statements.",
    RU: "Интерактивный USSD-канал мобильного банкинга: быстрая проверка баланса, последних операций и выписки по счету.",
    HI: "इंटरैक्टिव यूएसएसडी मोबाइल बैंकिंग चैनल: शेष राशि, हाल के लेनदेन और बैंक स्टेटमेंट की त्वरित जांच।",
    KO: "대화형 USSD 뱅킹 채널: 잔액 조회, 최근 거래 내역 및 계좌 명세서를 간편하게 확인합니다."
  },
  "ussd.code.geral.dir102.title": {
    PT: "Serviço de Diretório e Auxílio à Lista (102)",
    EN: "Directory Assistance & Enquiries (102)",
    RU: "Справочная служба и директория (102)",
    HI: "निर्देशिका सेवा और नंबर सहायता (102)",
    KO: "전화번호 안내 및 디렉터리 서비스 (102)"
  },
  "ussd.code.geral.dir102.desc": {
    PT: "Serviço oficial de diretório telefônico e auxílio à lista (Anatel/Telefonia): permite localizar números de telefone de assinantes e empresas.",
    EN: "Official telephone directory assistance service: locate telephone numbers and contacts of residential subscribers and businesses.",
    RU: "Официальная справочно-информационная служба: поиск телефонных номеров абонентов и организаций.",
    HI: "आधिकारिक टेलीफोन निर्देशिका सेवा: ग्राहकों और कंपनियों के टेलीफोन नंबर ढूंढने में मदद करती है।",
    KO: "공식 전화번호 안내 서비스: 개인 및 기업 가입자의 전화번호와 연락처 정보를 검색할 수 있습니다."
  },
  "ussd.code.geral.dir411.title": {
    PT: "Serviço de Diretório Internacional (411)",
    EN: "Directory Assistance Service (411)",
    RU: "Международная справочная служба (411)",
    HI: "अंतर्राष्ट्रीय निर्देशिका सेवा (411)",
    KO: "국제 전화번호 디렉터리 안내 (411)"
  },
  "ussd.code.geral.dir411.desc": {
    PT: "Padrão de serviço de diretório (NANP / América do Norte): assistência para busca de números comerciais, residenciais e endereços locais.",
    EN: "Standard directory assistance code (NANP / North America): live lookups for local businesses, residential listings, and addresses.",
    RU: "Стандартная справочная служба (NANP / Северная Америка): поиск местных предприятий, частных номеров и адресов.",
    HI: "मानक निर्देशिका सहायता कोड (NANP): स्थानीय व्यवसायों, व्यक्तिगत नंबरों और पतों की खोज।",
    KO: "북미 표준(NANP) 디렉터리 안내: 지역 업체, 개인 연락처 및 주소 정보를 신속하게 조회합니다."
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
  "quality.video.very_low": {
    PT: "Baixíssima",
    EN: "Very Low",
    RU: "Очень низкое",
    HI: "बहुत कम",
    KO: "매우 낮음"
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
  },
  "footer.popular": {
    PT: "Códigos Populares",
    EN: "Popular Codes",
    RU: "Популярные коды",
    HI: "लोकप्रिय कोड",
    KO: "인기 코드"
  },
  "footer.howItWorks": {
    PT: "Como funciona?",
    EN: "How it works?",
    RU: "Как это работает?",
    HI: "यह कैसे काम करता है?",
    KO: "작동 방식"
  },
  "tabs.converter": {
    PT: "Conversor",
    EN: "Converter",
    RU: "Конвертер",
    HI: "कनवर्टर",
    KO: "변환기"
  },
  "tabs.downloader": {
    PT: "Downloader",
    EN: "Downloader",
    RU: "Загрузчик",
    HI: "डाउनलोडर",
    KO: "다운로더"
  },
  "tabs.ussd": {
    PT: "Códigos USSD/MMI",
    EN: "USSD/MMI Codes",
    RU: "Коды USSD/MMI",
    HI: "USSD/MMI कोड",
    KO: "USSD/MMI 코드"
  },
  "hero.converter.title": {
    PT: "Converta vídeos e extraia áudio no navegador",
    EN: "Convert videos and extract audio in browser",
    RU: "Конвертируйте видео и извлекайте аудио в браузере",
    HI: "ब्राउज़र में वीडियो कनवर्ट करें और ऑडियो निकालें",
    KO: "브라우저에서 비디오 변환 및 오디오 추출"
  },
  "hero.converter.desc": {
    PT: "Conversão de mídias em vários formatos, processamento privado no seu dispositivo. Crop personalizado de vídeo, com ajuste de resolução. Corte áudio, com ajuste de bitrate.",
    EN: "Media conversion across multiple formats, private on-device processing. Custom video crop with resolution adjustment. Audio trim with bitrate adjustment.",
    RU: "Конвертация медиа в различные форматы, приватная обработка на вашем устройстве. Пользовательский кроп видео с настройкой разрешения. Обрезка аудио с регулировкой битрейта.",
    HI: "विभिन्न प्रारूपों में मीडिया रूपांतरण, आपके डिवाइस पर निजी प्रसंस्करण। रिज़ॉल्यूशन समायोजन के साथ कस्टम वीडियो क्रॉप। बिटरेट समायोजन के साथ ऑडियो ट्रिम।",
    KO: "다양한 형식의 미디어 변환, 기기 내 안전한 비공개 처리. 해상도 조절이 가능한 맞춤형 비디오 크롭. 비트레이트 조절 지원 오디오 자르기."
  },
  "downloader.preparingVideo": {
    PT: "Preparando para baixar o vídeo...",
    EN: "Preparing to download video...",
    RU: "Подготовка к скачиванию видео...",
    HI: "वीडियो डाउनलोड करने की तैयारी की जा रही है...",
    KO: "비디오 다운로드 준비 중..."
  },
  "downloader.preparingAudio": {
    PT: "Preparando para baixar o áudio...",
    EN: "Preparing to download audio...",
    RU: "Подготовка к скачиванию аудио...",
    HI: "ऑडियो डाउनलोड करने की तैयारी की जा रही है...",
    KO: "오디오 다운로드 준비 중..."
  },
  "downloader.preparingMedia": {
    PT: "Preparando para baixar a mídia...",
    EN: "Preparing to download media...",
    RU: "Подготовка к скачиванию медиа...",
    HI: "मीडिया डाउनलोड करने की तैयारी की जा रही है...",
    KO: "미디어 다운로드 준비 중..."
  },
  "downloader.downloadMedia": {
    PT: "Baixar Mídia",
    EN: "Download Media",
    RU: "Скачать медиа",
    HI: "मीडिया डाउनलोड करें",
    KO: "미디어 다운로드"
  },
  "downloader.searching": {
    PT: "Buscando...",
    EN: "Searching...",
    RU: "Поиск...",
    HI: "खोज रहे हैं...",
    KO: "검색 중..."
  },
  "downloader.mode": {
    PT: "Modo de Download:",
    EN: "Download Mode:",
    RU: "Режим загрузки:",
    HI: "डाउनलोड मोड:",
    KO: "다운로드 모드:"
  },
  "downloader.videoOption": {
    PT: "Baixar Vídeo (MP4)",
    EN: "Download Video (MP4)",
    RU: "Скачать видео (MP4)",
    HI: "वीडियो डाउनलोड करें (MP4)",
    KO: "비디오 다운로드 (MP4)"
  },
  "downloader.audioOption": {
    PT: "Extrair Áudio",
    EN: "Extract Audio",
    RU: "Извлечь аудио",
    HI: "ऑडियो निकालें",
    KO: "오디오 추출"
  },
  "downloader.quality": {
    PT: "Qualidade:",
    EN: "Quality:",
    RU: "Качество:",
    HI: "गुणवत्ता:",
    KO: "화질:"
  },
  "downloader.quality.highest": {
    PT: "Máxima (1080p / 720p)",
    EN: "Maximum (1080p / 720p)",
    RU: "Максимальное (1080p / 720p)",
    HI: "अधिकतम (1080p / 720p)",
    KO: "최고 (1080p / 720p)"
  },
  "downloader.quality.medium": {
    PT: "Média (360p)",
    EN: "Medium (360p)",
    RU: "Среднее (360p)",
    HI: "मध्यम (360p)",
    KO: "중간 (360p)"
  },
  "downloader.quality.lowest": {
    PT: "Mais Leve (240p)",
    EN: "Lightest (240p)",
    RU: "Легкое (240p)",
    HI: "सबसे हल्का (240p)",
    KO: "최저 (240p)"
  },
  "downloader.hero.title": {
    PT: "Baixe free vídeo e áudio da web",
    EN: "Download free video and audio from the web",
    RU: "Скачивайте бесплатное видео и аудио из сети",
    HI: "वेब से मुफ्त वीडियो और ऑडियो डाउनलोड करें",
    KO: "웹에서 무료 동영상 및 오디오 다운로드"
  },
  "downloader.hero.badge": {
    PT: "Downloader de Mídias Web & Redes Sociais",
    EN: "Web & Social Media Downloader",
    RU: "Загрузчик медиа и соцсетей",
    HI: "वेब और सोशल मीडिया डाउनलोडर",
    KO: "웹 및 소셜 미디어 다운로더"
  },
  "downloader.hero.desc": {
    PT: "Cole links diretos de TikTok, Instagram Reels, Facebook Vídeos, Twitter/X, Vimeo e YouTube para baixar em alta qualidade ou extrair áudio direto.",
    EN: "Paste direct links from TikTok, Instagram Reels, Facebook Videos, Twitter/X, Vimeo, and YouTube to download in high quality or extract audio directly.",
    RU: "Вставляйте прямые ссылки из TikTok, Instagram Reels, Facebook, Twitter/X, Vimeo и YouTube для загрузки в высоком качестве или прямого извлечения аудио.",
    HI: "उच्च गुणवत्ता में डाउनलोड करने या सीधे ऑडियो निकालने के लिए TikTok, Instagram Reels, Facebook Videos, Twitter/X, Vimeo और YouTube से सीधे लिंक पेस्ट करें।",
    KO: "TikTok, Instagram Reels, Facebook 동영상, Twitter/X, Vimeo 및 YouTube의 직접 링크를 붙여넣어 고화질로 다운로드하거나 오디오를 직접 추출하세요."
  },
  "downloader.searchResults": {
    PT: "Resultados da Busca (Clique para Baixar)",
    EN: "Search Results (Click to Download)",
    RU: "Результаты поиска (Нажмите для скачивания)",
    HI: "खोज परिणाम (डाउनलोड करने के लिए क्लिक करें)",
    KO: "검색 결과 (다운로드하려면 클릭)"
  },
  "downloader.audioQuality.320": {
    PT: "320 kbps (Qualidade Máxima Studio)",
    EN: "320 kbps (Maximum Studio Quality)",
    RU: "320 kbps (Максимальное качество Studio)",
    HI: "320 kbps (अधिकतम स्टूडियो गुणवत्ता)",
    KO: "320 kbps (최고 스튜디오 음질)"
  },
  "downloader.audioQuality.256": {
    PT: "256 kbps (Muito Alta)",
    EN: "256 kbps (Very High)",
    RU: "256 kbps (Очень высокое)",
    HI: "256 kbps (बहुत उच्च)",
    KO: "256 kbps (매우 높음)"
  },
  "downloader.audioQuality.192": {
    PT: "192 kbps (Padrão Podcast / Música)",
    EN: "192 kbps (Standard Podcast / Music)",
    RU: "192 kbps (Стандарт для музыки/подкастов)",
    HI: "192 kbps (मानक पॉडकास्ट / संगीत)",
    KO: "192 kbps (표준 팟캐스트 / 음악)"
  },
  "downloader.audioQuality.128": {
    PT: "128 kbps (Compacto)",
    EN: "128 kbps (Compact)",
    RU: "128 kbps (Компактное)",
    HI: "128 kbps (कॉम्पैक्ट)",
    KO: "128 kbps (압축)"
  },
  "downloader.audioQuality.64": {
    PT: "64 kbps (Voz Leve)",
    EN: "64 kbps (Light Voice)",
    RU: "64 kbps (Голос / легкое)",
    HI: "64 kbps (हल्की आवाज)",
    KO: "64 kbps (가벼운 음성)"
  },
  "tabs.smartphones": {
    PT: "Detalhes de dispositivos",
    EN: "Device Details",
    RU: "Детали устройств",
    HI: "डिवाइस विवरण",
    KO: "기기 세부정보"
  },
  "smartphones.title": {
    PT: "Pesquise as especificações dos dispositivos móveis",
    EN: "Search mobile device specifications",
    RU: "Поиск характеристик мобильных устройств",
    HI: "मोबाइल डिवाइस विनिर्देश खोजें",
    KO: "모바일 기기 사양 검색"
  },
  "smartphones.subtitle": {
    PT: "Consulte, compare e filtre fichas técnicas completas de smartphones e de smartwatches",
    EN: "Search, compare, and filter complete technical specifications of smartphones and smartwatches",
    RU: "Поиск, сравнение и фильтрация полных технических характеристик смартфонов и смарт-часов",
    HI: "स्मार्टफोन और स्मार्टवॉच के पूर्ण तकनीकी विनिर्देश खोजें और तुलना करें",
    KO: "스마트폰 및 스마트워치의 상세 기술 사양을 검색, 비교 및 필터링하세요"
  },
  "smartphones.filters": {
    PT: "Filtros e Categorias",
    EN: "Filters & Categories",
    RU: "Фильтры и категории",
    HI: "फिल्टर और श्रेणियां",
    KO: "필터 및 카테고리"
  },
  "smartphones.brand": {
    PT: "Fabricante",
    EN: "Brand",
    RU: "Бренд",
    HI: "ब्रांड",
    KO: "상표"
  },
  "smartphones.os": {
    PT: "Sistema Operacional",
    EN: "Operating System",
    RU: "Операционная система",
    HI: "ऑपरेटिंग सिस्टम",
    KO: "운영 체제"
  },
  "smartphones.minRam": {
    PT: "Memória RAM",
    EN: "RAM Memory",
    RU: "Оперативная память",
    HI: "राम मेमोरी",
    KO: "램 메모리"
  },
  "smartphones.minStorage": {
    PT: "Armazenamento",
    EN: "Storage",
    RU: "Хранилище",
    HI: "भंडारण",
    KO: "저장 공간"
  },
  "smartphones.minStorage_old": {
    PT: "Armazenamento",
    EN: "Storage",
    RU: "Место хранения",
    HI: "भंडारण",
    KO: "저장 용량"
  },
  "smartphones.any": {
    PT: "Qualquer",
    EN: "Any",
    RU: "Любой",
    HI: "कोई भी",
    KO: "모두"
  },
  "smartphones.searchPlaceholder": {
    PT: "Buscar modelo ou marca...",
    EN: "Search model or brand...",
    RU: "Поиск модели или бренда...",
    HI: "मॉडल या ब्रांड खोजें...",
    KO: "모델 또는 브랜드 검색..."
  },
  "smartphones.noResults": {
    PT: "Nenhum celular encontrado",
    EN: "No smartphones found",
    RU: "Смартфоны не найдены",
    HI: "कोई स्मार्टफोन नहीं मिला",
    KO: "스마트폰을 찾을 수 없음"
  },
  "smartphones.tryDifferentFilters": {
    PT: "Tente remover alguns filtros ou buscar outro termo.",
    EN: "Try removing some filters or searching for another term.",
    RU: "Попробуйте удалить некоторые фильтры или поискать другой термин.",
    HI: "कुछ फ़िल्टर हटाने या कोई अन्य शब्द खोजने का प्रयास करें।",
    KO: "일부 필터를 제거하거나 다른 용어를 검색해 보세요."
  },
  "smartphones.minCores": { PT: "Núcleos", EN: "Cores", RU: "Ядра", HI: "कोर", KO: "코어" },
  "smartphones.architecture": { PT: "Arquitetura", EN: "Architecture", RU: "Архитектура", HI: "आर्किटेक्चर", KO: "아키텍처" },
  "smartphones.simCards": { PT: "Qtd. de SIM Cards", EN: "SIM Cards Count", RU: "Количество SIM", HI: "सिम कार्ड की संख्या", KO: "SIM 카드 수" },
  "smartphones.digitalTv": { PT: "TV Digital", EN: "Digital TV", RU: "Цифровое ТВ", HI: "डिजिटल टीवी", KO: "디지털 TV" },
  "smartphones.physicalKeyboard": { PT: "Teclado Físico", EN: "Physical Keyboard", RU: "Физическая клавиатура", HI: "भौतिक कीबोर्ड", KO: "물리적 키보드" },
  "smartphones.foldable": { PT: "Tela Dobrável", EN: "Foldable Screen", RU: "Складной экран", HI: "फोल्डेबल स्क्रीन", KO: "폴더블 화면" },
  "smartphones.network": { PT: "Rede", EN: "Network", RU: "Сеть", HI: "नेटवर्क", KO: "네트워크" },
  "smartphones.expandableMemory": { PT: "Memória Expansível", EN: "Expandable Memory", RU: "Расширяемая память", HI: "विस्तार योग्य मेमोरी", KO: "확장 가능한 메모리" },
  "smartphones.minScreenSize": { PT: "Tamanho da Tela", EN: "Screen Size", RU: "Размер экрана", HI: "स्क्रीन का आकार", KO: "화면 크기" },
  "smartphones.minFrontCamera": { PT: "Câmera Selfie", EN: "Selfie Cam", RU: "Селфи камера", HI: "सेल्फी कैमरा", KO: "셀피 카메라" },
  "smartphones.opticalZoom": { PT: "Zoom Ótico (x)", EN: "Optical Zoom (x)", RU: "Оптический зум (x)", HI: "ऑप्टिकल जूम (x)", KO: "광학 줌 (x)" },
  "smartphones.stabilization": { PT: "OIS (Estabilização)", EN: "OIS (Stabilization)", RU: "OIS (Стабилизация)", HI: "OIS (स्टैबिलाइजेशन)", KO: "OIS(광학식 손떨림 보정)" },
  "smartphones.faceDetection": { PT: "Detecção Facial", EN: "Face Detection", RU: "Распознавание лиц", HI: "चेहरा पहचान", KO: "얼굴 인식" },
  "smartphones.fingerprint": { PT: "Leitor de Digital", EN: "Fingerprint Reader", RU: "Сканер отпечатков", HI: "फिंगरप्रिंट रीडर", KO: "지문 인식기" },
  "smartphones.recordingResolution": { PT: "Resolução de Gravação", EN: "Recording Resolution", RU: "Разрешение записи", HI: "रिकॉर्डिंग रिज़ॉल्यूशन", KO: "녹화 해상도" },
  "smartphones.cpuBrand": { PT: "Marca da CPU", EN: "CPU Brand", RU: "Бренд CPU", HI: "सीपीयू ब्रांड", KO: "CPU 브랜드" },
  "smartphones.gpuBrand": { PT: "Marca da GPU", EN: "GPU Brand", RU: "Бренд GPU", HI: "जीपीयू ब्रांड", KO: "GPU 브랜드" },
  
  "smartphones.minBattery": { PT: "Tamanho da Bateria", EN: "Battery Size", RU: "Размер батареи", HI: "बैटरी का आकार", KO: "배터리 크기" },
  "smartphones.simType": { PT: "Tipo de SIM Card", EN: "SIM Card Type", RU: "Тип SIM-карты", HI: "सिम कार्ड का प्रकार", KO: "SIM 카드 유형" },
  "smartphones.chargingType": { PT: "Tipo de Carregamento", EN: "Charging Type", RU: "Тип зарядки", HI: "चार्जिंग का प्रकार", KO: "충전 유형" },
  "smartphones.biometric": { PT: "Sensor Biométrico (Dedo)", EN: "Biometric Sensor", RU: "Биометрический датчик", HI: "बायोमेट्रिक सेंसर", KO: "생체 인식 센서" },
  "smartphones.nfc": { PT: "NFC", EN: "NFC", RU: "NFC", HI: "एनएफसी", KO: "NFC" },
  "smartphones.compass": { PT: "Bússola", EN: "Compass", RU: "Компас", HI: "कम्पास", KO: "나침반" },
  "smartphones.usbOtg": { PT: "USB OTG", EN: "USB OTG", RU: "USB OTG", HI: "यूएसबी ओटीजी", KO: "USB OTG" },
  "smartphones.cameraFeatures": { PT: "Recursos da Câmera", EN: "Camera Features", RU: "Функции камеры", HI: "कैमरा विशेषताएं", KO: "카메라 기능" },
  "smartphones.slowMotion": { PT: "Slow Motion", EN: "Slow Motion", RU: "Замедленная съемка", HI: "धीमी गति", KO: "슬로우 모션" },
  "smartphones.performance": { PT: "Performance", EN: "Performance", RU: "Производительность", HI: "प्रदर्शन", KO: "성능" },
  "smartphones.touchFocus": { PT: "Foco por toque", EN: "Touch Focus", RU: "Сенсорная фокусировка", HI: "टच फोकस", KO: "터치 포커스" },
  "smartphones.maxFocusAngle": { PT: "Ângulo máximo de foco", EN: "Max Focus Angle", RU: "Макс. угол фокусировки", HI: "अधिकतम फोकस कोण", KO: "최대 초점 각도" },
  "smartphones.antutu": { PT: "AnTuTu", EN: "AnTuTu", RU: "AnTuTu", HI: "AnTuTu", KO: "AnTuTu" },
  "smartphones.geekbench": { PT: "GeekBench", EN: "GeekBench", RU: "GeekBench", HI: "GeekBench", KO: "GeekBench" },
  "smartphones.3dmark": { PT: "3DMark", EN: "3DMark", RU: "3DMark", HI: "3DMark", KO: "3DMark" },

  "smartphones.yes": { PT: "Sim", EN: "Yes", RU: "Да", HI: "हाँ", KO: "네" },
  "smartphones.no": { PT: "Não", EN: "No", RU: "Нет", HI: "नहीं", KO: "아니요" },
  "smartphones.supportsWhatsApp": { PT: "Suporte ao WhatsApp", EN: "WhatsApp Support", RU: "Поддержка WhatsApp", HI: "व्हाट्सएप सपोर्ट", KO: "WhatsApp 지원" },
  "smartphones.whatsAppCompatible": { PT: "Compatível com WhatsApp", EN: "WhatsApp Compatible", RU: "Совместимо с WhatsApp", HI: "व्हाट्सएप संगत", KO: "WhatsApp 호환" },
  "smartphones.whatsAppIncompatible": { PT: "Sem Suporte ao WhatsApp", EN: "No WhatsApp Support", RU: "Без поддержки WhatsApp", HI: "व्हाट्सएप समर्थन नहीं", KO: "WhatsApp 미지원" },
  "smartphones.features": { PT: "Recursos Especiais", EN: "Special Features", RU: "Специальные возможности", HI: "विशेष सुविधाएँ", KO: "특수 기능" },
  
  
  
  
  
  
  
  
  
  
  
  "tabs.news": {
    PT: "Gadget news",
    EN: "Gadget news",
    RU: "Gadget news",
    HI: "Gadget news",
    KO: "Gadget news"
  },
  "news.loading": {
    PT: "Buscando as últimas notícias...",
    EN: "Fetching the latest news...",
    RU: "Получение последних новостей...",
    HI: "नवीनतम समाचार ला रहा है...",
    KO: "최신 뉴스 가져오는 중..."
  },
  "news.error": {
    PT: "Falha ao carregar as notícias.",
    EN: "Failed to load news.",
    RU: "Не удалось загрузить новости.",
    HI: "समाचार लोड करने में विफल।",
    KO: "뉴스를 로드하지 못했습니다."
  },
  "news.readMore": {
    PT: "Ler artigo original",
    EN: "Read original article",
    RU: "Читать оригинальную статью",
    HI: "मूल लेख पढ़ें",
    KO: "원문 기사 읽기"
  },
  "news.latest": {
    PT: "Novidades sobre gadgets e invenções",
    EN: "News on gadgets and inventions",
    RU: "Новости о гаджетах и изобретениях",
    HI: "गैजेट्स और आविष्कारों पर समाचार",
    KO: "가젯 및 발명에 대한 소식"
  },
  "news.description": {
    PT: "Acompanhe as últimas novidades sobre lançamentos de gadgets, invenções tecnológicas e descobertas científicas de ponta.",
    EN: "Follow the latest news on gadget releases, technological inventions, and cutting-edge scientific discoveries.",
    RU: "Следите за последними новостями о выпуске гаджетов, технологических изобретениях и передовых научных открытиях.",
    HI: "गैजेट रिलीज़, तकनीकी आविष्कारों और अत्याधुनिक वैज्ञानिक खोजों पर नवीनतम समाचारों का पालन करें।",
    KO: "가젯 출시, 기술 발명 및 최첨단 과학 발견에 대한 최신 뉴스를 확인하세요."
  },
  "news.filterAll": {
    PT: "Todas",
    EN: "All",
    RU: "Все",
    HI: "सभी",
    KO: "전체"
  },
  "news.filterGadgets": {
    PT: "Gadgets",
    EN: "Gadgets",
    RU: "Гаджеты",
    HI: "गैजेट्स",
    KO: "가젯"
  },
  "news.filterInventions": {
    PT: "Invenções",
    EN: "Inventions",
    RU: "Изобретения",
    HI: "आविष्कार",
    KO: "발명"
  },
  "news.filterDiscoveries": {
    PT: "Descobertas",
    EN: "Discoveries",
    RU: "Открытия",
    HI: "खोजें",
    KO: "발견"
  },
  "news.source": {
    PT: "Fonte",
    EN: "Source",
    RU: "Источник",
    HI: "स्रोत",
    KO: "출처"
  },
  "news.shareNews": {
    PT: "Compartilhar Notícia",
    EN: "Share News",
    RU: "Поделиться новостью",
    HI: "समाचार साझा करें",
    KO: "뉴스 공유"
  },
  "news.copiedNotification": {
    PT: "Link da notícia copiado!",
    EN: "News link copied!",
    RU: "Ссылка скопирована!",
    HI: "समाचार लिंक कॉपी किया गया!",
    KO: "뉴스 링크 복사됨!"
  },
  "news.autoUpdateTitle": {
    PT: "Ciclo de Atualização",
    EN: "Update Cycle",
    RU: "Цикл обновления",
    HI: "अद्यतन चक्र",
    KO: "업데이트 주기"
  },
  "news.autoUpdate48h": {
    PT: "Atualizado automaticamente a cada 48h",
    EN: "Automatically updated every 48h",
    RU: "Автоматическое обновление каждые 48ч",
    HI: "हर 48 घंटे में स्वचालित रूप से अपडेट",
    KO: "48시간마다 자동 업데이트"
  },
  "news.lastSync": {
    PT: "Última sincronização",
    EN: "Last sync",
    RU: "Последняя синхронизация",
    HI: "अंतिम समन्वय",
    KO: "마지막 동기화"
  },
  "news.nextSyncIn": {
    PT: "Próxima atualização em",
    EN: "Next update in",
    RU: "Следующее обновление через",
    HI: "अगला अपडेट में",
    KO: "다음 업데이트까지"
  },
  "news.syncNow": {
    PT: "Sincronizar Feeds",
    EN: "Sync Feeds",
    RU: "Синхронизировать ленты",
    HI: "फ़ीड सिंक करें",
    KO: "피드 동기화"
  },
  "news.syncing": {
    PT: "Verificando 404 & Sincronizando...",
    EN: "Checking 404 & Syncing...",
    RU: "Проверка 404 и синхронизация...",
    HI: "404 की जाँच और समन्वय...",
    KO: "404 확인 및 동기화 중..."
  },
  "news.importerTitle": {
    PT: "Importador de RSS & Feeds",
    EN: "RSS & Feed Importer",
    RU: "Импортер RSS и лент",
    HI: "आरएसएस और फ़ीड आयातक",
    KO: "RSS 및 피드 가져오기"
  },
  "news.importerDesc": {
    PT: "Importação ao vivo com verificação automática de status HTTP 200 OK e descarte de links 404",
    EN: "Live feed import with automatic HTTP 200 OK verification and 404 broken links rejection",
    RU: "Импорт лент с автоматической проверкой HTTP 200 OK и отсеиванием битых ссылок 404",
    HI: "स्वचालित HTTP 200 OK सत्यापन और 404 टूटे लिंक अस्वीकृति के साथ लाइव फ़ीड आयात",
    KO: "HTTP 200 OK 자동 검증 및 404 손상 링크 자동 차단을 지원하는 라이브 피드 가져오기"
  },
  "news.verifier404Active": {
    PT: "Verificador 404 Automático Ativo",
    EN: "Automatic 404 Verifier Active",
    RU: "Автоматический детектор 404 активен",
    HI: "स्वचालित 404 सत्यापनकर्ता सक्रिय",
    KO: "자동 404 검증기 활성화됨"
  },
  "news.verifiedStatus": {
    PT: "Link Verificado (HTTP 200 OK)",
    EN: "Verified Link (HTTP 200 OK)",
    RU: "Ссылка проверена (HTTP 200 OK)",
    HI: "सत्यापित लिंक (HTTP 200 OK)",
    KO: "검증된 링크 (HTTP 200 OK)"
  },
  "news.customFeedPlaceholder": {
    PT: "Cole uma URL de Feed RSS personalizada (ex: https://site.com/feed)...",
    EN: "Paste custom RSS Feed URL (e.g. https://site.com/feed)...",
    RU: "Вставьте URL-адрес RSS-ленты...",
    HI: "कस्टम आरएसएस फ़ीड URL पेस्ट करें...",
    KO: "사용자 지정 RSS 피드 URL 입력..."
  },
  "news.importButton": {
    PT: "Importar Feed",
    EN: "Import Feed",
    RU: "Импортировать",
    HI: "फ़ीड आयात करें",
    KO: "피드 가져오기"
  },
  "news.checkAllLinks": {
    PT: "Verificar Links Atuais (Anti-404)",
    EN: "Scan Current Links (Anti-404)",
    RU: "Проверить ссылки (Анти-404)",
    HI: "वर्तमान लिंक स्कैन करें (Anti-404)",
    KO: "현재 링크 전체 점검 (404 방지)"
  },
  "news.allLinksValid": {
    PT: "Todos os links testados estão 100% ativos e saudáveis!",
    EN: "All tested links are 100% active and healthy!",
    RU: "Все проверенные ссылки на 100% активны!",
    HI: "सभी परीक्षण किए गए लिंक 100% सक्रिय हैं!",
    KO: "테스트된 모든 링크가 100% 정상 작동합니다!"
  },
  "news.deadLinksFound": {
    PT: "links com erro 404 foram detectados e bloqueados automaticamente.",
    EN: "links with 404 error were detected and blocked automatically.",
    RU: "ссылок с ошибкой 404 обнаружено и автоматически заблокировано.",
    HI: "404 त्रुटि वाले लिंक का पता लगाया गया और स्वचालित रूप से अवरुद्ध कर दिया गया।",
    KO: "개의 404 에러 링크가 감지되어 자동으로 차단/제외되었습니다."
  },
  "news.addNews": {
    PT: "Adicionar Notícia",
    EN: "Add News",
    RU: "Добавить новость",
    HI: "समाचार जोड़ें",
    KO: "뉴스 추가"
  },
  "news.suggestNewsBtn": {
    PT: "News sugeridas",
    EN: "Suggested News",
    RU: "Предложенные новости",
    HI: "सुझाए गए समाचार",
    KO: "추천 뉴스"
  },
  "news.addNewsBtn": {
    PT: "Add news",
    EN: "Add News",
    RU: "Добавить новость",
    HI: "समाचार जोड़ें",
    KO: "뉴스 추가"
  },
  "news.searchPlaceholder": {
    PT: "Buscar gadget ou news",
    EN: "Search gadget or news",
    RU: "Поиск гаджета или новости",
    HI: "गैजेट या समाचार खोजें",
    KO: "가젯 또는 뉴스 검색"
  },
  "news.flipboardAutoSync": {
    PT: "Flipboard (Últimas 48h)",
    EN: "Flipboard (Last 48h)",
    RU: "Flipboard (Последние 48ч)",
    HI: "फ़्लिपबोर्ड (पिछले 48 घंटे)",
    KO: "플립보드 (최근 48시간)"
  },
  "news.openRssImporter": {
    PT: "Importar RSS",
    EN: "Import RSS",
    RU: "Импорт RSS",
    HI: "आरएसएस आयात",
    KO: "RSS 가져오기"
  },
  "news.verifierAlwaysActive": {
    PT: "Verificador 404 Automático Sempre Ativo",
    EN: "Automatic 404 Verifier Always Active",
    RU: "Автоматический детектор 404 всегда активен",
    HI: "स्वचालित 404 सत्यापनकर्ता हमेशा सक्रिय",
    KO: "자동 404 검증기 항상 활성화"
  },
  "news.suggestNews": {
    PT: "Sugerir Notícia",
    EN: "Suggest News",
    RU: "Предложить новость",
    HI: "समाचार सुझाएं",
    KO: "뉴스 제안"
  },
  "news.addNewsTitle": {
    PT: "Adicionar Link de Notícia",
    EN: "Add News Article Link",
    RU: "Добавить ссылку на новость",
    HI: "समाचार लेख लिंक जोड़ें",
    KO: "뉴스 기사 링크 추가"
  },
  "news.addNewsDesc": {
    PT: "Cole o link de uma notícia de tecnologia para auto-detectar dados e exibir no site",
    EN: "Paste a tech news link to auto-detect content and publish to the site",
    RU: "Вставьте ссылку на новость для автоопределения и публикации",
    HI: "सामग्री का स्वतः पता लगाने और साइट पर प्रकाशित करने के लिए एक टेक समाचार लिंक पेस्ट करें",
    KO: "콘텐츠를 자동 감지하고 사이트에 게시할 기술 뉴스 링크를 입력하세요"
  },
  "news.suggestTitle": {
    PT: "Sugerir Notícia & Pautas em Alta",
    EN: "Suggest News & Trending Topics",
    RU: "Предложить новость и тренды",
    HI: "समाचार और ट्रेंडिंग विषय सुझाएं",
    KO: "뉴스 제안 및 트렌드 주제"
  },
  "news.suggestDesc": {
    PT: "Escolha notícias em alta selecionadas ou envie uma sugestão para ser exibida",
    EN: "Pick curated trending news or submit a suggestion to be featured",
    RU: "Выберите актуальные новости или отправьте свое предложение",
    HI: "क्यूरेटेड ट्रेंडिंग समाचार चुनें या प्रदर्शित करने के लिए सुझाव भेजें",
    KO: "추천 트렌드 뉴스를 선택하거나 게시할 제안을 제출하세요"
  },
  "news.pasteLink": {
    PT: "Link da Notícia (URL)",
    EN: "News Article Link (URL)",
    RU: "Ссылка на новость (URL)",
    HI: "समाचार लिंक (URL)",
    KO: "뉴스 링크 (URL)"
  },
  "news.autoDetect": {
    PT: "Auto-Detectar Dados",
    EN: "Auto-Detect Data",
    RU: "Автоопределение",
    HI: "स्वतः डेटा पहचानें",
    KO: "데이터 자동 감지"
  },
  "news.detecting": {
    PT: "Analisando Link...",
    EN: "Analyzing Link...",
    RU: "Анализ ссылки...",
    HI: "लिंक का विश्लेषण...",
    KO: "링크 분석 중..."
  },
  "news.articleTitle": {
    PT: "Título da Matéria",
    EN: "Article Title",
    RU: "Заголовок статьи",
    HI: "लेख का शीर्षक",
    KO: "기사 제목"
  },
  "news.articleSubtitle": {
    PT: "Subtítulo / Linha Fina (Opcional)",
    EN: "Subtitle (Optional)",
    RU: "Подзаголовок (необязательно)",
    HI: "उपशीर्षक (वैकल्पिक)",
    KO: "부제목 (선택사항)"
  },
  "news.articleLead": {
    PT: "Resumo / Lead da Notícia",
    EN: "Article Summary / Lead",
    RU: "Краткое содержание",
    HI: "लेख सारांश",
    KO: "기사 요약"
  },
  "news.articleCategory": {
    PT: "Categoria",
    EN: "Category",
    RU: "Категория",
    HI: "श्रेणी",
    KO: "카테고리"
  },
  "news.articleAuthor": {
    PT: "Autor / Fonte ou Portal",
    EN: "Author / Source Portal",
    RU: "Автор / Источник",
    HI: "लेखक / स्रोत पोर्टल",
    KO: "작성자 / 출처"
  },
  "news.publishNews": {
    PT: "Publicar Notícia no Site",
    EN: "Publish News to Site",
    RU: "Опубликовать на сайте",
    HI: "साइट पर प्रकाशित करें",
    KO: "사이트에 뉴스 게시"
  },
  "news.customBadge": {
    PT: "Notícia Adicionada",
    EN: "Added News",
    RU: "Добавленная новость",
    HI: "जोड़ा गया समाचार",
    KO: "사용자 추가 뉴스"
  },
  "news.deleteCustom": {
    PT: "Remover",
    EN: "Remove",
    RU: "Удалить",
    HI: "हटाएं",
    KO: "삭제"
  },
  "news.suggestAddToSite": {
    PT: "Publicar no Site",
    EN: "Publish to Site",
    RU: "Опубликовать",
    HI: "साइट पर प्रकाशित करें",
    KO: "사이트에 게시"
  },
  "news.suggestAdded": {
    PT: "Publicada!",
    EN: "Published!",
    RU: "Опубликовано!",
    HI: "प्रकाशित!",
    KO: "게시됨!"
  },
  "smartphones.sharePhone": {
    PT: "Compartilhar Ficha",
    EN: "Share Specs",
    RU: "Поделиться характеристиками",
    HI: "विनिर्देश साझा करें",
    KO: "사양 공유"
  },
  "smartphones.shareSuccess": {
    PT: "Ficha técnica copiada!",
    EN: "Specs copied to clipboard!",
    RU: "Характеристики скопированы в буфер обмена!",
    HI: "विनिर्देश क्लिपबोर्ड पर कॉपी किए गए!",
    KO: "사양이 클립보드에 복사되었습니다!"
  },
  "ussd.shareCode": {
    PT: "Compartilhar Ficha",
    EN: "Share Specs",
    RU: "Поделиться описанием",
    HI: "विवरण साझा करें",
    KO: "정보 공유"
  },
  "ussd.shareSuccess": {
    PT: "Ficha copiada!",
    EN: "Code info copied!",
    RU: "Описание скопировано!",
    HI: "जानकारी कॉपी की गई!",
    KO: "정보가 복사되었습니다!"
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
