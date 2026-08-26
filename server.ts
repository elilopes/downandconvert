import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import ytSearch from 'yt-search';
import { Readable } from 'stream';
import ytdl from '@distube/ytdl-core';
import multer from 'multer';
import os from 'os';
import fs from 'fs';
import { spawn } from 'child_process';
import youtubedl from 'youtube-dl-exec';
import axios from 'axios';
import NodeCache from 'node-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache configurado para 5 minutos (300 segundos), adcash
const adcashCache = new NodeCache({ stdTTL: 300 });

// Função para buscar a biblioteca periodicamente, adcash
async function getAdcashLibrary() {
  const cachedLib = adcashCache.get('adcashLib');
  if (cachedLib) return cachedLib;

  try {
    const response = await axios.get('https://adbpage.com/adblock?v=3');
    adcashCache.set('adcashLib', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar biblioteca Adcash:', error);
    return ''; // Retorna vazio se falhar, para não quebrar o site
  }
}

function extractVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?]+)/);
  return match ? match[1] : null;
}

function detectPlatform(url: string) {
  const lower = url.toLowerCase();
  if (lower.includes('tiktok.com') || lower.includes('douyin.com')) return 'tiktok';
  if (lower.includes('instagram.com')) return 'instagram';
  if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) return 'facebook';
  if (lower.includes('vimeo.com')) return 'vimeo';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
  if (lower.includes('pinterest.com') || lower.includes('pin.it')) return 'pinterest';
  if (lower.includes('reddit.com') || lower.includes('redd.it')) return 'reddit';
  if (lower.includes('soundcloud.com')) return 'soundcloud';
  if (lower.includes('spotify.com')) return 'spotify';
  if (lower.includes('capcut.com')) return 'capcut';
  if (lower.includes('threads.net')) return 'threads';
  if (lower.includes('dailymotion.com') || lower.includes('dai.ly')) return 'dailymotion';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  return 'general';
}

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '8d0b2005e5msh7794ca50aee0eb4p14f460jsn249cb3b9d70b';

// Helper for fetch with timeout
async function fetchWithTimeout(url: string, options: any = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// 1. YouTube Data Fetcher (youtube-media-downloader)
async function fetchYoutubeData(videoId: string) {
  const host = 'youtube-media-downloader.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/v2/video/details?videoId=${videoId}`, {
    headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': RAPID_API_KEY }
  });
  if (!response.ok) throw new Error(`YouTube API Error (Status ${response.status})`);
  return await response.json();
}

// 1.1. YouTube Video & MP3 Downloader API (youtube-video-mp3-downloader-api)
async function fetchYoutubeVideoMp3DownloaderApi(url: string, mode: string = 'video') {
  const host = 'youtube-video-mp3-downloader-api.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/download?url=${encodeURIComponent(url)}`, {
    headers: {
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY,
      'Accept': 'application/json'
    }
  }, 10000);
  if (!response.ok) throw new Error(`youtube-video-mp3-downloader-api returned status ${response.status}`);
  const json = await response.json();
  if (json.success === false) throw new Error(json.message || 'youtube-video-mp3-downloader-api under upgrade');
  const data = json.data || json;
  if (!data) throw new Error('Invalid response from youtube-video-mp3-downloader-api');

  const title = (data.title || 'youtube_media').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';
  const medias = Array.isArray(data.medias) ? data.medias : [];

  if (mode === 'audio') {
    const audioMedia = medias.find((m: any) => m.type === 'audio' || m.is_audio || m.quality?.includes('audio') || m.label?.includes('mp3') || m.ext === 'mp3' || m.ext === 'm4a');
    if (audioMedia && audioMedia.url) {
      return { downloadUrl: audioMedia.url, extension: audioMedia.ext || 'mp3', title };
    }
  }

  // Video mode or fallback to video media
  const videoMedia = medias.find((m: any) => (m.type === 'video' || !m.type) && m.url) || medias[0];
  if (videoMedia && videoMedia.url) {
    return { downloadUrl: videoMedia.url, extension: videoMedia.ext || 'mp4', title };
  }

  throw new Error('No media URL found in youtube-video-mp3-downloader-api');
}

// 1.2. YouTube to MP3 2025 API (youtube-mp3-2025)
async function fetchYoutubeMp32025(videoId: string, mode: string = 'video') {
  const host = 'youtube-mp3-2025.p.rapidapi.com';
  const endpoint = mode === 'audio' ? '/v1/social/youtube/audio' : '/v1/social/youtube/video';
  const response = await fetchWithTimeout(`https://${host}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY
    },
    body: JSON.stringify({ id: videoId })
  }, 10000);

  if (!response.ok) throw new Error(`youtube-mp3-2025 returned status ${response.status}`);
  const data = await response.json();
  if (data.error || data.success === false) throw new Error(data.message || 'youtube-mp3-2025 error');
  const title = (data.title || 'youtube_media').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

  const downloadUrl = data.linkDownload || data.linkStream || data.downloadUrl || data.url || (data.formats?.[0]?.url);
  if (!downloadUrl) throw new Error('No download URL returned from youtube-mp3-2025');

  return { downloadUrl, extension: mode === 'audio' ? 'mp3' : 'mp4', title };
}

async function fetchLoaderToInfoFallback(url: string) {
  const initialRes = await fetchWithTimeout(`https://loader.to/ajax/download.php?format=720&url=${encodeURIComponent(url)}`, {}, 10000);
  const data = await initialRes.json();
  if (!data || !data.id) throw new Error('No loader.to info');
  return {
    title: data.title || data.info?.title || 'youtube_media',
    thumbnail: data.thumbnail_url || data.info?.image || '',
    author: 'YouTube'
  };
}

// 1.3. YouTube Quick Video Downloader API (youtube-quick-video-downloader)
async function fetchYoutubeQuickVideoDownloader(url: string, mode: string = 'video') {
  const host = 'youtube-quick-video-downloader.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/api/youtube/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY,
      'X-Forwarded-For': '70.41.3.18'
    },
    body: JSON.stringify({ url })
  }, 10000);

  if (!response.ok) throw new Error(`youtube-quick-video-downloader returned status ${response.status}`);
  const data = await response.json();
  const title = (data.title || data.meta?.title || 'youtube_media').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

  let downloadUrl = '';
  if (mode === 'audio') {
    downloadUrl = data.audio || data.mp3 || data.audioUrl || (data.links?.audio?.[0]?.url) || (data.audios?.[0]?.url);
  } else {
    downloadUrl = data.video || data.mp4 || data.videoUrl || (data.links?.mp4?.[0]?.url) || (data.videos?.[0]?.url) || data.url;
  }

  if (!downloadUrl && (data.links || data.urls || data.medias)) {
    const list = data.links || data.urls || data.medias;
    if (Array.isArray(list) && list.length > 0) downloadUrl = list[0].url || list[0];
  }

  if (!downloadUrl) throw new Error('No download URL from youtube-quick-video-downloader');
  return { downloadUrl, extension: mode === 'audio' ? 'mp3' : 'mp4', title };
}

