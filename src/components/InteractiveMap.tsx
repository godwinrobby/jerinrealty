import React, { useState } from 'react';
import { Property } from '../types';
import { 
  Compass, 
  Layers, 
  Plus, 
  Minus, 
  RotateCcw, 
  MapPin, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  ArrowUpRight, 
  Building2, 
  Bed, 
  Bath, 
  Square,
  Navigation
} from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onOpenDetails: (property: Property) => void;
  onOpenEnquiry: (property?: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  onOpenDetails,
  onOpenEnquiry,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapTheme, setMapTheme] = useState<'architectural' | 'satellite' | 'minimal'>('architectural');
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(true);
  const [activeZone, setActiveZone] = useState<string>('all');

  const activeProperty = selectedProperty || properties[0];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleReset = () => setZoomLevel(1);

  // Filter properties based on zone if selected
  const filteredProperties = properties.filter((prop) => {
    if (activeZone === 'all') return true;
    if (activeZone === 'preleased') return prop.type === 'Pre-Leased Asset' || prop.status === 'Pre-Leased';
    if (activeZone === 'office') return prop.type === 'Grade-A Office' || prop.type === 'Tech Park Campus' || prop.type === 'Managed Enterprise';
    if (activeZone === 'retail') return prop.type === 'High-Street Retail' || prop.type === 'Logistics & Warehousing' || prop.type === 'Commercial Land';
    return true;
  });

  return (
    <div className="relative w-full h-[620px] lg:h-[700px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-sm select-none">
      {/* Top Map Action Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Zone Filters */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-stone-900/90 backdrop-blur-md border border-stone-700/60 rounded-xl text-xs text-stone-200 flex-wrap">
          <button
            onClick={() => setActiveZone('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              activeZone === 'all' ? 'bg-stone-100 text-stone-900' : 'hover:text-white'
            }`}
          >
            All Commercial ({properties.length})
          </button>
          <button
            onClick={() => setActiveZone('preleased')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              activeZone === 'preleased' ? 'bg-stone-100 text-stone-900' : 'hover:text-white'
            }`}
          >
            Pre-Leased Yield
          </button>
          <button
            onClick={() => setActiveZone('office')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              activeZone === 'office' ? 'bg-stone-100 text-stone-900' : 'hover:text-white'
            }`}
          >
            Grade-A Tech & Office
          </button>
          <button
            onClick={() => setActiveZone('retail')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              activeZone === 'retail' ? 'bg-stone-100 text-stone-900' : 'hover:text-white'
            }`}
          >
            Retail & Logistics
          </button>
        </div>

        {/* Action Controls: Overlay Toggle & Enquire Us Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Overlay Toggle Button */}
          <button
            onClick={() => setIsOverlayVisible(!isOverlayVisible)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border backdrop-blur-md transition-all shadow-sm ${
              isOverlayVisible 
                ? 'bg-stone-900/90 text-stone-200 border-stone-700 hover:bg-stone-800' 
                : 'bg-amber-600/90 text-white border-amber-500 hover:bg-amber-600'
            }`}
            title={isOverlayVisible ? 'Hide Property Card Overlay' : 'Show Property Card Overlay'}
          >
            {isOverlayVisible ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overlay Active</span>
                <span className="sm:hidden">Hide Overlay</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Overlay</span>
              </>
            )}
          </button>

          {/* Prompt Highlight: "Keep a button enquiry us a popup according" */}
          <button
            onClick={() => onOpenEnquiry(activeProperty)}
            className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-white text-stone-900 rounded-xl text-xs font-semibold tracking-wide border border-stone-200 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-stone-800" />
            <span>Enquire Us</span>
          </button>
        </div>
      </div>

      {/* SVG Vector Map Rendering */}
      <div 
        className="w-full h-full relative overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: activeProperty ? `${activeProperty.mapCoords.svgX}% ${activeProperty.mapCoords.svgY}%` : '50% 50%',
        }}
      >
        <svg 
          viewBox="0 0 1000 650" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Water gradient */}
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mapTheme === 'satellite' ? '#072739' : '#0f172a'} />
              <stop offset="100%" stopColor={mapTheme === 'satellite' ? '#031a29' : '#1e293b'} />
            </linearGradient>

            {/* Land pattern */}
            <radialGradient id="landGlow" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={mapTheme === 'satellite' ? '#1c2e22' : '#18181b'} />
              <stop offset="100%" stopColor={mapTheme === 'satellite' ? '#111b15' : '#09090b'} />
            </radialGradient>

            {/* Grid pattern for architectural styling */}
            <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Base Landmass */}
          <rect width="1000" height="650" fill="url(#landGlow)" />
          <rect width="1000" height="650" fill="url(#archGrid)" />

          {/* Coastline / Ocean Bay */}
          <path
            d="M 0 0 L 320 0 Q 300 180, 260 260 T 180 400 Q 120 480, 240 560 L 300 650 L 0 650 Z"
            fill="url(#oceanGradient)"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1.5"
          />

          {/* Marina Canal */}
          <path
            d="M 180 400 Q 360 410, 480 490 Q 520 520, 560 650 L 510 650 Q 470 540, 430 520 Q 340 450, 180 430 Z"
            fill="url(#oceanGradient)"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="1"
          />

          {/* Nature Reserve / Hill Parks */}
          <path
            d="M 380 80 Q 520 60, 600 140 Q 640 220, 550 260 Q 420 280, 390 180 Z"
            fill={mapTheme === 'satellite' ? '#193822' : '#1c1917'}
            stroke="rgba(168, 162, 158, 0.15)"
            strokeWidth="1"
          />

          {/* Arterial Highway Network */}
          <path
            d="M 280 0 Q 340 220, 480 340 T 780 460 L 1000 520"
            fill="none"
            stroke="rgba(251, 191, 36, 0.3)"
            strokeWidth="3"
            strokeDasharray="8 4"
          />
          <path
            d="M 600 0 L 600 650"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          <path
            d="M 0 350 Q 400 320, 750 300 L 1000 300"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* Secondary streets */}
          <path
            d="M 220 200 L 500 200 M 350 100 L 350 450 M 680 120 L 950 120 M 750 200 L 980 200 M 680 400 L 980 400"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1.2"
          />

          {/* Geographic Labels */}
          <text x="80" y="300" fill="rgba(255,255,255,0.25)" fontSize="13" letterSpacing="3" fontWeight="600">
            PACIFIC COASTAL COVE
          </text>
          <text x="700" y="80" fill="rgba(255,255,255,0.25)" fontSize="12" letterSpacing="2.5" fontWeight="600">
            METROPOLITAN FINANCIAL CORE
          </text>
          <text x="430" y="110" fill="rgba(255,255,255,0.25)" fontSize="11" letterSpacing="2" fontWeight="600">
            SUMMIT RIDGELINE RESERVE
          </text>
          <text x="360" y="580" fill="rgba(255,255,255,0.22)" fontSize="11" letterSpacing="2" fontWeight="600">
            HARBOR CHANNEL & MARINA
          </text>
        </svg>

        {/* Dynamic Interactive Property Pins */}
        {filteredProperties.map((prop) => {
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              style={{
                left: `${prop.mapCoords.svgX}%`,
                top: `${prop.mapCoords.svgY}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform duration-200"
            >
              {/* Outer pulsing ring for selected property */}
              {isSelected && (
                <span className="absolute -inset-2 rounded-full border-2 border-stone-100/60 animate-ping opacity-40 pointer-events-none" />
              )}

              {/* Pin Badge with Price */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-mono text-xs font-semibold shadow-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-white text-stone-900 ring-2 ring-stone-900 scale-110 shadow-stone-950/40 z-20'
                    : 'bg-stone-900/90 text-stone-100 border border-stone-700/80 hover:bg-stone-800 hover:scale-105'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-amber-600' : 'bg-stone-400'
                  }`}
                />
                <span className="whitespace-nowrap tabular-nums">{prop.priceDisplay}</span>
              </div>

              {/* Hover Tooltip Preview */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                <div className="bg-stone-900 text-stone-100 text-[11px] font-sans px-2.5 py-1 rounded-md shadow-xl border border-stone-700 whitespace-nowrap">
                  <span className="font-semibold">{prop.title}</span>
                  <span className="text-stone-400 ml-1.5 font-mono">· {prop.bedrooms}B / {prop.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Property Overlay Card ("Maps keep a over lay not show") */}
      {isOverlayVisible && activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[380px] z-20 transition-all duration-300">
          <div className="bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 rounded-2xl p-4 text-stone-100 shadow-2xl">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <span className="text-[11px] text-stone-400 tracking-wider uppercase font-medium">
                  {activeProperty.neighborhood} · {activeProperty.type}
                </span>
                <h4 className="text-sm font-semibold text-white tracking-tight line-clamp-1 mt-0.5">
                  {activeProperty.title}
                </h4>
              </div>
              <button
                onClick={() => setIsOverlayVisible(false)}
                className="text-stone-400 hover:text-stone-200 text-xs p-1 rounded-md hover:bg-stone-800 transition-colors"
                title="Hide this overlay card"
              >
                ✕
              </button>
            </div>

            {/* Property Photo & Specs Strip */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-stone-800">
              <img
                src={activeProperty.mainImage}
                alt={activeProperty.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-white text-sm tabular-nums">
                  {activeProperty.priceDisplay}
                </span>
                <span className="text-stone-300 font-mono text-[11px] tabular-nums">
                  ₹{activeProperty.pricePerSqft.toLocaleString('en-IN')}/sqft
                </span>
              </div>
            </div>

            {/* Quick Commercial Specs */}
            <div className="grid grid-cols-3 gap-2 py-2 mb-3 border-y border-stone-800 text-xs text-stone-300">
              <div className="flex items-center gap-1.5" title="Leasable Area">
                <Square className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="tabular-nums font-mono truncate">{activeProperty.sqft.toLocaleString('en-IN')} sqft</span>
              </div>
              <div className="flex items-center gap-1.5" title="Floor Plate or Parking">
                <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="tabular-nums font-mono truncate">
                  {activeProperty.floorPlateSqft ? `${Math.round(activeProperty.floorPlateSqft/1000)}k plate` : `${activeProperty.garageSpaces} bays`}
                </span>
              </div>
              <div className="flex items-center gap-1.5" title="Gross Rental Yield">
                <span className="font-bold text-emerald-400 shrink-0">%</span>
                <span className="tabular-nums font-mono text-emerald-400">
                  {activeProperty.rentalYield ? `${activeProperty.rentalYield}%` : activeProperty.grade || 'Grade A'}
                </span>
              </div>
            </div>

            {/* Overlay Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenDetails(activeProperty)}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Full Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
              <button
                onClick={() => onOpenEnquiry(activeProperty)}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Tools (Bottom-Right Zoom & View Controls) */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1.5 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-700/70 text-stone-300">
        <button
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors text-stone-200"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors text-stone-200"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors text-stone-200"
          title="Reset Zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <div className="w-full h-px bg-stone-800 my-0.5" />
        <button
          onClick={() => setMapTheme(mapTheme === 'architectural' ? 'satellite' : 'architectural')}
          className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors text-stone-200"
          title={`Switch to ${mapTheme === 'architectural' ? 'Satellite' : 'Architectural'} Map View`}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Status Ticker / Compass info */}
      <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 text-[11px] font-mono text-stone-400 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800 pointer-events-none">
        <Navigation className="w-3 h-3 text-stone-400" />
        <span>34°03'N 118°32'W · LUXURY CORRIDOR</span>
      </div>
    </div>
  );
};
