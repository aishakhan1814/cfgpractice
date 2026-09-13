import React from 'react';
import { EngagementStatus } from '../../types/beneficiary';

interface StatusBadgeProps {
  status: EngagementStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  }[size];

  switch (status) {
    case 'active':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      );
    case 'needs_attention':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Needs Attention
        </span>
      );
    case 'at_risk':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          High Risk / Isolated
        </span>
      );
    case 'inactive':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Inactive
        </span>
      );
    default:
      return null;
  }
};
