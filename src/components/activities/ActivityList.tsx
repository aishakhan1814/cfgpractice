import React from 'react';
import { ActivitySnapshot } from '../dashboard/ActivitySnapshot';

interface ActivityListProps {
  onFilterByActivity: (category: string) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({ onFilterByActivity }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Community Engagement & Activities
        </h1>
        <p className="text-xs text-slate-500">
          Scheduled social circles, digital literacy drives, and geriatric health check-ups
        </p>
      </div>

      <ActivitySnapshot onFilterByActivity={onFilterByActivity} />
    </div>
  );
};
