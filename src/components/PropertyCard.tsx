import React from 'react';
import { Property } from '../types';
import { 
  Bed, Bath, Square, MapPin, Heart, ArrowUpRight, 
  MessageSquare, ShieldCheck, CheckCircle2, Layers 
} from 'lucide-react';
import { getPropertyTypeColor, getStatusColor } from '../utils/themeStyles';
import { useTheme } from '../context/ThemeContext';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onEnquire: (property: Property) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onEnquire,
  isFavorited = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare,
}) => {
  const { themeConfig } = useTheme();
  const typeColors = getPropertyTypeColor(property.type);
  const statusColorClass = getStatusColor(property.status);

  return (
    <div className="group bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      
      {/* Property Image Container */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 cursor-pointer"
        onClick={() => onSelect(property)}
      >
        <img
          src={property.mainImage}
          alt={property.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17213A]/90 via-[#17213A]/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border ${statusColorClass}`}>
              {property.status}
            </span>
            {property.rentalYield && (
              <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white border border-emerald-400/50 flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                <span>{property.rentalYield}% Yield</span>
              </span>
            )}
            {property.grade && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#FFC857]" />
                <span>{property.grade}</span>
              </span>
            )}
          </div>
        </div>

        {/* Bottom Price Bar on Image */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-baseline justify-between text-white pointer-events-none">
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono tracking-tight tabular-nums text-[#FFC857] drop-shadow-md">
              {property.priceDisplay}
            </span>
            {property.rentalPriceDisplay && (
              <span className="block text-[11px] text-purple-200 font-medium">
                Inflow: {property.rentalPriceDisplay}
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-purple-100 tabular-nums bg-white/15 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
            ₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        
        {/* Title, Tagline & Neighborhood */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6246EA]">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{property.neighborhood}, Bengaluru</span>
            </div>
            <span className="text-[11px] font-mono text-stone-500 uppercase px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
              {property.type}
            </span>
          </div>

          <h3 
            onClick={() => onSelect(property)}
            className="text-base sm:text-lg font-bold text-[#17213A] tracking-tight group-hover:text-[#6246EA] transition-colors cursor-pointer line-clamp-1 font-editorial"
          >
            {property.title}
          </h3>

          <p className="text-xs text-[#727B91] line-clamp-2 leading-relaxed">
            {property.tagline}
          </p>

          {/* Tenant Profile Banner if available */}
          {property.tenant && (
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/80 truncate max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold text-emerald-950">Tenant:</span>
                <span className="truncate">{property.tenant}</span>
              </span>
            </div>
          )}
        </div>

        {/* Commercial Specifications Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-[#17213A]">
          <div className="flex items-center gap-1.5" title="Leasable Area">
            <Square className="w-3.5 h-3.5 text-[#6246EA] shrink-0" />
            <span className="font-semibold tabular-nums">{property.sqft.toLocaleString('en-IN')} sq.ft</span>
          </div>
          
          <div className="flex items-center gap-1.5" title="Floor Plate or Spaces">
            <Layers className="w-3.5 h-3.5 text-[#2878FF] shrink-0" />
            <span className="font-semibold truncate">
              {property.floorPlateSqft 
                ? `${Math.round(property.floorPlateSqft / 1000)}k plate`
                : `${property.garageSpaces} Bays`}
            </span>
          </div>

          <div className="flex items-center gap-1.5" title="Rental Yield or Efficiency">
            <span className="font-bold text-emerald-600 shrink-0">%</span>
            <span className="font-semibold text-emerald-700">
              {property.rentalYield ? `${property.rentalYield}% Yield` : `${property.efficiency || 82}% Eff.`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-purple-100 flex items-center justify-between gap-2.5">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] hover:shadow-md hover:shadow-[#6246EA]/25 transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onEnquire(property)}
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#17213A] bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition-colors flex items-center justify-center gap-1.5"
            title="Book Commercial Due Diligence & Site Visit"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#6246EA]" />
            <span className="hidden sm:inline">Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
};
