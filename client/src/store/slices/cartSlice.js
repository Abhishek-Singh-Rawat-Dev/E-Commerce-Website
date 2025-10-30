import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalItems: 0,
  totalPrice: 0,
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0]?.url || '',
          stock: product.stock,
          quantity,
        });
      }

      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
      localStorage.removeItem('shippingAddress');
    },
    closeCart: (state) => {
      // This action is handled by the UI slice, but we include it here for consistency
      // The actual cart closing logic is in the UI slice
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveShippingAddress,
  clearShippingAddress,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
