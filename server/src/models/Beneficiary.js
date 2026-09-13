import mongoose from 'mongoose';

const interactionSubSchema = new mongoose.Schema(
  {
    id: String,
    beneficiaryId: String,
    type: { type: String },
    date: String,
    loggedBy: String,
    notes: String,
    previousStatus: String,
    newStatus: String,
    followUpRequired: Boolean,
  },
  { _id: false }
);

const activitySubSchema = new mongoose.Schema(
  {
    id: String,
    activityName: String,
    date: String,
    category: String,
    attended: Boolean,
  },
  { _id: false }
);

const beneficiarySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Female', 'Male', 'Other'], default: 'Female' },
    phone: { type: String, default: '' },
    neighborhood: { type: String, required: true, index: true },
    address: { type: String, default: '' },
    livingSituation: {
      type: String,
      enum: ['Lives Alone', 'With Spouse / Partner', 'With Extended Family', 'Assisted / Sheltered'],
      default: 'Lives Alone',
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ['active', 'needs_attention', 'at_risk', 'inactive'],
      default: 'needs_attention',
      index: true,
    },
    lastInteractionDate: { type: String, required: true },
    daysSinceContact: { type: Number, default: 0 },
    assignedVolunteer: {
      id: String,
      name: String,
      phone: String,
      neighborhood: String,
    },
    needsAttentionReason: { type: String },
    notesSummary: { type: String },
    joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    interactions: [interactionSubSchema],
    activities: [activitySubSchema],
  },
  { timestamps: true }
);

// Virtual calculation for daysSinceContact
beneficiarySchema.methods.recalculateDaysSinceContact = function () {
  if (!this.lastInteractionDate) return 999;
  const last = new Date(this.lastInteractionDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - last.getTime());
  this.daysSinceContact = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return this.daysSinceContact;
};

export const Beneficiary = mongoose.models.Beneficiary || mongoose.model('Beneficiary', beneficiarySchema);
