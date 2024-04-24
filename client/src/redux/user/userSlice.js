// Importing necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice of the Redux store
const initialState = {
  currentUser: null, // Initially no user is logged in
  loading: false,    // Loading state is initially false
  error: false,      // Error state is initially false
};

// Creating a slice for managing user-related actions and state
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Action for initiating a sign-in process
    signInStart: (state) => {
      state.loading = true; // Set loading state to true
    },
    // Action for successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Set current user based on payload
      state.loading = false;              // Set loading state to false
      state.error = false;                // Reset error state to false
    },
    // Action for sign-in failure
    signInFailure: (state, action) => {
      state.loading = false;        // Set loading state to false
      state.error = action.payload; // Set error state based on payload
    },
    // Action for initiating user update process
    updateUserStart: (state) => {
      state.loading = true; // Set loading state to true
    },
    // Action for successful user update
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload; // Update current user based on payload
      state.loading = false;              // Set loading state to false
      state.error = false;                // Reset error state to false
    },
    // Action for user update failure
    updateUserFailure: (state, action) => {
      state.loading = false;        // Set loading state to false
      state.error = action.payload; // Set error state based on payload
    },
    // Action for initiating user deletion process
    deleteUserStart: (state) => {
      state.loading = true; // Set loading state to true
    },
    // Action for successful user deletion
    deleteUserSuccess: (state) => {
      state.currentUser = null; // Reset current user to null
      state.loading = false;    // Set loading state to false
      state.error = false;      // Reset error state to false
    },
    // Action for user deletion failure
    deleteUserFailure: (state, action) => {
      state.loading = false;        // Set loading state to false
      state.error = action.payload; // Set error state based on payload
    },
    // Action for signing out
    signOut: (state) => {
      state.currentUser = null; // Reset current user to null
      state.loading = false;    // Set loading state to false
      state.error = false;      // Reset error state to false
    },
  },
});

// Exporting actions for use in components
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} = userSlice.actions;

// Exporting reducer function to be used in Redux store setup
export default userSlice.reducer;
