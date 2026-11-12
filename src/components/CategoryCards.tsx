import React from 'react';
import { PROPERTY_CATEGORIES } from '../data/categories';
import { Building2, TrendingUp, Store, Briefcase, Laptop, Truck } from 'lucide-react';

interface CategoryCardsProps {
  onNavigateToProjects: (categoryId?: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Building2':
      return <Building2 className="w-5 h-5 text-white" />;
    case 'TrendingUp':
      return <TrendingUp className="w-5 h-5 text-white" />;
    case 'Store':
      return <Store className="w-5 h-5 text-white" />;
    case 'Briefcase':
      return <Briefcase className="w-5 h-5 text-white" />;
    case 'Laptop':
      return <Laptop className="w-5 h-5 text-white" />;
    case 'Truck':
      return <Truck className="w-5 h-5 text-white" />;
    default:
      return <Building2 className="w-5 h-5 text-white" />;
  }
};

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onNavigateToProjects }) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-purple-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6246EA] bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Portfolio Classification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17213A] tracking-tight mt-2 font-editorial">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#727B91] mt-1">
            Discover tailored real estate asset classes crafted to match your family or corporate aspirations.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#6246EA] flex items-center gap-1 cursor-default">
          6 Dedicated Categories Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTY_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-purple-100 flex flex-col hover:-translate-y-1"
          >
            {/* Image Preview with Zoom */}
            <div className="relative aspect-[16/10] overflow-hidden bg-purple-100">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17213A]/90 via-[#17213A]/30 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4">
                <span className={`text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md text-white bg-gradient-to-r ${category.gradient}`}>
                  {category.badge}
                </span>
              </div>

              {/* Icon Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {getCategoryIcon(category.iconName)}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col justify-between flex-1 gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#17213A]">
                  <span>{category.name}</span>
                </h3>
                <p className="text-xs text-[#727B91] mt-1.5 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
