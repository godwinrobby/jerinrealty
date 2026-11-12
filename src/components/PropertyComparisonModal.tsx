import React from 'react';
import { Property } from '../types';
import { X, Layers, Bed, Bath, Square, MapPin, Check, ArrowRight } from 'lucide-react';

interface PropertyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemoveFromCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  isOpen,
  onClose,
  properties,
  onRemoveFromCompare,
  onSelectProperty,
  onEnquire,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17213A]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Property Comparison Matrix</h2>
              <p className="text-xs text-purple-100">Comparing {properties.length} selected Bengaluru residences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        {properties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Layers className="w-12 h-12 text-purple-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#17213A]">No Properties Selected For Comparison</h3>
            <p className="text-xs text-[#727B91] max-w-sm mx-auto">
              Click the "Compare" checkbox on any property card to compare features, square footage, and pricing side-by-side.
            </p>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto flex-1">
            <div className="min-w-[650px] grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4">
              
              {/* Row 0: Thumbnails & Titles */}
              <div className="font-bold text-xs uppercase text-[#727B91] flex items-end pb-3">
                Estate Overview
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="relative rounded-2xl bg-purple-50/60 p-3 border border-purple-100 flex flex-col justify-between">
                  <button
                    onClick={() => onRemoveFromCompare(prop.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 hover:bg-rose-500 hover:text-white text-[#727B91] flex items-center justify-center text-xs shadow z-10"
                    title="Remove"
                  >
                    ×
                  </button>
                  <img
                    src={prop.mainImage}
                    alt={prop.title}
                    className="w-full h-28 object-cover rounded-xl mb-2"
                  />
                  <h4 className="text-xs font-bold text-[#17213A] line-clamp-2 leading-snug">{prop.title}</h4>
                  <div className="mt-2 text-sm font-extrabold text-[#6246EA] font-mono">{prop.priceDisplay}</div>
                </div>
              ))}

              {/* Row: Location */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100 flex items-center">
                Location & Enclave
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs font-semibold text-[#17213A] py-3 border-t border-purple-100 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#6246EA] shrink-0" />
                  <span>{prop.neighborhood}</span>
                </div>
              ))}

              {/* Row: Property Type */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100">
                Property Type
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs font-bold text-[#6246EA] py-3 border-t border-purple-100">
                  {prop.type}
                </div>
              ))}

              {/* Row: Rental Yield & Floor Plate */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100">
                Gross Yield & Floor Plate
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs text-[#17213A] py-3 border-t border-purple-100 font-medium">
                  <span className="font-bold text-emerald-700">{prop.rentalYield ? `${prop.rentalYield}% Yield` : prop.grade || 'Grade A'}</span>
                  <span className="text-stone-400 mx-1">·</span>
                  <span className="text-stone-700">{prop.floorPlateSqft ? `${(prop.floorPlateSqft / 1000).toFixed(0)}k plate` : `${prop.garageSpaces} bays`}</span>
                </div>
              ))}

              {/* Row: Area (Sq.Ft) */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100">
                Total Area (Sq.Ft)
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs font-mono font-bold text-[#17213A] py-3 border-t border-purple-100">
                  {prop.sqft.toLocaleString('en-IN')} sq.ft
                </div>
              ))}

              {/* Row: Rate per Sq.Ft */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100">
                Rate / Sq.Ft
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs font-mono font-bold text-[#FF7043] py-3 border-t border-purple-100">
                  ₹{prop.pricePerSqft.toLocaleString('en-IN')}/sq.ft
                </div>
              ))}

              {/* Row: Top Amenities */}
              <div className="font-bold text-xs text-[#727B91] py-3 border-t border-purple-100">
                Key Amenities
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="text-xs text-[#727B91] py-3 border-t border-purple-100 space-y-1">
                  {prop.amenities.slice(0, 4).map((a, i) => (
                    <div key={i} className="flex items-center gap-1 text-[#17213A]">
                      <Check className="w-3 h-3 text-[#12A878] shrink-0" />
                      <span className="truncate">{a}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Row: Action Buttons */}
              <div className="font-bold text-xs text-[#727B91] py-4 border-t border-purple-100">
                Actions
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="py-4 border-t border-purple-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-white bg-[#6246EA] hover:bg-[#5339d6] transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onEnquire(prop);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-[#17213A] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
                  >
                    Enquire Us
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
