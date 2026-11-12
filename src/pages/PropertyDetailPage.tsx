import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  Calculator, 
  Check, 
  Phone, 
  Sparkles, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getPropertyTypeColor, getStatusColor } from '../utils/themeStyles';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenEnquiry: (property: Property) => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
}

const BASE_URL = 'https://jerinrealty.com';

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const { themeConfig } = useTheme();
  const typeColors = getPropertyTypeColor(property.type);
  const statusColorClass = getStatusColor(property.status);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'calculator'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(6.2);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Scroll to top when property changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [property.id]);

  // Calculations
  const downPaymentAmount = (property.price * downPaymentPercent) / 100;
  const loanPrincipal = property.price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyMortgage = 
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const monthlyTax = property.annualTax / 12;
  const monthlyTotal = Math.round(monthlyMortgage + monthlyTax + property.hoaFeeMonthly);

  // Similar properties (same type or other featured properties)
  const similarProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  // Next / Previous navigation
  const currentIndex = PROPERTIES.findIndex((p) => p.id === property.id);

  const propertyUrl = `${BASE_URL}/property/${property.id}`;
  const ogImage = property.mainImage || `${BASE_URL}/images/Jerin-Realty-Logo.png`;
  const description = property.description || `${property.title} - ${property.bedrooms} BHK ${property.type} in ${property.neighborhood || property.city}. ${property.priceDisplay}.`;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{property.title} | {property.priceDisplay} | Jerin Realty</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${property.type}, ${property.bedrooms} BHK, ${property.neighborhood || property.city}, ${property.city}, commercial real estate, luxury property, Jerin Realty`} />
        <meta property="og:title" content={`${property.title} | ${property.priceDisplay}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={propertyUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${property.title} | ${property.priceDisplay}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={propertyUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": property.title,
            "description": property.description,
            "url": propertyUrl,
            "image": ogImage,
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": property.address,
              "addressLocality": property.neighborhood || property.city,
              "addressRegion": property.city,
              "addressCountry": "IN"
            },
            "numberOfRooms": property.bedrooms,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.sqft,
              "unitCode": "SQFT"
            }
          })}
        </script>
      </Helmet>
      <div className="space-y-10 pb-20 animate-in fade-in duration-200">
      {/* Top Navigation & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-stone-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors py-2 px-3.5 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Properties Portfolio</span>
        </button>

        {/* Action Controls & Quick Prev/Next */}
        <div className="flex items-center gap-2">
          {prevProperty && (
            <button
              onClick={() => onSelectProperty(prevProperty)}
              className="p-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs flex items-center gap-1 shadow-sm"
              title={`Previous: ${prevProperty.title}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          )}

          {nextProperty && (
            <button
              onClick={() => onSelectProperty(nextProperty)}
              className="p-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs flex items-center gap-1 shadow-sm"
              title={`Next: ${nextProperty.title}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <div className="w-px h-5 bg-stone-200 mx-1" />

          <button
            onClick={handleShare}
            className="p-2 text-stone-700 hover:text-stone-950 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors text-xs flex items-center gap-1.5 shadow-sm"
            title="Copy link"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>


          <a
            href={`https://wa.me/917676021032?text=${encodeURIComponent(
              `Hello Jerin Realtors, I am viewing the property '${property.title}' in ${property.neighborhood || property.city || 'Bengaluru'} (${property.priceDisplay}) on your website.\n\nWebsite Ref: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nI would like to check availability and schedule a private viewing.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors text-xs flex items-center gap-1.5 shadow-sm"
            title="WhatsApp Concierge for this property"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline font-semibold">WhatsApp Us</span>
          </a>

          <button
            onClick={() => onOpenEnquiry(property)}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 ${themeConfig.primaryButton}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquire Us</span>
          </button>
        </div>
      </div>

      {/* Main Photographic Exhibition Gallery */}
      <section className="space-y-4">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md">
          <img
            src={property.galleryImages[activeImageIndex] || property.mainImage}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Scrim Overlay with Theme hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent pointer-events-none" />

          {/* Top Verification Tag */}
          <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700/60 text-white font-mono text-xs flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chartered Architectural Verified Asset</span>
          </div>

          {/* Bottom Title & Image Index */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border shadow-md ${statusColorClass}`}>
                  {property.status}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border shadow-md ${typeColors.bg}`}>
                  {property.type}
                </span>
                <span className="text-xs text-stone-300">· {property.neighborhood}, {property.city}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-editorial text-white tracking-tight mt-0.5">
                {property.title}
              </h1>
            </div>
            <div className="bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-stone-300 font-mono text-xs border border-stone-800 self-start sm:self-auto shadow-md">
              {activeImageIndex + 1} / {property.galleryImages.length} Photographs
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {property.galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-28 sm:w-36 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                activeImageIndex === idx 
                  ? 'border-stone-900 shadow-md scale-95 ring-2 ring-stone-900/30' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Gallery thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Primary Price & Specs Bar */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${typeColors.bg}`}>
                {property.type}
              </span>
              <span>·</span>
              <span>Built {property.yearBuilt}</span>
              <span>·</span>
              <span>Lot: {property.lotSize || 'Private Compound'}</span>
            </div>
            <p className="text-sm text-stone-600 flex items-center gap-1.5 mt-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{property.address}, {property.city}</span>
            </p>
            <p className="text-xs text-stone-500 italic mt-1 font-serif">
              "{property.tagline}"
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0 space-y-1">
            <span className="text-xs font-mono text-stone-500 uppercase block">INVESTMENT MANDATE PRICE</span>
            <div 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight tabular-nums"
              style={{ color: themeConfig.previewColor }}
            >
              {property.priceDisplay}
            </div>
            {property.rentalPriceDisplay && (
              <span className="text-xs text-stone-700 font-mono font-medium block">
                Net Monthly Inflow: <strong className="text-emerald-700">{property.rentalPriceDisplay}</strong>
              </span>
            )}
            {property.rentalYield && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                {property.rentalYield}% Gross Yield
              </span>
            )}
          </div>
        </div>

        {/* Tenant Profile Banner if leased */}
        {property.tenant && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wide">
                  Active Tenant
                </span>
                <span className="font-bold text-stone-900 text-sm font-editorial">{property.tenant}</span>
              </div>
              <p className="text-stone-600">
                <strong>Lease Structure:</strong> {property.leaseTerm || '9 Years Long Lease with Institutional Triennial Escalation'}
              </p>
            </div>
            {property.certification && (
              <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 font-mono text-emerald-800 font-semibold text-xs shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{property.certification}</span>
              </div>
            )}
          </div>
        )}

        {/* Commercial Specifications Grid with Multi-Color Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-stone-50 hover:bg-emerald-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Leasable Area</span>
            <div className="flex items-center gap-2 mt-1">
              <Square className="w-4 h-4 text-emerald-700" />
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">{property.sqft.toLocaleString('en-IN')} sqft</span>
            </div>
          </div>
          <div className="p-4 bg-stone-50 hover:bg-indigo-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Floor Plate</span>
            <div className="flex items-center gap-2 mt-1">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">
                {property.floorPlateSqft ? `${property.floorPlateSqft.toLocaleString('en-IN')} sqft` : `${property.workstations || 250}+ Desks`}
              </span>
            </div>
          </div>
          <div className="p-4 bg-stone-50 hover:bg-cyan-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Rental Yield</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-emerald-700">%</span>
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">
                {property.rentalYield ? `${property.rentalYield}% Gross` : 'Prime Yield'}
              </span>
            </div>
          </div>
          <div className="p-4 bg-stone-50 hover:bg-amber-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Price / Sq Ft</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-amber-700">₹</span>
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">₹{property.pricePerSqft.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="p-4 bg-stone-50 hover:bg-rose-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Parking Allocation</span>
            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck className="w-4 h-4 text-rose-700" />
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">{property.garageSpaces} Stacks</span>
            </div>
          </div>
          <div className="p-4 bg-stone-50 hover:bg-blue-50/40 rounded-2xl border border-stone-200 transition-colors">
            <span className="text-[11px] text-stone-500 uppercase font-medium block">Grade / Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span className="font-mono font-bold text-sm sm:text-base text-stone-900">{property.grade || 'Grade A+'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Section: Tabs for Narrative, Floorplans, and Investment Calculator */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              activeTab === 'overview'
                ? themeConfig.activeTabBg
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Institutional Mandate & Tenant Terms
          </button>
          <button
            onClick={() => setActiveTab('floorplan')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              activeTab === 'floorplan'
                ? themeConfig.activeTabBg
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Floor Plate Layout & Workstations
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'calculator'
                ? themeConfig.activeTabBg
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Commercial Cap Rate & Yield Calculator</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="space-y-3">
              <h3 className="text-xl font-bold font-editorial text-stone-900">
                Architectural Statement
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-4xl">
                {property.description}
              </p>
            </div>

            {/* Signature Features Grid */}
            <div className="space-y-3">
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Signature Architectural Appointments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-stone-800 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compound Amenities in Multi-Color Pills */}
            <div className="space-y-3">
              <h4 className="text-base font-bold font-editorial text-stone-900">
                Lifestyle & Compound Amenities
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Floorplans */}
        {activeTab === 'floorplan' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <p className="text-xs sm:text-sm text-stone-600">
              Complete architectural level configuration. Confidential CAD blueprints and structural load reports are available via private client enquiry.
            </p>
            <div className="space-y-4">
              {property.floorPlan.levels.map((level, idx) => (
                <div key={idx} className="border border-stone-200 rounded-2xl p-5 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-stone-800" />
                      <h4 className="font-bold text-sm sm:text-base text-stone-900">{level.name}</h4>
                    </div>
                    <span 
                      className="font-mono text-xs sm:text-sm font-bold tabular-nums"
                      style={{ color: themeConfig.previewColor }}
                    >
                      {level.sqft.toLocaleString()} SQ FT
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {level.rooms.map((room, rIdx) => (
                      <div key={rIdx} className="text-xs sm:text-sm text-stone-700 flex items-center gap-2">
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: themeConfig.previewColor }}
                        />
                        <span>{room}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Commercial Cap Rate & Yield Calculator */}
        {activeTab === 'calculator' && (() => {
          const defaultAnnualRent = property.rentalYield 
            ? (property.price * property.rentalYield) / 100 
            : (property.price * 0.088);
          const annualOutlays = property.annualTax + (property.hoaFeeMonthly * 12);
          const netOperatingIncome = Math.max(0, defaultAnnualRent - annualOutlays);
          const capRate = (netOperatingIncome / property.price) * 100;
          const monthlyInflow = defaultAnnualRent / 12;

          // Escalations (15% triennial standard)
          const rentYr4_6Monthly = monthlyInflow * 1.15;
          const rentYr7_9Monthly = rentYr4_6Monthly * 1.15;

          return (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <h4 className="font-bold text-base text-stone-900 font-editorial">Commercial Capitalization & Cashflow Modeling</h4>
                  <p className="text-xs text-stone-600">Institutional yield projections factoring annual property tax, common area maintenance, and contractual escalations.</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-mono font-bold self-start sm:self-center">
                  Contractual Lease Mode
                </div>
              </div>

              {/* 4 Key Institutional KPI Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Gross Rental Yield</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 mt-1">
                    {property.rentalYield ? `${property.rentalYield.toFixed(1)}%` : '8.8%'}
                  </div>
                  <span className="text-[11px] text-stone-500">Gross annual inflow / Price</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Net Cap Rate (NOI)</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-700 mt-1">
                    {capRate.toFixed(2)}%
                  </div>
                  <span className="text-[11px] text-stone-500">After taxes & CAM outlays</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Monthly Cash Inflow</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#6246EA] mt-1">
                    {property.rentalPriceDisplay || `₹${(monthlyInflow / 100000).toFixed(1)} L/mo`}
                  </div>
                  <span className="text-[11px] text-stone-500">Disbursed quarterly/monthly</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block">Annual NOI (Net Income)</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900 mt-1">
                    ₹{(netOperatingIncome / 10000000).toFixed(2)} Cr
                  </div>
                  <span className="text-[11px] text-stone-500">Net operating cashflow</span>
                </div>
              </div>

              {/* Triennial Contractual Escalation Table */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide block font-mono">
                  9-Year Contractual Rent Escalation Timeline (15% Triennial Indexation)
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 font-mono">
                        <th className="pb-2">Lease Period</th>
                        <th className="pb-2">Monthly Inflow</th>
                        <th className="pb-2">Annual Gross Rental</th>
                        <th className="pb-2">Cumulative Return</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-mono">
                      <tr>
                        <td className="py-2.5 font-bold text-stone-900 font-sans">Years 1 – 3 (Current)</td>
                        <td className="py-2.5 text-stone-800 font-bold">₹{(monthlyInflow / 100000).toFixed(2)} Lakh / mo</td>
                        <td className="py-2.5 text-stone-700">₹{(defaultAnnualRent / 10000000).toFixed(2)} Cr / yr</td>
                        <td className="py-2.5 text-emerald-700 font-bold">₹{((defaultAnnualRent * 3) / 10000000).toFixed(2)} Cr</td>
                        <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-sans font-semibold">Active Lock-in</span></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-stone-900 font-sans">Years 4 – 6 (+15% Escalation)</td>
                        <td className="py-2.5 text-stone-800 font-bold">₹{(rentYr4_6Monthly / 100000).toFixed(2)} Lakh / mo</td>
                        <td className="py-2.5 text-stone-700">₹{((defaultAnnualRent * 1.15) / 10000000).toFixed(2)} Cr / yr</td>
                        <td className="py-2.5 text-emerald-700 font-bold">₹{(((defaultAnnualRent * 1.15) * 3) / 10000000).toFixed(2)} Cr</td>
                        <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-sans font-semibold">Contractual +15%</span></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-stone-900 font-sans">Years 7 – 9 (+15% Escalation)</td>
                        <td className="py-2.5 text-stone-800 font-bold">₹{(rentYr7_9Monthly / 100000).toFixed(2)} Lakh / mo</td>
                        <td className="py-2.5 text-stone-700">₹{((defaultAnnualRent * 1.3225) / 10000000).toFixed(2)} Cr / yr</td>
                        <td className="py-2.5 text-emerald-700 font-bold">₹{(((defaultAnnualRent * 1.3225) * 3) / 10000000).toFixed(2)} Cr</td>
                        <td className="py-2.5"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-sans font-semibold">Contractual +32.2%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* LRD (Lease Rental Discounting) Advisory Note */}
              <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-stone-700 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#6246EA] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold mb-0.5">Lease Rental Discounting (LRD) Debt Financing Available</strong>
                  <span>This pre-leased asset is eligible for up to 65% LRD debt funding from leading tier-1 institutional banks at 8.25% - 8.65% interest rate, allowing levered equity returns of 12.5% - 14.8% IRR.</span>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Listing Broker Direct Representation Card */}
      <section className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-stone-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#6246EA] shrink-0 shadow-md">
            <img
              src="/assets/aistudio/image_d9f7a683.png"
              alt="Jerin VR"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <span 
              className="text-[11px] font-mono block uppercase font-semibold text-[#FFC857]"
            >
              Institutional Commercial Mandate Desk
            </span>
            <h4 className="font-bold text-white text-lg font-editorial">
              Jerin VR
            </h4>
            <p className="text-xs text-stone-300">
              Founder & Managing Director · 18+ Years Institutional CRE & Pre-Leased Mandates
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a
            href="tel:+917676021032"
            className="py-3 px-5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Jerin VR (+91 76760 21032)</span>
          </a>
          <a
            href={`https://wa.me/917676021032?text=${encodeURIComponent(
              `Hello Jerin VR, I am reviewing the commercial asset '${property.title}' (${property.priceDisplay}, ${property.rentalYield || 8.8}% Yield) on the Jerin Realtors platform.\n\nWebsite Ref: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nI would like to request the institutional due diligence dossier, tenant lease extract, and arrange a private site inspection.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 bg-[#12A878] hover:bg-[#0e8f66] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Jerin VR</span>
          </a>
          <button
            onClick={() => onOpenEnquiry(property)}
            className={`flex-1 md:flex-none py-3 px-6 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${themeConfig.primaryButton}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Due Diligence Dossier</span>
          </button>
        </div>
      </section>

      {/* Similar Curated Commercial Mandates Section */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 tracking-tight">
              Complementary Commercial Real Estate Mandates
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Explore similar institutional Grade-A corporate towers and high-yield pre-leased assets in Bengaluru.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onSelect={onSelectProperty}
              onEnquire={onOpenEnquiry}
            />
          ))}
        </div>
      </section>
    </div>
  </>
  );
};
