import React from 'react';
import { MetricCards } from './MetricCards';
import { NeedsAttentionList } from './NeedsAttentionList';
import { ActivitySnapshot } from './ActivitySnapshot';
import { DashboardMetrics, Beneficiary } from '../../types/beneficiary';
import { UserCheck, Heart } from 'lucide-react';

interface CoordinatorDashboardProps {
  metrics: DashboardMetrics;
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (beneficiary: Beneficiary) => void;
  onLogInteraction: (beneficiary: Beneficiary) => void;
  onFilterNeedsAttention: () => void;
  onFilterOver30Days: () => void;
  onFilterActive: () => void;
  onFilterByActivity: (category: string) => void;
  onNavigateToDirectory: () => void;
}

export const CoordinatorDashboard: React.FC<CoordinatorDashboardProps> = ({
  metrics,
  beneficiaries,
  onSelectBeneficiary,
  onLogInteraction,
  onFilterNeedsAttention,
  onFilterOver30Days,
  onFilterActive,
  onFilterByActivity,
  onNavigateToDirectory,
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome & NGO Context Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
            <Heart className="h-4 w-4 fill-emerald-600 text-emerald-600" />
            <span>Saathi Foundation • Chennai Chapter</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Coordinator Overview & Engagement Hub
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Real-time monitoring across 3,000+ urban elderly citizens to prevent isolation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToDirectory}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <UserCheck className="h-4 w-4" />
            <span>Browse All Beneficiaries</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <MetricCards
        metrics={metrics}
        onFilterNeedsAttention={onFilterNeedsAttention}
        onFilterOver30Days={onFilterOver30Days}
        onFilterActive={onFilterActive}
      />

      {/* Primary Signal: Needs Attention Queue */}
      <NeedsAttentionList
        beneficiaries={beneficiaries}
        onSelectBeneficiary={onSelectBeneficiary}
        onLogInteraction={onLogInteraction}
        onViewAllAttention={onFilterNeedsAttention}
      />

      {/* Activity Participation Snapshot */}
      <ActivitySnapshot onFilterByActivity={onFilterByActivity} />
    </div>
  );
};
