import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    neighborhood: { type: String, required: true },
    skills: [{ type: String }],
    languages: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
