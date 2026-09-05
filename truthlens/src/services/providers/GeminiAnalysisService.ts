import { GoogleGenAI } from '@google/genai';
import { ForensicFinding } from '../types';

export interface GeminiAnalysisResponse {
  available: boolean;
  verdictCategory?: 'SUGGEST_AUTHENTIC' | 'SUGGEST_AI' | 'SUGGEST_EDITED' | 'INCONCLUSIVE';
  visualAiScore?: number; // 0 - 100
  summary?: string;
  supportingAuthenticityEvidence?: string[];
  suggestingAiEvidence?: string[];
  findings?: ForensicFinding[];
  error?: string;
}

export class GeminiAnalysisService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey });
      } catch (err) {
        console.error('Failed to initialize Gemini API client:', err);
      }
    }
  }

  public isAvailable(): boolean {
    return !!process.env.GEMINI_API_KEY;
  }

  public async analyzeMedia(
    base64DataUrlOrBuffer: string,
    mediaType: 'image' | 'video' | 'audio',
    mediaName: string
  ): Promise<GeminiAnalysisResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        available: false,
        error: 'GEMINI_API_KEY not configured in backend environment.',
      };
    }

    if (!this.ai) {
      try {
        this.ai = new GoogleGenAI({ apiKey });
      } catch (err) {
        return {
          available: false,
          error: `Failed to initialize GoogleGenAI client: ${err}`,
        };
      }
    }

    try {
      let mimeType = 'image/jpeg';
      let base64Data = base64DataUrlOrBuffer;

      if (base64DataUrlOrBuffer.startsWith('data:')) {
        const parts = base64DataUrlOrBuffer.split(';base64,');
        mimeType = parts[0].replace('data:', '');
        base64Data = parts[1];
      }

      const prompt = `You are analyzing an image named "${mediaName}" for possible AI generation or manipulation.

CRITICAL GUIDELINES:
- Do NOT assume the image is AI-generated.
- First identify whether there are actual observable visual signs of AI generation or manipulation.
- Consider: facial details, eyes, teeth, hands, text, lighting, shadows, reflections, textures, background, object boundaries, repeated patterns, unnatural geometry, image compression, editing artifacts.
- Distinguish strictly between:
  1. Evidence suggesting AI generation (e.g. malformed hands/teeth, specular catchlight vector mismatch, diffusion noise loops)
  2. Evidence suggesting authentic photography (e.g. natural optical depth of field, consistent sensor noise, realistic skin pores, uniform light vector)
  3. Evidence suggesting editing/manipulation (e.g. clone stamp repetition, localized splicing borders)
  4. No significant evidence / Inconclusive
- Do NOT treat missing camera EXIF metadata as proof of AI generation.
- Do NOT treat low image resolution or JPEG compression as proof of AI generation.
- Do NOT invent evidence or fake URLs.
- If the evidence is weak or conflicting, classify verdictCategory as "INCONCLUSIVE".

Respond ONLY as a raw, valid JSON object (no markdown formatting) matching this schema:
{
  "verdictCategory": "SUGGEST_AUTHENTIC" | "SUGGEST_AI" | "SUGGEST_EDITED" | "INCONCLUSIVE",
  "visualAiProbability": number, // integer 0 to 98 (0 = high confidence real, 98 = high confidence AI render)
  "summary": "Clear 2-sentence visual evaluation summary.",
  "supportingAuthenticityEvidence": ["list of observable physical/optical facts supporting real photography"],
  "suggestingAiEvidence": ["list of observable synthetic/generative artifacts found, or empty array if none"],
  "findings": [
    {
      "title": "Short descriptive title",
      "evidence": "Observable visual evidence",
      "confidence": "e.g. 85%",
      "simpleExplanation": "Simple non-technical explanation for everyday users",
      "technicalExplanation": "Forensic breakdown for researchers",
      "severity": "High" | "Medium" | "Low"
    }
  ]
}`;

      // Call Gemini API with fallback models & 6s timeout
      const modelCandidates = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];
      let response: any = null;
      let lastModelError: any = null;

      for (const modelName of modelCandidates) {
        try {
          const modelPromise = this.ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    inlineData: {
                      mimeType: mimeType,
                      data: base64Data,
                    },
                  },
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Gemini API timeout (6000ms exceeded)')), 6000)
          );

          response = await Promise.race([modelPromise, timeoutPromise]);
          if (response && response.text) {
            break;
          }
        } catch (mErr) {
          lastModelError = mErr;
        }
      }

      if (!response || !response.text) {
        throw lastModelError || new Error('No response from Gemini API models');
      }

      const responseText = response.text || '';

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        available: true,
        verdictCategory: parsed.verdictCategory || 'INCONCLUSIVE',
        visualAiScore: Math.min(98, Math.max(5, Number(parsed.visualAiProbability) || 50)),
        summary: parsed.summary || 'Gemini evidence-based visual inspection completed.',
        supportingAuthenticityEvidence: Array.isArray(parsed.supportingAuthenticityEvidence) ? parsed.supportingAuthenticityEvidence : [],
        suggestingAiEvidence: Array.isArray(parsed.suggestingAiEvidence) ? parsed.suggestingAiEvidence : [],
        findings: Array.isArray(parsed.findings) ? parsed.findings : [],
      };
    } catch (err: any) {
      console.error('Gemini API analysis error:', err);
      return {
        available: false,
        error: `Unable to analyze this image via Gemini (${err?.message || 'API error'}).`,
      };
    }
  }
}

export const globalGeminiService = new GeminiAnalysisService();
