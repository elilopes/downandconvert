import React from 'react';
import { X, FileText, Shield, Mail, Check, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalModalProps {
  type: 'terms' | 'privacy' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  if (!type) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('liclopes@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTitle = () => {
    if (type === 'terms') return t('footer.terms');
    if (type === 'privacy') return t('footer.privacy');
    return t('footer.contact');
  };

  const getIcon = () => {
    if (type === 'terms') return <FileText className="w-5 h-5 text-emerald-400" />;
    if (type === 'privacy') return <Shield className="w-5 h-5 text-cyan-400" />;
    return <Mail className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
              {getIcon()}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {getTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto my-4 pr-1 text-slate-300 text-sm leading-relaxed space-y-4">
          {type === 'terms' && (
            <>
              {lang === 'PT' && (
                <>
                  <p className="font-semibold text-white">1. Aceitação dos Termos</p>
                  <p>Ao acessar e utilizar o <strong>Down&Convert</strong>, você concorda expressamente em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis.</p>
                  
                  <p className="font-semibold text-white">2. Uso do Serviço</p>
                  <p>O Down&Convert é um website criado exclusivamente como objetivo legítimo de processamento de mídias. Você se compromete a não utilizar este serviço para realizar trabalhos com conteúdos protegidos por direitos autorais sem a devida autorização dos detentores legais.</p>

                  <p className="font-semibold text-white">3. Isenção de Responsabilidade</p>
                  <p>O serviço é fornecido "como está" e "conforme disponível". Não garantimos que a ferramenta será ininterrupta ou livre de erros. Toda conversão é executada no navegador do usuário (client-side).</p>

                  <p className="font-semibold text-white">4. Direitos Autorais e Propriedade Intelectual</p>
                  <p>Respeitamos integralmente os direitos de propriedade intelectual de terceiros. Os usuários são os únicos e exclusivos responsáveis pelo conteúdo que optarem por converter ou baixar através da plataforma.</p>

                  <p className="font-semibold text-white">5. Modificações dos Termos</p>
                  <p>Reservamo-nos o direito de revisar estes termos a qualquer momento, sem aviso prévio. Ao continuar a usar o serviço, você concorda em se submeter à versão atualizada destes Termos de Uso.</p>
                </>
              )}

              {lang === 'EN' && (
                <>
                  <p className="font-semibold text-white">1. Acceptance of Terms</p>
                  <p>By accessing and using <strong>Down&Convert</strong>, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                  
                  <p className="font-semibold text-white">2. Use of Service</p>
                  <p>Down&Convert is a website created exclusively for the legitimate purpose of media processing. You agree not to use this service to work with copyrighted content without proper authorization from the legal copyright holders.</p>

                  <p className="font-semibold text-white">3. Disclaimer</p>
                  <p>The service is provided on an "as is" and "as available" basis. We do not warrant that the service will be uninterrupted or error-free. All conversions are performed client-side in the user's browser.</p>

                  <p className="font-semibold text-white">4. Intellectual Property</p>
                  <p>We respect the intellectual property rights of others. Users are solely responsible for any content processed or downloaded using this platform.</p>

                  <p className="font-semibold text-white">5. Changes to Terms</p>
                  <p>We reserve the right to modify these terms at any time without prior notice. By continuing to use the service, you agree to be bound by the updated terms.</p>
                </>
              )}

              {lang === 'RU' && (
                <>
                  <p className="font-semibold text-white">1. Принятие условий</p>
                  <p>Используя сервис <strong>Down&Convert</strong>, вы соглашаетесь соблюдать настоящие Условия использования и применимое законодательство.</p>
                  
                  <p className="font-semibold text-white">2. Использование сервиса</p>
                  <p>Down&Convert — это веб-сайт, созданный исключительно с законной целью обработки медиафайлов. Вы обязуетесь не использовать этот сервис для работы с материалами, защищенными авторским правом, без надлежащего разрешения правообладателей.</p>

                  <p className="font-semibold text-white">3. Отказ от ответственности</p>
                  <p>Сервис предоставляется по принципу "как есть". Мы не гарантируем бесперебойную или безошибочную работу. Вся обработка аудио и видео происходит на стороне клиента (в браузере пользователя).</p>

                  <p className="font-semibold text-white">4. Авторские права и интеллектуальная собственность</p>
                  <p>Мы уважаем права интеллектуальной собственности третьих лиц. Пользователи несут единоличную ответственность за контент, который они конвертируют или загружают с помощью платформы.</p>

                  <p className="font-semibold text-white">5. Изменение условий</p>
                  <p>Мы оставляем за собой право изменять настоящие условия в любое время без предварительного уведомления. Продолжая использовать сервис, вы принимаете обновленную версию условий.</p>
                </>
              )}

              {lang === 'HI' && (
                <>
                  <p className="font-semibold text-white">1. शर्तों की स्वीकृति</p>
                  <p><strong>Down&Convert</strong> का उपयोग करके, आप इन सेवा की शर्तों और सभी लागू कानूनों का पालन करने के लिए सहमत होते हैं।</p>
                  
                  <p className="font-semibold text-white">2. सेवा का उपयोग</p>
                  <p>Down&Convert एक वेबसाइट है जिसे विशेष रूप से मीडिया प्रसंस्करण के वैध उद्देश्य के लिए बनाया गया है। आप कानूनी कॉपीराइट धारकों के उचित प्राधिकरण के बिना कॉपीराइट सामग्री के साथ काम करने के लिए इस सेवा का उपयोग नहीं करने के लिए सहमत हैं।</p>

                  <p className="font-semibold text-white">3. अस्वीकरण</p>
                  <p>यह सेवा "जैसी है" और "जैसी उपलब्ध है" के आधार पर प्रदान की जाती है। हम गारंटी नहीं देते कि सेवा निर्बाध या त्रुटि रहित होगी। सभी रूपांतरण उपयोगकर्ता के ब्राउज़र में स्थानीय रूप से किए जाते हैं।</p>

                  <p className="font-semibold text-white">4. कॉपीराइट और बौद्धिक संपदा</p>
                  <p>हम दूसरों के बौद्धिक संपदा अधिकारों का सम्मान करते हैं। उपयोगकर्ता इस प्लेटफ़ॉर्म के माध्यम से संसाधित या डाउनलोड की गई सामग्री के लिए पूरी तरह से जिम्मेदार हैं।</p>

                  <p className="font-semibold text-white">5. शर्तों में परिवर्तन</p>
                  <p>हम बिना किसी पूर्व सूचना के किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। सेवा का उपयोग जारी रखकर, आप अद्यतन शर्तों से बाध्य होने के लिए सहमत होते हैं।</p>
                </>
              )}

              {lang === 'KO' && (
                <>
                  <p className="font-semibold text-white">1. 약관의 동의</p>
                  <p><strong>Down&Convert</strong>를 이용함으로써 귀하는 본 이용약관 및 모든 관련 법률과 규정을 준수하는 데 동의하게 됩니다.</p>
                  
                  <p className="font-semibold text-white">2. 서비스 이용</p>
                  <p>Down&Convert는 미디어 처리를 위한 합법적인 목적으로만 제작된 웹사이트입니다. 귀하는 법적 저작권자의 적절한 허가 없이 저작권이 있는 콘텐츠로 작업하기 위해 본 서비스를 사용하지 않을 것에 동의합니다.</p>

                  <p className="font-semibold text-white">3. 면책 조항</p>
                  <p>본 서비스는 "있는 그대로" 및 "이용 가능한 상태로" 제공됩니다. 당사는 서비스가 중단되지 않거나 오류가 없음을 보장하지 않습니다. 모든 변환은 사용자의 브라우저 내에서 클라이언트 측(client-side)으로 수행됩니다.</p>

                  <p className="font-semibold text-white">4. 저작권 및 지적 재산권</p>
                  <p>당사는 타인의 지적 재산권을 전적으로 존중합니다. 사용자는 플랫폼을 통해 변환하거나 다운로드하는 콘텐츠에 대해 전적인 책임을 집니다.</p>

                  <p className="font-semibold text-white">5. 약관의 변경</p>
                  <p>당사는 사전 통지 없이 언제든지 본 약관을 수정할 권리를 보유합니다. 서비스를 계속 사용함으로써 귀하는 업데이트된 이용약관에 구속되는 데 동의하게 됩니다.</p>
                </>
              )}
            </>
          )}

          {type === 'privacy' && (
            <>
              {lang === 'PT' && (
                <>
                  <p className="font-semibold text-white">1. Privacidade e Processamento Local</p>
                  <p>Sua privacidade é uma prioridade, o <strong>Down&Convert</strong> opera com com tecnologia web atualizada (WebAssembly, WebAudio API, Node.js), o que significa que seus arquivos de mídia convertidos não são enviados ou armazenados em nossos servidores (opera no modo client-side).</p>

                  <p className="font-semibold text-white">2. Coleta de Informações</p>
                  <p>Não coletamos nem solicitamos dados pessoais para a conversão de arquivos. Não criamos perfis de rastreamento com seus arquivos.</p>

                  <p className="font-semibold text-white">3. Cookies e Anúncios de Terceiros</p>
                  <p>Podemos exibir anúncios de parceiros ou utilizar cookies anônimos padrão da web estritamente para manter a gratuidade do serviço e mensurar métricas agregadas de desempenho.</p>

                  <p className="font-semibold text-white">4. Integração com Google Drive</p>
                  <p>Ao optar por salvar arquivos no seu Google Drive, a autenticação e envio ocorrem diretamente entre seu navegador e a API oficial do Google via OAuth, sem intermediários.</p>

                  <p className="font-semibold text-white">5. Contato sobre Privacidade</p>
                  <p>Dúvidas sobre nossas práticas de privacidade podem ser encaminhadas para nosso e-mail oficial de suporte.</p>
                </>
              )}

              {lang === 'EN' && (
                <>
                  <p className="font-semibold text-white">1. Privacy & Local Processing</p>
                  <p>Your privacy is a priority, <strong>Down&Convert</strong> operates with modern web technology (WebAssembly, WebAudio API, Node.js), which means that your converted media files are not sent to or stored on our servers (operates in client-side mode).</p>

                  <p className="font-semibold text-white">2. Information Collection</p>
                  <p>We do not collect personal identification data to use the file converter. We do not store or track your media files.</p>

                  <p className="font-semibold text-white">3. Cookies & Advertising</p>
                  <p>Third-party advertising partners may serve non-intrusive ads to support free service operations, utilizing standard anonymous cookies.</p>

                  <p className="font-semibold text-white">4. Google Drive Integration</p>
                  <p>When you choose to export files to Google Drive, the authentication and upload occur directly between your browser and Google's official API via OAuth.</p>

                  <p className="font-semibold text-white">5. Privacy Inquiries</p>
                  <p>Any questions regarding our privacy practices may be forwarded directly to our official support email.</p>
                </>
              )}

              {lang === 'RU' && (
                <>
                  <p className="font-semibold text-white">1. Конфиденциальность и локальная обработка</p>
                  <p>Ваша конфиденциальность является приоритетом, <strong>Down&Convert</strong> работает с использованием современных веб-технологий (WebAssembly, WebAudio API, Node.js), что означает, что ваши конвертированные медиафайлы не отправляются и не сохраняются на наших серверах (работает в режиме client-side).</p>

                  <p className="font-semibold text-white">2. Сбор данных</p>
                  <p>Мы не собираем персональные идентификационные данные и не храним ваши медиафайлы. Мы не создаем профили отслеживания на основе ваших файлов.</p>

                  <p className="font-semibold text-white">3. Файлы cookie и реклама третьих лиц</p>
                  <p>Сторонние партнеры по рекламе могут отображать объявления для поддержки бесплатной работы сервиса, используя стандартные анонимные файлы cookie.</p>

                  <p className="font-semibold text-white">4. Интеграция с Google Диском</p>
                  <p>При сохранении файлов на Google Диск аутентификация и передача данных происходят напрямую между вашим браузером и официальным Google API через OAuth без посредников.</p>

                  <p className="font-semibold text-white">5. Вопросы конфиденциальности</p>
                  <p>Вопросы и предложения, касающиеся нашей политики конфиденциальности, можно направлять на наш официальный адрес электронной почты.</p>
                </>
              )}

              {lang === 'HI' && (
                <>
                  <p className="font-semibold text-white">1. गोपनीयता और स्थानीय प्रसंस्करण</p>
                  <p>आपकी गोपनीयता एक प्राथमिकता है, <strong>Down&Convert</strong> अद्यतन वेब तकनीक (WebAssembly, WebAudio API, Node.js) के साथ काम करता है, जिसका अर्थ है कि आपकी परिवर्तित मीडिया फ़ाइलें हमारे सर्वर पर भेजी या संग्रहीत नहीं की जाती हैं (यह client-side मोड में संचालित होता है)।</p>

                  <p className="font-semibold text-white">2. डेटा संग्रह</p>
                  <p>हम फ़ाइल रूपांतरण के लिए व्यक्तिगत पहचान डेटा एकत्र नहीं करते हैं। हम आपकी मीडिया फ़ाइलों को ट्रैक या संग्रहीत नहीं करते हैं।</p>

                  <p className="font-semibold text-white">3. कुकीज़ और तृतीय-पक्ष विज्ञापन</p>
                  <p>मुफ़्त सेवा संचालन का समर्थन करने और प्रदर्शन को मापने के लिए तृतीय-पक्ष विज्ञापन भागीदार मानक अज्ञात कुकीज़ का उपयोग कर सकते हैं।</p>

                  <p className="font-semibold text-white">4. Google ड्राइव एकीकरण</p>
                  <p>जब आप Google ड्राइव में फ़ाइलें सहेजना चुनते हैं, तो प्रमाणीकरण और अपलोड बिना किसी मध्यस्थ के सीधे आपके ब्राउज़र और Google के आधिकारिक API के बीच होता है।</p>

                  <p className="font-semibold text-white">5. गोपनीयता से जुड़े प्रश्न</p>
                  <p>हमारी गोपनीयता प्रथाओं के बारे में किसी भी प्रश्न को हमारे आधिकारिक सहायता ईमेल पर भेजा जा सकता है।</p>
                </>
              )}

              {lang === 'KO' && (
                <>
                  <p className="font-semibold text-white">1. 개인정보 보호 및 로컬 처리</p>
                  <p>귀하의 개인정보 보호는 최우선 과제이며, <strong>Down&Convert</strong>는 최신 웹 기술(WebAssembly, WebAudio API, Node.js)로 작동하므로 변환된 미디어 파일이 당사 서버로 전송되거나 저장되지 않습니다(client-side 모드로 작동).</p>

                  <p className="font-semibold text-white">2. 데이터 수집 금지</p>
                  <p>당사는 서비스 이용을 위해 개인 식별 정보를 수집하거나 보관하지 않으며, 미디어 파일을 추적하지 않습니다.</p>

                  <p className="font-semibold text-white">3. 쿠키 및 타사 광고</p>
                  <p>무료 서비스 운영을 지원하기 위해 타사 광고 파트너가 표준 익명 쿠키를 활용하여 맞춤형 광고를 제공할 수 있습니다.</p>

                  <p className="font-semibold text-white">4. Google 드라이브 연동</p>
                  <p>Google 드라이브에 파일을 저장하도록 선택하면 인증 및 업로드는 중개자 없이 귀하의 브라우저와 Google 공식 API 간에 직접 OAuth를 통해 안전하게 이루어집니다.</p>

                  <p className="font-semibold text-white">5. 개인정보 보호 문의</p>
                  <p>당사의 개인정보 보호 정책에 대한 질문이나 우려 사항은 공식 지원 이메일로 문의하실 수 있습니다.</p>
                </>
              )}
            </>
          )}

          {type === 'contact' && (
            <div className="py-4 space-y-6">
              <p className="text-slate-300">
                {lang === 'PT' && 'Tem dúvidas, sugestões de melhorias, parcerias ou precisa de suporte? Entre em contato diretamente através do nosso e-mail oficial:'}
                {lang === 'EN' && 'Have questions, suggestions, partnership requests, or need support? Contact us directly via our official email:'}
                {lang === 'RU' && 'Есть вопросы, предложения или нужна поддержка? Свяжитесь с нами по электронной почте:'}
                {lang === 'HI' && 'क्या आपके पास कोई प्रश्न, सुझाव या समर्थन की आवश्यकता है? सीधे हमारे ईमेल पर संपर्क करें:'}
                {lang === 'KO' && '질문, 제안, 제휴 문의 또는 지원이 필요하신가요? 아래 공식 이메일로 직접 문의해 주세요:'}
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">E-mail de Contato / Suporte</span>
                    <a
                      href="mailto:liclopes@gmail.com"
                      className="text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      liclopes@gmail.com
                    </a>
                    <span className="text-xs text-cyan-400 font-medium block mt-0.5">by TechViva / Eli Lopes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                  <a
                    href="mailto:liclopes@gmail.com"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Enviar E-mail</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer text-sm"
          >
            {t('faq.close')}
          </button>
        </div>

      </div>
    </div>
  );
};
