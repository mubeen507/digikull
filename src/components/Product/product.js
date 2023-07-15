import { useState, useEffect } from "react"
import { getProductData } from "../../fetchCalls/fetchRoutes"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, increaseProductCount, decreaseProductCount, addToWishlist, removeFromWishlist } from "../../fetures/cart/cartSlice"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ProductImgTab from "../ProductImgTab/productImgTab"
import Loader from "../Loading"
import SimilarProduct from "../SimilarProduct/similarProduct"
import SizeBtn from "./sizeBtn";
import ColorBtn from "./colorBtn";
import './product.scss'

const loadingConst = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED'
}

const Product = () => {
    const urlArray = window.location.href.split('/')
    const [productId, setProductId] = useState(urlArray[4])
    const { storeData } = useSelector((state) => state.store) 
    const { products } = storeData
    const [product] = products.filter(each => each.productId === productId)
    const [productData, setProductData] = useState(product)
    const [activeImg, setActiveImg] = useState(productData.productImages[0])
    const [loadingStatus, setStatus] = useState('SUCCESS')
    const [similarProducts, setSimilerProducts] = useState([])
    const [categoryData] = storeData.categorys.filter(each => each.categoryName === product.productCategory)

    let size
    let color
    let stock = false
    if (productData.hasVariants){
                size = Object.keys(productData.variants)[0]
                color = Object.keys(productData.variants[size])[0]
                if (productData.variants[size][color].stock < 1){
                    stock = true
                }
            }
    const [activeSize, setActiveSize] = useState(size)
    const [activeColor, setActiveColor] = useState(color)
    const [outOfStock, setOutOfStock] = useState(stock)
    const { cartProducts, wishlistIds } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const host = window.location.host;
    let ProductCount
    const cartProductsIds = cartProducts.map(each => each.productId)
    if (productData && productData.hasVariants){
        if (cartProductsIds.includes(productId)) {
            const [product] = cartProducts.filter(each => ((each.productId === productId) && (each.size === activeSize) && (each.color === activeColor)))
            if (product !== undefined){
                const { productCount } = product
                ProductCount = productCount
            }
        }
    }else{
        if (cartProductsIds.includes(productId)){
            const [product] = cartProducts.filter(each => each.productId === productId)
            ProductCount = product.productCount
        }
    }
    
    let cartVariants = {}
    if(productData && cartProductsIds.includes(productId)){
        const cartProductData = cartProducts.filter(each => each.productId === productId)
        cartProductData.forEach(each => cartVariants[each.size] = [])
        cartProductData.forEach(each => {
            if (cartVariants[each.size].length === 0){
                cartVariants[each.size] = [each.color]
            }else{
                cartVariants[each.size] = [...cartVariants[each.size], each.color]
            }
        })
    }
    const cartVariantsKeys = Object.keys(cartVariants)
    
    // useEffect(() => {
    //     const urlArray = window.location.href.split('/')
    //     const currentId = urlArray[4]
    //     if (currentId !== productData.productId) {
    //         getProduct()
    //     }
    // }, [])

    const [shopId] = host
        .split(".")
        .slice(0, host.includes("localhost") ? -1 : -2);

    const getProduct = async () => {
        try {
            setStatus('LOADING')
            const urlArray = window.location.href.split('/')
            const productId = urlArray[4]
            const response = await getProductData(shopId, productId)
            const responseData = response.data[0]
            setProductData(responseData)
            if (responseData.hasVariants){
                const size = Object.keys(responseData.variants)[0] 
                setActiveSize(size)
                const color = Object.keys(responseData.variants[size])[0]
                setActiveColor(color)
                if (responseData.variants[size][color].stock < 1){
                    setOutOfStock(true)
                }
            }
            const similar = products.filter(each => each.productCategory === responseData.productCategory)
            setSimilerProducts(similar)
            if (responseData.productImages.length !== 0) {
                setActiveImg(responseData.productImages[0])
            }
            
            setStatus('SUCCESS')
        }
        catch (e) {
            setStatus('FAILED')
        }
    }

    // useEffect(() => {
    //     getProduct()
    // }, [])

    const onClickSimilarProduct = (productId) => {
        setProductId(productId)
        const [product] = products.filter(each => each.productId === productId)
        setProductData(product)
        setActiveImg(product.productImages[0])
    }


    const onClickAddToWishList = () => {
        if (productData.hasVariants) {
            const updatedData = { ...productData, size: activeSize, gst: categoryData.gst, color: activeColor, onePiecePrice: productData.variants[activeSize][activeColor].price }
            dispatch(addToWishlist(updatedData))
        } else {
            dispatch(addToWishlist({...productData, gst: categoryData.gst, onePiecePrice: (productData.productPrice || productData.productdiscountPrice) ? productData.productdiscountPrice : productData.productPrice}))
        }
    }

    const onClickRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(productId))
    }


    const increaseCount = () => {
        if (productData.hasVariants){
            dispatch(increaseProductCount({productId, size: activeSize, color: activeColor}))
        }
        else{
            dispatch(increaseProductCount({productId}))
        }
        }

    const decreaseCount = () => {
        if (productData.hasVariants){
            dispatch(decreaseProductCount({productId, hasVariants: true, size: activeSize, color: activeColor}))
        }
        else{
            dispatch(decreaseProductCount({productId, hasVariants: false}))
        }
    }

    const onClickAddToCart = () => {
        console.log(categoryData)
        const onePiecePrice = productData.hasVariants ? productData.variants[activeSize][activeColor].price : productData.productdiscountPrice ? productData.productdiscountPrice : productData.productPrice
        let updatedProduct = { ...productData, productCount: 1, shopId: shopId, gst: categoryData.gst, onePiecePrice, checked: true }
        if (productData.hasVariants){
            updatedProduct = {...updatedProduct, size: activeSize, color: activeColor, checked: true}
        }
        dispatch(addToCart(updatedProduct))
    }

    const onClickColor = (color) => {
        setActiveColor(color)
        if (productData.variants[activeSize][color].stock < 1){
            setOutOfStock(true)
        }else{
            setOutOfStock(false)
        }
    }

    const onClickSetSize = (BtnTxt) => {
        setActiveSize(BtnTxt)
        const color = Object.keys(productData.variants[BtnTxt])[0]
        setActiveColor(color)
        if (productData.variants[BtnTxt][color].stock < 1){
            setOutOfStock(true)
        }else{
            setOutOfStock(false)
        }
    }

    const onClickActiveImg = (imgUrl) => {
        setActiveImg(imgUrl)
    }

    const renderFailureView = () => (
        <div className="failure-container">
            <h1>Something Was Wrong Please Tryagain</h1>
            <button type="button" onClick={() => getProduct} >Try Again</button>
        </div>
    )

    const renderSuccessView = () => {
        const { productImages, productName, productDescription, productPrice, productdiscountPrice, hasVariants } = productData
        const miniDescription = (productDescription !== '' && productDescription !== undefined) && productDescription.split('.')[0] + "."
        let btnsArray
        let colorsArray
        if (hasVariants){
            btnsArray = Object.keys(productData.variants)
            colorsArray = Object.keys(productData.variants[activeSize])
        }

        return (
            <>
                <h1 className="product-name-h">{productName}</h1>
                <div className="container">
                    <div className="details-container">
                        <div>
                            <p className="product-mini-description">{(miniDescription.length > 100) ?  miniDescription.slice(0, 100) + '..' : miniDescription}</p>
                            {productData.hasVariants ? <>{(productData.variants[activeSize][activeColor].stock < 4) && <p className="limited-stock" style={{fontSize: '12px', color: 'red'}}>{`Only ${productData.variants[activeSize][activeColor].stock}pcs left`}</p>}</> : <>{(productData.productUnits < 4) && <p className="limited-stock" style={{fontSize: '12px', color: 'red'}}>{`Only ${productData.productUnits} pcs left`}</p>}</>}
                            <hr />
                            <div className="price-container">
                                {(productPrice && productdiscountPrice) && (
                                    <div>
                                        <div className="special-price-div">
                                            {hasVariants ? (<h1 className='discount-price'>₹ {productData.variants[activeSize][activeColor].price}</h1>):(<h1 className='discount-price'>₹ {productdiscountPrice}</h1>)}
                                            <p className='normal-price'>₹ <span className="strick">{productPrice}</span></p>
                                        </div>
                                    </div>
                                )}
                                {(productPrice && !productdiscountPrice) && <>{hasVariants ? (<h1 className='discount-price' style={{ marginTop: '18px' }}>₹ {productData.variants[activeSize][activeColor].price}</h1>):(<h1 className='discount-price' style={{ marginTop: '18px' }}>₹ {productPrice}</h1>)}</>}
                                {(!productPrice && productdiscountPrice) && <>{hasVariants ? (<h1 className='discount-price' style={{ marginTop: '18px' }}>₹ {productData.variants[activeSize][activeColor].price}</h1>):(<h1 className='discount-price' style={{ marginTop: '18px' }}>₹ {productdiscountPrice}</h1>)}</>}
                            </div>
                            <p className="price-note">Inclusive of all taxes <span style={{color: '#999999'}}>|</span> GST: {categoryData.gst}% <span style={{color: '#999999'}}>|</span> {storeData.cod && 'COD Availble'}</p>
                            {hasVariants && 
                            <>
                                <div className="size-btns-bg-container">
                                    <h1 className="size-h">Size's :</h1>
                                    <div className="size-btns-container">{btnsArray.map(each => <SizeBtn BtnTxt={each} setOutOfStock={setOutOfStock} key={each} active={activeSize} setActiveSize={onClickSetSize} />)}</div>
                                </div>
                                <div className="color-btn-bg-container">
                                    <h1 className="color-h">Color's :</h1>
                                    <div className="color-btns-container">{colorsArray.map(each => <ColorBtn colorCode={each} setOutOfStock={setOutOfStock} key={each} active={activeColor} activeSize={activeSize} onClickColor={onClickColor} />)}</div>
                                </div>
                            </>
                            }
                        </div>
                        <div className="cart-wishlist">
                            {wishlistIds.includes(productId) ? <button type="button" style={{backgroundColor: '#f5f5f5', color: '#0293A8', border: '2px solid #0293A8'}} onClick={onClickRemoveFromWishlist} className="cart">REMOVE FROM WISHLIST</button> : <button type="button" onClick={onClickAddToWishList} className="cart">ADD TO WISHLIST</button>}
                            {productData.hasVariants ? (
                                <>
                                    {((cartVariantsKeys.includes(activeSize)) && (cartVariants[activeSize].includes(activeColor))) ?  (
                                        <div className='count-controlls'>
                                            <button type="button" className='l-controll-btn' onClick={increaseCount}><AiOutlinePlus /></button>
                                            <p className='product-count'>{ProductCount}</p>
                                            <button type="button" className='r-controll-btn' onClick={decreaseCount}><AiOutlineMinus /></button>
                                        </div>) : 
                                        (<button disabled={(productData.productUnits < 1) || outOfStock} type="button" onClick={onClickAddToCart} className="cart" >
                                            ADD TO BAG
                                        </button>)
                                    }
                                </>
                                ):(
                                    <>
                                        {(cartProductsIds.includes(productId)) ?  (
                                        <div className='count-controlls'>
                                            <button type="button" className='l-controll-btn' onClick={increaseCount}><AiOutlinePlus /></button>
                                            <p className='product-count'>{ProductCount}</p>
                                            <button type="button" className='r-controll-btn' onClick={decreaseCount}><AiOutlineMinus /></button>
                                        </div>) : 
                                            (<button disabled={(productData.productUnits < 1) || outOfStock} type="button" onClick={onClickAddToCart} className={`cart ${(productData.productUnits < 1) && 'disabled'}`} >
                                            ADD TO BAG
                                        </button>)
                                    }
                                    </>
                            )}
                            
                        </div>
                    </div>
                    <div className="image-container">
                        <div className="main-img-bg-container">
                            {productImages.length !== 0 ? <img src={activeImg} alt="Product" className='product-main-image' /> : <img src="http://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg" alt="Product" className='product-main-image' />}
                        </div>
                        {productImages.length !== 0 && <ul className="img-tabs">{productImages.map((each, index) => <ProductImgTab imgUrl={each} activeImg={activeImg} onClickActiveImg={onClickActiveImg} key={index} />)}</ul>}
                    </div>
                </div>
                <div className="product-description">
                        <h2 className="product-title">Product Description</h2>
                        <hr className="horizontal-line"/>
                    <p className="description">
                        {productDescription ? productDescription : 'Description not available..'}
                    </p>
                </div>
                {similarProducts.length !== 0 && (
                    <div className="similar-products-container">
                        <h1 className="similar-products-h">Products You may like</h1>
                        <ul className="similar-products">
                            {similarProducts.map(each => <SimilarProduct product={each} onClickSimilarProduct={onClickSimilarProduct} currentProductID={productId} key={each.productId} />)}
                        </ul>
                    </div>
                )}
            </>
        )
    }

    const renderLoadingView = () => (
        <div className="product-loading-container">
            <Loader />
        </div>
    )

    const renderProduct = () => {
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

    return (
        renderProduct()
    )
}

export default Product