import React, { useState } from 'react';
import { X, Building2, UploadCloud, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProperty: (newProperty: Partial<Property>, ownerContact: { name: string; phone: string; email: string }) => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  isOpen,
  onClose,
  onSubmitProperty,
}) => {
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<any>('Grade-A Office');
  const [status, setStatus] = useState<'For Sale' | 'For Rent' | 'Pre-Leased'>('Pre-Leased');
  const [priceInCrores, setPriceInCrores] = useState('');
  const [rentalYield, setRentalYield] = useState('8.8');
  const [tenant, setTenant] = useState('');
  const [bedrooms, setBedrooms] = useState('0');
  const [bathrooms, setBathrooms] = useState('8');
  const [sqft, setSqft] = useState('');
  const [neighborhood, setNeighborhood] = useState('Outer Ring Road (ORR)');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = (parseFloat(priceInCrores) || 1) * 10000000;
    const priceDisplay = `₹${priceInCrores} Cr`;
    const yieldNum = parseFloat(rentalYield) || 8.8;
    const monthlyRentAmt = Math.round((priceNum * (yieldNum / 100)) / 12);
    const rentalPriceDisplay = monthlyRentAmt >= 10000000 
      ? `₹${(monthlyRentAmt / 10000000).toFixed(2)} Cr / mo`
      : `₹${(monthlyRentAmt / 100000).toFixed(2)} Lakh / mo`;

    onSubmitProperty({
      title,
      type: propertyType,
      status: status as any,
      price: priceNum,
      priceDisplay,
      rentalPriceDisplay,
      rentalYield: yieldNum,
      rentalYieldDisplay: `${yieldNum}% Gross Yield`,
      tenant: tenant || 'Multinational Corporate Anchor',
      leaseTerm: '9 Yrs (4 Yrs Balance Lock-in, 15% Escalation)',
      floorPlateSqft: Math.round((parseInt(sqft, 10) || 30000) / 3),
      efficiency: 83,
      workstations: Math.round((parseInt(sqft, 10) || 30000) / 100),
      bedrooms: 0,
      bathrooms: parseInt(bathrooms, 10) || 8,
      sqft: parseInt(sqft, 10) || 30000,
      pricePerSqft: Math.round(priceNum / (parseInt(sqft, 10) || 30000)),
      neighborhood,
      address: address || `${neighborhood}, Bengaluru`,
      city: 'Bengaluru, Karnataka',
      description: description || `Prime ${propertyType} asset situated in the premier commercial corridor of ${neighborhood}, Bengaluru.`,
      features: ['24/7 Security & CCTV', '100% N+1 DG Power Backup', 'Basement Parking Stacks', 'High-speed Elevators', 'LEED Benchmark'],
      amenities: ['100% DG Backup', 'Parking Bays', 'Turnstile Access', 'High-Speed Lifts', 'Fiber Backbone'],
      yearBuilt: 2024,
      garageSpaces: 35,
      hoaFeeMonthly: 65000,
      annualTax: 580000,
      mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ],
      mapCoords: {
        lat: 12.9716,
        lng: 77.5946,
        svgX: 50,
        svgY: 50,
      },
      agent: {
        name: ownerName || 'Private Advisory Desk',
        role: 'Verified Property Owner / Broker',
        phone: ownerPhone || '+91 76760 21032',
        email: ownerEmail || 'listings@auraprime.in',
        experience: 'Verified Owner',
      },
      floorPlan: {
        levels: [
          {
            name: 'Master Level',
            sqft: parseInt(sqft, 10) || 3200,
            rooms: ['Master Bedroom', 'Living Pavilion', 'Kitchen', 'Balcony'],
          },
        ],
      },
    }, {
      name: ownerName,
      phone: ownerPhone,
      email: ownerEmail,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17213A]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">List Your Property in Bengaluru</h2>
              <p className="text-xs text-purple-100">Reach verified High-Net-Worth buyers & tenants</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#12A878] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#17213A]">Property Listing Submitted!</h3>
            <p className="text-sm text-[#727B91] max-w-md mx-auto">
              Your property has been registered in the live directory and sent to our legal verification desk for RERA title audit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Glass Pavilion Villa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3.5 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Listing Purpose *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('For Sale')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      status === 'For Sale'
                        ? 'bg-[#6246EA] text-white border-[#6246EA]'
                        : 'bg-purple-50/60 border-purple-200 text-[#727B91]'
                    }`}
                  >
                    Sell Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('For Rent')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      status === 'For Rent'
                        ? 'bg-[#2878FF] text-white border-[#2878FF]'
                        : 'bg-purple-50/60 border-purple-200 text-[#727B91]'
                    }`}
                  >
                    Rent Property
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Property Type *
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                >
                  <option value="Grade-A Office">Grade-A Corporate Office</option>
                  <option value="Pre-Leased Asset">Pre-Leased Asset (High Yield)</option>
                  <option value="Tech Park Campus">Tech Park Campus & SEZ</option>
                  <option value="High-Street Retail">High-Street Retail & Showroom</option>
                  <option value="Managed Enterprise">Managed Enterprise Workspace</option>
                  <option value="Logistics & Warehousing">Logistics & Industrial Warehouse</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Valuation / Price (₹ in Crores) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="e.g. 45.0"
                  value={priceInCrores}
                  onChange={(e) => setPriceInCrores(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Gross Rental Yield (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 8.8"
                  value={rentalYield}
                  onChange={(e) => setRentalYield(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Area (Sq.Ft) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4200"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A]"
                >
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5 BHK</option>
                  <option value="6">6+ BHK Palatial</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Bathrooms
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A]"
                >
                  <option value="2">2 Baths</option>
                  <option value="3">3 Baths</option>
                  <option value="4">4 Baths</option>
                  <option value="5">5 Baths</option>
                  <option value="6">6+ Baths</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                  Bengaluru Enclave *
                </label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-sm text-[#17213A]"
                >
                  <option value="Indiranagar">Indiranagar</option>
                  <option value="Koramangala">Koramangala</option>
                  <option value="Sadashivanagar">Sadashivanagar</option>
                  <option value="Lavelle Road">Lavelle Road & UB City</option>
                  <option value="Whitefield">Whitefield</option>
                  <option value="Hebbal">Hebbal</option>
                  <option value="Sarjapur Road">Sarjapur Road</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                Full Street Address
              </label>
              <input
                type="text"
                placeholder="e.g. 100ft Road, 4th Block, Indiranagar"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3.5 py-2 text-sm text-[#17213A]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                Property Description & Highlights
              </label>
              <textarea
                rows={2}
                placeholder="Describe key finishes, view, pool, and layout features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-purple-50/70 border border-purple-200 rounded-xl px-3.5 py-2 text-sm text-[#17213A]"
              />
            </div>

            {/* Owner Contact Information */}
            <div className="pt-2 border-t border-purple-100">
              <span className="text-xs font-bold text-[#17213A] uppercase block mb-2">
                Your Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-xs text-[#17213A]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-xs text-[#17213A]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-2 text-xs text-[#17213A]"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] shadow-lg hover:shadow-xl transition-all"
              >
                Submit Property to Live Showcase
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
