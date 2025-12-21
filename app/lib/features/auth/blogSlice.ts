import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateOrLoginUserApiResponse, BlogUserPayload } from '../../blogServices';


interface BlogUserState {
  userId: string | null;
  emailAddress: string | null;
  fullName: string | null;
  isAuthenticated: boolean;
  lastUpdated: string | null;
}

const initialState: BlogUserState = {
  userId: null,
  emailAddress: null,
  fullName: null,
  isAuthenticated: false,
  lastUpdated: null,
};

const blogUserSlice = createSlice({
  name: 'blogUser',
  initialState,
  reducers: {
    setBlogUser: (state, action: PayloadAction<CreateOrLoginUserApiResponse>) => {
      // Add defensive checks to prevent undefined errors
      if (
        action.payload && 
        action.payload.result === 1 && 
        action.payload.payload &&
        action.payload.payload.userId
      ) {
        state.userId = action.payload.payload.userId;
        state.emailAddress = action.payload.payload.emailAddress || null;
        state.fullName = action.payload.payload.fullName || null;
        state.isAuthenticated = true;
        state.lastUpdated = new Date().toISOString();
      } else {
        // Log error for debugging
        console.error('Invalid payload received in setBlogUser:', action.payload);
      }
    },
    clearBlogUser: (state) => {
      state.userId = null;
      state.emailAddress = null;
      state.fullName = null;
      state.isAuthenticated = false;
      state.lastUpdated = null;
    },
    updateBlogUserEmail: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.emailAddress = action.payload;
        state.lastUpdated = new Date().toISOString();
      }
    },
    updateBlogUserInfo: (state, action: PayloadAction<{ userId?: string; email?: string; fullName?: string }>) => {
      if (action.payload) {
        if (action.payload.userId) state.userId = action.payload.userId;
        if (action.payload.email) state.emailAddress = action.payload.email;
        if (action.payload.fullName) state.fullName = action.payload.fullName;
        state.lastUpdated = new Date().toISOString();
      }
    },
  },
});

export const { 
  setBlogUser, 
  clearBlogUser, 
  updateBlogUserEmail,
  updateBlogUserInfo 
} = blogUserSlice.actions;

// Ensure BlogUserPayload has fullName property
// If it doesn't exist in blogServices, add it to the interface definition there

// Selectors with null safety
export const selectBlogUser = (state: { blogUser: BlogUserState }) => state.blogUser;
export const selectBlogUserId = (state: { blogUser: BlogUserState }) => state.blogUser?.userId || null;
export const selectBlogUserEmail = (state: { blogUser: BlogUserState }) => state.blogUser?.emailAddress || null;
export const selectBlogUserFullName = (state: { blogUser: BlogUserState }) => state.blogUser?.fullName || null;
export const selectIsBlogUserAuthenticated = (state: { blogUser: BlogUserState }) => state.blogUser?.isAuthenticated || false;

export default blogUserSlice.reducer;