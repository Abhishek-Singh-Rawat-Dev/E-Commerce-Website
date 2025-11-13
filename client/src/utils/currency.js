// Currency conversion rates (base: USD)
const exchangeRates = {
  USD: 1.00,
  INR: 83.12,
  GBP: 0.79,
  EUR: 0.92,
  AUD: 1.52,
  CAD: 1.36,
  JPY: 149.50,
  CNY: 7.24
};

// Currency symbols
const currencySymbols = {
  USD: '$',
  INR: '₹',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
  CNY: '¥'
};

/**
 * Convert price from USD to target currency
 * @param {number} priceInUSD - Price in USD
 * @param {string} currency - Target currency code (INR, USD, GBP, etc.)
 * @returns {number} - Converted price
 */
export const convertPrice = (priceInUSD, currency = 'USD') => {
  const rate = exchangeRates[currency] || 1;
  return priceInUSD * rate;
};

/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  const symbol = currencySymbols[currency] || '$';
  const formattedPrice = price.toFixed(2);
  
  // For INR and JPY, show whole numbers (no decimals)
  if (currency === 'INR' || currency === 'JPY') {
    return `${symbol}${Math.round(price).toLocaleString()}`;
  }
  
  return `${symbol}${parseFloat(formattedPrice).toLocaleString()}`;
};

/**
 * Convert and format price in one go
 * @param {number} priceInUSD - Price in USD
 * @param {string} currency - Target currency code
 * @returns {string} - Formatted price string in target currency
 */
export const convertAndFormat = (priceInUSD, currency = 'USD') => {
  const converted = convertPrice(priceInUSD, currency);
  return formatPrice(converted, currency);
};

/**
 * Get currency symbol for a given currency code
 * @param {string} currency - Currency code
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currency = 'USD') => {
  return currencySymbols[currency] || '$';
};

/**
 * Map country name to currency code
 * @param {string} country - Country name
 * @returns {string} - Currency code
 */
export const getCurrencyFromCountry = (country) => {
  const countryToCurrency = {
    'India': 'INR',
    'United States': 'USD',
    'United Kingdom': 'GBP',
    'European Union': 'EUR',
    'Australia': 'AUD',
    'Canada': 'CAD',
    'Japan': 'JPY',
    'China': 'CNY',
    // Add more countries as needed
    'USA': 'USD',
    'UK': 'GBP',
    'US': 'USD',
  };
  
  return countryToCurrency[country] || 'USD';
};

export default {
  convertPrice,
  formatPrice,
  convertAndFormat,
  getCurrencySymbol,
  getCurrencyFromCountry
};

