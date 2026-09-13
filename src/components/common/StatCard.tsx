import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'danger' | 'success';
  onClick?: () => void;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  onClick,
  badge,
}) => {
  const variantStyles = {
    default: 'bg-white border-slate-200 text-slate-900',
    warning: 'bg-amber-50/70 border-amber-200 text-amber-900 hover:border-amber-300',
    danger: 'bg-rose-50/70 border-rose-200 text-rose-900 hover:border-rose-300',
    success: 'bg-emerald-50/60 border-emerald-200 text-emerald-900',
  }[variant];

  const iconColors = {
    default: 'bg-slate-100 text-slate-600',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
    success: 'bg-emerald-100 text-emerald-700',
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : ''
      } ${variantStyles}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`rounded-lg p-2.5 ${iconColors}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {badge && (
          <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">{subtitle}</p>
      )}

      {onClick && (
        <div className="mt-3 flex items-center text-xs font-medium text-emerald-700 hover:text-emerald-800">
          <span>Click to view filtered list &rarr;</span>
        </div>
      )}
    </div>
  );
};
