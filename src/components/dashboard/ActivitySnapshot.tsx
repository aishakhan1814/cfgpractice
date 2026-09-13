import React from 'react';
import { Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

interface ActivitySnapshotProps {
  onFilterByActivity?: (category: string) => void;
}

export const ActivitySnapshot: React.FC<ActivitySnapshotProps> = ({ onFilterByActivity }) => {
  const activities = [
    {
      id: '1',
      title: 'Chai & Chat Senior Social Circle',
      category: 'social',
      categoryLabel: 'Social Engagement',
      categoryColor: 'bg-blue-50 text-blue-700 border-blue-200',
      date: 'Weekly • Every Sunday 4:30 PM',
      location: 'Mylapore Community Hall',
      attendees: 28,
      status: 'Ongoing',
    },
    {
      id: '2',
      title: 'Digital Literacy: Smartphone & Online Safety',
      category: 'digital_literacy',
      categoryLabel: 'Digital Literacy',
      categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
      date: 'Sept 11, 2026',
      location: 'Anna Nagar Library Center',
      attendees: 19,
      status: 'Completed',
    },
    {
      id: '3',
      title: 'Geriatric Health & Free Blood Pressure Camp',
      category: 'health_camp',
      categoryLabel: 'Health & Wellness',
      categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: 'Sept 18, 2026 (Upcoming)',
      location: 'Adyar Primary Health Pavilion',
      attendees: 35,
      status: 'Registration Open',
    },
    {
      id: '4',
      title: 'Pension & Civic Documentation Helpdesk',
      category: 'civic_services',
      categoryLabel: 'Civic Services',
      categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
      date: 'Monthly • 1st Saturday',
      location: 'T. Nagar Seva Samithi',
      attendees: 16,
      status: 'Completed',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Community Program Snapshot</h3>
            <p className="text-xs text-slate-500">Key outreach activities combating loneliness</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${act.categoryColor}`}
                >
                  {act.categoryLabel}
                </span>
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {act.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 leading-snug">{act.title}</h4>
              <div className="mt-2 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{act.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{act.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                {act.attendees} Participating Elders
              </span>
              {onFilterByActivity && (
                <button
                  type="button"
                  onClick={() => onFilterByActivity(act.category)}
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Filter elders &rarr;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
