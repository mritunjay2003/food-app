import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "./slice/cartSlice.jsx";
import authSlice from "./slice/authSlice.jsx";

export const store = configureStore({
    reducer: {
        cart:cartSlice,
        auth:authSlice
    },
})


export  default  store;