import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStoreData } from "../../fetures/store/storeSlice"
import Header from "../Header/header"
import Footer from "../Footer/footer"
import Loader from "../Loading"
import { Outlet } from "react-router-dom"
import './sharedLayout.scss'
import { updateCart, updateWishlist } from "../../fetures/cart/cartSlice"

const loadingConst = {
    success: 'SUCCESS',
    loading: 'LOADING',
    failed: 'FAILED'
}

const SharedLayout = () => {
    const { loadingStatus, storeData } = useSelector((state) => state.store)
    const {cartProducts, wishlist} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loadingStatus === 'SUCCESS') {
            let updatedCartProducts = []
            if (cartProducts.legth !== 0) {
                cartProducts.forEach(eachCartProduct => {
                    let updatedProductData
                    storeData.products.forEach(eachProduct => {
                        if (eachCartProduct.productId === eachProduct.productId) {
                            if (eachCartProduct.hasVariants) {
                                if (eachProduct.hasVariants) {
                                    if (eachProduct.variants[eachCartProduct.size][eachCartProduct.color] !== undefined) {
                                        updatedProductData = { ...eachProduct, checked: eachCartProduct.checked, size: eachCartProduct.size, color: eachCartProduct.color, onePiecePrice: eachProduct.variants[eachCartProduct.size][eachCartProduct.color].price, productCount: eachCartProduct.productCount, shopId: eachCartProduct.shopId }
                                    } else {
                                        updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                    }
                                }else {
                                    updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                }
                            } else {
                                if (!eachProduct.hasVariants) {
                                    let newOnePiecePrice
                                    if (eachProduct.productPrice && eachProduct.productdiscountPrice) {
                                        newOnePiecePrice = eachProduct.productdiscountPrice
                                    } else if (eachProduct.productdiscountPrice) {
                                        newOnePiecePrice = eachProduct.productdiscountPrice
                                    } else {
                                        newOnePiecePrice = eachProduct.productPrice
                                    }
                                    updatedProductData = { ...eachProduct, checked : eachCartProduct.checked, onePiecePrice: newOnePiecePrice, productCount: eachCartProduct.productCount, shopId: eachCartProduct.shopId }
                                }else {
                                    updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                }
                            }
                        updatedCartProducts.push(updatedProductData)
                        }
                    })
                })

                dispatch(updateCart(updatedCartProducts))
            }
            let updatedWishlistProducts = []
            if (wishlist.legth !== 0) {
                wishlist.forEach(eachCartProduct => {
                    let updatedProductData
                    storeData.products.forEach(eachProduct => {
                        if (eachCartProduct.productId === eachProduct.productId) {
                            if (eachCartProduct.hasVariants) {
                                if (eachProduct.hasVariants) {
                                    if (eachProduct.variants[eachCartProduct.size][eachCartProduct.color] !== undefined) {
                                        updatedProductData = { ...eachProduct, size: eachCartProduct.size, color: eachCartProduct.color, onePiecePrice: eachProduct.variants[eachCartProduct.size][eachCartProduct.color].price }
                                    } else {
                                        updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                    }
                                }else {
                                    updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                }
                            } else {
                                if (!eachProduct.hasVariants) {
                                    let newOnePiecePrice
                                    if (eachProduct.productPrice && eachProduct.productdiscountPrice) {
                                        newOnePiecePrice = eachProduct.productdiscountPrice
                                    } else if (eachProduct.productdiscountPrice) {
                                        newOnePiecePrice = eachProduct.productdiscountPrice
                                    } else {
                                        newOnePiecePrice = eachProduct.productPrice
                                    }
                                    updatedProductData = { ...eachProduct, onePiecePrice: newOnePiecePrice }
                                }else {
                                    updatedProductData = { ...eachCartProduct, error: 'Remove and add again' }
                                }
                            }
                        updatedWishlistProducts.push(updatedProductData)
                        }
                    })
                })
                dispatch(updateWishlist(updatedWishlistProducts))
            }
        }
    }, [storeData])

    const host = window.location.host;
	const [shopId] = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);

    const fetchShopData = async () =>{
        try{
            dispatch(getStoreData(shopId))
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchShopData()
    }, [])

    const renderFailureView = () => (
        <div>
            <h1>Something Was Wrong Please Tryagain</h1>
            <button type="button" onClick={() => fetchShopData} >Try Again</button>
        </div>
    )

    const renderSuccessView = () => (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
    )

    const renderLoadingView = () => (
        <div className="loading-container">
            <Loader />
        </div>
    )

    const renderContent = () => {
        switch (loadingStatus) {
            case loadingConst.loading:
                return renderLoadingView()
            case loadingConst.success:
                return renderSuccessView()
            case loadingConst.failed:
                return renderFailureView()
            default:
                break;
        }
    }

    return(
        <div className="home-container">
            {renderContent()}
        </div>
    )
}

export default SharedLayout