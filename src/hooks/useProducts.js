import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductById,
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchRelatedProducts,
  searchProducts,
} from '../api/productsApi';
import { selectFilters } from '../store/slices/productsSlice';

// Fetch all products with filters
export const useProducts = () => {
  const filters = useSelector(selectFilters);

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch single product by ID
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

// Fetch featured products
export const useFeaturedProducts = (limit = 4) => {
  return useQuery({
    queryKey: ['featuredProducts', limit],
    queryFn: () => fetchFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000,
  });
};

// Fetch new arrivals
export const useNewArrivals = (limit = 4) => {
  return useQuery({
    queryKey: ['newArrivals', limit],
    queryFn: () => fetchNewArrivals(limit),
    staleTime: 10 * 60 * 1000,
  });
};

// Fetch related products
export const useRelatedProducts = (productId, limit = 4) => {
  return useQuery({
    queryKey: ['relatedProducts', productId, limit],
    queryFn: () => fetchRelatedProducts(productId, limit),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

// Search products
export const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ['searchProducts', query],
    queryFn: () => searchProducts(query),
    enabled: query?.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
};

export default useProducts;