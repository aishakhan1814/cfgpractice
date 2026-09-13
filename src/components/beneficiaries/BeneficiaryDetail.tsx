import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Home, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  CalendarDays,
  ShieldAlert,
  UserX,
  FileText
} from 'lucide-react';
import { Beneficiary, EngagementStatus, InteractionType } from '../../types/beneficiary';
import { StatusBadge } from '../common/StatusBadge';

interface BeneficiaryDetailProps {
  beneficiary: Beneficiary;
  onBack: () => void;
  onOpenLogModal: (beneficiary: Beneficiary) => void;
  onUpdateStatus: (id: string, newStatus: EngagementStatus, reason?: string) => Promise<void>;
}

export const BeneficiaryDetail: React.FC<BeneficiaryDetailProps> = ({
  beneficiary,
  onBack,
  onOpenLogModal,
  onUpdateStatus,
}) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const getInteractionIcon = (type: InteractionType) => {
    switch (type) {
      case 'phone_call':
        return <Phone className="h-4 w-4 text-blue-600" />;
      case 'home_visit':
        return <Home className="h-4 w-4 text-emerald-600" />;
      case 'volunteer_checkin':
        return <UserCheck className="h-4 w-4 text-purple-600" />;
      case 'event_attendance':
        return <CalendarDays className="h-4 w-4 text-amber-600" />;
      case 'emergency_support':
        return <ShieldAlert className="h-4 w-4 text-rose-600" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const getInteractionTypeLabel = (type: InteractionType) => {
    switch (type) {
      case 'phone_call':
        return 'Phone Call';
      case 'home_visit':
        return 'In-Person Home Visit';
      case 'volunteer_checkin':
        return 'Volunteer Check-in';
      case 'event_attendance':
        return 'Community Event Attendance';
      case 'emergency_support':
        return 'Emergency / Urgent Assistance';
      default:
        return 'General Note / Interaction';
    }
  };

  const handleStatusChange = async (status: EngagementStatus) => {
    setIsUpdatingStatus(true);
    try {
      await onUpdateStatus(beneficiary.id, status);
      setShowStatusDropdown(false);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>&larr; Back to Beneficiary Directory</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick status updater */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              disabled={isUpdatingStatus}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <span>Change Status</span>
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-20 space-y-1">
                <button
                  type="button"
                  onClick={() => handleStatusChange('active')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Mark Active
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('needs_attention')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Flag Needs Attention
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('at_risk')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-800"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Flag High Risk / Isolated
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('inactive')}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left font-medium text-slate-700 hover:bg-slate-100"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Mark Inactive
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenLogModal(beneficiary)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Log Interaction</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xl border border-emerald-200">
              {beneficiary.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {beneficiary.name}
                </h1>
                <StatusBadge status={beneficiary.status} size="md" />
              </div>

              <p className="text-sm text-slate-500">
                {beneficiary.age} years old • {beneficiary.gender} • Member since {beneficiary.joinedDate}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <a href={`tel:${beneficiary.phone}`} className="hover:text-emerald-700 font-medium">
                    {beneficiary.phone}
                  </a>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{beneficiary.neighborhood}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 sm:text-right text-xs text-slate-600">
            <div className="font-semibold text-slate-700 mb-0.5">Last Direct Contact</div>
            <div className={`font-bold text-sm ${beneficiary.daysSinceContact > 30 ? 'text-rose-600' : 'text-slate-900'}`}>
              {beneficiary.daysSinceContact === 0 ? 'Today' : `${beneficiary.daysSinceContact} days ago`}
            </div>
            <div className="text-[11px] text-slate-400">{beneficiary.lastInteractionDate}</div>
          </div>
        </div>

        {/* Attention Alert Banner if present */}
        {beneficiary.needsAttentionReason && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Needs Attention Reason: </span>
              <span>{beneficiary.needsAttentionReason}</span>
            </div>
          </div>
        )}
      </div>

      {/* Grid: Details & Journey */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Context, Living situation, Emergency contact, Volunteer */}
        <div className="space-y-6 lg:col-span-1">
          {/* Living & Household Info */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Living Context
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Living Situation</span>
                <span className="font-medium text-slate-800 flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-slate-500" />
                  {beneficiary.livingSituation}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Residential Address</span>
                <span className="font-medium text-slate-800 leading-relaxed block">
                  {beneficiary.address}
                </span>
              </div>

              {beneficiary.emergencyContact && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-0.5">Emergency Contact</span>
                  <span className="font-semibold text-slate-800 block">
                    {beneficiary.emergencyContact.name} ({beneficiary.emergencyContact.relationship})
                  </span>
                  <a
                    href={`tel:${beneficiary.emergencyContact.phone}`}
                    className="text-emerald-700 hover:underline font-medium"
                  >
                    {beneficiary.emergencyContact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Assigned Volunteer */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Assigned Volunteer
            </h2>

            {beneficiary.assignedVolunteer ? (
              <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-3 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  <span>{beneficiary.assignedVolunteer.name}</span>
                </div>
                <p className="text-slate-500 pl-6">Zone: {beneficiary.assignedVolunteer.neighborhood}</p>
                <div className="pl-6 pt-1">
                  <a
                    href={`tel:${beneficiary.assignedVolunteer.phone}`}
                    className="text-emerald-700 hover:underline font-medium"
                  >
                    {beneficiary.assignedVolunteer.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 text-xs text-rose-800 flex items-center gap-2">
                <UserX className="h-4 w-4 text-rose-600 shrink-0" />
                <span>No volunteer currently assigned. Consider linking a local neighbor.</span>
              </div>
            )}
          </div>

          {/* Coordinator Notes Summary */}
          {beneficiary.notesSummary && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Staff Notes Summary
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                "{beneficiary.notesSummary}"
              </p>
            </div>
          )}

          {/* Activities Attended */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Community Activities
              </h2>
              <span className="text-xs text-slate-500">
                {beneficiary.activities.filter(a => a.attended).length} attended
              </span>
            </div>

            {beneficiary.activities.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No activity attendance records yet.</p>
            ) : (
              <div className="space-y-2">
                {beneficiary.activities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 text-xs hover:bg-slate-50"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">{act.activityName}</p>
                      <span className="text-[11px] text-slate-400">{act.date}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      Attended
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (2 cols): Chronological Engagement Journey & Interaction Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Engagement Journey & Interaction Timeline
                </h2>
                <p className="text-xs text-slate-500">
                  Comprehensive chronological log of calls, check-ins, home visits, and events
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenLogModal(beneficiary)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log New Interaction</span>
              </button>
            </div>

            {beneficiary.interactions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No past interactions logged. Be the first to record a check-in or phone call!
              </div>
            ) : (
              <div className="relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 space-y-6">
                {beneficiary.interactions.map((interaction) => (
                  <div key={interaction.id} className="relative group">
                    {/* Timeline Node dot */}
                    <div className="absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-slate-100 border border-slate-300">
                      {getInteractionIcon(interaction.type)}
                    </div>

                    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 hover:bg-white hover:shadow-xs transition-all space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800">
                          {getInteractionTypeLabel(interaction.type)}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>{interaction.date}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {interaction.notes}
                      </p>

                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span>Recorded by: <strong className="font-semibold text-slate-700">{interaction.loggedBy}</strong></span>
                        {interaction.newStatus && (
                          <span className="font-medium text-emerald-700">
                            Status updated &rarr; {interaction.newStatus}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
