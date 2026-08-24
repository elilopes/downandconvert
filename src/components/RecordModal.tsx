import React, { useState, useRef, useEffect } from 'react';
import { Camera, Monitor, Radio, Square, Play, X, AlertCircle } from 'lucide-react';
import { formatTime } from '../utils/audioEncoder';

interface RecordModalProps {
  onClose: () => void;
  onVideoRecorded: (file: File) => void;
}

export const RecordModal: React.FC<RecordModalProps> = ({ onClose, onVideoRecorded }) => {
  const [sourceType, setSourceType] = useState<'camera' | 'screen'>('camera');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [streamActive, setStreamActive] = useState(false);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasRequestedPermission) {
      startPreview(sourceType);
    }
    return () => {
      stopAllMedia();
    };
  }, [sourceType, hasRequestedPermission]);

  const stopAllMedia = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const startPreview = async (type: 'camera' | 'screen') => {
    stopAllMedia();
    setErrorMsg('');

    try {
      let stream: MediaStream;
      if (type === 'camera') {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setStreamActive(true);

      // Handle stream end event (e.g. user clicks "stop sharing" browser button)
      stream.getVideoTracks()[0].onended = () => {
        if (isRecording) {
          stopRecording();
        }
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Permissão negada para acessar microfone/câmera/tela.';
      setErrorMsg(`Não foi possível iniciar a captura: ${msg}`);
      setStreamActive(false);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    setErrorMsg('');
    chunksRef.current = [];

    let mimeType = 'video/webm;codecs=vp8,opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm';
    }

    try {
      const mediaRecorder = new MediaRecorder(
        streamRef.current,
        mimeType ? { mimeType } : undefined
      );

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'video/webm' });
        const filename = `gravacao_${sourceType === 'camera' ? 'camera' : 'tela'}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.mp4`;
        const file = new File([blob], filename, { type: 'video/mp4' });
        onVideoRecorded(file);
        stopAllMedia();
        onClose();
      };

      mediaRecorder.start(250);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordedSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordedSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setErrorMsg('Erro ao iniciar gravador de mídia.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gravar Áudio & Vídeo</h3>
              <p className="text-xs text-slate-400">Grave da sua câmera ou tela para extrair o MP3</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Toggle */}
        <div className="flex items-center gap-2 mt-4 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            type="button"
            disabled={isRecording}
            onClick={() => setSourceType('camera')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              sourceType === 'camera'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Webcam & Microfone</span>
          </button>

          <button
            type="button"
            disabled={isRecording}
            onClick={() => setSourceType('screen')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              sourceType === 'screen'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Gravar Tela / Aba</span>
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Preview Area */}
        <div className="relative mt-4 aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
          <video
            ref={videoRef}
            muted
            playsInline
            className={`w-full h-full object-cover ${!streamActive ? 'hidden' : 'block'}`}
          />

          {!streamActive && (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                {sourceType === 'camera' ? <Camera className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
              </div>
              <p className="text-sm font-semibold text-white mb-1">
                {sourceType === 'camera' ? 'Câmera e Microfone Desativados' : 'Compartilhamento de Tela Inativo'}
              </p>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                {sourceType === 'camera'
                  ? 'Clique abaixo apenas quando desejar habilitar a câmera para gravar seu vídeo.'
                  : 'Clique abaixo para selecionar uma janela ou tela inteira para capturar.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setHasRequestedPermission(true);
                  startPreview(sourceType);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {sourceType === 'camera' ? <Camera className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                <span>{sourceType === 'camera' ? 'Ativar Câmera' : 'Selecionar Tela'}</span>
              </button>
            </div>
          )}

          {/* Recording Timer Badge */}
          {isRecording && (
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md shadow-lg animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>Gravando: {formatTime(recordedSeconds)}</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
          >
            Cancelar
          </button>

          {isRecording ? (
            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2 animate-bounce"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Concluir Gravação & Converter</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={!streamActive}
              onClick={startRecording}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Radio className="w-4 h-4" />
              <span>Iniciar Gravação</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
