import { NextResponse } from 'next/server';
import { runEvaluationDataset } from '@/lib/suite-runner';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = await runEvaluationDataset();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error running evaluation benchmark:', error);
    return NextResponse.json(
      { error: 'Evaluation metrics not available.' },
      { status: 500 }
    );
  }
}
