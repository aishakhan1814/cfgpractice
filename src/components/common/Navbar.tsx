import React from 'react';
import { Heart, Menu, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  needsAttentionCount: number;
  onNavigateToAttention: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileMenu,
  needsAttentionCount,
  onNavigateToAttention,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-500/30">
            <Heart className="h-5 w-5 fill-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Saathi <span className="text-emerald-600 font-extrabold">Foundation</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
              Elderly Care Portal
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Needs Attention Quick Trigger */}
        {needsAttentionCount > 0 && (
          <button
            type="button"
            onClick={onNavigateToAttention}
            className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-500/20 hover:bg-amber-100 transition-colors"
            title="View citizens requiring follow-up"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span>{needsAttentionCount} Need Attention</span>
          </button>
        )}

        <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Chennai Central Hub</span>
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800 text-xs border border-emerald-300">
            CM
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">Coordinator Maya</p>
            <p className="text-[11px] text-slate-500">Program Staff</p>
          </div>
        </div>
      </div>
    </header>
  );
};
