import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  X, 
  Send, 
  MapPin, 
  Building2, 
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { NEW_PROJECTS } from '../data/projects';
import { Property, ProjectDevelopment } from '../types';

interface FloatingWhatsAppProps {
  onOpenDirectEnquiry: () => void;
}

interface ContextPreset {
  label: string;
  message: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenDirectEnquiry }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isCustomEdited, setIsCustomEdited] = useState(false);
  const [includePageLink, setIncludePageLink] = useState(true);

  // Dynamic context determination based on route
  const pageContext = useMemo(() => {
    const path = location.pathname;

    // Check if viewing specific property: /property/:id
    const propertyMatch = path.match(/^\/property\/([^/]+)/);
    if (propertyMatch) {
      const propId = propertyMatch[1];
      let foundProp: Property | undefined;
      try {
        const stored = localStorage.getItem('aura_prime_properties_v2');
        if (stored) {
          const list: Property[] = JSON.parse(stored);
          foundProp = list.find((p: Property) => p.id === propId);
        }
      } catch (e) {
        console.warn(e);
      }
      if (!foundProp) {
        foundProp = PROPERTIES.find((p) => p.id === propId);
      }

      if (foundProp) {
        const locName = foundProp.neighborhood || foundProp.city || 'Bengaluru';
        const yieldStr = foundProp.rentalYield ? `, ${foundProp.rentalYield}% Yield` : '';
        return {
          type: 'property' as const,
          badge: `Commercial Mandate: ${foundProp.title}`,
          subBadge: `${locName} · ${foundProp.priceDisplay}${yieldStr}`,
          defaultMsg: `Hello Jerin Realtors, I am reviewing the commercial asset '${foundProp.title}' in ${locName} (${foundProp.priceDisplay}${yieldStr}) on your website. I would like to request the tenant lease dossier, due diligence pack, and arrange a site inspection.`,
          presets: [
            {
              label: '📊 Request Due Diligence Dossier',
              message: `Hello Jerin Realtors, please share the institutional due diligence dossier, title report, and tenant lease extract for '${foundProp.title}'.`,
            },
            {
              label: '🏢 Schedule Site Inspection',
              message: `Hello Jerin Realtors, I would like to schedule a private site walkthrough and technical inspection of '${foundProp.title}' in ${locName}.`,
            },
            {
              label: '💰 Cap Rate & Escalation Terms',
              message: `Hello Jerin Realtors, please provide the complete 9-year cashflow schedule, rental escalation clauses, and LRD debt financing details for '${foundProp.title}'.`,
            },
            {
              label: '👤 Speak with Jerin VR',
              message: `Hello Jerin VR, I am evaluating '${foundProp.title}' on your website and would like to speak with you directly regarding institutional acquisition.`,
            },
          ] as ContextPreset[],
        };
      }
    }

    // Check if viewing specific project: /project/:id
    const projectMatch = path.match(/^\/project\/([^/]+)/);
    if (projectMatch) {
      const projId = projectMatch[1];
      let foundProj: ProjectDevelopment | undefined;
      try {
        const stored = localStorage.getItem('aura_prime_projects_v1');
        if (stored) {
          const list: ProjectDevelopment[] = JSON.parse(stored);
          foundProj = list.find((p: ProjectDevelopment) => p.id === projId);
        }
      } catch (e) {
        console.warn(e);
      }
      if (!foundProj) {
        foundProj = NEW_PROJECTS.find((p) => p.id === projId);
      }

      if (foundProj) {
        return {
          type: 'project' as const,
          badge: `Project: ${foundProj.name}`,
          subBadge: `${foundProj.developer} · ${foundProj.location}`,
          defaultMsg: `Hello Jerin Realtors, I am viewing the landmark development '${foundProj.name}' by ${foundProj.developer} in ${foundProj.location} (${foundProj.priceStart}) on your website. Please share floor plans, price sheet, and pre-launch booking details.`,
          presets: [
            {
              label: '🏷️ Pre-Launch Price Sheet',
              message: `Hello Jerin Realtors, please share the official pre-launch price sheet and payment schedule for '${foundProj.name}' by ${foundProj.developer}.`,
            },
            {
              label: '📐 Masterplan & Floorplans',
              message: `Hello Jerin Realtors, please send high-resolution masterplan blueprints and unit floorplans for '${foundProj.name}'.`,
            },
            {
              label: '🚗 Book Chauffeur Site Tour',
              message: `Hello Jerin Realtors, I would like to reserve a private chauffeur-driven site visit to '${foundProj.name}' on ${foundProj.location}.`,
            },
            {
              label: '⭐ Priority Allotment',
              message: `Hello Jerin Realtors, please advise on priority VIP allocations and early-stage pricing for '${foundProj.name}'.`,
            },
          ] as ContextPreset[],
        };
      }
    }

    // Projects page: /projects
    if (path === '/projects') {
      return {
        type: 'projects' as const,
        badge: 'New Landmark Projects Desk',
        subBadge: 'Bengaluru Sovereign Developments',
        defaultMsg: `Hello Jerin Realtors, I am exploring your New Landmark Projects portfolio in Bengaluru on your website. I would like to enquire about upcoming pre-launches from Sobha, Prestige, and Total Environment.`,
        presets: [
          {
            label: 'Sobha & Prestige Pre-Launches',
            message: `Hello Jerin Realtors, please send details on upcoming Sobha and Prestige luxury pre-launches in Bengaluru with early allocations.`,
          },
          {
            label: 'Total Environment Projects',
            message: `Hello Jerin Realtors, I am interested in Total Environment earth-sheltered villa developments in Bengaluru. What inventory is available?`,
          },
          {
            label: 'High-Yield Investor Desk',
            message: `Hello Jerin Realtors, I am looking to invest ₹5 Cr - ₹25 Cr in pre-launch landmark projects. Please share your top-performing allocations.`,
          },
        ] as ContextPreset[],
      };
    }

    // Directors page: /directors
    if (path === '/directors') {
      return {
        type: 'directors' as const,
        badge: 'Leadership & Jerin VR Desk',
        subBadge: 'Executive Board of Directors',
        defaultMsg: `Hello Jerin VR & Leadership Desk, I am viewing your Board of Directors page on your website and would like to arrange a confidential consultation regarding luxury estate acquisitions in Bengaluru.`,
        presets: [
          {
            label: 'Consultation with Jerin VR',
            message: `Hello Jerin VR, I would like to schedule a confidential advisory call with you regarding private acquisitions in Bengaluru.`,
          },
          {
            label: 'Off-Market Pocket Listings',
            message: `Hello Jerin VR, please grant private access to your off-market trophy residences exceeding ₹15 Cr in Bengaluru.`,
          },
          {
            label: 'Family Office Advisory',
            message: `Hello Jerin VR, our family office is evaluating estate divestments and trophy acquisitions in Bengaluru and requires fiduciary representation.`,
          },
        ] as ContextPreset[],
      };
    }

    // Contact page: /contact
    if (path === '/contact') {
      return {
        type: 'contact' as const,
        badge: 'Bengaluru Flagship Office Desk',
        subBadge: 'UB City, Level 15 Concorde Tower',
        defaultMsg: `Hello Jerin Realtors, I am on your contact desk and would like to connect with your Bengaluru Flagship Office at UB City for luxury property advisory.`,
        presets: [
          {
            label: 'Book UB City Meeting',
            message: `Hello Jerin Realtors, I would like to arrange an in-person meeting at your UB City private office this week.`,
          },
          {
            label: 'Request Immediate Callback',
            message: `Hello Jerin Realtors, please arrange an executive callback from a senior portfolio director at your earliest convenience.`,
          },
          {
            label: 'List My Luxury Property',
            message: `Hello Jerin Realtors, I am looking to sell/mandate a luxury property in Bengaluru confidentially through your firm.`,
          },
        ] as ContextPreset[],
      };
    }

    // About page: /about
    if (path === '/about') {
      return {
        type: 'about' as const,
        badge: 'Jerin Realtors Advisory Desk',
        subBadge: 'Fiduciary Stewardship & Due Diligence',
        defaultMsg: `Hello Jerin Realtors, I am reading about your fiduciary real estate advisory on your website. I would like to explore your curated portfolio of Bengaluru trophy residences.`,
        presets: [
          {
            label: 'Explore Curated Portfolio',
            message: `Hello Jerin Realtors, please share your curated portfolio of vetted Bengaluru residences meeting institutional standards.`,
          },
          {
            label: 'Architectural Due Diligence',
            message: `Hello Jerin Realtors, I would like to understand your architectural vetting and BDA/BBMP legal verification process.`,
          },
          {
            label: 'General Advisory Query',
            message: `Hello Jerin Realtors, I would like to consult with an advisor regarding the Bengaluru luxury residential market.`,
          },
        ] as ContextPreset[],
      };
    }

    // Default: Home / Commercial Properties catalog
    return {
      type: 'home' as const,
      badge: 'Commercial Real Estate Concierge',
      subBadge: 'Jerin Realtors Institutional CRE Desk',
      defaultMsg: `Hello Jerin Realtors, I am exploring your commercial real estate and pre-leased assets portfolio in Bengaluru. I would like to consult on Grade-A office acquisitions and high-yield investments.`,
      presets: [
        {
          label: 'Pre-Leased Assets (8.5%+ Yield)',
          message: `Hello Jerin Realtors, please share available pre-leased commercial assets with 8.5%+ gross yields and Fortune 500 multinational tenants.`,
        },
        {
          label: 'Grade-A Office Towers (ORR & CBD)',
          message: `Hello Jerin Realtors, our organization is looking for Grade-A contiguous corporate office space (25,000 to 80,000 sq.ft) in ORR or CBD.`,
        },
        {
          label: 'High-Street Retail Showrooms',
          message: `Hello Jerin Realtors, please share prime commercial retail flagships available on Indiranagar 100ft Road or CBD with high pedestrian footfalls.`,
        },
        {
          label: 'Consult with Jerin VR',
          message: `Hello Jerin VR, I would like to schedule a private advisory session regarding institutional commercial acquisitions and divestments in Bengaluru.`,
        },
      ] as ContextPreset[],
    };
  }, [location.pathname]);

  // Sync initial message with current page context if not custom edited
  useEffect(() => {
    if (!isCustomEdited) {
      setMessage(pageContext.defaultMsg);
    }
  }, [pageContext, isCustomEdited]);

  // When opening popup, sync to default message if untouched
  const handleToggleOpen = () => {
    if (!isOpen) {
      if (!isCustomEdited) {
        setMessage(pageContext.defaultMsg);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleSelectPreset = (presetMsg: string) => {
    setMessage(presetMsg);
    setIsCustomEdited(true);
  };

  const handleResetToDefault = () => {
    setMessage(pageContext.defaultMsg);
    setIsCustomEdited(false);
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let fullText = message.trim();
    if (includePageLink && typeof window !== 'undefined') {
      fullText += `\n\n[Website Ref: ${window.location.href}]`;
    }

    const encoded = encodeURIComponent(fullText);
    // WhatsApp direct number: +91 76760 21032 (Jerin VR & Flagship Office Desk)
    const whatsappUrl = `https://wa.me/917676021032?text=${encoded}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden animate-in slide-in-from-bottom-3 duration-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F766E] via-[#059669] to-[#10B981] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Jerin Realtors Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  Online · Direct WhatsApp with Jerin VR Desk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Context Badge banner indicating what website page user is currently on */}
          <div className="bg-stone-50 border-b border-stone-200/80 px-4 py-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate">
                <span className="text-[11px] font-bold text-stone-800 block truncate">
                  {pageContext.badge}
                </span>
                <span className="text-[10px] text-stone-500 font-mono block truncate">
                  {pageContext.subBadge}
                </span>
              </div>
            </div>

            {isCustomEdited && (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200 transition-colors"
                title="Reset message to current page default"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Body Form */}
          <form onSubmit={handleSendWhatsApp} className="p-4 space-y-3">
            {/* Quick Topic Chips */}
            <div>
              <label className="text-[10px] font-mono uppercase text-stone-400 font-semibold block mb-1.5">
                Suggested Inquiries for this Page
              </label>
              <div className="flex flex-wrap gap-1.5">
                {pageContext.presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.message)}
                    className="text-[11px] text-stone-700 hover:text-emerald-800 bg-stone-100 hover:bg-emerald-50 hover:border-emerald-300 border border-stone-200/70 px-2.5 py-1 rounded-lg text-left transition-all active:scale-[0.98]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-semibold">
                  Pre-Populated WhatsApp Message
                </label>
                <span className="text-[10px] text-stone-400">Editable</span>
              </div>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setIsCustomEdited(true);
                }}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/60 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white leading-relaxed resize-none transition-all"
                placeholder="Type your WhatsApp inquiry..."
              />
            </div>

            {/* Include Page Link Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-[11px] text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={includePageLink}
                  onChange={(e) => setIncludePageLink(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 border-stone-300"
                />
                <span>Attach current page link</span>
              </label>
              <span className="text-[10px] text-stone-400 font-mono">
                UB City Desk
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat Now</span>
            </button>

            {/* Direct Phone / Desk hint */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                <span>+91 76760 21032 (Jerin VR)</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDirectEnquiry();
                }}
                className="text-stone-700 hover:text-emerald-700 font-semibold underline underline-offset-2"
              >
                Use Web Form
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={handleToggleOpen}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl border border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        title="Chat on WhatsApp with Jerin Realtors Concierge"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full border-2 border-emerald-700 animate-pulse" />
        </div>
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Us
        </span>
      </button>
    </aside>
  );
};
