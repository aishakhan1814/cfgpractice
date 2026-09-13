import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar, NavItem } from './components/common/Sidebar';
import { CoordinatorDashboard } from './components/dashboard/CoordinatorDashboard';
import { BeneficiaryList } from './components/beneficiaries/BeneficiaryList';
import { BeneficiaryDetail } from './components/beneficiaries/BeneficiaryDetail';
import { InteractionModal } from './components/interactions/InteractionModal';
import { VolunteerOverview } from './components/volunteers/VolunteerOverview';
import { ActivityList } from './components/activities/ActivityList';
import { JoinSaathiPage } from './components/join/JoinSaathiPage';
import { beneficiaryService } from './services/beneficiaryService';
import { Beneficiary, DashboardMetrics, BeneficiaryFilters, EngagementStatus, InteractionType } from './types/beneficiary';
import { CheckCircle2 } from 'lucide-react';

const DEFAULT_FILTERS: BeneficiaryFilters = {
  search: '',
  status: 'all',
  neighborhood: 'all',
  contactGap: 'all',
  activityCategory: 'all',
  sortBy: 'urgency',
};

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavItem>('dashboard');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [modalBeneficiary, setModalBeneficiary] = useState<Beneficiary | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBeneficiaries: 0,
    needsAttentionCount: 0,
    activeCount: 0,
    atRiskCount: 0,
    interactionsThisWeek: 0,
    uncontactedOver30Days: 0,
  });
  const [filters, setFilters] = useState<BeneficiaryFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load data on mount and whenever filters change
  const loadData = async (currentFilters = filters) => {
    setIsLoading(true);
    try {
      const [list, dashboardMetrics] = await Promise.all([
        beneficiaryService.getBeneficiaries(currentFilters),
        beneficiaryService.getDashboardMetrics(),
      ]);
      setBeneficiaries(list);
      setMetrics(dashboardMetrics);

      // If a beneficiary is currently viewed in detail, refresh their record
      if (selectedBeneficiary) {
        const updated = await beneficiaryService.getBeneficiaryById(selectedBeneficiary.id);
        if (updated) setSelectedBeneficiary(updated);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters);
  }, [filters]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Quick navigation helpers
  const handleSelectBeneficiary = (b: Beneficiary) => {
    setSelectedBeneficiary(b);
  };

  const handleBackToDirectory = () => {
    setSelectedBeneficiary(null);
  };

  const handleOpenInteractionModal = (b: Beneficiary) => {
    setModalBeneficiary(b);
  };

  const handleCloseInteractionModal = () => {
    setModalBeneficiary(null);
  };

  const handleFilterNeedsAttention = () => {
    setSelectedBeneficiary(null);
    setFilters({ ...DEFAULT_FILTERS, status: 'needs_attention' });
    setCurrentTab('beneficiaries');
  };

  const handleFilterOver30Days = () => {
    setSelectedBeneficiary(null);
    setFilters({ ...DEFAULT_FILTERS, contactGap: 'over_30' });
    setCurrentTab('beneficiaries');
  };

  const handleFilterActive = () => {
    setSelectedBeneficiary(null);
    setFilters({ ...DEFAULT_FILTERS, status: 'active' });
    setCurrentTab('beneficiaries');
  };

  const handleFilterByActivity = (category: string) => {
    setSelectedBeneficiary(null);
    setFilters({ ...DEFAULT_FILTERS, activityCategory: category });
    setCurrentTab('beneficiaries');
  };

  const handleTabChange = (tab: NavItem) => {
    setSelectedBeneficiary(null);
    setCurrentTab(tab);

    if (tab === 'needs_attention') {
      setFilters({ ...DEFAULT_FILTERS, status: 'needs_attention' });
    } else if (tab === 'beneficiaries') {
      setFilters(DEFAULT_FILTERS);
    }
  };

  // Submit interaction form
  const handleInteractionSubmit = async (
    beneficiaryId: string,
    data: {
      type: InteractionType;
      date: string;
      notes: string;
      loggedBy: string;
      newStatus?: EngagementStatus;
      followUpRequired?: boolean;
    }
  ) => {
    const res = await beneficiaryService.logInteraction(beneficiaryId, data);
    
    // Refresh datasets
    await loadData();
    if (selectedBeneficiary && selectedBeneficiary.id === beneficiaryId) {
      setSelectedBeneficiary(res.beneficiary);
    }

    showToast(`Interaction recorded successfully for ${res.beneficiary.name}.`);
  };

  // Update status directly from profile
  const handleUpdateStatus = async (id: string, status: EngagementStatus, reason?: string) => {
    const updated = await beneficiaryService.updateStatus(id, status, reason);
    await loadData();
    setSelectedBeneficiary(updated);
    showToast(`Status updated to ${status} for ${updated.name}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        onToggleMobileMenu={() => setIsOpenMobileMenu(true)}
        needsAttentionCount={metrics.needsAttentionCount}
        onNavigateToAttention={handleFilterNeedsAttention}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleTabChange}
          needsAttentionCount={metrics.needsAttentionCount}
          isOpenMobile={isOpenMobileMenu}
          onCloseMobile={() => setIsOpenMobileMenu(false)}
        />

        {/* Dynamic Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Toast Alert */}
          {toastMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md animate-fade-in">
              <CheckCircle2 className="h-5 w-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && beneficiaries.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                <span>Loading beneficiary data...</span>
              </div>
            </div>
          ) : selectedBeneficiary ? (
            /* Beneficiary Detail View */
            <BeneficiaryDetail
              beneficiary={selectedBeneficiary}
              onBack={handleBackToDirectory}
              onOpenLogModal={handleOpenInteractionModal}
              onUpdateStatus={handleUpdateStatus}
            />
          ) : currentTab === 'dashboard' ? (
            /* Coordinator Dashboard */
            <CoordinatorDashboard
              metrics={metrics}
              beneficiaries={beneficiaries}
              onSelectBeneficiary={handleSelectBeneficiary}
              onLogInteraction={handleOpenInteractionModal}
              onFilterNeedsAttention={handleFilterNeedsAttention}
              onFilterOver30Days={handleFilterOver30Days}
              onFilterActive={handleFilterActive}
              onFilterByActivity={handleFilterByActivity}
              onNavigateToDirectory={() => handleTabChange('beneficiaries')}
            />
          ) : currentTab === 'beneficiaries' || currentTab === 'needs_attention' ? (
            /* Beneficiary Directory */
            <BeneficiaryList
              beneficiaries={beneficiaries}
              filters={filters}
              onFilterChange={setFilters}
              onSelectBeneficiary={handleSelectBeneficiary}
              onLogInteraction={handleOpenInteractionModal}
            />
          ) : currentTab === 'volunteers' ? (
            /* Volunteer Overview */
            <VolunteerOverview
              beneficiaries={beneficiaries}
              onSelectBeneficiary={handleSelectBeneficiary}
            />
          ) : currentTab === 'activities' ? (
            /* Activity Directory */
            <ActivityList onFilterByActivity={handleFilterByActivity} />
          ) : currentTab === 'join_saathi' ? (
            /* Join Saathi Movement */
            <JoinSaathiPage />
          ) : null}
        </main>
      </div>

      {/* Interaction Logging Modal */}
      <InteractionModal
        isOpen={modalBeneficiary !== null}
        onClose={handleCloseInteractionModal}
        beneficiary={modalBeneficiary}
        onSubmit={handleInteractionSubmit}
      />
    </div>
  );
};

export default App;
