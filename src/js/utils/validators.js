/**
 * @file validators.js
 * @description Pure validation functions for forms across StayFinder.
 */

/**
 * Validate an email address
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return "Email address is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

/**
 * Validate password requirements
 * @param {string} password
 * @param {number} [minLength=6]
 * @returns {string|null}
 */
export function validatePassword(password, minLength = 6) {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }
  return null;
}

/**
 * Validate phone number
 * @param {string} phone
 * @returns {string|null}
 */
export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return "Phone number is required.";
  }
  const clean = phone.replace(/[\s()-]/g, "");
  if (clean.length < 9) {
    return "Please enter a valid contact phone number.";
  }
  return null;
}

/**
 * Validate required text field
 * @param {string} value
 * @param {string} fieldName
 * @returns {string|null}
 */
export function validateRequired(value, fieldName = "Field") {
  if (value === undefined || value === null || String(value).trim() === "") {
    return `${fieldName} is required.`;
  }
  return null;
}

/**
 * Validate numeric positive amount
 * @param {number|string} value
 * @param {string} fieldName
 * @returns {string|null}
 */
export function validatePositiveNumber(value, fieldName = "Price") {
  if (value === undefined || value === null || value === "") {
    return `${fieldName} is required.`;
  }
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return `${fieldName} must be a positive number.`;
  }
  return null;
}
