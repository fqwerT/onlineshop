import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choosenCategory: null,
  categoryItems: [],
};

const categorySlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setCategoryReducer(state, action) {
      state.choosenCategory = action.payload;
    },
    setCategoryItemReducer(state, action) {
      state.categoryItems = action.payload;
    },
  },
});

export const { setCategoryReducer, setCategoryItemReducer } =
  categorySlice.actions;
export default categorySlice.reducer;
