import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ContactPageProps {
  onOpenEnquiry: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenEnquiry }) => {
  const { themeConfig } = useTheme();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const FAQS = [
    {
      q: 'What is the procedure for scheduling private property inspections?',
      a: 'Due to the high-profile nature of our estates, all physical viewings require 24-hour advance coordination and preliminary verification of identity or proof of funds. Private airport or hotel transfers are provided upon request.'
    },
    {
      q: 'How does Jerin Realtors safeguard client confidentiality?',
      a: 'Every initial conversation and confidential dossier exchange is protected under institutional-grade bilateral non-disclosure agreements (NDAs). Client identities are never disclosed to the public or advertising networks.'
    },
    {
      q: 'Do you facilitate off-market "pocket listings"?',
      a: 'Yes. Approximately 45% of our transactional volume is conducted completely off-market without public portal dissemination. Contact our Managing Director directly to access private inventory.'
    },
    {
      q: 'Can you assist foreign national buyers with cross-border escrow and currency?',
      a: 'Our Global Capital Office works alongside top-tier private banks and tax counsel in Zurich, London, and New York to structure compliant multi-currency escrow facilities and onshore holding entities.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Jerin Realty | Commercial Real Estate Advisory & Enquiries</title>
        <meta name="description" content="Contact Jerin Realty for expert commercial real estate advisory, corporate site acquisitions, retail portfolio expansion, and pre-leased property investments across India. Schedule a confidential consultation with our RERA-registered advisors." />
        <meta name="keywords" content="commercial real estate contact, corporate site acquisition, retail expansion advisory, pre-leased property enquiry, Jerin Realty Bangalore" />
        <meta property="og:title" content="Contact Jerin Realty | Commercial Real Estate Advisory" />
        <meta property="og:description" content="Get in touch with Jerin Realty for strategic commercial real estate advisory. Corporate site acquisitions, retail portfolio expansion, pre-leased investments across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jerinrealty.com/contact" />
        <meta property="og:image" content="https://jerinrealty.com/images/Jerin-Realty-Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Jerin Realty | Commercial Real Estate Advisory" />
        <meta name="twitter:description" content="Expert commercial real estate advisory for corporate acquisitions, retail expansion, and pre-leased investments." />
        <link rel="canonical" href="https://jerinrealty.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Jerin Realty",
            "description": "Contact Jerin Realty for commercial real estate advisory services including corporate site acquisitions, retail portfolio expansion, and pre-leased property investments across India.",
            "url": "https://jerinrealty.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Jerin Realty",
              "url": "https://jerinrealty.com",
              "logo": "https://jerinrealty.com/images/Jerin-Realty-Logo.png",
              "telephone": "+91 76760 21032",
              "email": "info@jerinrealtors.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No 31, 1st Floor, Unity Enclave, Geddalahalli, Bangalore North",
                "addressLocality": "Bengaluru",
                "addressRegion": "Karnataka",
                "postalCode": "560077",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.linkedin.com/company/jerinrealty",
                "https://twitter.com/jerinrealty",
                "https://www.instagram.com/jerinrealty"
              ]
            }
          })}
        </script>
      </Helmet>
      <div className="space-y-16 pb-20">
      {/* Top Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <span 
          className="text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full border bg-white"
          style={{ color: themeConfig.previewColor, borderColor: `${themeConfig.previewColor}40` }}
        >
          BENGALURU FLAGSHIP & PRIVATE OFFICE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-stone-900 tracking-tight leading-tight">
          Connect with Our Private Office
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Discreet consultations for estate acquisitions, private valuations, and confidential divestments.
        </p>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: `${themeConfig.previewColor}20`, color: themeConfig.previewColor }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-editorial text-stone-900">
                Message Received in Confidence
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you, {name}. A member of the Executive Director's staff will be in touch via {phone || email} within two business hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className={`mt-4 px-5 py-2.5 rounded-xl text-xs font-medium text-white ${themeConfig.primaryButton}`}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-lg font-bold font-editorial text-stone-900">
                  Direct Mandate Inquiry Form
                </h3>
                <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: themeConfig.previewColor }} />
                  Encrypted Confidential
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alistair Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 76760 21032"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Confidential Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@familyoffice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sadashivanagar / Indiranagar, Bengaluru"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Detailed Notes / Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide specifications, target locations, or timing requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="text-xs text-stone-600 hover:text-stone-900 underline underline-offset-4"
                >
                  Or open quick property enquiry popup
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 ${themeConfig.primaryButton}`}
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Mandate</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Global Locations & Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Enquire Us Callout */}
          <div className="bg-stone-900 text-stone-100 p-6 rounded-3xl border border-stone-800 space-y-3 shadow-xl">
            <span 
              className="text-xs font-mono uppercase font-semibold"
              style={{ color: themeConfig.accentColor }}
            >
              Immediate Assistance
            </span>
            <h4 className="text-lg font-bold font-editorial text-white">
              Private Client Desk
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Prefer a direct popup enquiry form? Launch our quick property enquiry dialog:
            </p>
            <button
              onClick={onOpenEnquiry}
              className={`w-full py-2.5 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm ${themeConfig.primaryButton}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Launch Property Enquiry</span>
            </button>
          </div>

          {/* Office Cards */}
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-3xl border border-stone-200 hover:border-emerald-400 transition-all space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  Bengaluru Flagship Office
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  IST (UTC+5:30)
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                No 31, 1st Floor, Unity Enclave, Geddalahalli, Bangalore North,<br />
                PO: Kothanur, DIST: Bengaluru, Karnataka - 560077
              </p>
              <div className="text-xs font-mono text-stone-700 pt-2 border-t border-stone-100 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>+91 76760 21032</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>info@jerinrealtors.com</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Mon – Sat: 09:30 AM – 07:30 PM IST (Private consultations by appointment)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-mono text-stone-500 uppercase">Fiduciary Transparency</span>
          <h3 className="text-2xl font-bold font-editorial text-stone-900">
            Frequently Addressed Protocols
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-semibold text-stone-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  </>
  );
};
