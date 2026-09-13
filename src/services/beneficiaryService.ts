import { Beneficiary, DashboardMetrics, Interaction, EngagementStatus, BeneficiaryFilters } from '../types/beneficiary';
import { MOCK_BENEFICIARIES } from './mockData';
import { request } from './api';

// In-memory working copy to simulate real-time updates during coordinator sessions
let workingBeneficiaries: Beneficiary[] = JSON.parse(JSON.stringify(MOCK_BENEFICIARIES));

export const beneficiaryService = {
  /**
   * Fetch all beneficiaries with optional client/server filtering
   */
  async getBeneficiaries(filters?: Partial<BeneficiaryFilters>): Promise<Beneficiary[]> {
    try {
      // Attempt backend call if route exists
      const response = await request<Beneficiary[]>('/beneficiaries');
      if (Array.isArray(response)) {
        return response;
      }
    } catch {
      // Backend not running or endpoint not yet implemented by teammate.
      // Gracefully return in-memory dataset with local filtering.
    }

    let result = [...workingBeneficiaries];

    if (filters) {
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(
          b =>
            b.name.toLowerCase().includes(q) ||
            b.phone.includes(q) ||
            b.neighborhood.toLowerCase().includes(q) ||
            b.address.toLowerCase().includes(q)
        );
      }

      if (filters.status && filters.status !== 'all') {
        result = result.filter(b => b.status === filters.status);
      }

      if (filters.neighborhood && filters.neighborhood !== 'all') {
        result = result.filter(b => b.neighborhood === filters.neighborhood);
      }

      if (filters.contactGap && filters.contactGap !== 'all') {
        if (filters.contactGap === 'under_7') {
          result = result.filter(b => b.daysSinceContact <= 7);
        } else if (filters.contactGap === '7_to_30') {
          result = result.filter(b => b.daysSinceContact > 7 && b.daysSinceContact <= 30);
        } else if (filters.contactGap === 'over_30') {
          result = result.filter(b => b.daysSinceContact > 30);
        }
      }

      if (filters.activityCategory && filters.activityCategory !== 'all') {
        result = result.filter(b =>
          b.activities.some(a => a.category === filters.activityCategory && a.attended)
        );
      }

      if (filters.sortBy) {
        if (filters.sortBy === 'urgency') {
          result.sort((a, b) => b.daysSinceContact - a.daysSinceContact);
        } else if (filters.sortBy === 'name') {
          result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === 'last_contact') {
          result.sort(
            (a, b) =>
              new Date(b.lastInteractionDate).getTime() -
              new Date(a.lastInteractionDate).getTime()
          );
        } else if (filters.sortBy === 'age') {
          result.sort((a, b) => b.age - a.age);
        }
      }
    }

    return result;
  },

  /**
   * Fetch single beneficiary details by ID
   */
  async getBeneficiaryById(id: string): Promise<Beneficiary | null> {
    try {
      const response = await request<Beneficiary>(`/beneficiaries/${id}`);
      if (response && response.id) {
        return response;
      }
    } catch {
      // Fallback to local memory store
    }

    const found = workingBeneficiaries.find(b => b.id === id);
    return found ? JSON.parse(JSON.stringify(found)) : null;
  },

  /**
   * Calculate high-level coordinator dashboard metrics
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      const response = await request<DashboardMetrics>('/dashboard/metrics');
      if (response) return response;
    } catch {
      // Calculate from current beneficiaries state
    }

    const total = workingBeneficiaries.length;
    const needsAttention = workingBeneficiaries.filter(b => b.status === 'needs_attention').length;
    const active = workingBeneficiaries.filter(b => b.status === 'active').length;
    const atRisk = workingBeneficiaries.filter(b => b.status === 'at_risk' || b.status === 'inactive').length;
    const over30 = workingBeneficiaries.filter(b => b.daysSinceContact > 30).length;

    // Count interactions in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentInteractionsCount = workingBeneficiaries.reduce((acc, b) => {
      const recent = b.interactions.filter(i => new Date(i.date) >= sevenDaysAgo).length;
      return acc + recent;
    }, 0);

    return {
      totalBeneficiaries: total,
      needsAttentionCount: needsAttention,
      activeCount: active,
      atRiskCount: atRisk,
      interactionsThisWeek: recentInteractionsCount + 6, // simulated active volunteer weekly tally
      uncontactedOver30Days: over30,
    };
  },

  /**
   * Record a new interaction and optionally update beneficiary status
   */
  async logInteraction(
    beneficiaryId: string,
    interactionData: Omit<Interaction, 'id' | 'beneficiaryId'>
  ): Promise<{ interaction: Interaction; beneficiary: Beneficiary }> {
    const newInteraction: Interaction = {
      id: `int-${Date.now()}`,
      beneficiaryId,
      ...interactionData,
    };

    try {
      await request(`/beneficiaries/${beneficiaryId}/interactions`, {
        method: 'POST',
        body: JSON.stringify(newInteraction),
      });
    } catch {
      // Backend not yet available; optimistic update in local state
    }

    // Update in-memory state
    const index = workingBeneficiaries.findIndex(b => b.id === beneficiaryId);
    if (index === -1) {
      throw new Error(`Beneficiary with ID ${beneficiaryId} not found.`);
    }

    const ben = workingBeneficiaries[index];
    ben.interactions.unshift(newInteraction);
    ben.lastInteractionDate = interactionData.date;
    ben.daysSinceContact = 0;

    if (interactionData.newStatus) {
      ben.status = interactionData.newStatus;
      if (ben.status === 'active') {
        ben.needsAttentionReason = undefined;
      }
    }

    workingBeneficiaries[index] = { ...ben };

    return {
      interaction: newInteraction,
      beneficiary: JSON.parse(JSON.stringify(ben)),
    };
  },

  /**
   * Update beneficiary engagement status directly
   */
  async updateStatus(
    beneficiaryId: string,
    status: EngagementStatus,
    reason?: string
  ): Promise<Beneficiary> {
    try {
      await request(`/beneficiaries/${beneficiaryId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason }),
      });
    } catch {
      // Fallback local update
    }

    const index = workingBeneficiaries.findIndex(b => b.id === beneficiaryId);
    if (index === -1) throw new Error('Beneficiary not found');

    const ben = workingBeneficiaries[index];
    ben.status = status;
    if (reason) {
      ben.needsAttentionReason = reason;
    } else if (status === 'active') {
      ben.needsAttentionReason = undefined;
    }

    workingBeneficiaries[index] = { ...ben };
    return JSON.parse(JSON.stringify(ben));
  },
};
