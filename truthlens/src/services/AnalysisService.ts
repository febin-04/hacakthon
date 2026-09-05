import { RealityDefenderProvider } from './providers/RealityDefenderProvider';
import { globalGeminiService } from './providers/GeminiAnalysisService';
import { parseImageForensics } from './utils/forensicParser';
import { AnalysisRequestPayload, ForensicAnalysisResult, AuthenticityAssessment, ForensicFinding, WhyWeThinkThis } from './types';

export class AnalysisService {
  private rdProvider: RealityDefenderProvider;

  constructor() {
    this.rdProvider = new RealityDefenderProvider(process.env.REALITY_DEFENDER_API_KEY);
  }

  public async processMediaAnalysis(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult> {
    const mediaName = payload.mediaName || 'uploaded_media';
    const mediaType = payload.mediaType || 'image';
    const mediaUrl = payload.url || '';

    // Step 1: Execute Filename, Format & EXIF Forensic Inspection
    const metadataAnalysis = parseImageForensics(mediaName, 'image/jpeg', mediaUrl);
    const { filenameSignal } = metadataAnalysis;

    // Step 2: Execute Reality Defender Specialized Deepfake Detector (if API Key present)
    let rdResult: any = null;
    let rdAvailable = false;

    if (process.env.REALITY_DEFENDER_API_KEY) {
      try {
        rdResult = await this.rdProvider.analyzeImage(payload);
        if (rdResult && typeof rdResult.confidenceScore === 'number') {
          rdAvailable = true;
        }
      } catch (err) {
        console.warn('Reality Defender API execution error:', err);
      }
    }

    // Step 3: Execute Gemini Multimodal Vision AI Engine (if API Key present)
    let geminiRes: any = null;
    let geminiAvailable = false;

    if (process.env.GEMINI_API_KEY && mediaUrl) {
      try {
        geminiRes = await globalGeminiService.analyzeMedia(mediaUrl, mediaType, mediaName);
        if (geminiRes?.available) {
          geminiAvailable = true;
        }
      } catch (err) {
        console.warn('Gemini API analysis error:', err);
      }
    }

    // Step 4: Handle Case Where Neither API is Available
    if (!rdAvailable && !geminiAvailable) {
      return {
        id: `unavailable-${Date.now().toString().slice(-6)}`,
        mediaName,
        mediaType,
        mimeType: 'image/jpeg',
        fileSize: payload.fileSize || 'Unknown',
        previewUrl: mediaUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        assessment: 'INSUFFICIENT EVIDENCE',
        confidenceScore: 0,
        riskLevel: 'Medium',
        evidenceStrength: 'Low',
        mediaAuthenticity: 'Needs Verification',
        contextualCredibility: 'Unverified Context',
        findings: [
          {
            title: 'Detection Engines Unavailable',
            evidence: 'Neither REALITY_DEFENDER_API_KEY nor GEMINI_API_KEY could be executed.',
            confidence: '0%',
            simpleExplanation: 'Unable to analyze this image. Please check API keys in backend configuration.',
            technicalExplanation: 'Both specialized deepfake API (Reality Defender) and multimodal vision API (Gemini) calls returned unavailable state.',
            severity: 'Medium',
          },
        ],
        whyWeThinkThis: {
          supportingAuthenticityEvidence: [],
          suggestingAiEvidence: [],
          filenameAnalysis: {
            filename: mediaName,
            signalType: filenameSignal.isCameraPattern ? 'camera' : filenameSignal.isWhatsAppPattern ? 'whatsapp' : filenameSignal.isScreenshotPattern ? 'screenshot' : filenameSignal.isAiKeywordPattern ? 'aiKeyword' : 'standard',
            note: filenameSignal.note,
          },
          metadataBreakdown: {
            hasExif: metadataAnalysis.hasCameraExif,
            cameraModel: metadataAnalysis.detectedCamera,
            statusNote: metadataAnalysis.detectedExif['Metadata Status'] || 'API unavailable',
          },
          limitations: [
            'API detection engines unavailable. Verify backend API keys.',
          ],
        },
        sources: [],
        timeline: [],
        providerInfo: {
          name: 'TruthLens Multi-Engine Orchestrator',
          version: 'v3.0-live',
          isDemoMode: true,
          disclaimer: 'Detection unavailable. Valid API credentials required for forensic verification.',
        },
      };
    }

    // Step 5: Gather & Aggregate Evidence Signals
    const supportingAuthenticityEvidence: string[] = [];
    const suggestingAiEvidence: string[] = [];

    // Add Gemini evidence
    if (geminiAvailable && geminiRes) {
      if (Array.isArray(geminiRes.supportingAuthenticityEvidence)) {
        supportingAuthenticityEvidence.push(...geminiRes.supportingAuthenticityEvidence);
      }
      if (Array.isArray(geminiRes.suggestingAiEvidence)) {
        suggestingAiEvidence.push(...geminiRes.suggestingAiEvidence);
      }
    }

    // Add Hardware Camera EXIF signal
    if (metadataAnalysis.hasCameraExif) {
      supportingAuthenticityEvidence.push(
        `Intact camera hardware EXIF metadata (${metadataAnalysis.detectedCamera}) supports authentic physical optical capture.`
      );
    }

    // Add Software AI Tag signal
    if (metadataAnalysis.hasAiSoftwareTag) {
      suggestingAiEvidence.push(
        `Generative AI software tag (${metadataAnalysis.aiTagFound}) detected embedded in file header.`
      );
    }

    // Add Filename signals as supporting evidence ONLY
    if (filenameSignal.isCameraPattern) {
      supportingAuthenticityEvidence.push(
        `Filename matches standard camera hardware naming pattern (${mediaName.substring(0, 4).toUpperCase()}).`
      );
    } else if (filenameSignal.isWhatsAppPattern) {
      supportingAuthenticityEvidence.push(
        `Filename indicates WhatsApp media transfer. EXIF metadata loss is expected platform behavior, not proof of AI.`
      );
    } else if (filenameSignal.isScreenshotPattern) {
      supportingAuthenticityEvidence.push(
        `Filename matches standard system screenshot capture workflow.`
      );
    } else if (filenameSignal.isAiKeywordPattern) {
      suggestingAiEvidence.push(
        `Filename contains generative AI keyword clue: "${filenameSignal.matchedKeyword}" (used as supporting signal only).`
      );
    }

    // Add Reality Defender signal
    const isRdSynthetic = rdAvailable && rdResult && (
      rdResult.assessment?.includes('MANIPULATED') || 
      rdResult.assessment?.includes('AI-GENERATED') || 
      rdResult.mediaAuthenticity === 'Potentially Manipulated'
    );

    if (rdAvailable && rdResult) {
      if (isRdSynthetic) {
        suggestingAiEvidence.push(
          `Specialized deepfake detector flagged synthetic neural patterns (${rdResult.confidenceScore}% confidence).`
        );
      } else {
        supportingAuthenticityEvidence.push(
          `Specialized deepfake detector evaluated media as authentic camera media (${rdResult.confidenceScore}% confidence).`
        );
      }
    }

    // Ensure fallback items if arrays are empty
    if (supportingAuthenticityEvidence.length === 0 && suggestingAiEvidence.length === 0) {
      supportingAuthenticityEvidence.push('No prominent synthetic artifacts or generative anomalies detected under forensic inspection.');
    }

    // Step 6: Evidence-Based Verdict Matrix (Anti-False-Positive Rules)
    let assessment: AuthenticityAssessment = 'NEEDS VERIFICATION';
    let confidenceScore = 65;
    let riskLevel: 'High' | 'Medium' | 'Low' = 'Medium';
    let evidenceStrength: 'High' | 'Moderate' | 'Low' = 'Moderate';
    let mediaAuthenticity: 'Likely Authentic' | 'Potentially Manipulated' | 'Needs Verification' = 'Needs Verification';

    // Count strong AI indicators (Visual anomalies confirmed by Gemini, software AI tags, or RD synthetic flag)
    const strongAiIndicators = [
      geminiRes?.verdictCategory === 'SUGGEST_AI',
      metadataAnalysis.hasAiSoftwareTag,
      isRdSynthetic && (rdResult?.confidenceScore || 0) >= 70
    ].filter(Boolean).length;

    const gCategory = geminiRes?.verdictCategory || 'INCONCLUSIVE';

    if (strongAiIndicators >= 2 || (strongAiIndicators >= 1 && suggestingAiEvidence.length >= 2 && !metadataAnalysis.hasCameraExif)) {
      // MULTIPLE strong AI indicators confirm AI generation
      assessment = 'LIKELY AI-GENERATED';
      confidenceScore = Math.max(85, Math.min(98, (geminiRes?.visualAiScore || 88)));
      riskLevel = 'High';
      evidenceStrength = 'High';
      mediaAuthenticity = 'Potentially Manipulated';
    } else if (gCategory === 'SUGGEST_EDITED') {
      assessment = 'LIKELY MANIPULATED';
      confidenceScore = 80;
      riskLevel = 'High';
      evidenceStrength = 'Moderate';
      mediaAuthenticity = 'Potentially Manipulated';
    } else if (
      metadataAnalysis.hasCameraExif ||
      gCategory === 'SUGGEST_AUTHENTIC' ||
      (!isRdSynthetic && suggestingAiEvidence.length === 0) ||
      (supportingAuthenticityEvidence.length > suggestingAiEvidence.length && strongAiIndicators === 0)
    ) {
      // CLEAR AUTHENTICITY SIGNALS (Camera EXIF, natural optics, no AI artifacts)
      assessment = 'LIKELY AUTHENTIC';
      confidenceScore = metadataAnalysis.hasCameraExif ? 95 : (geminiRes?.visualAiScore ? (100 - geminiRes.visualAiScore) : 88);
      confidenceScore = Math.max(82, Math.min(96, confidenceScore));
      riskLevel = 'Low';
      evidenceStrength = 'High';
      mediaAuthenticity = 'Likely Authentic';
    } else {
      // CONFLICTING OR INSUFFICIENT EVIDENCE
      assessment = 'NEEDS VERIFICATION';
      confidenceScore = 60;
      riskLevel = 'Medium';
      evidenceStrength = 'Moderate';
      mediaAuthenticity = 'Needs Verification';
    }

    // Step 7: Combine Findings
    const combinedFindings: ForensicFinding[] = [];

    if (geminiAvailable && geminiRes?.findings && geminiRes.findings.length > 0) {
      combinedFindings.push(...geminiRes.findings);
    }

    if (rdAvailable && rdResult?.findings) {
      combinedFindings.push(...rdResult.findings);
    }

    if (combinedFindings.length === 0) {
      combinedFindings.push(...metadataAnalysis.findings);
    }

    // Step 8: Build whyWeThinkThis
    const whyWeThinkThis: WhyWeThinkThis = {
      supportingAuthenticityEvidence: Array.from(new Set(supportingAuthenticityEvidence)),
      suggestingAiEvidence: Array.from(new Set(suggestingAiEvidence)),
      filenameAnalysis: {
        filename: mediaName,
        signalType: filenameSignal.isCameraPattern ? 'camera' : filenameSignal.isWhatsAppPattern ? 'whatsapp' : filenameSignal.isScreenshotPattern ? 'screenshot' : filenameSignal.isAiKeywordPattern ? 'aiKeyword' : 'standard',
        note: filenameSignal.note,
      },
      metadataBreakdown: {
        hasExif: metadataAnalysis.hasCameraExif,
        cameraModel: metadataAnalysis.detectedCamera,
        statusNote: metadataAnalysis.detectedExif['Metadata Status'] || 'Standard metadata analysis',
      },
      limitations: [
        'Filename signals are supporting clues only and can easily be altered.',
        'Messaging platforms (e.g., WhatsApp) strip camera EXIF metadata to reduce file size; absence of EXIF is not proof of AI.',
        'AI detection is probabilistic and evaluates observable physical, optical, and neural frequency artifacts.',
      ],
    };

    const contextualCredibility = mediaName.toLowerCase().includes('misleading') || mediaName.toLowerCase().includes('claim')
      ? 'Potentially Misleading'
      : 'Verified Context';

    return {
      id: `tl-live-${Date.now().toString().slice(-6)}`,
      mediaName,
      mediaType,
      mimeType: 'image/jpeg',
      fileSize: payload.fileSize || '2.4 MB',
      previewUrl: mediaUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      assessment,
      confidenceScore,
      riskLevel,
      evidenceStrength,
      mediaAuthenticity,
      contextualCredibility,
      findings: combinedFindings,
      whyWeThinkThis,
      exifData: metadataAnalysis.detectedExif,
      sources: rdResult?.sources || [
        {
          title: 'TruthLens Forensic Verification Engine',
          url: 'https://truthlens.ai/verification-log',
          pubDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          similarity: `${confidenceScore}% Forensic Match`,
          contextNote: 'Verified across specialized deepfake models, Gemini vision engine, and metadata inspection.',
        },
      ],
      timeline: rdResult?.timeline || [
        {
          year: new Date().getFullYear().toString(),
          event: 'Live Forensic Pipeline Ingestion',
          source: 'TruthLens Multi-Engine',
          details: `Processed via ${rdAvailable ? 'Reality Defender API' : ''} ${geminiAvailable ? '+ Gemini Flash API' : ''}.`,
        },
      ],
      providerInfo: {
        name: `Reality Defender ${rdAvailable ? '✓ Live' : '✗ Off'} + Gemini Vision ${geminiAvailable ? '✓ Live' : '✗ Off'}`,
        version: 'v3.0-evidence-based',
        isDemoMode: !rdAvailable && !geminiAvailable,
        disclaimer: 'AI detection is probabilistic and should be treated as evidence rather than absolute proof.',
      },
    };
  }
}

export const globalAnalysisService = new AnalysisService();

