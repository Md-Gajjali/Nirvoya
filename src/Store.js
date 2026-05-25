import { configureStore } from '@reduxjs/toolkit'
import { ProductSlice } from './SliceReducer'

export const store = configureStore({
  reducer: {
    AllProducts: ProductSlice.reducer
  },
})
 

