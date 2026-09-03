import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Maximize2,
  Smartphone,
  Square,
  Tv,
  Film,
  Move,
  Play,
  Pause,
  Scissors,
  AlertCircle,
  HelpCircle,
  Instagram,
} from 'lucide-react';
import { VideoItem, CropOptions } from '../types';
import { formatTime } from '../utils/audioEncoder';

interface VideoCropModalProps {
  item: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveCrop: (itemId: string, crop: CropOptions) => void;
}

interface AspectPreset {
  id: string;
  name: string;
  sub: string;
  ratio: number | null;
  shape?: 'rect' | 'circle'; // width / height, or null for free
  icon: React.ReactNode;
}

export const VideoCropModal: React.FC<VideoCropModalProps> = ({
  item,
  isOpen,
  onClose,
  onSaveCrop,
}) => {
  if (!isOpen || !item) return null;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(item.duration || 0);
  const [videoNaturalSize, setVideoNaturalSize] = useState<{ width: number; height: number }>({
    width: 1920,
    height: 1080,
  });

  const [containerDisplaySize, setContainerDisplaySize] = useState<{ width: number; height: number }>({
    width: 1,
    height: 1,
  });

  // Aspect ratio presets for social media
  const presets: AspectPreset[] = [
    {
      id: '9:16',
      name: '9:16 Stories / Reels / TikTok',
      sub: 'Vertical',
      ratio: 9 / 16,
      icon: <Smartphone className="w-4 h-4 text-pink-400" />,
    },
    {
      id: '1:1',
      name: '1:1 Quadrado',
      sub: 'Feed Instagram / Facebook',
      ratio: 1,
      icon: <Square className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: '4:5',
      name: '4:5 Retrato / Feed',
      sub: 'Instagram Portrait',
      ratio: 4 / 5,
      icon: <Instagram className="w-4 h-4 text-purple-400" />,
    },
    {
      id: '16:9',
      name: '16:9 Widescreen',
      sub: 'YouTube / Padrão',
      ratio: 16 / 9,
      icon: <Tv className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'circle',
      name: 'Círculo Perfeito',
      sub: 'Avatar / Profile',
      ratio: 1,
      shape: 'circle',
      icon: <div className="w-4 h-4 rounded-full border-2 border-indigo-400" />,
    },
    {
      id: 'free',
      name: 'Livre / Personalizado',
      sub: 'Qualquer proporção',
      ratio: null,
      icon: <Maximize2 className="w-4 h-4 text-amber-400" />,
    },
  ];

  const [selectedPresetId, setSelectedPresetId] = useState<string>('9:16');

  // Normalized crop percentages [0..100] relative to video container
  const [cropBox, setCropBox] = useState<{
    x: number; // percentage (0 to 100)
    y: number; // percentage (0 to 100)
    width: number; // percentage (0 to 100)
    height: number; // percentage (0 to 100)
    shape?: 'rect' | 'circle';
  }>({
    x: 25,
    y: 0,
    width: 50,
    height: 100,
    shape: 'rect',
  });

  // State for dragging/resizing
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<string | null>(null); // 'move', 'nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'
  const dragStartPos = useRef<{ clientX: number; clientY: number; initialCrop: typeof cropBox }>({
    clientX: 0,
    clientY: 0,
    initialCrop: { x: 0, y: 0, width: 100, height: 100, shape: 'rect' as 'rect' | 'circle' },
  });

  const [videoSrcUrl, setVideoSrcUrl] = useState<string>('');

  useEffect(() => {
    if (item.file) {
      const url = URL.createObjectURL(item.file);
      setVideoSrcUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [item.file]);

  // When video loads metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const nw = videoRef.current.videoWidth || 1920;
      const nh = videoRef.current.videoHeight || 1080;
      setVideoNaturalSize({ width: nw, height: nh });
      setDuration(videoRef.current.duration || item.duration || 0);

      // Apply initial crop according to existing item options or default 9:16
      if (item.options.crop && item.options.crop.enabled) {
        const c = item.options.crop;
        const pctX = (c.x / nw) * 100;
        const pctY = (c.y / nh) * 100;
        const pctW = (c.width / nw) * 100;
        const pctH = (c.height / nh) * 100;
        setCropBox({
          x: Math.max(0, Math.min(100 - pctW, pctX)),
          y: Math.max(0, Math.min(100 - pctH, pctY)),
          width: Math.max(1, Math.min(100, pctW)),
          height: Math.max(1, Math.min(100, pctH)),
        });
      } else {
        // Default to 9:16 centered
        applyPresetRatio(9 / 16, 'rect', nw, nh);
      }
    }
  };

  const updateDisplaySize = useCallback(() => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerDisplaySize({ width: rect.width, height: rect.height });
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateDisplaySize);
    return () => window.removeEventListener('resize', updateDisplaySize);
  }, [updateDisplaySize]);

  // Apply a specific aspect ratio to the cropBox
  const applyPresetRatio = (ratio: number | null, shape?: 'rect' | 'circle', videoW = videoNaturalSize.width, videoH = videoNaturalSize.height) => {
    if (!ratio) return;

    const videoAspect = videoW / videoH;
    let targetWidthPct = 100;
    let targetHeightPct = 100;

    if (ratio <= videoAspect) {
      // Crop is narrower than video (e.g. 9:16 on 16:9 video)
      targetHeightPct = 100;
      const targetPixelWidth = videoH * ratio;
      targetWidthPct = (targetPixelWidth / videoW) * 100;
    } else {
      // Crop is wider than video
      targetWidthPct = 100;
      const targetPixelHeight = videoW / ratio;
      targetHeightPct = (targetPixelHeight / videoH) * 100;
    }

    targetWidthPct = Math.min(100, Math.max(1, targetWidthPct));
    targetHeightPct = Math.min(100, Math.max(1, targetHeightPct));

    const newX = (100 - targetWidthPct) / 2;
    const newY = (100 - targetHeightPct) / 2;

    setCropBox({
      x: newX,
      y: newY,
      width: targetWidthPct,
      height: targetHeightPct,
      shape: shape || 'rect',
    });
  };

  const handleSelectPreset = (preset: AspectPreset) => {
    setSelectedPresetId(preset.id);
    if (preset.ratio !== null) {
      applyPresetRatio(preset.ratio, preset.shape);
    } else {
      setCropBox(prev => ({ ...prev, shape: 'rect' }));
    }
  };

  // Center the current box
  const handleCenterBox = () => {
    setCropBox((prev) => ({
      ...prev,
      x: (100 - prev.width) / 2,
      y: (100 - prev.height) / 2,
    }));
  };

  // Reset to full screen
  const handleResetFull = () => {
    setSelectedPresetId('free');
    setCropBox({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      shape: 'rect',
    });
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Mouse / Touch Dragging Logic
  const handlePointerDown = (e: React.PointerEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragHandle(handle);
    dragStartPos.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      initialCrop: { ...cropBox },
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleContainerPointerDown = (e: React.PointerEvent) => {
    if (e.target === containerRef.current || e.target === videoRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragHandle('draw');
      setSelectedPresetId('free');
      
      const rect = containerRef.current!.getBoundingClientRect();
      const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

      const initial = { x: xPct, y: yPct, width: 0, height: 0, shape: 'rect' as 'rect' | 'circle' };
      dragStartPos.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        initialCrop: initial,
      };
      setCropBox(initial);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragHandle || containerDisplaySize.width <= 0) return;

    if (dragHandle === 'draw') {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const currentXPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const currentYPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

      const startX = dragStartPos.current.initialCrop.x;
      const startY = dragStartPos.current.initialCrop.y;

      const newX = Math.min(startX, currentXPct);
      const newY = Math.min(startY, currentYPct);
      const newW = Math.abs(currentXPct - startX);
      const newH = Math.abs(currentYPct - startY);

      setCropBox(prev => ({
        ...prev,
        x: newX,
        y: newY,
        width: Math.max(1, newW),
        height: Math.max(1, newH),
      }));
      return;
    }

    const deltaXPixels = e.clientX - dragStartPos.current.clientX;
    const deltaYPixels = e.clientY - dragStartPos.current.clientY;

    const deltaXPct = (deltaXPixels / containerDisplaySize.width) * 100;
    const deltaYPct = (deltaYPixels / containerDisplaySize.height) * 100;

    const initial = dragStartPos.current.initialCrop;
    const currentPreset = presets.find((p) => p.id === selectedPresetId);
    const fixedRatio = selectedPresetId === 'free' ? null : currentPreset?.ratio || null;

    if (dragHandle === 'move') {
      let newX = initial.x + deltaXPct;
      let newY = initial.y + deltaYPct;

      newX = Math.max(0, Math.min(100 - initial.width, newX));
      newY = Math.max(0, Math.min(100 - initial.height, newY));

      setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
    } else {
      // Resizing handle
      let newX = initial.x;
      let newY = initial.y;
      let newW = initial.width;
      let newH = initial.height;

      const videoAspect = videoNaturalSize.width / videoNaturalSize.height;

      if (dragHandle.includes('e')) {
        newW = Math.max(1, Math.min(100 - initial.x, initial.width + deltaXPct));
      }
      if (dragHandle.includes('w')) {
        const potentialX = Math.max(0, Math.min(initial.x + initial.width - 1, initial.x + deltaXPct));
        newW = initial.width + (initial.x - potentialX);
        newX = potentialX;
      }
      if (dragHandle.includes('s')) {
        newH = Math.max(1, Math.min(100 - initial.y, initial.height + deltaYPct));
      }
      if (dragHandle.includes('n')) {
        const potentialY = Math.max(0, Math.min(initial.y + initial.height - 1, initial.y + deltaYPct));
        newH = initial.height + (initial.y - potentialY);
        newY = potentialY;
      }

      // If aspect ratio is locked
      if (fixedRatio !== null) {
        if (dragHandle === 'e' || dragHandle === 'w' || dragHandle.includes('e') || dragHandle.includes('w')) {
          const pixelW = (newW / 100) * videoNaturalSize.width;
          const pixelH = pixelW / fixedRatio;
          newH = (pixelH / videoNaturalSize.height) * 100;
          if (newY + newH > 100) {
            newH = 100 - newY;
            const constrainedPixelW = (newH / 100) * videoNaturalSize.height * fixedRatio;
            newW = (constrainedPixelW / videoNaturalSize.width) * 100;
          }
        } else if (dragHandle === 'n' || dragHandle === 's') {
          const pixelH = (newH / 100) * videoNaturalSize.height;
          const pixelW = pixelH * fixedRatio;
          newW = (pixelW / videoNaturalSize.width) * 100;
          if (newX + newW > 100) {
            newW = 100 - newX;
            const constrainedPixelH = (newW / 100) * videoNaturalSize.width / fixedRatio;
            newH = (constrainedPixelH / videoNaturalSize.height) * 100;
          }
        }
      }

      setCropBox(prev => ({
        ...prev,
        x: Math.max(0, Math.min(100 - newW, newX)),
        y: Math.max(0, Math.min(100 - newH, newY)),
        width: Math.max(1, Math.min(100, newW)),
        height: Math.max(1, Math.min(100, newH)),
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      setDragHandle(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Convert percentages to real video pixel coordinates
  const pixelX = Math.round((cropBox.x / 100) * videoNaturalSize.width);
  const pixelY = Math.round((cropBox.y / 100) * videoNaturalSize.height);
  const pixelW = Math.round((cropBox.width / 100) * videoNaturalSize.width);
  const pixelH = Math.round((cropBox.height / 100) * videoNaturalSize.height);

  const handleConfirmCrop = () => {
    const isFull = cropBox.x <= 1 && cropBox.y <= 1 && cropBox.width >= 98 && cropBox.height >= 98;
    onSaveCrop(item.id, {
      enabled: !isFull,
      x: pixelX,
      y: pixelY,
      width: pixelW,
      height: pixelH,
      shape: cropBox.shape,
    });
    onClose();
  };

  const handleDisableCrop = () => {
    onSaveCrop(item.id, {
      enabled: false,
      x: 0,
      y: 0,
      width: videoNaturalSize.width,
      height: videoNaturalSize.height,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Recorte Personalizado de Vídeo (Crop)
              </h3>
              <p className="text-xs text-slate-400">
                Arraste o enquadramento sobre o vídeo e selecione proporções para Reels, Stories e TikTok
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Preset Buttons Bar */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              Proporções e Padrões para Redes Sociais:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {presets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                      {preset.icon}
                      <span>{preset.id.toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full font-medium">
                      {preset.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Preview & Interactive Crop Box */}
          <div className="relative flex flex-col items-center justify-center bg-slate-950 rounded-2xl border border-slate-800 p-2 sm:p-4 overflow-hidden min-h-[300px]">
            <div
              ref={containerRef}
              className="relative inline-block select-none max-w-full overflow-hidden rounded-xl shadow-2xl"
              onPointerDown={handleContainerPointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Actual Video */}
              <video
                ref={videoRef}
                src={videoSrcUrl}
                playsInline
                preload="metadata"
                className="max-h-[50vh] sm:max-h-[55vh] w-auto block object-contain rounded-lg"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Darkened Mask Outside Crop Area */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className={`absolute pointer-events-none ${cropBox.shape === 'circle' ? 'rounded-full' : ''}`}
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.width}%`,
                    height: `${cropBox.height}%`,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
                  }}
                />
              </div>

              {/* Interactive Crop Frame */}
              <div
                className={`absolute border-2 border-cyan-400 ${cropBox.shape === 'circle' ? 'rounded-full' : 'rounded'} cursor-move group shadow-2xl shadow-cyan-500/40`}
                style={{
                  left: `${cropBox.x}%`,
                  top: `${cropBox.y}%`,
                  width: `${cropBox.width}%`,
                  height: `${cropBox.height}%`,
                  touchAction: 'none',
                }}
                onPointerDown={(e) => handlePointerDown(e, 'move')}
              >
                {/* Rule of Thirds Grid Lines inside Crop Box */}
                {cropBox.shape !== 'circle' && (
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-cyan-300/40" />
                  <div className="border-r border-b border-cyan-300/40" />
                  <div className="border-b border-cyan-300/40" />
                  <div className="border-r border-b border-cyan-300/40" />
                  <div className="border-r border-b border-cyan-300/40" />
                  <div className="border-b border-cyan-300/40" />
                  <div className="border-r border-cyan-300/40" />
                  <div className="border-r border-cyan-300/40" />
                  <div />
                  </div>
                )}

                {/* Dimension Badge in Center Top */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/85 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-500/40 pointer-events-none shadow backdrop-blur-sm whitespace-nowrap">
                  {pixelW} × {pixelH} px {selectedPresetId !== 'free' && `(${selectedPresetId})`}
                </div>

                {/* Center Move Icon Indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-70 transition-opacity">
                  <Move className="w-8 h-8 text-white drop-shadow-md" />
                </div>

                {/* 8 Resize Handles */}
                {/* Corners */}
                <div
                  onPointerDown={(e) => handlePointerDown(e, 'nw')}
                  className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-md cursor-nwse-resize hover:scale-125 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown(e, 'ne')}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-md cursor-nesw-resize hover:scale-125 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown(e, 'sw')}
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-md cursor-nesw-resize hover:scale-125 transition-transform"
                />
                <div
                  onPointerDown={(e) => handlePointerDown(e, 'se')}
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-md cursor-nwse-resize hover:scale-125 transition-transform"
                />

                {/* Edges (Only for free mode) */}
                {selectedPresetId === 'free' && (
                  <>
                    <div
                      onPointerDown={(e) => handlePointerDown(e, 'n')}
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-cyan-400/80 rounded-full border border-white cursor-ns-resize"
                    />
                    <div
                      onPointerDown={(e) => handlePointerDown(e, 's')}
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-cyan-400/80 rounded-full border border-white cursor-ns-resize"
                    />
                    <div
                      onPointerDown={(e) => handlePointerDown(e, 'w')}
                      className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-6 w-2.5 bg-cyan-400/80 rounded-full border border-white cursor-ew-resize"
                    />
                    <div
                      onPointerDown={(e) => handlePointerDown(e, 'e')}
                      className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-6 w-2.5 bg-cyan-400/80 rounded-full border border-white cursor-ew-resize"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Video Player Controls Below Preview */}
            <div className="w-full flex items-center justify-between gap-3 mt-3 px-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="text-xs font-mono text-slate-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Quick alignment helpers */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCenterBox}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-750 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1"
                  title="Centralizar o corte"
                >
                  <Move className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Centralizar</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetFull}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-750 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1"
                  title="Restaurar tamanho total do vídeo"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Vídeo Completo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick info footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-850 border border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Resolução Original: <strong className="text-slate-200">{videoNaturalSize.width} × {videoNaturalSize.height} px</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                Recorte Final: <strong className="text-emerald-300">{pixelW} × {pixelH} px</strong> (Posição X: {pixelX}, Y: {pixelY})
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/40">
          <button
            type="button"
            onClick={handleDisableCrop}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            Remover Recorte
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmCrop}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Recorte</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
