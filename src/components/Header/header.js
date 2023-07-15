import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import {FiShoppingBag} from "react-icons/fi"
import {RxPerson} from "react-icons/rx"
import {BiLogIn} from 'react-icons/bi'
import axios from "axios";
import './header.scss'

const host = window.location.host; // gets the full domain of the app
const [shopId] = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);

const Header = () => {
    const {storeData} = useSelector((state) => state.store)
    const {userLogged} = useSelector((state)=> state.user)
    const {cartProducts, wishlist} = useSelector((state) => state.cart)
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)
    const {settings } = storeData
    const { header } = settings
    const { phoneNumber, email, logo, shopName, isShopNameVisible, tagline, isTaglineVisible } = header
    // const shopCart = cartProducts.filter(each => each.shopId === shopId)

    const getWeatherRepo = () => {
      const options = {
            method: 'GET',
            url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
            params: {city: 'Bhimavaram'},
            headers: {
                'X-RapidAPI-Key': 'ff31d5df92msh2143f605b18c1d5p1025adjsn5e5e9d4dd20b',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
            };

            axios.request(options).then(function (response) {
                setWeather(response.data);
            }).catch(function (error) {
                console.error(error);
            });
    }

    const getMyLocation = () =>{
        fetch('https://geolocation-db.com/json/8d382830-904e-11ed-97d5-0de223189653')
        .then((res) => res.json())
        .then((data) => setLocation(data))
    }

    // console.log(location)
    // console.log(weather)

    return (
        <>
            <div className="Contact-Section">
                <p className="contact">{email}</p>
                <p className="contact">{phoneNumber}</p>
            </div>
            <div className='header-container'>
                <div className="logo-storename">
                    {logo ? 
                    <Link to='/' className='link'>
                        <img src={logo} alt="logo" className="header-logo" />
                    </Link> : 
                    <Link to='/' className='link'>
                        <img src="https://static.wixstatic.com/media/af85e3_304c4b578f0b477a941df6ecffc359c7~mv2.png/v1/fill/w_114,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PNG.png" alt="logo" className="header-logo" />
                    </Link>}
                    <Link to='/' className='link'>
                    <div>
                        {isShopNameVisible && <h1 className="store-name">{shopName}</h1>}
                        {/* {isTaglineVisible && <p className="tag-line">{tagline}</p>} */}
                    </div>
                    </Link>
                </div>
                {/* <button type="button" onClick={getMyLocation}>Get Location</button>
                <button type="button" onClick={getWeatherRepo}>Get Weather</button> */}
                <div className="profile-cart-container">
                    {!userLogged ?
                    <Link to='/login' className="link profile-container">
                        <BiLogIn className="icon" />
                        <p className="Login">Login</p>
                    </Link> : 
                    <Link to='/profile' className="link profile-container">
                        <RxPerson className="icon"  />
                        <p className="Login">Profile</p>
                    </Link>}
                    <Link to='/wishlist' className="link cart-div">
                        <BiHeart className="icon" />
                        <button className="cart-items-count" type="button">{wishlist.length}</button>
                        <p className="Login">Wishlist</p>
                    </Link>
                    <Link to='/cart' className="link cart-div">
                            <FiShoppingBag className="icon" />
                            <button className="cart-items-count" type="button">{cartProducts.length}</button>
                            <p className="login">Bag</p>
                    </Link>
                </div>
            </div>

        </>
    
    )
}

export default Header