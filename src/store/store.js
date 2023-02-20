import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './items/itemsSlice'
import clientSlice from './clientData/clientSlice'

export const store = configureStore({
  reducer: {
    itemsSlice,
    clientSlice
  }
})