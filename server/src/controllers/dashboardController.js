import { Beneficiary } from '../models/Beneficiary.js';
import { isMongoConnected } from '../config/db.js';
import { beneficiaryController } from './beneficiaryController.js';

export const dashboardController = {
  /**
   * GET /api/dashboard & GET /api/dashboard/metrics
   */
  async getOverview(req, res, next) {
    try {
      let beneficiaries = [];

      if (isMongoConnected()) {
        beneficiaries = await Beneficiary.find({}).lean();
        const now = new Date();
        beneficiaries = beneficiaries.map(b => {
          const last = new Date(b.lastInteractionDate);
          const diffDays = Math.max(0, Math.floor((now - last) / (1000 * 60 * 60 * 24)));
          return { ...b, daysSinceContact: diffDays };
        });
      } else {
        beneficiaries = beneficiaryController._getMemoryBeneficiaries();
      }

      const total = beneficiaries.length;
      const needsAttention = beneficiaries.filter(b => b.status === 'needs_attention').length;
      const active = beneficiaries.filter(b => b.status === 'active').length;
      const atRisk = beneficiaries.filter(b => b.status === 'at_risk' || b.status === 'inactive').length;
      const uncontactedOver30 = beneficiaries.filter(b => b.daysSinceContact > 30).length;

      // Priority attention list (sorted by urgency)
      const priorityQueue = beneficiaries
        .filter(b => b.status === 'needs_attention' || b.status === 'at_risk')
        .sort((a, b) => b.daysSinceContact - a.daysSinceContact)
        .slice(0, 5);

      const responsePayload = {
        totalBeneficiaries: total,
        needsAttentionCount: needsAttention,
        activeCount: active,
        atRiskCount: atRisk,
        uncontactedOver30Days: uncontactedOver30,
        interactionsThisWeek: 8,
        priorityAttentionQueue: priorityQueue,
      };

      return res.json(responsePayload);
    } catch (error) {
      next(error);
    }
  },
};
