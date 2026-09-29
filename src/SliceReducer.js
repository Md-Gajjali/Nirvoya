import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  cart: JSON.parse(localStorage.getItem('cartItem')) || [],
  wishList: JSON.parse(localStorage.getItem('wish')) || [],
  subTotal: JSON.parse(localStorage.getItem('subTotal')) || 0,
  cat:JSON.parse(localStorage.getItem('cat'))|| []  ,
}

export const ProductSlice = createSlice({
  name: 'All',
  initialState,
  reducers: {
    AllProductReducer: (state, action) => {
      state.value = action.payload
    },
    CartReducer: (state, action) => {
      state.cart = [...state.cart, action.payload]
      localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    wishListReducer: (state, action) => {
      state.wishList = [...state.wishList, action.payload]
      localStorage.setItem('wish', JSON.stringify(state.wishList))
    },
    RemoveReducer: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload)
      localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    WishListRemoveReducer: (state, action) => {
      state.wishList = state.wishList.filter(item => item.id !== action.payload)
      localStorage.setItem('wish', JSON.stringify(state.wishList))
    },
    IncrementReducer: (state, action) => {
      state.cart = state.cart.map(item => {
        return item.id == action.payload
          ? { ...item, quan: item.quan + 1 }
          : item
      })
      localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    DecrementReducer: (state, action) => {
      state.cart = state.cart.map(item => {
        return item.id == action.payload
          ? { ...item, quan: item.quan - 1 }
          : item
      })
      localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    SubTotalReducer: state => {
      ;(state.subTotal = state.cart.reduce(
        (current, item) => current + item.quan * item.price,
        0
      )),
        localStorage.setItem('subTotal', JSON.stringify(state.subTotal))
    },
    CategoryReducer: (state, action) => {
      state.cat = state.value.filter(item => item.category === action.payload)
        localStorage.setItem('cat', JSON.stringify(state.cat))

    }
  }
})

export const {
  AllProductReducer,
  CartReducer,
  IncrementReducer,
  DecrementReducer,
  wishListReducer,
  SubTotalReducer,
  RemoveReducer,
  WishListRemoveReducer,
  CategoryReducer
} = ProductSlice.actions

export default ProductSlice.reducer
