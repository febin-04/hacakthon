import { AnalysisRequestPayload, ForensicAnalysisResult } from '../types';

export interface ForensicAnalysisProvider {
  name: string;
  version: string;
  isDemoProvider: boolean;

  analyzeImage(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult>;
  analyzeVideo(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult>;
  analyzeAudio(payload: AnalysisRequestPayload): Promise<ForensicAnalysisResult>;
}
