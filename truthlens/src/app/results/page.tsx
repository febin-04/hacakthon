'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Search, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  ChevronRight, 
  Send, 
  Cpu, 
  Info,
  Layers,
  ArrowLeft,
  Volume2,
  Video,
  AlertCircle,
  BookOpen,
  FileCode,
  Globe,
  Link2,
  FileQuestion,
  Bot
} from 'lucide-react';
import { ForensicAnalysisResult, ForensicFinding } from '@/services/types';
import EvidenceTimeline from '@/components/EvidenceTimeline';
import VerificationReportModal from '@/components/VerificationReportModal';

const RESULTS_DATABASE: Record<string, ForensicAnalysisResult> = {
  'image-demo-01': {
    id: 'image-demo-01',
    mediaName: 'synthetic_portrait_deepfake.png',
    mediaType: 'image',
    mimeType: 'image/png',
    fileSize: '3.42 MB',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    assessment: 'LIKELY AI-GENERATED',
    confidenceScore: 87,
    riskLevel: 'High',
    evidenceStrength: 'Moderate',
    mediaAuthenticity: 'Potentially Manipulated',
    contextualCredibility: 'Potentially Misleading',
    findings: [
      {
        title: 'Unusual facial texture detected',
        evidence: 'High-frequency noise spectrum mismatch around ear lobes and hair outline.',
        confidence: '89%',
        simpleExplanation: 'The facial skin texture exhibits over-smoothed generative patterns common in AI diffusion models.',
        technicalExplanation: 'Spatial Laplacian frequency residual shows 0.82 correlation with Stable Diffusion v2.1 noise profiles.',
        severity: 'High'
      },
      {
        title: 'Lighting inconsistency detected',
        evidence: 'Catchlight reflection angle in left iris is 42°, right iris is 18°.',
        confidence: '84%',
        simpleExplanation: 'Light reflections inside the subject\'s eyes do not originate from a single consistent light source.',
        technicalExplanation: 'Specular reflection vector estimation yields a dual light-vector angular discrepancy of 24 degrees.',
        severity: 'Medium'
      }
    ],
    whyWeThinkThis: {
      supportingAuthenticityEvidence: [],
      suggestingAiEvidence: [
        'Facial skin texture exhibits over-smoothed generative patterns common in AI diffusion models.',
        'Catchlight reflections inside iris indicate inconsistent dual light-vector angles.'
      ],
      filenameAnalysis: {
        filename: 'synthetic_portrait_deepfake.png',
        signalType: 'aiKeyword',
        note: 'Filename contains AI clue "synthetic". Used as supporting evidence only.'
      },
      metadataBreakdown: {
        hasExif: false,
        statusNote: 'Missing EXIF metadata. Stripped during web upload or generation.'
      },
      limitations: [
        'Filename signals are supporting clues only and can easily be altered.',
        'AI detection is probabilistic and evaluates observable physical and neural artifacts.'
      ]
    },
    sources: [
      {
        title: 'AI Generative Portrait Repository',
        url: 'https://example.com/archive/ai-portraits/9941',
        pubDate: 'March 14, 2024',
        similarity: '98.2% Feature Vector Match',
        contextNote: 'Originally uploaded as an AI test render matching Midjourney v6 parameters.'
      }
    ],
    timeline: [
      { year: '2024', event: 'First generated on synthetic media platform', source: 'Diffusion Feed', details: 'Generated using portrait prompt.' },
      { year: '2026', event: 'Submitted to TruthLens AI', source: 'Current Ingestion', details: 'Evaluated by multi-engine pipeline.' }
    ],
    providerInfo: {
      name: 'TruthLens Multimodal Forensics Engine',
      version: 'v3.0-engine',
      isDemoMode: true,
      disclaimer: 'AI detection is probabilistic and should be treated as evidence rather than absolute proof.'
    }
  },

  'video-demo-02': {
    id: 'video-demo-02',
    mediaName: 'political_speech_misleading_clip.mp4',
    mediaType: 'video',
    mimeType: 'video/mp4',
    fileSize: '18.9 MB',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
        title: 'Official Press Conference Broadcast Archive',
        url: 'https://example.org/press-archive/2022/speech',
        pubDate: 'November 10, 2022',
        similarity: '99.5% Perceptual Hash Match',
        contextNote: 'Original press conference recording published 4 years prior to current social media claim.'
      }
    ],
    timeline: [
      { year: '2022', event: 'Original Official Broadcast', source: 'Government Archive', details: 'Full un-edited speech recorded.' }
    ],
    providerInfo: {
      name: 'TruthLens Multimodal Forensics Engine',
      version: 'v3.0-engine',
      isDemoMode: true,
      disclaimer: 'AI detection is probabilistic and should be treated as evidence rather than absolute proof.'
    }
  },

  'audio-demo-03': {
    id: 'audio-demo-03',
    mediaName: 'ceo_voice_clone_call.wav',
    mediaType: 'audio',
    mimeType: 'audio/wav',
    fileSize: '5.12 MB',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
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
      name: 'TruthLens Multimodal Forensics Engine',
      version: 'v3.0-engine',
      isDemoMode: true,
      disclaimer: 'AI detection is probabilistic and should be treated as evidence rather than absolute proof.'
    }
  }
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id') || 'image-demo-01';
  const baseData = RESULTS_DATABASE[resultId] || RESULTS_DATABASE['image-demo-01'];

  const [data, setData] = useState<ForensicAnalysisResult>(baseData);
  const [activeTab, setActiveTab] = useState<'simple' | 'technical'>('simple');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Dynamic User Upload & API Analysis Check from Session Storage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('truthlens_user_uploaded_media');
      if (stored) {
        const uploaded = JSON.parse(stored);
        
        // If API returned a dynamically calculated analysis result, use it!
        if (uploaded.apiResult) {
          setData({
            ...uploaded.apiResult,
            previewUrl: uploaded.previewUrl || uploaded.apiResult.previewUrl,
            mediaName: uploaded.mediaName || uploaded.apiResult.mediaName,
            fileSize: uploaded.sizeFormatted || uploaded.apiResult.fileSize,
          });
        } else if (uploaded.previewUrl) {
          setData((prev) => ({
            ...prev,
            mediaName: uploaded.mediaName || prev.mediaName,
            mediaType: uploaded.mediaType || prev.mediaType,
            mimeType: uploaded.mimeType || prev.mimeType,
            fileSize: uploaded.sizeFormatted || prev.fileSize,
            previewUrl: uploaded.previewUrl,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [searchParams]);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello! I am your TruthLens Verification Assistant. I answer questions strictly using the forensic findings and source evidence for "${data.mediaName}". How can I help you understand this analysis?`
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  const handleSendQuestion = (questionText?: string) => {
    const q = questionText || inputQuestion;
    if (!q.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: q }]);
    if (!questionText) setInputQuestion('');

    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('why') && (lower.includes('flagged') || lower.includes('reach'))) {
        const list = data.findings.map((f, i) => `${i + 1}. ${f.title}: ${f.simpleExplanation}`).join('\n');
        reply = `This media received an assessment of "${data.assessment}" (${data.confidenceScore}% confidence) due to the following findings:\n\n${list}`;
      } 
      else if (lower.includes('evidence') && lower.includes('support')) {
        const list = data.findings.map((f) => `• ${f.title} (Signal: ${f.evidence}, Confidence: ${f.confidence})`).join('\n');
        reply = `The supporting evidence produced by our pipeline includes:\n\n${list}`;
      } 
      else if (lower.includes('verify next') || lower.includes('next step')) {
        reply = `Based on the findings for "${data.mediaName}", we recommend:\n1. Cross-checking reverse media matches against original archive dates.\n2. Requesting raw camera EXIF metadata.\n3. Verifying official press wire statements.`;
      } 
      else if (lower.includes('where') && (lower.includes('published') || lower.includes('appear') || lower.includes('source'))) {
        if (data.sources.length > 0) {
          const s = data.sources[0];
          reply = `The earliest matched source found in public archives is "${s.title}" published on ${s.pubDate} at URL: ${s.url}. Context note: ${s.contextNote}`;
        } else {
          reply = 'No reliable source match was found in public web archives.';
        }
      } 
      else if (lower.includes('trust') || lower.includes('can i trust')) {
        reply = `Our system rates this content as "${data.assessment}" with a Risk Level of "${data.riskLevel}" and Confidence Score of ${data.confidenceScore}%. However, AI detection is probabilistic and should be treated as evidence rather than absolute proof.`;
      } 
      else if (lower.includes('limitation') || lower.includes('limit')) {
        reply = `Analysis Limitations:\n• AI detection is probabilistic; false positives and false negatives may occur.\n• Metadata may be stripped by platforms.\n• Context verification depends on publicly indexed web archives.`;
      } 
      else {
        reply = 'There is not enough evidence to determine this reliably.';
      }

      setChatMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
    }, 450);
  };

  const getAssessmentBadge = (assessment: string) => {
    const upper = (assessment || '').toUpperCase();
    if (upper.includes('AI-GENERATED') || upper.includes('MANIPULATED')) {
      return {
        bg: 'bg-rose-950/40 border-rose-500/40 text-rose-300',
        badge: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
        glow: 'glow-rose',
        icon: AlertTriangle
      };
    } else if (upper.includes('VERIFICATION') || upper.includes('NEEDS')) {
      return {
        bg: 'bg-amber-950/40 border-amber-500/40 text-amber-300',
        badge: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
        glow: 'glow-amber',
        icon: HelpCircle
      };
    } else if (upper.includes('UNAVAILABLE') || upper.includes('INSUFFICIENT')) {
      return {
        bg: 'bg-slate-900/60 border-slate-700/50 text-slate-300',
        badge: 'bg-slate-800/80 text-slate-300 border-slate-600/50',
        glow: 'glow-cyan',
        icon: HelpCircle
      };
    } else {
      return {
        bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
        badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
        glow: 'glow-emerald',
        icon: CheckCircle2
      };
    }
  };

  const style = getAssessmentBadge(data.assessment);
  const AssessmentIcon = style.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Verification Report Modal */}
      <VerificationReportModal
        data={data}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Primary Pipeline Flow Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">1. UPLOAD</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">2. ANALYZE</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">3. DETECT</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">4. EXPLAIN</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 font-bold">5. VERIFY</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">6. REPORT</span>
        </div>
        <span className="text-[10px] text-cyan-400 font-semibold hidden lg:inline">TruthLens Pipeline v3.0</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link href="/analyze" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Media Upload
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
            Verification Report: {data.mediaName}
          </h1>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg glow-cyan"
        >
          <FileText className="w-4 h-4" /> Generate Verification Report
        </button>
      </div>

      {/* OVERALL ASSESSMENT CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Media Preview Thumbnail */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-4 flex flex-col justify-between">
          <div className="relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden min-h-[260px] flex items-center justify-center">
            {data.mediaType === 'image' && (
              <img src={data.previewUrl} alt="User Uploaded Preview" className="max-h-72 rounded-lg object-contain" />
            )}
            {data.mediaType === 'video' && (
              <video src={data.previewUrl} controls className="w-full max-h-72 rounded-lg" />
            )}
            {data.mediaType === 'audio' && (
              <div className="w-full p-6 text-center space-y-4">
                <Volume2 className="w-12 h-12 text-amber-400 mx-auto" />
                <audio src={data.previewUrl} controls className="w-full" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Type: <strong className="text-slate-200 uppercase">{data.mediaType}</strong></span>
            <span>Size: <strong className="text-slate-200">{data.fileSize}</strong></span>
          </div>
        </div>

        {/* Assessment Result */}
        <div className={`lg:col-span-7 rounded-2xl border p-8 ${style.bg} ${style.glow} flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> AUTHENTICITY ASSESSMENT
              </span>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${style.badge} font-bold`}>
                Risk Level: {data.riskLevel}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <AssessmentIcon className="w-10 h-10" />
              </div>
              <div>
                <div className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider mb-1 bg-slate-950/90 border border-slate-700">
                  VERDICT: {data.assessment.includes('AUTHENTIC') ? '🟢 LIKELY REAL MEDIA' : (data.assessment.includes('AI') || data.assessment.includes('MANIPULATED')) ? '🔴 LIKELY FAKE / AI-GENERATED' : data.assessment.includes('INSUFFICIENT') ? '⚪ INSUFFICIENT EVIDENCE' : '🟡 NEEDS VERIFICATION'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono">
                  {data.assessment}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Evaluated via Reality Defender API + Gemini Vision Engine
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-2xl font-extrabold text-cyan-400">{data.confidenceScore}%</div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Confidence Score</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xl font-bold text-slate-200">{data.evidenceStrength}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Evidence Strength</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xl font-bold text-amber-400">{data.riskLevel}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-1">Risk Level</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Disclaimer:</strong> AI detection is probabilistic and should be treated as evidence rather than absolute proof.
            </span>
          </div>
        </div>

      </div>

      {/* WHY WE THINK THIS (EVIDENCE BREAKDOWN SECTION) */}
      {data.whyWeThinkThis && (
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              Why We Think This (Evidence Breakdown)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Transparent synthesis of physical optics, visual neural patterns, filename clues, and EXIF metadata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supporting Authenticity Evidence */}
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Evidence Supporting Authenticity
              </div>
              {data.whyWeThinkThis.supportingAuthenticityEvidence.length > 0 ? (
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {data.whyWeThinkThis.supportingAuthenticityEvidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs font-mono text-slate-400 italic">No specific authentic optical signals observed.</p>
              )}
            </div>

            {/* Suggesting AI / Manipulation Evidence */}
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm uppercase">
                <AlertTriangle className="w-4 h-4" />
                Evidence Suggesting AI / Manipulation
              </div>
              {data.whyWeThinkThis.suggestingAiEvidence.length > 0 ? (
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {data.whyWeThinkThis.suggestingAiEvidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 p-3 rounded-xl border border-emerald-800/50">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>No observable synthetic generative artifacts or AI signatures detected.</span>
                </div>
              )}
            </div>
          </div>

          {/* Filename & EXIF Metadata Analysis Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Filename Analysis */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>Filename Signal Analysis</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {data.whyWeThinkThis.filenameAnalysis.signalType.toUpperCase()}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-200">
                "{data.whyWeThinkThis.filenameAnalysis.filename}"
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {data.whyWeThinkThis.filenameAnalysis.note}
              </p>
            </div>

            {/* Metadata Breakdown */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>EXIF Metadata Status</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  data.whyWeThinkThis.metadataBreakdown.hasExif 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}>
                  {data.whyWeThinkThis.metadataBreakdown.hasExif ? 'INTACT EXIF' : 'NO EXIF'}
                </span>
              </div>
              {data.whyWeThinkThis.metadataBreakdown.cameraModel && (
                <p className="text-xs font-mono text-emerald-300 font-bold">
                  Camera: {data.whyWeThinkThis.metadataBreakdown.cameraModel}
                </p>
              )}
              <p className="text-xs text-slate-400 leading-relaxed">
                {data.whyWeThinkThis.metadataBreakdown.statusNote}
              </p>
            </div>
          </div>

          {/* Limitations Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
            <div className="text-amber-400 font-semibold flex items-center gap-1.5 uppercase text-[10px]">
              <Info className="w-3.5 h-3.5" /> Pipeline Limitations & Context Safeguards
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              {data.whyWeThinkThis.limitations.map((lim, i) => (
                <li key={i}>{lim}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* EXPLAINABLE AI SECTION */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              Why We Reached This Assessment
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Transparent breakdown of every individual finding produced by the analysis system.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('simple')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'simple' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Simple Explanation
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'technical' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Technical Details
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {data.findings.map((finding: ForensicFinding, idx: number) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                    #{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 font-mono">
                    {finding.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Signal Confidence:</span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 font-bold">
                    {finding.confidence}
                  </span>
                </div>
              </div>

              {activeTab === 'simple' ? (
                <div className="space-y-1 pl-10">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    Simple Explanation
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {finding.simpleExplanation}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 pl-10">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Technical Explanation & Parameters
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {finding.technicalExplanation}
                  </p>
                </div>
              )}

              <div className="pl-10 pt-2 border-t border-slate-900/60 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-slate-500 uppercase text-[10px]">Evidence Signal:</span>
                <span className="text-slate-300 italic">{finding.evidence}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOURCE & CONTEXT VERIFICATION SECTION */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-8 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-400" />
            Source & Context Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold">
              MEDIA AUTHENTICITY: {data.mediaAuthenticity}
            </span>
            <p className="text-xs text-slate-400">Evaluates pixel and keyframe signal integrity.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold">
              CONTEXTUAL CREDIBILITY: {data.contextualCredibility}
            </span>
            <p className="text-xs text-slate-400">Evaluates publication dates and original source context.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Link2 className="w-4 h-4 text-cyan-400" /> Verified Archival Sources ({data.sources.length})
          </h3>

          {data.sources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {data.sources.map((source, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-100 font-mono">{source.title}</h4>
                    <span className="text-xs font-mono text-emerald-300 font-bold">{source.similarity}</span>
                  </div>
                  <a href={source.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 font-mono hover:underline block">
                    {source.url}
                  </a>
                  <p className="text-xs text-slate-300 font-mono">{source.contextNote}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs font-mono text-slate-400">
              No reliable source match was found.
            </div>
          )}
        </div>
      </section>

      {/* VISUAL EVIDENCE TIMELINE SECTION */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 shadow-xl">
        <EvidenceTimeline timeline={data.timeline} mediaName={data.mediaName} />
      </section>

      {/* TRUTHLENS VERIFICATION ASSISTANT SECTION */}
      <section className="rounded-2xl bg-slate-900 border border-cyan-500/30 p-8 space-y-6 shadow-xl shadow-cyan-500/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold font-mono text-slate-100 flex items-center gap-2">
              <Bot className="w-6 h-6 text-cyan-400" />
              TruthLens Verification Assistant
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Grounded AI assistant answering questions strictly based on the displayed forensic evidence.
            </p>
          </div>

          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            EVIDENCE-GROUNDED
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Suggested Verification Questions:
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <button onClick={() => handleSendQuestion("Why was this media flagged?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "Why was this media flagged?"
            </button>
            <button onClick={() => handleSendQuestion("What evidence supports this result?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "What evidence supports this result?"
            </button>
            <button onClick={() => handleSendQuestion("What should I verify next?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "What should I verify next?"
            </button>
            <button onClick={() => handleSendQuestion("Where was this media previously published?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "Where was this media previously published?"
            </button>
            <button onClick={() => handleSendQuestion("Can I trust this content?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "Can I trust this content?"
            </button>
            <button onClick={() => handleSendQuestion("What are the limitations of this analysis?")} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300">
              "What are the limitations of this analysis?"
            </button>
          </div>
        </div>

        <div className="h-64 overflow-y-auto p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-sans text-xs">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-500">
                {msg.sender === 'assistant' ? (
                  <>
                    <Bot className="w-3 h-3 text-cyan-400" />
                    <span>TruthLens Assistant</span>
                  </>
                ) : (
                  <span>You</span>
                )}
              </div>
              <div className={`max-w-xl p-4 rounded-2xl whitespace-pre-line leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask TruthLens Verification Assistant a question..."
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
            className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={() => handleSendQuestion()}
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-md glow-cyan"
          >
            <Send className="w-4 h-4" /> Ask Assistant
          </button>
        </div>
      </section>

    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-cyan-400">Loading Forensic Results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
