export type ThemeId = 'royal' | 'emerald' | 'sapphire' | 'bordeaux' | 'amber';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  previewColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  primaryButton: string;
  primaryButtonHover: string;
  heroGradient: string;
  headerAccent: string;
  cardHighlight: string;
  activeTabBg: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  royal: {
    id: 'royal',
    name: 'Royal Purple & Electric Blue',
    tagline: 'Vibrant Royal Purple (#6246EA) with Electric Blue & Coral Orange',
    previewColor: '#6246EA',
    accentColor: '#FF7043',
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-900',
    badgeText: 'text-[#6246EA]',
    primaryButton: 'bg-[#6246EA] hover:bg-[#5339d6] text-white shadow-md shadow-[#6246EA]/25',
    primaryButtonHover: 'hover:bg-[#5339d6]',
    heroGradient: 'from-[#17213A] via-[#6246EA]/80 to-[#2878FF]/70',
    headerAccent: 'text-[#6246EA]',
    cardHighlight: 'hover:border-[#6246EA]/40 hover:shadow-purple-500/10',
    activeTabBg: 'bg-[#6246EA] text-white shadow-sm',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald & Gold',
    tagline: 'Forest Emerald & Radiant Champagne Gold',
    previewColor: '#059669',
    accentColor: '#d97706',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badgeText: 'text-emerald-700',
    primaryButton: 'bg-emerald-800 hover:bg-emerald-900 text-white',
    primaryButtonHover: 'hover:bg-emerald-900',
    heroGradient: 'from-emerald-950 via-stone-950/80 to-transparent',
    headerAccent: 'text-emerald-800',
    cardHighlight: 'hover:border-emerald-500/50',
    activeTabBg: 'bg-emerald-800 text-white',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire & Coral',
    tagline: 'Deep Ocean Cobalt & Sunset Coral',
    previewColor: '#2878FF',
    accentColor: '#FF7043',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeText: 'text-[#2878FF]',
    primaryButton: 'bg-[#2878FF] hover:bg-blue-700 text-white',
    primaryButtonHover: 'hover:bg-blue-700',
    heroGradient: 'from-blue-950 via-slate-950/80 to-transparent',
    headerAccent: 'text-[#2878FF]',
    cardHighlight: 'hover:border-blue-500/50',
    activeTabBg: 'bg-[#2878FF] text-white',
  },
  bordeaux: {
    id: 'bordeaux',
    name: 'Tuscan Bordeaux',
    tagline: 'Regal Burgundy Wine & Rose Bronze',
    previewColor: '#9f1239',
    accentColor: '#f43f5e',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
    badgeText: 'text-rose-700',
    primaryButton: 'bg-rose-900 hover:bg-rose-950 text-white',
    primaryButtonHover: 'hover:bg-rose-950',
    heroGradient: 'from-rose-950 via-stone-950/80 to-transparent',
    headerAccent: 'text-rose-900',
    cardHighlight: 'hover:border-rose-500/50',
    activeTabBg: 'bg-rose-900 text-white',
  },
  amber: {
    id: 'amber',
    name: 'Imperial Gold',
    tagline: 'Obsidian Black & Warm Amber Gold',
    previewColor: '#d97706',
    accentColor: '#FFC857',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeText: 'text-amber-700',
    primaryButton: 'bg-amber-700 hover:bg-amber-800 text-white',
    primaryButtonHover: 'hover:bg-amber-800',
    heroGradient: 'from-amber-950 via-stone-950/80 to-transparent',
    headerAccent: 'text-amber-800',
    cardHighlight: 'hover:border-amber-500/50',
    activeTabBg: 'bg-amber-700 text-white',
  },
};
