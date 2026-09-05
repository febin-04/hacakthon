'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, ExternalLink, Lock, FileText, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 light:bg-slate-100 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Disclaimers & Trust Banner */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 mb-10">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold uppercase tracking-wider text-amber-200">Probabilistic Assessment Notice:</span>{' '}
            AI-generated media detection is probabilistic. TruthLens AI provides evidence and risk indicators based on multimodal forensic algorithms, not absolute proof of authenticity. False positives and false negatives may occur.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-lg text-slate-100 light:text-slate-900">TruthLens AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multimodal media forensic engine designed for journalists, OSINT researchers, and citizens to verify synthetic or manipulated digital media.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              System Status: Operational
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 light:text-slate-800 font-semibold">
              Pipeline Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Image Deepfake Analysis</Link></li>
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Video Temporal Inconsistency</Link></li>
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Audio Voice Cloning Detection</Link></li>
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Metadata & EXIF Extraction</Link></li>
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Reverse Source Verification</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 light:text-slate-800 font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home Landing</Link></li>
              <li><Link href="/analyze" className="hover:text-cyan-400 transition-colors">Verify Media Interface</Link></li>
              <li><Link href="/evaluation" className="hover:text-cyan-400 font-semibold text-cyan-400 transition-colors">Evaluation Benchmark</Link></li>
              <li><Link href="/results" className="hover:text-cyan-400 transition-colors">Sample Verification Report</Link></li>
              <li><Link href="/history" className="hover:text-cyan-400 transition-colors">Analysis History Log</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">Forensics Methodology & Limits</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 light:text-slate-800 font-semibold">
              Security & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan-400" /> Private Local Processing</li>
              <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> C2PA Metadata Standard Support</li>
              <li className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Open Source Forensics</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TruthLens AI. Built for Digital Media Trust & Integrity.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">API Integration</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
