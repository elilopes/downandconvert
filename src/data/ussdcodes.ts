export interface UssdCode {
  code: string;
  titleKey: string;
  descKey: string;
  carrier: 'vivo' | 'claro' | 'tim' | 'oi' | 'vodafone' | 'correios' | 'geral' | 'android' | 'samsung' | 'xiaomi' | 'motorola' | 'iphone' | 'tmobile' | 'att' | 'orange' | 'movistar' | 'jio' | 'huawei' | 'oneplus' | 'sony' | 'nothing' | 'nokia' | 'realme' | 'pixel' | 'mts' | 'megafon' | 'tele2' | 'beeline';
  category: 'saldo' | 'recarga' | 'numero' | 'internet' | 'teste' | 'sistema' | 'limpeza';
  type?: 'USSD' | 'MMI';
  id: string;
}

export const USSD_DATABASE: UssdCode[] = [
  // Vivo
  { code: '*8000', titleKey: 'ussd.code.vivo.8000.title', descKey: 'ussd.code.vivo.8000.desc', carrier: 'vivo', category: 'saldo', type: 'USSD', id: 'consultar-saldo-vivo' },
  { code: '*800', titleKey: 'ussd.code.vivo.800.title', descKey: 'ussd.code.vivo.800.desc', carrier: 'vivo', category: 'saldo', type: 'USSD', id: 'saldo-sms-vivo' },
  { code: '*8486', titleKey: 'ussd.code.vivo.8486.title', descKey: 'ussd.code.vivo.8486.desc', carrier: 'vivo', category: 'saldo', type: 'USSD', id: 'atendimento-vivo' },
  { code: '*7000', titleKey: 'ussd.code.vivo.7000.title', descKey: 'ussd.code.vivo.7000.desc', carrier: 'vivo', category: 'recarga', type: 'USSD', id: 'recarga-vivo' },
  { code: '*52*Numero#', titleKey: 'ussd.code.vivo.activate52.title', descKey: 'ussd.code.vivo.activate52.desc', carrier: 'vivo', category: 'numero', type: 'USSD', id: 'ativar-caixa-postal-vivo' },
  { code: '#52#', titleKey: 'ussd.code.vivo.deactivate52.title', descKey: 'ussd.code.vivo.deactivate52.desc', carrier: 'vivo', category: 'numero', type: 'USSD', id: 'desativar-caixa-postal-vivo' },

  // Claro
  { code: '*544#', titleKey: 'ussd.code.claro.544.title', descKey: 'ussd.code.claro.544.desc', carrier: 'claro', category: 'internet', type: 'USSD', id: 'saldo-internet-claro' },
  { code: '*546#', titleKey: 'ussd.code.claro.546.title', descKey: 'ussd.code.claro.546.desc', carrier: 'claro', category: 'saldo', type: 'USSD', id: 'saldo-creditos-claro' },
  { code: '*555#', titleKey: 'ussd.code.claro.555.title', descKey: 'ussd.code.claro.555.desc', carrier: 'claro', category: 'recarga', type: 'USSD', id: 'recarga-claro' },
  { code: '*510#', titleKey: 'ussd.code.claro.510.title', descKey: 'ussd.code.claro.510.desc', carrier: 'claro', category: 'numero', type: 'USSD', id: 'descobrir-numero-claro' },

  // TIM
  { code: '*222#', titleKey: 'ussd.code.tim.222.title', descKey: 'ussd.code.tim.222.desc', carrier: 'tim', category: 'saldo', type: 'USSD', id: 'consultar-saldo-tim' },
  { code: '*144#', titleKey: 'ussd.code.tim.144.title', descKey: 'ussd.code.tim.144.desc', carrier: 'tim', category: 'saldo', type: 'USSD', id: 'menu-interativo-tim' },
  { code: '*271#', titleKey: 'ussd.code.tim.271.title', descKey: 'ussd.code.tim.271.desc', carrier: 'tim', category: 'numero', type: 'USSD', id: 'descobrir-numero-tim' },
  { code: '*244#', titleKey: 'ussd.code.tim.244.title', descKey: 'ussd.code.tim.244.desc', carrier: 'tim', category: 'recarga', type: 'USSD', id: 'recarga-tim' },

  // Oi
  { code: '*880#', titleKey: 'ussd.code.oi.880.title', descKey: 'ussd.code.oi.880.desc', carrier: 'oi', category: 'saldo', type: 'USSD', id: 'menu-interativo-oi' },
  { code: '*800', titleKey: 'ussd.code.oi.800.title', descKey: 'ussd.code.oi.800.desc', carrier: 'oi', category: 'saldo', type: 'USSD', id: 'consultar-saldo-oi' },

  // Vodafone
  { code: '*#1345#', titleKey: 'ussd.code.vodafone.1345.title', descKey: 'ussd.code.vodafone.1345.desc', carrier: 'vodafone', category: 'saldo', type: 'USSD', id: 'consultar-saldo-vodafone' },
  { code: '*174#', titleKey: 'ussd.code.vodafone.174.title', descKey: 'ussd.code.vodafone.174.desc', carrier: 'vodafone', category: 'saldo', type: 'USSD', id: 'menu-interativo-vodafone' },

  // Correios Celular
  { code: '*225#', titleKey: 'ussd.code.correios.225.title', descKey: 'ussd.code.correios.225.desc', carrier: 'correios', category: 'saldo', type: 'USSD', id: 'consultar-saldo-correios' },
  { code: '*221#', titleKey: 'ussd.code.correios.221.title', descKey: 'ussd.code.correios.221.desc', carrier: 'correios', category: 'numero', type: 'USSD', id: 'descobrir-numero-correios' },
  { code: '*220#', titleKey: 'ussd.code.correios.220.title', descKey: 'ussd.code.correios.220.desc', carrier: 'correios', category: 'sistema', type: 'USSD', id: 'menu-interativo-correios' },

  // Android & Sistema / Diagnóstico / Testes
  { code: '*#06#', titleKey: 'ussd.code.geral.06.title', descKey: 'ussd.code.geral.06.desc', carrier: 'geral', category: 'sistema', type: 'MMI', id: 'descobrir-imei-celular' },
  { code: '*#*#4636#*#*', titleKey: 'ussd.code.android.4636.title', descKey: 'ussd.code.android.4636.desc', carrier: 'android', category: 'teste', type: 'MMI', id: 'menu-teste-android-info' },
  { code: '*#0*#', titleKey: 'ussd.code.samsung.0.title', descKey: 'ussd.code.samsung.0.desc', carrier: 'samsung', category: 'teste', type: 'MMI', id: 'menu-teste-hardware-samsung' },
  { code: '*#*#34971539#*#*', titleKey: 'ussd.code.android.34971539.title', descKey: 'ussd.code.android.34971539.desc', carrier: 'android', category: 'sistema', type: 'MMI', id: 'info-camera-android' },
  { code: '*#*#7594#*#*', titleKey: 'ussd.code.android.7594.title', descKey: 'ussd.code.android.7594.desc', carrier: 'android', category: 'sistema', type: 'MMI', id: 'desligar-direto-android' },
  { code: '*#*#232338#*#*', titleKey: 'ussd.code.android.232338.title', descKey: 'ussd.code.android.232338.desc', carrier: 'android', category: 'sistema', type: 'MMI', id: 'mac-address-wifi-android' },
  { code: '*#*#0289#*#*', titleKey: 'ussd.code.android.0289.title', descKey: 'ussd.code.android.0289.desc', carrier: 'android', category: 'teste', type: 'MMI', id: 'teste-audio-android' },
  { code: '*#*#0842#*#*', titleKey: 'ussd.code.android.0842.title', descKey: 'ussd.code.android.0842.desc', carrier: 'android', category: 'teste', type: 'MMI', id: 'teste-vibracao-android' },

  // Limpeza SysDump, Firmware, Desbloqueio PUK, Diagnóstico
  { code: '*#9900#', titleKey: 'ussd.code.samsung.9900.title', descKey: 'ussd.code.samsung.9900.desc', carrier: 'samsung', category: 'limpeza', type: 'MMI', id: 'sysdump-samsung' },
  { code: '*#2663#', titleKey: 'ussd.code.samsung.2663.title', descKey: 'ussd.code.samsung.2663.desc', carrier: 'samsung', category: 'sistema', type: 'MMI', id: 'touch-screen-version-samsung' },
  { code: '*#05#', titleKey: 'ussd.code.geral.puk05.title', descKey: 'ussd.code.geral.puk05.desc', carrier: 'geral', category: 'sistema', type: 'MMI', id: 'desbloqueio-puk' },
  { code: '*#9090#', titleKey: 'ussd.code.samsung.9090.title', descKey: 'ussd.code.samsung.9090.desc', carrier: 'samsung', category: 'teste', type: 'MMI', id: 'diagnostic-configuration-samsung' },
  { code: '*#0228#', titleKey: 'ussd.code.samsung.0228.title', descKey: 'ussd.code.samsung.0228.desc', carrier: 'samsung', category: 'teste', type: 'MMI', id: 'status-bateria-samsung' },
  
  // iPhone (iOS) & MMI Específicos
  { code: '*#06#', titleKey: 'ussd.code.iphone.imei.title', descKey: 'ussd.code.iphone.imei.desc', carrier: 'iphone', category: 'sistema', type: 'MMI', id: 'descobrir-imei-iphone' },
  { code: '*3001#12345#*', titleKey: 'ussd.code.iphone.3001.title', descKey: 'ussd.code.iphone.3001.desc', carrier: 'iphone', category: 'teste', type: 'MMI', id: 'field-test-mode-iphone' },
  { code: '*#21#', titleKey: 'ussd.code.geral.21.title', descKey: 'ussd.code.geral.21.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'verificar-encaminhamento-chamadas' },
  { code: '*#67#', titleKey: 'ussd.code.geral.67.title', descKey: 'ussd.code.geral.67.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'verificar-encaminhamento-chamadas-ocupado' },
  { code: '*#43#', titleKey: 'ussd.code.geral.43.title', descKey: 'ussd.code.geral.43.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'verificar-chamada-espera' },
  { code: '*43#', titleKey: 'ussd.code.iphone.activate43.title', descKey: 'ussd.code.iphone.activate43.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'ativar-chamada-espera-iphone' },
  { code: '#43#', titleKey: 'ussd.code.iphone.deactivate43.title', descKey: 'ussd.code.iphone.deactivate43.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'desativar-chamada-espera-iphone' },
  { code: '*#5005*7672#', titleKey: 'ussd.code.iphone.smsc.title', descKey: 'ussd.code.iphone.smsc.desc', carrier: 'iphone', category: 'sistema', type: 'USSD', id: 'centro-mensagens-sms-iphone' },
  { code: '*#33#', titleKey: 'ussd.code.geral.33.title', descKey: 'ussd.code.geral.33.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'verificar-bloqueio-chamadas' },
  { code: '*5005*25371#', titleKey: 'ussd.code.iphone.alerttest.title', descKey: 'ussd.code.iphone.alerttest.desc', carrier: 'iphone', category: 'teste', type: 'MMI', id: 'teste-alertas-emergencia-iphone' },
  { code: '*5005*25370#', titleKey: 'ussd.code.iphone.alertdisable.title', descKey: 'ussd.code.iphone.alertdisable.desc', carrier: 'iphone', category: 'teste', type: 'MMI', id: 'desativar-alertas-emergencia-iphone' },
  { code: '*3282#', titleKey: 'ussd.code.iphone.data.title', descKey: 'ussd.code.iphone.data.desc', carrier: 'iphone', category: 'internet', type: 'USSD', id: 'uso-dados-iphone' },
  { code: '*31#', titleKey: 'ussd.code.iphone.hide31.title', descKey: 'ussd.code.iphone.hide31.desc', carrier: 'iphone', category: 'numero', type: 'USSD', id: 'ocultar-numero-chamada-iphone' },
  { code: '*3370#', titleKey: 'ussd.code.iphone.3370.title', descKey: 'ussd.code.iphone.3370.desc', carrier: 'iphone', category: 'sistema', type: 'MMI', id: 'melhorar-qualidade-voz-iphone' },
  { code: '*#0*#', titleKey: 'ussd.code.iphone.tests0.title', descKey: 'ussd.code.iphone.tests0.desc', carrier: 'iphone', category: 'teste', type: 'MMI', id: 'menu-teste-hardware-iphone' },

  // Encaminhamento e Privacidade
  { code: '*#21#', titleKey: 'ussd.code.geral.21.title', descKey: 'ussd.code.geral.21.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'verificar-encaminhamento-chamadas' },
  { code: '*21*Numero#', titleKey: 'ussd.code.geral.activate21.title', descKey: 'ussd.code.geral.activate21.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-encaminhamento-chamadas' },
  { code: '#21#', titleKey: 'ussd.code.geral.deactivate21.title', descKey: 'ussd.code.geral.deactivate21.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'desativar-encaminhamento-chamadas' },
  { code: '*#61#', titleKey: 'ussd.code.geral.61.title', descKey: 'ussd.code.geral.61.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'verificar-encaminhamento-nao-atende' },
  { code: '*61*Numero#', titleKey: 'ussd.code.geral.activate61.title', descKey: 'ussd.code.geral.activate61.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-encaminhamento-nao-atende' },
  { code: '#61#', titleKey: 'ussd.code.geral.deactivate61.title', descKey: 'ussd.code.geral.deactivate61.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'desativar-encaminhamento-nao-atende' },
  { code: '*#67#', titleKey: 'ussd.code.geral.67.title', descKey: 'ussd.code.geral.67.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'verificar-encaminhamento-chamadas-ocupado' },
  { code: '*63*Numero#', titleKey: 'ussd.code.geral.activate63.title', descKey: 'ussd.code.geral.activate63.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-encaminhamento-fora-area' },
  { code: '#63#', titleKey: 'ussd.code.geral.deactivate63.title', descKey: 'ussd.code.geral.deactivate63.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'desativar-encaminhamento-fora-area' },
  { code: '*67*Numero#', titleKey: 'ussd.code.geral.activate67.title', descKey: 'ussd.code.geral.activate67.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-encaminhamento-ocupado' },
  { code: '#67#', titleKey: 'ussd.code.geral.deactivate67.title', descKey: 'ussd.code.geral.deactivate67.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'desativar-encaminhamento-ocupado' },
  { code: '*#43#', titleKey: 'ussd.code.geral.43.title', descKey: 'ussd.code.geral.43.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'verificar-chamada-espera' },
  { code: '*43#', titleKey: 'ussd.code.geral.activate43.title', descKey: 'ussd.code.geral.activate43.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-chamada-espera' },
  { code: '#43#', titleKey: 'ussd.code.geral.deactivate43.title', descKey: 'ussd.code.geral.deactivate43.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'desativar-chamada-espera' },
  { code: '*#33#', titleKey: 'ussd.code.geral.33.title', descKey: 'ussd.code.geral.33.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'verificar-bloqueio-chamadas' },
  { code: '#31#', titleKey: 'ussd.code.geral.31.title', descKey: 'ussd.code.geral.31.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ocultar-numero-chamada' },

  // Redes GSM, Centrais e Identificadores (Específicos de Rede GSM / Operadoras)
  { code: '*#100#', titleKey: 'ussd.code.geral.100.title', descKey: 'ussd.code.geral.100.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'descobrir-numero-rede' },
  { code: '*#101#', titleKey: 'ussd.code.geral.101.title', descKey: 'ussd.code.geral.101.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'informacoes-servicos-rede' },
  { code: '*#102#', titleKey: 'ussd.code.geral.102.title', descKey: 'ussd.code.geral.102.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'informacoes-servicos-rede-2' },
  { code: '*#103#', titleKey: 'ussd.code.geral.103.title', descKey: 'ussd.code.geral.103.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'informacoes-rede-tempo' },
  { code: '*#104#', titleKey: 'ussd.code.geral.104.title', descKey: 'ussd.code.geral.104.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'informacoes-voicemail' },
  { code: '*#105#', titleKey: 'ussd.code.geral.105.title', descKey: 'ussd.code.geral.105.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'informacoes-celular-rede' },
  { code: '*#147#', titleKey: 'ussd.code.geral.147.title', descKey: 'ussd.code.geral.147.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ultima-chamada-perdida' },

  // Franquia e Serviços Verticais de Rede / VoIP / PBX
  { code: '#646#', titleKey: 'ussd.code.geral.646.title', descKey: 'ussd.code.geral.646.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'minutos-disponiveis-plano' },
  { code: '*78', titleKey: 'ussd.code.geral.78.title', descKey: 'ussd.code.geral.78.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'ativar-nao-perturbe-dnd' },

  // Cotação do Dólar & Serviços Financeiros / VAS
  { code: '*900*1#', titleKey: 'ussd.code.geral.dolar900.title', descKey: 'ussd.code.geral.dolar900.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'cotacao-dolar-ussd' },

  // Extratos Bancários & Mobile Banking (Offline / Sem Internet)
  { code: '*99#', titleKey: 'ussd.code.geral.bank99.title', descKey: 'ussd.code.geral.bank99.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'extrato-bancario-ussd' },
  { code: '*4004#', titleKey: 'ussd.code.geral.bank4004.title', descKey: 'ussd.code.geral.bank4004.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'extrato-bancario-ussd-4004' },

  // Caixa Postal (Voice Mail) & Configurações de Mensagens
  { code: '*555', titleKey: 'ussd.code.geral.voicemail555.title', descKey: 'ussd.code.geral.voicemail555.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'acessar-caixa-postal' },
  { code: '*#004#', titleKey: 'ussd.code.geral.vvm004.title', descKey: 'ussd.code.geral.vvm004.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'visual-voicemail-status' },

  // Serviços de Diretório & Informações de Assinantes
  { code: '102', titleKey: 'ussd.code.geral.dir102.title', descKey: 'ussd.code.geral.dir102.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'servico-diretorio-102' },
  { code: '411', titleKey: 'ussd.code.geral.dir411.title', descKey: 'ussd.code.geral.dir411.desc', carrier: 'geral', category: 'numero', type: 'USSD', id: 'servico-diretorio-411' },

  // FinTechs e Mobile Money
  { code: '*334#', titleKey: 'ussd.code.fintech.334.title', descKey: 'ussd.code.fintech.334.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'mobile-money-334' },
  { code: '*151#', titleKey: 'ussd.code.fintech.151.title', descKey: 'ussd.code.fintech.151.desc', carrier: 'geral', category: 'saldo', type: 'USSD', id: 'mobile-money-151' },

  // Telemetria, Máquinas de Cartão (POS) e IoT
  { code: '*#0011#', titleKey: 'ussd.code.iot.0011.title', descKey: 'ussd.code.iot.0011.desc', carrier: 'android', category: 'sistema', type: 'USSD', id: 'menu-servico-gsm-android' },
  { code: '*#7353#', titleKey: 'ussd.code.iot.7353.title', descKey: 'ussd.code.iot.7353.desc', carrier: 'android', category: 'teste', type: 'MMI', id: 'menu-teste-rapido-android' },

  // Gerenciamento de Segurança do SIM (PIN e PUK - Padrão Universal 3GPP)
  { code: '**04*oldPIN*newPIN*newPIN#', titleKey: 'ussd.code.geral.pin04.title', descKey: 'ussd.code.geral.pin04.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'alterar-pin' },
  { code: '**042*oldPIN2*newPIN2*newPIN2#', titleKey: 'ussd.code.geral.pin042.title', descKey: 'ussd.code.geral.pin042.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'alterar-pin2' },
  { code: '**05*PUK*newPIN*newPIN#', titleKey: 'ussd.code.geral.puk05unlock.title', descKey: 'ussd.code.geral.puk05unlock.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'desbloquear-puk-pin' },
  { code: '**052*PUK2*newPIN2*newPIN2#', titleKey: 'ussd.code.geral.puk052unlock.title', descKey: 'ussd.code.geral.puk052unlock.desc', carrier: 'geral', category: 'sistema', type: 'USSD', id: 'desbloquear-puk2-pin2' },

  // Operadoras de outros países (T-Mobile, AT&T, Orange, Movistar, Jio)
  { code: '#932#', titleKey: 'ussd.code.tmobile.932.title', descKey: 'ussd.code.tmobile.932.desc', carrier: 'tmobile', category: 'internet', type: 'USSD', id: 'tmobile-uso-dados' },
  { code: '#225#', titleKey: 'ussd.code.tmobile.225.title', descKey: 'ussd.code.tmobile.225.desc', carrier: 'tmobile', category: 'saldo', type: 'USSD', id: 'tmobile-saldo-vencimento' },
  { code: '#646#', titleKey: 'ussd.code.tmobile.646.title', descKey: 'ussd.code.tmobile.646.desc', carrier: 'tmobile', category: 'saldo', type: 'USSD', id: 'tmobile-minutos-utilizados' },
  { code: '#674#', titleKey: 'ussd.code.tmobile.674.title', descKey: 'ussd.code.tmobile.674.desc', carrier: 'tmobile', category: 'saldo', type: 'USSD', id: 'tmobile-mensagens-enviadas' },
  { code: '#999#', titleKey: 'ussd.code.tmobile.999.title', descKey: 'ussd.code.tmobile.999.desc', carrier: 'tmobile', category: 'saldo', type: 'USSD', id: 'tmobile-saldo-prepago' },
  { code: '*3282#', titleKey: 'ussd.code.att.3282.title', descKey: 'ussd.code.att.3282.desc', carrier: 'att', category: 'internet', type: 'USSD', id: 'att-consulta-dados' },
  { code: '*225#', titleKey: 'ussd.code.att.225.title', descKey: 'ussd.code.att.225.desc', carrier: 'att', category: 'saldo', type: 'USSD', id: 'att-consultar-fatura' },
  { code: '*646#', titleKey: 'ussd.code.att.646.title', descKey: 'ussd.code.att.646.desc', carrier: 'att', category: 'saldo', type: 'USSD', id: 'att-minutos-voz' },
  { code: '*7282#', titleKey: 'ussd.code.att.7282.title', descKey: 'ussd.code.att.7282.desc', carrier: 'att', category: 'internet', type: 'USSD', id: 'att-dados-compartilhados' },
  { code: '*777#', titleKey: 'ussd.code.att.777.title', descKey: 'ussd.code.att.777.desc', carrier: 'att', category: 'saldo', type: 'USSD', id: 'att-saldo-prepago' },
  { code: '#123#', titleKey: 'ussd.code.orange.123.title', descKey: 'ussd.code.orange.123.desc', carrier: 'orange', category: 'saldo', type: 'USSD', id: 'orange-menu-saldo' },
  { code: '#100#', titleKey: 'ussd.code.orange.100.title', descKey: 'ussd.code.orange.100.desc', carrier: 'orange', category: 'numero', type: 'USSD', id: 'orange-proprio-numero' },
  { code: '#101#', titleKey: 'ussd.code.orange.101.title', descKey: 'ussd.code.orange.101.desc', carrier: 'orange', category: 'recarga', type: 'USSD', id: 'orange-menu-recarga' },
  { code: '#125#', titleKey: 'ussd.code.orange.125.title', descKey: 'ussd.code.orange.125.desc', carrier: 'orange', category: 'saldo', type: 'USSD', id: 'orange-consulta-consumo' },
  { code: '*133#', titleKey: 'ussd.code.movistar.133.title', descKey: 'ussd.code.movistar.133.desc', carrier: 'movistar', category: 'saldo', type: 'USSD', id: 'movistar-consulta-saldo' },
  { code: '*102#', titleKey: 'ussd.code.movistar.102.title', descKey: 'ussd.code.movistar.102.desc', carrier: 'movistar', category: 'saldo', type: 'USSD', id: 'movistar-consulta-bonus' },
  { code: '*123#', titleKey: 'ussd.code.movistar.123.title', descKey: 'ussd.code.movistar.123.desc', carrier: 'movistar', category: 'sistema', type: 'USSD', id: 'movistar-menu-servicos' },
  { code: '*111#', titleKey: 'ussd.code.movistar.111.title', descKey: 'ussd.code.movistar.111.desc', carrier: 'movistar', category: 'recarga', type: 'USSD', id: 'movistar-recarga-sos' },
  { code: '*333#', titleKey: 'ussd.code.jio.333.title', descKey: 'ussd.code.jio.333.desc', carrier: 'jio', category: 'saldo', type: 'USSD', id: 'jio-saldo-consumo' },
  { code: '*199#', titleKey: 'ussd.code.jio.199.title', descKey: 'ussd.code.jio.199.desc', carrier: 'jio', category: 'sistema', type: 'USSD', id: 'jio-menu-conta' },
  { code: '*199*1#', titleKey: 'ussd.code.jio.1991.title', descKey: 'ussd.code.jio.1991.desc', carrier: 'jio', category: 'sistema', type: 'USSD', id: 'jio-detalhes-plano' },

  // Aparelhos não populares / Marcas alternativas (Huawei, OnePlus, Sony, Nothing, Nokia, Realme, Pixel, MediaTek)
  { code: '*#*#2846579#*#*', titleKey: 'ussd.code.huawei.2846579.title', descKey: 'ussd.code.huawei.2846579.desc', carrier: 'huawei', category: 'sistema', type: 'MMI', id: 'huawei-projectmenu' },
  { code: '##1357946##', titleKey: 'ussd.code.huawei.1357946.title', descKey: 'ussd.code.huawei.1357946.desc', carrier: 'huawei', category: 'sistema', type: 'MMI', id: 'huawei-device-id' },
  { code: '*#*#121314#*#*', titleKey: 'ussd.code.huawei.121314.title', descKey: 'ussd.code.huawei.121314.desc', carrier: 'huawei', category: 'teste', type: 'MMI', id: 'huawei-teste-touch' },
  { code: '*#*#6130#*#*', titleKey: 'ussd.code.huawei.6130.title', descKey: 'ussd.code.huawei.6130.desc', carrier: 'huawei', category: 'sistema', type: 'MMI', id: 'huawei-estatisticas-uso' },
  { code: '*#808#', titleKey: 'ussd.code.oneplus.808.title', descKey: 'ussd.code.oneplus.808.desc', carrier: 'oneplus', category: 'teste', type: 'MMI', id: 'oneplus-diagnostico' },
  { code: '*#*#800#*#*', titleKey: 'ussd.code.oneplus.800.title', descKey: 'ussd.code.oneplus.800.desc', carrier: 'oneplus', category: 'limpeza', type: 'MMI', id: 'oneplus-logkit' },
  { code: '*#1234#', titleKey: 'ussd.code.oneplus.1234.title', descKey: 'ussd.code.oneplus.1234.desc', carrier: 'oneplus', category: 'sistema', type: 'MMI', id: 'oneplus-software-version' },
  { code: '*#*#7378423#*#*', titleKey: 'ussd.code.sony.7378423.title', descKey: 'ussd.code.sony.7378423.desc', carrier: 'sony', category: 'teste', type: 'MMI', id: 'sony-servicemenu' },
  { code: '*#*#225#*#*', titleKey: 'ussd.code.sony.225.title', descKey: 'ussd.code.sony.225.desc', carrier: 'sony', category: 'sistema', type: 'MMI', id: 'sony-calendario-info' },
  { code: '*#*#426#*#*', titleKey: 'ussd.code.sony.426.title', descKey: 'ussd.code.sony.426.desc', carrier: 'sony', category: 'sistema', type: 'MMI', id: 'sony-fcm-diagnostico' },
  { code: '*#*#6684464#*#*', titleKey: 'ussd.code.nothing.6684464.title', descKey: 'ussd.code.nothing.6684464.desc', carrier: 'nothing', category: 'teste', type: 'MMI', id: 'nothing-feedback' },
  { code: '*#*#0#*#*', titleKey: 'ussd.code.nothing.0.title', descKey: 'ussd.code.nothing.0.desc', carrier: 'nothing', category: 'teste', type: 'MMI', id: 'nothing-diagnostico-geral' },
  { code: '*#0228#', titleKey: 'ussd.code.nothing.0228.title', descKey: 'ussd.code.nothing.0228.desc', carrier: 'nothing', category: 'teste', type: 'MMI', id: 'nothing-calibracao-bateria' },
  { code: '*#0000#', titleKey: 'ussd.code.nokia.0000.title', descKey: 'ussd.code.nokia.0000.desc', carrier: 'nokia', category: 'sistema', type: 'MMI', id: 'nokia-firmware' },
  { code: '*#7780#', titleKey: 'ussd.code.nokia.7780.title', descKey: 'ussd.code.nokia.7780.desc', carrier: 'nokia', category: 'sistema', type: 'MMI', id: 'nokia-restaurar' },
  { code: '*#7370#', titleKey: 'ussd.code.nokia.7370.title', descKey: 'ussd.code.nokia.7370.desc', carrier: 'nokia', category: 'limpeza', type: 'MMI', id: 'nokia-hard-reset' },
  { code: '*#2820#', titleKey: 'ussd.code.nokia.2820.title', descKey: 'ussd.code.nokia.2820.desc', carrier: 'nokia', category: 'sistema', type: 'MMI', id: 'nokia-mac-bluetooth' },
  { code: '*#899#', titleKey: 'ussd.code.realme.899.title', descKey: 'ussd.code.realme.899.desc', carrier: 'realme', category: 'teste', type: 'MMI', id: 'realme-engineermode' },
  { code: '*#6776#', titleKey: 'ussd.code.realme.6776.title', descKey: 'ussd.code.realme.6776.desc', carrier: 'realme', category: 'sistema', type: 'MMI', id: 'realme-software-details' },
  { code: '*#*#800#*#*', titleKey: 'ussd.code.realme.800.title', descKey: 'ussd.code.realme.800.desc', carrier: 'realme', category: 'limpeza', type: 'MMI', id: 'realme-feedback-tool' },
  { code: '*#*#4636#*#*', titleKey: 'ussd.code.pixel.4636.title', descKey: 'ussd.code.pixel.4636.desc', carrier: 'pixel', category: 'teste', type: 'MMI', id: 'pixel-estatisticas' },
  { code: '*#*#3424#*#*', titleKey: 'ussd.code.pixel.3424.title', descKey: 'ussd.code.pixel.3424.desc', carrier: 'pixel', category: 'sistema', type: 'MMI', id: 'pixel-diagnostic-menu' },
  { code: '*#*#426#*#*', titleKey: 'ussd.code.pixel.426.title', descKey: 'ussd.code.pixel.426.desc', carrier: 'pixel', category: 'teste', type: 'MMI', id: 'pixel-firebase-diagnostics' },
  { code: '*#*#3646633#*#*', titleKey: 'ussd.code.mtk.3646633.title', descKey: 'ussd.code.mtk.3646633.desc', carrier: 'geral', category: 'sistema', type: 'MMI', id: 'mtk-engineering-mode' },

  // Novas adições de códigos (Operadoras internacionais e Fabricantes de nicho)
  { code: '#686#', titleKey: 'ussd.code.tmobile.686.title', descKey: 'ussd.code.tmobile.686.desc', carrier: 'tmobile', category: 'numero', type: 'USSD', id: 'tmobile-proprio-numero' },
  { code: '#263#', titleKey: 'ussd.code.tmobile.263.title', descKey: 'ussd.code.tmobile.263.desc', carrier: 'tmobile', category: 'sistema', type: 'USSD', id: 'tmobile-id-chamada' },
  { code: '*#61#', titleKey: 'ussd.code.att.61.title', descKey: 'ussd.code.att.61.desc', carrier: 'att', category: 'numero', type: 'USSD', id: 'att-status-encaminhamento' },
  { code: '*#33#', titleKey: 'ussd.code.att.33.title', descKey: 'ussd.code.att.33.desc', carrier: 'att', category: 'sistema', type: 'USSD', id: 'att-barramento-chamadas' },
  { code: '#144#', titleKey: 'ussd.code.orange.144.title', descKey: 'ussd.code.orange.144.desc', carrier: 'orange', category: 'saldo', type: 'USSD', id: 'orange-money-menu' },
  { code: '*141#', titleKey: 'ussd.code.orange.141.title', descKey: 'ussd.code.orange.141.desc', carrier: 'orange', category: 'numero', type: 'USSD', id: 'orange-callmeback' },
  { code: '*100#', titleKey: 'ussd.code.movistar.100.title', descKey: 'ussd.code.movistar.100.desc', carrier: 'movistar', category: 'sistema', type: 'USSD', id: 'movistar-menu-prepago' },
  { code: '*2293#', titleKey: 'ussd.code.movistar.2293.title', descKey: 'ussd.code.movistar.2293.desc', carrier: 'movistar', category: 'internet', type: 'USSD', id: 'movistar-dados-tarifa' },
  { code: '*333*3#', titleKey: 'ussd.code.jio.3333.title', descKey: 'ussd.code.jio.3333.desc', carrier: 'jio', category: 'internet', type: 'USSD', id: 'jio-uso-dados-detalhado' },
  { code: '*333*2#', titleKey: 'ussd.code.jio.3332.title', descKey: 'ussd.code.jio.3332.desc', carrier: 'jio', category: 'saldo', type: 'USSD', id: 'jio-consulta-saldo-principal' },
  { code: '*#*#1472365#*#*', titleKey: 'ussd.code.huawei.1472365.title', descKey: 'ussd.code.huawei.1472365.desc', carrier: 'huawei', category: 'teste', type: 'MMI', id: 'huawei-teste-gps' },
  { code: '*#*#232339#*#*', titleKey: 'ussd.code.huawei.232339.title', descKey: 'ussd.code.huawei.232339.desc', carrier: 'huawei', category: 'teste', type: 'MMI', id: 'huawei-teste-wifi' },
  { code: '*#*#83818#*#*', titleKey: 'ussd.code.oneplus.83818.title', descKey: 'ussd.code.oneplus.83818.desc', carrier: 'oneplus', category: 'sistema', type: 'MMI', id: 'oneplus-engineermode-logs' },
  { code: '*#*#36446337#*#*', titleKey: 'ussd.code.oneplus.36446337.title', descKey: 'ussd.code.oneplus.36446337.desc', carrier: 'oneplus', category: 'teste', type: 'MMI', id: 'oneplus-hardware-eng-test' },
  { code: '*#*#0588#*#*', titleKey: 'ussd.code.sony.0588.title', descKey: 'ussd.code.sony.0588.desc', carrier: 'sony', category: 'teste', type: 'MMI', id: 'sony-teste-proximidade' },
  { code: '*#*#973283110#*#*', titleKey: 'ussd.code.sony.973283110.title', descKey: 'ussd.code.sony.973283110.desc', carrier: 'sony', category: 'sistema', type: 'MMI', id: 'sony-servicemode-lte' },
  { code: '*#*#4636#*#*', titleKey: 'ussd.code.nothing.4636.title', descKey: 'ussd.code.nothing.4636.desc', carrier: 'nothing', category: 'teste', type: 'MMI', id: 'nothing-testing-menu' },
  { code: '*#*#34971539#*#*', titleKey: 'ussd.code.nothing.34971539.title', descKey: 'ussd.code.nothing.34971539.desc', carrier: 'nothing', category: 'sistema', type: 'MMI', id: 'nothing-camera-firmware' },
  { code: '*#92702689#', titleKey: 'ussd.code.nokia.warranty.title', descKey: 'ussd.code.nokia.warranty.desc', carrier: 'nokia', category: 'sistema', type: 'MMI', id: 'nokia-warranty-menu' },
  { code: '*#62#', titleKey: 'ussd.code.nokia.62.title', descKey: 'ussd.code.nokia.62.desc', carrier: 'nokia', category: 'numero', type: 'USSD', id: 'nokia-unreachable-forward' },
  { code: '*#*#6484#*#*', titleKey: 'ussd.code.realme.6484.title', descKey: 'ussd.code.realme.6484.desc', carrier: 'realme', category: 'teste', type: 'MMI', id: 'realme-cit-hardware-test' },
  { code: '*#*#232339#*#*', titleKey: 'ussd.code.realme.232339.title', descKey: 'ussd.code.realme.232339.desc', carrier: 'realme', category: 'teste', type: 'MMI', id: 'realme-wlan-wifi-test' },
  { code: '*#*#8255#*#*', titleKey: 'ussd.code.pixel.8255.title', descKey: 'ussd.code.pixel.8255.desc', carrier: 'pixel', category: 'sistema', type: 'MMI', id: 'pixel-gtalk-service-monitor' },
  { code: '*#*#759#*#*', titleKey: 'ussd.code.pixel.759.title', descKey: 'ussd.code.pixel.759.desc', carrier: 'pixel', category: 'sistema', type: 'MMI', id: 'pixel-rlz-debug-ui' },

  // MTS (Russia)
  { code: '*100#', titleKey: 'ussd.code.mts.100.title', descKey: 'ussd.code.mts.100.desc', carrier: 'mts', category: 'saldo', type: 'USSD', id: 'mts-consultar-saldo' },
  { code: '*111*0887#', titleKey: 'ussd.code.mts.0887.title', descKey: 'ussd.code.mts.0887.desc', carrier: 'mts', category: 'numero', type: 'USSD', id: 'mts-descobrir-numero' },
  { code: '*100*1#', titleKey: 'ussd.code.mts.1001.title', descKey: 'ussd.code.mts.1001.desc', carrier: 'mts', category: 'internet', type: 'USSD', id: 'mts-saldo-internet' },
  { code: '*111#', titleKey: 'ussd.code.mts.111.title', descKey: 'ussd.code.mts.111.desc', carrier: 'mts', category: 'sistema', type: 'USSD', id: 'mts-menu-interativo' },

  // MegaFon (Russia)
  { code: '*100#', titleKey: 'ussd.code.megafon.100.title', descKey: 'ussd.code.megafon.100.desc', carrier: 'megafon', category: 'saldo', type: 'USSD', id: 'megafon-consultar-saldo' },
  { code: '*205#', titleKey: 'ussd.code.megafon.205.title', descKey: 'ussd.code.megafon.205.desc', carrier: 'megafon', category: 'numero', type: 'USSD', id: 'megafon-descobrir-numero' },
  { code: '*558#', titleKey: 'ussd.code.megafon.558.title', descKey: 'ussd.code.megafon.558.desc', carrier: 'megafon', category: 'internet', type: 'USSD', id: 'megafon-saldo-internet' },
  { code: '*105*3#', titleKey: 'ussd.code.megafon.1053.title', descKey: 'ussd.code.megafon.1053.desc', carrier: 'megafon', category: 'sistema', type: 'USSD', id: 'megafon-tarifa-ativa' },

  // Tele2 (Russia)
  { code: '*105#', titleKey: 'ussd.code.tele2.105.title', descKey: 'ussd.code.tele2.105.desc', carrier: 'tele2', category: 'saldo', type: 'USSD', id: 'tele2-consultar-saldo' },
  { code: '*201#', titleKey: 'ussd.code.tele2.201.title', descKey: 'ussd.code.tele2.201.desc', carrier: 'tele2', category: 'numero', type: 'USSD', id: 'tele2-descobrir-numero' },
  { code: '*155*0#', titleKey: 'ussd.code.tele2.1550.title', descKey: 'ussd.code.tele2.1550.desc', carrier: 'tele2', category: 'internet', type: 'USSD', id: 'tele2-saldo-internet' },
  { code: '*153#', titleKey: 'ussd.code.tele2.153.title', descKey: 'ussd.code.tele2.153.desc', carrier: 'tele2', category: 'sistema', type: 'USSD', id: 'tele2-servicos-pagos' },

  // Beeline (Russia)
  { code: '*102#', titleKey: 'ussd.code.beeline.102.title', descKey: 'ussd.code.beeline.102.desc', carrier: 'beeline', category: 'saldo', type: 'USSD', id: 'beeline-consultar-saldo' },
  { code: '*110*10#', titleKey: 'ussd.code.beeline.11010.title', descKey: 'ussd.code.beeline.11010.desc', carrier: 'beeline', category: 'numero', type: 'USSD', id: 'beeline-descobrir-numero' },
  { code: '*110*06#', titleKey: 'ussd.code.beeline.11006.title', descKey: 'ussd.code.beeline.11006.desc', carrier: 'beeline', category: 'internet', type: 'USSD', id: 'beeline-saldo-internet' },
  { code: '*141#', titleKey: 'ussd.code.beeline.141.title', descKey: 'ussd.code.beeline.141.desc', carrier: 'beeline', category: 'sistema', type: 'USSD', id: 'beeline-credito-confianca' },
];
