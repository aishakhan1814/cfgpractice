import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    neighborhood: { type: String, required: true },
    skills: [{ type: String }],
    languages: [{ type: String }],
    hoursContributed: { type: Number, default: 0 },
    role: { type: String },
    isSpotlight: { type: Boolean, default: false },
    spotlightBadge: { type: String },
    elderTestimonial: { type: mongoose.Schema.Types.Mixed },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
