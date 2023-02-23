import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choosenCategory: null,
  categoryItems: [],
  filteredCategoriItems: [],
  fillteringPrice: 5000,
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
    setFilterPriceCategory(state, action) {
      state.filteredCategoriItems = state.categoryItems.filter(
        (item) => item.price <= action.payload
      );
    },
    setRemoveFilterChanges(state, action) {
      state.filteredCategoriItems = state.categoryItems;
    },
    setFiltersPrice(state, action) {
      state.fillteringPrice = action.payload;
    },
  },
});

export const {
  setCategoryReducer,
  setCategoryItemReducer,
  setFilterPriceCategory,
  setRemoveFilterChanges,
  setFiltersPrice,
} = categorySlice.actions;
export default categorySlice.reducer;
