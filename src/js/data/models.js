/**
 * @file models.js
 * @description StayFinder data models and shape definitions using JSDoc.
 * This is a JavaScript-only codebase with explicit data schemas.
 */

/**
 * @typedef {"seeker" | "landlord" | "admin"} UserRole
 */

/**
 * @typedef {"pending" | "verified" | "rejected" | "unverified"} VerificationStatus
 */

/**
 * @typedef {"rent" | "sale"} TransactionType
 */

/**
 * @typedef {"Apartment" | "Duplex" | "Terrace" | "Penthouse" | "Detached House" | "Mansion" | "Studio"} PropertyType
 */

/**
 * @typedef {"draft" | "pending_verification" | "published" | "under_offer" | "leased" | "sold"} ListingStatus
 */

/**
 * @typedef {"pending" | "confirmed" | "completed" | "cancelled" | "rejected"} ViewingStatus
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - Full display name
 * @property {string} email - Email address
 * @property {string} [phone] - Contact phone number
 * @property {string} [avatar] - Profile photo URL
 * @property {UserRole} role - User role
 * @property {VerificationStatus} verificationStatus - Landlord KYC status
 * @property {string} createdAt - ISO timestamp string
 */

/**
 * @typedef {Object} LocationInfo
 * @property {string} city - E.g. "Lagos", "Abuja"
 * @property {string} area - E.g. "Ikoyi", "Lekki Phase 1", "Maitama"
 * @property {string} state - E.g. "Lagos State", "FCT"
 * @property {number} [lat] - Approximate latitude (never exact private coordinates)
 * @property {number} [lng] - Approximate longitude
 * @property {string} [approximateAddress] - General street or landmark
 */

/**
 * @typedef {Object} LandlordProfile
 * @property {string} id - Landlord ID
 * @property {string} name - Landlord or agency name
 * @property {string} [avatar] - Profile photo
 * @property {string} [phone] - Contact number
 * @property {boolean} isVerified - Whether verified by StayFinder admins
 * @property {string} verificationDate - E.g. "March 2024"
 * @property {number} rating - Average review rating (e.g. 4.9)
 * @property {number} totalListings - Number of active properties
 * @property {string} responseTime - E.g. "Usually replies within 1 hour"
 */

/**
 * @typedef {Object} Property
 * @property {string} id - Unique listing ID
 * @property {string} title - Descriptive title
 * @property {string} description - Detailed overview
 * @property {TransactionType} transactionType - "rent" or "sale"
 * @property {PropertyType} propertyType - Type of building
 * @property {number} price - Amount in specified currency
 * @property {string} currency - Explicit currency code (e.g. "NGN", "USD")
 * @property {"year" | "month" | "total"} [rentPeriod] - Billing period for rentals
 * @property {LocationInfo} location - City and general neighborhood
 * @property {number} bedrooms - Number of bedrooms
 * @property {number} bathrooms - Number of bathrooms
 * @property {number} size - Square meters or square feet
 * @property {string} sizeUnit - "sqm" or "sqft"
 * @property {boolean} isFurnished - Furnished status
 * @property {number} parkingSpaces - Number of dedicated car spots
 * @property {string[]} amenities - List of amenities (e.g. "24/7 Power", "Security")
 * @property {string[]} images - Array of high resolution image URLs
 * @property {string} [videoUrl] - Optional property tour video link
 * @property {string} ownerId - Landlord ID
 * @property {LandlordProfile} landlord - Landlord summary info
 * @property {VerificationStatus} verificationStatus - "verified" | "pending" | "unverified"
 * @property {ListingStatus} listingStatus - Current marketplace state
 * @property {boolean} isFeatured - Highlighted on homepage
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} ViewingRequest
 * @property {string} id - Request ID
 * @property {string} propertyId - Property referenced
 * @property {string} propertyTitle - Property title for quick display
 * @property {string} seekerId - Seeker requesting viewing
 * @property {string} seekerName - Seeker name
 * @property {string} seekerEmail - Seeker email
 * @property {string} seekerPhone - Seeker phone
 * @property {string} requestedDate - Selected viewing date
 * @property {string} requestedTime - Selected time slot
 * @property {string} [notes] - Additional requirements
 * @property {ViewingStatus} status - Viewing status
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} RentalApplication
 * @property {string} id - Application ID
 * @property {string} propertyId - Property applied for
 * @property {string} applicantId - Seeker applicant ID
 * @property {string} applicantName - Applicant name
 * @property {string} employmentStatus - E.g. "Employed", "Self-employed"
 * @property {number} annualIncome - Annual income estimate
 * @property {string} moveInDate - Desired move-in date
 * @property {"pending" | "approved" | "rejected"} status - Application status
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} Offer
 * @property {string} id - Offer ID
 * @property {string} propertyId - Property applied for
 * @property {string} buyerId - Buyer user ID
 * @property {string} buyerName - Buyer full name
 * @property {number} amount - Offer price
 * @property {string} currency - Currency code
 * @property {"pending" | "accepted" | "countered" | "declined"} status - Offer state
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {Object} ListingReport
 * @property {string} id - Report ID
 * @property {string} propertyId - Property reported
 * @property {string} reporterId - User ID who filed report
 * @property {string} reason - Reason for fraud or discrepancy report
 * @property {string} details - Additional comments
 * @property {"open" | "investigating" | "resolved" | "dismissed"} status - Review status
 * @property {string} createdAt - ISO timestamp
 */

export const ROLES = {
  SEEKER: "seeker",
  LANDLORD: "landlord",
  ADMIN: "admin"
};

export const VERIFICATION_STATUS = {
  VERIFIED: "verified",
  PENDING: "pending",
  REJECTED: "rejected",
  UNVERIFIED: "unverified"
};

export const TRANSACTION_TYPES = {
  RENT: "rent",
  SALE: "sale"
};
