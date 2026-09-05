'use client';

import React from 'react';
import { X, Download, ShieldCheck, Printer, FileText, CheckCircle2, AlertTriangle, HelpCircle, Clock, Globe } from 'lucide-react';
import { ForensicAnalysisResult } from '@/services/types';

interface ReportModalProps {
  data: ForensicAnalysisResult;
  isOpen: boolean;
  onClose: () => void;
}

export default function VerificationReportModal({ data, isOpen, onClose }: ReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 font-mono">
        
        {/* Header Bar */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">
                Official Verification Report
              </h2>
              <p className="text-[11px] text-slate-400">
                TruthLens AI Forensic Engine • Report ID: {data.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div id="printable-report" className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Metadata Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">File Name</span>
              <span className="text-slate-200 font-bold truncate block">{data.mediaName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Media Type</span>
              <span className="text-cyan-400 font-bold uppercase">{data.mediaType} ({data.mimeType})</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Analysis Timestamp</span>
              <span className="text-slate-200">{new Date().toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Pipeline Status</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>
          </div>

          {/* Assessment Overview Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-semibold">OVERALL ASSESSMENT</span>
              <span className="text-xs px-3 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                Risk Level: {data.riskLevel}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
              {data.assessment}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CONFIDENCE SCORE</span>
                <span className="text-lg font-bold text-cyan-400">{data.confidenceScore}%</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">EVIDENCE STRENGTH</span>
                <span className="text-lg font-bold text-slate-200">{data.evidenceStrength}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">RISK CLASSIFICATION</span>
                <span className="text-lg font-bold text-amber-400">{data.riskLevel}</span>
              </div>
            </div>
          </div>

          {/* AI Findings Summary */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase text-cyan-400 font-bold tracking-wider">
              Itemized AI & Forensic Findings ({data.findings.length})
            </h3>
            <div className="space-y-3">
              {data.findings.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>#{i + 1} {f.title}</span>
                    <span className="text-cyan-400">Confidence: {f.confidence}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{f.simpleExplanation}</p>
                  <p className="text-[11px] text-slate-500 italic">Technical signal: {f.technicalExplanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Context & Source Verification */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase text-emerald-400 font-bold tracking-wider">
              Source & Context Verification
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">MEDIA AUTHENTICITY</span>
                <span className="text-cyan-400 font-bold">{data.mediaAuthenticity}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">CONTEXTUAL CREDIBILITY</span>
                <span className="text-amber-400 font-bold">{data.contextualCredibility}</span>
              </div>
            </div>
          </div>

          {/* Limitations & Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs leading-relaxed space-y-1">
            <span className="font-bold uppercase block text-[10px]">Analysis Limitations & Standard Disclaimer</span>
            <p>
              AI-generated media detection is probabilistic. TruthLens AI provides evidence metrics and risk indicators, not absolute legal proof of authenticity.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
