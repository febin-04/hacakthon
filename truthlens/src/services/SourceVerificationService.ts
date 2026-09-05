import { SourceEvidence } from './types';

export interface ContextVerificationResult {
  mediaAuthenticityStatus: 'Likely Authentic' | 'Potentially Manipulated' | 'Needs Verification';
  contextualCredibilityStatus: 'Verified Context' | 'Potentially Misleading' | 'Unverified Context';
  contextExplanation: string;
  matchedSources: SourceEvidence[];
  hasReliableMatch: boolean;
}

export interface SourceVerificationProvider {
  name: string;
  verifySourceAndContext(mediaName: string, mediaType: string): Promise<ContextVerificationResult>;
}

export class ModularSourceVerificationProvider implements SourceVerificationProvider {
  public name = 'TruthLens Web Archive & Perceptual Hash Matcher';

  public async verifySourceAndContext(mediaName: string, mediaType: string): Promise<ContextVerificationResult> {
    const isVideoDemo = mediaName.includes('speech') || mediaName.includes('misleading') || mediaType === 'video';
    const isNoMatchDemo = mediaName.includes('unknown_unmatched');

    if (isNoMatchDemo) {
      return {
        mediaAuthenticityStatus: 'Needs Verification',
        contextualCredibilityStatus: 'Unverified Context',
        contextExplanation: 'No prior publications or reverse media matches were found in public web archives.',
        matchedSources: [],
        hasReliableMatch: false,
      };
    }

    if (isVideoDemo) {
      return {
        mediaAuthenticityStatus: 'Likely Authentic',
        contextualCredibilityStatus: 'Potentially Misleading',
        contextExplanation: 
          'The media appears consistent with an existing source, but the available source indicates that the media was published before the event described in the current claim.',
        matchedSources: [
          {
            title: 'Official Press Conference Broadcast Archive',
            url: 'https://example.org/press-archive/2022/speech',
            pubDate: 'November 10, 2022',
            similarity: '99.5% Perceptual Hash Match',
            contextNote: 'Original press conference recording published 4 years prior to current social media claim.'
          },
          {
            title: 'National Wire Service Video Repository',
            url: 'https://example.com/wire/video-2022-speech',
            pubDate: 'November 11, 2022',
            similarity: '98.8% Keyframe Match',
            contextNote: 'Unedited 45-minute raw archival footage.'
          }
        ],
        hasReliableMatch: true,
      };
    }

    // Image Deepfake demo case
    return {
      mediaAuthenticityStatus: 'Potentially Manipulated',
      contextualCredibilityStatus: 'Potentially Misleading',
      contextExplanation: 
        'Reverse image search matched an earlier synthetic render uploaded to an AI graphics repository. The subject does not correspond to an actual person.',
      matchedSources: [
        {
          title: 'AI Generative Portrait Repository',
          url: 'https://example.com/archive/ai-portraits/9941',
          pubDate: 'March 14, 2024',
          similarity: '98.2% Feature Vector Match',
          contextNote: 'Originally uploaded as an AI test render matching Midjourney v6 parameters.'
        }
      ],
      hasReliableMatch: true,
    };
  }
}

export const globalSourceVerificationService = new ModularSourceVerificationProvider();
