'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, FileText, ArrowRight, Activity } from 'lucide-react';
import { EvaluationMetrics } from '@/lib/suite-runner';

export default function EvaluationPage() {
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/evaluation');
      if (!res.ok) throw new Error('Evaluation service response error');
      const data = await res.json();
      setMetrics(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load evaluation metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Accessibility Heading & Breadcrumb */}
      <header className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
            BENCHMARK EVALUATION
          </span>
          <span className="text-xs text-slate-400 font-mono">AUTOMATED VERIFICATION SUITE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Activity className="w-8 h-8 text-cyan-400" aria-hidden="true" />
          Model Evaluation & Performance Metrics
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          Real-time benchmark evaluation calculated across synthetic, authentic, and manipulated media test samples.
          Metrics are generated dynamically from automated test suite execution without hardcoded values.
        </p>
      </header>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Status: Evaluation Pipeline Active</span>
        </div>
        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Re-run evaluation benchmark"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          {loading ? 'Executing Evaluation...' : 'Re-run Evaluation Benchmark'}
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800" aria-live="polite">
          <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-sm font-mono text-slate-300">Executing 15 benchmark test samples across multi-signal pipelines...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-sm font-mono" role="alert">
          <AlertTriangle className="w-6 h-6 mb-2 text-rose-400" />
          <p className="font-bold">Evaluation Engine Unavailable</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      ) : metrics ? (
        <div className="space-y-8">
          {/* Key Metric Score Cards */}
          <section aria-labelledby="key-metrics-heading">
            <h2 id="key-metrics-heading" className="sr-only">Key Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 glow-cyan text-center">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Accuracy</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400">
                  {metrics.accuracy !== undefined ? `${(metrics.accuracy * 100).toFixed(1)}%` : 'Not available'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Correct classifications / total</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 glow-emerald text-center">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Precision</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                  {metrics.precision !== undefined ? `${(metrics.precision * 100).toFixed(1)}%` : 'Not available'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">True AI / (True AI + False AI)</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 text-center">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Recall</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-teal-300">
                  {metrics.recall !== undefined ? `${(metrics.recall * 100).toFixed(1)}%` : 'Not available'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">True AI / (True AI + Missed AI)</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 text-center">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">F1 Score</div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">
                  {metrics.f1Score !== undefined ? `${(metrics.f1Score * 100).toFixed(1)}%` : 'Not available'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Harmonic mean of precision & recall</div>
              </div>
            </div>
          </section>

          {/* Test Dataset Distribution */}
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800" aria-labelledby="dataset-distribution-heading">
            <h2 id="dataset-distribution-heading" className="text-base font-bold text-slate-100 font-mono mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              Test Dataset Distribution
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400">TOTAL SAMPLES</div>
                <div className="text-2xl font-bold text-slate-100 mt-1">{metrics.totalSamples}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40">
                <div className="text-emerald-400">REAL PHOTOGRAPHS</div>
                <div className="text-2xl font-bold text-emerald-300 mt-1">{metrics.realSamples}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40">
                <div className="text-cyan-400">SYNTHETIC AI IMAGES</div>
                <div className="text-2xl font-bold text-cyan-300 mt-1">{metrics.aiSamples}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40">
                <div className="text-amber-400">MANIPULATED / EDITED</div>
                <div className="text-2xl font-bold text-amber-300 mt-1">{metrics.manipulatedSamples}</div>
              </div>
            </div>
          </section>

          {/* Confusion Matrix & Forensic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Confusion Matrix Table */}
            <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800" aria-labelledby="confusion-matrix-heading">
              <h2 id="confusion-matrix-heading" className="text-base font-bold text-slate-100 font-mono mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                Confusion Matrix
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Actual \ Predicted</th>
                      <th className="py-2 px-3 text-center text-emerald-400">Predicted Real</th>
                      <th className="py-2 px-3 text-center text-cyan-400">Predicted AI</th>
                      <th className="py-2 px-3 text-center text-amber-400">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-emerald-300">Actual Real</td>
                      <td className="py-3 px-3 text-center bg-emerald-950/40 text-emerald-300 font-bold border border-emerald-500/20">
                        {metrics.confusionMatrix.actualReal.predictedReal} (TN)
                      </td>
                      <td className="py-3 px-3 text-center bg-rose-950/40 text-rose-300 font-bold border border-rose-500/20">
                        {metrics.confusionMatrix.actualReal.predictedAi} (FP)
                      </td>
                      <td className="py-3 px-3 text-center bg-amber-950/40 text-amber-300">
                        {metrics.confusionMatrix.actualReal.predictedVerification}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-cyan-300">Actual AI / Manipulated</td>
                      <td className="py-3 px-3 text-center bg-rose-950/40 text-rose-300 font-bold border border-rose-500/20">
                        {metrics.confusionMatrix.actualAi.predictedReal} (FN)
                      </td>
                      <td className="py-3 px-3 text-center bg-cyan-950/40 text-cyan-300 font-bold border border-cyan-500/20">
                        {metrics.confusionMatrix.actualAi.predictedAi} (TP)
                      </td>
                      <td className="py-3 px-3 text-center bg-amber-950/40 text-amber-300">
                        {metrics.confusionMatrix.actualAi.predictedVerification}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Signal Reliability & Limits */}
            <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800" aria-labelledby="signal-reliability-heading">
              <h2 id="signal-reliability-heading" className="text-base font-bold text-slate-100 font-mono mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                Error Rate & Boundary Analysis
              </h2>
              <ul className="space-y-3 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold">False Positives:</span>
                  <span>{metrics.falsePositives} (Authentic images falsely classified as AI)</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold">False Negatives:</span>
                  <span>{metrics.falseNegatives} (AI images falsely classified as Authentic)</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-cyan-400 font-bold">Needs Verification:</span>
                  <span>{metrics.needsVerificationCount} (Single-anomaly or low-confidence ambiguous files)</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Links to Documentation & Test Suite */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30">
            <div>
              <h3 className="text-sm font-bold font-mono text-cyan-300">Want to inspect the complete test implementation?</h3>
              <p className="text-xs text-slate-400 mt-1">Read TESTING.md or run <code className="text-cyan-400 bg-slate-900 px-1.5 py-0.5 rounded">npm test</code> in terminal.</p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <FileText className="w-4 h-4" />
              View Testing Methodology
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}
