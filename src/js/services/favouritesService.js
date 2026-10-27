/**
 * @file favouritesService.js
 * @description Service for managing saved/favourited properties.
 * Persists saved property IDs in localStorage with user scope.
 */

const STORAGE_PREFIX = "stayfinder_favourites_";

/**
 * Get storage key for a user (or guest fallback)
 * @param {string} [userId]
 * @returns {string}
 */
function getStorageKey(userId = "guest") {
  return `${STORAGE_PREFIX}${userId || "guest"}`;
}

/**
 * Retrieve saved property IDs for a user
 * @param {string} [userId]
 * @returns {string[]}
 */
export function getSavedPropertyIds(userId = "guest") {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read favourites", e);
  }
  // Default sample favourites for immediate visual richness
  return ["prop-001", "prop-003"];
}

/**
 * Check if a property is saved
 * @param {string} propertyId
 * @param {string} [userId]
 * @returns {boolean}
 */
export function isPropertySaved(propertyId, userId = "guest") {
  const ids = getSavedPropertyIds(userId);
  return ids.includes(propertyId);
}

/**
 * Toggle favourite status
 * @param {string} propertyId
 * @param {string} [userId]
 * @returns {boolean} New saved state
 */
export function toggleSavedProperty(propertyId, userId = "guest") {
  const current = getSavedPropertyIds(userId);
  let updated;
  let isSavedNow;

  if (current.includes(propertyId)) {
    updated = current.filter((id) => id !== propertyId);
    isSavedNow = false;
  } else {
    updated = [...current, propertyId];
    isSavedNow = true;
  }

  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to persist favourite", e);
  }

  return isSavedNow;
}
