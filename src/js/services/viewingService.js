/**
 * @file viewingService.js
 * @description Service for scheduling and tracking property viewings.
 */

const STORAGE_KEY = "stayfinder_viewing_requests";

const INITIAL_REQUESTS = [
  {
    id: "view-001",
    propertyId: "prop-001",
    propertyTitle: "Luxury 4-Bedroom Waterfront Villa with Private Pool",
    seekerId: "user-seeker-01",
    seekerName: "Chioma Okafor",
    seekerEmail: "chioma.seeker@stayfinder.ng",
    seekerPhone: "+234 802 345 6789",
    requestedDate: "2025-03-25",
    requestedTime: "11:00 AM",
    notes: "Interested in lease-to-own terms.",
    status: "confirmed",
    createdAt: "2025-03-10T10:00:00Z"
  },
  {
    id: "view-002",
    propertyId: "prop-002",
    propertyTitle: "Executive 3-Bedroom Penthouse with Panoramic Skyline View",
    seekerId: "user-seeker-01",
    seekerName: "Chioma Okafor",
    seekerEmail: "chioma.seeker@stayfinder.ng",
    seekerPhone: "+234 802 345 6789",
    requestedDate: "2025-03-28",
    requestedTime: "03:00 PM",
    notes: "Visiting with family architect.",
    status: "pending",
    createdAt: "2025-03-12T14:30:00Z"
  }
];

export function getStoredRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read viewing requests", e);
  }
  return INITIAL_REQUESTS;
}

function saveStoredRequests(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to write viewing requests", e);
  }
}

/**
 * Schedule a viewing
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function scheduleViewing(data) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const current = getStoredRequests();

  const newRequest = {
    ...data,
    id: `view-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const updated = [newRequest, ...current];
  saveStoredRequests(updated);
  return newRequest;
}

/**
 * Get all viewings for a user
 * @param {string} userId
 * @param {"seeker"|"landlord"} role
 * @returns {Promise<Array>}
 */
export async function getViewingRequests(userId, role = "seeker") {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const current = getStoredRequests();
  if (role === "seeker") {
    return current.filter((r) => r.seekerId === userId || !userId);
  }
  return current;
}
