import { GoogleGenAI } from '@google/genai';
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

      // Forçar o formato mp3 para áudio e mp4 para vídeo
      if (mode === 'audio') {
        extension = 'mp3';
      } else {
        extension = 'mp4';
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

  

  // =========================================================================
  // TRANSCRIÇÃO DE ÁUDIO/VÍDEO (GEMINI)
  // =========================================================================
  app.post('/api/transcribe', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const { mode, apiKey } = req.body;
    const inputPath = req.file.path;
    const mimeType = req.file.mimetype;

    try {
      // Lê o arquivo do disco para enviar ao Gemini
      const fileBuffer = fs.readFileSync(inputPath);
      const base64Audio = fileBuffer.toString('base64');
      
      let ai;
      if (mode === 'slow' && apiKey) {
        // Usa a chave do usuário se fornecida no modo lento
        ai = new GoogleGenAI({ 
            apiKey: apiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });
      } else {
        // Usa a chave do servidor no modo rápido ou se a chave não foi fornecida
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Chave do servidor não configurada.' });
        }
        ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });
      }

      const modelToUse = mode === 'slow' ? 'gemini-3.5-transcribe' : 'gemini-3.8-flash';
      
      const audioPart = {
        inlineData: {
          mimeType: mimeType || 'audio/ogg',
          data: base64Audio,
        },
      };

      const response = await ai.models.generateContent({
        model: modelToUse,
        contents: { parts: [audioPart, { text: "Transcreva o conteúdo deste áudio. Mantenha o idioma original. Não faça resumo, apenas a transcrição literal." }] },
      });

      fs.unlink(inputPath, () => {}); // Limpa o arquivo temp

      res.json({ success: true, text: response.text });
    } catch (err: any) {
      console.error('Erro na transcrição:', err);
      if (fs.existsSync(inputPath)) fs.unlink(inputPath, () => {});
      res.status(500).json({ error: err.message || 'Erro ao processar a transcrição.' });
    }
  });

