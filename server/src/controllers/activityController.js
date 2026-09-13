import { Activity } from '../models/Activity.js';
import { isMongoConnected } from '../config/db.js';
import { SEED_ACTIVITIES } from '../seeds/seedData.js';

export const activityController = {
  async getAll(req, res, next) {
    try {
      if (isMongoConnected()) {
        const docs = await Activity.find({}).lean();
        return res.json(docs);
      }
      return res.json(SEED_ACTIVITIES);
    } catch (error) {
      next(error);
    }
  },
};
