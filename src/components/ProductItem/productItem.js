import { Link, useNavigate } from "react-router-dom"
import { BsHeart, BsFillBasket2Fill, BsHeartFill } from "react-icons/bs"
import './productItem.scss'
import { useSelector, useDispatch } from "react-redux"
import { addToWishlist, removeFromWishlist } from "../../fetures/cart/cartSlice"
import imageNotAvailable from '../../images/picture-not-available.jpg'

const ProductItem = (props) => {
    const { productData } = props
    const { productId, productImages, productName, productCategory, productRibbon,productPrice, productdiscountPrice } = productData
    const { wishlistIds } = useSelector((state)=> state.cart)
    const path = `product/${productId}`
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    return (
        <li className='product-container'>
            <Link to={path}>
                <div className="img-container">
                
                    {productImages.length !== 0 ? <img src={productImages[0]} alt="Product" className='product-img' /> : <img src={imageNotAvailable} alt="Product" className='product-img' />}
                    {productRibbon && <p className="discounttag">{productRibbon}</p>}
                   {(!productRibbon && productdiscountPrice && productPrice) && <p className="discounttag">
                    {parseInt(((productPrice-productdiscountPrice)*100)/productPrice)}% OFF
                </p>}
                </div>
            </Link>
            <div className='product-details-container'>
                <div className='product-name-description-container'>
                    <div className='name-description-container'>
                        <h1 className='product-name'>{productName.slice(0, 17)}</h1>
                        <p className="product-caegory">{productCategory}</p>
                    </div>
                    {/* <div className="wishlist-buttons">
                        {wishlistIds.includes(productId) ?
                            <BsHeartFill color="red" className='heart-icon' onClick={() => dispatch(removeFromWishlist(productId))} /> :
                            <BsHeart className='heart-icon' onClick={() => dispatch(addToWishlist(productData))} />}
                    </div> */}
                </div>
                <div>
                    {(productPrice && productdiscountPrice) && (
                        <div className='price-container'>
                            <p className='product-normal-price'>₹ {productPrice}</p>
                            <h1 className='product-price'>₹ {productdiscountPrice}</h1>
                        </div>
                    )}
                    {(productPrice && !productdiscountPrice) && <h1 className='product-price' style={{fontSize:"1.3vw"}}>₹ {productPrice}</h1>}
                    {(!productPrice && productdiscountPrice) && <h1 className='product-price' style={{fontSize:"1.3vw"}}>₹ {productdiscountPrice}</h1>}
                </div>
            </div>
        </li>
    )
}

export default ProductItem