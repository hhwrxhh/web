import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClickedIcon: false,
  filterParams: {
    Category: "",
    SubCategory: "",
    Price: "",
    Prescription: "",
  },
  isClickedSubmit: false,
};

const filterSlice = createSlice({
  name: "iconcs",
  initialState,
  reducers: {
    clickFilterIcon(state, action) {
      state.isClickedIcon = !state.isClickedIcon;
    },
    setFilterParams(state, action) {
      state.filterParams = { ...state.filterParams, ...action.payload };
    },
    setSubmitClicked(state, action) {
      state.isClickedSubmit = action.payload;
    },
  },
});

export const { clickFilterIcon, setFilterParams, setSubmitClicked } =
  filterSlice.actions;

export default filterSlice.reducer;
