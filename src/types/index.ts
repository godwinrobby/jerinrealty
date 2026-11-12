export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  rentalPriceDisplay?: string;
  status: 'For Sale' | 'For Rent' | 'Pre-Leased' | 'Under Offer' | 'New Development' | 'Institutional Mandate';
  type: 
    | 'Grade-A Office'
    | 'Pre-Leased Asset'
    | 'Tech Park Campus'
    | 'High-Street Retail'
    | 'Managed Enterprise'
    | 'Logistics & Warehousing'
    | 'Commercial Land'
    | 'Penthouse'
    | 'Villa'
    | 'Waterfront'
    | 'Modern Estate'
    | 'Townhouse';
  bedrooms?: number;
  bathrooms?: number;
  workstations?: number;
  meetingRooms?: number;
  sqft: number;
  leasableSqft?: number;
  lotSize?: string;
  yearBuilt: number;
  garageSpaces: number;
  address: string;
  city: string;
  neighborhood: string;
  mapCoords: {
    lat: number;
    lng: number;
    svgX: number; // percentage 0-100 for SVG canvas
    svgY: number; // percentage 0-100 for SVG canvas
  };
  mainImage: string;
  galleryImages: string[];
  features: string[];
  amenities: string[];
  description: string;
  floorPlan: {
    levels: {
      name: string;
      sqft: number;
      rooms: string[];
    }[];
  };
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    experience: string;
  };
  pricePerSqft: number;
  hoaFeeMonthly: number;
  annualTax: number;
  featured?: boolean;
  // Commercial-specific metrics
  rentalYield?: number; // e.g. 8.8 for 8.8%
  rentalYieldDisplay?: string; // e.g. '8.8% Gross Yield'
  tenant?: string; // e.g. 'Fortune 500 US Technology Corp'
  leaseTerm?: string; // e.g. '9 Yrs (5 Yrs Lock-in, 15% Escalation)'
  floorPlateSqft?: number;
  efficiency?: number; // e.g. 82 for 82%
  parkingRatio?: string; // e.g. '1 : 750 sq.ft'
  powerBackup?: string; // e.g. '100% N+1 DG Backup'
  certification?: string; // e.g. 'IGBC Platinum / LEED Gold'
  grade?: 'Grade A+' | 'Grade A' | 'Prime Commercial' | 'Boutique Commercial';
  reraId?: string;
}

export interface InquirySubmission {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  inquiryType?: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  tourFormat?: 'in-person' | 'virtual';
  estimatedDownPayment?: string;
  financingStatus?: string;
  message: string;
  submittedAt: string;
  status?: 'new' | 'contacted' | 'visit_scheduled' | 'negotiation' | 'closed';
  notes?: string;
}

export interface Director {
  id: string;
  name: string;
  title: string;
  credentials: string;
  image: string;
  bio: string;
  focus: string[];
  quote: string;
  directLine: string;
  email: string;
}

export interface ProjectDevelopment {
  id: string;
  name: string;
  developer: string;
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  category: 'Residential' | 'Commercial' | 'Ultra Luxury';
  location: string;
  neighborhood: string;
  priceStart: string;
  priceStartNumeric: number;
  configuration: string;
  units: string;
  possessionDate: string;
  reraId: string;
  image: string;
  gallery: string[];
  highlight: string;
  amenities: string[];
  description: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  image: string;
  badge: string;
  gradient: string;
  iconName: string;
  propertyType: string;
}

export interface PopularLocation {
  id: string;
  name: string;
  tagline: string;
  propertyCount: number;
  averagePriceSqft: string;
  image: string;
  distanceToAirport: string;
  topAmenity: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  propertyAcquired: string;
  rating: number;
  avatar: string;
  review: string;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'owner' | 'investor';
  savedPropertyIds: string[];
}
