import React from 'react';
import { 
  Search, CheckCircle2, Lock, Headphones, 
  BadgePercent, ShieldCheck, FileText
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Professional Property Evaluation',
    description: 'Every property is assessed based on location, accessibility, infrastructure, documentation, market value and commercial potential.',
    icon: Search,
    color: 'from-[#6246EA] to-[#2878FF]',
    iconColor: 'text-[#6246EA]',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    title: 'Verified Property Listings',
    description: 'Explore carefully reviewed commercial property opportunities with relevant ownership, title and property documentation checks.',
    icon: ShieldCheck,
    color: 'from-[#12A878] to-[#2878FF]',
    iconColor: 'text-[#12A878]',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    title: 'Strategic Investment Advisory',
    description: 'Get assistance in identifying commercial properties based on investment objectives, expected rental income, location and capital requirements.',
    icon: BadgePercent,
    color: 'from-[#FF7043] to-[#FFC857]',
    iconColor: 'text-[#FF7043]',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    title: 'Transparent Transactions',
    description: 'We maintain clarity in property pricing, transaction terms, documentation and communication throughout the buying process.',
    icon: Lock,
    color: 'from-[#17213A] to-[#2878FF]',
    iconColor: 'text-[#17213A]',
    bgLight: 'bg-slate-50',
    border: 'border-slate-200',
  },
  {
    title: 'Dedicated Property Assistance',
    description: 'Our team assists buyers with property shortlisting, site visits, negotiations and transaction coordination.',
    icon: Headphones,
    color: 'from-[#FF7043] to-[#6246EA]',
    iconColor: 'text-[#FF7043]',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    title: 'End-to-End Documentation Support',
    description: 'Get assistance with property documentation, due diligence coordination, registration processes and transaction formalities.',
    icon: FileText,
    color: 'from-[#2878FF] to-[#6246EA]',
    iconColor: 'text-[#2878FF]',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="space-y-6" id="why-choose-us">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#12A878] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Why Choose Jerin Realty?
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#17213A] tracking-tight font-editorial">
          Your Trusted Commercial Real Estate Partner
        </h2>
        <p className="text-xs sm:text-sm text-[#727B91] leading-relaxed">
          We bring together commercial property expertise, market insights and a transparent transaction process to help clients make informed real estate decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {FEATURES.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-3xl bg-white border ${item.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17213A] group-hover:text-[#6246EA] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#727B91] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-50 flex items-center gap-1.5 text-[11px] font-bold text-[#12A878]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Guaranteed Protocol</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
