import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Mail, Phone, MapPin, 
  Send, Check, ArrowRight, Instagram, Linkedin, Youtube, Twitter, Facebook, Pin
} from 'lucide-react';
import { NavigationPage } from './Header';

interface FooterProps {
  onNavigate?: (page: NavigationPage) => void;
  onOpenEnquiry: () => void;
  onOpenListProperty?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenEnquiry,
  onOpenListProperty,
}) => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (path: string, fallback?: NavigationPage) => {
    navigate(path);
    if (onNavigate && fallback) {
      onNavigate(fallback);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="bg-[#17213A] text-purple-100/90 pt-16 pb-12 border-t border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Company Information & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-2xl p-3">
                <img
                  src="/images/Jerin-Realty-Logo.png"
                  alt="Jerin Realty Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>

<p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              Your trusted commercial real estate sales and investment advisory partner in Bengaluru. We specialise in commercial property sales, Grade-A office spaces, pre-leased commercial assets, IT parks, retail properties, commercial land and industrial real estate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2 bg-gradient-to-r from-[#6246EA] to-[#2878FF] hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#6246EA]/30"
              >
                Enquire Now
              </button>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#12A878]" />
                <span>RERA & Institutional CRE Certified</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-3">
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E4405F] flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#x" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#000000] flex items-center justify-center text-white transition-colors" aria-label="X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#pinterest" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E60023] flex items-center justify-center text-white transition-colors" aria-label="Pinterest">
                <Pin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs text-purple-200/70">
              <li>
                <button onClick={() => handleNav('/', 'properties')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about', 'about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/', 'properties')} className="hover:text-white transition-colors">
                  Commercial Properties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/', 'properties')} className="hover:text-white transition-colors">
                  Featured Properties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/', 'properties')} className="hover:text-white transition-colors">
                  Prime Commercial Locations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/directors', 'directors')} className="hover:text-white transition-colors">
                  Board of Directors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact', 'contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Categories */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Commercial Property Categories
            </span>
            <ul className="space-y-2 text-xs text-purple-200/70">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                Grade-A Office Spaces
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                Pre-Leased Commercial Properties
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                Retail Shops & Showrooms
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                IT Parks & Technology Spaces
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                Commercial Land & Development Sites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleNav('/', 'properties')}>
                Industrial & Warehouse Properties
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Bengaluru Office
            </span>
            <div className="space-y-2.5 text-xs text-purple-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF7043] shrink-0 mt-0.5" />
                <span className="leading-relaxed">No. 31, 1st Floor, Unity Enclave, Geddalahalli, Bangalore North,<br />PO: Kothanur, DIST: Bengaluru, Karnataka – 560077</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2878FF] shrink-0" />
                <span>+91 76760 21032</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFC857] shrink-0" />
                <span>info@jerinrealtors.com</span>
              </div>
              <p className="text-[11px] text-purple-300/60 pt-1">
                Mon - Sun: 9:00 AM - 8:00 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Box */}
        <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold text-white">Stay Updated with Commercial Real Estate Opportunities</h4>
            <p className="text-xs text-purple-200/70">
              Subscribe to receive updates on new commercial property listings, investment opportunities, market insights and premium property launches across Bengaluru.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-white/10 border border-purple-400/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-[#6246EA] min-w-[240px]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
            >
              {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>
          </form>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/60">
          <p>© {new Date().getFullYear()} Jerin Realty Luxury Real Estate Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('/about', 'about')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleNav('/about', 'about')} className="hover:text-white transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => handleNav('/contact', 'contact')} className="hover:text-white transition-colors">Legal Disclaimer</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
