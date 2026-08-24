import { ConversionOptions } from '../types';

export async function encodeOnServer(
  inputBlob: Blob,
  options: ConversionOptions,
  onProgress?: (progress: number, stage: string) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    const isVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(options.format);
    const filename = `input.${isVideo ? 'mp4' : 'wav'}`;
    
    formData.append('file', inputBlob, filename);
    formData.append('format', options.format);
    if (options.videoQuality) {
      formData.append('videoQuality', options.videoQuality);
    }
    formData.append('bitrate', String(options.bitrate || 192));
    if (options.metadata) {
      if (options.metadata.title) formData.append('title', options.metadata.title);
      if (options.metadata.artist) formData.append('artist', options.metadata.artist);
      if (options.metadata.album) formData.append('album', options.metadata.album);
      if (options.metadata.genre) formData.append('genre', options.metadata.genre);
    }

    xhr.open('POST', '/api/convert-server', true);
    xhr.responseType = 'blob';

    // Track upload progress (0% -> 50%)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const uploadPercent = Math.round((event.loaded / event.total) * 45);
        onProgress(uploadPercent, `Enviando para o servidor (${uploadPercent * 2}%)...`);
      }
    };

    // Server processing state (45% -> 90%)
    let processingInterval: NodeJS.Timeout | null = null;
    let fakeProgress = 45;

    xhr.onloadstart = () => {
      // after upload completes, start simulating server processing progress
    };

    xhr.upload.onload = () => {
      if (onProgress) {
        onProgress(50, 'Processando no servidor em alta performance...');
      }
      processingInterval = setInterval(() => {
        if (fakeProgress < 95) {
          fakeProgress += Math.floor(Math.random() * 5) + 2;
          if (onProgress) {
            onProgress(Math.min(95, fakeProgress), 'Codificando no servidor (FFmpeg)...');
          }
        }
      }, 500);
    };

    xhr.onload = () => {
      if (processingInterval) clearInterval(processingInterval);

      if (xhr.status >= 200 && xhr.status < 300) {
        if (onProgress) onProgress(100, 'Conversão finalizada!');
        resolve(xhr.response);
      } else {
        // Try to read error text
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errObj = JSON.parse(reader.result as string);
            reject(new Error(errObj.error || errObj.message || `Erro do servidor (${xhr.status})`));
          } catch {
            reject(new Error(`Falha na conversão no servidor (${xhr.status})`));
          }
        };
        reader.onerror = () => reject(new Error(`Erro HTTP ${xhr.status}`));
        reader.readAsText(xhr.response);
      }
    };

    xhr.onerror = () => {
      if (processingInterval) clearInterval(processingInterval);
      reject(new Error('Erro de conexão com o servidor.'));
    };

    xhr.ontimeout = () => {
      if (processingInterval) clearInterval(processingInterval);
      reject(new Error('Tempo limite excedido ao converter no servidor.'));
    };

    xhr.send(formData);
  });
}
