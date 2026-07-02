import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage
const loadUserFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('hoodmandu_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return null;
};

// Save user to localStorage
const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('hoodmandu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hoodmandu_user');
    }
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      saveUserToStorage(action.payload);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      saveUserToStorage(null);
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveUserToStorage(state.user);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUser,
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
