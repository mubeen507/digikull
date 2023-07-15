import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {RxCross2} from "react-icons/rx";
import { addToCart, removeFromWishlist } from "../../fetures/cart/cartSlice"
import imageNotAvailable from '../../images/picture-not-available.jpg'
import './WishlistProduct.scss'

const ProductItem = (props) => {
    const { storeData } = useSelector(state => state.store)
    const {shopId} = storeData
    const { productData } = props
    const { productId, productImages, productName, onePiecePrice, productCategory, productPrice, productdiscountPrice } = productData
    const path = `/product/${productId}`
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartProducts } = useSelector((state) => state.cart)
    const cartProductsIds = cartProducts.map(each => each.productId)
   
    return (
        <li className='w-product-container'>
            <div className="wishlistbuttons">
                <RxCross2  className='cross-icon' onClick={() => dispatch(removeFromWishlist(productId))} /> 
            </div>
            <Link to={path}>
                <div className="w-img-container">
                    {productImages.length !== 0 ? <img src={productImages[0]} alt="Product" className='w-product-img' /> : <img src={imageNotAvailable} alt="Product" className='product-img' />}
                </div>
            </Link>
            <div className='w-product-details-container'>
                <div className='w-product-name-description-container'>
                    <div className='w-name-description-container'>
                        <h1 className='w-product-name'>{productName}<br></br><span className="w-product-category">{productCategory}</span></h1>
                    </div>

                </div>
                <div>
                    {(productPrice && productdiscountPrice) && (
                        <div className='w-price-container'>
                            <p className='w-product-normal-price'>₹ {productPrice}</p>
                            <h1 className='w-product-price'>₹ {onePiecePrice}</h1>
                        </div>
                    )}
                    {((productPrice && !productdiscountPrice) || (!productPrice && !productdiscountPrice)) && <h1 className='w-product-price' style={{fontSize:"1.3vw"}}>₹ {onePiecePrice}</h1>}
                    {!cartProductsIds.includes(productId) ? <button type="button" className="wishlist-btn" onClick={() => { dispatch(addToCart({ ...productData, checked: true, productCount: 1, shopId: shopId })); dispatch(removeFromWishlist(productId)) }}>ADD TO BAG</button> : <button type="button" className="wishlist-btn" onClick={() => navigate('/cart')}>GO TO CART</button> }
                </div>
            </div>
        </li>
    )
}

export default ProductItem