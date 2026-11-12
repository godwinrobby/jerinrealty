import React from 'react';
import { PROPERTY_TYPES } from '../data/properties';
import { Search, X } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minYield?: number;
  status: string;
  sortBy?: 'featured' | 'price-desc' | 'price-asc' | 'sqft-desc' | 'yield-desc';
}

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalResults: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  totalResults,
}) => {
  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.propertyType !== 'All Types' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 2000000000 || 
    (filters.minYield && filters.minYield > 0) ||
    filters.status !== 'all' ||
    (filters.sortBy && filters.sortBy !== 'featured');

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      propertyType: 'All Types',
      minPrice: 0,
      maxPrice: 2000000000,
      minBedrooms: 0,
      minYield: 0,
      status: 'all',
      sortBy: 'featured',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Search & Primary Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
        {/* Keyword Search */}
        <div className="sm:col-span-2 md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ORR, Whitefield, CBD, Indiranagar, Hoskote, Tenant..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Commercial Property Type Dropdown */}
        <div className="sm:col-span-1 md:col-span-3">
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
            className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer font-medium"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Commercial Min Yield Selector */}
        <div className="sm:col-span-1 md:col-span-2">
          <select
            value={filters.minYield || 0}
            onChange={(e) => onFilterChange({ ...filters, minYield: Number(e.target.value) })}
            className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
          >
            <option value={0}>Any ROI Yield</option>
            <option value={8.0}>8.0%+ Gross Yield</option>
            <option value={8.5}>8.5%+ Gross Yield</option>
            <option value={9.0}>9.0%+ Gross Yield</option>
          </select>
        </div>

        {/* Sort By Selector */}
        <div className="sm:col-span-2 md:col-span-2">
          <select
            value={filters.sortBy || 'featured'}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer font-medium"
          >
            <option value="featured">Featured First</option>
            <option value="yield-desc">Yield: High to Low</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="sqft-desc">Area: Largest First</option>
          </select>
        </div>
      </div>

      {/* Secondary Bar: Result Count & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
        <div className="flex items-center gap-2 text-stone-500 font-medium">
          <span className="font-mono text-stone-900 font-semibold tabular-nums">{totalResults}</span>
          <span>institutional commercial mandates available</span>
          {hasActiveFilters && (
            <span className="text-stone-400">· filtered</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-stone-600 hover:text-stone-900 underline underline-offset-4 font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};
