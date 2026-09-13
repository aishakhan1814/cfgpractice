import React from 'react';
import { AlertCircle, PhoneCall, ArrowRight, UserX, Clock, HeartHandshake, Compass, Sparkles } from 'lucide-react';
import { Beneficiary } from '../../types/beneficiary';
import { StatusBadge } from '../common/StatusBadge';

interface NeedsAttentionListProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (beneficiary: Beneficiary) => void;
  onLogInteraction: (beneficiary: Beneficiary) => void;
  onViewAllAttention: () => void;
}

export const NeedsAttentionList: React.FC<NeedsAttentionListProps> = ({
  beneficiaries,
  onSelectBeneficiary,
  onLogInteraction,
  onViewAllAttention,
}) => {
  const attentionItems = beneficiaries
    .filter(b => b.status === 'needs_attention' || b.status === 'at_risk')
    .sort((a, b) => b.daysSinceContact - a.daysSinceContact)
    .slice(0, 5);

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 ring-1 ring-rose-300 animate-pulse">
            🚨 Critical Isolation
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 ring-1 ring-amber-300">
            ⚠️ Urgent Care Check
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            💬 Re-engage Companion
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header with human care banner */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-amber-50/70 via-rose-50/40 to-white px-6 py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500 p-2.5 text-white shadow-sm shadow-amber-500/30">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Elders Needing Care & Attention</span>
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  {beneficiaries.filter(b => b.status === 'needs_attention' || b.status === 'at_risk').length} Flagged
                </span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Human-centered triage identifying isolated seniors before disconnection becomes irreversible.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAllAttention}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All ({beneficiaries.filter(b => b.status === 'needs_attention' || b.status === 'at_risk').length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {attentionItems.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            <Sparkles className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
            <p className="font-semibold text-slate-800">All registered seniors are actively supported!</p>
            <p className="text-xs text-slate-400 mt-1">No elders are currently in an unattended isolation window.</p>
          </div>
        ) : (
          attentionItems.map((ben) => {
            const signal = ben.triageSignal;
            return (
              <div
                key={ben.id}
                className="p-5 sm:p-6 hover:bg-slate-50/90 transition-all group"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Column: Elder identity, personal story, and why flagged */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectBeneficiary(ben)}
                        className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-left flex items-center gap-1.5"
                      >
                        <span>{ben.name}</span>
                        <span className="text-xs font-normal text-slate-500">
                          ({ben.age} yrs • {ben.neighborhood})
                        </span>
                      </button>
                      <StatusBadge status={ben.status} size="sm" />
                      {getSeverityBadge(signal?.severity)}
                    </div>

                    {/* Life Story Context */}
                    {ben.lifeStorySnippet && (
                      <p className="text-xs text-slate-600 italic">
                        "{ben.lifeStorySnippet}"
                      </p>
                    )}

                    {/* Explainable Why Attention is Needed (Human Context) */}
                    <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs space-y-1.5">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                        <span>Why Care is Urgently Needed: {signal?.primaryReason || ben.needsAttentionReason}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-5">
                        {signal?.humanStory || ben.needsAttentionReason}
                      </p>
                      
                      {/* Suggested Action Pill */}
                      {signal?.suggestedAction && (
                        <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-emerald-900 bg-white/80 rounded-lg p-2 font-medium">
                          <HeartHandshake className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Recommended Compassion Step:</strong> {signal.suggestedAction}</span>
                        </div>
                      )}
                    </div>

                    {/* Meta info row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-rose-600">
                        <Clock className="h-3.5 w-3.5" />
                        No touchpoint in {ben.daysSinceContact} days ({ben.lastInteractionDate})
                      </span>
                      <span>•</span>
                      <span>Living: <strong className="text-slate-700">{ben.livingSituation}</strong></span>
                      <span>•</span>
                      <span>
                        Volunteer Companion:{' '}
                        {ben.assignedVolunteer ? (
                          <span className="font-semibold text-slate-800">{ben.assignedVolunteer.name}</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            <UserX className="h-3 w-3" />
                            No Volunteer Assigned
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: 1-Click Action Buttons */}
                  <div className="flex items-center gap-2 sm:self-end lg:self-center shrink-0 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => onLogInteraction(ben)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>Log Check-in</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectBeneficiary(ben)}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      View Journey &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
