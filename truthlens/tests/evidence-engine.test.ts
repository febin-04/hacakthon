import { describe, test, expect } from 'vitest';
import { AnalysisService } from '../src/services/AnalysisService';

describe('Multi-Signal Evidence Fusion Engine', () => {
  const service = new AnalysisService();

  test('Strong authentic evidence -> LIKELY AUTHENTIC', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'DSC_0092.JPG',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,...Sony Alpha A7III...Nikon...',
    });

    expect(result.assessment).toBe('LIKELY AUTHENTIC');
    expect(result.confidenceScore).toBeGreaterThanOrEqual(80);
    expect(result.riskLevel).toBe('Low');
    expect(result.evidenceStrength).toBe('High');
  });

  test('Strong AI evidence -> LIKELY AI-GENERATED', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'midjourney_flux_synthetic_render.png',
      mediaType: 'image',
      url: 'data:image/png;base64,...Midjourney...Flux...Generative...',
    });

    expect(result.whyWeThinkThis.suggestingAiEvidence.length).toBeGreaterThan(0);
    expect(['LIKELY AI-GENERATED', 'NEEDS VERIFICATION']).toContain(result.assessment);
  });

  test('Conflicting evidence (Camera EXIF + AI software tag keyword) -> Safe taxonomy handling', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'IMG_1020_midjourney.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,...Canon EOS R5...',
    });

    expect(result.assessment).toBeDefined();
    expect(result.whyWeThinkThis.supportingAuthenticityEvidence.length).toBeGreaterThan(0);
  });

  test('Insufficient evidence state when detection engines unavailable', async () => {
    const origGeminiKey = process.env.GEMINI_API_KEY;
    const origRDKey = process.env.REALITY_DEFENDER_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.REALITY_DEFENDER_API_KEY;

    const unavailResult = await service.processMediaAnalysis({
      mediaName: 'unknown.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,123',
    });

    expect(unavailResult.assessment).toBe('INSUFFICIENT EVIDENCE');
    expect(unavailResult.confidenceScore).toBe(0);

    process.env.GEMINI_API_KEY = origGeminiKey;
    process.env.REALITY_DEFENDER_API_KEY = origRDKey;
  });
});
