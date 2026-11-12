import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-cre-1',
    title: 'The Zenith Corporate Tower, ORR Bellandur',
    tagline: 'Pre-leased institutional Grade-A office tower to Fortune 100 US Tech MNC with 8.7% gross yield',
    price: 1450000000,
    priceDisplay: '₹145.00 Cr',
    rentalPriceDisplay: '₹1.05 Cr / mo',
    status: 'Pre-Leased',
    type: 'Pre-Leased Asset',
    bedrooms: 0,
    bathrooms: 16,
    workstations: 850,
    meetingRooms: 24,
    sqft: 110000,
    leasableSqft: 110000,
    floorPlateSqft: 27500,
    efficiency: 82,
    lotSize: '1.85 Acre Freehold Commercial Plot',
    yearBuilt: 2023,
    garageSpaces: 140,
    parkingRatio: '1 : 780 sq.ft',
    powerBackup: '100% DG N+1 Redundancy (2000 kVA)',
    certification: 'IGBC Platinum & LEED Gold Certified',
    grade: 'Grade A+',
    rentalYield: 8.7,
    rentalYieldDisplay: '8.7% Gross Yield',
    tenant: 'Fortune 100 US Software & Cloud Multinational',
    leaseTerm: '9 Yrs (4.5 Yrs Lock-in, 15% Escalation in 2027)',
    address: 'Marathahalli-Sarjapur Outer Ring Road, Bellandur',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Outer Ring Road (ORR)',
    mapCoords: {
      lat: 12.9260,
      lng: 77.6762,
      svgX: 68,
      svgY: 55
    },
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Pre-leased to Fortune 100 US tech tenant with 9-year corporate lease',
      'High monthly cashflow of ₹1.05 Cr with 15% triennial escalation',
      'High-efficiency 27,500 sq.ft contiguous column-free floor plates',
      'Double-height air-conditioned corporate reception lobby with turnstile access',
      'Dedicated 140 reserved 4-wheeler multi-level car parking bays',
      'High-speed Otis destination-control elevators (6 passenger + 2 service)',
      '100% DG power backup with dual HT power line feeders'
    ],
    amenities: [
      'Pre-Leased ROI',
      'IGBC Platinum',
      '27k Floorplate',
      'Food Court',
      '140 Car Parks',
      '100% DG Backup',
      'Metro 300m',
      'EV Charging'
    ],
    description: 'The Zenith Corporate Tower is a crown jewel institutional asset strategically positioned on the prime Bellandur-ORR tech arterial corridor. Currently occupied by a blue-chip US Fortune 100 enterprise, this property yields an attractive ₹1.05 Cr in monthly net rental inflow with an 8.7% gross capitalization rate. Built with double-glazed acoustic curtain walls, VRV HVAC infrastructure, and institutional-grade fire protection systems.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Level & Grand Atrium',
          sqft: 27500,
          rooms: ['Double-Height Reception', 'Security Command Center', 'Visitor Boardrooms (4)', 'Cafeteria & Lounge', 'Server Rooms']
        },
        {
          name: 'Levels 1 - 3 Corporate Work Floors',
          sqft: 82500,
          rooms: ['Open Plan Workstations (850 desks)', 'Executive Cabins (32)', 'Sprint & Agile Rooms (18)', 'Wellness Suites', 'Pantry Hubs']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 13181,
    hoaFeeMonthly: 275000,
    annualTax: 1850000,
    featured: true
  },
  {
    id: 'prop-cre-2',
    title: 'Aura Horizon Tech Campus - Block C, Whitefield',
    tagline: 'State-of-the-art 72,000 sq.ft R&D facility leased to AI & Semiconductor pioneer in EPIP zone',
    price: 885000000,
    priceDisplay: '₹88.50 Cr',
    rentalPriceDisplay: '₹68.00 Lakh / mo',
    status: 'Pre-Leased',
    type: 'Grade-A Office',
    bedrooms: 0,
    bathrooms: 12,
    workstations: 580,
    meetingRooms: 16,
    sqft: 72000,
    leasableSqft: 72000,
    floorPlateSqft: 24000,
    efficiency: 81,
    lotSize: '1.2 Acre Campus Compound',
    yearBuilt: 2024,
    garageSpaces: 90,
    parkingRatio: '1 : 800 sq.ft',
    powerBackup: '100% DG Back-up with N+1 Redundancy',
    certification: 'LEED Gold Certified',
    grade: 'Grade A+',
    rentalYield: 9.2,
    rentalYieldDisplay: '9.2% Gross Yield',
    tenant: 'Tier-1 Global AI Semiconductor Design Labs',
    leaseTerm: '10 Yrs (6 Yrs Unexpired Lock-in, 15% Escalation)',
    address: 'EPIP Industrial Zone, Phase II, Whitefield',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Whitefield Tech Corridor',
    mapCoords: {
      lat: 12.9815,
      lng: 77.7290,
      svgX: 82,
      svgY: 42
    },
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Leased to Tier-1 Semiconductor design MNC with zero downtime electrical architecture',
      'Robust 9.2% gross rental return with quarterly yield disbursement',
      'Customized server farm infrastructure with high-density cooling load',
      'Direct proximity to Whitefield Metro Station (Purple Line - 600m)',
      'Campus features green courtyards, sports arena, and amphitheatre',
      '90 allocated car spaces plus extensive two-wheeler basement stalls'
    ],
    amenities: [
      '9.2% Yield',
      'High-Density R&D',
      'Metro Connected',
      '24/7 Redundant Power',
      'LEED Gold',
      'Amphitheatre',
      'Basement Stacks'
    ],
    description: 'Aura Horizon Tech Campus Block C presents a premier pre-leased commercial investment in Whitefield’s established EPIP Tech enclave. Housing an international semiconductor and generative AI hardware design center, the asset offers guaranteed long-term stable cash flows backed by a 6-year non-cancellable lock-in term.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Level Labs & Client Experience',
          sqft: 24000,
          rooms: ['Robotics Testing Bay', 'Silicon Validation Lab', 'Auditorium (120 Seats)', 'Town Hall Zone']
        },
        {
          name: 'Floors 1 & 2 Engineering Suites',
          sqft: 48000,
          rooms: ['Open Plan Workstations (580 desks)', 'Collaboration Pods (20)', 'Executive Suites', 'Video Conferencing Rooms']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 12291,
    hoaFeeMonthly: 180000,
    annualTax: 1150000,
    featured: true
  },
  {
    id: 'prop-cre-3',
    title: 'The Boulevard Retail Flagship, 100ft Road Indiranagar',
    tagline: 'Iconic prime high-street commercial building with massive frontage leased to luxury dining & lifestyle brand',
    price: 420000000,
    priceDisplay: '₹42.00 Cr',
    rentalPriceDisplay: '₹29.50 Lakh / mo',
    status: 'Pre-Leased',
    type: 'High-Street Retail',
    bedrooms: 0,
    bathrooms: 8,
    workstations: 0,
    meetingRooms: 4,
    sqft: 14200,
    leasableSqft: 14200,
    floorPlateSqft: 3550,
    efficiency: 88,
    lotSize: '6,200 sq.ft Corner Plot',
    yearBuilt: 2023,
    garageSpaces: 20,
    parkingRatio: 'Valet + 20 Surface/Basement Bays',
    powerBackup: '100% DG Back-up (320 kVA)',
    certification: 'Prime Commercial A+ Frontage',
    grade: 'Prime Commercial',
    rentalYield: 8.4,
    rentalYieldDisplay: '8.4% Gross Yield',
    tenant: 'Top Tier International Luxury Dining & Retail Concept',
    leaseTerm: '12 Yrs Long Lease (5 Yrs Lock-in, 15% Escalation every 3 Yrs)',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Indiranagar 100ft Road',
    mapCoords: {
      lat: 12.9719,
      lng: 77.6412,
      svgX: 58,
      svgY: 46
    },
    mainImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Commanding 65-foot glass frontage on Indiranagar 100 Feet Road',
      'Ground + 3 levels plus open-air rooftop botanical terrace lounge',
      'Secured 12-year lease with top-rated hospitality brand generating ₹29.5L/mo',
      'High footfall pedestrian zone with premium HNIs and luxury demographics',
      'Dedicated passenger elevator, dumbwaiter service lift, and commercial kitchen gas banks',
      'Heavy-duty 3-phase commercial sanctioned electrical load with backup'
    ],
    amenities: [
      '100ft Rd Frontage',
      '8.4% Yield',
      '12-Yr Lease',
      'Rooftop Terrace',
      'High Footfall',
      'Valet Bays',
      'Full DG Backup'
    ],
    description: 'High-street commercial properties along Indiranagar’s famed 100 Feet Road represent Bengaluru’s most resilient and scarce commercial retail real estate. The Boulevard features an uninterrupted double-glazed glass façade, high structural slab-to-slab clear heights of 14 feet, and seamless accessibility.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Floor Flagship Showroom',
          sqft: 3550,
          rooms: ['Prime Retail Showcase', 'Point of Sale Salon', 'Storage Bay']
        },
        {
          name: 'First & Second Floors Dining Suites',
          sqft: 7100,
          rooms: ['Main Dining Salon', 'Private Dining Rooms (4)', 'Commercial Kitchen']
        },
        {
          name: 'Rooftop Lounge & Terrace',
          sqft: 3550,
          rooms: ['Alfresco Botanical Deck', 'Craft Beverage Bar', 'Restroom Suites']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 29577,
    hoaFeeMonthly: 40000,
    annualTax: 580000,
    featured: true
  },
  {
    id: 'prop-cre-4',
    title: 'Prestige Sovereign Commercial Chambers, Lavelle Road & CBD',
    tagline: 'Ultra-exclusive whole-floor Grade-A corporate suite overlooking Cubbon Park and UB City',
    price: 1150000000,
    priceDisplay: '₹115.00 Cr',
    rentalPriceDisplay: '₹82.00 Lakh / mo',
    status: 'Institutional Mandate',
    type: 'Grade-A Office',
    bedrooms: 0,
    bathrooms: 10,
    workstations: 380,
    meetingRooms: 12,
    sqft: 48000,
    leasableSqft: 48000,
    floorPlateSqft: 16000,
    efficiency: 84,
    lotSize: 'CBD Commercial Development',
    yearBuilt: 2024,
    garageSpaces: 65,
    parkingRatio: '1 : 750 sq.ft',
    powerBackup: '100% N+1 DG Backup (Dual Source)',
    certification: 'LEED Platinum Commercial',
    grade: 'Grade A+',
    rentalYield: 8.6,
    rentalYieldDisplay: '8.6% Gross Yield',
    tenant: 'Global Private Equity & Investment Banking Conglomerate',
    leaseTerm: '9 Yrs Institutional Lease (5 Yrs Lock-in)',
    address: 'Vittal Mallya Road / Lavelle Road, Central CBD',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Central CBD (MG Rd & Lavelle Rd)',
    mapCoords: {
      lat: 12.9716,
      lng: 77.5946,
      svgX: 42,
      svgY: 48
    },
    mainImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Premier Central Business District commercial trophy asset next to UB City',
      'Panoramic floor-to-ceiling glass envelope overlooking lush Cubbon Park green canopy',
      'Fitted out to supreme Tier-1 financial headquarters specifications',
      'Private VIP executive elevator with biometric Iris authentication',
      'Helipad access and 65 underground reserved multi-level parking stalls',
      'Triennial 15% rental escalation with institutional AAA security deposits'
    ],
    amenities: [
      'CBD Landmark',
      'Cubbon Park Views',
      '8.6% Yield',
      'VIP Direct Elevators',
      'Helipad Access',
      'Triple-Pane Acoustic Glazing',
      '100% Redundant Power'
    ],
    description: 'Prestige Sovereign Commercial Chambers is an irreplaceable corporate trophy asset located at the epicentre of Bengaluru’s financial CBD on Lavelle Road. Surrounded by five-star luxury hotels, diplomatic consulates, and high-end dining, this property caters to elite sovereign wealth funds, family offices, and multinational investment desks.',
    floorPlan: {
      levels: [
        {
          name: 'Executive Boardroom & Client Pavilion',
          sqft: 16000,
          rooms: ['Main Boardroom for 28', 'Private Deal Dining Salons', 'Chairman Suite', 'Treasury Trading Floor']
        },
        {
          name: 'Global Operations & Advisory Floors (2 Levels)',
          sqft: 32000,
          rooms: ['Partner Cabins (24)', 'Open Advisory Workstations (380)', 'Telepresence Auditoriums', 'Wellness Lounges']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 23958,
    hoaFeeMonthly: 160000,
    annualTax: 1450000,
    featured: true
  },
  {
    id: 'prop-cre-5',
    title: 'Nexus Enterprise Workspace Hub, Koramangala',
    tagline: 'High-density plug & play commercial center leased to high-growth Unicorn SaaS venture',
    price: 368000000,
    priceDisplay: '₹36.80 Cr',
    rentalPriceDisplay: '₹28.20 Lakh / mo',
    status: 'Pre-Leased',
    type: 'Managed Enterprise',
    bedrooms: 0,
    bathrooms: 8,
    workstations: 290,
    meetingRooms: 10,
    sqft: 28500,
    leasableSqft: 28500,
    floorPlateSqft: 9500,
    efficiency: 85,
    lotSize: '12,500 sq.ft Commercial Corner',
    yearBuilt: 2023,
    garageSpaces: 35,
    parkingRatio: '1 : 810 sq.ft',
    powerBackup: '100% DG Back-up (400 kVA)',
    certification: 'Smart Green Commercial Building',
    grade: 'Grade A',
    rentalYield: 9.1,
    rentalYieldDisplay: '9.1% Gross Yield',
    tenant: 'Unicorn Enterprise FinTech & Cloud Platform',
    leaseTerm: '7 Yrs (4 Yrs Balance Lock-in, 15% Escalation)',
    address: '80 Feet Road, 4th Block, Koramangala',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Koramangala Commercial Hub',
    mapCoords: {
      lat: 12.9352,
      lng: 77.6245,
      svgX: 52,
      svgY: 58
    },
    mainImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Turnkey enterprise fit-outs valued at ₹8.5 Cr included with the asset acquisition',
      'Consistent 9.1% high gross rental yield yielding ₹28.2 Lakh monthly rent',
      'Prime Koramangala 80ft arterial boulevard location with high tech talent density',
      'Equipped with modular acoustic phone booths, breakout gaming amphitheatre, and podcast studio',
      'Automated IoT energy-saving HVAC systems lowering common maintenance outlays by 28%',
      '35 dedicated vehicular bays plus EV fast-charging grid'
    ],
    amenities: [
      '9.1% High Yield',
      'Plug & Play Fitouts',
      'Koramangala Hub',
      'Podcast Studio',
      'IoT HVAC',
      '35 Car Parks',
      'Fibre Redundancy'
    ],
    description: 'Nexus Enterprise Workspace Hub is a contemporary agile commercial center tailored for high-growth tech enterprises in Bengaluru’s startup capital of Koramangala. Offered fully fitted with ergonomic furniture, CAT6A structural cabling, enterprise firewalls, and acoustic pods.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Floor Reception & Event Amphitheatre',
          sqft: 9500,
          rooms: ['Barista Cafe', '100-Seat Town Hall Arena', 'Interview Suites (4)', 'Podcast Studio']
        },
        {
          name: 'First & Second Enterprise Work Floors',
          sqft: 19000,
          rooms: ['290 Height-Adjustable Desks', 'Executive Cabins (8)', 'War Rooms (6)', 'Pantry Hub']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 12912,
    hoaFeeMonthly: 55000,
    annualTax: 480000,
    featured: false
  },
  {
    id: 'prop-cre-6',
    title: 'Aura Prime Logistics & Fulfilment Park, Hoskote Corridor',
    tagline: 'Grade-A PEB industrial warehousing facility leased to global 3PL logistics giant with 9.4% yield',
    price: 620000000,
    priceDisplay: '₹62.00 Cr',
    rentalPriceDisplay: '₹48.50 Lakh / mo',
    status: 'Pre-Leased',
    type: 'Logistics & Warehousing',
    bedrooms: 0,
    bathrooms: 12,
    workstations: 60,
    meetingRooms: 4,
    sqft: 165000,
    leasableSqft: 165000,
    floorPlateSqft: 165000,
    efficiency: 94,
    lotSize: '6.50 Acres Freehold Industrial Land',
    yearBuilt: 2023,
    garageSpaces: 45,
    parkingRatio: '45 Trailer & Container Docks + 30 Car Bays',
    powerBackup: '100% DG Back-up with Solar Rooftop Grid (500 kW)',
    certification: 'Grade-A Industrial PEB & FM Global Fire Standard',
    grade: 'Grade A+',
    rentalYield: 9.4,
    rentalYieldDisplay: '9.4% Gross Yield',
    tenant: 'Leading Multinational 3PL & E-Commerce Supply Chain Giant',
    leaseTerm: '15 Yrs Long-term Master Lease (5 Yrs Lock-in, 12% Escalation every 3 Yrs)',
    address: 'National Highway 75, Hoskote Industrial Area',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'North Bengaluru / Airport Corridor',
    mapCoords: {
      lat: 13.0720,
      lng: 77.7980,
      svgX: 88,
      svgY: 28
    },
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      '12-meter clear height pre-engineered building (PEB) with FM-2 laser screed flooring (6T/sqm load)',
      'High 9.4% gross capitalization rate with 15-year long institutional lease contract',
      'Equipped with 22 hydraulic dock levellers with automated sectional overhead doors',
      'ESFR fire sprinkler grid and dedicated 300,000 litre underground water reservoir',
      'Captive 500 kW rooftop solar photovoltaic array lowering client carbon index',
      'Direct highway signal-free access connecting Chennai-Bangalore Industrial Corridor'
    ],
    amenities: [
      '9.4% Top Yield',
      '15-Yr Institutional Lease',
      '12m Clear Height',
      '22 Dock Levellers',
      '500 kW Solar Rooftop',
      'ESFR Fire Sprinklers',
      'NH-75 Access'
    ],
    description: 'Aura Prime Logistics & Fulfilment Park is a cutting-edge Grade-A logistics infrastructure asset located in Hoskote on the Bengaluru-Chennai industrial belt. Engineered for high-throughput supply chains, heavy container movement, and temperature-controlled storage, this asset is master-leased to a global 3PL supply chain leader.',
    floorPlan: {
      levels: [
        {
          name: 'Main High-Bay Warehouse & Sorting Arena',
          sqft: 155000,
          rooms: ['22 Loading Docks', 'Laser-Screed Racking Aisles', 'Battery Charging Bay', 'Staging Zone']
        },
        {
          name: 'Mezzanine Administration & Operations Office',
          sqft: 10000,
          rooms: ['Operations Control Center', 'Customs Clearance Office', 'Staff Cafeteria', 'Driver Rest Lounge']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 3757,
    hoaFeeMonthly: 45000,
    annualTax: 620000,
    featured: true
  },
  {
    id: 'prop-cre-7',
    title: 'Aeropolis Tech Park Campus, Airport Expressway',
    tagline: 'Next-generation 145,000 sq.ft commercial campus in North Bengaluru KIADB Aerospace SEZ',
    price: 1800000000,
    priceDisplay: '₹180.00 Cr',
    rentalPriceDisplay: '₹1.35 Cr / mo',
    status: 'New Development',
    type: 'Tech Park Campus',
    bedrooms: 0,
    bathrooms: 24,
    workstations: 1200,
    meetingRooms: 36,
    sqft: 145000,
    leasableSqft: 145000,
    floorPlateSqft: 36250,
    efficiency: 83,
    lotSize: '2.75 Acres Campus Site',
    yearBuilt: 2025,
    garageSpaces: 210,
    parkingRatio: '1 : 690 sq.ft',
    powerBackup: '100% DG Back-up with N+2 Redundancy',
    certification: 'USGBC Platinum Net Zero Ready',
    grade: 'Grade A+',
    rentalYield: 9.0,
    rentalYieldDisplay: '9.0% Projected Yield',
    tenant: 'Aerospace & Global Capability Center (GCC) Pre-Commitments',
    leaseTerm: 'Ready for Warm-Shell Fitouts Q3 2025 (10-Yr Master Lease)',
    address: 'KIADB Aerospace SEZ, Near Devanahalli Airport Corridor',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'North Bengaluru / Airport Corridor',
    mapCoords: {
      lat: 13.1986,
      lng: 77.7066,
      svgX: 74,
      svgY: 18
    },
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Expansive 36,250 sq.ft floor plates ideal for Fortune 500 GCC mega campuses',
      'Strategically positioned 12 minutes from Kempegowda International Airport (BLR)',
      'Substantial tax & duty incentives under Karnataka Aerospace & Defence policy',
      'Designed with biophilic sky gardens, rooftop wellness running track, and sports pavilions',
      'Net-zero energy ready with 100% greywater recycling and high-performance Low-E glazing',
      '210 basement car bays with smart automated parking guidance system'
    ],
    amenities: [
      'GCC Campus Scale',
      'Airport 12 Mins',
      'USGBC Net Zero',
      '36k Floorplates',
      'Sky Gardens',
      '210 Car Stacks',
      'SEZ Tax Incentives'
    ],
    description: 'Aeropolis Tech Park Campus represents the future of enterprise real estate in North Bengaluru’s booming Devanahalli airport growth corridor. Designed specifically to host Global Capability Centers (GCCs) requiring massive contiguous floorplates, energy redundancy, and effortless global transit connectivity.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Level & Biophilic Central Plaza',
          sqft: 36250,
          rooms: ['3-Story Triple Glazed Atrium', 'Auditorium (250 Seats)', 'Food Court Pavilion', 'Fitness Hub']
        },
        {
          name: 'Floors 1 - 3 Mega GCC Floor Plates',
          sqft: 108750,
          rooms: ['Open Plan Workstations (1200+ desks)', 'Executive C-Suite Boardrooms', 'Innovation Labs', 'Bespoke Breakout Decks']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 12413,
    hoaFeeMonthly: 290000,
    annualTax: 2100000,
    featured: false
  },
  {
    id: 'prop-cre-8',
    title: 'Cunningham Prime Commercial Chambers, Central CBD',
    tagline: 'Pre-leased boutique corporate office asset leased to national law & consulting firm on Cunningham Road',
    price: 295000000,
    priceDisplay: '₹29.50 Cr',
    rentalPriceDisplay: '₹21.00 Lakh / mo',
    status: 'Pre-Leased',
    type: 'Pre-Leased Asset',
    bedrooms: 0,
    bathrooms: 6,
    workstations: 140,
    meetingRooms: 8,
    sqft: 18200,
    leasableSqft: 18200,
    floorPlateSqft: 4550,
    efficiency: 84,
    lotSize: '7,800 sq.ft Commercial Plot',
    yearBuilt: 2022,
    garageSpaces: 22,
    parkingRatio: '1 : 820 sq.ft',
    powerBackup: '100% DG Backup (250 kVA)',
    certification: 'Boutique Commercial A Grade',
    grade: 'Prime Commercial',
    rentalYield: 8.5,
    rentalYieldDisplay: '8.5% Gross Yield',
    tenant: 'Senior Advocate Chambers & Corporate Tax Advisory',
    leaseTerm: '9 Yrs (4 Yrs Balance Lock-in, 15% Escalation in 2026)',
    address: 'Cunningham Road, Near High Court & Vidhana Soudha',
    city: 'Bengaluru, Karnataka',
    neighborhood: 'Central CBD (MG Rd & Lavelle Rd)',
    mapCoords: {
      lat: 12.9860,
      lng: 77.5980,
      svgX: 45,
      svgY: 34
    },
    mainImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Prime CBD location minutes from Karnataka High Court and Vidhana Soudha',
      'Solid 8.5% rental yield backed by a 9-year institutional corporate lease',
      'Fully furnished with bespoke teak wood paneling, library chambers, and arbitration suites',
      'Dual basement parking with 22 reserved parking slots',
      'Dedicated Schindler high-speed elevator and 100% silent DG power generator'
    ],
    amenities: [
      '8.5% Yield',
      'High Court Vicinity',
      '9-Yr Corporate Lease',
      'Teak Panelled Chambers',
      '22 Car Stalls',
      'Full DG Power'
    ],
    description: 'Situated on prestigious Cunningham Road in Bengaluru’s core central corridor, Cunningham Prime Commercial Chambers is a boutique corporate building leased to premier legal and corporate tax counsels. The asset offers high security, immaculate rental pedigree, and capital stability.',
    floorPlan: {
      levels: [
        {
          name: 'Ground Level Reception & Partner Suites',
          sqft: 4550,
          rooms: ['Reception Lobby', 'Arbitration Chamber', 'Senior Partner Suites (3)', 'Client Waiting Salons']
        },
        {
          name: 'Levels 1 - 3 Corporate Legal Desks',
          sqft: 13650,
          rooms: ['Associate Workstations (140)', 'Law Library', 'Conference Rooms (6)', 'Secure Archives Vault']
        }
      ]
    },
    agent: {
      name: 'Jerin VR',
      role: 'Founder & Managing Director | Institutional CRE Advisory',
      phone: '+91 76760 21032',
      email: 'jerin@jerinrealtors.com',
      experience: '18+ Years Institutional CRE & Pre-Leased Mandates'
    },
    pricePerSqft: 16208,
    hoaFeeMonthly: 35000,
    annualTax: 390000,
    featured: false
  }
];

export const PROPERTY_TYPES = [
  'All Types',
  'Grade-A Office',
  'Pre-Leased Asset',
  'Tech Park Campus',
  'High-Street Retail',
  'Managed Enterprise',
  'Logistics & Warehousing',
  'Commercial Land'
] as const;

export const NEIGHBORHOODS = [
  'All Locations',
  'Outer Ring Road (ORR)',
  'Whitefield Tech Corridor',
  'Central CBD (MG Rd & Lavelle Rd)',
  'Indiranagar 100ft Road',
  'Koramangala Commercial Hub',
  'North Bengaluru / Airport Corridor'
] as const;
