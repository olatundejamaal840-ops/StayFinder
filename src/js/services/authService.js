/**
 * @file authService.js
 * @description Authentication service supporting Firebase Auth with a seamless
 * fallback for local role switching, offline testing, and demo accounts.
 */

import { ROLES, VERIFICATION_STATUS } from "../data/models.js";
import { auth, isFirebaseConfigured } from "../firebase/config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Predefined demo accounts for instant review across roles
export const DEMO_USERS = {
  seeker: {
    id: "user-seeker-01",
    name: "Chioma Okafor",
    email: "chioma.seeker@stayfinder.ng",
    phone: "+234 802 345 6789",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: ROLES.SEEKER,
    verificationStatus: VERIFICATION_STATUS.VERIFIED,
    state: "Lagos",
    createdAt: "2024-10-10T12:00:00Z"
  },
  landlord: {
    id: "landlord-101",
    name: "Heritage Prime Properties",
    email: "landlord@stayfinder.ng",
    phone: "+234 803 111 2233",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: ROLES.LANDLORD,
    verificationStatus: VERIFICATION_STATUS.VERIFIED,
    state: "FCT",
    createdAt: "2024-05-12T08:30:00Z"
  },
  admin: {
    id: "admin-master-01",
    name: "Lead Admin (devcohort77)",
    email: "devcohort77@gmail.com",
    phone: "+234 800 STAYFINDER",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    role: ROLES.ADMIN,
    verificationStatus: VERIFICATION_STATUS.VERIFIED,
    state: "FCT",
    createdAt: "2024-01-01T00:00:00Z"
  }
};

const STORAGE_KEY = "stayfinder_auth_user";
const REGISTERED_ACCOUNTS_KEY = "stayfinder_registered_accounts";

/**
 * Retrieve registered accounts from localStorage
 * @returns {Array<Object>}
 */
export function getRegisteredAccounts() {
  try {
    const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read accounts", e);
    return [];
  }
}

/**
 * Retrieve the currently stored user session
 * @returns {Object|null}
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read user from storage", e);
  }
  return null;
}

/**
 * Save user into storage
 * @param {Object} user
 */
export function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

/**
 * Log in with email and password, with Firebase Auth support & local fallback
 * @param {string} email
 * @param {string} password
 * @param {string} [targetRole] - "seeker" | "landlord" | "admin"
 * @returns {Promise<Object>}
 */
