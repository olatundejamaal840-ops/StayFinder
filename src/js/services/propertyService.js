/**
 * @file propertyService.js
 * @description Property Service for StayFinder supporting Firebase Firestore
 * with robust local caching and offline fallback for Nigerian real estate listings.
 */

import { DEMO_PROPERTIES } from "../data/demoProperties.js";
import { db, isFirebaseConfigured } from "../firebase/config.js";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";

const STORAGE_KEY = "stayfinder_properties_store";

/**
 * Get all current properties from storage or initialize with demo dataset
 * @returns {Array<Object>}
 */
export function getStoredProperties() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to read properties from localStorage", e);
  }
  // Initialize with rich Nigerian demo properties
  saveStoredProperties(DEMO_PROPERTIES);
  return DEMO_PROPERTIES;
}

/**
 * Save updated property list to localStorage
 * @param {Array<Object>} list
 */
function saveStoredProperties(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save properties to localStorage", e);
  }
}

/**
 * Fetch all properties with optional filtering and sorting
 * @param {Object} [options]
 * @param {string} [options.transactionType] - "rent" | "sale"
 * @param {string} [options.state] - Nigerian state (e.g. "Lagos", "FCT", "Rivers")
 * @param {string} [options.city]
 * @param {string} [options.area]
 * @param {string} [options.propertyType]
 * @param {number} [options.minPrice]
 * @param {number} [options.maxPrice]
 * @param {number} [options.bedrooms]
 * @param {string[]} [options.amenities]
 * @param {string} [options.searchQuery]
 * @param {string} [options.sortBy] - "newest" | "price_asc" | "price_desc" | "verified"
 * @returns {Promise<Array>}
 */
