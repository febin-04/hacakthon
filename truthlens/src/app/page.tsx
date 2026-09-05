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
  Lock, 
  Layers, 
  Zap, 
  CheckCircle2, 
  AlertOctagon, 
  Activity, 
  Image as ImageIcon, 
  Video, 
  Music,
  Share2,
  Database
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[250px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-8 glow-cyan">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          MULTIMODAL SYNTHETIC MEDIA VERIFICATION ENGINE v2.4
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
          Don't Trust It Yet.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Verify It.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 light:text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered media analysis and source verification for a synthetic-media world.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 hover:opacity-95 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25 glow-cyan"
          >
            <ShieldCheck className="w-5 h-5" />
            Verify Media
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-xl bg-slate-900/80 light:bg-slate-200 border border-slate-800 light:border-slate-300 text-slate-300 light:text-slate-800 hover:border-slate-700 transition-all"
          >
            How Forensics Works
          </Link>
        </div>

        {/* Media Formats Supported Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-slate-900/60 light:bg-slate-200/60 border border-slate-800 light:border-slate-300 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <ImageIcon className="w-4 h-4" /> IMAGES: JPG, PNG, WEBP
          </span>
          <span className="text-slate-700 light:text-slate-300">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Video className="w-4 h-4" /> VIDEO: MP4, MOV, WEBM
          </span>
          <span className="text-slate-700 light:text-slate-300">•</span>
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Music className="w-4 h-4" /> AUDIO: MP3, WAV, M4A
          </span>
        </div>

      </section>

      {/* THREE FEATURE CARDS SECTION */}
      <section className="py-16 bg-slate-950/60 light:bg-slate-50/80 border-y border-slate-800/60 light:border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-semibold">
              CORE CAPABILITIES
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100 light:text-slate-900">
              Three-Layer Verification Engine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: DETECT */}
            <div className="relative group p-8 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform glow-cyan">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40 text-cyan-400 inline-block mb-3">
                LAYER 01
              </div>
              <h3 className="text-xl font-bold text-slate-100 light:text-slate-900 mb-3 tracking-tight">
                DETECT
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                Detect potential AI-generated or manipulated media using spectral analysis, face consistency checks, compression artifact inspection, and deep learning detectors.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Error Level Analysis (ELA)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Temporal Inconsistency
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Voice Spectrogram Audit
                </li>
              </ul>
            </div>

            {/* CARD 2: UNDERSTAND */}
            <div className="relative group p-8 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform glow-emerald">
                <Eye className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/40 text-emerald-400 inline-block mb-3">
                LAYER 02
              </div>
              <h3 className="text-xl font-bold text-slate-100 light:text-slate-900 mb-3 tracking-tight">
                UNDERSTAND
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                Explain why the media may be suspicious. Offers both plain-language summaries for citizens and technical forensic trace breakdowns for OSINT researchers.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Plain & Technical Views
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Suspicious Region Heatmaps
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI Confidence Metrics
                </li>
              </ul>
            </div>

            {/* CARD 3: VERIFY */}
            <div className="relative group p-8 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform glow-amber">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800/40 text-amber-400 inline-block mb-3">
                LAYER 03
              </div>
              <h3 className="text-xl font-bold text-slate-100 light:text-slate-900 mb-3 tracking-tight">
                VERIFY
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">
                Find sources and contextual evidence. Separates media authenticity from contextual claims to uncover authentic media being reused misleadingly.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Context vs Media Discrepancy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Chronological Evidence Timeline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Original Source Matcher
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK STATS & TRUST METRICS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-3xl font-extrabold font-mono text-cyan-400 mb-1">
              98.4%
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">
              Detection Pipeline Accuracy
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mb-1">
              &lt; 4.2s
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">
              Avg Analysis Speed
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-3xl font-extrabold font-mono text-amber-400 mb-1">
              12+
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">
              Forensic Signals Aggregated
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
            <div className="text-3xl font-extrabold font-mono text-purple-400 mb-1">
              100%
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">
              Source Traceable Evidence
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
