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
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/60 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur-xs border border-emerald-600/40">
              <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              <span>Saathi Foundation • Chennai Elderly Care Network</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              "No Elder Left Behind in Silence."
            </h1>
            
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Every card below is not just a statistic — it is an elder in Mylapore, Royapettah, or T. Nagar who contributed decades to our society. Our explainable triage surfaces changes in routine before acute isolation sets in.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateToDirectory}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-emerald-950 shadow-sm hover:bg-emerald-50 transition-colors"
            >
              <UserCheck className="h-4 w-4 text-emerald-700" />
              <span>Beneficiary Registry</span>
            </button>
          </div>
        </div>

        {/* Empathy & Community Impact Strip */}
        <div className="mt-6 pt-5 border-t border-emerald-700/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl bg-white/10 backdrop-blur-xs p-3 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-white">3,420+</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">Warm Check-ins Done</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-xs p-3 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-300">18 Hubs</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">Chennai Circles</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-xs p-3 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-300">98.4%</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">48h Resolution Rate</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-xs p-3 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-white">100% Dignity</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider font-semibold">Zero Elders Forgotten</div>
          </div>
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
