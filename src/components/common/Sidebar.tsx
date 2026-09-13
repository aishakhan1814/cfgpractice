import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  Calendar, 
  HeartHandshake,
  Heart,
  Info
} from 'lucide-react';

export type NavItem = 'dashboard' | 'beneficiaries' | 'needs_attention' | 'activities' | 'volunteers' | 'join_saathi';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  needsAttentionCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  needsAttentionCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavItem,
      label: 'Coordinator Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'beneficiaries' as NavItem,
      label: 'Beneficiary Directory',
      icon: Users,
      badge: null,
    },
    {
      id: 'needs_attention' as NavItem,
      label: 'Needs Attention',
      icon: AlertCircle,
      badge: needsAttentionCount > 0 ? needsAttentionCount : null,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'activities' as NavItem,
      label: 'Activity & Events',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'volunteers' as NavItem,
      label: 'Volunteer Network',
      icon: HeartHandshake,
      badge: null,
    },
    {
      id: 'join_saathi' as NavItem,
      label: 'Join Saathi Movement',
      icon: Heart,
      badge: 'Help',
      badgeColor: 'bg-rose-100 text-rose-800 font-bold',
    },
  ];

  const handleItemClick = (id: NavItem) => {
    onSelectTab(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Primary Navigation
          </p>
          <nav className="mt-2 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? 'bg-white text-emerald-800'
                          : item.badgeColor || 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Context / NGO Mission Box */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 text-xs text-emerald-900">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-800 mb-1">
            <Info className="h-4 w-4" />
            <span>Saathi Mission</span>
          </div>
          <p className="text-emerald-700 text-[11px] leading-relaxed">
            Supporting 3,000+ elderly citizens living alone. Timely check-ins prevent social isolation.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-400">
        <p className="font-medium text-slate-600">Saathi Portal v1.0</p>
        <p>Code for Good Hackathon</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
