import React from 'react';
import { AlertCircle, PhoneCall, ArrowRight, UserX, Clock } from 'lucide-react';
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-amber-100 p-2 text-amber-800">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Needs Attention Signal Queue
            </h2>
            <p className="text-xs text-slate-500">
              Elderly citizens flagged for disconnection or missed follow-ups
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAllAttention}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <span>View All ({beneficiaries.filter(b => b.status === 'needs_attention' || b.status === 'at_risk').length})</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {attentionItems.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            All registered citizens are actively supported! No pending attention flags.
          </div>
        ) : (
          attentionItems.map((ben) => (
            <div
              key={ben.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectBeneficiary(ben)}
                    className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors text-left"
                  >
                    {ben.name}
                  </button>
                  <span className="text-xs text-slate-400">({ben.age} yrs • {ben.neighborhood})</span>
                  <StatusBadge status={ben.status} size="sm" />
                </div>

                {ben.needsAttentionReason && (
                  <p className="text-xs font-medium text-amber-900 bg-amber-50/80 rounded px-2 py-1 inline-block">
                    ⚠️ {ben.needsAttentionReason}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1 text-rose-600 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    Last contact: {ben.daysSinceContact} days ago ({ben.lastInteractionDate})
                  </span>
                  <span>•</span>
                  <span>Living: {ben.livingSituation}</span>
                  <span>•</span>
                  <span>
                    Volunteer:{' '}
                    {ben.assignedVolunteer ? (
                      <span className="font-medium text-slate-700">{ben.assignedVolunteer.name}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                        <UserX className="h-3 w-3" />
                        Unassigned
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => onLogInteraction(ben)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Log Interaction</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectBeneficiary(ben)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
