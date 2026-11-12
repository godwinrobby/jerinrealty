import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NEW_PROJECTS } from '../data/projects';
import { ProjectDevelopment } from '../types';
import { Building2, Calendar, ShieldCheck, MapPin, ArrowRight, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

interface NewProjectsSectionProps {
  projects?: ProjectDevelopment[];
  onOpenEnquiry: (projectTitle?: string) => void;
  onSelectProject?: (project: ProjectDevelopment) => void;
}

export const NewProjectsSection: React.FC<NewProjectsSectionProps> = ({ 
  projects = NEW_PROJECTS,
  onOpenEnquiry 
}) => {
  const navigate = useNavigate();
  return (
    <section id="new-projects" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-purple-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Commercial Tech Parks & SEZ Campuses
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17213A] tracking-tight mt-2 font-editorial">
            Landmark Commercial Tech Developments
          </h2>
          <p className="text-xs sm:text-sm text-[#727B91] mt-1">
            Institutional Grade-A corporate tech campuses and SEZ parks from Prestige, Embassy REIT, Bagmane, and Brigade.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry('New Projects Portfolio Consultation')}
          className="text-xs font-bold text-[#6246EA] hover:text-[#5339d6] flex items-center gap-1 shrink-0 self-start sm:self-auto"
        >
          <span>Download Developer Masterplans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl bg-white border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-purple-100">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17213A]/85 via-transparent to-black/20" />

              {/* Status and Category Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md text-white ${
                  project.status === 'Ready to Move'
                    ? 'bg-[#12A878]'
                    : project.status === 'Under Construction'
                    ? 'bg-[#2878FF]'
                    : 'bg-[#FF7043]'
                }`}>
                  {project.status}
                </span>

                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {project.category}
                </span>
              </div>

              {/* Starting Price & Developer */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-xs text-purple-200 font-medium block">Starting from</span>
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#FFC857]">
                    {project.priceStart}
                  </span>
                </div>
                <span className="text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                  {project.developer}
                </span>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs text-[#727B91]">
                  <MapPin className="w-3.5 h-3.5 text-[#6246EA]" />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-xl font-black text-[#17213A] group-hover:text-[#6246EA] transition-colors font-editorial">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#727B91] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Configurations & Specs */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-[10px] uppercase font-bold text-[#727B91] block">Layouts</span>
                    <span className="font-bold text-[#17213A] line-clamp-1">{project.configuration}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-[10px] uppercase font-bold text-[#727B91] block">Possession</span>
                    <span className="font-bold text-[#17213A] line-clamp-1">{project.possessionDate}</span>
                  </div>
                </div>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.amenities.slice(0, 4).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-purple-50 text-[#6246EA] px-2.5 py-1 rounded-lg border border-purple-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Details & Enquire (matching home page card) */}
              <div className="pt-3 border-t border-purple-100 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] hover:shadow-md hover:shadow-[#6246EA]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(`${project.name} by ${project.developer}`)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#17213A] bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Book Viewing Enquiry"
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
  );
};
