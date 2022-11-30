import { configureStore } from '@reduxjs/toolkit'
import cartSideBarSlice from './slices/cartSideBar.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productSlice from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
      products: productSlice,
      isLoading: isLoadingSlice,
      purchases: purchasesSlice,
      cart: cartSideBarSlice
    }
})