// 1.4. YouTube Audio Video Download (youtube-audio-video-download)
async function fetchYoutubeAudioVideoDownload(url: string, mode: string = 'video') {
  const host = 'youtube-audio-video-download.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/geturl?video_url=${encodeURIComponent(url)}`, {
    headers: {
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY,
      'Accept': 'application/json'
    }
  }, 10000);

  if (!response.ok) throw new Error(`youtube-audio-video-download returned status ${response.status}`);
  const data = await response.json();
  const title = (data.title || data.video_title || 'youtube_media').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

  let downloadUrl = '';
  if (mode === 'audio') {
    downloadUrl = data.audio_url || data.audio || data.download_audio || (data.audios?.[0]?.url) || data.url;
  } else {
    downloadUrl = data.video_url || data.video || data.download_url || (data.videos?.[0]?.url) || data.url;
  }

  if (!downloadUrl) throw new Error('No download URL from youtube-audio-video-download');
  return { downloadUrl, extension: mode === 'audio' ? 'mp3' : 'mp4', title };
}

// 1.5. YouTube Video / Stream Download (youtube-video-stream-download)
async function fetchYoutubeVideoStreamDownload(videoId: string, mode: string = 'video') {
  const host = 'youtube-video-stream-download.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/api/v1/Youtube/getAllDetails/${videoId}`, {
    headers: {
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY,
      'Accept': 'application/json'
    }
  }, 10000);

  if (!response.ok) throw new Error(`youtube-video-stream-download returned status ${response.status}`);
  const data = await response.json();
  const title = (data.title || data.videoDetails?.title || 'youtube_media').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

  let downloadUrl = '';
  if (mode === 'audio') {
    const audios = data.audioDetails || data.audios || (data.streamingData?.adaptiveFormats?.filter((f: any) => f.mimeType?.includes('audio')));
    if (audios && audios.length > 0) downloadUrl = audios[0].url || audios[0].downloadUrl;
  } else {
    const videos = data.videoDetails || data.videos || (data.streamingData?.formats);
    if (videos && videos.length > 0) downloadUrl = videos[0].url || videos[0].downloadUrl;
  }

  if (!downloadUrl && data.url) downloadUrl = data.url;
  if (!downloadUrl) throw new Error('No download URL from youtube-video-stream-download');
  return { downloadUrl, extension: mode === 'audio' ? 'mp3' : 'mp4', title };
}

// 2. TikTok Data Fetcher (No Watermark)
async function fetchTikTokData(url: string) {
  const host = 'tiktok-video-no-watermark2.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/?url=${encodeURIComponent(url)}`, {
    headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': RAPID_API_KEY }
  });
  if (!response.ok) throw new Error(`TikTok API Error (Status ${response.status})`);
  const data = await response.json();
  if (data.code !== 0 || !data.data) throw new Error(data.msg || 'Erro ao processar TikTok.');
  return data.data;
}

// 3. Facebook Data Fetcher
async function fetchFacebookData(url: string) {
  const host = 'facebook-download-media.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/?url=${encodeURIComponent(url)}`, {
    headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': RAPID_API_KEY }
  });
  if (!response.ok) throw new Error(`Facebook API Error (Status ${response.status})`);
  const data = await response.json();
  if (data.error || !data.data) throw new Error('Falha ao obter vídeo do Facebook');
  return data.data;
}

// 4. Vimeo Data Fetcher
async function fetchVimeoData(url: string) {
  const host = 'vimeo-video-downloader-api.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/video.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY
    },
    body: `video_url=${encodeURIComponent(url)}`
  });
  if (!response.ok) throw new Error(`Vimeo API Error (Status ${response.status})`);
  const data = await response.json();
  return data;
}

// 5. All-in-One Social Media Downloader (Download Social Media)
async function fetchAllInOneData(url: string) {
  const host = 'download-social-media.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/autolink?url=${encodeURIComponent(url)}`, {
    headers: {
      'x-rapidapi-host': host,
      'x-rapidapi-key': RAPID_API_KEY
    }
  });
  if (!response.ok) throw new Error(`All-in-One API Error (Status ${response.status})`);
  const data = await response.json();
  return data;
}

// 6. Instagram Reels Downloader API
async function fetchInstagramReelsData(url: string) {
  const host = 'instagram-reels-downloader-api.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/download?url=${encodeURIComponent(url)}`, {
    headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': RAPID_API_KEY }
  });
  if (!response.ok) throw new Error(`Instagram API Error (Status ${response.status})`);
  const data = await response.json();
  return data;
}

