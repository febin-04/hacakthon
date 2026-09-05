'use client';

import React from 'react';
import { Calendar, Globe, Share2, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { TimelineEvent } from '@/services/types';

interface EvidenceTimelineProps {
  timeline: TimelineEvent[];
  mediaName: string;
}

export default function EvidenceTimeline({ timeline, mediaName }: EvidenceTimelineProps) {
  // Enhanced timeline structure matching requirements: Earliest source -> Republish -> Current Media -> Current Claim
  const enrichedNodes = [
    {
      stage: 'EARLIEST KNOWN SOURCE',
      year: timeline[0]?.year || '2022',
      title: timeline[0]?.source || 'Original Archive Master',
      details: timeline[0]?.details || 'First indexed in official press database.',
      type: 'source',
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-700'
    },
    {
      stage: 'RELEVANT PUBLICATION',
      year: timeline[1]?.year || '2024',
      title: timeline[1]?.source || 'Secondary News Syndicate',
      details: timeline[1]?.details || 'Republished in regional journalistic wire.',
      type: 'publication',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-700'
    },
    {
      stage: 'CURRENT INGESTED MEDIA',
      year: '2026',
      title: mediaName,
      details: 'Submitted for TruthLens AI 6-stage multimodal analysis.',
      type: 'media',
      badge: 'bg-purple-950 text-purple-300 border-purple-700'
    },
    {
      stage: 'CURRENT CLAIM IN CIRCULATION',
      year: '2026 (Active)',
      title: 'Viral Social Media Narrative Claim',
      details: 'Alleging event occurred yesterday in current breaking news context.',
      type: 'claim',
      badge: 'bg-amber-950 text-amber-300 border-amber-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Chronological Evidence & Spread Timeline
        </h3>
        <span className="text-[10px] font-mono text-slate-500">Source Lineage Tracking</span>
      </div>

      {/* Visual Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 my-4">
        {enrichedNodes.map((node, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Dot Indicator */}
            <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 flex items-center justify-center transition-all group-hover:scale-125 ${
              node.type === 'source' ? 'border-emerald-400 text-emerald-400' :
              node.type === 'publication' ? 'border-cyan-400 text-cyan-400' :
              node.type === 'media' ? 'border-purple-400 text-purple-400' : 'border-amber-400 text-amber-400'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border font-bold ${node.badge}`}>
                  {node.stage}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" /> {node.year}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 font-mono">
                {node.title}
              </h4>

              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                {node.details}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
