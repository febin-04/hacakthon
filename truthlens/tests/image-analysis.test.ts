import { describe, test, expect } from 'vitest';
import { AnalysisService } from '../src/services/AnalysisService';
import { parseImageForensics } from '../src/services/utils/forensicParser';

describe('Image Analysis & Evidence Pipeline', () => {
  const service = new AnalysisService();

  test('Valid camera photograph is classified as LIKELY AUTHENTIC', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'IMG_20260905_120000.JPG',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP...Apple iPhone 15 Pro...',
    });

    expect(result.assessment).toBe('LIKELY AUTHENTIC');
    expect(result.confidenceScore).toBeGreaterThanOrEqual(70);
    expect(result.whyWeThinkThis.supportingAuthenticityEvidence.length).toBeGreaterThan(0);
    expect(result.whyWeThinkThis.suggestingAiEvidence.length).toBe(0);
  });

  test('Real image missing EXIF is NOT classified as AI-generated', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'vacation_photo.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
    });

    expect(result.assessment).not.toBe('LIKELY AI-GENERATED');
    expect(['LIKELY AUTHENTIC', 'NEEDS VERIFICATION']).toContain(result.assessment);
  });

  test('Image with explicit AI generative software header is classified as LIKELY AI-GENERATED or NEEDS VERIFICATION', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'midjourney_v6_portrait.png',
      mediaType: 'image',
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...Midjourney...Generative',
    });

    expect(result.whyWeThinkThis.suggestingAiEvidence.length).toBeGreaterThan(0);
    expect(['LIKELY AI-GENERATED', 'NEEDS VERIFICATION']).toContain(result.assessment);
  });

  test('Manipulated image with edit clues', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'edited_document_photoshop.jpg',
      mediaType: 'image',
      url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...Photoshop...',
    });

    expect(result).toBeDefined();
    expect(result.findings.length).toBeGreaterThan(0);
  });
});
