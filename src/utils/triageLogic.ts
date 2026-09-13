import { Beneficiary, TriageSignal } from '../types/beneficiary';

/**
 * Deterministic, explainable rule engine that analyzes an elderly citizen's
 * engagement journey, health remarks, and living situation to produce an
 * empathetic and actionable triage signal.
 * 
 * INPUT: Beneficiary record with daysSinceContact, livingSituation, volunteer, health context
 * PROCESSING: Evaluates 4 transparent human-centered rules
 * OUTPUT: TriageSignal with severity, human story, badge, and 1-click suggested action
 * EXPLANATION: Provides coordinators with the real human context behind numbers
 */
export function evaluateTriageSignal(beneficiary: Partial<Beneficiary>): TriageSignal | undefined {
  const days = beneficiary.daysSinceContact ?? 0;
  const livesAlone = beneficiary.livingSituation === 'Lives Alone';
  const hasVolunteer = Boolean(beneficiary.assignedVolunteer);
  const health = (beneficiary.healthRemarks || beneficiary.notesSummary || '').toLowerCase();
  const lastInteraction = beneficiary.interactions?.[0];
  const lastNotes = (lastInteraction?.notes || '').toLowerCase();

  // Rule 1: Extreme Isolation Risk (Over 60 days uncontacted AND unassigned volunteer)
  if (days > 60 && !hasVolunteer) {
    return {
      severity: 'CRITICAL',
      primaryReason: 'Critical Unassigned Isolation',
      humanStory: `${beneficiary.name} (${beneficiary.age}) has had no direct contact for ${days} days and does not have an assigned volunteer companion. Living in ${beneficiary.neighborhood} without active family check-ins creates high risk of silent distress.`,
      urgencyBadge: `${days} Days Inactive • No Volunteer Linked`,
      suggestedAction: `Match with a nearby ${beneficiary.neighborhood} volunteer companion today for an urgent doorstep wellness check.`,
    };
  }

  // Rule 2: Solo Elder with Mobility or Health Barrier
  const hasHealthDistress = 
    health.includes('arthritis') || 
    health.includes('knee') || 
    health.includes('bp') || 
    health.includes('stair') || 
    health.includes('surgery') || 
    health.includes('diabetes') ||
    health.includes('memory') ||
    health.includes('appetite');

  if (days > 30 && livesAlone && hasHealthDistress) {
    return {
      severity: 'HIGH',
      primaryReason: 'Solo Elder with Mobility/Health Barrier',
      humanStory: `${beneficiary.name} (${beneficiary.age}) lives alone and has reported health/mobility challenges. Over 30 days have passed without an in-person check to verify medicine supply and physical comfort.`,
      urgencyBadge: `${days} Days Inactive • Solo Resident • Health Context`,
      suggestedAction: `Dispatch assigned volunteer ${beneficiary.assignedVolunteer?.name || 'companion'} to deliver groceries and check mobility.`,
    };
  }

  // Rule 3: Unanswered Outreach Flag
  if (lastInteraction?.type === 'phone_call' && (lastNotes.includes('unanswered') || lastNotes.includes('disconnected') || lastNotes.includes('no response'))) {
    return {
      severity: 'HIGH',
      primaryReason: 'Unanswered Outreach Call',
      humanStory: `A recent phone call went unanswered or disconnected ${days} days ago. Phone attempts alone have not re-established contact.`,
      urgencyBadge: `Unanswered Phone Call • Needs Physical Check`,
      suggestedAction: `Contact building neighbor or dispatch a local volunteer to check door in person.`,
    };
  }

  // Rule 4: Sudden Social Circle Withdrawal (Missed routine weekly community events)
  if (days > 25 && beneficiary.status === 'needs_attention') {
    return {
      severity: 'MEDIUM',
      primaryReason: 'Social Circle Disengagement',
      humanStory: `${beneficiary.name} previously enjoyed community interactions but has not attended recent weekly sessions. An unhurried, friendly call can restore connection.`,
      urgencyBadge: `${days} Days Inactive • Missed Gatherings`,
      suggestedAction: `Make a warm, 10-minute coordinator call to invite them to the upcoming Sunday Chai & Chat.`,
    };
  }

  return undefined;
}
