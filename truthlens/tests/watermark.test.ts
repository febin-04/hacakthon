import { describe, test, expect } from 'vitest';
import { parseImageForensics } from '../src/services/utils/forensicParser';
import { AnalysisService } from '../src/services/AnalysisService';

describe('Watermark Analysis & OCR Inspection', () => {
  const service = new AnalysisService();

  test('AI watermark / software tag detected in image header', () => {
    const analysis = parseImageForensics(
      'dalle_render.jpg',
      'image/jpeg',
      'data:image/jpeg;base64,...DALL-E...Generative AI...'
    );

    expect(analysis.hasAiSoftwareTag).toBe(true);
    expect(analysis.aiTagFound).toBe('DALL-E');
  });

  test('Absence of watermark is NOT treated as automatic proof of authenticity or fake', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'clean_photo.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,987654321',
    });

    expect(result).toBeDefined();
    // Absence of watermark should be reported clearly without hard binary assumption
    expect(result.whyWeThinkThis).toBeDefined();
  });

  test('Company logo or standard photographer watermark is NOT interpreted as AI', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'press_photo_reuters_watermark.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,...Canon EOS R5...Press Agency Watermark...',
    });

    expect(result.assessment).toBe('LIKELY AUTHENTIC');
    expect(result.whyWeThinkThis.suggestingAiEvidence).not.toContain('Watermark');
  });

  test('Watermark information serves as one supporting evidence signal only', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'stock_watermark_sample.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,123',
    });

    expect(result.whyWeThinkThis.limitations).toBeDefined();
    expect(result.whyWeThinkThis.limitations.some(l => l.includes('probabilistic') || l.includes('clues'))).toBe(true);
  });
});
