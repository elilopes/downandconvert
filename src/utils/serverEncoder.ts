import { ConversionOptions } from '../types';

async function singleEncodeAttempt(
  inputBlob: Blob,
  options: ConversionOptions,
  onProgress?: (progress: number, stage: string) => void,
  attemptNum: number = 1,
  maxRetries: number = 2
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
    if (options.crop && options.crop.enabled && options.crop.width > 0 && options.crop.height > 0) {
      formData.append('cropX', String(options.crop.x));
      formData.append('cropY', String(options.crop.y));
      formData.append('cropW', String(options.crop.width));
      formData.append('cropH', String(options.crop.height));
      if (options.crop.shape) {
        formData.append('cropShape', options.crop.shape);
      }
    }
    if (options.metadata) {
      if (options.metadata.title) formData.append('title', options.metadata.title);
      if (options.metadata.artist) formData.append('artist', options.metadata.artist);
      if (options.metadata.album) formData.append('album', options.metadata.album);
      if (options.metadata.genre) formData.append('genre', options.metadata.genre);
    }

    xhr.open('POST', '/api/convert-server', true);
    xhr.responseType = 'blob';

    const prefix = attemptNum > 1 ? `[Tentativa ${attemptNum}/${maxRetries + 1}] ` : '';

    // Track upload progress (0% -> 45%)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const uploadPercent = Math.round((event.loaded / event.total) * 45);
        onProgress(uploadPercent, `${prefix}Enviando para o servidor (${uploadPercent * 2}%)...`);
      }
    };

    // Server processing state (45% -> 95%)
    let processingInterval: NodeJS.Timeout | null = null;
    let fakeProgress = 45;

    xhr.upload.onload = () => {
      if (onProgress) {
        onProgress(50, `${prefix}Processando no servidor em alta performance...`);
      }
      processingInterval = setInterval(() => {
        if (fakeProgress < 95) {
          fakeProgress += Math.floor(Math.random() * 5) + 2;
          if (onProgress) {
            onProgress(Math.min(95, fakeProgress), `${prefix}Codificando no servidor (FFmpeg)...`);
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
        // Read server error response and attach status
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errObj = JSON.parse(reader.result as string);
            const err: any = new Error(errObj.error || errObj.message || `Erro do servidor (${xhr.status})`);
            err.status = xhr.status;
            reject(err);
          } catch {
            const err: any = new Error(`Falha na conversão no servidor (${xhr.status})`);
            err.status = xhr.status;
            reject(err);
          }
        };
        reader.onerror = () => {
          const err: any = new Error(`Erro HTTP ${xhr.status}`);
          err.status = xhr.status;
          reject(err);
        };
        reader.readAsText(xhr.response);
      }
    };

    xhr.onerror = () => {
      if (processingInterval) clearInterval(processingInterval);
      const err: any = new Error('Erro de conexão com o servidor.');
      err.status = 502; // Treated as retryable gateway/network error
      reject(err);
    };

    xhr.ontimeout = () => {
      if (processingInterval) clearInterval(processingInterval);
      const err: any = new Error('Tempo limite excedido ao converter no servidor.');
      err.status = 504;
      reject(err);
    };

    xhr.send(formData);
  });
}

/**
 * Encodes audio/video on the server with automatic retry and exponential backoff
 * for transient 500, 502, 503, and 504 server errors.
 */
export async function encodeOnServer(
  inputBlob: Blob,
  options: ConversionOptions,
  onProgress?: (progress: number, stage: string) => void,
  maxRetries: number = 2
): Promise<Blob> {
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await singleEncodeAttempt(inputBlob, options, onProgress, attempt, maxRetries);
    } catch (err: any) {
      lastError = err;
      const status = err.status || 500;
      const isRetryable = status === 500 || status === 502 || status === 503 || status === 504 || status === 0;

      if (attempt <= maxRetries && isRetryable) {
        // Exponential backoff: 1.5s, 3.0s
        const delayMs = Math.pow(2, attempt - 1) * 1500;
        console.warn(`[encodeOnServer] Erro ${status} na tentativa ${attempt}/${maxRetries + 1}. Tentando novamente em ${delayMs}ms...`, err);
        
        if (onProgress) {
          onProgress(
            15,
            `Servidor instável (${status}). Tentando reconectar em ${(delayMs / 1000).toFixed(1)}s (Tentativa ${attempt + 1}/${maxRetries + 1})...`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        break;
      }
    }
  }

  throw lastError || new Error('Falha na conversão no servidor após múltiplas tentativas.');
}
