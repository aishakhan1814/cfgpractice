import mongoose from 'mongoose';
import { Beneficiary } from '../models/Beneficiary.js';
import { isMongoConnected } from '../config/db.js';
import { SEED_BENEFICIARIES } from '../seeds/seedData.js';

// Resilient memory store initialized with seed data for instant demo functionality
let memoryBeneficiaries = JSON.parse(JSON.stringify(SEED_BENEFICIARIES));

function calcDaysSince(dateStr) {
  if (!dateStr) return 999;
  const last = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - last.getTime();
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

export const beneficiaryController = {
  /**
   * GET /api/beneficiaries
   */
  async getAll(req, res, next) {
    try {
      const { search, status, neighborhood, contactGap, sortBy } = req.query;

      if (isMongoConnected()) {
        const filter = {};
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { neighborhood: { $regex: search, $options: 'i' } },
          ];
        }
        if (status && status !== 'all') filter.status = status;
        if (neighborhood && neighborhood !== 'all') filter.neighborhood = neighborhood;

        let docs = await Beneficiary.find(filter).lean();
        docs = docs.map(d => ({
          ...d,
          daysSinceContact: calcDaysSince(d.lastInteractionDate),
        }));

        if (contactGap && contactGap !== 'all') {
          if (contactGap === 'under_7') docs = docs.filter(d => d.daysSinceContact <= 7);
          else if (contactGap === '7_to_30') docs = docs.filter(d => d.daysSinceContact > 7 && d.daysSinceContact <= 30);
          else if (contactGap === 'over_30') docs = docs.filter(d => d.daysSinceContact > 30);
        }

        return res.json(docs);
      }

      // Memory Store Fallback
      let result = memoryBeneficiaries.map(b => ({
        ...b,
        daysSinceContact: calcDaysSince(b.lastInteractionDate),
      }));

      if (search) {
        const q = search.toLowerCase().trim();
        result = result.filter(
          b =>
            b.name.toLowerCase().includes(q) ||
            b.phone.includes(q) ||
            b.neighborhood.toLowerCase().includes(q) ||
            (b.address && b.address.toLowerCase().includes(q))
        );
      }

      if (status && status !== 'all') {
        result = result.filter(b => b.status === status);
      }

      if (neighborhood && neighborhood !== 'all') {
        result = result.filter(b => b.neighborhood === neighborhood);
      }

      if (contactGap && contactGap !== 'all') {
        if (contactGap === 'under_7') {
          result = result.filter(b => b.daysSinceContact <= 7);
        } else if (contactGap === '7_to_30') {
          result = result.filter(b => b.daysSinceContact > 7 && b.daysSinceContact <= 30);
        } else if (contactGap === 'over_30') {
          result = result.filter(b => b.daysSinceContact > 30);
        }
      }

      if (sortBy) {
        if (sortBy === 'urgency') {
          result.sort((a, b) => b.daysSinceContact - a.daysSinceContact);
        } else if (sortBy === 'name') {
          result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'last_contact') {
          result.sort((a, b) => new Date(b.lastInteractionDate).getTime() - new Date(a.lastInteractionDate).getTime());
        } else if (sortBy === 'age') {
          result.sort((a, b) => b.age - a.age);
        }
      }

      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/beneficiaries/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      if (isMongoConnected()) {
        const query = mongoose.Types.ObjectId.isValid(id) ? { $or: [{ id }, { _id: id }] } : { id };
        const doc = await Beneficiary.findOne(query).lean();
        if (!doc) {
          return res.status(404).json({ error: `Beneficiary '${id}' not found.` });
        }
        return res.json({
          ...doc,
          daysSinceContact: calcDaysSince(doc.lastInteractionDate),
        });
      }

      const found = memoryBeneficiaries.find(b => b.id === id);
      if (!found) {
        return res.status(404).json({ error: `Beneficiary '${id}' not found.` });
      }

      return res.json({
        ...found,
        daysSinceContact: calcDaysSince(found.lastInteractionDate),
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/beneficiaries/:id/status or PATCH /api/beneficiaries/:id
   */
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Field "status" is required.' });
      }

      if (isMongoConnected()) {
        const updateData = { status };
        if (reason !== undefined) updateData.needsAttentionReason = reason;
        if (status === 'active') updateData.needsAttentionReason = null;

        const query = mongoose.Types.ObjectId.isValid(id) ? { $or: [{ id }, { _id: id }] } : { id };
        const updated = await Beneficiary.findOneAndUpdate(
          query,
          updateData,
          { new: true }
        ).lean();

        if (!updated) return res.status(404).json({ error: 'Beneficiary not found.' });
        return res.json(updated);
      }

      const ben = memoryBeneficiaries.find(b => b.id === id);
      if (!ben) return res.status(404).json({ error: 'Beneficiary not found.' });

      ben.status = status;
      if (reason !== undefined) ben.needsAttentionReason = reason;
      if (status === 'active') ben.needsAttentionReason = undefined;

      return res.json({ ...ben, daysSinceContact: calcDaysSince(ben.lastInteractionDate) });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Internal helper for interaction controller to record interaction in memory store
   */
  _recordInteractionInMemory(beneficiaryId, interaction) {
    const ben = memoryBeneficiaries.find(b => b.id === beneficiaryId);
    if (!ben) return null;

    ben.interactions.unshift(interaction);
    ben.lastInteractionDate = interaction.date;
    ben.daysSinceContact = 0;

    if (interaction.newStatus) {
      ben.status = interaction.newStatus;
      if (ben.status === 'active') ben.needsAttentionReason = undefined;
    }

    return JSON.parse(JSON.stringify(ben));
  },

  /**
   * Internal helper to retrieve raw memory beneficiaries for dashboard calculations
   */
  _getMemoryBeneficiaries() {
    return memoryBeneficiaries.map(b => ({
      ...b,
      daysSinceContact: calcDaysSince(b.lastInteractionDate),
    }));
  },
};
