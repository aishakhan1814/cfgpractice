export type EngagementStatus = 'active' | 'needs_attention' | 'at_risk' | 'inactive';

export type InteractionType = 
  | 'phone_call' 
  | 'volunteer_checkin' 
  | 'home_visit' 
  | 'event_attendance' 
  | 'emergency_support' 
  | 'other';

export interface TriageSignal {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  primaryReason: string;
  humanStory: string;
  urgencyBadge: string;
  suggestedAction: string;
}

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
  personalExperience?: string;
}

export interface CommunityActivity {
  id: string;
  title: string;
  category: 'social' | 'digital_literacy' | 'health_camp' | 'wellness' | 'civic_services';
  categoryLabel: string;
  categoryColor: string;
  date: string;
  location: string;
  attendeesCount: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming' | 'Registration Open';
  story: string;
  elderQuote: {
    quote: string;
    author: string;
    neighborhood: string;
  };
  communityOutcome: string;
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
  skills?: string[];
  languages?: string[];
  hoursContributed?: number;
  spotlightBadge?: string;
  elderTestimonial?: {
    quote: string;
    elderName: string;
  };
  isSpotlight?: boolean;
  role?: string;
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
  lifeStorySnippet?: string;
  healthRemarks?: string;
  triageSignal?: TriageSignal;
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
