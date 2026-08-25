/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';
import {
  Music,
  CheckCircle2,
  Sparkles,
  Zap,
  Volume2,
  FileCheck,
  ShieldCheck,
  Sliders,
  Layers,
} from 'lucide-react';
import { AudioFormat, VideoItem, ConversionOptions, CropOptions } from './types';
import { Header } from './components/Header';
import { Dropzone } from './components/Dropzone';
import { BatchControls } from './components/BatchControls';
import { VideoItemCard } from './components/VideoItemCard';
import { AudioTrimmerModal } from './components/AudioTrimmerModal';
import { VideoCropModal } from './components/VideoCropModal';
import { RecordModal } from './components/RecordModal';
import { SampleModal } from './components/SampleModal';
import { FAQModal } from './components/FAQModal';
import { LegalModal } from './components/LegalModal';
import { MouseFollower } from './components/MouseFollower';
import { Footer } from './components/Footer';
import { BottomAdBanner } from './components/BottomAdBanner';
import {
  extractAudioBufferFromVideo,
  extractVideoThumbnail,
  generateWaveformPeaks,
  processAudioBuffer,
  encodeAudioBufferToMp3,
  encodeAudioBufferToWav,
} from './utils/audioEncoder';
import { encodeWithFFmpeg } from './utils/ffmpegEncoder';
import { encodeOnServer } from './utils/serverEncoder';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [items, setItems] = useState<VideoItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState<AudioFormat>('mp3');
  const [globalBitrate, setGlobalBitrate] = useState<64 | 128 | 192 | 256 | 320>(320);

  const [trimmerItem, setTrimmerItem] = useState<VideoItem | null>(null);
  const [cropItem, setCropItem] = useState<VideoItem | null>(null);
  const [fileLimitWarning, setFileLimitWarning] = useState<string | null>(null);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | 'contact' | null>(null);
  const [isProcessingAny, setIsProcessingAny] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // Maximum allowed file size for performance & stability (250MB)
  const MAX_FILE_SIZE_BYTES = 250 * 1024 * 1024;

  // Sync URL routes/parameters with modals (supports /privacy, /terms, ?legal=privacy, #privacy, etc.)
  useEffect(() => {
    const parseUrlForModals = () => {
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const legalParam = (searchParams.get('legal') || searchParams.get('modal') || searchParams.get('page') || '').toLowerCase();

      if (path.includes('privacy') || legalParam === 'privacy' || hash === '#privacy' || hash === '#privacidade') {
        setLegalModalType('privacy');
      } else if (path.includes('term') || legalParam === 'terms' || hash === '#terms' || hash === '#termos') {
        setLegalModalType('terms');
      } else if (path.includes('contact') || legalParam === 'contact' || hash === '#contact' || hash === '#contato') {
        setLegalModalType('contact');
      } else if (path.includes('faq') || searchParams.get('modal') === 'faq' || hash === '#faq') {
        setIsFAQOpen(true);
      }
    };

    parseUrlForModals();

    const handlePopState = () => {
      parseUrlForModals();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openLegalModal = (type: 'terms' | 'privacy' | 'contact') => {
    setLegalModalType(type);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('legal', type);
      window.history.pushState({ modal: type }, '', url.toString());
    } catch (e) {}
  };

  const closeLegalModal = () => {
    setLegalModalType(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('legal');
      url.searchParams.delete('modal');
      url.searchParams.delete('page');
      const cleanPath = url.pathname === '/privacy' || url.pathname === '/terms' || url.pathname === '/contact' ? '/' : url.pathname;
      window.history.replaceState({}, '', cleanPath + (url.search ? url.search : ''));
    } catch (e) {}
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#06b6d4', '#6366f1', '#f59e0b'],
      });
    } catch (e) {}
  };

  // Add files to list with file size limit validation
  const handleFilesSelected = async (files: File[]) => {
    const newItems: VideoItem[] = [];
    const oversizedFiles: string[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        oversizedFiles.push(file.name);
        continue;
      }

      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      const defaultOptions: ConversionOptions = {
        format: globalFormat,
        bitrate: globalBitrate,
        sampleRate: 44100,
        channels: 'stereo',
        volume: 1.0,
        trim: { enabled: false, start: 0, end: 0 },
        fadeIn: 0,
        fadeOut: 0,
        equalizer: 'flat',
        metadata: {
          title: cleanTitle,
          artist: '',
          album: 'Down&Convert processing...',
          year: new Date().getFullYear().toString(),
          genre: 'Vários',
          includeCover: true,
        },
      };

      const item: VideoItem = {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        duration: 0,
        thumbnailUrl: '',
        status: 'idle',
        progress: 0,
        progressText: 'Pronto para converter',
        options: defaultOptions,
      };

      newItems.push(item);
    }

    if (oversizedFiles.length > 0) {
      setFileLimitWarning(
        `O arquivo "${oversizedFiles.join(', ')}" excede o limite máximo permitido de 250MB para garantir estabilidade e velocidade. Por favor, envie vídeos menores.`
      );
    } else {
      setFileLimitWarning(null);
    }

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);

      // Asynchronously extract thumbnails & metadata for each item
      for (const item of newItems) {
        extractVideoThumbnail(item.file, 1.5).then(({ thumbnailUrl, duration }) => {
          setItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? {
                    ...it,
                    thumbnailUrl,
                    duration: duration || it.duration,
                    options: {
                      ...it.options,
                      trim: {
                        ...it.options.trim,
                        end: duration || it.options.trim.end,
                      },
                    },
                  }
                : it
            )
          );
        });
      }
    }
  };

  const handleSaveCrop = (itemId: string, crop: CropOptions) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              options: {
                ...it.options,
                crop,
              },
            }
          : it
      )
    );
  };

  // Convert a single item
  const handleConvertItem = async (itemId: string) => {
    const currentItem = items.find((it) => it.id === itemId);
    if (!currentItem) return;

    // Update status to reading/decoding
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              status: 'decoding',
              progress: 15,
              progressText: 'Extraindo áudio do vídeo...',
              error: undefined,
            }
          : it
      )
    );

    try {
      const format = currentItem.options.format;
      const isVideoOutput = ['mp4', 'webm', 'avi', 'mov', 'mkv'].includes(format);

      let audioBuf = currentItem.audioBuffer;
      let peaks = currentItem.waveformPeaks;
      let processedBuf: AudioBuffer | null = null;
      let coverBlob: Blob | null = null;

      if (!isVideoOutput) {
        // 1. Extract AudioBuffer
        if (!audioBuf) {
          audioBuf = await extractAudioBufferFromVideo(currentItem.file, (stage, progress) => {
            setItems((prev) =>
              prev.map((it) =>
                it.id === itemId ? { ...it, progress, progressText: stage } : it
              )
            );
          });
        }

        // Generate Peaks if not present
        peaks = peaks || generateWaveformPeaks(audioBuf, 120);

        // 2. Process DSP (Trim, Volume, EQ, Fade)
        processedBuf = await processAudioBuffer(
          audioBuf,
          currentItem.options,
          (stage, progress) => {
            setItems((prev) =>
              prev.map((it) =>
                it.id === itemId ? { ...it, progress, progressText: stage } : it
              )
            );
          }
        );

        // 3. Extract cover image thumbnail blob if enabled
        if (currentItem.options.metadata.includeCover) {
          const thumbResult = await extractVideoThumbnail(currentItem.file, 1.5);
          coverBlob = thumbResult.blob;
        }
      }

      // 4. Encode to Target Format
      let outputBlob: Blob;

      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId
            ? {
                ...it,
                status: 'encoding',
                progress: 70,
                progressText: `Codificando para ${format.toUpperCase()}...`,
              }
            : it
        )
      );

      if (isVideoOutput) {
        const isLargeFile = currentItem.file.size > 25 * 1024 * 1024; // > 25MB

        if (isLargeFile) {
          // Send directly to high-performance Server-Side FFmpeg
          setItems((prev) =>
            prev.map((it) =>
              it.id === itemId
                ? {
                    ...it,
                    progress: 15,
                    progressText: 'Arquivo grande: convertendo no servidor em alta performance...',
                  }
                : it
            )
          );

          outputBlob = await encodeOnServer(
            currentItem.file,
            currentItem.options,
            (progress, stage) => {
              setItems((prev) =>
                prev.map((it) =>
                  it.id === itemId
                    ? {
                        ...it,
                        progress,
                        progressText: stage,
                      }
                    : it
                )
              );
            }
          );
        } else {
          // Client-side WebAssembly with automatic Server-Side fallback
          try {
            outputBlob = await encodeWithFFmpeg(
              currentItem.file,
              currentItem.options,
              (progress) => {
                setItems((prev) =>
                  prev.map((it) =>
                    it.id === itemId
                      ? {
                          ...it,
                          progress,
                          progressText: `Codificando Vídeo ${format.toUpperCase()} (${progress}%)...`,
                        }
                      : it
                  )
                );
              },
              true // isVideo
            );
          } catch (wasmErr) {
            console.warn('WASM falhou ou limite de memória excedido. Acionando conversor do servidor...', wasmErr);
            setItems((prev) =>
              prev.map((it) =>
                it.id === itemId
                  ? {
                      ...it,
                      progress: 25,
                      progressText: 'Recorrendo ao conversor do servidor...',
                    }
                  : it
              )
            );
            outputBlob = await encodeOnServer(
              currentItem.file,
              currentItem.options,
              (progress, stage) => {
                setItems((prev) =>
                  prev.map((it) =>
                    it.id === itemId
                      ? {
                          ...it,
                          progress,
                          progressText: stage,
                        }
                      : it
                  )
                );
              }
            );
          }
        }
      } else if (processedBuf) {
        if (format === 'mp3') {
          outputBlob = await encodeAudioBufferToMp3(
            processedBuf,
            currentItem.options,
            coverBlob,
            (progress) => {
              setItems((prev) =>
                prev.map((it) =>
                  it.id === itemId
                    ? {
                        ...it,
                        progress,
                        progressText: `Codificando MP3 (${currentItem.options.bitrate} kbps)...`,
                      }
                    : it
                )
              );
            }
          );
        } else if (format === 'wav') {
          outputBlob = encodeAudioBufferToWav(processedBuf);
        } else {
          // Fallback to FFmpeg.wasm for AAC, M4A, FLAC, WMA, OGG, AIFF
          const wavTempBlob = encodeAudioBufferToWav(processedBuf);
          try {
            outputBlob = await encodeWithFFmpeg(
              wavTempBlob,
              currentItem.options,
              (progress) => {
                setItems((prev) =>
                  prev.map((it) =>
                    it.id === itemId
                      ? {
                          ...it,
                          progress,
                          progressText: `Codificando ${format.toUpperCase()} (${progress}%)...`,
                        }
                      : it
                  )
                );
              },
              false
            );
          } catch (wasmErr) {
            console.warn('WASM falhou no áudio. Acionando conversor do servidor...', wasmErr);
            setItems((prev) =>
              prev.map((it) =>
                it.id === itemId
                  ? {
                      ...it,
                      progress: 25,
                      progressText: 'Recorrendo ao conversor do servidor...',
                    }
                  : it
              )
            );
            outputBlob = await encodeOnServer(
              currentItem.file,
              currentItem.options,
              (progress, stage) => {
                setItems((prev) =>
                  prev.map((it) =>
                    it.id === itemId
                      ? {
                          ...it,
                          progress,
                          progressText: stage,
                        }
                      : it
                  )
                );
              }
            );
          }
        }
      } else {
        throw new Error('Processed buffer is null');
      }

      const outputUrl = URL.createObjectURL(outputBlob);
      const outputSize = outputBlob.size;

      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId
            ? {
                ...it,
                status: 'completed',
                progress: 100,
                progressText: 'Conversão concluída!',
                audioBuffer: audioBuf,
                waveformPeaks: peaks,
                outputBlob,
                outputUrl,
                outputSize,
                duration: processedBuf ? processedBuf.duration : (currentItem.duration || 0),
              }
            : it
        )
      );

      triggerConfetti();
    } catch (err: unknown) {
      console.error('Conversion failed for item:', itemId, err);
      const msg = err instanceof Error ? err.message : 'Erro ao decodificar ou codificar áudio.';
      setItems((prev) =>
        prev.map((it) =>
          it.id === itemId
            ? {
                ...it,
                status: 'error',
                progress: 0,
                progressText: 'Falha na conversão',
                error: msg,
              }
            : it
        )
      );
    }
  };

  // Convert all pending items
  const handleConvertAll = async () => {
    setIsProcessingAny(true);
    const pending = items.filter((it) => it.status !== 'completed');

    for (const item of pending) {
      await handleConvertItem(item.id);
    }

    setIsProcessingAny(false);
  };

  // Download a single converted item
  const handleDownloadItem = (item: VideoItem) => {
    if (!item.outputUrl || !item.outputBlob) return;

    const extension = item.options.format;
    const cleanName = (item.options.metadata.title || item.name)
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');

    const fileName = `${cleanName}.${extension}`;

    const a = document.createElement('a');
    a.href = item.outputUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download all completed items as a single ZIP
  const handleDownloadAllZip = async () => {
    const completedItems = items.filter((it) => it.status === 'completed' && it.outputBlob);
    if (completedItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      for (const it of completedItems) {
        if (!it.outputBlob) continue;
        const extension = it.options.format;
        const cleanName = (it.options.metadata.title || it.name)
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9_\-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/g, '_');
        const fileName = `${cleanName}.${extension}`;

        zip.file(fileName, it.outputBlob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);

      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `AudioMorph_MP3_Convertidos_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);
    } catch (e) {
      console.error('Failed to create ZIP:', e);
    } finally {
      setIsZipping(false);
    }
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const toRemove = prev.find((it) => it.id === id);
      if (toRemove?.outputUrl) {
        URL.revokeObjectURL(toRemove.outputUrl);
      }
      return prev.filter((it) => it.id !== id);
    });
  };

  // Clear all items
  const handleClearAll = () => {
    items.forEach((it) => {
      if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
    });
    setItems([]);
  };

  // Apply updated options from Trimmer Modal
  const handleSaveTrimmer = (updatedItem: VideoItem, shouldReconvert: boolean) => {
    setItems((prev) =>
      prev.map((it) => (it.id === updatedItem.id ? updatedItem : it))
    );

    if (shouldReconvert) {
      setTimeout(() => {
        handleConvertItem(updatedItem.id);
      }, 50);
    }
  };

  // Add split parts generated from Trimmer Modal
  const handleAddSplitItems = (newSplitItems: VideoItem[]) => {
    setItems((prev) => [...prev, ...newSplitItems]);
  };

  const handleUpdateItemOptions = (id: string, newOptions: ConversionOptions) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, options: newOptions } : it))
    );
  };

  // Sync global format and bitrate changes to items that haven't customized them
  const handleGlobalFormatChange = (fmt: AudioFormat) => {
    setGlobalFormat(fmt);
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        options: { ...it.options, format: fmt },
        status: it.status === 'completed' ? 'idle' : it.status,
      }))
    );
  };

  const handleGlobalBitrateChange = (bitrate: 64 | 128 | 192 | 256 | 320) => {
    setGlobalBitrate(bitrate);
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        options: { ...it.options, bitrate },
        status: it.status === 'completed' ? 'idle' : it.status,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Decorative Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-600/15 via-cyan-600/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[30%] -right-40 w-[500px] h-[500px] bg-indigo-600/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-emerald-600/10 blur-3xl rounded-full" />
      </div>

      {/* Header Bar */}
      <Header darkMode={true} setDarkMode={() => {}} onOpenFAQ={() => setIsFAQOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight sm:leading-none mb-4">
            {t('hero.title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero.desc')}
          </p>
        </div>

        {/* Dropzone Upload Area */}
        <div className="max-w-4xl mx-auto mb-8">
          {fileLimitWarning && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-sm flex items-start gap-3 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <strong className="block text-amber-300 font-semibold mb-0.5">Limite de Tamanho Excedido (Máx 250MB)</strong>
                <span>{fileLimitWarning}</span>
              </div>
              <button
                type="button"
                onClick={() => setFileLimitWarning(null)}
                className="text-xs text-amber-400 hover:text-white underline ml-2 shrink-0"
              >
                Fechar
              </button>
            </div>
          )}

          <Dropzone
            onFilesSelected={handleFilesSelected}
            onOpenRecorder={() => setIsRecorderOpen(true)}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
            isProcessing={isProcessingAny}
          />
        </div>

        {/* Video List & Batch Operations */}
        {items.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4 mb-14">
            {/* Batch Controls Bar */}
            <BatchControls
              items={items}
              globalFormat={globalFormat}
              setGlobalFormat={handleGlobalFormatChange}
              globalBitrate={globalBitrate}
              setGlobalBitrate={handleGlobalBitrateChange}
              onConvertAll={handleConvertAll}
              onDownloadAllZip={handleDownloadAllZip}
              onClearAll={handleClearAll}
              isProcessingAny={isProcessingAny}
              isZipping={isZipping}
            />

            {/* Individual Video Cards */}
            <div className="space-y-3">
              {items.map((item) => (
                <VideoItemCard
                  key={item.id}
                  item={item}
                  onConvert={handleConvertItem}
                  onDownload={handleDownloadItem}
                  onRemove={handleRemoveItem}
                  onOpenTrimmer={(it) => setTrimmerItem(it)}
                  onOpenCrop={(it) => setCropItem(it)}
                  onUpdateOptions={handleUpdateItemOptions}
                  isProcessing={isProcessingAny}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTerms={() => openLegalModal('terms')}
        onOpenPrivacy={() => openLegalModal('privacy')}
        onOpenContact={() => openLegalModal('contact')}
      />

      {/* Video Crop Modal */}
      {cropItem && (
        <VideoCropModal
          item={cropItem}
          isOpen={!!cropItem}
          onClose={() => setCropItem(null)}
          onSaveCrop={handleSaveCrop}
        />
      )}

      {/* Audio Trimmer & EQ & Tags Modal */}
      {trimmerItem && (
        <AudioTrimmerModal
          item={trimmerItem}
          onClose={() => setTrimmerItem(null)}
          onSave={handleSaveTrimmer}
          onAddSplitItems={handleAddSplitItems}
        />
      )}

      {/* Camera / Screen Recorder Modal */}
      {isRecorderOpen && (
        <RecordModal
          onClose={() => setIsRecorderOpen(false)}
          onVideoRecorded={(file) => {
            handleFilesSelected([file]);
            setIsRecorderOpen(false);
          }}
        />
      )}

      {/* Built-in Sample Generator Modal */}
      {isSampleModalOpen && (
        <SampleModal
          onClose={() => setIsSampleModalOpen(false)}
          onSampleGenerated={(file) => {
            handleFilesSelected([file]);
            setIsSampleModalOpen(false);
          }}
        />
      )}

      {/* FAQ Modal */}
      {isFAQOpen && (
        <FAQModal onClose={() => setIsFAQOpen(false)} />
      )}

      {/* Legal & Contact Modal */}
      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={closeLegalModal}
        />
      )}

      {/* Floating Bottom Ad Banner */}
      <BottomAdBanner />

      {/* Floating Rainbow Mouse Follower */}
      <MouseFollower />
    </div>
  );
}
