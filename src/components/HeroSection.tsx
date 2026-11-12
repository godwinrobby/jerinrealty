import React from 'react';
import { 
  Sparkles, Building2, TrendingUp, Square, ArrowRight
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
}) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-purple-900/30 bg-[#17213A] shadow-xl">
      {/* Background Architectural Commercial Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85"
          alt="Modern Commercial Architecture in Bengaluru"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000 opacity-35"
        />
        {/* Multi-color Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17213A]/98 via-[#17213A]/90 to-[#2878FF]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17213A] via-transparent to-black/40" />
      </div>

      {/* Decorative Floating Glowing Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6246EA]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#FFC857]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Floating Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-wide uppercase shadow-lg mb-6 hover:bg-white/20 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC857] animate-pulse" />
          <span>Premium Commercial Real Estate Sales & Investment Advisory</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#12A878]" />
        </div>

        {/* Large Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl font-editorial">
          Premium Commercial Real Estate <br />
          <span className="bg-gradient-to-r from-[#FFC857] via-[#FF7043] to-white bg-clip-text text-transparent">Opportunities in Bengaluru</span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-purple-100/90 max-w-2xl leading-relaxed font-normal">
          Your Trusted Partner in Commercial Property Sales & Investments
        </p>
        
        <p className="mt-3 text-sm sm:text-base text-purple-200/80 max-w-2xl leading-relaxed">
          Discover premium commercial properties, Grade-A office spaces, IT parks, retail establishments and high-value investment opportunities across Bengaluru.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const categories = document.getElementById('categories-section');
              if (categories) categories.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold bg-white text-[#17213A] hover:bg-[#FFC857] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Commercial Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Enquire Now</span>
          </button>
        </div>

        {/* Floating Commercial Statistics Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center hover:bg-white/15 transition-all">
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#FFC857]">₹5,200 Cr+</div>
            <div className="text-[11px] sm:text-xs text-purple-100/80 font-medium mt-0.5">Commercial Property Portfolio</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center hover:bg-white/15 transition-all">
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">8.8%</div>
            <div className="text-[11px] sm:text-xs text-purple-100/80 font-medium mt-0.5">Indicative Pre-Leased Asset Yield</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center hover:bg-white/15 transition-all">
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#FF7043]">4.8M+ Sq. Ft.</div>
            <div className="text-[11px] sm:text-xs text-purple-100/80 font-medium mt-0.5">Commercial Property Inventory</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center hover:bg-white/15 transition-all">
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#12A878]">100+</div>
            <div className="text-[11px] sm:text-xs text-purple-100/80 font-medium mt-0.5">Commercial Property Opportunities</div>
          </div>
        </div>

      </div>
    </div>
  );
};
