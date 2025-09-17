// // lib/features/app/appSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Toast {
//   id: string;
//   type: "success" | "error" | "warning" | "info";
//   title: string;
//   message?: string;
//   duration?: number;
// }

// interface Modal {
//   id: string;
//   type: string;
//   props?: Record<string, any>;
// }

// interface AppState {
//   // UI State
//   sidebarOpen: boolean;
//   theme: "light" | "dark" | "system";

//   // Loading states
//   globalLoading: boolean;
//   loadingStates: Record<string, boolean>;

//   // Toast notifications
//   toasts: Toast[];

//   // Modal management
//   modals: Modal[];

//   // Error handling
//   errors: Record<string, string>;

//   // App metadata
//   appVersion: string;
//   lastUpdated: string | null;
//   isOnline: boolean;
// }

// const initialState: AppState = {
//   sidebarOpen: false,
//   theme: "system",
//   globalLoading: false,
//   loadingStates: {},
//   toasts: [],
//   modals: [],
//   errors: {},
//   appVersion: "1.0.0",
//   lastUpdated: null,
//   isOnline: true,
// };

// const appSlice = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     // UI Actions
//     toggleSidebar: (state) => {
//       state.sidebarOpen = !state.sidebarOpen;
//     },

//     setSidebarOpen: (state, action: PayloadAction<boolean>) => {
//       state.sidebarOpen = action.payload;
//     },

//     setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
//       state.theme = action.payload;

//       // Save to localStorage
//       if (typeof window !== "undefined") {
//         localStorage.setItem("theme", action.payload);
//       }
//     },

//     // Loading Actions
//     setGlobalLoading: (state, action: PayloadAction<boolean>) => {
//       state.globalLoading = action.payload;
//     },

//     setLoading: (
//       state,
//       action: PayloadAction<{ key: string; isLoading: boolean }>
//     ) => {
//       const { key, isLoading } = action.payload;
//       if (isLoading) {
//         state.loadingStates[key] = true;
//       } else {
//         delete state.loadingStates[key];
//       }
//     },

//     // Toast Actions
//     addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
//       const toast: Toast = {
//         ...action.payload,
//         id: `toast-${Date.now()}-${Math.random()}`,
//       };
//       state.toasts.push(toast);
//     },

//     removeToast: (state, action: PayloadAction<string>) => {
//       state.toasts = state.toasts.filter(
//         (toast) => toast.id !== action.payload
//       );
//     },

//     clearAllToasts: (state) => {
//       state.toasts = [];
//     },

//     // Modal Actions
//     openModal: (state, action: PayloadAction<Omit<Modal, "id">>) => {
//       const modal: Modal = {
//         ...action.payload,
//         id: `modal-${Date.now()}-${Math.random()}`,
//       };
//       state.modals.push(modal);
//     },

//     closeModal: (state, action: PayloadAction<string>) => {
//       state.modals = state.modals.filter(
//         (modal) => modal.id !== action.payload
//       );
//     },

//     closeAllModals: (state) => {
//       state.modals = [];
//     },

//     // Error Actions
//     setError: (
//       state,
//       action: PayloadAction<{ key: string; message: string }>
//     ) => {
//       const { key, message } = action.payload;
//       state.errors[key] = message;
//     },

//     clearError: (state, action: PayloadAction<string>) => {
//       delete state.errors[action.payload];
//     },

//     clearAllErrors: (state) => {
//       state.errors = {};
//     },

//     // Network Actions
//     setOnlineStatus: (state, action: PayloadAction<boolean>) => {
//       state.isOnline = action.payload;
//     },

//     // App Metadata
//     updateLastUpdated: (state) => {
//       state.lastUpdated = new Date().toISOString();
//     },

//     setAppVersion: (state, action: PayloadAction<string>) => {
//       state.appVersion = action.payload;
//     },

//     // Initialize theme from localStorage
//     initializeTheme: (state) => {
//       if (typeof window !== "undefined") {
//         const savedTheme = localStorage.getItem("theme") as
//           | "light"
//           | "dark"
//           | "system";
//         if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
//           state.theme = savedTheme;
//         }
//       }
//     },
//   },
// });

// export const {
//   // UI actions
//   toggleSidebar,
//   setSidebarOpen,
//   setTheme,

//   // Loading actions
//   setGlobalLoading,
//   setLoading,

//   // Toast actions
//   addToast,
//   removeToast,
//   clearAllToasts,

//   // Modal actions
//   openModal,
//   closeModal,
//   closeAllModals,

//   // Error actions
//   setError,
//   clearError,
//   clearAllErrors,

//   // Network actions
//   setOnlineStatus,

//   // App metadata actions
//   updateLastUpdated,
//   setAppVersion,
//   initializeTheme,
// } = appSlice.actions;

// export default appSlice.reducer;

// // Selectors
// export const selectSidebarOpen = (state: { app: AppState }) =>
//   state.app.sidebarOpen;
// export const selectTheme = (state: { app: AppState }) => state.app.theme;
// export const selectGlobalLoading = (state: { app: AppState }) =>
//   state.app.globalLoading;
// export const selectLoadingStates = (state: { app: AppState }) =>
//   state.app.loadingStates;
// export const selectToasts = (state: { app: AppState }) => state.app.toasts;
// export const selectModals = (state: { app: AppState }) => state.app.modals;
// export const selectErrors = (state: { app: AppState }) => state.app.errors;
// export const selectIsOnline = (state: { app: AppState }) => state.app.isOnline;
