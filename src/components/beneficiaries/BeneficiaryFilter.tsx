import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { BeneficiaryFilters } from '../../types/beneficiary';

interface BeneficiaryFilterProps {
  filters: BeneficiaryFilters;
  onChange: (filters: BeneficiaryFilters) => void;
  neighborhoods: string[];
  totalResults: number;
}

export const BeneficiaryFilter: React.FC<BeneficiaryFilterProps> = ({
  filters,
  onChange,
  neighborhoods,
  totalResults,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleReset = () => {
    onChange({
      search: '',
      status: 'all',
      neighborhood: 'all',
      contactGap: 'all',
      activityCategory: 'all',
      sortBy: 'urgency',
    });
  };

  const isFiltered =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.neighborhood !== 'all' ||
    filters.contactGap !== 'all' ||
    filters.activityCategory !== 'all' ||
    filters.sortBy !== 'urgency';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      {/* Top row: Search and active count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search elderly citizens by name, phone, address, or neighborhood..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Showing {totalResults} {totalResults === 1 ? 'beneficiary' : 'beneficiaries'}
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-emerald-700 hover:bg-emerald-50 font-medium transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Select Controls */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pt-1">
        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Engagement Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-emerald-500 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="needs_attention">⚠️ Needs Attention</option>
            <option value="at_risk">🚨 High Risk / Isolated</option>
            <option value="active">✅ Active</option>
            <option value="inactive">⚪ Inactive</option>
          </select>
        </div>

        {/* Contact Gap Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Last Interaction Gap
          </label>
          <select
            value={filters.contactGap}
            onChange={(e) => onChange({ ...filters, contactGap: e.target.value as any })}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-emerald-500 focus:outline-hidden"
          >
            <option value="all">All Contact Gaps</option>
            <option value="over_30">30+ Days (Critical)</option>
            <option value="7_to_30">7 to 30 Days</option>
            <option value="under_7">Under 7 Days (Recent)</option>
          </select>
        </div>

        {/* Neighborhood Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Neighborhood
          </label>
          <select
            value={filters.neighborhood}
            onChange={(e) => onChange({ ...filters, neighborhood: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-emerald-500 focus:outline-hidden"
          >
            <option value="all">All Neighborhoods</option>
            {neighborhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-emerald-500 focus:outline-hidden"
          >
            <option value="urgency">Urgency (Most Inactive First)</option>
            <option value="last_contact">Most Recent Contact</option>
            <option value="name">Name (A &rarr; Z)</option>
            <option value="age">Age (Oldest First)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
