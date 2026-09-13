import React from 'react';
import { MOCK_VOLUNTEERS } from '../../services/mockData';
import { Beneficiary } from '../../types/beneficiary';
import { HeartHandshake, Phone, MapPin, Users, Award, Sparkles, Clock, Quote, Heart } from 'lucide-react';

interface VolunteerOverviewProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (b: Beneficiary) => void;
}

export const VolunteerOverview: React.FC<VolunteerOverviewProps> = ({
  beneficiaries,
  onSelectBeneficiary,
}) => {
  const totalHours = MOCK_VOLUNTEERS.reduce((acc, v) => acc + (v.hoursContributed || 0), 0);
  const spotlightVolunteers = MOCK_VOLUNTEERS.filter(v => v.spotlightBadge);

  return (
    <div className="space-y-8">
      {/* Hero / Philosophy Header */}
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-800 to-teal-900 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/60 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur-xs border border-emerald-600/40">
            <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
            <span>Saathi Volunteer Fellowship • Chennai</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            "We do not visit beneficiaries. We visit family."
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Our volunteers are trusted neighbors, retired teachers, college students, and healthcare workers who dedicate their mornings and weekends to ensure no elder experiences the pain of an empty room or an unanswered phone.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <strong className="text-white text-sm">{MOCK_VOLUNTEERS.length} Active</strong> Companions
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-300" />
              <strong className="text-white text-sm">{totalHours.toLocaleString()}+ Hours</strong> of Compassionate Care
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-teal-300" />
              <strong className="text-white text-sm">{beneficiaries.length} Elders</strong> Safeguarded
            </span>
          </div>
        </div>
      </div>

      {/* Volunteer Spotlight Carousel / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span>Volunteer Spotlights & Voices of Gratitude</span>
            </h2>
            <p className="text-xs text-slate-500">
              Honoring selfless dedication and the lasting bonds formed across generations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spotlightVolunteers.slice(0, 4).map((vol) => (
            <div
              key={`spotlight-${vol.id}`}
              className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-800 text-lg">
                      {vol.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{vol.name}</h3>
                      <p className="text-xs text-emerald-700 font-medium">{vol.role || 'Community Companion'}</p>
                    </div>
                  </div>
                  {vol.spotlightBadge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                      <Sparkles className="h-3 w-3 text-amber-600" />
                      {vol.spotlightBadge}
                    </span>
                  )}
                </div>

                {vol.elderTestimonial && (
                  <div className="mt-4 rounded-xl bg-white/90 border border-slate-200/80 p-3.5 text-xs text-slate-700 relative">
                    <Quote className="h-4 w-4 text-emerald-600/30 absolute top-2 right-2" />
                    <p className="italic leading-relaxed">
                      "{vol.elderTestimonial.quote}"
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-slate-500 text-right">
                      — {vol.elderTestimonial.elderName}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {vol.neighborhood} Hub
                </span>
                <span className="font-semibold text-emerald-800 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  {vol.hoursContributed} service hours
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Volunteer Network List */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Neighborhood Care Circles & Caseloads
          </h2>
          <p className="text-xs text-slate-500">
            Manage volunteer pairings, direct contact lines, and active check-in requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_VOLUNTEERS.map((vol) => {
            const assigned = beneficiaries.filter(b => b.assignedVolunteer?.id === vol.id);
            const needsAttentionCount = assigned.filter(b => b.status === 'needs_attention' || b.status === 'at_risk').length;

            return (
              <div
                key={vol.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{vol.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{vol.neighborhood} Zone</span>
                      </p>
                      {vol.role && (
                        <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                          {vol.role}
                        </p>
                      )}
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 shrink-0">
                      <HeartHandshake className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <a href={`tel:${vol.phone}`} className="text-emerald-700 hover:underline font-medium">
                        {vol.phone}
                      </a>
                    </div>
                    {vol.hoursContributed && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        {vol.hoursContributed} hrs
                      </span>
                    )}
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

                    <div className="space-y-1 max-h-36 overflow-y-auto">
                      {assigned.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-1">Available for new pairings</p>
                      ) : (
                        assigned.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => onSelectBeneficiary(b)}
                            className="w-full text-left text-xs p-1.5 rounded hover:bg-slate-50 flex items-center justify-between group transition-colors"
                          >
                            <span className="group-hover:text-emerald-700 font-medium text-slate-700 truncate">
                              {b.name}
                            </span>
                            <span className={`text-[11px] shrink-0 ${b.daysSinceContact > 30 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                              {b.daysSinceContact}d ago
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
