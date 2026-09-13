import React, { useState } from 'react';
import { MOCK_COMMUNITY_ACTIVITIES } from '../../services/mockData';
import { Calendar, Users, MapPin, CheckCircle2, Quote, Sparkles, Heart } from 'lucide-react';

interface ActivityListProps {
  onFilterByActivity: (category: string) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({ onFilterByActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Community Gatherings' },
    { id: 'social', label: 'Social & Chai Circles' },
    { id: 'digital_literacy', label: 'Digital Literacy & Family Tech' },
    { id: 'health_camp', label: 'Geriatric Health Camps' },
    { id: 'wellness', label: 'Gentle Yoga & Wellness' },
    { id: 'civic_services', label: 'Pension & Civic Rights' },
  ];

  const filtered = selectedCategory === 'all'
    ? MOCK_COMMUNITY_ACTIVITIES
    : MOCK_COMMUNITY_ACTIVITIES.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Narrative Header */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/50 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Heart className="h-4 w-4 fill-emerald-600 text-emerald-600" />
          <span>Saathi Community Life</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Community Circles, Healing & Shared Stories
        </h1>
        <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
          Isolation in old age is not solved through clinical charts; it is healed through shared tea, recognized wisdom, gentle laughter, and knowing that your community waits for your smile every Sunday.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCategory(c.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              selectedCategory === c.id
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((act) => (
          <div
            key={act.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${act.categoryColor}`}>
                  {act.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {act.status}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">{act.title}</h2>

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

              {/* Narrative Story */}
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">What Happened in This Gathering:</span>
                {act.story}
              </div>

              {/* Elder Voice Quote */}
              <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5 text-xs text-amber-950 space-y-1">
                <div className="flex items-start gap-1.5 font-medium italic">
                  <Quote className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>"{act.elderQuote.quote}"</span>
                </div>
                <p className="text-[11px] font-bold text-amber-800 pl-5">
                  — {act.elderQuote.author}, {act.elderQuote.neighborhood}
                </p>
              </div>

              {/* Social Outcome */}
              <div className="flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/70 rounded-xl p-3 font-medium border border-emerald-100">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Community Outcome:</strong> {act.communityOutcome}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Users className="h-4 w-4 text-emerald-600" />
                {act.attendeesCount} Participating Seniors
              </span>
              <button
                type="button"
                onClick={() => onFilterByActivity(act.category)}
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Filter beneficiaries &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
