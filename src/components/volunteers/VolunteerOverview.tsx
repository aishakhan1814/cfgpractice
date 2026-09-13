import React from 'react';
import { MOCK_VOLUNTEERS } from '../../services/mockData';
import { Beneficiary } from '../../types/beneficiary';
import { HeartHandshake, Phone, MapPin, Users } from 'lucide-react';

interface VolunteerOverviewProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (b: Beneficiary) => void;
}

export const VolunteerOverview: React.FC<VolunteerOverviewProps> = ({
  beneficiaries,
  onSelectBeneficiary,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Volunteer Support Network
        </h1>
        <p className="text-xs text-slate-500">
          Monitor which volunteers are supporting which elderly citizens and identify unassigned beneficiaries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_VOLUNTEERS.map((vol) => {
          const assigned = beneficiaries.filter(b => b.assignedVolunteer?.id === vol.id);
          const needsAttentionCount = assigned.filter(b => b.status === 'needs_attention' || b.status === 'at_risk').length;

          return (
            <div
              key={vol.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{vol.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{vol.neighborhood} Zone</span>
                    </p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <a href={`tel:${vol.phone}`} className="text-emerald-700 hover:underline">
                      {vol.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      Assigned Elders ({assigned.length})
                    </span>
                    {needsAttentionCount > 0 && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {needsAttentionCount} need check-in
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {assigned.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => onSelectBeneficiary(b)}
                        className="w-full text-left text-xs p-1.5 rounded hover:bg-slate-50 flex items-center justify-between group"
                      >
                        <span className="group-hover:text-emerald-700 font-medium text-slate-700">
                          {b.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {b.daysSinceContact}d ago
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
