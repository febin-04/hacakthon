import { ForensicAnalysisProvider } from './ForensicAnalysisProvider';
import { AnalysisRequestPayload, ForensicAnalysisResult } from '../types';
import { parseImageForensics } from '../utils/forensicParser';

export class DemoAnalysisProvider implements ForensicAnalysisProvider {
  public name = 'TruthLens Multimodal Forensics Engine';
  public version = 'v2.4-engine';
  public isDemoProvider = true;

  private disclaimer = 
    'AI-generated media detection is probabilistic. TruthLens AI provides evidence metrics and risk indicators, not absolute proof of authenticity.';

  public async analyzeImage(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult> {
    const analysis = parseImageForensics(payload.mediaName, 'image/png', payload.url);

    if (analysis.filenameSignal.isAiKeywordPattern || analysis.hasAiSoftwareTag) {
      return {
        id: `img-synth-${Date.now().toString().slice(-6)}`,
        mediaName: payload.mediaName,
        mediaType: 'image',
        mimeType: 'image/png',
        fileSize: payload.fileSize || '3.42 MB',
        previewUrl: payload.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        assessment: 'LIKELY AI-GENERATED',
        confidenceScore: 87,
        riskLevel: 'High',
        evidenceStrength: 'High',
        mediaAuthenticity: 'Potentially Manipulated',
        contextualCredibility: 'Potentially Misleading',
        findings: analysis.findings,
        exifData: analysis.detectedExif,
        sources: [
          {
            title: 'AI Generative Archive Repository',
            url: 'https://example.com/archive/ai-portraits/9941',
            pubDate: 'March 14, 2024',
            similarity: '98.2% Feature Vector Match',
            contextNote: 'First indexed as a synthetic AI test render.'
          }
        ],
        timeline: [
          { year: '2024', event: 'First generated on synthetic media platform', source: 'Diffusion Feed', details: 'Generated using prompt.' },
          { year: '2026', event: 'Submitted to TruthLens AI', source: 'Current Ingestion', details: 'Evaluated by 6-stage pipeline.' }
        ],
        providerInfo: {
          name: this.name,
          version: this.version,
          isDemoMode: true,
          disclaimer: this.disclaimer
        }
      };
    }

    // Genuine Camera Photo Case
    return {
      id: `img-auth-${Date.now().toString().slice(-6)}`,
      mediaName: payload.mediaName,
      mediaType: 'image',
      mimeType: 'image/jpeg',
      fileSize: payload.fileSize || '2.84 MB',
      previewUrl: payload.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      assessment: 'LIKELY AUTHENTIC',
      confidenceScore: 92,
      riskLevel: 'Low',
      evidenceStrength: 'High',
      mediaAuthenticity: 'Likely Authentic',
      contextualCredibility: 'Verified Context',
      findings: analysis.findings,
      exifData: analysis.detectedExif,
      sources: [
        {
          title: 'Verified Digital Photo Archive',
          url: 'https://example.org/photo-wire/2026/original',
          pubDate: 'August 12, 2026',
          similarity: '99.8% Original Match',
          contextNote: 'Matches original unedited camera capture file.'
        }
      ],
      timeline: [
        { year: '2026', event: 'Original Camera Capture', source: 'Digital Camera Hardware', details: 'Captured by camera sensor.' }
      ],
      providerInfo: {
        name: this.name,
        version: this.version,
        isDemoMode: true,
        disclaimer: this.disclaimer
      }
    };
  }

  public async analyzeVideo(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult> {
    return {
      id: `vid-${Date.now().toString().slice(-6)}`,
      mediaName: payload.mediaName,
      mediaType: 'video',
      mimeType: 'video/mp4',
      fileSize: payload.fileSize || '18.9 MB',
      previewUrl: payload.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      assessment: 'NEEDS VERIFICATION',
      confidenceScore: 68,
      riskLevel: 'Medium',
      evidenceStrength: 'Moderate',
      mediaAuthenticity: 'Likely Authentic',
      contextualCredibility: 'Potentially Misleading',
      findings: [
        {
          title: 'Authentic video with misleading claim context',
          evidence: 'Footage matches a press conference recorded in 2022.',
          confidence: '96%',
          simpleExplanation: 'The video footage itself is real, but it was recorded 4 years before the event referenced in recent social media posts.',
          technicalExplanation: 'Perceptual hashing against video archives yields a 99.5% frame match with 2022 broadcast metadata.',
          severity: 'High'
        }
      ],
      sources: [
        {
          title: 'Official Press Conference Video Archive',
          url: 'https://example.org/press-archive/2022/speech',
          pubDate: 'November 10, 2022',
          similarity: '99.5% Perceptual Hash Match',
          contextNote: 'Original press conference recording published 4 years prior.'
        }
      ],
      timeline: [
        { year: '2022', event: 'Original Official Broadcast', source: 'Government Archive', details: 'Full un-edited speech recorded.' }
      ],
      providerInfo: {
        name: this.name,
        version: this.version,
        isDemoMode: true,
        disclaimer: this.disclaimer
      }
    };
  }

  public async analyzeAudio(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult> {
    return {
      id: `aud-${Date.now().toString().slice(-6)}`,
      mediaName: payload.mediaName,
      mediaType: 'audio',
      mimeType: 'audio/wav',
      fileSize: payload.fileSize || '5.12 MB',
      previewUrl: payload.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      assessment: 'LIKELY AUTHENTIC',
      confidenceScore: 92,
      riskLevel: 'Low',
      evidenceStrength: 'High',
      mediaAuthenticity: 'Likely Authentic',
      contextualCredibility: 'Verified Context',
      findings: [
        {
          title: 'Natural vocal harmonics detected',
          evidence: 'Continuous room acoustic reflections across 1.2 kHz - 8 kHz.',
          confidence: '94%',
          simpleExplanation: 'Voice contains natural breath pauses and room reverberations expected in microphone recordings.',
          technicalExplanation: 'Mel-Frequency Cepstral Coefficients (MFCC) distance is within 2.1% of natural human speech baseline.',
          severity: 'Low'
        }
      ],
      sources: [
        {
          title: 'Official Press Briefing Audio Stream',
          url: 'https://example.com/audio/briefing-2026',
          pubDate: 'September 2, 2026',
          similarity: '100% Spectral Match',
          contextNote: 'Direct match with press room microphone feed.'
        }
      ],
      timeline: [
        { year: '2026', event: 'Recorded during live press briefing', source: 'Microphone Line Input', details: 'Direct line audio capture.' }
      ],
      providerInfo: {
        name: this.name,
        version: this.version,
        isDemoMode: true,
        disclaimer: this.disclaimer
      }
    };
  }
}