export async function login(email, password, targetRole = null) {
  const lower = (email || "").toLowerCase().trim();

  // 1. Try Firebase Authentication if configured and valid
  if (isFirebaseConfigured && auth && password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, lower, password);
      const fbUser = userCredential.user;
      const safeRole = targetRole || (lower.includes("admin") ? ROLES.ADMIN : lower.includes("landlord") ? ROLES.LANDLORD : ROLES.SEEKER);

      const loggedInUser = {
        id: fbUser.uid,
        name: fbUser.displayName || email.split("@")[0].replace(/[._]/g, " "),
        email: fbUser.email,
        role: safeRole,
        phone: fbUser.phoneNumber || "+234 800 000 0000",
        verificationStatus: safeRole === ROLES.LANDLORD ? VERIFICATION_STATUS.PENDING : VERIFICATION_STATUS.VERIFIED,
        avatar: fbUser.photoURL || DEMO_USERS[safeRole]?.avatar || DEMO_USERS.seeker.avatar,
        createdAt: fbUser.metadata?.creationTime || new Date().toISOString()
      };

      setCurrentUser(loggedInUser);
      return loggedInUser;
    } catch (fbError) {
      console.warn("[StayFinder Auth] Firebase sign-in notice:", fbError.code, fbError.message);
      // If error is invalid password on an existing Firebase user, let it surface if wanted,
      // otherwise fall through to check registered accounts and demo fallback.
    }
  }

  // 2. Check local registered accounts
  const registered = getRegisteredAccounts();
  const existing = registered.find((acc) => acc.email.toLowerCase() === lower);

  if (existing) {
    // Enforce that Seeker and Landlord cannot use wrong login role tabs
    if (targetRole && existing.role !== targetRole) {
      const roleLabel = existing.role === ROLES.LANDLORD ? "Landlord" : "Property Seeker";
      const targetLabel = targetRole === ROLES.LANDLORD ? "Landlord" : "Property Seeker";
      throw new Error(`This account (${lower}) is registered as a ${roleLabel}, not a ${targetLabel}. Please switch to the ${roleLabel} tab to sign in.`);
    }

    if (existing.password && password && existing.password !== password) {
      throw new Error("Incorrect password for this account. Please verify credentials.");
    }

    setCurrentUser(existing);
    return existing;
  }

  // 3. Admin Master account
  if (lower === "devcohort77@gmail.com" || lower === DEMO_USERS.admin.email.toLowerCase()) {
    setCurrentUser(DEMO_USERS.admin);
    return DEMO_USERS.admin;
  }

  // 4. Match demo credentials only if exact demo email is provided
  if (lower === DEMO_USERS.landlord.email.toLowerCase() && targetRole === ROLES.LANDLORD) {
    setCurrentUser(DEMO_USERS.landlord);
    return DEMO_USERS.landlord;
  }
  if (lower === DEMO_USERS.seeker.email.toLowerCase() && targetRole === ROLES.SEEKER) {
    setCurrentUser(DEMO_USERS.seeker);
    return DEMO_USERS.seeker;
  }

  // Not found in registered accounts
  throw new Error(`No account found for "${lower}". Please click "CREATE ONE" below to create your account first.`);
}

/**
 * Register a new user in Firebase Auth and local storage
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.role
 * @param {string} [data.phone]
 * @param {string} [data.state]
 * @returns {Promise<Object>}
 */
export async function signup({ name, email, password, role, phone = "", state = "Lagos" }) {
  const lowerEmail = (email || "").toLowerCase().trim();
  const safeRole = role === ROLES.LANDLORD ? ROLES.LANDLORD : ROLES.SEEKER;
  let uid = `user-${Date.now()}`;

  // Master Admin auto-provision
  if (lowerEmail === "devcohort77@gmail.com") {
    setCurrentUser(DEMO_USERS.admin);
    return DEMO_USERS.admin;
  }

  // Check if account already exists
  const registered = getRegisteredAccounts();
  const existing = registered.find((acc) => acc.email.toLowerCase() === lowerEmail);
  if (existing) {
    throw new Error(`An account with "${lowerEmail}" already exists. Please sign in instead.`);
  }

  // 1. Try Firebase Authentication user creation
  if (isFirebaseConfigured && auth && password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, lowerEmail, password);
      const fbUser = userCredential.user;
      uid = fbUser.uid;

      if (name.trim()) {
        await updateProfile(fbUser, { displayName: name.trim() });
      }
      console.info("[StayFinder Auth] Registered in Firebase Auth with UID:", uid);
    } catch (fbError) {
      console.warn("[StayFinder Auth] Firebase registration notice:", fbError.code, fbError.message);
    }
  }

  // 2. Prepare user profile
  const newUser = {
    id: uid,
    name: name.trim(),
    email: lowerEmail,
    password: password,
    phone: phone.trim() || "+234 800 000 0000",
    state: state || "Lagos",
    role: safeRole,
    verificationStatus: safeRole === ROLES.LANDLORD ? VERIFICATION_STATUS.PENDING : VERIFICATION_STATUS.VERIFIED,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify([...registered, newUser]));
  setCurrentUser(newUser);
  return newUser;
}

/**
 * Log out current user (Firebase + Local)
 * @returns {Promise<void>}
 */
export async function logout() {
  if (auth && auth.currentUser) {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn("[StayFinder Auth] Firebase sign out notice:", e.message);
    }
  }
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Switch role for testing/demonstration purposes
 * @param {"seeker" | "landlord" | "admin"} role
 * @returns {Object}
 */
