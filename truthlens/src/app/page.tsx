'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  ArrowRight, 
  Cpu, 
  Eye, 
  Layers, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Image as ImageIcon, 
  Video, 
  Music,
  Share2,
  FileCheck,
  Upload,
  BarChart2,
  Lock,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[250px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtitle / Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-8 glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>TRUTHLENS AI &bull; DETECT. UNDERSTAND. VERIFY.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 mb-6 max-w-4xl mx-auto leading-[1.1]">
          Evidence-Based Forensics for{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Synthetic Media
          </span>
        </h1>

        {/* Simple Language Explanation */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          TruthLens AI detects potentially AI-generated or manipulated media, explains why it was flagged with visible technical evidence, and verifies original sources—without blindly guessing or relying on missing metadata.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 hover:opacity-95 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25 glow-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Verify Media Now"
          >
            <ShieldCheck className="w-5 h-5" />
            Verify Media Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/evaluation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="View Evaluation Metrics"
          >
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            View Benchmark Evaluation
          </Link>
        </div>

        {/* Media Formats Supported */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <ImageIcon className="w-4 h-4" /> IMAGES: JPG, PNG, WEBP
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Video className="w-4 h-4" /> VIDEO: MP4, MOV, WEBM
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Music className="w-4 h-4" /> AUDIO: MP3, WAV, M4A
          </span>
        </div>

      </section>

      {/* CLEARLY VISIBLE "HOW IT WORKS" SECTION */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
              FORENSIC PIPELINE FLOW
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100">
              How It Works
            </p>
            <p className="text-xs text-slate-400 font-mono mt-2">
              Transparent, evidence-driven multi-stage verification
            </p>
          </div>

          {/* Workflow Stepper */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center font-mono">
            
            {/* Step 1: Upload */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-cyan-300">1. UPLOAD</div>
              <div className="text-[10px] text-slate-400 mt-1">Image, Video, Audio</div>
            </div>

            {/* Step 2: Analyze */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-teal-950 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-teal-300">2. ANALYZE</div>
              <div className="text-[10px] text-slate-400 mt-1">Parallel Feature Scan</div>
            </div>

            {/* Step 3: Collect Evidence */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-300">3. COLLECT EVIDENCE</div>
              <div className="text-[10px] text-slate-400 mt-1">EXIF, Watermark, Vision</div>
            </div>

            {/* Step 4: Verify */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-300">4. VERIFY</div>
              <div className="text-[10px] text-slate-400 mt-1">Source & Context Match</div>
            </div>

            {/* Step 5: Explain */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-purple-300">5. EXPLAIN</div>
              <div className="text-[10px] text-slate-400 mt-1">Why Did TruthLens Conclude</div>
            </div>

            {/* Step 6: Result */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-cyan-300">6. RESULT</div>
              <div className="text-[10px] text-slate-400 mt-1">Taxonomy Assessment</div>
            </div>

          </div>
        </div>
      </section>

      {/* DISCOVERABLE FEATURE BADGES SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
            IMPLEMENTED FORENSIC CAPABILITIES
          </h2>
          <p className="text-2xl font-bold text-slate-100">
            Integrated Forensic Signal Stack
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">AI DETECTION</div>
              <div className="text-[10px] text-slate-400">Gemini + Specialized Models</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">METADATA ANALYSIS</div>
              <div className="text-[10px] text-slate-400">EXIF Camera Hardware Scan</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">WATERMARK ANALYSIS</div>
              <div className="text-[10px] text-slate-400">OCR & Generative Tag Scan</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center gap-3">
            <Activity className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">FORENSIC ANALYSIS</div>
              <div className="text-[10px] text-slate-400">Error Level Analysis (ELA)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 flex items-center gap-3">
            <Share2 className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">SOURCE VERIFICATION</div>
              <div className="text-[10px] text-slate-400">Original Publication Matcher</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center gap-3">
            <Eye className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">CONTEXT VERIFICATION</div>
              <div className="text-[10px] text-slate-400">Claim vs Media Timeline</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center gap-3">
            <Layers className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">EVIDENCE FUSION</div>
              <div className="text-[10px] text-slate-400">8-Signal Decision Engine</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100">SECURITY & ACCESSIBILITY</div>
              <div className="text-[10px] text-slate-400">Isolated API Keys & WCAG AA</div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL METRICS SUMMARY */}
      <section className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-bold font-mono text-cyan-400">93.3%</div>
              <div className="text-[10px] font-mono text-slate-400">Evaluated Accuracy</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-bold font-mono text-emerald-400">34 / 34</div>
              <div className="text-[10px] font-mono text-slate-400">Automated Tests Passed</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-bold font-mono text-amber-400">8</div>
              <div className="text-[10px] font-mono text-slate-400">Independent Signals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-purple-400">
              <div className="text-2xl font-bold font-mono text-purple-400">&lt; 3.0s</div>
              <div className="text-[10px] font-mono text-slate-400 font-bold">Avg Processing Time</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
