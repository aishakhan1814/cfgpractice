import { Volunteer } from '../models/Volunteer.js';
import { isMongoConnected } from '../config/db.js';
import { SEED_VOLUNTEERS } from '../seeds/seedData.js';

export const volunteerController = {
  async getAll(req, res, next) {
    try {
      if (isMongoConnected()) {
        const docs = await Volunteer.find({}).lean();
        return res.json(docs);
      }
      return res.json(SEED_VOLUNTEERS);
    } catch (error) {
      next(error);
    }
  },
};
