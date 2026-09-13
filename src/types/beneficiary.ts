export type EngagementStatus = 'active' | 'needs_attention' | 'at_risk' | 'inactive';

export type InteractionType = 
  | 'phone_call' 
  | 'volunteer_checkin' 
  | 'home_visit' 
  | 'event_attendance' 
  | 'emergency_support' 
  | 'other';

export interface Interaction {
  id: string;
  beneficiaryId: string;
  type: InteractionType;
  date: string; // ISO date or YYYY-MM-DD
  loggedBy: string;
  notes: string;
  previousStatus?: EngagementStatus;
  newStatus?: EngagementStatus;
  followUpRequired?: boolean;
}

export interface ActivityParticipation {
  id: string;
  activityName: string;
  date: string;
  category: 'social' | 'digital_literacy' | 'health_camp' | 'wellness' | 'civic_services';
  attended: boolean;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  neighborhood: string;
  address: string;
  livingSituation: 'Lives Alone' | 'With Spouse / Partner' | 'With Extended Family' | 'Assisted / Sheltered';
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  status: EngagementStatus;
  lastInteractionDate: string; // YYYY-MM-DD
  daysSinceContact: number;
  assignedVolunteer?: Volunteer;
  needsAttentionReason?: string;
  notesSummary?: string;
  interactions: Interaction[];
  activities: ActivityParticipation[];
  joinedDate: string;
}

export interface DashboardMetrics {
  totalBeneficiaries: number;
  needsAttentionCount: number;
  activeCount: number;
  atRiskCount: number;
  interactionsThisWeek: number;
  uncontactedOver30Days: number;
}

export interface BeneficiaryFilters {
  search: string;
  status: EngagementStatus | 'all';
  neighborhood: string;
  contactGap: 'all' | 'under_7' | '7_to_30' | 'over_30' | 'never';
  activityCategory: string;
  sortBy: 'urgency' | 'name' | 'last_contact' | 'age';
}
