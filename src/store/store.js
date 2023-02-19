import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './items/itemsSlice'

export const store = configureStore({
  reducer: {
    itemsSlice
  }
})