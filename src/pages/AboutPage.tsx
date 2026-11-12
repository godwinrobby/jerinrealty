import React from 'react';
import { COMPANY_STATS, CORE_VALUES } from '../data/leadership';
import { ShieldCheck, Award, Building, Compass, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutPageProps {
  onNavigate: (page: 'properties' | 'about' | 'directors' | 'contact') => void;
  onOpenEnquiry: () => void;
}

const STAT_COLORS = [
  { border: 'border-t-emerald-500', text: 'text-emerald-400', bg: 'hover:bg-emerald-950/20' },
  { border: 'border-t-blue-500', text: 'text-blue-400', bg: 'hover:bg-blue-950/20' },
  { border: 'border-t-amber-500', text: 'text-amber-400', bg: 'hover:bg-amber-950/20' },
  { border: 'border-t-rose-500', text: 'text-rose-400', bg: 'hover:bg-rose-950/20' },
];

const VALUE_COLORS = [
  { num: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: 'text-emerald-600', ring: 'hover:border-emerald-300' },
  { num: 'text-indigo-700 bg-indigo-50 border-indigo-200', icon: 'text-indigo-600', ring: 'hover:border-indigo-300' },
  { num: 'text-amber-700 bg-amber-50 border-amber-200', icon: 'text-amber-600', ring: 'hover:border-amber-300' },
  { num: 'text-cyan-700 bg-cyan-50 border-cyan-200', icon: 'text-cyan-600', ring: 'hover:border-cyan-300' },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const { themeConfig } = useTheme();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Headline & Proposition */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span 
          className="text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full border bg-white"
          style={{ color: themeConfig.previewColor, borderColor: `${themeConfig.previewColor}40` }}
        >
          ESTABLISHED 2008 · MAYFAIR & CALIFORNIA
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-stone-900 tracking-tight leading-tight">
          Pioneering Fiduciary Real Estate Stewardship
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Jerin Realtors was founded on an uncompromising principle: that exceptional real estate represents not merely physical space, but enduring generational heritage and architectural artistry.
        </p>
      </section>

      {/* Multi-Color Quantitative Proof Metrics Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        {COMPANY_STATS.map((stat, idx) => {
          const color = STAT_COLORS[idx % STAT_COLORS.length];
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border-t-4 transition-all duration-200 ${color.border} ${color.bg} space-y-1 text-center md:text-left`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tabular-nums block ${color.text}`}>
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-white block">
                {stat.label}
              </span>
              <p className="text-[11px] text-stone-400">
                {stat.detail}
              </p>
            </div>
          );
        })}
      </section>

      {/* Narrative Section with Architectural Visual */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono text-stone-500 uppercase">Our Origin & Ethos</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900">
            Beyond Transactional Brokerage
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Unlike conventional residential agencies driven by marketing volume, Jerin Realtors operates as an elite advisory boutique. We advise sovereign funds, family offices, and discerning individuals who require an institutional standard of architectural vetting and absolute transactional discretion.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Every estate listed under our brand undergoes rigorous due diligence led by chartered architects, structural engineers, and legal appraisers. This ensures provenance is impeccable, zoning envelopes are fully validated, and asset liquidity is preserved.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('directors')}
              className="inline-flex items-center gap-2 text-xs font-semibold hover:opacity-80 underline underline-offset-4"
              style={{ color: themeConfig.previewColor }}
            >
              <span>Learn About Our Managing Director & Leadership Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-stone-200 shadow-md">
            <img
              src="/images/hero_luxury_property_1793437949212.jpg"
              alt="Jerin Realtors Architectural Estate"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <span className="font-semibold block">Architectural Integrity First</span>
              <span className="text-stone-300 text-[11px]">Certified due diligence on every represented residence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Color Core Principles Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-editorial text-stone-900">
            The Jerin Realtors Covenant
          </h2>
          <p className="text-xs text-stone-500">
            Four pillars that define every client relationship across our private offices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CORE_VALUES.map((val, idx) => {
            const vColor = VALUE_COLORS[idx % VALUE_COLORS.length];
            return (
              <div
                key={val.number}
                className={`p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3 transition-all ${vColor.ring}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${vColor.num}`}>
                    {val.number}
                  </span>
                  <ShieldCheck className={`w-4 h-4 ${vColor.icon}`} />
                </div>
                <h3 className="text-base font-bold text-stone-900 font-editorial">
                  {val.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Credentials & Affiliations */}
      <section className="bg-stone-50 border border-stone-200 rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase text-stone-500">Global Accreditations</span>
          <h3 className="text-lg font-bold font-editorial text-stone-900">
            Institutional Rigor & Chartered Standards
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">RICS Regulated Firm</h4>
            <p className="text-[11px] text-stone-500">Adhering strictly to Royal Institution valuation ethics</p>
          </div>
          <div className="space-y-2 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">RIBA Architecture Review</h4>
            <p className="text-[11px] text-stone-500">Chartered architectural feasibility audits</p>
          </div>
          <div className="space-y-2 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Global Private Escrow</h4>
            <p className="text-[11px] text-stone-500">Multi-jurisdiction compliant transaction closing</p>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl border border-stone-800">
        <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
          Begin Your Private Real Estate Mandate
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          Whether seeking an off-market coastal acquisition or confidential portfolio liquidation, our Managing Director welcomes discreet inquiries.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenEnquiry}
            className={`px-6 py-3 text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md inline-flex items-center gap-2 ${themeConfig.primaryButton}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire Us for Private Representation</span>
          </button>
        </div>
      </section>
    </div>
  );
};
