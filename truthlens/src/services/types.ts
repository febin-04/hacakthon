export type MediaType = 'image' | 'video' | 'audio';

export type AuthenticityAssessment = 
  | 'LIKELY AUTHENTIC' 
  | 'NEEDS VERIFICATION' 
  | 'LIKELY AI-GENERATED'
  | 'LIKELY MANIPULATED'
  | 'INSUFFICIENT EVIDENCE';

export type EvidenceStrength = 'High' | 'Moderate' | 'Low';
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface ForensicFinding {
  title: string;
  evidence: string;
  confidence: string; // e.g. "89%"
  simpleExplanation: string;
  technicalExplanation: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface SuspiciousTimestamp {
  timestamp: string; // e.g. "00:17 - 00:21"
  anomaly: string;
  frameUrl: string;
  confidence: string;
}

export interface SourceEvidence {
  title: string;
  url: string;
  pubDate: string;
  similarity: string;
  contextNote: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
  source: string;
  details: string;
}

export interface WhyWeThinkThis {
  supportingAuthenticityEvidence: string[];
  suggestingAiEvidence: string[];
  filenameAnalysis: {
    filename: string;
    signalType: 'camera' | 'whatsapp' | 'screenshot' | 'aiKeyword' | 'standard';
    note: string;
  };
  metadataBreakdown: {
    hasExif: boolean;
    cameraModel?: string;
    statusNote: string;
  };
  watermarkAnalysis: {
    hasWatermark: boolean;
    watermarkText?: string;
    note: string;
  };
  whyExplanation: string[];
  limitations: string[];
}

export interface ForensicAnalysisResult {
  id: string;
  mediaName: string;
  mediaType: MediaType;
  mimeType: string;
  fileSize?: string;
  previewUrl: string;
  
  // Overall Assessment
  assessment: AuthenticityAssessment;
  confidenceScore: number; // 0 - 100
  riskLevel: RiskLevel;
  evidenceStrength: EvidenceStrength;

  // Media vs Context distinctions
  mediaAuthenticity: 'Likely Authentic' | 'Potentially Manipulated' | 'Needs Verification';
  contextualCredibility: 'Potentially Misleading' | 'Verified Context' | 'Unverified Context';

  // Key findings list
  findings: ForensicFinding[];

  // Why We Think This Breakdown
  whyWeThinkThis?: WhyWeThinkThis;

  // Media specific data
  suspiciousTimestamps?: SuspiciousTimestamp[];
  spectrogramUrl?: string;
  exifData?: Record<string, string>;

  // Source & Context
  sources: SourceEvidence[];
  timeline: TimelineEvent[];

  // Provider Info
  providerInfo: {
    name: string;
    version: string;
    isDemoMode: boolean;
    disclaimer: string;
  };
}

export interface AnalysisRequestPayload {
  mediaName: string;
  mediaType: MediaType;
  fileSize?: string;
  url?: string;
  presetId?: string;
}
