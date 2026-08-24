import express from 'express';
import { createServer as createViteServer } from 'vite';
import ytdl from '@distube/ytdl-core';
import ytSearch from 'yt-search';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // API Endpoint: Search YouTube
  app.get('/api/yt/search', async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).send('Search query is required');
      }

      // Method 1: Direct YouTube InitialData Parser (Bypasses yt-search package bugs)
      try {
        const fetchRes = await fetch(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            },
          }
        );
        const html = await fetchRes.text();
        const jsonMatch = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
        if (jsonMatch && jsonMatch[1]) {
          const data = JSON.parse(jsonMatch[1]);
          const contents =
            data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
              ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
          const videos: any[] = [];
          for (const item of contents) {
            const vid = item.videoRenderer;
            if (vid && vid.videoId) {
              const title =
                vid.title?.runs?.[0]?.text || vid.title?.simpleText || 'Vídeo sem título';
              const thumbnail =
                vid.thumbnail?.thumbnails?.[0]?.url ||
                `https://i.ytimg.com/vi/${vid.videoId}/hqdefault.jpg`;
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

  // API Endpoint: Obter Informações do YouTube (Título, etc)
  app.get('/api/yt/info', async (req, res) => {
    try {
      const url = req.query.url as string;
      if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'INVALID_URL', message: 'URL do YouTube inválida.' });
      }

      const info = await ytdl.getBasicInfo(url, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          }
        }
      });
      res.json({
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0]?.url,
        author: info.videoDetails.author.name
      });
    } catch (error: any) {
      console.log('YouTube Info Issue:', error.message);
      const is429 = error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Sign in to confirm') || error.message?.includes('bot');
      if (is429) {
        return res.status(429).json({
          error: 'RATE_LIMIT_429',
          code: 429,
          message: 'O YouTube bloqueou temporariamente requisições originadas do servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
        });
      }
      res.status(500).json({ error: 'FETCH_ERROR', message: error.message || 'Erro ao obter informações do vídeo.' });
    }
  });

  // API Endpoint: Extrair áudio ou vídeo do YouTube
  app.get('/api/yt/download', async (req, res) => {
    try {
      const url = req.query.url as string;
      const mode = (req.query.mode as string) || 'audio'; // 'audio' or 'video'
      
      if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'INVALID_URL', message: 'URL do YouTube inválida.' });
      }

      const requestOptions = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        }
      };

      const info = await ytdl.getInfo(url, { requestOptions });
      const title = (info.videoDetails.title || 'video').replace(/[^\w\s-]/gi, '').trim() || 'youtube_media';

      if (mode === 'video') {
        const qualityPref = (req.query.quality as string) || 'highest';
        res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp4"`);
        res.header('Content-Type', 'video/mp4');

        let format;
        try {
          if (qualityPref === '360p') {
            format = ytdl.chooseFormat(info.formats, { quality: '18', filter: 'audioandvideo' });
          } else if (qualityPref === 'lowest') {
            format = ytdl.chooseFormat(info.formats, { quality: 'lowest', filter: 'audioandvideo' });
          } else {
            format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
          }
        } catch (e) {
          format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
        }

        const stream = ytdl.downloadFromInfo(info, { format, requestOptions });
        
        stream.on('error', (error: any) => {
          console.log('YouTube Stream Issue (Video):', error.message);
          const is429 = error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Sign in to confirm') || error.message?.includes('bot');
          if (!res.headersSent) {
            res.status(is429 ? 429 : 500).json({
              error: is429 ? 'RATE_LIMIT_429' : 'STREAM_ERROR',
              code: is429 ? 429 : 500,
              message: is429 
                ? 'O YouTube bloqueou temporariamente o download no servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
                : (error.message || 'Erro ao processar o vídeo do YouTube.')
            });
          } else {
            res.end();
          }
        });

        stream.pipe(res);
      } else {
        // Modo áudio (padrão)
        res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.webm"`);
        res.header('Content-Type', 'audio/webm');

        const stream = ytdl.downloadFromInfo(info, { 
          filter: 'audioonly', 
          quality: 'highestaudio',
          requestOptions 
        });
        
        stream.on('error', (error: any) => {
          console.log('YouTube Stream Issue (Audio):', error.message);
          const is429 = error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Sign in to confirm') || error.message?.includes('bot');
          if (!res.headersSent) {
            res.status(is429 ? 429 : 500).json({
              error: is429 ? 'RATE_LIMIT_429' : 'STREAM_ERROR',
              code: is429 ? 429 : 500,
              message: is429 
                ? 'O YouTube bloqueou temporariamente o download no servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
                : (error.message || 'Erro ao processar o áudio do YouTube.')
            });
          } else {
            res.end();
          }
        });

        stream.pipe(res);
      }
    } catch (error: any) {
      console.log('YouTube Fetch Issue:', error.message);
      const is429 = error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Sign in to confirm') || error.message?.includes('bot') || error.message?.includes('UnrecoverableError');
      
      if (!res.headersSent) {
        res.status(is429 ? 429 : 500).json({
          error: is429 ? 'RATE_LIMIT_429' : 'FETCH_ERROR',
          code: is429 ? 429 : 500,
          message: is429
            ? 'O YouTube bloqueou temporariamente o acesso do servidor em nuvem (Status 429: Proteção Anti-Bot / Too Many Requests).'
            : (error.message || 'Erro ao processar o link do YouTube.')
        });
      }
    }
  });

  // Configuração do Vite para Development e Static para Production
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
