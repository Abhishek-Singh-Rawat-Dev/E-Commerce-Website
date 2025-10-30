import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  searchOpen: false,
  cartOpen: false,
  loading: false,
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleSearch,
  closeSearch,
  toggleCart,
  closeCart,
  setLoading,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
