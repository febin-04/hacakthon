import { describe, test, expect } from 'vitest';
import { AnalysisService } from '../src/services/AnalysisService';

describe('Audio Analysis & Voice Clone Inspection', () => {
  const service = new AnalysisService();

  test('Standard voice recording handling', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'voice_memo_interview.mp3',
      mediaType: 'audio',
      url: 'data:audio/mp3;base64,SUQzBAAAAAAAI...',
    });

    expect(result.mediaType).toBe('audio');
    expect(result.assessment).toBeDefined();
    expect(result.whyWeThinkThis).toBeDefined();
  });

  test('Voice clone AI keyword detection', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'elevenlabs_cloned_voice_synth.mp3',
      mediaType: 'audio',
      url: 'data:audio/mp3;base64,SUQzBAAAAAAAI...',
    });

    expect(result.mediaType).toBe('audio');
    expect(result.whyWeThinkThis).toBeDefined();
  });

  test('Oversized or invalid audio stream parameters', async () => {
    const result = await service.processMediaAnalysis({
      mediaName: 'invalid_audio.wav',
      mediaType: 'audio',
      fileSize: '150 MB',
      url: 'data:audio/wav;base64,RIFF...',
    });

    expect(result).toBeDefined();
    expect(result.assessment).toBeDefined();
  });
});
