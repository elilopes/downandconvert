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
    PT: "Baixe mídias da web",
    EN: "Download web media",
    RU: "Скачивайте медиа из интернета",
    HI: "वेब से मीडिया डाउनलोड करें",
    KO: "웹에서 미디어 다운로드"
  },
  "hero.desc": {
    PT: "Converta vídeos, baixe conteúdo do YouTube, grave sua tela ou câmera e salve tudo diretamente no seu Google Drive. Corte áudio, ajuste volume, adicione metadados e converta arquivos localmente no navegador com total privacidade.",
    EN: "Convert videos, download YouTube content, record your screen or camera, and save everything directly to your Google Drive. Trim audio, adjust volume, add metadata, and convert files locally in the browser with total privacy.",
    RU: "Конвертируйте видео, скачивайте контент с YouTube, записывайте экран или камеру и сохраняйте все прямо на свой Google Диск. Обрезайте аудио, настраивайте громкость, добавляйте метаданные и конвертируйте файлы локально в браузере с полной конфиденциальностью.",
    HI: "वीडियो कनवर्ट करें, YouTube सामग्री डाउनलोड करें, अपनी स्क्रीन या कैमरा रिकॉर्ड करें, और सब कुछ सीधे अपने Google ड्राइव में सहेजें। ऑडियो ट्रिम करें, वॉल्यूम समायोजित करें, मेटाडेटा जोड़ें, और पूर्ण गोपनीयता के साथ ब्राउज़र में स्थानीय रूप से फ़ाइलों को कनवर्ट करें।",
    KO: "동영상을 변환하고, YouTube 콘텐츠를 다운로드하고, 화면이나 카메라를 녹화하여 모든 것을 Google 드라이브에 직접 저장하세요. 완벽한 개인정보 보호와 함께 브라우저에서 로컬로 오디오를 다듬고 볼륨을 조절하며 메타데이터를 추가하고 변환할 수 있습니다."
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
