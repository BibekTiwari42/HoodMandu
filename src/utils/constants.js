import { Instagram, Facebook, Twitter } from '@mui/icons-material';

// API Configuration
export const API_BASE_URL = 'https://api.hoodmandu.com';

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Currency
export const CURRENCY = {
  code: 'NPR',
  symbol: 'Rs.',
  locale: 'ne-NP',
};

// Contact Information
export const CONTACT_INFO = {
  email: {
    general: 'hello@hoodmandu.com',
    support: 'support@hoodmandu.com',
  },
  phone: {
    main: '+977 1-4XXXXXX',
    whatsapp: '+977 98XXXXXXXX',
  },
  address: {
    street: 'Thamel Marg',
    city: 'Kathmandu',
    country: 'Nepal',
  },
  hours: {
    weekdays: 'Mon - Fri: 10AM - 8PM',
    weekend: 'Sat - Sun: 11AM - 6PM',
  },
};

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com/hoodmandu', icon: Instagram },
  { name: 'Facebook', url: 'https://facebook.com/hoodmandu', icon: Facebook },
  { name: 'Twitter', url: 'https://twitter.com/hoodmandu', icon: Twitter },
];

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Product Categories
export const CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'hoodies', name: 'Hoodies', slug: 'hoodies' },
  { id: 'tshirts', name: 'T-Shirts', slug: 'tshirts' },
  { id: 'jackets', name: 'Jackets', slug: 'jackets' },
  { id: 'pants', name: 'Pants', slug: 'pants' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
];

// Available Sizes
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Available Colors
export const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#808080' },
  { name: 'Navy', value: '#1A1A4E' },
  { name: 'Electric Blue', value: '#0066FF' },
  { name: 'Red', value: '#E63946' },
  { name: 'Olive', value: '#556B2F' },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

// Mock Products Data
export const PRODUCTS = [
  {
    id: 1,
    name: 'Urban Shadow Hoodie',
    price: 3499,
    originalPrice: 4499,
    category: 'hoodies',
    description: 'Premium heavyweight cotton hoodie with oversized fit. Features kangaroo pocket and embroidered logo.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    featured: true,
    isNew: true,
    rating: 4.8,
    reviews: 124,
    stock: 50,
  },
  {
    id: 2,
    name: 'Street Core Tee',
    price: 1499,
    category: 'tshirts',
    description: 'Essential streetwear tee made from 100% organic cotton. Relaxed fit with dropped shoulders.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray'],
    featured: true,
    isNew: false,
    rating: 4.6,
    reviews: 89,
    stock: 120,
  },
  {
    id: 3,
    name: 'Midnight Bomber Jacket',
    price: 5999,
    category: 'jackets',
    description: 'Classic bomber silhouette with modern technical fabrics. Water-resistant with ribbed cuffs and hem.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviews: 67,
    stock: 30,
  },
  {
    id: 4,
    name: 'Electric Logo Hoodie',
    price: 3299,
    category: 'hoodies',
    description: 'Bold statement hoodie with oversized electric blue logo print. Fleece-lined for maximum comfort.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600',
      'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    featured: true,
    isNew: false,
    rating: 4.7,
    reviews: 156,
    stock: 75,
  },
  {
    id: 5,
    name: 'Cargo Tech Pants',
    price: 3799,
    originalPrice: 4599,
    category: 'pants',
    description: 'Utility-inspired cargo pants with multiple pockets. Tapered fit with adjustable ankle cuffs.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Olive', 'Gray'],
    featured: false,
    isNew: true,
    rating: 4.5,
    reviews: 43,
    stock: 60,
  },
  {
    id: 6,
    name: 'Minimalist Beanie',
    price: 999,
    category: 'accessories',
    description: 'Soft ribbed knit beanie with embroidered logo. One size fits most.',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Electric Blue'],
    featured: false,
    isNew: false,
    rating: 4.4,
    reviews: 78,
    stock: 200,
  },
  {
    id: 7,
    name: 'Oversized Graphic Tee',
    price: 1799,
    category: 'tshirts',
    description: 'Statement graphic tee with bold back print. Heavy cotton with boxy fit.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    featured: true,
    isNew: false,
    rating: 4.6,
    reviews: 112,
    stock: 85,
  },
  {
    id: 8,
    name: 'Windbreaker Jacket',
    price: 4499,
    category: 'jackets',
    description: 'Lightweight windbreaker with packable hood. Reflective details for visibility.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      'https://images.unsplash.com/photo-1548712464-74e818df6f8a?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Electric Blue', 'White'],
    featured: false,
    isNew: true,
    rating: 4.3,
    reviews: 34,
    stock: 40,
  },
  {
    id: 9,
    name: 'Essential Joggers',
    price: 2799,
    category: 'pants',
    description: 'Comfortable fleece joggers with tapered leg. Elasticated waist with drawstring.',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy'],
    featured: true,
    isNew: false,
    rating: 4.7,
    reviews: 203,
    stock: 150,
  },
  {
    id: 10,
    name: 'Crossbody Bag',
    price: 1999,
    category: 'accessories',
    description: 'Compact crossbody bag with multiple compartments. Adjustable strap.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Electric Blue'],
    featured: false,
    isNew: true,
    rating: 4.5,
    reviews: 56,
    stock: 80,
  },
  {
    id: 11,
    name: 'Vintage Wash Hoodie',
    price: 3599,
    category: 'hoodies',
    description: 'Pre-washed hoodie with vintage aesthetic. Distressed details and faded color.',
    images: [
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black'],
    featured: false,
    isNew: false,
    rating: 4.8,
    reviews: 91,
    stock: 35,
  },
  {
    id: 12,
    name: 'Tech Fleece Zip-Up',
    price: 4299,
    category: 'hoodies',
    description: 'Modern tech fleece with full zip design. Sleek, minimal aesthetic.',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviews: 178,
    stock: 45,
  },
];

