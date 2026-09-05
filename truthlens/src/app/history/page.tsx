'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  History, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  Video, 
  Music, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface HistoryItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio';
  assessment: 'LIKELY MANIPULATED' | 'NEEDS VERIFICATION' | 'LIKELY AUTHENTIC';
  confidence: number;
  date: string;
  size: string;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 'image-demo-01',
    name: 'synthetic_portrait_deepfake.png',
    type: 'image',
    assessment: 'LIKELY MANIPULATED',
    confidence: 87,
    date: '2026-09-05 09:12',
    size: '3.42 MB'
  },
  {
    id: 'video-demo-02',
    name: 'political_speech_misleading_clip.mp4',
    type: 'video',
    assessment: 'NEEDS VERIFICATION',
    confidence: 68,
    date: '2026-09-04 18:45',
    size: '18.9 MB'
  },
  {
    id: 'audio-demo-03',
    name: 'ceo_voice_clone_call.wav',
    type: 'audio',
    assessment: 'LIKELY AUTHENTIC',
    confidence: 92,
    date: '2026-09-03 14:20',
    size: '5.12 MB'
  },
  {
    id: 'image-demo-04',
    name: 'election_rally_crowd_edit.jpg',
    type: 'image',
    assessment: 'LIKELY MANIPULATED',
    confidence: 94,
    date: '2026-09-02 11:05',
    size: '2.81 MB'
  },
  {
    id: 'video-demo-05',
    name: 'conflict_zone_drone_footage.mp4',
    type: 'video',
    assessment: 'LIKELY AUTHENTIC',
    confidence: 89,
    date: '2026-09-01 08:30',
    size: '42.1 MB'
  }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [assessmentFilter, setAssessmentFilter] = useState<string>('all');

  const filteredHistory = MOCK_HISTORY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesAssessment = assessmentFilter === 'all' || item.assessment === assessmentFilter;
    return matchesSearch && matchesType && matchesAssessment;
  });

  const getBadgeStyle = (assessment: string) => {
    switch (assessment) {
      case 'LIKELY MANIPULATED':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/60';
      case 'NEEDS VERIFICATION':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      default:
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <History className="w-3.5 h-3.5" /> FORENSIC ARCHIVE LOGS
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
            Analysis History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review past media verification records and revisit full diagnostic reports.
          </p>
        </div>

        <Link
          href="/analyze"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all"
        >
          <ShieldCheck className="w-4 h-4" /> Verify New Media
        </Link>
      </div>

      {/* Filter & Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by file name or analysis ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
          />
        </div>

        {/* Media Type Filter */}
        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
          >
            <option value="all">All Media Types</option>
            <option value="image">Images Only</option>
            <option value="video">Videos Only</option>
            <option value="audio">Audio Only</option>
          </select>
        </div>

        {/* Assessment Filter */}
        <div className="sm:col-span-3">
          <select
            value={assessmentFilter}
            onChange={(e) => setAssessmentFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
          >
            <option value="all">All Risk Assessments</option>
            <option value="LIKELY MANIPULATED">Likely Manipulated</option>
            <option value="NEEDS VERIFICATION">Needs Verification</option>
            <option value="LIKELY AUTHENTIC">Likely Authentic</option>
          </select>
        </div>

      </div>

      {/* History Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Analysis ID & File Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Assessment</th>
                <th className="py-4 px-6">Confidence</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-950/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-200">{item.name}</div>
                      <div className="text-[10px] text-cyan-400">{item.id} • {item.size}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 capitalize text-slate-300">
                        {item.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />}
                        {item.type === 'video' && <Video className="w-3.5 h-3.5 text-emerald-400" />}
                        {item.type === 'audio' && <Music className="w-3.5 h-3.5 text-amber-400" />}
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] border font-bold ${getBadgeStyle(item.assessment)}`}>
                        {item.assessment}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-cyan-400">
                      {item.confidence}%
                    </td>
                    <td className="py-4 px-6 text-slate-400 flex items-center gap-1.5 pt-5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.date}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/results?id=${item.id}`}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                      >
                        View Report <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No matching analysis records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
