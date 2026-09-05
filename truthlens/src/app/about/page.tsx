'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Cpu, 
  Eye, 
  Share2, 
  Layers, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Database,
  Lock
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" /> DIGITAL MEDIA TRUST METHODOLOGY
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
          About TruthLens AI
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          TruthLens AI is an open-standard media verification platform engineered for journalists, OSINT researchers, and citizens navigating a world saturated with generative synthetic media.
        </p>
      </div>

      {/* CORE DISCLAIMS & TRANSPARENCY PRINCIPLES */}
      <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs leading-relaxed space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          Probabilistic AI Detection Disclaimer
        </div>
        <p>
          AI-generated media detection is fundamentally probabilistic. TruthLens AI provides evidence scores, risk ratings, and explainable forensic artifacts—it cannot provide absolute, 100% legal proof of authenticity.
        </p>
        <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-amber-300">
          <li><strong>False Positives:</strong> Heavy compression or aggressive re-encoding can trigger false manipulation flags.</li>
          <li><strong>False Negatives:</strong> Rapidly evolving generative models may occasionally bypass specific spatial detectors.</li>
          <li><strong>Source Limits:</strong> Context verification relies on available public web indices and archives.</li>
        </ul>
      </div>

      {/* 6-STAGE ANALYSIS PIPELINE ARCHITECTURE */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider mb-1">
            TECHNICAL ARCHITECTURE
          </h2>
          <h3 className="text-2xl font-bold text-slate-100 font-mono">
            The 6-Stage Forensic Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold">STAGE 01 — MEDIA PREPROCESSING</div>
            <h4 className="text-base font-bold text-slate-200">Format & Spectral Standardization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strips container headers, inspects raw EXIF metadata tags, extracts audio mel-spectrograms, and decomposes video files into representative temporal frames.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold">STAGE 02 — FORENSIC SIGNAL EXTRACTION</div>
            <h4 className="text-base font-bold text-slate-200">Spatial & Error Level Analysis</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes Error Level Analysis (ELA), frequency domain noise variance, Dlib facial landmark symmetry, and optical flow vector continuities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold">STAGE 03 — MULTIMODAL AI DETECTORS</div>
            <h4 className="text-base font-bold text-slate-200">Neural Generative Pattern Spotting</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates high-frequency residual noise patterns unique to generative AI diffusion models (Midjourney, Stable Diffusion, Sora) and voice cloners (ElevenLabs).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-amber-400 font-bold">STAGE 04 — SOURCE & CONTEXT TRACEABILITY</div>
            <h4 className="text-base font-bold text-slate-200">Reverse Archival Indexing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-references perceptual hashes against historical news databases to determine publication timelines and flag out-of-context narrative claims.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-purple-400 font-bold">STAGE 05 — EVIDENCE AGGREGATION</div>
            <h4 className="text-base font-bold text-slate-200">Weighted Signal Aggregator</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Combines independent signals into a cohesive risk assessment rather than relying on a single opaque black-box AI score.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold">STAGE 06 — EXPLAINABLE AI REPORTING</div>
            <h4 className="text-base font-bold text-slate-200">Dual-Audience Explanation Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates both accessible plain-language finding summaries for everyday citizens and rigorous technical parameter metrics for forensic investigators.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-500/40 p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold font-mono text-slate-100">
          Ready to Verify Digital Media?
        </h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Start analyzing suspicious images, videos, or audio recordings using TruthLens AI's verification pipeline.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all glow-cyan"
        >
          <ShieldCheck className="w-4 h-4" /> Start Verification Now
        </Link>
      </div>

    </div>
  );
}
