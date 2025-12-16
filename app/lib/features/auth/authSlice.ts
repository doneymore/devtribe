// lib/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  likedPosts: Record<number, boolean>; // Add this line
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  likedPosts: {}, // Add this line
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.likedPosts = {}; // Clear liked posts on logout
    },
    toggleLikedPost: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
    },
    setLikedPost: (
      state,
      action: PayloadAction<{ postId: number; isLiked: boolean }>
    ) => {
      const { postId, isLiked } = action.payload;
      state.likedPosts[postId] = isLiked;
    },
    clearLikedPosts: (state) => {
      state.likedPosts = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Action creators
export const {
  setCredentials,
  toggleLikedPost,
  setLikedPost,
  clearLikedPosts,
  logout,
  setLoading,
  updateUser,
} = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectLikedPosts = (state: RootState) => state.auth.likedPosts; // Fixed: state.auth instead of state.blog

// Reducer
export const authReducer = authSlice.reducer;