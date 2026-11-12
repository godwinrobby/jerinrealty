import React, { useState, useMemo, useEffect } from 'react';
import { Property, ProjectDevelopment } from '../types';
import { PROPERTIES, PROPERTY_TYPES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { SearchFilters, FilterState } from '../components/SearchFilters';
import { HeroSection } from '../components/HeroSection';
import { CategoryCards } from '../components/CategoryCards';
import { PopularLocations } from '../components/PopularLocations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CallToActionSection } from '../components/CallToActionSection';
import { useTheme } from '../context/ThemeContext';
import { getPropertyTypeColor } from '../utils/themeStyles';
import { useNavigate } from 'react-router-dom';

interface PropertiesPageProps {
  properties?: Property[];
  projects?: ProjectDevelopment[];
  onSelectProperty: (property: Property) => void;
  onOpenEnquiry: (propertyOrTitle?: any) => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  comparedIds?: string[];
  onToggleCompare?: (id: string) => void;
  statusFilter?: 'all' | 'For Sale' | 'For Rent';
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties = PROPERTIES,
  projects,
  onSelectProperty,
  onOpenEnquiry,
  favorites = [],
  onToggleFavorite,
  comparedIds = [],
  onToggleCompare,
  statusFilter = 'all',
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const { themeConfig } = useTheme();
  const navigate = useNavigate();

  const handleNavigateToProjects = (categoryId?: string) => {
    navigate('/projects');
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  };

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    propertyType: 'All Types',
    minPrice: 0,
    maxPrice: 300000000,
    minBedrooms: 0,
    status: statusFilter,
    sortBy: 'featured',
  });

  // Sync when statusFilter prop changes (e.g. from Property menu -> Buy or Rent)
  useEffect(() => {
    if (statusFilter) {
      setFilters((prev) => ({
        ...prev,
        status: statusFilter,
      }));
    }
  }, [statusFilter]);

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter((prop) => {
      // Keyword filter
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matches = 
          prop.title.toLowerCase().includes(query) ||
          prop.address.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.neighborhood.toLowerCase().includes(query) ||
          prop.features.some((f) => f.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Property Type filter
      if (filters.propertyType !== 'All Types' && prop.type !== filters.propertyType) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && prop.status !== filters.status) {
        return false;
      }

      // Yield filter
      if (filters.minYield && filters.minYield > 0) {
        if (!prop.rentalYield || prop.rentalYield < filters.minYield) {
          return false;
        }
      }

      // Price filter
      if (prop.price < filters.minPrice || prop.price > filters.maxPrice) {
        return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy === 'yield-desc') {
      result = [...result].sort((a, b) => (b.rentalYield || 0) - (a.rentalYield || 0));
    } else if (filters.sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'sqft-desc') {
      result = [...result].sort((a, b) => b.sqft - a.sqft);
    }

    return result;
  }, [properties, filters]);

  return (
    <div className="w-full pb-20">
      
      {/* 1. Full-Width Edge-to-Edge Hero Section */}
      <HeroSection
        onOpenEnquiry={() => onOpenEnquiry()}
      />

      {/* Centered Content Container for Marketplace Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12">
        {/* 2. Explore by Category */}
        <CategoryCards onNavigateToProjects={handleNavigateToProjects} />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Testimonials */}
        <TestimonialsSection />

        {/* 8. Call to Action Banner */}
        <CallToActionSection
          onExplore={() => {
            const categories = document.getElementById('categories-section');
            if (categories) categories.scrollIntoView({ behavior: 'smooth' });
          }}
          onContact={() => {
            if (onNavigateToContact) {
              onNavigateToContact();
            } else {
              onOpenEnquiry();
            }
          }}
        />
      </div>

    </div>
  );
};