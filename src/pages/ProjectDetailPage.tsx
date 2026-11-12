import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NEW_PROJECTS } from '../data/projects';
import { ProjectDevelopment } from '../types';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Check, 
  Phone, 
  Sparkles, 
  Building2, 
  Layers, 
  ArrowUpRight,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Compass,
  MessageCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectDetailPageProps {
  projects?: ProjectDevelopment[];
  onOpenEnquiry: (projectOrTitle?: any) => void;
  onBack?: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projects = NEW_PROJECTS,
  onOpenEnquiry,
  onBack,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themeConfig } = useTheme();

  const project = projects.find((p) => p.id === id) || projects[0] || NEW_PROJECTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setActiveImageIndex(0);
  }, [id]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold font-editorial text-[#17213A] mb-2">Project Not Found</h2>
        <p className="text-sm text-[#727B91] mb-6">
          The landmark development you are searching for is unavailable or the link has expired.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-2.5 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold rounded-xl shadow-md"
        >
          Return to Projects Portfolio
        </button>
      </div>
    );
  }

  const galleryList = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/projects');
    }
  };

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="space-y-8 pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#727B91]">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-[#6246EA] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/projects')}
            className="hover:text-[#6246EA] transition-colors"
          >
            New Projects
          </button>
          <span>/</span>
          <span className="text-[#17213A] font-bold truncate max-w-[200px] sm:max-w-xs">
            {project.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyShareLink}
            className="px-3.5 py-1.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-xs font-semibold text-[#17213A] transition-colors flex items-center gap-1.5"
            title="Share Project Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#6246EA]" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Dossier'}</span>
          </button>

          <button
            onClick={handleBackNavigation}
            className="px-4 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs font-bold text-[#6246EA] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase & Gallery */}
      <section className="space-y-4">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-stone-900 border border-purple-100 shadow-xl group">
          <img
            src={galleryList[activeImageIndex] || project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-md ${
              project.status === 'Ready to Move' 
                ? 'bg-[#12A878]' 
                : project.status === 'New Launch' 
                ? 'bg-[#FF7043]' 
                : 'bg-[#2878FF]'
            }`}>
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
              {project.category}
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#6246EA] text-white">
              By {project.developer}
            </span>
          </div>

          {/* Bottom Title & Starting Price Banner */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-[#FFC857] font-bold block">
                {project.developer} Landmark Showcase
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-editorial tracking-tight text-white">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <MapPin className="w-4 h-4 text-[#FF7043] shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-200 block">
                Pricing Starts From
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFC857] drop-shadow-md">
                {project.priceStart}
              </div>
              <span className="text-xs font-mono text-purple-200">
                Possession: {project.possessionDate}
              </span>
            </div>
          </div>

          {/* Gallery navigation arrows */}
          {galleryList.length > 1 && (
            <div className="absolute inset-y-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1));
                }}
                className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0));
                }}
                className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Selector Strip */}
        {galleryList.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] w-24 shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#6246EA] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main Grid: Details + Concierge Action Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Comprehensive Specifications & Vision */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-[#727B91] uppercase tracking-wider block">
                Configurations
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#17213A] block">
                {project.configuration}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-[#727B91] uppercase tracking-wider block">
                Master Development
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#17213A] block">
                {project.units}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-[#727B91] uppercase tracking-wider block">
                Delivery / Handover
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#17213A] block">
                {project.possessionDate}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-[#727B91] uppercase tracking-wider block">
                Master Developer
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#6246EA] block">
                {project.developer}
              </span>
            </div>
          </div>

          {/* RERA Legal Verification Banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-800 tracking-wider block">
                  Karnataka RERA Certified Development
                </span>
                <span className="text-sm font-mono font-bold text-emerald-950">
                  {project.reraId}
                </span>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Verified BBMP/BDA sanctions, encumbrance certificate, and title clearance.
                </p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-mono font-bold shrink-0">
              100% Compliant Title
            </div>
          </div>

          {/* Architectural Statement & Masterplan */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-4">
            <div className="border-b border-purple-100 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6246EA] font-bold">
                Project Overview & Design Philosophy
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#17213A] mt-1">
                The Masterplan Vision
              </h2>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {project.description}
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Signature Feature Highlight:</strong>
                <p className="mt-0.5 text-stone-700">{project.highlight}</p>
              </div>
            </div>
          </section>

          {/* Amenities & Lifestyle Showcase */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-4">
            <div className="border-b border-purple-100 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6246EA] font-bold">
                Resort-Grade Infrastructure
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#17213A] mt-1">
                Curated Lifestyle Amenities
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100/80 flex items-center gap-2.5 text-xs font-semibold text-[#17213A]"
                >
                  <div className="w-6 h-6 rounded-lg bg-white text-[#6246EA] flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Developer Credibility Banner */}
          <section className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-[#FFC857] uppercase font-bold tracking-widest">
                Tier-1 Builder Representation
              </span>
              <h3 className="text-xl font-bold font-editorial text-white">
                Developed by {project.developer}
              </h3>
              <p className="text-xs text-stone-400 max-w-xl">
                Jerin Realtors holds direct partner allocations with {project.developer}, ensuring clients receive pre-launch price protection and priority inventory allotment before broad market release.
              </p>
            </div>
            <button
              onClick={() => onOpenEnquiry(`Developer Consultation: ${project.developer} - ${project.name}`)}
              className="px-5 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-[#FFC857] text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              Consult Developer Desk
            </button>
          </section>
        </div>

        {/* Right Column: Sticky Concierge Booking Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 bg-white rounded-3xl border border-purple-100 p-6 shadow-xl space-y-5">
            <div className="space-y-1 border-b border-purple-100 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6246EA] font-bold">
                Jerin Realtors Private Office
              </span>
              <h3 className="text-xl font-bold font-editorial text-[#17213A]">
                Reserve Private Site Visit
              </h3>
              <p className="text-xs text-[#727B91]">
                Request chauffeur-driven site tour, masterplan blueprints, and price matrix.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onOpenEnquiry(project.name)}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] shadow-lg shadow-[#6246EA]/25 hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#FFC857]" />
                <span>Enquire Now for VIP Access</span>
              </button>

              <a
                href={`https://wa.me/917676021032?text=${encodeURIComponent(
                  `Hello Jerin Realtors, I am viewing the landmark development '${project.name}' by ${project.developer} in ${project.location} (${project.priceStart}) on your website.\n\nWebsite Ref: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nPlease share floor plans, pre-launch price sheet, and VIP booking details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#12A878] hover:bg-[#0e8f66] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Project Desk</span>
              </a>

              <button
                onClick={() => onOpenEnquiry(`VIP Masterplan PDF Brochure: ${project.name}`)}
                className="w-full py-3 px-4 rounded-xl border border-purple-200 text-[#17213A] hover:bg-purple-50 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#6246EA]" />
                <span>Download Masterplan Brochure</span>
              </button>
            </div>

            {/* Private Office Direct Contact Details */}
            <div className="pt-4 border-t border-purple-100 space-y-3 text-xs text-[#727B91]">
              <div className="flex items-center justify-between">
                <span>Bureau Line:</span>
                <a href="tel:+917676021032" className="font-mono font-bold text-[#17213A] hover:text-[#6246EA]">
                  +91 76760 21032
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Concierge Desk:</span>
                <span className="font-mono text-[#17213A]">UB City Tower, Bengaluru</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Escrow Counsel:</span>
                <span className="font-mono text-emerald-700 font-semibold">Tier-1 Legal Escrow</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-[11px] text-[#727B91] space-y-1">
              <span className="font-bold text-[#17213A] block">Zero Brokerage Guarantee</span>
              <p>
                Purchasers of pre-launch new developments represented by Jerin Realtors incur 0% brokerage advisory fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Landmark Projects Showcase */}
      {otherProjects.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF7043] font-bold">
                Related Landmark Opportunities
              </span>
              <h2 className="text-2xl font-bold font-editorial text-[#17213A] mt-0.5">
                Explore More Sovereign Developments
              </h2>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-bold text-[#6246EA] hover:underline flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div 
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="relative aspect-[16/10] overflow-hidden bg-purple-950 cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-bold text-[#FFC857] font-mono">{p.priceStart}</span>
                    <h4 className="font-bold text-sm font-editorial line-clamp-1">{p.name}</h4>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#727B91] line-clamp-2">
                    {p.description}
                  </p>
                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate(`/project/${p.id}`)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] hover:opacity-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(p.name)}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-[#17213A] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#6246EA]" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
