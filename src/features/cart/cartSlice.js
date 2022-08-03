import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (thunkAPI) => {
    // try {
    //   const resp = axios(url)
    //   return resp.data
    // } catch (err) {
    //   return thunkAPI.rejectWithValue('something went wrong')
    // }
    return fetch(url)
      .then((response) => response.json())
      .catch((err) => console.log(err))
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeCart: (state, action) => {
      const cartId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== cartId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotal: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.error]: (state, acton) => {
      state.isLoading = false
    },
  },
})

export const { clearCart, removeCart, increase, decrease, calculateTotal } =
  cartSlice.actions

export default cartSlice.reducer