export function switchRole(role) {
  const user = DEMO_USERS[role] || DEMO_USERS.seeker;
  setCurrentUser(user);
  return user;
}

/**
 * Sign in with Google (Requires seeker/landlord email address)
 * @param {"seeker" | "landlord"} targetRole
 * @param {string} customEmail
 * @returns {Promise<Object>}
 */
export async function loginWithGoogle(targetRole = "seeker", customEmail = "") {
  const safeRole = targetRole === "landlord" ? ROLES.LANDLORD : ROLES.SEEKER;
  const preferredEmail = (customEmail || "").toLowerCase().trim();

  if (!preferredEmail && (!isFirebaseConfigured || !auth)) {
    throw new Error("Please enter your email address in the field below before signing in with Google.");
  }

  // 1. Try Firebase Authentication with GoogleAuthProvider
  if (isFirebaseConfigured && auth) {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const loggedInUser = {
        id: fbUser.uid,
        name: fbUser.displayName || (safeRole === "landlord" ? "Verified Landlord" : "Verified Seeker"),
        email: preferredEmail || fbUser.email,
        role: safeRole,
        phone: fbUser.phoneNumber || "+234 800 000 0000",
        verificationStatus: safeRole === ROLES.LANDLORD ? VERIFICATION_STATUS.PENDING : VERIFICATION_STATUS.VERIFIED,
        avatar: fbUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        createdAt: fbUser.metadata?.creationTime || new Date().toISOString()
      };

      setCurrentUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } catch (fbError) {
      console.warn("[StayFinder Auth] Firebase Google sign-in notice:", fbError.code, fbError.message);
      if (fbError.code === "auth/popup-closed-by-user") {
        return { success: false, error: "Google sign-in popup was closed before completing." };
      }
    }
  }

  // Admin login via Google
  if (preferredEmail === "devcohort77@gmail.com" || preferredEmail === DEMO_USERS.admin.email.toLowerCase()) {
    setCurrentUser(DEMO_USERS.admin);
    return { success: true, user: DEMO_USERS.admin };
  }

  // 2. Local Google sign-in using the user's entered email
  await new Promise((resolve) => setTimeout(resolve, 350));
  const registered = getRegisteredAccounts();
  const existing = registered.find((acc) => acc.email.toLowerCase() === preferredEmail);

  if (existing) {
    if (existing.role !== safeRole) {
      const roleLabel = existing.role === ROLES.LANDLORD ? "Landlord" : "Property Seeker";
      const targetLabel = safeRole === ROLES.LANDLORD ? "Landlord" : "Property Seeker";
      throw new Error(`This email is registered as a ${roleLabel}. Please switch to the ${roleLabel} tab to sign in.`);
    }
    setCurrentUser(existing);
    return { success: true, user: existing };
  }

  // Register new account with entered email
  const extractedName = preferredEmail.split("@")[0].replace(/[._]/g, " ");
  const newGoogleUser = {
    id: `google-${Date.now()}`,
    name: extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
    email: preferredEmail,
    role: safeRole,
    phone: "+234 800 000 0000",
    verificationStatus: safeRole === ROLES.LANDLORD ? VERIFICATION_STATUS.PENDING : VERIFICATION_STATUS.VERIFIED,
    avatar: safeRole === "landlord"
      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify([...registered, newGoogleUser]));
  setCurrentUser(newGoogleUser);
  return { success: true, user: newGoogleUser };
}

/**
 * Helper to fetch all registered users for Admin monitoring
 * @returns {Array<Object>}
 */
export function getRegisteredUsersList() {
  const registered = getRegisteredAccounts();
  const list = [...registered];
  if (!list.find((u) => u.email === DEMO_USERS.seeker.email)) {
    list.push(DEMO_USERS.seeker);
  }
  if (!list.find((u) => u.email === DEMO_USERS.landlord.email)) {
    list.push(DEMO_USERS.landlord);
  }
  return list;
}
