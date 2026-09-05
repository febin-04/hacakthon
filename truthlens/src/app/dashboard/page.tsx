'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  History, 
  ArrowRight,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const stats = {
    totalAnalyses: 142,
    likelyAuthentic: 68,
    needsVerification: 41,
    likelyManipulated: 33,
    avgProcessingTime: '3.8s',
    detectionAccuracy: '98.4%'
  };

  const recentAnalyses = [
    {
      id: 'image-demo-01',
      name: 'synthetic_portrait_deepfake.png',
      type: 'image',
      assessment: 'LIKELY MANIPULATED / AI-GENERATED',
      confidence: '87%',
      date: '2026-09-05 09:12'
    },
    {
      id: 'video-demo-02',
      name: 'political_speech_misleading_clip.mp4',
      type: 'video',
      assessment: 'NEEDS VERIFICATION',
      confidence: '68%',
      date: '2026-09-04 18:45'
    },
    {
      id: 'audio-demo-03',
      name: 'ceo_voice_clone_call.wav',
      type: 'audio',
      assessment: 'LIKELY AUTHENTIC',
      confidence: '92%',
      date: '2026-09-03 14:20'
    },
    {
      id: 'img-demo-04',
      name: 'election_rally_crowd_edit.jpg',
      type: 'image',
      assessment: 'LIKELY MANIPULATED / AI-GENERATED',
      confidence: '94%',
      date: '2026-09-02 11:05'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> FORENSIC METRICS DASHBOARD
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
            Dashboard & Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of total media verifications, risk distributions, and recent audit logs.
          </p>
        </div>

        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-lg glow-cyan"
        >
          <Plus className="w-4 h-4" /> Verify New Media
        </Link>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Analyses */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Total Analyses</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-100">
            {stats.totalAnalyses}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% from last week
          </div>
        </div>

        {/* Likely Authentic */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Likely Authentic</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {stats.likelyAuthentic}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            47.8% of total volume
          </div>
        </div>

        {/* Needs Verification */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Needs Verification</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {stats.needsVerification}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            28.8% of total volume
          </div>
        </div>

        {/* Likely Manipulated */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Likely Manipulated</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">
            {stats.likelyManipulated}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            23.2% of total volume
          </div>
        </div>

      </div>

      {/* MEDIA TYPE & RISK DISTRIBUTION BARS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Media Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            Media Type Distribution
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Images</span>
                <span className="font-bold">58% (82)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-emerald-400" /> Videos</span>
                <span className="font-bold font-mono">27% (38)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '27%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1.5"><Music className="w-3.5 h-3.5 text-amber-400" /> Audio</span>
                <span className="font-bold font-mono">15% (22)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            Risk Classification Breakdown
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="text-emerald-400 font-bold">Likely Authentic (Low Risk)</span>
                <span className="font-bold">48%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="text-amber-400 font-bold">Needs Verification (Medium Risk)</span>
                <span className="font-bold">29%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: '29%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="text-rose-400 font-bold">Likely Manipulated (High Risk)</span>
                <span className="font-bold">23%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-rose-400" style={{ width: '23%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT ANALYSES TABLE */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden space-y-4 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" /> Recent Forensic Analyses
          </h3>
          <Link href="/history" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
            View All Archive Log <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Assessment</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentAnalyses.map((item) => (
                <tr key={item.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-200">{item.name}</td>
                  <td className="py-3.5 px-4 capitalize text-slate-300">{item.type}</td>
                  <td className="py-3.5 px-4 font-bold text-cyan-400">{item.assessment}</td>
                  <td className="py-3.5 px-4 font-bold">{item.confidence}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/results?id=${item.id}`} className="text-cyan-400 hover:underline font-bold">
                      Report →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