export async function getProperties(options = {}) {
  let results = getStoredProperties();

  // If Firebase Firestore is configured, attempt background sync
  if (isFirebaseConfigured && db) {
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      if (!querySnapshot.empty) {
        const firestoreListings = [];
        querySnapshot.forEach((docSnap) => {
          firestoreListings.push({ ...docSnap.data(), id: docSnap.id });
        });
        if (firestoreListings.length > 0) {
          // Merge with stored properties, prioritizing Firestore
          const idMap = new Map();
          firestoreListings.forEach((p) => idMap.set(p.id, p));
          results.forEach((p) => {
            if (!idMap.has(p.id)) idMap.set(p.id, p);
          });
          results = Array.from(idMap.values());
          saveStoredProperties(results);
        }
      }
    } catch (fbErr) {
      console.warn("[StayFinder Firestore] Sync notice:", fbErr.message);
    }
  }

  // Transaction type filter
  if (options.transactionType && options.transactionType !== "all") {
    results = results.filter(
      (p) => p.transactionType.toLowerCase() === options.transactionType.toLowerCase()
    );
  }

  // Location / Search query filter across title, state, city, area, and description
  if (options.searchQuery && options.searchQuery.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.location.city && p.location.city.toLowerCase().includes(q)) ||
        (p.location.area && p.location.area.toLowerCase().includes(q)) ||
        (p.location.state && p.location.state.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // State filter
  if (options.state && options.state !== "all") {
    const stateQuery = options.state.toLowerCase().trim();
    results = results.filter((p) => {
      const pState = (p.location.state || "").toLowerCase();
      const pCity = (p.location.city || "").toLowerCase();
      return (
        pState === stateQuery ||
        pState.includes(stateQuery) ||
        pCity === stateQuery ||
        (stateQuery === "fct" && pCity === "abuja") ||
        (stateQuery === "abuja" && pState === "fct")
      );
    });
  }

  // City filter (matches city or state for flexibility)
  if (options.city && options.city !== "all") {
    const cityQuery = options.city.toLowerCase().trim();
    results = results.filter((p) => {
      const pCity = (p.location.city || "").toLowerCase();
      const pState = (p.location.state || "").toLowerCase();
      return (
        pCity === cityQuery ||
        pCity.includes(cityQuery) ||
        pState === cityQuery ||
        pState.includes(cityQuery)
      );
    });
  }

  // Area filter
  if (options.area && options.area !== "all") {
    const areaQuery = options.area.toLowerCase().trim();
    results = results.filter(
      (p) => p.location.area && p.location.area.toLowerCase().includes(areaQuery)
    );
  }

  // Property type filter
  if (options.propertyType && options.propertyType !== "all") {
    results = results.filter(
      (p) => p.propertyType.toLowerCase() === options.propertyType.toLowerCase()
    );
  }

  // Price range filters
  if (options.minPrice) {
    const min = Number(options.minPrice);
    if (!isNaN(min)) {
      results = results.filter((p) => p.price >= min);
    }
  }

  if (options.maxPrice) {
    const max = Number(options.maxPrice);
    if (!isNaN(max)) {
      results = results.filter((p) => p.price <= max);
    }
  }

  // Bedrooms filter
  if (options.bedrooms && options.bedrooms !== "any") {
    const beds = Number(options.bedrooms);
    if (!isNaN(beds)) {
      results = results.filter((p) => p.bedrooms >= beds);
    }
  }

  // Amenities filter (must have all selected)
  if (options.amenities && options.amenities.length > 0) {
    results = results.filter((p) =>
      options.amenities.every((amenity) =>
        p.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      )
    );
  }

  // Sorting
  if (options.sortBy) {
    if (options.sortBy === "price_asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (options.sortBy === "price_desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (options.sortBy === "verified") {
      results.sort((a, b) => {
        if (a.verificationStatus === "verified" && b.verificationStatus !== "verified") return -1;
        if (b.verificationStatus === "verified" && a.verificationStatus !== "verified") return 1;
        return 0;
      });
    } else {
      // Default: "newest"
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  return results;
}

/**
 * Fetch a single property by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getPropertyById(id) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const properties = getStoredProperties();
  const found = properties.find((p) => p.id === id);
  return found || null;
}

/**
 * Fetch featured properties for homepage showcase
 * @returns {Promise<Array>}
 */
export async function getFeaturedProperties() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const properties = getStoredProperties();
  const featured = properties.filter((p) => p.isFeatured);
  return featured.length > 0 ? featured : properties.slice(0, 6);
}

/**
 * Fetch properties created by a specific landlord
 * @param {string} ownerId
 * @returns {Promise<Array>}
 */
export async function getPropertiesByOwner(ownerId) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const properties = getStoredProperties();
  return properties.filter((p) => p.ownerId === ownerId);
}

/**
 * Add a new property listing (Firestore + Local fallback)
 * @param {Object} propertyData
 * @returns {Promise<Object>}
 */
export async function addProperty(propertyData) {
  const propertyId = `prop-${Date.now()}`;

  const newProperty = {
    ...propertyData,
    id: propertyId,
    createdAt: new Date().toISOString(),
    // Trust rule: New listings enter pending verification for admin review
    verificationStatus: "pending",
    listingStatus: "pending_verification",
    isFeatured: false,
    currency: "NGN",
    images: propertyData.images && propertyData.images.length > 0
      ? propertyData.images
      : [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
        ],
    amenities: propertyData.amenities || [
      "24/7 Solar & Grid Power",
      "Access-Controlled Estate",
      "Treated Water Supply"
    ],
    landlord: propertyData.landlord || {
      id: propertyData.ownerId || "landlord-101",
      name: propertyData.landlordName || "Heritage Prime Properties",
      phone: "+234 803 111 2233",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isVerified: true,
      rating: 4.9,
      totalListings: 5,
      responseTime: "Usually replies in under 30 mins"
    }
  };

  // 1. Save to Cloud Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "properties", propertyId), newProperty);
      console.info("[StayFinder Firestore] Created property doc in Cloud Firestore:", propertyId);
    } catch (fbErr) {
      console.warn("[StayFinder Firestore] Failed to write doc to Firestore:", fbErr.message);
    }
  }

  // 2. Save to local storage cache
  const properties = getStoredProperties();
  const updated = [newProperty, ...properties];
  saveStoredProperties(updated);
  return newProperty;
}

/**
 * Update verification status of a property (Admin moderation in Firestore & Local)
 * @param {string} propertyId
 * @param {"verified" | "rejected" | "pending"} status
 * @returns {Promise<Object>}
 */
export async function updatePropertyVerification(propertyId, status) {
  const newListingStatus = status === "verified" ? "published" : status === "rejected" ? "draft" : "pending_verification";

  // 1. Update in Cloud Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "properties", propertyId), {
        verificationStatus: status,
        listingStatus: newListingStatus
      });
      console.info("[StayFinder Firestore] Updated verification status in Firestore:", propertyId, status);
    } catch (fbErr) {
      console.warn("[StayFinder Firestore] Failed to update doc in Firestore:", fbErr.message);
    }
  }

  // 2. Update local storage cache
  const properties = getStoredProperties();
  const updated = properties.map((p) => {
    if (p.id === propertyId) {
      return {
        ...p,
        verificationStatus: status,
        listingStatus: newListingStatus,
      };
    }
    return p;
  });

  saveStoredProperties(updated);
  return updated.find((p) => p.id === propertyId);
}
