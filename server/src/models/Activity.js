import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['social', 'digital_literacy', 'health_camp', 'wellness', 'civic_services'],
      required: true,
    },
    categoryLabel: { type: String },
    categoryColor: { type: String },
    date: { type: String, required: true },
    location: { type: String, required: true },
    attendeesCount: { type: Number, default: 0 },
    status: { type: String, default: 'Upcoming' },
    story: { type: String },
    elderQuote: {
      quote: String,
      author: String,
      neighborhood: String,
    },
    communityOutcome: { type: String },
  },
  { timestamps: true }
);

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
