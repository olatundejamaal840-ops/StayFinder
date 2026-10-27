/**
 * @file formatters.js
 * @description Currency, dates, numbers, and text formatters for StayFinder.
 */

/**
 * Format a number into currency representation.
 * @param {number} amount - The numeric price
 * @param {string} [currency='NGN'] - Currency code
 * @param {string} [rentPeriod=null] - Optional period ('year', 'month', etc.)
 * @returns {string} Formatted string, e.g. "₦15,000,000 / yr"
 */
export function formatCurrency(amount, currency = "NGN", rentPeriod = null) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "Contact for Price";
  }

  const num = Number(amount);
  let symbol = "₦";
  if (currency === "USD") symbol = "$";
  if (currency === "GBP") symbol = "£";
  if (currency === "EUR") symbol = "€";

  const formattedNum = num.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

  let result = `${symbol}${formattedNum}`;

  if (rentPeriod) {
    if (rentPeriod === "year" || rentPeriod === "yr") {
      result += " / yr";
    } else if (rentPeriod === "month" || rentPeriod === "mo") {
      result += " / mo";
    } else {
      result += ` / ${rentPeriod}`;
    }
  }

  return result;
}

/**
 * Compact number formatting (e.g. 15M, 850K)
 * @param {number} num
 * @returns {string}
 */
export function formatCompactNumber(num) {
  if (!num || isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

/**
 * Formats an ISO date into human readable string.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats size with units
 * @param {number} size
 * @param {string} [unit='sqm']
 * @returns {string}
 */
export function formatArea(size, unit = "sqm") {
  if (!size) return "--";
  return `${size.toLocaleString()} ${unit}`;
}

/**
 * Truncate long text safely
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
