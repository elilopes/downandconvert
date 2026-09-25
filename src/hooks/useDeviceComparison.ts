import { useState, useMemo, useCallback } from 'react';
import { Smartphone as SmartphoneType } from '../data/smartphones';
import { 
  compareDevicesAlgorithmically, 
  AlgorithmicComparisonResult,
  calculateDeviceCategoryScores 
} from '../utils/deviceComparison';

interface UseDeviceComparisonOptions {
  language?: string;
}

export function useDeviceComparison(options: UseDeviceComparisonOptions = {}) {
  const { language = 'PT' } = options;
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [activeComparison, setActiveComparison] = useState<AlgorithmicComparisonResult | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'algorithmic' | 'ai'>('algorithmic');

  /**
   * Executa a comparação instantânea sem IA (0ms de latência, sem custos ou erros de rede)
   */
  const compareLocally = useCallback((phones: SmartphoneType[]) => {
    if (!phones || phones.length < 2) {
      setActiveComparison(null);
      return null;
    }

    const result = compareDevicesAlgorithmically(phones, language);
    setActiveComparison(result);
    setComparisonMode('algorithmic');
    setAiError(null);
    return result;
  }, [language]);

  /**
   * Executa a análise com IA, caindo automaticamente de volta para a comparação algorítmica se a IA falhar
   */
  const compareWithAIAndFallback = useCallback(async (phones: SmartphoneType[]) => {
    if (!phones || phones.length < 2) return null;

    setIsAILoading(true);
    setAiError(null);

    // Primeiro gera a comparação algorítmica de segurança
    const fallbackResult = compareDevicesAlgorithmically(phones, language);

    try {
      const res = await fetch('/api/smartphones/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phones,
          language
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.comparison) {
        throw new Error(data.error || 'A IA não pôde processar a comparação no momento.');
      }

      const aiResult: AlgorithmicComparisonResult = {
        ...data.comparison,
        source: 'ai',
        detailedScores: fallbackResult.detailedScores
      };

      setActiveComparison(aiResult);
      setComparisonMode('ai');
      return aiResult;
    } catch (err: any) {
      console.warn('[useDeviceComparison] IA falhou ou ocupada (503). Utilizando Comparação Algorítmica como Fallback seguro:', err?.message);
      setAiError(err.message || 'IA temporariamente indisponível. Exibindo análise técnica algorítmica instantânea.');
      setActiveComparison(fallbackResult);
      setComparisonMode('algorithmic');
      return fallbackResult;
    } finally {
      setIsAILoading(false);
    }
  }, [language]);

  return {
    activeComparison,
    comparisonMode,
    isAILoading,
    aiError,
    compareLocally,
    compareWithAIAndFallback,
    calculateScores: calculateDeviceCategoryScores,
    resetComparison: () => {
      setActiveComparison(null);
      setAiError(null);
    }
  };
}
