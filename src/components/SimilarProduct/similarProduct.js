import { Link } from "react-router-dom"
// import { BsHeart, BsHeartFill } from "react-icons/bs"
import './similarProduct.scss'
// import { useSelector, useDispatch } from "react-redux"
// import { addToWishlist, removeFromWishlist } from "../../fetures/cart/cartSlice"

const SimilarProduct = (props) => {
    const {product,currentProductID, onClickSimilarProduct} = props
    const { productId, productImages, productCategory,productName, productPrice, productdiscountPrice } = product
    // const { wishlistIds } = useSelector((state)=> state.cart)
    // const dispatch = useDispatch()
    if (currentProductID === productId){
        return;
    }

    const getProduct = () => {
        onClickSimilarProduct(productId)
    }

    return(
            <li className="similar-product" onClick={getProduct}>
                <Link to={`/product/${productId}`} className="link">
                    <img src={productImages[0]} alt="product" className="similar-produc-img" />
                </Link>
                {!productdiscountPrice ? <div></div>:<div className="discounttag">
                    {parseInt(((productPrice-productdiscountPrice)*100)/productPrice)}% OFF
                </div>}
                <div className="similar-product-details">
                    <div className="heading_wishlist_icon">
                        <div>
                            <h1 className="similar-product-h">
                                {productName.slice(0, 20)}
                            </h1>
                            <p className="product-caegory" style={{color:"grey"}}>
                                {productCategory}
                            </p>
                        </div>
                        {/* <div className="wishlist-buttons">
                            {wishlistIds.includes(productId) ?
                                <BsHeartFill color="red" className='heart-icon' onClick={() => dispatch(removeFromWishlist(productId))} /> :
                                <BsHeart className='heart-icon' onClick={() => dispatch(addToWishlist(product))} />}
                        </div> */}
                    </div>
                    <div className="similar-product-price">
                        {(productPrice && productdiscountPrice) && (
                            <>
                                <p className='similar-product-normal-price'>₹{productPrice}</p>
                                <h1 className='similar-product-discount-price'>₹{productdiscountPrice}</h1>
                            </>
                        )}
                        <div className="similar-products-description">
                            {(productPrice && !productdiscountPrice) && <h1 className='similar-product-price' style={{fontSize:"1.3vw"}}>₹ {productPrice}</h1>}
                            {(!productPrice && productdiscountPrice) && <h1 className='similar-product-price' style={{fontSize:"1.3vw"}}>₹ {productdiscountPrice}</h1>}
                        </div>
                    </div>
                </div>
            </li>
    )
}

export default SimilarProduct