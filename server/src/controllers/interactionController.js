import mongoose from 'mongoose';
import { Interaction } from '../models/Interaction.js';
import { Beneficiary } from '../models/Beneficiary.js';
import { isMongoConnected } from '../config/db.js';
import { beneficiaryController } from './beneficiaryController.js';

export const interactionController = {
  /**
   * POST /api/beneficiaries/:id/interactions OR POST /api/interactions
   */
  async create(req, res, next) {
    try {
      const beneficiaryId = req.params.id || req.body.beneficiaryId;
      const { type, date, notes, loggedBy, newStatus, followUpRequired } = req.body;

      if (!beneficiaryId) {
        return res.status(400).json({ error: 'beneficiaryId is required.' });
      }

      if (!notes || !type) {
        return res.status(400).json({ error: 'Fields "type" and "notes" are required.' });
      }

      const interactionRecord = {
        id: `int-${Date.now()}`,
        beneficiaryId,
        type,
        date: date || new Date().toISOString().split('T')[0],
        notes: notes.trim(),
        loggedBy: loggedBy || 'Coordinator Maya',
        newStatus: newStatus || undefined,
        followUpRequired: Boolean(followUpRequired),
      };

      if (isMongoConnected()) {
        // Create interaction in MongoDB
        const createdInteraction = await Interaction.create(interactionRecord);

        // Update beneficiary in MongoDB
        const updateFields = {
          lastInteractionDate: interactionRecord.date,
          $push: { interactions: { $each: [interactionRecord], $position: 0 } },
        };
        if (newStatus) {
          updateFields.status = newStatus;
          if (newStatus === 'active') updateFields.needsAttentionReason = null;
        }

        const query = mongoose.Types.ObjectId.isValid(beneficiaryId)
          ? { $or: [{ id: beneficiaryId }, { _id: beneficiaryId }] }
          : { id: beneficiaryId };

        const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
          query,
          updateFields,
          { new: true }
        ).lean();

        if (!updatedBeneficiary) {
          return res.status(404).json({ error: `Beneficiary '${beneficiaryId}' not found.` });
        }

        return res.status(201).json({
          interaction: createdInteraction,
          beneficiary: updatedBeneficiary,
        });
      }

      // Memory Store Fallback
      const updatedBeneficiary = beneficiaryController._recordInteractionInMemory(
        beneficiaryId,
        interactionRecord
      );

      if (!updatedBeneficiary) {
        return res.status(404).json({ error: `Beneficiary '${beneficiaryId}' not found.` });
      }

      return res.status(201).json({
        interaction: interactionRecord,
        beneficiary: updatedBeneficiary,
      });
    } catch (error) {
      next(error);
    }
  },
};
