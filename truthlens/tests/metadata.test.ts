import { describe, test, expect } from 'vitest';
import { parseImageForensics } from '../src/services/utils/forensicParser';

describe('EXIF & Metadata Forensic Analysis', () => {
  test('EXIF available with camera maker (Apple iPhone)', () => {
    const analysis = parseImageForensics(
      'IMG_1024.JPG',
      'image/jpeg',
      'data:image/jpeg;base64,...Apple...iPhone 14 Pro...'
    );

    expect(analysis.hasCameraExif).toBe(true);
    expect(analysis.detectedCamera).toBe('Apple');
    expect(analysis.detectedExif['Camera Make/Model']).toBe('Apple');
  });

  test('EXIF missing is NOT treated as proof of AI', () => {
    const analysis = parseImageForensics(
      'downloaded_image.jpg',
      'image/jpeg',
      'data:image/jpeg;base64,1234567890'
    );

    expect(analysis.hasCameraExif).toBe(false);
    expect(analysis.hasAiSoftwareTag).toBe(false);
    expect(analysis.detectedExif['Metadata Status']).toContain('Missing / Stripped EXIF');
  });

  test('Editing software metadata detection (Photoshop / Midjourney tag)', () => {
    const analysis = parseImageForensics(
      'artwork.png',
      'image/png',
      'data:image/png;base64,...Midjourney...Generative...'
    );

    expect(analysis.hasAiSoftwareTag).toBe(true);
    expect(analysis.aiTagFound).toBe('Midjourney');
  });

  test('Messaging platform transit metadata stripping (WhatsApp)', () => {
    const analysis = parseImageForensics(
      'WA00129481.jpg',
      'image/jpeg',
      'data:image/jpeg;base64,12345'
    );

    expect(analysis.filenameSignal.isWhatsAppPattern).toBe(true);
    expect(analysis.detectedExif['Platform']).toBe('WhatsApp Messenger');
    expect(analysis.detectedExif['Metadata Status']).toContain('Normal behavior');
  });

  test('OS Screenshot pattern metadata', () => {
    const analysis = parseImageForensics(
      'Screenshot_2026-09-05.png',
      'image/png',
      'data:image/png;base64,12345'
    );

    expect(analysis.filenameSignal.isScreenshotPattern).toBe(true);
    expect(analysis.detectedExif['Platform']).toBe('OS Screenshot Capture');
  });
});
