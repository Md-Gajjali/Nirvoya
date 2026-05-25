import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const ProductSlice = createSlice({
  name: 'All',
  initialState,
  reducers: {
    AllProductReducer: ( state , action ) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { AllProductReducer } =ProductSlice.actions

export default  ProductSlice.reducer