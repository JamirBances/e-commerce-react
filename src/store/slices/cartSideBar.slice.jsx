import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSideBarSlice = createSlice({
    name: 'cartSideBar',
    initialState: [],
    reducers: {
      setCartSideBar: (state, action) => {
        return action.payload;
      }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then((res) => dispatch(setCartSideBar(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const createPurchasesThunk = (products) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', products, getConfig())
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCartSideBar([])))
        /* .catch((error) => console.log(error.response.data)) */
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCartSideBar } = cartSideBarSlice.actions;

export default cartSideBarSlice.reducer;
