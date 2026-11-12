// Distinct multi-color classes for property types
export const getPropertyTypeColor = (type: string) => {
  switch (type) {
    case 'Grade-A Office':
      return {
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        dot: 'bg-indigo-500',
        text: 'text-indigo-700',
        border: 'border-indigo-300',
        gradient: 'from-[#6246EA] to-[#2878FF]',
      };
    case 'Pre-Leased Asset':
      return {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        dot: 'bg-emerald-500',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        gradient: 'from-emerald-600 to-teal-600',
      };
    case 'Tech Park Campus':
      return {
        bg: 'bg-blue-50 border-blue-200 text-blue-800',
        dot: 'bg-blue-500',
        text: 'text-blue-700',
        border: 'border-blue-300',
        gradient: 'from-[#2878FF] to-[#6246EA]',
      };
    case 'High-Street Retail':
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        dot: 'bg-amber-500',
        text: 'text-amber-700',
        border: 'border-amber-300',
        gradient: 'from-[#FF7043] to-[#FFC857]',
      };
    case 'Managed Enterprise':
      return {
        bg: 'bg-purple-50 border-purple-200 text-purple-800',
        dot: 'bg-purple-500',
        text: 'text-purple-700',
        border: 'border-purple-300',
        gradient: 'from-purple-600 to-indigo-600',
      };
    case 'Logistics & Warehousing':
      return {
        bg: 'bg-orange-50 border-orange-200 text-orange-800',
        dot: 'bg-orange-500',
        text: 'text-orange-700',
        border: 'border-orange-300',
        gradient: 'from-orange-600 to-amber-600',
      };
    case 'Commercial Land':
      return {
        bg: 'bg-teal-50 border-teal-200 text-teal-800',
        dot: 'bg-teal-500',
        text: 'text-teal-700',
        border: 'border-teal-300',
        gradient: 'from-teal-600 to-cyan-600',
      };
    case 'Villa':
      return {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        dot: 'bg-emerald-500',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        gradient: 'from-emerald-500 to-teal-600',
      };
    case 'Penthouse':
      return {
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        dot: 'bg-indigo-500',
        text: 'text-indigo-700',
        border: 'border-indigo-300',
        gradient: 'from-indigo-500 to-purple-600',
      };
    default:
      return {
        bg: 'bg-stone-50 border-stone-200 text-stone-800',
        dot: 'bg-stone-500',
        text: 'text-stone-700',
        border: 'border-stone-300',
        gradient: 'from-[#17213A] to-[#6246EA]',
      };
  }
};

// Distinct multi-color classes for status badges
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pre-Leased':
      return 'bg-emerald-600 text-white border-emerald-500';
    case 'For Sale':
      return 'bg-[#6246EA] text-white border-[#5338D5]';
    case 'For Rent':
      return 'bg-[#2878FF] text-white border-[#1A68EE]';
    case 'Institutional Mandate':
      return 'bg-[#17213A] text-[#FFC857] border-amber-400';
    case 'Under Offer':
      return 'bg-[#FF7043] text-white border-[#E65B2F]';
    case 'New Development':
      return 'bg-violet-600 text-white border-violet-500';
    default:
      return 'bg-[#17213A] text-white border-stone-800';
  }
};
