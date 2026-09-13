import React, { useState } from 'react';
import { Beneficiary, BeneficiaryFilters } from '../../types/beneficiary';
import { BeneficiaryFilter } from './BeneficiaryFilter';
import { BeneficiaryCard } from './BeneficiaryCard';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';
import { LayoutGrid, Table as TableIcon, PhoneCall, ChevronRight, UserX, Clock } from 'lucide-react';

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  filters: BeneficiaryFilters;
  onFilterChange: (filters: BeneficiaryFilters) => void;
  onSelectBeneficiary: (beneficiary: Beneficiary) => void;
  onLogInteraction: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  filters,
  onFilterChange,
  onSelectBeneficiary,
  onLogInteraction,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Extract unique neighborhoods for filter dropdown
  const neighborhoods = Array.from(new Set(beneficiaries.map(b => b.neighborhood))).sort();

  return (
    <div className="space-y-4">
      {/* Header and View Mode Toggle */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Elderly Citizen Directory
          </h1>
          <p className="text-xs text-slate-500">
            Search, filter, and track engagement journeys of all enrolled beneficiaries
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 self-start sm:self-auto shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              viewMode === 'cards'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {/* Filter Component */}
      <BeneficiaryFilter
        filters={filters}
        onChange={onFilterChange}
        neighborhoods={neighborhoods}
        totalResults={beneficiaries.length}
      />

      {/* Empty State */}
      {beneficiaries.length === 0 ? (
        <EmptyState
          title="No beneficiaries found"
          description="Try relaxing your search terms or clearing status and neighborhood filters."
          actionText="Reset All Filters"
          onAction={() =>
            onFilterChange({
              search: '',
              status: 'all',
              neighborhood: 'all',
              contactGap: 'all',
              activityCategory: 'all',
              sortBy: 'urgency',
            })
          }
        />
      ) : viewMode === 'cards' ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beneficiaries.map((b) => (
            <BeneficiaryCard
              key={b.id}
              beneficiary={b}
              onSelect={onSelectBeneficiary}
              onLogInteraction={onLogInteraction}
            />
          ))}
        </div>
      ) : (
        /* Responsive Table View */
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Beneficiary</th>
                  <th scope="col" className="px-4 py-3.5">Status</th>
                  <th scope="col" className="px-4 py-3.5">Last Contact</th>
                  <th scope="col" className="px-4 py-3.5">Living Situation</th>
                  <th scope="col" className="px-4 py-3.5">Assigned Volunteer</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {beneficiaries.map((b) => {
                  const isOverdue = b.daysSinceContact > 30;
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectBeneficiary(b)}
                    >
                      {/* Name & Neighborhood */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {b.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {b.age} yrs • {b.gender} • <span className="font-medium text-slate-700">{b.neighborhood}</span>
                        </div>
                        {b.needsAttentionReason && (
                          <div className="mt-1 text-[11px] text-amber-800 bg-amber-50/90 rounded px-1.5 py-0.5 inline-block font-medium">
                            ⚠️ {b.needsAttentionReason}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={b.status} size="sm" />
                      </td>

                      {/* Last Interaction Gap */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'}`}>
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {b.daysSinceContact === 0 ? 'Today' : `${b.daysSinceContact}d ago`}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {b.lastInteractionDate}
                        </div>
                      </td>

                      {/* Living Situation */}
                      <td className="px-4 py-4 text-xs text-slate-600">
                        {b.livingSituation}
                      </td>

                      {/* Assigned Volunteer */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs">
                        {b.assignedVolunteer ? (
                          <div>
                            <span className="font-medium text-slate-800">{b.assignedVolunteer.name}</span>
                            <div className="text-[11px] text-slate-400">{b.assignedVolunteer.phone}</div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                            <UserX className="h-3.5 w-3.5" />
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Quick Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onLogInteraction(b)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                            title="Log Call or Visit"
                          >
                            <PhoneCall className="h-3 w-3" />
                            <span>Log Interaction</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onSelectBeneficiary(b)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            title="View Profile Journey"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
