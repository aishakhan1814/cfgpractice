import React from 'react';
import { Calendar, Users, MapPin, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { MOCK_COMMUNITY_ACTIVITIES } from '../../services/mockData';

interface ActivitySnapshotProps {
  onFilterByActivity?: (category: string) => void;
}

export const ActivitySnapshot: React.FC<ActivitySnapshotProps> = ({ onFilterByActivity }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Community Circles & Real Experiences</span>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Weekly Engagement
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Beyond attendance numbers: the stories, laughter, and friendships rekindled among our seniors
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_COMMUNITY_ACTIVITIES.slice(0, 4).map((act) => (
          <div
            key={act.id}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${act.categoryColor}`}
                >
                  {act.categoryLabel}
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {act.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{act.title}</h4>

              {/* Event Location & Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {act.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {act.location}
                </span>
              </div>

              {/* Story Narrative */}
              <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-100">
                {act.story}
              </p>

              {/* Elder Quote with emotional resonance */}
              {act.elderQuote && (
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-xs text-amber-950 space-y-1">
                  <div className="flex items-start gap-1.5 font-medium italic">
                    <Quote className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>"{act.elderQuote.quote}"</span>
                  </div>
                  <p className="text-[11px] text-amber-800 font-bold pl-5">
                    — {act.elderQuote.author}, {act.elderQuote.neighborhood}
                  </p>
                </div>
              )}

              {/* Tangible Community Outcome */}
              <div className="flex items-start gap-1.5 text-xs text-emerald-800 bg-emerald-50/70 rounded-lg p-2.5 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Impact Outcome:</strong> {act.communityOutcome}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Users className="h-3.5 w-3.5 text-emerald-600" />
                {act.attendeesCount} Participating Elders
              </span>
              {onFilterByActivity && (
                <button
                  type="button"
                  onClick={() => onFilterByActivity(act.category)}
                  className="font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View participating elders &rarr;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
