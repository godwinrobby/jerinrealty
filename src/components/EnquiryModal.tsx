import React, { useState } from 'react';
import { Property, InquirySubmission } from '../types';
import { 
  X, 
  ShieldCheck, 
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  onSuccess?: (submission: InquirySubmission) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  onSuccess,
}) => {
  const { themeConfig } = useTheme();

  // Form states - ONLY: Name, Phone, Email, Address, Message
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  
  // Submission result state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquirySubmission | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: InquirySubmission = {
        id: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
        propertyId: property?.id,
        propertyTitle: property?.title || 'General Property Enquiry',
        inquiryType: 'property_enquiry',
        fullName,
        phone,
        email,
        address,
        message,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      };

      // Store in localStorage for user's audit trail
      try {
        const stored = JSON.parse(localStorage.getItem('aura_prime_inquiries') || '[]');
        stored.unshift(newSubmission);
        localStorage.setItem('aura_prime_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage disabled', err);
      }

      setIsSubmitting(false);
      setSubmittedData(newSubmission);
      if (onSuccess) onSuccess(newSubmission);
    }, 500);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Vibrant Royal Gradient */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-200 mb-1">
              <Building2 className="w-3.5 h-3.5 text-[#FFC857]" />
              <span className="font-semibold tracking-wider uppercase">PROPERTY ENQUIRY</span>
            </div>
            <h3 className="text-xl font-bold font-editorial text-white tracking-tight">
              Property Enquiry
            </h3>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-white/80 hover:text-white rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close Enquiry Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submittedData ? (
            /* Success confirmation screen */
            <div className="py-6 text-center space-y-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto ring-8 ring-stone-50"
                style={{ backgroundColor: `${themeConfig.previewColor}20`, color: themeConfig.previewColor }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold font-editorial text-stone-900">
                  Enquiry Submitted
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-stone-800">{submittedData.fullName}</span>. Our team will contact you shortly regarding this property.
                </p>
              </div>

              {/* Reference Details */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Enquiry Ref:</span>
                  <span className="font-bold" style={{ color: themeConfig.previewColor }}>{submittedData.id}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Name:</span>
                  <span className="text-stone-900 font-medium">{submittedData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Phone:</span>
                  <span className="text-stone-900">{submittedData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Email:</span>
                  <span className="text-stone-900">{submittedData.email}</span>
                </div>
                {submittedData.address && (
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Address:</span>
                    <span className="text-stone-900 text-right">{submittedData.address}</span>
                  </div>
                )}
                {submittedData.message && (
                  <div className="pt-1">
                    <span className="text-stone-500 block mb-1">Message:</span>
                    <p className="text-stone-800 font-sans italic bg-white p-2 rounded-lg border border-stone-200 text-xs">
                      "{submittedData.message}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-sm ${themeConfig.primaryButton}`}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Streamlined Form: ONLY Name, Phone, Email, Address, Message */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 mb-3">
                Please enter your details below. Our executive desk will reach out to you directly.
              </p>

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Nambiar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* 2 & 3. Phone & Email (mail) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+91 76760 21032"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Sadashivanagar / Indiranagar, Bengaluru"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* 5. Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-2.5 left-3 pointer-events-none text-stone-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Enter your message or questions about the property..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-100">
                <span className="text-[11px] text-stone-500 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  Confidential & Secure
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 disabled:opacity-50 text-white ${themeConfig.primaryButton}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
