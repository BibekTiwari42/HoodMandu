import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  searchOpen: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
  },
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    
    setCartDrawerOpen: (state, action) => {
      state.cartDrawerOpen = action.payload;
    },
    
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'success',
      };
    },
    
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleSearch,
  setSearchOpen,
  showSnackbar,
  hideSnackbar,
  setLoading,
} = uiSlice.actions;

// Selectors
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectCartDrawerOpen = (state) => state.ui.cartDrawerOpen;
export const selectSearchOpen = (state) => state.ui.searchOpen;
export const selectSnackbar = (state) => state.ui.snackbar;
export const selectLoading = (state) => state.ui.loading;

export default uiSlice.reducer;