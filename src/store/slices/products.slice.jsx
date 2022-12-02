import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    filterName: (state, action) => {
      const inputSearch = action.payload
      console.log(inputSearch);
      return state.filter(product => product.title.toLowerCase().includes(inputSearch.toLowerCase()))
    }
  }
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterProductsThunk = (categoryId) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${categoryId}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterDetailProductsThunk = (inputSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts, filterName } = productSlice.actions;

export default productSlice.reducer;
