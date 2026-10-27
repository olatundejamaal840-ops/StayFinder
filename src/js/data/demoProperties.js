/**
 * @file demoProperties.js
 * @description Curated, realistic demo property dataset for StayFinder.
 * Features prime metropolitan locations, varied property types, real NGN pricing,
 * explicit verification statuses, and verified landlord profiles.
 */

export const DEMO_PROPERTIES = [
  {
    id: "prop-001",
    title: "Luxury 4-Bedroom Waterfront Villa with Private Pool",
    description: "An extraordinary modern architectural gem located in the exclusive waterfront enclave of Lekki Phase 1. Features floor-to-ceiling soundproof glass, infinity swimming pool, smart automated lighting, high-ceiling reception lounge, German-fitted gourmet kitchen, and staff quarters. Landlord documentation and title have been physically verified by StayFinder legal inspectors.",
    transactionType: "sale",
    propertyType: "Duplex",
    price: 450000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Lagos",
      area: "Lekki Phase 1",
      state: "Lagos",
      lat: 6.4474,
      lng: 3.4723,
      approximateAddress: "Admiralty Way, Lekki Phase 1, Lagos"
    },
    bedrooms: 4,
    bathrooms: 5,
    size: 480,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 4,
    amenities: [
      "24/7 Solar & Grid Power",
      "Private Swimming Pool",
      "Fibre-Optic Internet Ready",
      "Access-Controlled Estate",
      "Smart Home Automation",
      "Fitted Kitchen with Island",
      "CCTV Surveillance",
      "Ensuite Maids Room"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ownerId: "landlord-101",
    landlord: {
      id: "landlord-101",
      name: "Heritage Prime Properties Ltd",
      phone: "+234 803 111 2233",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "January 2024",
      rating: 4.9,
      totalListings: 8,
      responseTime: "Usually replies in under 30 mins"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-01-15T09:30:00Z"
  },
  {
    id: "prop-002",
    title: "Executive 3-Bedroom Penthouse with Panoramic Skyline View",
    description: "High-floor luxury living in the diplomatic heart of Ikoyi. This penthouse offers dual balconies overlooking the Five Cowries Creek, private elevator access, Italian marble finishes, wine chiller, central AC, and full concierge support. Ideal for corporate executives seeking tranquility and security.",
    transactionType: "rent",
    propertyType: "Penthouse",
    price: 24000000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Lagos",
      area: "Ikoyi",
      state: "Lagos",
      lat: 6.4531,
      lng: 3.4358,
      approximateAddress: "Old Ikoyi, Bourdillon Corridor, Lagos"
    },
    bedrooms: 3,
    bathrooms: 4,
    size: 320,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 3,
    amenities: [
      "24/7 Dedicated Generator",
      "Olympic-length Shared Pool",
      "Gym & Wellness Centre",
      "Concierge Reception",
      "Private High-Speed Elevator",
      "Central Air Conditioning",
      "24h Uniformed Security Guards"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-102",
    landlord: {
      id: "landlord-102",
      name: "Engr. Babatunde Adeyemi",
      phone: "+234 802 444 5566",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "November 2023",
      rating: 4.8,
      totalListings: 4,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-02-01T14:15:00Z"
  },
  {
    id: "prop-003",
    title: "Chic Minimalist 2-Bedroom Apartment in Victoria Island",
    description: "Contemporary serviced flat nestled right behind Adeola Odeku. Walking distance to financial headquarters, diplomatic missions, and premier dining spots. Fitted with sound insulation, high-efficiency inverter ACs, open-plan Nordic kitchen, and secure underground car park.",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 9500000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Lagos",
      area: "Victoria Island",
      state: "Lagos",
      lat: 6.4281,
      lng: 3.4219,
      approximateAddress: "Off Adeola Odeku, Victoria Island, Lagos"
    },
    bedrooms: 2,
    bathrooms: 2,
    size: 145,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 2,
    amenities: [
      "24/7 Serviced Power",
      "Treated Water Treatment Plant",
      "Underground Parking",
      "CCTV & Biometric Access",
      "High-speed Fibre Ready",
      "Waste Disposal Management"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-103",
    landlord: {
      id: "landlord-103",
      name: "Mrs. Folashade Coker",
      phone: "+234 809 333 7788",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "August 2024",
      rating: 5.0,
      totalListings: 2,
      responseTime: "Usually replies in under 15 mins"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-02-12T11:00:00Z"
  },
  {
    id: "prop-004",
    title: "Contemporary 5-Bedroom Detached Mansion with Cinema",
    description: "Architectural masterpiece built across 800sqm in Maitama Diplomatic Zone. Features a private 8-seater cinema, temperature-controlled wine room, rooftop cocktail terrace, elevator, expansive lush lawns, and bulletproof security gatehouse.",
    transactionType: "sale",
    propertyType: "Detached House",
    price: 850000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Abuja",
      area: "Maitama",
      state: "FCT",
      lat: 9.0882,
      lng: 7.4985,
      approximateAddress: "Gana Street Precinct, Maitama, Abuja"
    },
    bedrooms: 5,
    bathrooms: 6,
    size: 720,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 6,
    amenities: [
      "Private Screening Room",
      "Solar Micro-grid System",
      "Elevator to All 3 Floors",
      "Perimeter Electric Fencing",
      "Large Swimming Pool & Jacuzzi",
      "Lush Landscaped Garden",
      "2-Room Boys Quarters"
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-104",
    landlord: {
      id: "landlord-104",
      name: "Abuja Elite Realty Consortium",
      phone: "+234 818 777 9900",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "February 2024",
      rating: 4.9,
      totalListings: 12,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-02-18T16:45:00Z"
  },
  {
    id: "prop-005",
    title: "Brand New 4-Bedroom Terrace in Gated Ikeja GRA Estate",
    description: "Superbly finished smart terrace duplex located inside a serene and secure cul-de-sac in Ikeja GRA. Close to Maryland Mall and Murtala Muhammed International Airport. Fitted kitchen, all rooms ensuite, and family lounge upstairs.",
    transactionType: "rent",
    propertyType: "Terrace",
    price: 13500000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Lagos",
      area: "Ikeja GRA",
      state: "Lagos",
      lat: 6.5921,
      lng: 3.3577,
      approximateAddress: "Isaac John Corridor, Ikeja GRA, Lagos"
    },
    bedrooms: 4,
    bathrooms: 4,
    size: 260,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 3,
    amenities: [
      "24/7 Gated Security",
      "Prepaid Power Metering",
      "Water Treatment Facility",
      "Balcony Sit-out",
      "Walk-in Closets",
      "Children Playground"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-105",
    landlord: {
      id: "landlord-105",
      name: "Alhaji Musa Danladi",
      phone: "+234 805 666 1122",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "December 2023",
      rating: 4.7,
      totalListings: 3,
      responseTime: "Usually replies in under 2 hours"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-02-24T08:20:00Z"
  },
  {
    id: "prop-006",
    title: "Modern Designer Studio Apartment with Ocean Breeze",
    description: "Compact luxury tailored for young professionals, tech founders, and remote workers. Located in oniru near Landmark Beach. Features high speed Wi-Fi infrastructure, fold-away workstation, premium kitchenette, and smart laundry service.",
    transactionType: "rent",
    propertyType: "Studio",
    price: 4200000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Lagos",
      area: "Victoria Island",
      state: "Lagos",
      lat: 6.4255,
      lng: 3.4412,
      approximateAddress: "Oniru Private Estate, Victoria Island, Lagos"
    },
    bedrooms: 1,
    bathrooms: 1,
    size: 55,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 1,
    amenities: [
      "24/7 Guaranteed Electricity",
      "Onsite Coffee Bar & Co-working",
      "Smart Keyless Entry",
      "Gym Access Included",
      "Rooftop Sun Deck"
    ],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-101",
    landlord: {
      id: "landlord-101",
      name: "Heritage Prime Properties Ltd",
      phone: "+234 803 111 2233",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "January 2024",
      rating: 4.9,
      totalListings: 8,
      responseTime: "Usually replies in under 30 mins"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-01T10:10:00Z"
  },
  {
    id: "prop-007",
    title: "Oceanfront 3-Bedroom Luxury Apartment in Eko Atlantic",
    description: "World-class architectural marvel towering over the Atlantic coastline in the Great Wall of Lagos development. Features floor-to-ceiling hurricane-resistant glazing, district cooling, smart home automation, and private yacht marina berth access.",
    transactionType: "sale",
    propertyType: "Apartment",
    price: 380000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Lagos",
      area: "Eko Atlantic",
      state: "Lagos",
      lat: 6.4172,
      lng: 3.4095,
      approximateAddress: "Avenue Boulevard, Eko Atlantic City, Lagos"
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 240,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 2,
    amenities: [
      "Independent Utility Grid",
      "Infinity Edge Ocean Pool",
      "Private Marina Access",
      "Concierge and Valet",
      "Advanced Fire Suppression",
      "Helipad Access"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-102",
    landlord: {
      id: "landlord-102",
      name: "Engr. Babatunde Adeyemi",
      phone: "+234 802 444 5566",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "November 2023",
      rating: 4.8,
      totalListings: 4,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-03-02T13:00:00Z"
  },
  {
    id: "prop-008",
    title: "Charming 4-Bedroom Semi-Detached Duplex in Jabi",
    description: "Quiet residential sanctuary in Jabi near the lake. Features mature gardens, rooftop recreational gazebo, spacious bedrooms all with fitted wardrobes, borehole system, and 24/7 security patrol.",
    transactionType: "rent",
    propertyType: "Duplex",
    price: 16000000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Abuja",
      area: "Jabi",
      state: "FCT",
      lat: 9.0683,
      lng: 7.4258,
      approximateAddress: "Jabi Lake District, Abuja"
    },
    bedrooms: 4,
    bathrooms: 4,
    size: 340,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 3,
    amenities: [
      "Estate Solar Street Lighting",
      "Dedicated Transformer",
      "Borehole Water Purification",
      "CCTV Monitoring",
      "Perimeter Electric Fence"
    ],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-104",
    landlord: {
      id: "landlord-104",
      name: "Abuja Elite Realty Consortium",
      phone: "+234 818 777 9900",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "February 2024",
      rating: 4.9,
      totalListings: 12,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-05T09:15:00Z"
  },
  {
    id: "prop-009",
    title: "Exquisite 4-Bedroom Duplex with River View in GRA Phase 2",
    description: "Commanding duplex overlooking the New Calabar River in the prestigious GRA Phase 2 of Port Harcourt. Features imported Italian tiles, central gas plumbing, 500KVA estate transformer, and lush manicured hedging. Landlord documentation fully verified.",
    transactionType: "sale",
    propertyType: "Duplex",
    price: 180000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Port Harcourt",
      area: "GRA Phase 2",
      state: "Rivers",
      lat: 4.8156,
      lng: 7.0498,
      approximateAddress: "Tombia Road Extension, GRA Phase 2, Port Harcourt"
    },
    bedrooms: 4,
    bathrooms: 5,
    size: 380,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 4,
    amenities: [
      "24/7 Estate Power Supply",
      "Borehole & Water Treatment",
      "CCTV Surveillance",
      "Gated Estate with Security",
      "Fitted Kitchen",
      "Boys Quarters"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-106",
    landlord: {
      id: "landlord-106",
      name: "Chief (Dr.) Tamuno Briggs",
      phone: "+234 803 222 3344",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "March 2024",
      rating: 4.8,
      totalListings: 5,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-03-08T10:00:00Z"
  },
  {
    id: "prop-010",
    title: "Spacious 3-Bedroom Flat in Serene Bodija Estate",
    description: "Well-finished 3-bedroom apartment in the heart of Bodija Estate, Ibadan. Minutes from the University of Ibadan and UCH. Features POP ceiling, quality fittings, prepaid meters, and 24/7 water supply. Perfect for professionals and academics.",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 2400000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Ibadan",
      area: "Bodija",
      state: "Oyo",
      lat: 7.4167,
      lng: 3.9167,
      approximateAddress: "Bodija Estate, Off Secretariat Road, Ibadan"
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 2,
    amenities: [
      "Prepaid Metering",
      "Borehole Water",
      "Tiled Compound",
      "POP Ceiling Throughout",
      "Wardrobes in All Rooms"
    ],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-107",
    landlord: {
      id: "landlord-107",
      name: "Dr. Adewale Adeyinka",
      phone: "+234 806 444 7788",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "April 2024",
      rating: 4.6,
      totalListings: 3,
      responseTime: "Usually replies in under 2 hours"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-10T08:30:00Z"
  },
  {
    id: "prop-011",
    title: "Luxury 5-Bedroom Detached House in Independence Layout",
    description: "Grand residence in the exclusive Independence Layout, Enugu. Features expansive compound, boys quarters, modern security gate house, backup solar system, and elegant interior finishes. Close to Polo Park Mall and Nike Lake Resort.",
    transactionType: "sale",
    propertyType: "Detached House",
    price: 120000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Enugu",
      area: "Independence Layout",
      state: "Enugu",
      lat: 6.4584,
      lng: 7.5464,
      approximateAddress: "Independence Layout Phase 2, Enugu"
    },
    bedrooms: 5,
    bathrooms: 5,
    size: 550,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 5,
    amenities: [
      "Solar Power System",
      "Borehole & Overhead Tank",
      "Gate House & Security",
      "Boys Quarters",
      "Spacious Compound",
      "Perimeter Fencing"
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-108",
    landlord: {
      id: "landlord-108",
      name: "Obi & Sons Properties",
      phone: "+234 807 888 1122",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "June 2024",
      rating: 4.7,
      totalListings: 6,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-03-12T11:30:00Z"
  },
  {
    id: "prop-012",
    title: "Modern 3-Bedroom Apartment in Nassarawa GRA, Kano",
    description: "Contemporary apartment in the well-planned Nassarawa GRA enclave of Kano. Tastefully finished with quality tiles, aluminum roofing, spacious living areas, and reliable power infrastructure. Great for business executives working in the Kano commercial hub.",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 3600000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Kano",
      area: "Nassarawa GRA",
      state: "Kano",
      lat: 12.0022,
      lng: 8.5167,
      approximateAddress: "Nassarawa GRA, Kano"
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 160,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 2,
    amenities: [
      "Estate Generator Backup",
      "Borehole Water Supply",
      "Gated Compound",
      "CCTV Surveillance",
      "Fitted Wardrobes"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-109",
    landlord: {
      id: "landlord-109",
      name: "Alhaji Garba Ibrahim",
      phone: "+234 808 999 3344",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "May 2024",
      rating: 4.5,
      totalListings: 4,
      responseTime: "Usually replies in under 3 hours"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-15T09:00:00Z"
  },
  {
    id: "prop-013",
    title: "Premium 4-Bedroom Duplex in Effurun GRA, Warri",
    description: "Beautifully crafted duplex in Effurun GRA, Delta State. Built with modern architectural designs, this property features quality finishes, a large family lounge, fitted kitchen, and well-manicured compound. Close to shopping malls and major oil company offices.",
    transactionType: "sale",
    propertyType: "Duplex",
    price: 95000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Warri",
      area: "Effurun",
      state: "Delta",
      lat: 5.5631,
      lng: 5.7899,
      approximateAddress: "Effurun GRA, Warri, Delta State"
    },
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 3,
    amenities: [
      "Generator House",
      "Borehole & Pump",
      "Security Gatehouse",
      "Interlocked Compound",
      "All Rooms Ensuite"
    ],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-110",
    landlord: {
      id: "landlord-110",
      name: "Oghenevwede & Partners Ltd",
      phone: "+234 813 555 6677",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "July 2024",
      rating: 4.6,
      totalListings: 3,
      responseTime: "Usually replies in under 2 hours"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-18T14:00:00Z"
  },
  {
    id: "prop-014",
    title: "New 3-Bedroom Terrace in Mowe-Ofada Corridor",
    description: "Affordable brand-new terrace duplex in a fast-developing residential estate along the Lagos-Ibadan Expressway corridor. Features modern fittings, treated water supply, estate perimeter fencing, and excellent road network. Ideal for first-time buyers and young families.",
    transactionType: "sale",
    propertyType: "Terrace",
    price: 42000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Mowe",
      area: "Mowe",
      state: "Ogun",
      lat: 6.8167,
      lng: 3.4333,
      approximateAddress: "Redemption Camp Axis, Mowe, Ogun State"
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    sizeUnit: "sqm",
    isFurnished: false,
    parkingSpaces: 2,
    amenities: [
      "Estate Road Network",
      "Perimeter Fencing",
      "Water Treatment Plant",
      "Recreational Area",
      "Prepaid Metering"
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-111",
    landlord: {
      id: "landlord-111",
      name: "Adisa Housing Development",
      phone: "+234 812 333 9900",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "August 2024",
      rating: 4.4,
      totalListings: 10,
      responseTime: "Usually replies in under 1 hour"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-20T07:45:00Z"
  },
  {
    id: "prop-015",
    title: "Elegant 4-Bedroom Mansion in GRA Benin City",
    description: "Stately mansion in the highly sought-after GRA Benin. Boasting colonial-era street charm with fully modern interiors, this property features imported marble floors, a grand staircase, study room, and expansive lawns. Title verified through Edo State Land Registry.",
    transactionType: "sale",
    propertyType: "Detached House",
    price: 145000000,
    currency: "NGN",
    rentPeriod: null,
    location: {
      city: "Benin City",
      area: "GRA Benin",
      state: "Edo",
      lat: 6.3350,
      lng: 5.6037,
      approximateAddress: "GRA, Benin City, Edo State"
    },
    bedrooms: 4,
    bathrooms: 5,
    size: 450,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 4,
    amenities: [
      "24/7 Power (Solar + Generator)",
      "Borehole & Water Treatment",
      "CCTV & Electric Fence",
      "Marble Flooring Throughout",
      "Domestic Staff Quarters",
      "Landscaped Gardens"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-112",
    landlord: {
      id: "landlord-112",
      name: "Ogbemudia Homes Ltd",
      phone: "+234 816 777 8899",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "September 2024",
      rating: 4.7,
      totalListings: 4,
      responseTime: "Usually replies in under 2 hours"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: false,
    createdAt: "2025-03-22T12:15:00Z"
  },
  {
    id: "prop-016",
    title: "Serviced 2-Bedroom Apartment in Calabar Waterfront",
    description: "Modern serviced apartment overlooking the Calabar River in the beautiful tourism capital of Cross River State. Walking distance to Tinapa Resort and the Marina. Features 24/7 electricity, fibre internet, and hotel-grade housekeeping service.",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 3000000,
    currency: "NGN",
    rentPeriod: "year",
    location: {
      city: "Calabar",
      area: "Calabar",
      state: "Cross River",
      lat: 4.9757,
      lng: 8.3417,
      approximateAddress: "Marina Resort Road, Calabar, Cross River State"
    },
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    sizeUnit: "sqm",
    isFurnished: true,
    parkingSpaces: 1,
    amenities: [
      "24/7 Electricity",
      "Fibre-Optic Internet",
      "Housekeeping Service",
      "Swimming Pool Access",
      "Gym & Fitness Centre",
      "Waterfront View"
    ],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    ownerId: "landlord-113",
    landlord: {
      id: "landlord-113",
      name: "Cross River Hospitality Realty",
      phone: "+234 811 222 4455",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      verificationDate: "October 2024",
      rating: 4.9,
      totalListings: 2,
      responseTime: "Usually replies in under 30 mins"
    },
    verificationStatus: "verified",
    listingStatus: "published",
    isFeatured: true,
    createdAt: "2025-03-25T15:00:00Z"
  }
];

export const POPULAR_LOCATIONS = [
  {
    city: "Lagos",
    area: "Ikoyi",
    state: "Lagos",
    tagline: "Prime diplomatic & waterfront sanctuaries",
    propertyCount: 42,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Lagos",
    area: "Lekki Phase 1",
    state: "Lagos",
    tagline: "Vibrant upscale residential & nightlife",
    propertyCount: 78,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Abuja",
    area: "Maitama",
    state: "FCT",
    tagline: "Prestige, embassies & manicured avenues",
    propertyCount: 39,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Port Harcourt",
    area: "GRA Phase 2",
    state: "Rivers",
    tagline: "Oil city luxury & riverfront living",
    propertyCount: 31,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Ibadan",
    area: "Bodija",
    state: "Oyo",
    tagline: "Academic belt & affordable premium homes",
    propertyCount: 24,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Enugu",
    area: "Independence Layout",
    state: "Enugu",
    tagline: "Coal city's most exclusive neighborhood",
    propertyCount: 18,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Benin City",
    area: "GRA Benin",
    state: "Edo",
    tagline: "Heritage meets modern luxury",
    propertyCount: 15,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Kano",
    area: "Nassarawa GRA",
    state: "Kano",
    tagline: "Northern Nigeria's premier commercial hub",
    propertyCount: 20,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
  },
  {
    city: "Calabar",
    area: "Calabar Waterfront",
    state: "Cross River",
    tagline: "Tourism capital & waterfront serenity",
    propertyCount: 12,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  }
];

export const AMENITIES_OPTIONS = [
  "24/7 Power",
  "Swimming Pool",
  "Fibre-Optic Internet",
  "Gated Security",
  "Smart Home Automation",
  "Fitted Kitchen",
  "CCTV Surveillance",
  "Gym & Wellness",
  "Water Treatment",
  "Elevator",
  "Borehole Water",
  "Solar Power",
  "Boys Quarters"
];
