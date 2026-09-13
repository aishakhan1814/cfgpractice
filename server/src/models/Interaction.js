import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    beneficiaryId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: [
        'phone_call',
        'volunteer_checkin',
        'home_visit',
        'event_attendance',
        'emergency_support',
        'other',
      ],
      required: true,
    },
    date: { type: String, required: true },
    loggedBy: { type: String, default: 'Coordinator Maya' },
    notes: { type: String, required: true, trim: true },
    previousStatus: { type: String },
    newStatus: { type: String },
    followUpRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Interaction = mongoose.models.Interaction || mongoose.model('Interaction', interactionSchema);
