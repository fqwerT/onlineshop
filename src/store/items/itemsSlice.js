import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cart: [],
  fillterCart: [],
  currentItem: null,
  quantity: 1,
  itemsPrice: [],
  filteredItems: [],
  fillteredColor: [],
  colors: [],
};

const itemsSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setItemsReducer(state, action) {
      state.items = action.payload;
    },
    setCartReducer(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    setFillteredReducer(state, action) {
      state.fillterCart = action.payload;
    },
    setCurrentReducer(state, action) {
      state.currentItem = action.payload;
    },

    setItemsPriceReducer(state, action) {
      state.itemsPrice = action.payload;
    },
    setFilteredPrice(state, action) {
      state.filteredItems = state.items.filter(
        (item) => item.price <= action.payload
      );
    },
    setChangeItems(state, action) {
      state.filteredItems = state.items;
    },
    setFilteredColor(state, action) {
      state.filteredItems = state.filteredItems.filter(
        (item) => item.color == action.payload
      );
    },
    setColorsReducer(state, action) {
      state.colors = state.filteredItems.map((item) => item.color);
    },
    setRemoveDuplicates(state, action) {
      state.colors = [...new Set(state.colors)];
    },
    setRemoveCartItem(state, action) {
      state.fillterCart = state.fillterCart.splice(1, action.payload);
    },
  },
});

export const {
  setItemsReducer,
  setCartReducer,
  setFillteredReducer,
  setCurrentReducer,
  setItemsPriceReducer,
  setFilteredPrice,
  setChangeItems,
  setFilteredColor,
  setRemoveDuplicates,
  setColorsReducer,
  setRemoveCartItem,
} = itemsSlice.actions;
export default itemsSlice.reducer;
