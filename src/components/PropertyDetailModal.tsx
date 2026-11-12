import React, { useState } from 'react';
import { Property } from '../types';
import { 
  X, 
  Bed, 
  Bath, 
  Square, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  Share2, 
  Heart, 
  MapPin, 
  DollarSign, 
  Calculator, 
  ChevronRight, 
  Check, 
  Phone, 
  Mail, 
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: (property: Property) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onOpenEnquiry,
  isFavorited = false,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'calculator'>('overview');
  
  // Interactive Mortgage Calculator states
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(6.2);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !property) return null;

  // Mortgage calculations
  const downPaymentAmount = (property.price * downPaymentPercent) / 100;
  const loanPrincipal = property.price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyMortgage = 
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const monthlyTax = property.annualTax / 12;
  const monthlyTotal = Math.round(monthlyMortgage + monthlyTax + property.hoaFeeMonthly);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="px-6 py-4 bg-white/95 backdrop-blur-md border-b border-stone-200 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 bg-stone-100 rounded-lg text-stone-700 font-semibold">
              {property.status}
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs font-medium text-stone-600">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors text-xs flex items-center gap-1.5"
              title="Copy property link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-2 rounded-xl transition-colors ${
                  isFavorited ? 'text-rose-600 bg-rose-50' : 'text-stone-600 hover:bg-stone-100'
                }`}
                title="Save to favorites"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Gallery Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
              <img
                src={property.galleryImages[activeImageIndex] || property.mainImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700/60 text-white font-mono text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Prime Verified Asset</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-mono text-xs">
                {activeImageIndex + 1} / {property.galleryImages.length} Photographs
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {property.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-stone-900 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Core Price Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 tracking-tight">
                {property.title}
              </h2>
              <p className="text-sm text-stone-600 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{property.address}, {property.city}</span>
              </p>
              <p className="text-xs text-stone-500 italic mt-0.5 font-serif">
                "{property.tagline}"
              </p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-stone-500 font-mono block">OFFERING PRICE</span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-stone-950 tabular-nums">
                {property.priceDisplay}
              </div>
              {property.rentalPriceDisplay && (
                <span className="text-xs text-stone-500 font-mono">
                  Also available for lease at {property.rentalPriceDisplay}
                </span>
              )}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 bg-stone-50 rounded-2xl p-4 border border-stone-200 text-stone-800">
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Bedrooms</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Bed className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">{property.bedrooms} Suites</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Bathrooms</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Bath className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">{property.bathrooms} Baths</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Interior Area</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Square className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Price / Sq Ft</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <DollarSign className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">${property.pricePerSqft.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Auto Storage</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">{property.garageSpaces} Bays</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Year Built</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-stone-700" />
                <span className="font-mono font-semibold text-sm">{property.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Architectural Overview & Amenities
            </button>
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'floorplan'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Floorplans & Spatial Levels
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Investment & Mortgage Estimator</span>
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold font-editorial text-stone-900 mb-2">
                  Architectural Narrative
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Verified Features */}
              <div>
                <h4 className="text-base font-bold font-editorial text-stone-900 mb-3">
                  Signature Architectural Appointments
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-700 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities tags */}
              <div>
                <h4 className="text-base font-bold font-editorial text-stone-900 mb-2">
                  Lifestyle & Compound Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium border border-stone-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Floorplans */}
          {activeTab === 'floorplan' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600">
                Detailed breakdown of residential levels. Full CAD blueprints are available via private dossier request.
              </p>
              <div className="space-y-3">
                {property.floorPlan.levels.map((level, idx) => (
                  <div key={idx} className="border border-stone-200 rounded-2xl p-4 bg-stone-50">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-stone-800" />
                        <h5 className="font-semibold text-sm text-stone-900">{level.name}</h5>
                      </div>
                      <span className="font-mono text-xs font-bold text-stone-700 tabular-nums">
                        {level.sqft.toLocaleString()} SQ FT
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {level.rooms.map((room, rIdx) => (
                        <div key={rIdx} className="text-xs text-stone-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                          <span>{room}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Mortgage & Investment Calculator */}
          {activeTab === 'calculator' && (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Down Payment: {downPaymentPercent}% (${Math.round(downPaymentAmount).toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-stone-900 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Interest Rate: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min={4.0}
                    max={8.5}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-stone-900 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Amortization Period
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoanTermYears(15)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        loanTermYears === 15 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      15 Years
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanTermYears(30)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        loanTermYears === 30 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      30 Years
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculation Summary Card */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div className="sm:col-span-2">
                  <span className="text-xs font-mono text-stone-500 uppercase block">Estimated Monthly Outlay</span>
                  <div className="text-2xl font-bold font-mono text-stone-950 mt-0.5 tabular-nums">
                    ${monthlyTotal.toLocaleString()} <span className="text-xs text-stone-500 font-sans font-normal">/ month</span>
                  </div>
                </div>
                <div className="text-xs space-y-1 sm:col-span-2 font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>Principal & Interest:</span>
                    <span className="font-semibold text-stone-900">${Math.round(monthlyMortgage).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Property Tax (Est.):</span>
                    <span className="font-semibold text-stone-900">${Math.round(monthlyTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>HOA / Maintenance:</span>
                    <span className="font-semibold text-stone-900">${property.hoaFeeMonthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Broker Contact & Booking Footer Bar */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stone-700 shrink-0">
                <img
                  src={property.agent.name.includes('Eleanor') 
                    ? '/images/director_portrait_1793437949528.jpg' 
                    : '/images/director_portrait_1793437949528.jpg'}
                  alt={property.agent.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-stone-400 block uppercase">
                  Listing Representation
                </span>
                <h5 className="font-bold text-white text-sm">
                  {property.agent.name}
                </h5>
                <p className="text-xs text-stone-300">
                  {property.agent.role} · {property.agent.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${property.agent.phone}`}
                className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call Broker</span>
              </a>
              <button
                onClick={() => onOpenEnquiry(property)}
                className="flex-1 md:flex-none py-2.5 px-6 bg-white hover:bg-stone-100 text-stone-950 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enquire Us for This Estate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
