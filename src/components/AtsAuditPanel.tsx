import React from 'react';
import { ResumeData } from '../types/resume';
import { auditResumeAts, AtsAuditResult } from '../utils/aiEnhancer';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface AtsAuditPanelProps {
  data: ResumeData;
  onApplyFix?: () => void;
}

export const AtsAuditPanel: React.FC<AtsAuditPanelProps> = ({ data }) => {
  const audit: AtsAuditResult = auditResumeAts(data);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-sky-600 bg-sky-50 border-sky-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6 shadow-2xs max-w-4xl mx-auto">
      {/* Top Banner: Score & Executive Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-neutral-800" />
            <h2 className="text-lg font-bold text-neutral-950">
              Applicant Tracking System (ATS) Diagnostic
            </h2>
          </div>
          <p className="text-xs text-neutral-600 mt-1 max-w-xl">
            {audit.summary}
          </p>
        </div>

        {/* Score Ring / Block */}
        <div className={`flex items-center gap-3 px-5 py-3 rounded-lg border ${getScoreColor(audit.score)} shrink-0`}>
          <div className="text-3xl font-extrabold font-mono tabular-nums">
            {audit.score}
            <span className="text-sm font-normal text-neutral-500">/100</span>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
              Readiness Tier
            </div>
            <div className="text-xs font-semibold">
              {audit.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Metric Breakdown Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-neutral-50 border border-neutral-200/80 rounded-lg">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
            Power Action Verbs
          </div>
          <div className="text-xl font-bold text-neutral-900 mt-1 font-mono tabular-nums">
            {audit.actionVerbsFound.length} Detected
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
            {audit.actionVerbsFound.slice(0, 4).join(', ') || 'None found yet'}
          </div>
        </div>

        <div className="p-3.5 bg-neutral-50 border border-neutral-200/80 rounded-lg">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
            Quantified Bullets (%, $)
          </div>
          <div className="text-xl font-bold text-neutral-900 mt-1 font-mono tabular-nums">
            {audit.metricsFoundCount} Benchmark{audit.metricsFoundCount === 1 ? '' : 's'}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">
            Numbers prove measurable results
          </div>
        </div>

        <div className="p-3.5 bg-neutral-50 border border-neutral-200/80 rounded-lg">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
            Categorized Skills
          </div>
          <div className="text-xl font-bold text-neutral-900 mt-1 font-mono tabular-nums">
            {data.skillGroups.flatMap(s => s.skills).length} Keywords
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">
            Across {data.skillGroups.length} groupings
          </div>
        </div>
      </div>

      {/* Detailed Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
          Screening Criteria & Automated Checks
        </h3>
        <div className="space-y-2">
          {audit.checks.map((chk, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 transition-colors ${
                chk.passed
                  ? 'bg-emerald-50/40 border-emerald-100'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">
                    {chk.title}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 font-mono">
                    {chk.category}
                  </span>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  {chk.recommendation}
                </p>
                {chk.details && (
                  <div className="text-[11px] text-neutral-500 font-mono pt-0.5">
                    {chk.details}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
