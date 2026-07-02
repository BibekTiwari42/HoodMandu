import { CURRENCY } from './constants';

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = CURRENCY.code) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${CURRENCY.symbol} 0`;
  }

  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number as compact currency (e.g., $1.2K)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted compact currency string
 */
export const formatCompactCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${CURRENCY.symbol} 0`;
  }

  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: CURRENCY.code,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(amount);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Format price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max) => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

export default formatCurrency;