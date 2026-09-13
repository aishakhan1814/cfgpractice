import React from 'react';
import { Users, AlertTriangle, UserCheck, ClockAlert } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { DashboardMetrics } from '../../types/beneficiary';

interface MetricCardsProps {
  metrics: DashboardMetrics;
  onFilterNeedsAttention: () => void;
  onFilterOver30Days: () => void;
  onFilterActive: () => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  metrics,
  onFilterNeedsAttention,
  onFilterOver30Days,
  onFilterActive,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Beneficiaries"
        value={metrics.totalBeneficiaries}
        subtitle="Registered elderly citizens across 5 urban zones"
        icon={Users}
        variant="default"
      />

      <StatCard
        title="Needs Attention"
        value={metrics.needsAttentionCount}
        badge="Immediate Action"
        subtitle="Unanswered calls, missed events, or reported distress"
        icon={AlertTriangle}
        variant="warning"
        onClick={onFilterNeedsAttention}
      />

      <StatCard
        title="No Contact in 30+ Days"
        value={metrics.uncontactedOver30Days}
        badge="Critical Risk"
        subtitle="Citizens at risk of silent social isolation"
        icon={ClockAlert}
        variant="danger"
        onClick={onFilterOver30Days}
      />

      <StatCard
        title="Active Beneficiaries"
        value={metrics.activeCount}
        subtitle="Interacted or attended events within past 30 days"
        icon={UserCheck}
        variant="success"
        onClick={onFilterActive}
      />
    </div>
  );
};
