import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, ArrowDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Property } from '../types';

interface HeroBannerSliderProps {
  onOpenEnquiry: (property?: Property) => void;
  onSelectProperty?: (property: Property) => void;
  featuredProperties: Property[];
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({
  onOpenEnquiry,
  onSelectProperty,
  featuredProperties,
}) => {
  const { themeConfig } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const BANNERS = [
    {
      id: 0,
      image: '/images/hero_luxury_property_1793437949212.jpg',
      tag: 'BENGALURU PRIME ESTATES 2026',
      title: 'Curated Ultra-Prime Bengaluru Estates',
      subtitle: 'Representing Bengaluru’s most distinctive palatial villas in Sadashivanagar, billionaire row compounds in Koramangala, and fairway retreats with institutional due diligence.',
      priceBadge: 'Sadashivanagar · Estates from ₹28.50 Cr',
      ctaText: 'Enquire for Off-Market Dossiers',
      secondaryText: 'Explore Full Portfolio',
      targetPropertyId: 'prop-1',
    },
    {
      id: 1,
      image: '/images/property_penthouse_1793437950337.jpg',
      tag: 'CENTRAL CBD SOVEREIGN DUPLEXES',
      title: 'Trophy Sky Penthouses Overlooking Cubbon Park',
      subtitle: 'Commanding 360° panoramas across the lush Cubbon Park canopy and UB City skyline, featuring double-height reception salons and private lift foyers.',
      priceBadge: 'Lavelle Road · Penthouses from ₹19.80 Cr',
      ctaText: 'Schedule VIP Penthouse Viewing',
      secondaryText: 'Inspect Penthouse Details',
      targetPropertyId: 'prop-2',
    },
    {
      id: 2,
      image: '/images/property_coastal_villa_1793437950634.jpg',
      tag: 'WHITEFIELD & GOLF ENCLAVES',
      title: 'Secluded Lakefront & Golf Course Sanctuaries',
      subtitle: 'Lake-facing modern villas in Palm Meadows Whitefield and 18-hole championship fairway estates against the tranquil foothills of Nandi Hills.',
      priceBadge: 'Whitefield & Nandi Hills · From ₹15.50 Cr',
      ctaText: 'Request Villa Brochure',
      secondaryText: 'Inspect Lakeview Villa Details',
      targetPropertyId: 'prop-3',
    },
  ];

  // Auto-advance banner every 6.5s unless paused
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, BANNERS.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const activeBanner = BANNERS[currentSlide];
  const targetProp = featuredProperties.find((p) => p.id === activeBanner.targetPropertyId);

  const scrollToCollection = () => {
    const el = document.getElementById('portfolio-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 text-white min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Bengaluru Estates Hero Showcase"
    >
      {/* 3 Background Banner Images with Smooth Fade */}
      {BANNERS.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dynamic Theme Gradient Scrim */}
      <div className={`absolute inset-0 bg-gradient-to-t ${themeConfig.heroGradient} opacity-90 z-10 pointer-events-none`} />
      <div className="absolute inset-0 bg-stone-950/40 z-10 pointer-events-none" />

      {/* Slide Navigation Arrows */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-900 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Previous Banner"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-900 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Next Banner"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Banner Content Container */}
      <div className="relative z-20 max-w-3xl space-y-4">
        {/* Top Tag & Price Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-xs font-mono text-white">
            <span 
              className="w-2 h-2 rounded-full shadow-sm animate-pulse" 
              style={{ backgroundColor: themeConfig.previewColor }}
            />
            <span>{activeBanner.tag}</span>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/15 text-xs font-mono text-stone-200">
            {activeBanner.priceBadge}
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial tracking-tight text-white leading-tight">
          {activeBanner.title}
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
          {activeBanner.subtitle}
        </p>

        {/* Actions Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenEnquiry(targetProp)}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg flex items-center gap-2 ${themeConfig.primaryButton}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{activeBanner.ctaText}</span>
          </button>

          {targetProp && onSelectProperty ? (
            <button
              onClick={() => onSelectProperty(targetProp)}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>{activeBanner.secondaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={scrollToCollection}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Indicator Tabs */}
      <div className="relative z-20 pt-8 flex items-center justify-between border-t border-white/15 mt-6">
        <div className="flex items-center gap-3 sm:gap-6">
          {BANNERS.map((b, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={b.id}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-2 text-left transition-all py-1 border-b-2 ${
                  isActive
                    ? 'border-white text-white font-semibold'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <span className="font-mono text-xs">0{idx + 1}.</span>
                <span className="text-xs hidden md:inline truncate max-w-[140px]">
                  {idx === 0 ? 'Sadashivanagar Estates' : idx === 1 ? 'Lavelle Rd Penthouses' : 'Whitefield & Golfshire'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slide Counter */}
        <div className="text-xs font-mono text-stone-300">
          0{currentSlide + 1} <span className="text-stone-500">/ 03</span>
        </div>
      </div>
    </section>
  );
};
