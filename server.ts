import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
      appUrl: process.env.APP_URL || 'http://localhost:3000'
    });
  });

  // Tamil Text-to-Speech / Speech Generation API proxy
  app.get('/api/tts', async (req, res) => {
    try {
      const text = (req.query.q || req.query.text) as string;
      if (!text || typeof text !== 'string') {
        return res.status(400).send('Text parameter is required');
      }

      // Split long text into natural punctuation chunks (Google TTS limit ~190 chars per chunk)
      const cleanInput = text.trim();
      const chunks = cleanInput.match(/[^.!?\n,;:]+[.!?\n,;:]?/g) || [cleanInput];
      const buffers: Buffer[] = [];

      for (const chunk of chunks) {
        const cleanChunk = chunk.trim();
        if (!cleanChunk) continue;

        // Ensure sub-chunks stay within 180 chars
        const subChunks = cleanChunk.length > 180 
          ? cleanChunk.match(/.{1,180}(\s|$)/g) || [cleanChunk]
          : [cleanChunk];

        for (const sub of subChunks) {
          const cleanSub = sub.trim();
          if (!cleanSub) continue;

          const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ta&client=tw-ob&q=${encodeURIComponent(cleanSub)}`;
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
          });

          if (response.ok) {
            const ab = await response.arrayBuffer();
            buffers.push(Buffer.from(ab));
          }
        }
      }

      if (buffers.length === 0) {
        return res.status(500).send('Speech audio generation failed');
      }

      const combinedBuffer = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(combinedBuffer);
    } catch (err: unknown) {
      console.error('TTS endpoint error:', err);
      return res.status(500).send('Speech audio generation failed');
    }
  });

  app.post('/api/synthesize', async (req, res) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text prompt is required' });
      }

      // Split long text into manageable speech chunks for Tamil TTS
      const chunks = text.match(/[^.!?\n,:]+[.!?\n,:]?/g) || [text];
      const buffers: Buffer[] = [];

      for (const chunk of chunks) {
        const clean = chunk.trim();
        if (!clean) continue;

        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ta&client=tw-ob&q=${encodeURIComponent(clean.slice(0, 190))}`;
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          }
        });

        if (response.ok) {
          const ab = await response.arrayBuffer();
          buffers.push(Buffer.from(ab));
        }
      }

      if (buffers.length === 0) {
        return res.status(500).json({ error: 'Failed to synthesize audio buffers' });
      }

      const combinedBuffer = Buffer.concat(buffers);
      return res.json({
        audioContent: combinedBuffer.toString('base64'),
        mimeType: 'audio/mpeg'
      });

    } catch (err: unknown) {
      console.error('API Synthesize Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Speech synthesis proxy error';
      return res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tamil Audiobook Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
