import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Beneficiary, EngagementStatus, InteractionType } from '../../types/beneficiary';
import { Phone, Home, UserCheck, CalendarDays, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

interface InteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: Beneficiary | null;
  onSubmit: (
    beneficiaryId: string,
    data: {
      type: InteractionType;
      date: string;
      notes: string;
      loggedBy: string;
      newStatus?: EngagementStatus;
      followUpRequired?: boolean;
    }
  ) => Promise<void>;
}

export const InteractionModal: React.FC<InteractionModalProps> = ({
  isOpen,
  onClose,
  beneficiary,
  onSubmit,
}) => {
  if (!beneficiary) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const [interactionType, setInteractionType] = useState<InteractionType>('phone_call');
  const [date, setDate] = useState<string>(todayStr);
  const [notes, setNotes] = useState<string>('');
  const [newStatus, setNewStatus] = useState<EngagementStatus>('active');
  const [updateStatusOption, setUpdateStatusOption] = useState<boolean>(true);
  const [followUpRequired, setFollowUpRequired] = useState<boolean>(false);
  const [loggedBy, setLoggedBy] = useState<string>('Coordinator Maya');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const interactionOptions: { type: InteractionType; label: string; icon: any }[] = [
    { type: 'phone_call', label: 'Phone Call', icon: Phone },
    { type: 'volunteer_checkin', label: 'Volunteer Check-in', icon: UserCheck },
    { type: 'home_visit', label: 'Home Visit', icon: Home },
    { type: 'event_attendance', label: 'Event Attendance', icon: CalendarDays },
    { type: 'emergency_support', label: 'Emergency Support', icon: ShieldAlert },
    { type: 'other', label: 'Other Note', icon: FileText },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      setErrorMessage('Please enter a brief note about the interaction.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await onSubmit(beneficiary.id, {
        type: interactionType,
        date,
        notes: notes.trim(),
        loggedBy: loggedBy.trim() || 'Coordinator',
        newStatus: updateStatusOption ? newStatus : undefined,
        followUpRequired,
      });

      // Reset form
      setNotes('');
      setErrorMessage(null);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to record interaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Log Interaction — ${beneficiary.name}`}
      subtitle={`Last contacted ${beneficiary.daysSinceContact} days ago (${beneficiary.lastInteractionDate})`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
            {errorMessage}
          </div>
        )}

        {/* Interaction Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Interaction Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {interactionOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = interactionType === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setInteractionType(opt.type)}
                  className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-800 ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date and Logged By */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Interaction
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Recorded By
            </label>
            <input
              type="text"
              value={loggedBy}
              onChange={(e) => setLoggedBy(e.target.value)}
              placeholder="e.g. Coordinator Maya"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Notes / Observation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes & Observations <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Summarize key points: wellbeing status, family updates, requests for groceries/ration, health remarks..."
            required
            className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Status Update Toggle */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={updateStatusOption}
                onChange={(e) => setUpdateStatusOption(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Update Beneficiary Engagement Status</span>
            </label>
            <span className="text-[11px] text-slate-400">Current: {beneficiary.status}</span>
          </div>

          {updateStatusOption && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setNewStatus('active')}
                className={`flex items-center justify-center gap-1.5 rounded-lg border p-2 text-xs font-semibold transition-colors ${
                  newStatus === 'active'
                    ? 'border-emerald-500 bg-emerald-100/70 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Mark as Active</span>
              </button>
              <button
                type="button"
                onClick={() => setNewStatus('needs_attention')}
                className={`flex items-center justify-center gap-1.5 rounded-lg border p-2 text-xs font-semibold transition-colors ${
                  newStatus === 'needs_attention'
                    ? 'border-amber-500 bg-amber-100/70 text-amber-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>Needs Follow-up</span>
              </button>
            </div>
          )}
        </div>

        {/* Urgent follow-up flag */}
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
          <input
            type="checkbox"
            checked={followUpRequired}
            onChange={(e) => setFollowUpRequired(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <span>Flag for high-priority volunteer follow-up within 48 hours</span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Save & Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
