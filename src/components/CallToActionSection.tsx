import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';

interface CallToActionSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onExplore,
  onContact,
}) => {
  return (
    <section className="relative rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 text-white text-center bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043]" id="cta">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
          <span>Commercial Real Estate Advisory • Bengaluru</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-editorial leading-tight">
          Let's Find Your Next Commercial Property
        </h2>

        <p className="text-sm sm:text-base text-purple-100/90 max-w-xl mx-auto leading-relaxed">
          Your Next Business or Investment Opportunity Starts Here.
        </p>

        <p className="text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          Looking to purchase a commercial building, acquire a pre-leased property, expand your business or invest in Bengaluru's commercial real estate market?
        </p>

        <p className="text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          Connect with Jerin Realty for professional assistance and access to commercial property opportunities.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold bg-white text-[#17213A] hover:bg-[#FFC857] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContact}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#FFC857]" />
            <span>Contact Our Team</span>
          </button>
        </div>
      </div>
    </section>
  );
};