// 7. Invidious Open Source Fallback for YouTube
async function fetchInvidiousFallback(videoId: string, mode: string = 'video'): Promise<any> {
  const knownInstances = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://invidious.jing.rocks',
    'https://invidious.private.coffee',
    'https://yt.drgnz.club',
    'https://inv.tux.pizza',
    'https://invidious.projectsegfau.lt'
  ];

  for (const inst of knownInstances) {
    try {
      const res = await fetchWithTimeout(`${inst}/api/v1/videos/${videoId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      }, 5000);
      if (!res.ok) continue;
      const data = await res.json();
      if (!data || !data.title) continue;

      const cleanTitle = (data.title || 'youtube_video').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

      if (mode === 'audio') {
        const audios = (data.adaptiveFormats || []).filter((f: any) => f.type?.startsWith('audio/') && f.url);
        if (audios.length > 0) {
          const bestAudio = audios[0];
          const ext = bestAudio.type?.includes('mp4') || bestAudio.container === 'm4a' ? 'm4a' : 'webm';
          return { downloadUrl: bestAudio.url, extension: ext, title: cleanTitle, thumbnail: data.videoThumbnails?.[0]?.url || '' };
        }
      } else {
        // Video mode
        const formatStreams = (data.formatStreams || []).filter((f: any) => f.url);
        if (formatStreams.length > 0) {
          const bestStream = formatStreams[0];
          return { downloadUrl: bestStream.url, extension: bestStream.container || 'mp4', title: cleanTitle, thumbnail: data.videoThumbnails?.[0]?.url || '' };
        }
        // Adaptive video fallback
        const videos = (data.adaptiveFormats || []).filter((f: any) => f.type?.startsWith('video/') && f.url);
        if (videos.length > 0) {
          return { downloadUrl: videos[0].url, extension: 'mp4', title: cleanTitle, thumbnail: data.videoThumbnails?.[0]?.url || '' };
        }
      }
    } catch (e) {
      // Continue to next instance
    }
  }
  throw new Error('Invidious instances unavailable');
}

// =========================================================================
// FALLBACKS DIRETOS (Cookies de Sessão e Assinaturas Criptográficas Locais)
// =========================================================================

async function fetchYoutubeDirectFallback(url: string, mode: string) {
  console.log('Using YouTube Direct Fallback (ytdl-core) with possible Cookies...');
  // Parse cookies from env (format expected by ytdl-core agent or raw string)
  let agent;
  try {
    if (process.env.YOUTUBE_COOKIES) {
      agent = ytdl.createAgent(JSON.parse(process.env.YOUTUBE_COOKIES));
    }
  } catch (e) {
    console.error('Invalid YOUTUBE_COOKIES format. Proceeding without cookies.');
  }

  const info = await ytdl.getInfo(url, { agent });
  const title = (info.videoDetails.title || 'youtube_video').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';
  
  return { useYtdl: true, info, agent, extension: mode === 'video' ? 'mp4' : 'm4a', title };
}


async function fetchLoaderToFallback(url: string, mode: string = 'video') {
  console.log('Using loader.to API fallback for YouTube...');
  
  let format = '720';
  if (mode === 'audio') {
    format = 'm4a'; // mp3 or m4a
  }

  const initialRes = await fetchWithTimeout(`https://loader.to/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}`, {}, 15000);
  const data = await initialRes.json();
  
  if (!data || !data.id) {
    throw new Error('Failed to initialize loader.to API download');
  }

  let downloadUrl = '';
  let title = data.title || 'youtube_media';
  let thumbnail = data.info?.image || '';
  
  // Poll for progress up to 25 times (50 seconds)
  for (let i = 0; i < 25; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const pRes = await fetchWithTimeout(`https://lto2.affadaffa.com/api/progress?id=${data.id}`, {}, 10000);
      const pData = await pRes.json();
      
      if (pData.success === 1 && pData.download_url) {
        downloadUrl = pData.download_url;
        break;
      } else if (pData.success === 0 && pData.text && pData.text.toLowerCase().includes('error')) {
        throw new Error(`loader.to polling error: ${pData.text}`);
      }
    } catch (e) {
      console.warn('Polling error, retrying...', e);
    }
  }

  if (!downloadUrl) {
    throw new Error('Timeout waiting for loader.to API to process the video');
  }

  return { 
    downloadUrl, 
    extension: mode === 'audio' ? format : 'mp4', 
    title, 
    thumbnail, 
    author: 'YouTube' 
  };
}

async function fetchYtdlpFallback(url: string, platform: string, mode: string = 'video'): Promise<any> {
  console.log(`Using yt-dlp fallback for ${platform}...`);
  const ytOptions: any = {
    dumpJson: true,
    noWarnings: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    format: mode === 'audio' ? 'bestaudio/best' : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
  };

  // Se existir um arquivo cookies.txt ou variável COOKIES_FILE
  const defaultCookiePath = path.resolve('./cookies.txt');
  const cookiesFile = process.env.COOKIES_FILE || (fs.existsSync(defaultCookiePath) ? defaultCookiePath : undefined);
  const cookieString = process.env[`${platform.toUpperCase()}_COOKIE`];

  let output;
  try {
    output = await youtubedl(url, ytOptions) as any;
  } catch (err) {
    console.warn(`yt-dlp sem cookies falhou para ${platform}, tentando com cookies (3ª opção)...`);
    
    if (cookiesFile) {
      ytOptions.cookies = cookiesFile;
    } else if (cookieString) {
      ytOptions.addHeader = ['Cookie: ' + cookieString];
    } else {
      throw err; // Re-throw se não houver cookies configurados
    }
    
    try {
      output = await youtubedl(url, ytOptions) as any;
    } catch (cookieErr: any) {
      throw new Error(`Erro no yt-dlp (com cookies): ${cookieErr.message || cookieErr.stderr || cookieErr}`);
    }
  }
  
  const videoUrl = output.requested_formats ? output.requested_formats[0].url : output.url;
  if (!videoUrl) throw new Error(`Não foi possível extrair a URL do vídeo de ${platform} via yt-dlp.`);
  
  const title = (output.title || output.description || `${platform}_media_fallback`).replace(/[^\w\s-]/gi, '').trim() || `${platform}_media`;
  const ext = output.ext || 'mp4';
  const thumbnail = output.thumbnail || '';
  const author = output.uploader || output.uploader_id || platform;
  
  return { downloadUrl: videoUrl, extension: ext, title, thumbnail, author };
}

async function fetchTikTokDirectFallback(url: string) {
  console.log('Using TikTok Direct Fallback with Session Cookie...');
  const cookie = process.env.TIKTOK_COOKIE;
  
  const res = await fetchWithTimeout(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Cookie': cookie || ''
    }
  }, 10000);
  
  const html = await res.text();
  // Busca pela playAddr injetada no script de estado (assinatura embutida pela plataforma)
  const match = html.match(/"playAddr":"([^"]+)"/);
  if (!match) throw new Error('Não foi possível decodificar a assinatura criptográfica do TikTok via scraper direto.');
  
  const videoUrl = match[1].replace(/\\u002F/g, '/');
  
  return { downloadUrl: videoUrl, extension: 'mp4', title: 'tiktok_media_fallback' };
}

