import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Sliders, 
  Image as ImageIcon,
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Plus, 
  X,
  Sparkles,
  ChevronRight,
  FolderOpen,
  Layers
} from 'lucide-react';
import { AdminUser } from '../../pages/AdminLoginPage';

export type AdminTab = 'overview' | 'properties' | 'projects' | 'leads' | 'hero' | 'media' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  currentUser: AdminUser;
  onLogout: () => void;
  onBackToSite: () => void;
  onOpenNewPropertyModal: () => void;
  propertyCount: number;
  projectsCount?: number;
  newLeadsCount: number;
  featuredCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  onBackToSite,
  onOpenNewPropertyModal,
  propertyCount,
  projectsCount = 4,
  newLeadsCount,
  featuredCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const menuItems: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: TrendingUp,
    },
    {
      id: 'properties',
      label: 'Property Portfolio',
      icon: Building2,
      badge: propertyCount,
      badgeColor: 'bg-purple-900/60 text-purple-300 border border-purple-700/50',
    },
    {
      id: 'projects',
      label: 'Landmark Projects',
      icon: Layers,
      badge: projectsCount,
      badgeColor: 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50',
    },
    {
      id: 'leads',
      label: 'Leads & Enquiries CRM',
      icon: Users,
      badge: newLeadsCount > 0 ? newLeadsCount : undefined,
      badgeColor: 'bg-rose-500 text-white font-bold animate-pulse',
    },
    {
      id: 'hero',
      label: 'Hero & Spotlight',
      icon: Star,
      badge: featuredCount,
      badgeColor: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
    },
    {
      id: 'media',
      label: 'Public Images & Media',
      icon: ImageIcon,
      badge: 4,
      badgeColor: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
    },
    {
      id: 'settings',
      label: 'System & Backups',
      icon: Sliders,
    },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/Jerin-Realty-Logo.png"
                alt="Jerin Realty Logo"
                className="h-16 w-auto object-contain shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1 block">
                  Admin Console v2.5
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-700"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0F172A]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentUser.role}
              </div>
              <div className="text-[9px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online Session
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="px-3 mb-2">
            <button
              onClick={() => {
                onOpenNewPropertyModal();
                onCloseMobile();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Estate</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
              Management Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#6246EA] text-white shadow-md shadow-[#6246EA]/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & Sign Out */}
        <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-[#0B0F19]/50">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-800/60"
            title="Return to Public Customer Showroom"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>View Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-500/15 transition-all"
            title="End Admin Session"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out Desk</span>
          </button>
        </div>
      </aside>
    </>
  );
};
