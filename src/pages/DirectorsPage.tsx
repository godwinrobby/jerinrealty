import React from 'react';
import { DIRECTORS } from '../data/leadership';
import { Award, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DirectorsPageProps {
  onOpenEnquiry: () => void;
}

export const DirectorsPage: React.FC<DirectorsPageProps> = ({ onOpenEnquiry }) => {
  const { themeConfig } = useTheme();
  const managingDirector = DIRECTORS[0];

  return (
    <div className="space-y-16 pb-20">
      {/* Top Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <span 
          className="text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full border bg-white"
          style={{ color: themeConfig.previewColor, borderColor: `${themeConfig.previewColor}40` }}
        >
          EXECUTIVE LEADERSHIP & GOVERNANCE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-stone-900 tracking-tight leading-tight">
          Board of Directors
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Led by chartered fiduciaries and architectural scholars with over six decades of combined experience in ultra-prime asset management.
        </p>
      </section>

      {/* Featured Managing Director Spotlight */}
      <section className="bg-stone-900 text-stone-100 rounded-3xl overflow-hidden border border-stone-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative min-h-[480px] lg:min-h-full bg-stone-950 flex flex-col justify-end">
            <img
              src={managingDirector.image}
              alt={managingDirector.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent lg:from-stone-950/80" />
            <div className="relative z-10 p-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Founder & Managing Director
              </span>
            </div>
          </div>

          {/* Bio & Director's Statement */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div 
                className="flex items-center gap-2 text-xs font-mono font-semibold"
                style={{ color: themeConfig.accentColor }}
              >
                <Award className="w-4 h-4" />
                <span>MANAGING DIRECTOR & FOUNDING PARTNER</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-white">
                {managingDirector.name}
              </h2>
              <p className="text-xs font-mono text-stone-300">
                {managingDirector.credentials}
              </p>

              <blockquote 
                className="my-4 pl-4 border-l-2 italic text-stone-200 text-sm font-serif leading-relaxed"
                style={{ borderColor: themeConfig.previewColor }}
              >
                "{managingDirector.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {managingDirector.bio}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-[11px] font-mono uppercase text-stone-400 tracking-wider">
                Executive Focus & Specializations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {managingDirector.focus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: themeConfig.previewColor }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Line & Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
              <div className="text-xs font-mono text-stone-300">
                <span className="text-stone-400 block text-[11px]">Direct Office Line:</span>
                <span className="text-white font-semibold">{managingDirector.directLine}</span>
              </div>

              <button
                onClick={onOpenEnquiry}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 ${themeConfig.primaryButton}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Directly with Director</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Values / Governance Statement */}
      <section className="p-8 bg-stone-50 rounded-3xl border border-stone-200 text-stone-800 space-y-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono text-stone-500 uppercase">Board Commitment</span>
          <h3 className="text-xl font-bold font-editorial text-stone-900">
            Direct Board Oversight on Every Transaction Exceeding $10M
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Unlike firms where transactions are delegated to junior representatives, every mandate undertaken by Jerin Realtors is assigned a dedicated Managing Director or Partner who attends inspections, coordinates escrow architecture, and provides direct accountability.
          </p>
        </div>
      </section>
    </div>
  );
};