app.post('/api/convert-server', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de mídia enviado para conversão.' });
    }

    const inputPath = req.file.path;
    const format = (req.body.format || 'mp4').toLowerCase();
    const videoQuality = req.body.videoQuality || 'medium';
    const bitrate = req.body.bitrate || '192';
    const isVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov', 'gif'].includes(format);

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
        
        if (req.body.cropShape === 'circle') {
          // Add a circular mask using geq filter. This will make pixels outside the circle black.
          // Formula: (x - w/2)^2 + (y - h/2)^2 <= (min(w,h)/2)^2
          vFilters.push(`geq=lum='if(lt((X-(W/2))^2+(Y-(H/2))^2,(min(W,H)/2)^2),p(X,Y),0)':cb='if(lt((X-(W/2))^2+(Y-(H/2))^2,(min(W,H)/2)^2),p(X,Y),128)':cr='if(lt((X-(W/2))^2+(Y-(H/2))^2,(min(W,H)/2)^2),p(X,Y),128)'`);
        }
      }

      if (videoQuality === 'very_low') {
        vFilters.push("scale='min(480,iw)':-2");
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

  // =========================================================================
  // ADCASH MONETIZATION & ADVERTISING INTEGRATION MODULE
  // =========================================================================

  // Configuração padrão do AdCash (Popunder, Interstitial, Banners e Autotag)
  let adCashConfig = {
    enabled: true,
    zoneId: process.env.ADCASH_ZONE_ID || '7528341', // ID de Zona padrão AdCash
    siteId: process.env.ADCASH_SITE_ID || '104829',
    popunderZoneId: process.env.ADCASH_POPUNDER_ZONE || '7528342',
    interstitialZoneId: process.env.ADCASH_INTERSTITIAL_ZONE || '7528343',
    bannerZoneId: process.env.ADCASH_BANNER_ZONE || '7528344',
    nativeZoneId: process.env.ADCASH_NATIVE_ZONE || '7528345',
    scriptCdnUrl: 'https://acscdn.com/script/aclib.js',
    autotagUrl: '//whosauwha.net/tag.min.js',
    frequencyCappingHours: 1, // Exibição a cada 1 hora por usuário
    testMode: false
  };

  // Endpoint: Obter configurações ativas do AdCash
  app.get('/api/ads/adcash', (req, res) => {
    res.json({
      success: true,
      provider: 'AdCash',
      config: adCashConfig,
      tags: {
        headerScript: `<script type="text/javascript" src="${adCashConfig.scriptCdnUrl}"></script>`,
        popunderTag: `aclib.runPop({ zoneId: '${adCashConfig.popunderZoneId}' });`,
        interstitialTag: `aclib.runInterstitial({ zoneId: '${adCashConfig.interstitialZoneId}' });`,
        bannerTag: `aclib.runBanner({ zoneId: '${adCashConfig.bannerZoneId}' });`,
        autotagScript: `<script type="text/javascript" src="${adCashConfig.autotagUrl}" data-zone="${adCashConfig.zoneId}" async></script>`
      }
    });
  });

  // Endpoint: Atualizar configurações ou Zonas do AdCash dinamicamente
  app.post('/api/ads/adcash/config', express.json(), (req, res) => {
    try {
      const { zoneId, popunderZoneId, interstitialZoneId, bannerZoneId, nativeZoneId, enabled, scriptCdnUrl, autotagUrl } = req.body;
      
      adCashConfig = {
        ...adCashConfig,
        ...(zoneId && { zoneId: String(zoneId) }),
        ...(popunderZoneId && { popunderZoneId: String(popunderZoneId) }),
        ...(interstitialZoneId && { interstitialZoneId: String(interstitialZoneId) }),
        ...(bannerZoneId && { bannerZoneId: String(bannerZoneId) }),
        ...(nativeZoneId && { nativeZoneId: String(nativeZoneId) }),
        ...(typeof enabled === 'boolean' && { enabled }),
        ...(scriptCdnUrl && { scriptCdnUrl: String(scriptCdnUrl) }),
        ...(autotagUrl && { autotagUrl: String(autotagUrl) })
      };

      res.json({
        success: true,
        message: 'Configurações do AdCash atualizadas com sucesso!',
        config: adCashConfig
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erro ao atualizar configurações do AdCash' });
    }
  });

  // Endpoint: Proxy do Script SDK do AdCash (aclib.js) para contornar bloqueadores e garantir entrega
  app.get('/api/ads/adcash/script', async (req, res) => {
    try {
      const scriptUrl = req.query.url as string || adCashConfig.scriptCdnUrl;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(scriptUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Retorna fallback funcional do stub do aclib
        res.setHeader('Content-Type', 'application/javascript');
        return res.send(`
          window.aclib = window.aclib || {
            runPop: function(opts) { console.log('[AdCash Stub] runPop:', opts); },
            runInterstitial: function(opts) { console.log('[AdCash Stub] runInterstitial:', opts); },
            runBanner: function(opts) { console.log('[AdCash Stub] runBanner:', opts); },
            runInPagePush: function(opts) { console.log('[AdCash Stub] runInPagePush:', opts); }
          };
        `);
      }

      const scriptContent = await response.text();
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(scriptContent);
    } catch (err: any) {
      // Fallback em caso de timeout
      res.setHeader('Content-Type', 'application/javascript');
      res.send(`
        window.aclib = window.aclib || {
          runPop: function(opts) { console.log('[AdCash] runPop standby'); },
          runInterstitial: function(opts) { console.log('[AdCash] runInterstitial standby'); },
          runBanner: function(opts) { console.log('[AdCash] runBanner standby'); }
        };
      `);
    }
  });

  // Endpoint: Telemetria de Eventos do AdCash (Impressões, Cliques e Conversões)
  app.post('/api/ads/adcash/event', express.json(), (req, res) => {
    const { eventType, zoneId, timestamp, meta } = req.body;
    console.log(`[AdCash Event] ${eventType || 'impression'} - Zone: ${zoneId || adCashConfig.zoneId} at ${timestamp || new Date().toISOString()}`, meta || '');
    res.json({ status: 'ok', received: true });
  });

  // =========================================================================
  // RSS & FEED IMPORTER COM VERIFICADOR AUTOMÁTICO DE ERRO 404 E LINKS VÁLIDOS
  // =========================================================================

  // Helper para testar se uma URL retorna status HTTP 200 (não é 404, 410, ou erro)
  async function checkUrlAlive(url: string, timeoutMs = 6000): Promise<{ ok: boolean; status: number; message?: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const res = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: controller.signal
      }).catch(async () => {
        // Se HEAD falhar ou for bloqueado por alguns servidores, tenta GET com range
        return await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Range': 'bytes=0-2048'
          },
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);

      if (!res) return { ok: false, status: 0, message: 'Falha de conexão com o servidor' };
      
      const is404 = res.status === 404 || res.status === 410;
      const isOk = (res.status >= 200 && res.status < 400);

      return {
        ok: isOk && !is404,
        status: res.status,
        message: is404 ? 'Link Quebrado (Erro 404 / Não Encontrado)' : isOk ? 'Link Ativo (HTTP 200 OK)' : `Status HTTP ${res.status}`
      };
    } catch (err: any) {
      return { ok: false, status: 0, message: err.message || 'Erro de conexão/timeout' };
    }
  }

  // Endpoint: Verificar integridade de um link individual ou múltiplos links contra erro 404
  app.post('/api/news/check-links', express.json(), async (req, res) => {
    try {
      const { links } = req.body;
      if (!Array.isArray(links)) {
        return res.status(400).json({ error: 'Array de links esperado.' });
      }

      const results: Record<string, { ok: boolean; status: number; message?: string }> = {};
      
      // Processa com concorrência controlada para evitar sobrecarga
      await Promise.all(
        links.slice(0, 50).map(async (url: string) => {
          if (!url || typeof url !== 'string') return;
          const status = await checkUrlAlive(url.trim());
          results[url] = status;
        })
      );

      res.json({ results });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erro ao checar links.' });
    }
  });

  // Helper para decodificar entidades XML / HTML básicas
  function cleanXmlText(str: string): string {
    return str
      .replace(/<!\[CDATA\[(.*?)\]\]>/gis, '$1')
      .replace(/<[^>]+>/g, '') // remove tags HTML
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .trim();
  }

  // Função auxiliar para identificar e filtrar notícias que possuem a palavra "jogo", "jogos", "game", "games" ou termos correlatos
  function containsGameOrExcludedContent(title: string, lead?: string, category?: string, link?: string): boolean {
    const cleanLink = (link || '').split('?')[0].replace(/[-_./]/g, ' ');
    const combined = `${title || ''} ${lead || ''} ${category || ''} ${cleanLink}`.toLowerCase();

    // Filtro estrito: palavra "jogo", "jogos", "game", "games" e termos correlatos
    const gamePattern = /\b(jogos?|games?|gamer|gamers|gaming|gameplay|jogabilidade|jogador|jogadores|videogames?|video\s+games?)\b/i;
    if (gamePattern.test(combined)) {
      return true;
    }

    // Franquias, plataformas de games ou mídias não pertinentes (trailers, filmes)
    const otherPattern = /\b(trailer|trailers|filme|filmes|playstation|ps5|ps4|ps3|ps2|xbox|nintendo|switch|pokemon|pokémon|gta|elden ring|god of war|voxel)\b/i;
    if (otherPattern.test(combined)) {
      return true;
    }

    return false;
  }

  // Parseador de RSS XML básico e robusto
  function parseRssFeed(xmlText: string, defaultAuthor: string) {
    const items: Array<{
      title: string;
      link: string;
      pubDate: string;
      lead: string;
      author: string;
      category: string;
    }> = [];

    // Suporta tanto <item> (RSS 2.0) quanto <entry> (Atom)
    const itemRegex = /<(?:item|entry)[\s>](.*?)<\/(?:item|entry)>/gis;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const block = match[1];

      // Título
      const titleMatch = block.match(/<title[^>]*>(.*?)<\/title>/is);
      const title = titleMatch ? cleanXmlText(titleMatch[1]) : '';

      // Link (RSS <link>url</link> ou Atom <link href="url"/>)
      let link = '';
      const linkMatch = block.match(/<link[^>]*>(.*?)<\/link>/is);
      if (linkMatch && linkMatch[1].trim()) {
        link = cleanXmlText(linkMatch[1]);
      } else {
        const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["']/is);
        if (hrefMatch) link = hrefMatch[1].trim();
      }

      // Descrição / Lead / Subtítulo
      const descMatch = block.match(/<(?:description|summary|content)[^>]*>(.*?)<\/(?:description|summary|content)>/is);
      let lead = descMatch ? cleanXmlText(descMatch[1]) : '';
      if (lead.length > 280) {
        lead = lead.slice(0, 277) + '...';
      }

      // Data de publicação
      const dateMatch = block.match(/<(?:pubDate|published|updated|dc:date)[^>]*>(.*?)<\/(?:pubDate|published|updated|dc:date)>/is);
      let pubDate = dateMatch ? cleanXmlText(dateMatch[1]) : new Date().toISOString();
      try {
        pubDate = new Date(pubDate).toISOString();
      } catch {
        pubDate = new Date().toISOString();
      }

      // Categoria ou autor
      const catMatch = block.match(/<category[^>]*>(.*?)<\/category>/is);
      const category = catMatch ? cleanXmlText(catMatch[1]) : 'gadgets';

      const authorMatch = block.match(/<(?:dc:creator|author)[^>]*>(.*?)<\/(?:dc:creator|author)>/is);
      const author = authorMatch ? cleanXmlText(authorMatch[1]) : defaultAuthor;

      if (title && link) {
        // Excluir notícias que contêm "jogo", "jogos", "game", "games", trailers, filmes, etc.
        if (containsGameOrExcludedContent(title, lead, category, link)) {
          continue;
        }

        const fullBlock = block.toLowerCase();
        if (
          fullBlock.includes('videogames') ||
          fullBlock.includes('video games') ||
          fullBlock.includes('/topic/videogames')
        ) {
          continue;
        }

        items.push({
          title,
          link,
          pubDate,
          lead,
          author: author || defaultAuthor,
          category
        });
      }
    }

    return items;
  }

  // =========================================================================
  // IMPORTAÇÃO AUTOMÁTICA FLIPBOARD (REVISTA ELETRÔNICA - ÚLTIMAS 48 HORAS)
  // =========================================================================
  app.get('/api/news/flipboard-auto-import', async (req, res) => {
    try {
      const FLIPBOARD_FEED_URL = 'https://flipboard.com/@elilopes/techviva-gadgets-e-games-brasil-79uavc9uy.rss';
      const hoursLimit = parseInt((req.query.hours as string) || '48', 10);
      const maxAgeMs = hoursLimit * 60 * 60 * 1000;
      const now = Date.now();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const feedRes = await fetch(FLIPBOARD_FEED_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!feedRes.ok) {
        return res.status(502).json({ success: false, error: `Falha ao carregar feed Flipboard (HTTP ${feedRes.status})` });
      }

      const xmlText = await feedRes.text();
      const parsedItems = parseRssFeed(xmlText, 'TechViva Flipboard');

      // Filtra estritamente pelo período de 48 horas e descarta itens inválidos ou cookies
      const filtered48h = parsedItems.filter((item) => {
        if (!item.pubDate) return false;
        const itemTime = new Date(item.pubDate).getTime();
        if (isNaN(itemTime)) return false;

        // Limita ao período de 48 horas
        if ((now - itemTime) > maxAgeMs) return false;

        // Descarte de páginas de cookies ou links que não são artigos reais
        if (item.title.toLowerCase().includes('perfil social') || item.link.includes('meli.la')) return false;
        if (item.lead && item.lead.toLowerCase().includes('usamos cookies')) return false;

        // Filtro estrito: não importar notícias que possuem a palavra "jogo", "jogos", "game", "games" ou derivados
        if (containsGameOrExcludedContent(item.title, item.lead, item.category, item.link)) {
          return false;
        }

        return true;
      });

      // Validação de links anti-404
      const verifiedArticles: any[] = [];
      let rejected404Count = 0;

      await Promise.allSettled(
        filtered48h.map(async (art) => {
          try {
            const check = await checkUrlAlive(art.link, 4500);
            if (check.ok) {
              verifiedArticles.push({
                ...art,
                httpStatus: check.status,
                verifiedAt: new Date().toISOString(),
                linkStatus: '200_OK'
              });
            } else {
              rejected404Count++;
            }
          } catch {
            verifiedArticles.push(art);
          }
        })
      );

      // Ordenar por data mais recente
      verifiedArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      res.json({
        success: true,
        source: 'Flipboard Revista Eletrônica TechViva',
        period: `${hoursLimit}h`,
        totalFound: filtered48h.length,
        totalValid: verifiedArticles.length,
        rejected404Count,
        articles: verifiedArticles
      });
    } catch (err: any) {
      console.error('Erro na importação automática do Flipboard:', err);
      res.status(500).json({ success: false, error: err.message || 'Erro ao importar feed do Flipboard' });
    }
  });

  // Endpoint: Importar feeds RSS com Verificador Automático de Erro 404
  app.get('/api/news/feed-import', async (req, res) => {
    try {
      const customFeedUrl = req.query.feedUrl as string;
      const verify404 = req.query.verify404 !== 'false'; // Padrão: TRUE (ativa o verificador)

      const feedSources = customFeedUrl
        ? [{ url: customFeedUrl, author: 'Feed Personalizado' }]
        : [
            { url: 'https://www.showmetech.com.br/feed/', author: 'Showmetech' },
            { url: 'https://olhardigital.com.br/feed/', author: 'Olhar Digital' },
            { url: 'https://rss.tecmundo.com.br/feed', author: 'TecMundo' },
            { url: 'https://www.inovacaotecnologica.com.br/boletim/rss.xml', author: 'Inovação Tecnológica' },
            { url: 'https://canaltech.com.br/rss/', author: 'Canaltech' },
            { url: 'https://flipboard.com/@elilopes/techviva-gadgets-e-games-brasil-79uavc9uy.rss', author: 'TechViva Flipboard' }
          ];

      const rawArticles: any[] = [];

      // Faz o download de todos os feeds em paralelo
      await Promise.allSettled(
        feedSources.map(async (src) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 7000);
            const feedRes = await fetch(src.url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*'
              },
              signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (feedRes.ok) {
              const xmlText = await feedRes.text();
              const parsed = parseRssFeed(xmlText, src.author);
              rawArticles.push(...parsed);
            }
          } catch (e: any) {
            console.warn(`Aviso ao importar feed ${src.url}:`, e.message);
          }
        })
      );

      // Elimina itens duplicados e exclui notícias com trailer/filme/jogos no título ou links inválidos
      const uniqueMap = new Map<string, any>();
      for (const art of rawArticles) {
        if (/trailer|filme|série|series|game|games|jogo|jogos|videogame|playstation|xbox|nintendo|pokemon|pokémon|gta|god of war|elden ring|voxel|mouses gamer/i.test(art.title + ' ' + (art.lead || ''))) continue;
        if (art.link.includes('anuncios-do-gamescom') || art.link === 'https://canaltech.com.br/rss/' || art.link === 'https://canaltech.com.br/rss') continue;
        if (!uniqueMap.has(art.link)) {
          uniqueMap.set(art.link, art);
        }
      }
      const uniqueArticles = Array.from(uniqueMap.values());

      let verifiedArticles: any[] = [];
      let rejected404Count = 0;
      const deadLinks: string[] = [];

      if (verify404) {
        // Executa o verificador automático de erro 404 em lote
        const validationResults = await Promise.all(
          uniqueArticles.map(async (article) => {
            const check = await checkUrlAlive(article.link, 5000);
            return {
              article,
              isAlive: check.ok,
              status: check.status,
              checkMessage: check.message
            };
          })
        );

        for (const item of validationResults) {
          if (item.isAlive) {
            verifiedArticles.push({
              ...item.article,
              httpStatus: item.status,
              verifiedAt: new Date().toISOString(),
              linkStatus: '200_OK'
            });
          } else {
            rejected404Count++;
            deadLinks.push(`${item.article.link} (Status: ${item.status} - ${item.checkMessage})`);
          }
        }
      } else {
        verifiedArticles = uniqueArticles;
      }

      // Ordena pelas notícias mais recentes
      verifiedArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      res.json({
        success: true,
        totalFetched: uniqueArticles.length,
        totalValid: verifiedArticles.length,
        rejected404Count,
        deadLinksRemoved: deadLinks,
        verifierActive: verify404,
        articles: verifiedArticles
      });

    } catch (err: any) {
      console.error('Erro no importador de RSS/feed:', err);
      res.status(500).json({ error: err.message || 'Erro ao processar importação de feeds.' });
    }
  });

  // =========================================================================
  // EXTRATOR AUTOMÁTICO DE METADADOS DE NOTÍCIAS & LINKS (ANTI-404)
  // =========================================================================
  app.post('/api/news/extract-meta', express.json(), async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL da notícia é obrigatória.' });
      }

      const cleanUrl = url.trim();
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(cleanUrl);
      } catch {
        return res.status(400).json({ error: 'Formato de URL inválido. Inclua http:// ou https://' });
      }

      // 1. Testa se o link está ativo e não é 404
      const aliveCheck = await checkUrlAlive(cleanUrl, 7000);
      if (!aliveCheck.ok) {
        return res.status(400).json({
          error: `O link fornecido está inacessível ou retornou erro (Status: ${aliveCheck.status} - ${aliveCheck.message}). Certifique-se de que a notícia existe e tente novamente.`
        });
      }

      // 2. Faz o download do HTML da página para extrair metadados OpenGraph e tags
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const pageRes = await fetch(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const html = await pageRes.text();

      // Extração de Título
      const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
                           html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:title["']/i) ||
                           html.match(/<meta\s+name=["']twitter:title["']\s+content=["'](.*?)["']/i);
      const titleTagMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      let title = ogTitleMatch ? ogTitleMatch[1] : (titleTagMatch ? titleTagMatch[1] : '');
      title = cleanXmlText(title);

      // Limpeza de sufixos de sites comuns no título (ex: " | Showmetech", " - TecMundo")
      title = title.replace(/\s*[-|–—]\s*(Showmetech|TecMundo|Olhar Digital|Canaltech|G1|Exame|TudoCelular|UOL|Gizmodo|The Verge|TechCrunch).*$/i, '').trim();

      // Extração de Descrição / Lead
      const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i) ||
                          html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:description["']/i) ||
                          html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                          html.match(/<meta\s+name=["']twitter:description["']\s+content=["'](.*?)["']/i);
      let lead = ogDescMatch ? ogDescMatch[1] : '';
      lead = cleanXmlText(lead);
      if (lead.length > 320) {
        lead = lead.slice(0, 317) + '...';
      }

      // Extração de Autor / Nome do Site
      const ogSiteMatch = html.match(/<meta\s+property=["']og:site_name["']\s+content=["'](.*?)["']/i) ||
                          html.match(/<meta\s+name=["']author["']\s+content=["'](.*?)["']/i);
      let author = ogSiteMatch ? cleanXmlText(ogSiteMatch[1]) : '';
      if (!author) {
        const host = parsedUrl.hostname.replace(/^www\./, '');
        author = host.split('.')[0].toUpperCase();
      }

      // Inferência da Categoria com base em palavras-chave
      const fullText = (title + ' ' + lead).toLowerCase();
      let category = 'gadgets';
      if (fullText.includes('invenç') || fullText.includes('desenvolve') || fullText.includes('patente') || fullText.includes('protótipo') || fullText.includes('robô') || fullText.includes('energia') || fullText.includes('bateria')) {
        category = 'inventions';
      } else if (fullText.includes('descoberta') || fullText.includes('pesquisa') || fullText.includes('ciência') || fullText.includes('quântic') || fullText.includes('espaço') || fullText.includes('astr') || fullText.includes('dna') || fullText.includes('físic')) {
        category = 'discoveries';
      }

      res.json({
        success: true,
        data: {
          url: cleanUrl,
          title: title || 'Notícia sobre Tecnologia e Gadgets',
          lead: lead || 'Confira os detalhes e destaques desta publicação recente de tecnologia.',
          author: author || 'Fonte Web',
          category,
          pubDate: new Date().toISOString(),
          httpStatus: pageRes.status,
          verified: true
        }
      });

    } catch (err: any) {
      console.error('Erro na extração de metadados de notícia:', err);
      res.status(500).json({ error: err.message || 'Erro ao analisar a página da notícia.' });
    }
  });

  // =========================================================================
  // SUGESTÕES DE NOTÍCIAS CURADAS & EM ALTA (TRENDING GADGETS & TECH)
  // =========================================================================
  app.get('/api/news/suggestions', (req, res) => {
    const suggestions = [
      {
        id: 'sug-1',
        title: 'Intel detalha Core Série 3 Wildcat Lake, CPU para trazer IA a notebooks baratos',
        lead: 'Nova arquitetura foca em eficiência energética e aceleração neural integrada para democratizar recursos de IA generativa em PCs portáteis.',
        category: 'inventions',
        categoryLabel: 'Processadores & IA',
        author: 'Showmetech',
        link: 'https://www.showmetech.com.br/intel-detalha-core-serie-3-wildcat-lake/',
        pubDate: new Date(Date.now() - 3600000 * 2).toISOString(),
        trendingTag: '🔥 Processadores & IA'
      },
      {
        id: 'sug-2',
        title: 'Baterias de Lítio-Enxofre com Eletrólito Sólido quadruplicam autonomia de Drones',
        lead: 'Pesquisadores alcançam marca histórica de 1.200 ciclos de recarga sem degradação térmica em testes de bancada de alta potência.',
        category: 'inventions',
        categoryLabel: 'Invenções & Energia',
        author: 'Inovação Tecnológica',
        link: 'https://www.inovacaotecnologica.com.br/noticias/noticia.php?artigo=flexoeletricidade-enrugar-grafeno-produz-eletricidade&id=010115260819',
        pubDate: new Date(Date.now() - 3600000 * 5).toISOString(),
        trendingTag: '⚡ Energia Limpa'
      },
      {
        id: 'sug-3',
        title: 'Xiaomi 18 Fold tem imagens oficiais reveladas antes do lançamento',
        lead: 'Novo dobrável topo de linha exibe corpo ultrafino com dobradiça de fibra de carbono, câmeras Leica e bateria de silício-carbono.',
        category: 'gadgets',
        categoryLabel: 'Smartphones & Dobráveis',
        author: 'TecMundo',
        link: 'https://www.tecmundo.com.br/produto/415736-xiaomi-18-fold-tem-imagens-oficiais-reveladas-antes-do-lancamento.htm',
        pubDate: new Date(Date.now() - 3600000 * 7).toISOString(),
        trendingTag: '📱 Mobile Tech'
      },
      {
        id: 'sug-4',
        title: 'Chinesa lança fone com ANC para desafiar Sony por apenas R$ 220',
        lead: 'Novo fone sem fio traz cancelamento ativo de ruído híbrido de 45 dB, drivers de titânio e autonomia de até 60 horas com estojo de recarga rápida.',
        category: 'gadgets',
        categoryLabel: 'Áudio & Gadgets',
        author: 'Canaltech',
        link: 'https://canaltech.com.br/fone-de-ouvido/chinesa-lanca-fone-com-anc-para-desafiar-sony-por-apenas-r-220/',
        pubDate: new Date(Date.now() - 3600000 * 12).toISOString(),
        trendingTag: '🎧 Áudio & Gadgets'
      },
      {
        id: 'sug-5',
        title: 'Novos relógios Huawei GT 7 e GT 7 Pro são lançados com até 21 dias de bateria',
        lead: 'Smartwatches chegam com sensores ópticos aprimorados, medição de ECG de nível médico e resistência militar contra água e impactos.',
        category: 'gadgets',
        categoryLabel: 'Smartwatches & Gadgets',
        author: 'TecMundo',
        link: 'https://www.tecmundo.com.br/produto/415733-novos-relogios-huawei-gt-7-e-gt-7-pro-sao-lancados-com-ate-21-dias-de-bateria.htm',
        pubDate: new Date(Date.now() - 3600000 * 16).toISOString(),
        trendingTag: '⌚ Bateria Estendida'
      }
    ];

    res.json({
      success: true,
      suggestions
    });
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Rota explícita para o sitemap.xml para garantir que seja reconhecido pelos motores de busca (como Google Cloud Run / Search Console)
    app.get('/sitemap.xml', (req, res) => {
      res.setHeader('Content-Type', 'application/xml');
      res.sendFile(path.join(distPath, 'sitemap.xml'));
    });

    app.get('/robots.txt', (req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      res.sendFile(path.join(distPath, 'robots.txt'));
    });

    app.use(express.static(distPath));
    app.use('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
  });
}

const logError = (error: Error | any) => {
  try {
    const errorMsg = `[${new Date().toISOString()}] ${error?.stack || error}\n`;
    fs.appendFileSync(path.join(process.cwd(), 'error.log'), errorMsg);
  } catch (e) {
    console.error('Failed to write to error.log', e);
  }
};

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  logError(err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  logError(reason);
});

startServer().catch(err => {
  console.error('Failed to start server:', err);
  logError(err);
  process.exit(1);
});
