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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// 1. YouTube Data Fetcher
async function fetchYoutubeData(videoId: string) {
  const host = 'youtube-media-downloader.p.rapidapi.com';
  const response = await fetchWithTimeout(`https://${host}/v2/video/details?videoId=${videoId}`, {
    headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': RAPID_API_KEY }
  });
  if (!response.ok) throw new Error(`YouTube API Error (Status ${response.status})`);
  return await response.json();
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


async function fetchYtdlpFallback(url: string, platform: string): Promise<any> {
  console.log(`Using yt-dlp fallback for ${platform}...`);
  const ytOptions: any = {
    dumpJson: true,
    noWarnings: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
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
        const data = await fetchYoutubeData(videoId);
        title = data.title || 'Vídeo do YouTube';
        thumbnail = data.thumbnails?.[0]?.url || '';
        author = data.channel?.name || 'YouTube';
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
            const output: any = await fetchYtdlpFallback(url, platform);
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
            const output: any = await fetchYtdlpFallback(url, platform);
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
        
        try {
          // 1. Try direct ytdl-core first
          const fallbackData = await fetchYoutubeDirectFallback(url, mode);
          if (fallbackData.useYtdl) {
            res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(fallbackData.title)}.${fallbackData.extension}"`);
            res.header('Content-Type', fallbackData.extension === 'mp4' ? 'video/mp4' : 'audio/mpeg');
            const ytStream = ytdl.downloadFromInfo(fallbackData.info as any, {
              quality: mode === 'video' ? 'highest' : 'highestaudio',
              filter: mode === 'video' ? 'audioandvideo' : 'audioonly',
              agent: fallbackData.agent
            });
            ytStream.pipe(res);
            ytStream.on('error', (err) => {
              console.error('ytdl stream error:', err);
              if (!res.headersSent) res.status(502).json({ error: 'STREAM_ERROR', message: 'Erro na transmissão do YouTube.' });
            });
            return;
          }
        } catch (directErr) {
          console.warn('YouTube direct fallback failed, trying RapidAPI...', directErr);
          // 2. Fallback to RapidAPI
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
          if (!downloadUrl) throw new Error('No url from RapidAPI');
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
            const fallbackData: any = await fetchYtdlpFallback(url, platform);
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
        } catch {
          const aio = await fetchAllInOneData(url);
          title = (aio.title || 'vimeo_video').replace(/[^\w\s-]/gi, '').trim() || 'vimeo_media';
          downloadUrl = aio.video || aio.url || aio.medias?.[0]?.url;
          extension = 'mp4';
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
            const fallbackData = await fetchYtdlpFallback(url, platform);
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

      // Stream the media back to client
      const streamRes = await fetchWithTimeout(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        }
      }, 30000);

      if (!streamRes.ok) {
        return res.status(502).json({ error: 'STREAM_ERROR', message: 'Não foi possível se conectar aos servidores de mídia do provedor.' });
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

      switch (format) {
        case 'webm':
          args.push('-c:v', 'libvpx-vp9', '-crf', crf, '-b:v', '0', '-c:a', 'libopus');
          break;
        case 'mp4':
        case 'mkv':
        case 'mov':
          args.push('-c:v', 'libx264', '-preset', preset, '-crf', crf, '-c:a', 'aac', '-b:a', '128k', '-pix_fmt', 'yuv420p');
          break;
        case 'avi':
          args.push('-c:v', 'mpeg4', '-q:v', '5', '-c:a', 'libmp3lame');
          break;
        default:
          args.push('-c:v', 'copy', '-c:a', 'copy');
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
    app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
  });
}

startServer();
