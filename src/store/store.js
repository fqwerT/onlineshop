import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './items/itemsSlice'
import clientSlice from './clientData/clientSlice'
import categorySlice from './categorySlice/categorySlice'
export const store = configureStore({
  reducer: {
    itemsSlice,
    clientSlice,
    categorySlice
  }
})