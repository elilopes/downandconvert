import { GadgetNewsItem, NewsSummaryData, LocalizedString } from '../data/gadgetNews';

export function getLocalizedString(localized?: LocalizedString, lang: string = 'PT'): string {
  if (!localized) return '';
  return localized[lang as keyof LocalizedString] || localized.PT || localized.EN || '';
}

export function generateAlgorithmicNewsSummary(
  item: {
    title?: LocalizedString | string;
    subtitle?: LocalizedString | string;
    lead?: LocalizedString | string;
    category?: LocalizedString | string;
    author?: string;
    articleBody?: string;
  },
  lang: string = 'PT'
): NewsSummaryData {
  const titleText = typeof item.title === 'string' ? item.title : getLocalizedString(item.title, lang);
  const subtitleText = typeof item.subtitle === 'string' ? item.subtitle : getLocalizedString(item.subtitle, lang);
  const leadText = typeof item.lead === 'string' ? item.lead : getLocalizedString(item.lead, lang);
  const categoryText = typeof item.category === 'string' ? item.category : getLocalizedString(item.category, lang);
  const bodyText = item.articleBody || '';

  const fullText = [titleText, subtitleText, leadText, bodyText].filter(Boolean).join(' ');
  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;

  // 1. Tempo estimado de leitura
  const seconds = Math.max(20, Math.round((wordCount / 200) * 60));
  const readTime = seconds >= 60 ? `${Math.ceil(seconds / 60)} min` : `${seconds} seg`;

  // 2. Frase de Impacto (One-line take)
  let oneLineTake = subtitleText || leadText.split('.')[0] || titleText;
  if (oneLineTake.length > 140) {
    oneLineTake = oneLineTake.slice(0, 137) + '...';
  }

  // 3. Extração de Tópicos
  const rawSentences = (leadText + ' ' + bodyText + ' ' + subtitleText)
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  const topics: Array<{ icon: string; title: string; detail: string }> = [];

  const detectIcon = (text: string): string => {
    const lower = text.toLowerCase();
    if (/\b(bateria|mah|carregam|energia|watt|autonomia)\b/.test(lower)) return '🔋';
    if (/\b(ia|ai|inteligência|chip|npu|neural|processador|cpu|gpu)\b/.test(lower)) return '🧠';
    if (/\b(câmera|foto|vídeo|sensor|lente|zoom|resolução)\b/.test(lower)) return '📸';
    if (/\b(tela|display|oled|amoled|hz|polegadas|4k|8k)\b/.test(lower)) return '📺';
    if (/\b(wi-fi|5g|bluetooth|rede|conexão|sinal)\b/.test(lower)) return '📶';
    if (/\b(segurança|privacidade|proteção|senha|criptografia)\b/.test(lower)) return '🛡️';
    if (/\b(preço|custo|mercado|lançamento|vendas|dólar|reais)\b/.test(lower)) return '🏷️';
    if (/\b(saúde|médic|coração|ecg|pressão|oxigên)\b/.test(lower)) return '❤️';
    return '⚡';
  };

  // Tópico 1: Título / Destaque Principal
  topics.push({
    icon: detectIcon(titleText),
    title: categoryText ? `Avanço em ${categoryText}` : 'Destaque Técnico Principal',
    detail: titleText
  });

  // Tópico 2: Subtítulo / Detalhe Secundário
  if (subtitleText && subtitleText !== titleText) {
    topics.push({
      icon: detectIcon(subtitleText),
      title: 'Contexto & Aplicação',
      detail: subtitleText
    });
  }

  // Tópicos adicionais a partir de frases extraídas
  for (const sentence of rawSentences) {
    if (topics.length >= 4) break;
    if (!topics.some(t => t.detail === sentence)) {
      const words = sentence.split(' ');
      const topicTitle = words.slice(0, 4).join(' ') + '...';
      topics.push({
        icon: detectIcon(sentence),
        title: topicTitle.charAt(0).toUpperCase() + topicTitle.slice(1),
        detail: sentence
      });
    }
  }

  // Garantia de pelo menos 3 tópicos
  if (topics.length < 3) {
    topics.push({
      icon: '💡',
      title: 'Disponibilidade e Impacto',
      detail: `Informação atualizada para o mercado tecnológico e usuários de ${categoryText || 'gadgets'}.`
    });
  }

  // 4. Por que isso importa
  const whyItMatters = leadText.split('.')[1]?.trim() || 
    `Esta inovação traz melhorias diretas na eficiência, usabilidade e desempenho em ${categoryText || 'dispositivos tecnológicos'}.`;

  // 5. Palavras-chave
  const combinedForKw = (titleText + ' ' + categoryText + ' ' + subtitleText).toLowerCase();
  const candidateWords = combinedForKw.match(/\b[a-zà-ú0-9-]{4,}\b/gi) || [];
  const stopwords = new Set(['para', 'com', 'sem', 'como', 'mais', 'este', 'esta', 'onde', 'qual', 'pelo', 'pela', 'sobre', 'entre', 'novo', 'nova', 'novos', 'novas']);
  const kwCounts: Record<string, number> = {};

  for (const w of candidateWords) {
    const lower = w.toLowerCase();
    if (!stopwords.has(lower)) {
      kwCounts[lower] = (kwCounts[lower] || 0) + 1;
    }
  }

  const keywords = Object.entries(kwCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

  return {
    readTime,
    oneLineTake,
    topics,
    whyItMatters,
    keywords: keywords.length > 0 ? keywords : ['Tecnologia', categoryText || 'Gadget', 'Inovação']
  };
}
