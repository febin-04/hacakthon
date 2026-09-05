import { NextRequest, NextResponse } from 'next/server';
import { globalAnalysisService } from '@/services/AnalysisService';
import { AnalysisRequestPayload } from '@/services/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mediaName, mediaType, fileSize, url, presetId } = body;

    const payload: AnalysisRequestPayload = {
      mediaName: mediaName || 'uploaded_media',
      mediaType: (mediaType as any) || 'image',
      fileSize: fileSize || '3.5 MB',
      url: url || '',
      presetId: presetId || '',
    };

    // Process analysis through modular service layer
    const result = await globalAnalysisService.processMediaAnalysis(payload);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forensic Analysis Pipeline Error',
        details: error?.message || 'Unknown processing error',
      },
      { status: 500 }
    );
  }
}
