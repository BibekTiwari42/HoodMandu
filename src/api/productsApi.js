import { PRODUCTS } from '../utils/constants';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all products with optional filters
 */
export const fetchProducts = async (filters = {}) => {
  await delay(500); // Simulate network delay
  
  let filteredProducts = [...PRODUCTS];
  
  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(
      product => product.category === filters.category
    );
  }
  
  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filteredProducts = filteredProducts.filter(
      product => product.price >= min && product.price <= max
    );
  }
  
  // Filter by sizes
  if (filters.sizes && filters.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => filters.sizes.some(size => product.sizes.includes(size))
    );
  }
  
  // Filter by colors
  if (filters.colors && filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => filters.colors.some(color => product.colors.includes(color))
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }
  
  return filteredProducts;
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id) => {
  await delay(300);
  
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

/**
 * Fetch featured products
 */
export const fetchFeaturedProducts = async (limit = 4) => {
  await delay(400);
  
  return PRODUCTS
    .filter(product => product.featured)
    .slice(0, limit);
};

/**
 * Fetch new arrivals
 */
export const fetchNewArrivals = async (limit = 4) => {
  await delay(400);
  
  return PRODUCTS
    .filter(product => product.isNew)
    .slice(0, limit);
};

/**
 * Fetch related products
 */
export const fetchRelatedProducts = async (productId, limit = 4) => {
  await delay(300);
  
  const currentProduct = PRODUCTS.find(p => p.id === parseInt(productId));
  
  if (!currentProduct) {
    return [];
  }
  
  return PRODUCTS
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, limit);
};

/**
 * Search products
 */
export const searchProducts = async (query) => {
  await delay(300);
  
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return PRODUCTS.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};