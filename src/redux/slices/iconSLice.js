import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  iconObj: [],
};

const iconSlice = createSlice({
  name: "iconcs",
  initialState,
  reducers: {
    insertIconsArray(state, action) {
      console.log(action.payload);
      state.iconObj = action.payload;
    },
    insertIcon(state, action) {
      console.log(action.payload);
      state.iconObj.push(action.payload);
    },
    deleteIcon(state, action) {
      console.log(action.payload);
      const index = state.iconObj.findIndex((icon) => icon === action.payload);
      if (index !== -1) {
        state.iconObj.splice(index, 1);
      }
    },
    replaceIcon(state, action) {
      const index = state.iconObj.findIndex(
        (icon) => icon === action.payload[0]
      );
      state.iconObj[index] = action.payload[1];
      console.log(state.iconObj);
    },
  },
});

export const { insertIconsArray, insertIcon, deleteIcon, replaceIcon } =
  iconSlice.actions;

export default iconSlice.reducer;
