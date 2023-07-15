import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
        cartProducts : [],
        wishlist: [],
        wishlistIds: []
        }

const loadState = () => {
    let state
    try{
        const serialisedState = window.localStorage.getItem('hri_local_cart')
        if (!serialisedState){
            state = defaultState
            const serialisedState2 = JSON.stringify(state)
            window.localStorage.setItem('hri_local_cart', serialisedState2)
        }else{
            state = JSON.parse(serialisedState)
        } 
    }catch (err){
            console.log("error")
        }
        return state
}


const initialState = loadState()


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            state.cartProducts = [...state.cartProducts, product]
        },
        updateCart: (state, action) => {
            const cartProducts = action.payload
            state.cartProducts = cartProducts
        },
        increaseProductCount: (state, action) => {
            const productProp = action.payload
            state.cartProducts.forEach(each => {
                if (each.productId === productProp.productId){
                    if (each.hasVariants){
                        if (each.size === productProp.size && each.color === productProp.color){
                            if (each.variants[each.size][each.color].stock > each.productCount){
                                each.productCount = each.productCount + 1
                            }
                        }
                    }else{
                        if (each.productUnits > each.productCount){
                            each.productCount = each.productCount + 1
                        }
                    }
                    return each
                }else{
                        return each
                    } 
            })
        },

        decreaseProductCount: (state, action) => {
            const productProp = action.payload
            let productData
            if (productProp.hasVariants){
                [productData] = state.cartProducts.filter(each => each.productId === productProp.productId && each.size === productProp.size && each.color === productProp.color)
            }else{
                [productData] = state.cartProducts.filter(each => each.productId === productProp.productId)
            }
            if (productData.productCount > 1){
                state.cartProducts.forEach(each => {
                    if (productProp.hasVariants){
                        if (each.productId === productProp.productId && each.color === productProp.color && each.size === productProp.size){
                            each.productCount = each.productCount - 1
                        }
                    }
                    else{
                        if (each.productId === productProp.productId){
                            each.productCount = each.productCount - 1
                        }
                    }
                })
            }else{
                if(productProp.hasVariants){
                    state.cartProducts = state.cartProducts.filter(each => ((each.hasVariants !== true) || (each.productId !== productProp.productId) || ((each.color !== productProp.color) || (each.size !== productProp.size))))
                }
                else{
                    state.cartProducts = state.cartProducts.filter(each => each.productId !== productProp.productId)
                }
            }
        },
        changeCheckStatus: (state, action) =>{
            const productData = action.payload
            state.cartProducts.forEach(each => {
                if (each.productId === productData.productId){
                    if (productData.hasVariants){
                        if ((each.size === productData.size) && (each.color === productData.color)){
                            each.checked = !productData.checked
                        }
                    }else{
                        each.checked = !productData.checked
                    }
                }
            })
        },
        checkAll: (state) => {
            state.cartProducts.forEach(each => each.checked = true)
        },
        removeChecked: (state) => {
            state.cartProducts = state.cartProducts.filter(each => each.checked !== true)
        },
        updateWishlist: (state, action) => {
            const wishlistProducts = action.payload
            state.wishlist = wishlistProducts
        },
        moveToWishlist: (state) => {
            state.wishlist = state.cartProducts.filter(each => each.checked === true)
            state.wishlistIds = state.wishlist.map(each => each.productId)
            state.cartProducts = state.cartProducts.filter(each => each.checked !== true)
        },
        removeProductFromCart: (state, action) => {
            const productProp = action.payload
            if(productProp.hasVariants){
                state.cartProducts = state.cartProducts.filter(each => ((each.hasVariants !== true) || (each.productId !== productProp.productId) || ((each.color !== productProp.color) || (each.size !== productProp.size))))
            }
            else{
                state.cartProducts = state.cartProducts.filter(each => each.productId !== productProp.productId)
            }
        },
        clearCart: (state) => {
            state.cartProducts = []
        },
        removeOrderPlacedItems: (state) => {
            state.cartProducts = state.cartProducts.filter(each => each.checked !== true)
            state.cartProducts.forEach(each => each.checked = true)
        },
        addToWishlist: (state, action)=>{
            const product = action.payload
            state.wishlist = [...state.wishlist, product]
            state.wishlistIds = [...state.wishlistIds, product.productId]
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload
            state.wishlist = state.wishlist.filter(each => each.productId !== productId)
            state.wishlistIds = state.wishlistIds.filter(each => each !== productId)
        }
    }
})

export const {addToCart, updateCart, increaseProductCount, decreaseProductCount, removeProductFromCart, checkAll, removeChecked, changeCheckStatus, updateWishlist, moveToWishlist, clearCart, removeOrderPlacedItems, addToWishlist, removeFromWishlist} = cartSlice.actions

export default cartSlice.reducer