import { configureStore } from "@reduxjs/toolkit";
import storeReducer from './fetures/store/storeSlice';
import cartReducer from './fetures/cart/cartSlice';
import userReducer from './fetures/user/userSlice';

export const store = configureStore({
                     reducer: {
                            store: storeReducer,
                            cart: cartReducer,
                            user: userReducer
                  }
               })


const saveState = (state) => {
    try{
        const serialisedStore = JSON.stringify(state.store);
        const serialisedCart = JSON.stringify(state.cart);
        const serialisedUser = JSON.stringify(state.user);
        window.localStorage.setItem('hri_local_store', serialisedStore)
        window.localStorage.setItem('hri_local_cart', serialisedCart)
        window.localStorage.setItem('hri_local_user', serialisedUser)
    }catch(error){
        saveState(store.getState())
    }
}

store.subscribe(() => {
    saveState(store.getState())
})
