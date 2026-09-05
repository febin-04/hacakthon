import { describe, test, expect } from 'vitest';
import { AnalysisService } from '../src/services/AnalysisService';

describe('Video Analysis & Temporal Inspection', () => {
  const service = new AnalysisService();

  test('Valid camera video upload handling', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'VID_20260905_103000.mp4',
      mediaType: 'video',
      url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29t...',
    });

    expect(result.mediaType).toBe('video');
    expect(result.assessment).toBeDefined();
    expect(result.findings.length).toBeGreaterThan(0);
  });

  test('Generative AI video filename pattern detection (Sora/Runway)', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'sora_text2video_generation.mp4',
      mediaType: 'video',
      url: 'data:video/mp4;base64,AAAAIGZ0eXBpc29t...',
    });

    expect(result.whyWeThinkThis.suggestingAiEvidence.length).toBeGreaterThan(0);
    expect(result.whyWeThinkThis.suggestingAiEvidence[0]).toContain('generative AI model clue');
  });

  test('Corrupted or empty video payload safety', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'corrupted_video.mp4',
      mediaType: 'video',
      url: '',
    });

    expect(result).toBeDefined();
    expect(result.assessment).toBeDefined();
  });
});