async function startServer() {
  const app = express();
  app.use(cors());

  // API Endpoint: Pesquisar no YouTube
  app.get('/api/yt/search', async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) return res.status(400).send('Query obrigatória');

      // Method 1: Direct Scrape Fallback
      try {
        const scrapeRes = await fetchWithTimeout(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
          }
        }, 6000);
        const html = await scrapeRes.text();
        const dataMatch = html.match(/ytInitialData = (.*?);<\/script>/);
        if (dataMatch && dataMatch[1]) {
          const data = JSON.parse(dataMatch[1]);
          const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents;
          const videos = [];
          if (contents) {
            for (const item of contents) {
              const vid = item.videoRenderer;
              if (!vid) continue;

              const title = vid.title?.runs?.[0]?.text || 'Vídeo do YouTube';
              const thumbnail = vid.thumbnail?.thumbnails?.[0]?.url || '';
              const author = 
                vid.ownerText?.runs?.[0]?.text || 
                vid.shortBylineText?.runs?.[0]?.text || 
                'YouTube';
              const duration = 
                vid.lengthText?.simpleText || vid.lengthText?.runs?.[0]?.text || 'Vídeo';

              videos.push({
                id: vid.videoId,
                title,
                url: `https://www.youtube.com/watch?v=${vid.videoId}`,
                thumbnail,
                duration,
                author,
              });

              if (videos.length >= 10) break;
            }
          }
          if (videos.length > 0) {
            return res.json(videos);
          }
        }
      } catch (scrapeErr) {
        console.log('Direct scrape fallback error:', scrapeErr);
      }

      // Method 2: Fallback to yt-search library
      try {
        const r = await ytSearch(query);
        if (r && Array.isArray(r.videos) && r.videos.length > 0) {
          const videos = r.videos.slice(0, 10).map((v) => ({
            id: v.videoId || '',
            title: typeof v.title === 'string' ? v.title : 'Vídeo do YouTube',
            url: v.url || `https://www.youtube.com/watch?v=${v.videoId}`,
            thumbnail: v.thumbnail || v.image || '',
            duration: v.timestamp || 'Vídeo',
            author: v.author?.name || 'YouTube',
          }));
          return res.json(videos);
        }
      } catch (ytSearchErr: any) {
        console.log('yt-search fallback error:', ytSearchErr?.message);
      }

      return res.json([]);
    } catch (error: any) {
      console.log('YouTube Search Issue:', error.message);
      res.status(500).send(error.message || 'Erro ao pesquisar no YouTube');
    }
  });

  // API Endpoint: Obter Informações do Mídia (Título, Thumbnail, Autor)
  app.get('/api/yt/info', async (req, res) => {
    try {
      const url = req.query.url as string;
      if (!url) return res.status(400).json({ error: 'INVALID_URL', message: 'URL é obrigatória.' });

      const platform = detectPlatform(url);
      let title = 'Mídia Social';
      let thumbnail = '';
      let author = '';

      if (platform === 'youtube') {
        const videoId = extractVideoId(url);
        if (!videoId) return res.status(400).json({ error: 'INVALID_URL', message: 'URL do YouTube inválida.' });
        
        let infoSuccess = false;

        // 0. Try loader.to API
        try {
          const loaderInfo = await fetchLoaderToInfoFallback(url);
          if (loaderInfo.title) {
            title = loaderInfo.title;
            thumbnail = loaderInfo.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = loaderInfo.author;
            infoSuccess = true;
          }
        } catch (e) {}

        // 1. Try youtube-video-mp3-downloader-api
        if (!infoSuccess) {
          try {
            const ytApiData = await fetchYoutubeVideoMp3DownloaderApi(url, 'video');
            if (ytApiData.title) {
              title = ytApiData.title;
              thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              author = 'YouTube';
              infoSuccess = true;
            }
          } catch (e) {}
        }

        // 2. Try youtube-media-downloader
        if (!infoSuccess) {
          try {
            const data = await fetchYoutubeData(videoId);
            title = data.title || 'Vídeo do YouTube';
            thumbnail = data.thumbnails?.[0]?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = data.channel?.name || 'YouTube';
            infoSuccess = true;
          } catch (err) {}
        }

        // 3. Try youtube-mp3-2025
        if (!infoSuccess) {
          try {
            const yt2025 = await fetchYoutubeMp32025(videoId, 'video');
            if (yt2025.title) {
              title = yt2025.title;
              thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              author = 'YouTube';
              infoSuccess = true;
            }
          } catch (e) {}
        }

        // 4. Try All-In-One
        if (!infoSuccess) {
          try {
            const aio = await fetchAllInOneData(url);
            title = aio.title || aio.caption || 'Vídeo do YouTube';
            thumbnail = aio.thumbnail || aio.cover || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = aio.author || 'YouTube';
            infoSuccess = true;
          } catch (e) {}
        }

        // 5. Try Invidious
        if (!infoSuccess) {
          try {
            const inv = await fetchInvidiousFallback(videoId, 'video');
            title = inv.title;
            thumbnail = inv.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = 'YouTube';
            infoSuccess = true;
          } catch (e) {}
        }

        // 6. Fallback to youtubedl
        if (!infoSuccess) {
          try {
            const output: any = await fetchYtdlpFallback(url, platform, 'video');
            title = output.title;
            thumbnail = output.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = output.author;
          } catch (err) {
            // Default fallback with videoId thumbnail
            title = 'Vídeo do YouTube';
            thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            author = 'YouTube';
          }
        }
      }
      else if (platform === 'tiktok') {
        try {
          const data = await fetchTikTokData(url);
          title = data.title || 'TikTok Video';
          thumbnail = data.origin_cover || data.cover || '';
          author = data.author?.nickname || 'TikTok Creator';
        } catch {
          const aio = await fetchAllInOneData(url);
          title = aio.title || aio.caption || 'TikTok Video';
          thumbnail = aio.thumbnail || aio.cover || '';
          author = aio.author || 'TikTok Creator';
        }
      }
      else if (platform === 'facebook') {
        try {
          const data = await fetchFacebookData(url);
          title = data.title || 'Vídeo do Facebook';
          thumbnail = data.thumbnail || '';
          author = 'Facebook';
        } catch {
          try {
            const aio = await fetchAllInOneData(url);
            title = aio.title || 'Vídeo do Facebook';
            thumbnail = aio.thumbnail || '';
            author = 'Facebook';
          } catch (err) {
            console.warn('Facebook info RapidAPI failed, trying youtubedl fallback...', err);
            const output: any = await fetchYtdlpFallback(url, platform, 'video');
            title = output.title;
            thumbnail = output.thumbnail;
            author = output.author;
          }
        }
      }
      else if (platform === 'instagram') {
        try {
          const aio = await fetchAllInOneData(url);
          title = aio.title || aio.caption || 'Instagram Reel / Post';
          thumbnail = aio.thumbnail || aio.cover || '';
          author = aio.author || aio.username || 'Instagram';
        } catch {
          try {
            const data = await fetchInstagramReelsData(url);
            title = data.title || data.caption || 'Instagram Reel';
            thumbnail = data.thumbnail_url || data.thumbnail || '';
            author = data.owner_username || 'Instagram';
          } catch (err) {
            console.warn('Instagram info RapidAPI failed, trying youtubedl fallback...', err);
            const output: any = await fetchYtdlpFallback(url, platform, 'video');
            title = output.title;
            thumbnail = output.thumbnail;
            author = output.author;
          }
        }
      }
      else {
        // Twitter, Pinterest, Reddit, SoundCloud, Spotify, CapCut, etc.
        const aio = await fetchAllInOneData(url);
        title = aio.title || aio.caption || `${platform.toUpperCase()} Mídia`;
        thumbnail = aio.thumbnail || aio.cover || '';
        author = aio.author || platform;
      }

      res.json({ title, thumbnail, author, platform });
    } catch (error: any) {
      console.log('Media Info Issue:', error.message);
      res.status(500).json({ error: 'FETCH_ERROR', message: error.message || 'Erro ao obter informações da mídia.' });
    }
  });

  // API Endpoint: Extrair e transmitir áudio ou vídeo
  app.get('/api/yt/download', async (req, res) => {
    try {
      const url = req.query.url as string;
      const mode = (req.query.mode as string) || 'audio';
      if (!url) return res.status(400).json({ error: 'INVALID_URL', message: 'URL é obrigatória.' });

      const platform = detectPlatform(url);
      let downloadUrl = '';
      let extension = 'mp4';
      let title = 'media';

      if (platform === 'youtube') {
        const videoId = extractVideoId(url);
        if (!videoId) return res.status(400).json({ error: 'INVALID_URL', message: 'URL do YouTube inválida.' });

        let ytSuccess = false;

        // Tier 0: loader.to API (Open Unauthenticated High-Quality Mirror)
        try {
          const res0 = await fetchLoaderToFallback(url, mode);
          if (res0.downloadUrl) {
            downloadUrl = res0.downloadUrl;
            extension = res0.extension;
            title = res0.title;
            ytSuccess = true;
          }
        } catch (e) {
          console.warn('YouTube Tier 0 (loader.to) failed, trying Tier 1...', e);
        }

        // Tier 1: YouTube Video & MP3 Downloader API (youtube-video-mp3-downloader-api)
        if (!ytSuccess) {
          try {
            const res1 = await fetchYoutubeVideoMp3DownloaderApi(url, mode);
            if (res1.downloadUrl) {
              downloadUrl = res1.downloadUrl;
              extension = res1.extension;
              title = res1.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 1 (youtube-video-mp3-downloader-api) failed, trying Tier 2...');
          }
        }

        // Tier 2: YouTube to MP3 2025 API (youtube-mp3-2025)
        if (!ytSuccess) {
          try {
            const res2 = await fetchYoutubeMp32025(videoId, mode);
            if (res2.downloadUrl) {
              downloadUrl = res2.downloadUrl;
              extension = res2.extension;
              title = res2.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 2 (youtube-mp3-2025) failed, trying Tier 3...');
          }
        }

        // Tier 3: YouTube Quick Video Downloader (youtube-quick-video-downloader)
        if (!ytSuccess) {
          try {
            const res3 = await fetchYoutubeQuickVideoDownloader(url, mode);
            if (res3.downloadUrl) {
              downloadUrl = res3.downloadUrl;
              extension = res3.extension;
              title = res3.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 3 (youtube-quick-video-downloader) failed, trying Tier 4...');
          }
        }

        // Tier 4 (Plano E): Local yt-dlp binary with Cookies and Anti-Bot bypass
        if (!ytSuccess) {
          try {
            console.log('Tentando Plano E: yt-dlp local com cookies.txt...');
            const fallbackData: any = await fetchYtdlpFallback(url, platform, mode);
            if (fallbackData.downloadUrl) {
              downloadUrl = fallbackData.downloadUrl;
              extension = fallbackData.extension;
              title = fallbackData.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 4 (yt-dlp with cookies) failed, trying Tier 5...');
          }
        }

        // Tier 5: YouTube Audio Video Download (youtube-audio-video-download)
        if (!ytSuccess) {
          try {
            const res4 = await fetchYoutubeAudioVideoDownload(url, mode);
            if (res4.downloadUrl) {
              downloadUrl = res4.downloadUrl;
              extension = res4.extension;
              title = res4.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 5 (youtube-audio-video-download) failed, trying Tier 6...');
          }
        }

        // Tier 5: YouTube Video Stream Download (youtube-video-stream-download)
        if (!ytSuccess) {
          try {
            const res5 = await fetchYoutubeVideoStreamDownload(videoId, mode);
            if (res5.downloadUrl) {
              downloadUrl = res5.downloadUrl;
              extension = res5.extension;
              title = res5.title;
              ytSuccess = true;
            }
          } catch (e) {
            console.warn('YouTube Tier 5 (youtube-video-stream-download) failed, trying Tier 6...');
          }
        }

        // Tier 6: Dedicated YouTube Media Downloader (youtube-media-downloader)
        if (!ytSuccess) {
          try {
            const data = await fetchYoutubeData(videoId);
            title = (data.title || 'youtube_video').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';
            if (mode === 'video') {
              const videos = data.videos?.items || [];
              const videoWithAudio = videos.filter((v: any) => v.hasAudio === true).sort((a: any, b: any) => b.height - a.height);
              if (videoWithAudio.length > 0) {
                downloadUrl = videoWithAudio[0].url;
                extension = videoWithAudio[0].extension || 'mp4';
              } else if (videos.length > 0) {
                downloadUrl = videos[0].url;
                extension = videos[0].extension || 'mp4';
              }
            } else {
              const audios = data.audios?.items || [];
              if (audios.length > 0) {
                downloadUrl = audios[0].url;
                extension = audios[0].extension || 'm4a';
              }
            }
            if (downloadUrl) ytSuccess = true;
          } catch (e) {
            console.warn('YouTube Tier 6 (youtube-media-downloader) failed, trying Tier 7 (All-In-One)...');
          }
        }

        // Tier 7: All-in-One Social Downloader RapidAPI
        if (!ytSuccess) {
          try {
            const aio = await fetchAllInOneData(url);
            title = (aio.title || 'youtube_video').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';
            downloadUrl = mode === 'audio' 
              ? (aio.audio || aio.music || aio.url || aio.medias?.find((m: any) => m.type === 'audio')?.url)
              : (aio.video || aio.url || aio.medias?.find((m: any) => m.type === 'video')?.url || aio.medias?.[0]?.url);
            extension = mode === 'audio' ? 'mp3' : 'mp4';
            if (downloadUrl) ytSuccess = true;
          } catch (e) {
            console.warn('YouTube Tier 7 failed, trying Tier 8 (Invidious Network)...');
          }
        }

        // Tier 8: Invidious Open Source High-Speed Mirror Network
        if (!ytSuccess) {
          try {
            const invData = await fetchInvidiousFallback(videoId, mode);
            downloadUrl = invData.downloadUrl;
            extension = invData.extension;
            title = invData.title;
            if (downloadUrl) ytSuccess = true;
          } catch (e) {
            console.warn('YouTube Tier 8 failed, trying Tier 9 (yt-dlp engine)...');
          }
        }

        // Tier 9: Local yt-dlp binary with Cookies and Anti-Bot bypass
        if (!ytSuccess) {
          try {
            const fallbackData: any = await fetchYtdlpFallback(url, platform, mode);
            downloadUrl = fallbackData.downloadUrl;
            extension = fallbackData.extension;
            title = fallbackData.title;
          } catch (err: any) {
            console.error('All YouTube extraction layers exhausted:', err.message);
            const isBotBlock = (err.message || '').includes('Sign in to confirm you') || (err.message || '').includes('bot');
            if (isBotBlock) {
              return res.status(429).json({
                error: 'RATE_LIMIT_429',
                code: 429,
                message: 'O YouTube bloqueou temporariamente a requisição em nuvem por proteção Anti-Bot (Sign in to confirm you are not a bot). Forneça cookies válidos ou use links do TikTok, Instagram, Facebook ou Vimeo.'
              });
            }
            throw err;
          }
        }
      }
      else if (platform === 'tiktok') {
        try {
          const data = await fetchTikTokData(url);
          title = (data.title || 'tiktok_video').replace(/[^\w\s-]/gi, '').trim() || 'tiktok_media';
          if (mode === 'video') {
            downloadUrl = data.play || data.wmplay;
            extension = 'mp4';
          } else {
            downloadUrl = data.music || data.music_info?.play || data.play;
            extension = data.music ? 'mp3' : 'mp4';
          }
          if (!downloadUrl) throw new Error('No url');
        } catch {
          try {
            const aio = await fetchAllInOneData(url);
            title = (aio.title || 'tiktok').replace(/[^\w\s-]/gi, '').trim() || 'tiktok_media';
            downloadUrl = (mode === 'audio' ? (aio.audio || aio.music || aio.url) : (aio.video || aio.url || aio.medias?.[0]?.url));
            extension = mode === 'audio' ? 'mp3' : 'mp4';
            if (!downloadUrl) throw new Error('No url');
          } catch (err) {
            console.warn('TikTok RapidAPI failed, trying direct fallback...', err);
            const fallbackData = await fetchTikTokDirectFallback(url);
            downloadUrl = fallbackData.downloadUrl;
            extension = fallbackData.extension;
            title = fallbackData.title;
          }
        }
      }
      else if (platform === 'facebook') {
        try {
          const data = await fetchFacebookData(url);
          title = (data.title || 'facebook_video').replace(/[^\w\s-]/gi, '').trim() || 'facebook_media';
          if (mode === 'video') {
            downloadUrl = data.hd || data.sd;
            extension = 'mp4';
          } else {
            downloadUrl = data.audio_url || data.music || data.sd || data.hd;
            extension = data.audio_url || data.music ? 'mp4' : 'mp4';
          }
          if (!downloadUrl) throw new Error('No url');
        } catch {
          try {
            const aio = await fetchAllInOneData(url);
            title = (aio.title || 'facebook_video').replace(/[^\w\s-]/gi, '').trim() || 'facebook_media';
            downloadUrl = (mode === 'audio' ? (aio.audio || aio.url) : (aio.hd || aio.sd || aio.video || aio.url));
            extension = 'mp4';
            if (!downloadUrl) throw new Error('No url');
          } catch (err) {
            console.warn('Facebook RapidAPI failed, trying youtdlp fallback...', err);
            const fallbackData: any = await fetchYtdlpFallback(url, platform, mode);
            downloadUrl = fallbackData.downloadUrl;
            extension = fallbackData.extension;
            title = fallbackData.title;
          }
        }
      }
      else if (platform === 'vimeo') {
        try {
          const data = await fetchVimeoData(url);
          title = (data.title || 'vimeo_video').replace(/[^\w\s-]/gi, '').trim() || 'vimeo_media';
          const downloadLinks = data.download || data.files || data.links || [];
          if (Array.isArray(downloadLinks) && downloadLinks.length > 0) {
            downloadUrl = downloadLinks[0].url || downloadLinks[0].link || downloadLinks[0];
          } else if (typeof data.url === 'string') {
            downloadUrl = data.url;
          }
          extension = 'mp4';
          if (!downloadUrl) throw new Error('No url from RapidAPI');
        } catch {
          try {
            const aio = await fetchAllInOneData(url);
            title = (aio.title || 'vimeo_video').replace(/[^\w\s-]/gi, '').trim() || 'vimeo_media';
            downloadUrl = aio.video || aio.url || aio.medias?.[0]?.url;
            extension = 'mp4';
            if (!downloadUrl) throw new Error('No url from RapidAPI AllInOne');
          } catch (err) {
            console.warn('Vimeo API failed, trying yt-dlp fallback...', err);
            const fallbackData: any = await fetchYtdlpFallback(url, platform, mode);
            downloadUrl = fallbackData.downloadUrl;
            extension = fallbackData.extension;
            title = fallbackData.title;
          }
        }
      }
      else if (platform === 'instagram') {
        try {
          const aio = await fetchAllInOneData(url);
          title = (aio.title || aio.caption || 'instagram_media').replace(/[^\w\s-]/gi, '').trim() || 'instagram_media';
          downloadUrl = (mode === 'audio' ? (aio.audio || aio.music || aio.url) : (aio.video || aio.url || aio.medias?.[0]?.url));
          extension = mode === 'audio' && aio.audio ? 'mp3' : 'mp4';
          if (!downloadUrl) throw new Error('No url');
        } catch {
          try {
            const data = await fetchInstagramReelsData(url);
            title = (data.title || data.caption || 'instagram_reel').replace(/[^\w\s-]/gi, '').trim() || 'instagram_media';
            downloadUrl = data.video_url || data.videoUrl || data.url;
            extension = 'mp4';
            if (!downloadUrl) throw new Error('No url');
          } catch (err) {
            console.warn('Instagram RapidAPI failed, trying direct fallback...', err);
            const fallbackData = await fetchYtdlpFallback(url, platform, mode);
            downloadUrl = fallbackData.downloadUrl;
            extension = fallbackData.extension;
            title = fallbackData.title;
          }
        }
      }
      else {
        // General all-in-one platforms (Twitter, Pinterest, Reddit, SoundCloud, Spotify, CapCut, etc.)
        const aio = await fetchAllInOneData(url);
        title = (aio.title || `${platform}_media`).replace(/[^\w\s-]/gi, '').trim() || 'social_media';
        if (mode === 'audio') {
          downloadUrl = aio.audio || aio.music || aio.url || aio.medias?.[0]?.url;
          extension = aio.audio ? 'mp3' : 'mp4';
        } else {
          downloadUrl = aio.video || aio.hd || aio.sd || aio.url || aio.medias?.[0]?.url;
          extension = 'mp4';
        }
      }

      if (!downloadUrl) {
        return res.status(404).json({ error: 'NO_FORMATS', message: 'Nenhum link de download direto foi retornado para esta mídia.' });
      }

      // Stream the media back to client with automatic retry (up to 2 retries on 500/502)
      let streamRes: Response | null = null;
      let streamError: any = null;

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const reqHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Range': 'bytes=0-'
          };
          if (downloadUrl.includes('googlevideo.com') || downloadUrl.includes('youtube.com')) {
            reqHeaders['Referer'] = 'https://www.youtube.com/';
            reqHeaders['Origin'] = 'https://www.youtube.com';
          }

          const resAttempt = await fetchWithTimeout(downloadUrl, {
            headers: reqHeaders
          }, 30000);

          if (resAttempt.ok || resAttempt.status === 206) {
            streamRes = resAttempt;
            break;
          }

          if (resAttempt.status === 403 && (downloadUrl.includes('googlevideo.com') || downloadUrl.includes('youtube.com'))) {
            return res.status(429).json({
              error: 'RATE_LIMIT_429',
              code: 429,
              message: 'O link de transmissão do YouTube expirou ou foi restringido pelo Google Anti-Bot. Utilize links diretos de outras redes (TikTok, Instagram, Facebook, Vimeo) ou configure cookies no servidor.'
            });
          }

          if (attempt <= 2 && (resAttempt.status === 500 || resAttempt.status === 502 || resAttempt.status === 503 || resAttempt.status === 504)) {
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.warn(`Upstream returned ${resAttempt.status}. Retrying in ${delay}ms (attempt ${attempt}/3)...`);
            await new Promise((r) => setTimeout(r, delay));
            continue;
          }

          streamRes = resAttempt;
          break;
        } catch (err: any) {
          streamError = err;
          if (attempt <= 2) {
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.warn(`Upstream stream connection error. Retrying in ${delay}ms (attempt ${attempt}/3)...`, err.message);
            await new Promise((r) => setTimeout(r, delay));
          }
        }
      }

      if (!streamRes || (!streamRes.ok && streamRes.status !== 206)) {
        return res.status(502).json({ 
          error: 'STREAM_ERROR', 
          message: streamError?.message || 'Não foi possível se conectar aos servidores de mídia do provedor após múltiplas tentativas.' 
        });
      }

      res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.${extension}"`);
      res.header('Content-Type', streamRes.headers.get('content-type') || (extension === 'mp3' ? 'audio/mpeg' : 'video/mp4'));

      if (streamRes.body) {
        const nodeStream = Readable.fromWeb(streamRes.body as any);
        nodeStream.pipe(res);
      } else {
        res.status(500).end();
      }

    } catch (error: any) {
      console.log('Media Download Issue:', error.message);
      res.status(500).json({
        error: 'FETCH_ERROR',
        code: 500,
        message: error.message || 'Erro ao processar o download da mídia.'
      });
    }
  });

  // Server-Side High-Speed FFmpeg Converter for Large Files
  const upload = multer({
    dest: path.join(os.tmpdir(), 'audiomorph_uploads'),
    limits: { fileSize: 1024 * 1024 * 1024 } // 1GB limit
  });

  app.post('/api/convert-server', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de mídia enviado para conversão.' });
    }

    const inputPath = req.file.path;
    const format = (req.body.format || 'mp4').toLowerCase();
    const videoQuality = req.body.videoQuality || 'medium';
    const bitrate = req.body.bitrate || '192';
    const isVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(format);

    const safeId = Math.random().toString(36).substring(2, 8);
    const outputFilename = `converted_${Date.now()}_${safeId}.${format}`;
    const outputPath = path.join(os.tmpdir(), outputFilename);

    const args: string[] = ['-y', '-i', inputPath];

    if (isVideo) {
      const preset = videoQuality === 'high' ? 'slow' : videoQuality === 'low' ? 'ultrafast' : 'medium';
      const crf = videoQuality === 'high' ? '18' : videoQuality === 'low' ? '28' : '23';

      const vFilters: string[] = [];
      if (req.body.cropW && req.body.cropH) {
        const cW = Math.max(2, Math.floor(Number(req.body.cropW) / 2) * 2);
        const cH = Math.max(2, Math.floor(Number(req.body.cropH) / 2) * 2);
        const cX = Math.max(0, Math.floor(Number(req.body.cropX) || 0));
        const cY = Math.max(0, Math.floor(Number(req.body.cropY) || 0));
        vFilters.push(`crop=${cW}:${cH}:${cX}:${cY}`);
      }

      switch (format) {
        case 'webm':
          if (vFilters.length > 0) args.push('-vf', vFilters.join(','));
          args.push('-c:v', 'libvpx-vp9', '-crf', crf, '-b:v', '0', '-c:a', 'libopus');
          break;
        case 'mp4':
        case 'mkv':
        case 'mov':
          if (vFilters.length > 0) args.push('-vf', vFilters.join(','));
          args.push('-c:v', 'libx264', '-preset', preset, '-crf', crf, '-c:a', 'aac', '-b:a', '128k', '-pix_fmt', 'yuv420p');
          break;
        case 'avi':
          if (vFilters.length > 0) args.push('-vf', vFilters.join(','));
          args.push('-c:v', 'mpeg4', '-q:v', '5', '-c:a', 'libmp3lame');
          break;
        default:
          if (vFilters.length > 0) {
            args.push('-vf', vFilters.join(','), '-c:v', 'libx264', '-preset', preset, '-c:a', 'copy');
          } else {
            args.push('-c:v', 'copy', '-c:a', 'copy');
          }
      }
    } else {
      // Audio conversion
      if (req.body.title) args.push('-metadata', `title=${req.body.title}`);
      if (req.body.artist) args.push('-metadata', `artist=${req.body.artist}`);
      if (req.body.album) args.push('-metadata', `album=${req.body.album}`);
      if (req.body.genre) args.push('-metadata', `genre=${req.body.genre}`);

      switch (format) {
        case 'mp3':
          args.push('-vn', '-c:a', 'libmp3lame', '-b:a', `${bitrate}k`);
          break;
        case 'wav':
          args.push('-vn', '-c:a', 'pcm_s16le');
          break;
        case 'aac':
        case 'm4a':
          args.push('-vn', '-c:a', 'aac', '-b:a', `${bitrate}k`);
          break;
        case 'flac':
          args.push('-vn', '-c:a', 'flac');
          break;
        case 'ogg':
          args.push('-vn', '-c:a', 'libvorbis', '-b:a', `${bitrate}k`);
          break;
        case 'wma':
          args.push('-vn', '-c:a', 'wmav2', '-b:a', `${bitrate}k`);
          break;
        case 'aiff':
          args.push('-vn', '-c:a', 'pcm_s16be');
          break;
        default:
          args.push('-vn', '-b:a', `${bitrate}k`);
      }
    }

    args.push(outputPath);

    const cleanup = () => {
      try {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      } catch {}
      try {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      } catch {}
    };

    try {
      const ffmpegProc = spawn('ffmpeg', args);

      ffmpegProc.on('error', (err) => {
        console.error('Erro ao executar FFmpeg no servidor:', err);
        cleanup();
        if (!res.headersSent) {
          res.status(500).json({ error: 'FFmpeg não está disponível no servidor de hospedagem.' });
        }
      });

      ffmpegProc.on('close', (code) => {
        if (code !== 0) {
          cleanup();
          if (!res.headersSent) {
            return res.status(500).json({ error: `Conversão no servidor falhou com código ${code}.` });
          }
          return;
        }

        let mimeType = 'application/octet-stream';
        if (isVideo) {
          mimeType = format === 'mkv' ? 'video/x-matroska' : `video/${format}`;
        } else {
          if (format === 'mp3') mimeType = 'audio/mpeg';
          else if (format === 'wav') mimeType = 'audio/wav';
          else if (format === 'aac') mimeType = 'audio/aac';
          else if (format === 'ogg') mimeType = 'audio/ogg';
          else if (format === 'flac') mimeType = 'audio/flac';
        }

        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${outputFilename}"`);

        const readStream = fs.createReadStream(outputPath);
        readStream.pipe(res);

        readStream.on('end', () => {
          cleanup();
        });

        readStream.on('error', (err) => {
          console.error('Erro ao transmitir arquivo convertido:', err);
          cleanup();
        });
      });
    } catch (err: any) {
      cleanup();
      console.error('Erro fatal na conversão server-side:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || 'Erro interno na conversão do arquivo.' });
      }
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    
    // Rota que captura todas as requisições para injetar o Adcash
    app.use('*', async (req, res) => {
      const distPath = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distPath, 'index.html');
      let html = fs.readFileSync(indexPath, 'utf8');

      // Busca o código da biblioteca com cache
      const libCode = await getAdcashLibrary();

      // 1. Injeta a biblioteca no <head>
      html = html.replace('</head>', `${libCode}</head>`);
      
      // 2. Injeta o script de execução do ad format antes do </body>
      const runScript = `
        <script type="text/javascript">
          aclib.runAutoTag({
            zoneId: '5njba8kjlq',
          });
        </script>
      `;
      html = html.replace('</body>', `${runScript}</body>`);

      res.send(html);
    });
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server de Down&Convert foi iniciado em... http://localhost:${port}`);
  });
}

startServer();
