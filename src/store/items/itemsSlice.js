import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  cart: [],
  fillterCart: [],
  currentItem: null,
  quantity: 1,
  itemsPrice: [],
  filteredItems:[]
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
    setIncrementReducer(state, action) {
      return { ...state, quantity: state.quantity + 1 };
    },
    setDecrementReducer(state, action) {
      if (state.quantity > 0) {
        return { ...state, quantity: state.quantity - 1 };
      }
    },
    setItemsPriceReducer(state, action) {
      state.itemsPrice = action.payload;
    },
    setFilteredPrice(state,action){
      state.filteredItems = state.filteredItems.filter((item) => item.price <= action.payload)
    },
    setChangeItems(state,action){
      state.filteredItems = state.items
    }
  },
});

export const {
  setItemsReducer,
  setCartReducer,
  setFillteredReducer,
  setCurrentReducer,
  setIncrementReducer,
  setDecrementReducer,
  setItemsPriceReducer,
  setFilteredPrice,
  setChangeItems
} = itemsSlice.actions;
export default itemsSlice.reducer;
