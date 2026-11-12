import React from 'react';
import { POPULAR_LOCATIONS } from '../data/locations';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PopularLocationsProps {
  onNavigateToProjects: (locationName?: string) => void;
}

export const PopularLocations: React.FC<PopularLocationsProps> = ({ onNavigateToProjects }) => {
  const navigate = useNavigate();

  const handleLocationClick = (locationName: string) => {
    navigate(`/projects?location=${encodeURIComponent(locationName)}`);
    if (onNavigateToProjects) {
      onNavigateToProjects(locationName);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-purple-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2878FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Commercial Micro-Markets
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17213A] tracking-tight mt-2 font-editorial">
            Bengaluru Prime Commercial Hubs
          </h2>
          <p className="text-xs sm:text-sm text-[#727B91] mt-1">
            Browse premier tech corridors, average commercial capital values, and institutional office clusters across Bengaluru.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#727B91]">
          Grade-A Tech & Logistics Corridors
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            onClick={() => handleLocationClick(loc.name)}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] bg-purple-900 border border-purple-100 flex flex-col justify-end p-5 text-white"
          >
            {/* Background Image */}
            <img
              src={loc.image}
              alt={loc.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17213A] via-[#17213A]/50 to-transparent" />

            {/* Top Badge: Property count */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-bold bg-[#6246EA]/90 backdrop-blur-md px-3 py-1 rounded-full border border-purple-300/30 shadow-md">
                {loc.propertyCount} Properties
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-[#FF7043] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#FFC857] transition-colors flex items-center gap-1.5 font-editorial">
                <MapPin className="w-4 h-4 text-[#FF7043]" />
                <span>{loc.name}</span>
              </h3>
              <p className="text-xs text-purple-100/80 line-clamp-2 leading-relaxed">
                {loc.tagline}
              </p>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[#FFC857] font-semibold">Avg: {loc.averagePriceSqft}/sq.ft</span>
                <span className="text-white/80 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-[#2878FF]" />
                  {loc.distanceToAirport}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
