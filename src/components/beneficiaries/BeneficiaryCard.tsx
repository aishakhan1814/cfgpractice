import React from 'react';
import { Phone, Clock, Home, UserX, ChevronRight } from 'lucide-react';
import { Beneficiary } from '../../types/beneficiary';
import { StatusBadge } from '../common/StatusBadge';

interface BeneficiaryCardProps {
  beneficiary: Beneficiary;
  onSelect: (beneficiary: Beneficiary) => void;
  onLogInteraction: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({
  beneficiary,
  onSelect,
  onLogInteraction,
}) => {
  const isOverdue = beneficiary.daysSinceContact > 30;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <button
              type="button"
              onClick={() => onSelect(beneficiary)}
              className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors text-left"
            >
              {beneficiary.name}
            </button>
            <p className="text-xs text-slate-500">
              {beneficiary.age} yrs • {beneficiary.gender} • {beneficiary.neighborhood}
            </p>
          </div>
          <StatusBadge status={beneficiary.status} size="sm" />
        </div>

        {/* Needs attention banner */}
        {beneficiary.needsAttentionReason && (
          <div className="mt-2.5 rounded-lg bg-amber-50 p-2 text-xs font-medium text-amber-900 border border-amber-200/60">
            ⚠️ {beneficiary.needsAttentionReason}
          </div>
        )}

        <div className="mt-3 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className={`h-3.5 w-3.5 ${isOverdue ? 'text-rose-600' : 'text-slate-400'}`} />
            <span className={isOverdue ? 'text-rose-600 font-semibold' : ''}>
              Last Contact: {beneficiary.daysSinceContact} days ago ({beneficiary.lastInteractionDate})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Home className="h-3.5 w-3.5 text-slate-400" />
            <span>{beneficiary.livingSituation}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Volunteer:</span>
            {beneficiary.assignedVolunteer ? (
              <span className="font-medium text-slate-700">{beneficiary.assignedVolunteer.name}</span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                <UserX className="h-3 w-3" />
                Unassigned
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onLogInteraction(beneficiary)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors shadow-xs"
        >
          <Phone className="h-3 w-3" />
          <span>Log Interaction</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect(beneficiary)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <span>View Profile</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
