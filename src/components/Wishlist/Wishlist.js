import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Header from "../Header/header"
import emptyCart from '../../images/emptycart.png'
import ProductItem from "./WishlistProductItem";
import './Wishlist.scss';

const Wishlist = () => {
    const { wishlist } = useSelector((state) => state.cart)
    const { storeData } = useSelector((state) => state.store)
    const { copyrightMessage } = storeData.settings.footer
    return (
        <div className="wishlist-container">
            <Header />
            <div className="wishlist-length">MY WISHLIST ({wishlist.length} items)</div>
            <div className="wishlist">
                {wishlist.length === 0 ? (
                    <div className="empty-wishlist-container">
                        <img src={emptyCart} alt="empty wishlist" className="empty-cart-img" />
                        <h1 className="empty-wishlist-heading">
                            Hey, it feels so light!
                        </h1>
                        <p className="wishlist-subheading">There’s nothing in your Wishlist. Lets add some items</p>
                        <Link to="/"><button type="button" className="shop-btn">GO TO SHOP</button></Link>
                    </div>
                ) : (
                    <>
                    <ul className='product'>
                        {wishlist.map(eachProduct => <ProductItem productData={eachProduct} key={eachProduct.productId} />)}
                    </ul>
                    </>
                )}
                <hr className="line" />
                <div className="footer-bottom-section">
                    <p className="copy-right">{copyrightMessage}</p>
                    <div className="social-media-icons-container">
                        <AiOutlineInstagram className="insta social-icon" />
                        <AiFillYoutube className="youtube social-icon" />
                        <BsFacebook className="facebook social-icon" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Wishlist;


