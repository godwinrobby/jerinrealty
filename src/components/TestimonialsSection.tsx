import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="space-y-6" id="testimonials">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FFC857] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Commercial Client Success Stories
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#17213A] tracking-tight font-editorial">
          Our Commercial Client Experiences
        </h2>
        <p className="text-xs sm:text-sm text-[#727B91]">
          Building trust through every commercial real estate transaction. Our clients include corporate enterprises, institutional investors, healthcare groups, and global funds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-purple-200" />
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#17213A] leading-relaxed italic">
                "{item.review}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 mt-4 border-t border-purple-50 flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#6246EA]/20 shrink-0"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-[#17213A] truncate">{item.name}</h4>
                  {item.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#12A878] shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#727B91] truncate">{item.role}</p>
                <p className="text-[10px] text-[#6246EA] font-semibold truncate mt-0.5">
                  {item.propertyAcquired}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
