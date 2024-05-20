import { createSlice } from "@reduxjs/toolkit";

// Retrieve cartItems from localStorage if available
const initialCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: initialCartItems,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      // Update localStorage
    },
    increment: (state, action) => {
      const { _id } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        item.quantity++; // Increment quantity
        // Update localStorage
      }
    },
    decrement: (state, action) => {
      const { _id } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        if (item.quantity >= 1) {
          item.quantity--; // Decrement quantity if greater than 1
        } else {
          // Remove item from cart if quantity becomes 0
          state.cartItems = state.cartItems.filter((item) => item._id !== _id);
        }
        // Update localStorage
      }
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    getAllCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeItem,
  getAllCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
