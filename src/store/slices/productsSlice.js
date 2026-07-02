import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    category: 'all',
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    sortBy: 'featured',
    searchQuery: '',
  },
  viewMode: 'grid',
  selectedProduct: null,
  quickViewOpen: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    
    toggleSize: (state, action) => {
      const size = action.payload;
      const index = state.filters.sizes.indexOf(size);
      if (index >= 0) {
        state.filters.sizes.splice(index, 1);
      } else {
        state.filters.sizes.push(size);
      }
    },
    
    toggleColor: (state, action) => {
      const color = action.payload;
      const index = state.filters.colors.indexOf(color);
      if (index >= 0) {
        state.filters.colors.splice(index, 1);
      } else {
        state.filters.colors.push(color);
      }
    },
    
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    openQuickView: (state, action) => {
      state.selectedProduct = action.payload;
      state.quickViewOpen = true;
    },
    
    closeQuickView: (state) => {
      state.quickViewOpen = false;
      state.selectedProduct = null;
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  toggleSize,
  toggleColor,
  setSortBy,
  setSearchQuery,
  resetFilters,
  setViewMode,
  openQuickView,
  closeQuickView,
} = productsSlice.actions;

// Selectors
export const selectFilters = (state) => state.products.filters;
export const selectViewMode = (state) => state.products.viewMode;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectQuickViewOpen = (state) => state.products.quickViewOpen;

export default productsSlice.reducer;