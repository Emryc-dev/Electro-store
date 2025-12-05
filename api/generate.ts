import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { message, context } = req.body || {};
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message || '',
      config: { systemInstruction: context || '' }
    });

    return res.status(200).json({ text: response.text || '' });
  } catch (err) {
    console.error('API generate error:', err);
    return res.status(500).json({ error: 'AI request failed' });
  }
}
