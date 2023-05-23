import { configureStore } from "@reduxjs/toolkit";
import iconSlice from "./slices/iconSLice";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    iconSlice,
    filterSlice,
    cartSlice,
  },
});
