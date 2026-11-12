import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NEW_PROJECTS } from '../data/projects';
import { ProjectDevelopment } from '../types';
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  Layers, 
  Compass, 
  MessageSquare,
  Search,
  Filter
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectsPageProps {
  projects?: ProjectDevelopment[];
  onOpenEnquiry: (projectOrTitle?: any) => void;
  onNavigateToContact?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects = NEW_PROJECTS,
  onOpenEnquiry,
  onNavigateToContact,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { themeConfig } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Ultra Luxury' | 'Residential' | 'Commercial'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(() => {
    const locationParam = searchParams.get('location');
    return locationParam ? decodeURIComponent(locationParam) : '';
  });

  // Update URL when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      searchParams.set('location', searchQuery);
    } else {
      searchParams.delete('location');
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [searchQuery, searchParams, navigate]);

  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory !== 'All' && proj.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && proj.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = proj.name.toLowerCase().includes(q) ||
        proj.developer.toLowerCase().includes(q) ||
        proj.neighborhood.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleOpenProjectDetails = (project: ProjectDevelopment) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-[#17213A] text-white p-8 sm:p-12 lg:p-16 border border-purple-900/40 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#17213A] via-[#6246EA]/30 to-[#2878FF]/20 mix-blend-screen pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#FFC857]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#FF7043]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#FFC857]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Landmark Bengaluru Developments 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-white leading-tight">
            New Projects & Sovereign Landmark Developments
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-normal">
            Direct institutional access to RERA-approved masterplans from Prestige, Sobha, Total Environment, and Godrej. Verified legal titles, pre-launch priority allocations, and exclusive builder pricing curated by Jerin Realtors.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquiry('VIP Site Visit / Masterplan Dossier')}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] shadow-lg shadow-[#6246EA]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#FFC857]" />
              <span>Enquiry Now for VIP Site Visit</span>
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#12A878]" />
              <span>100% Karnataka RERA Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#727B91] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project, builder, location..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-purple-100 bg-purple-50/50 text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {(['All', 'Ultra Luxury', 'Residential', 'Commercial'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#6246EA] text-white shadow-sm'
                  : 'bg-purple-50 text-[#727B91] hover:text-[#17213A] hover:bg-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-[#727B91] whitespace-nowrap">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-purple-200 bg-white text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
          >
            <option value="All">All Construction Stages</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
            <option value="New Launch">New Launch</option>
          </select>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image & Badges (Clicking navigates to page) */}
            <div 
              onClick={() => handleOpenProjectDetails(project)}
              className="relative aspect-[16/10] overflow-hidden bg-purple-950 cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm text-white ${
                  project.status === 'Ready to Move' 
                    ? 'bg-emerald-600' 
                    : project.status === 'New Launch' 
                    ? 'bg-[#FF7043]' 
                    : 'bg-[#2878FF]'
                }`}>
                  {project.status}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {project.category}
                </span>
              </div>

              {/* Price Tag overlay bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono text-purple-200 uppercase tracking-widest block">Starting From</span>
                  <span className="text-xl font-black font-mono text-[#FFC857] drop-shadow-md">
                    {project.priceStart}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/30">
                  {project.possessionDate}
                </span>
              </div>
            </div>

            {/* Project Details Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6246EA] uppercase tracking-wider">
                    {project.developer}
                  </span>
                  <span className="text-[10px] text-[#727B91] font-mono truncate max-w-[150px]" title={project.reraId}>
                    {project.reraId.split('/')[4] ? `RERA: ...${project.reraId.slice(-6)}` : 'RERA Registered'}
                  </span>
                </div>

                <h3 
                  onClick={() => handleOpenProjectDetails(project)}
                  className="text-lg font-bold text-[#17213A] group-hover:text-[#6246EA] transition-colors font-editorial cursor-pointer"
                >
                  {project.name}
                </h3>

                <p className="text-xs text-[#727B91] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7043] shrink-0" />
                  <span>{project.location}</span>
                </p>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Units & Highlight */}
              <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100/70 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#17213A] font-semibold">
                  <span className="text-[11px] text-[#727B91]">Configurations:</span>
                  <span className="text-right">{project.configuration}</span>
                </div>
                <div className="text-[11px] text-purple-900 line-clamp-1 italic">
                  ✨ {project.highlight}
                </div>
              </div>

              {/* Action Buttons: View Details (Page-based) & Enquire (matching home page card) */}
              <div className="pt-2 border-t border-purple-100 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => handleOpenProjectDetails(project)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] hover:shadow-md hover:shadow-[#6246EA]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="View Dedicated Project Page"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(project.name)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#17213A] bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Book Viewing Enquiry"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#6246EA]" />
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom Concierge Assistance */}
      <section className="bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold font-editorial">Looking for Pre-Launch Off-Market Allocations?</h3>
          <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl">
            Our private desk at Jerin Realtors works directly with managing directors at Sobha, Prestige, and Total Environment to secure first-phase rates before public unveiling.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry('Pre-Launch Allocation Inquiry')}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#17213A] hover:bg-[#FFC857] shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#6246EA]" />
          <span>Enquiry Now with Private Office</span>
        </button>
      </section>
    </div>
  );
};
