import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, MapPin, Sparkles, PlusCircle, Heart, 
  Layers, User, ChevronDown,
  Home, KeyRound, Building, ArrowRight, Tag, MessageSquare
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type NavigationPage = 
  | 'properties' 
  | 'buy'
  | 'rent'
  | 'projects'
  | 'property-detail' 
  | 'about' 
  | 'directors' 
  | 'contact' 
  | 'admin';

export type PropertyAction = 'all' | 'buy' | 'rent' | 'sell' | 'projects';

interface HeaderProps {
  currentPage?: NavigationPage;
  onNavigate?: (page: NavigationPage) => void;
  onOpenEnquiry: () => void;
  onOpenListProperty?: () => void;
  onOpenAuth?: () => void;
  onOpenWishlist?: () => void;
  onOpenCompare?: () => void;
  wishlistCount?: number;
  compareCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
  onOpenListProperty,
  onOpenAuth,
  onOpenWishlist,
  onOpenCompare,
  wishlistCount,
  compareCount,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { themeConfig } = useTheme();

  // Determine current active route
  const currentPath = location.pathname;
  const isHomeActive = currentPath === '/' || currentPath === '/home' || currentPage === 'properties';
  const isAboutActive = currentPath === '/about' || currentPage === 'about';
  const isDirectorsActive = currentPath === '/directors' || currentPage === 'directors';
  const isContactActive = currentPath === '/contact' || currentPage === 'contact';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPropertyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRouteNavigate = (path: string, pageFallback?: NavigationPage) => {
    navigate(path);
    if (onNavigate && pageFallback) {
      onNavigate(pageFallback);
    }
    setMobileMenuOpen(false);
    setPropertyDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertyMenuSelect = (action: PropertyAction) => {
    setPropertyDropdownOpen(false);
    setMobileMenuOpen(false);
    if (action === 'sell') {
      onOpenEnquiry();
      return;
    }
    if (onPropertyAction) {
      onPropertyAction(action);
    } else {
      if (action === 'projects') {
        handleRouteNavigate('/projects', 'projects');
      } else {
        handleRouteNavigate('/', 'properties');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleRouteNavigate('/', 'properties')}
            className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
          >
            <img
              src="/images/Jerin-Realty-Logo.png"
              alt="Jerin Realty Logo"
              className="h-18 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </button>

        </div>

        {/* Center: Desktop Navigation Links (Page-Based Architecture) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-[#727B91]">
          {/* Home */}
          <button
            onClick={() => handleRouteNavigate('/', 'properties')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              isHomeActive
                ? 'text-[#6246EA] border-[#6246EA] font-bold'
                : 'border-transparent hover:text-[#17213A]'
            }`}
          >
            Home
          </button>

          {/* About Us */}
          <button
            onClick={() => handleRouteNavigate('/about', 'about')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              isAboutActive
                ? 'text-[#6246EA] border-[#6246EA] font-bold'
                : 'border-transparent hover:text-[#17213A]'
            }`}
          >
            About Us
          </button>

          {/* Directors */}
          <button
            onClick={() => handleRouteNavigate('/directors', 'directors')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              isDirectorsActive
                ? 'text-[#6246EA] border-[#6246EA] font-bold'
                : 'border-transparent hover:text-[#17213A]'
            }`}
          >
            Directors
          </button>

          {/* Contact */}
          <button
            onClick={() => handleRouteNavigate('/contact', 'contact')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              isContactActive
                ? 'text-[#6246EA] border-[#6246EA] font-bold'
                : 'border-transparent hover:text-[#17213A]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Quick Actions & CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Prominent "Enquiry Now" Gradient CTA */}
          <button
            onClick={onOpenEnquiry}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md shadow-[#6246EA]/25 hover:shadow-lg hover:shadow-[#6246EA]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043]"
            title="Submit luxury property enquiry"
          >
            <MessageSquare className="w-4 h-4 shrink-0 text-[#FFC857]" />
            <span className="whitespace-nowrap">Enquiry Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-purple-200 text-[#17213A] hover:bg-purple-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">

          {/* Navigation Links (Page-Based) */}
          <div className="space-y-1.5">
            <button
              onClick={() => handleRouteNavigate('/', 'properties')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                isHomeActive ? 'bg-purple-100/70 text-[#6246EA]' : 'text-[#17213A] hover:bg-purple-50'
              }`}
            >
              <span>Home Showroom</span>
            </button>

            <button
              onClick={() => handleRouteNavigate('/about', 'about')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                isAboutActive ? 'bg-purple-100/70 text-[#6246EA]' : 'text-[#17213A] hover:bg-purple-50'
              }`}
            >
              <span>About Us</span>
            </button>

            <button
              onClick={() => handleRouteNavigate('/directors', 'directors')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                isDirectorsActive ? 'bg-purple-100/70 text-[#6246EA]' : 'text-[#17213A] hover:bg-purple-50'
              }`}
            >
              <span>Board of Directors</span>
            </button>

            <button
              onClick={() => handleRouteNavigate('/contact', 'contact')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                isContactActive ? 'bg-purple-100/70 text-[#6246EA]' : 'text-[#17213A] hover:bg-purple-50'
              }`}
            >
              <span>Contact Concierge</span>
            </button>

           </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-purple-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 text-center text-xs font-bold rounded-xl text-white bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] shadow-md shadow-[#6246EA]/20 flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#FFC857]" />
              <span>Enquiry Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
