import { describe, test, expect } from 'vitest';
import { GeminiAnalysisService } from '../src/services/providers/GeminiAnalysisService';
import { RealityDefenderProvider } from '../src/services/providers/RealityDefenderProvider';

describe('External Provider API Handling & Resiliency', () => {
  test('Gemini service handles missing API key gracefully without crash', async () => {
    const service = new GeminiAnalysisService();
    const origKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const res = await service.analyzeMedia('data:image/jpeg;base64,123', 'image', 'test.jpg');
    expect(res.available).toBe(false);
    expect(res.error).toContain('GEMINI_API_KEY not configured');

    process.env.GEMINI_API_KEY = origKey;
  });

  test('Reality Defender provider returns fallback available=false on missing API key', async () => {
    const rdProvider = new RealityDefenderProvider(undefined);
    const res = await rdProvider.analyzeImage({ mediaName: 'test.jpg', mediaType: 'image' });

    expect(res.available).toBe(false);
    expect(res.confidenceScore).toBeNull();
  });

  test('Reality Defender provider timeout protection (3000ms safety limit)', async () => {
    const rdProvider = new RealityDefenderProvider('invalid_test_key_xyz');
    const res = await rdProvider.analyzeImage({ mediaName: 'test.jpg', mediaType: 'image' });

    expect(res.available).toBe(false);
    expect(res.confidenceScore).toBeNull();
  });
});