// Brand Values
export const BRAND_VALUES = [
  {
    title: 'Authenticity',
    description: 'Every piece tells a story. We create clothing that represents real street culture.',
    icon: 'Verified',
  },
  {
    title: 'Quality',
    description: 'Premium materials and meticulous craftsmanship in every stitch.',
    icon: 'Star',
  },
  {
    title: 'Sustainability',
    description: 'Committed to ethical production and environmental responsibility.',
    icon: 'Eco',
  },
  {
    title: 'Community',
    description: 'Built by the streets, for the streets. We grow together.',
    icon: 'People',
  },
];

// Team Members
export const TEAM_MEMBERS = [
  {
    name: 'Aarav Sharma',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Visionary behind HoodMandu, blending Nepali heritage with global street culture.',
  },
  {
    name: 'Priya Thapa',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Award-winning designer bringing bold concepts to life.',
  },
  {
    name: 'Bikram Rai',
    role: 'Production Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Ensuring premium quality in every piece we create.',
  },
];

// Sales Data for Charts
export const SALES_DATA = [
  { month: 'Jan', sales: 480000, orders: 240 },
  { month: 'Feb', sales: 360000, orders: 198 },
  { month: 'Mar', sales: 600000, orders: 320 },
  { month: 'Apr', sales: 540000, orders: 278 },
  { month: 'May', sales: 720000, orders: 389 },
  { month: 'Jun', sales: 660000, orders: 349 },
  { month: 'Jul', sales: 840000, orders: 430 },
  { month: 'Aug', sales: 780000, orders: 401 },
  { month: 'Sep', sales: 960000, orders: 512 },
  { month: 'Oct', sales: 900000, orders: 478 },
  { month: 'Nov', sales: 1080000, orders: 589 },
  { month: 'Dec', sales: 1320000, orders: 698 },
];