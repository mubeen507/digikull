import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUserData } from "../../fetures/user/userSlice"
import { addAddress, getUserData } from "../../fetchCalls/fetchRoutes"
import { removeOrderPlacedItems, checkAll, removeChecked, moveToWishlist } from "../../fetures/cart/cartSlice"
import Header from "../Header/header"
import CartItem from "../CartItem/cartItem"
import { placeOrder } from "../../fetchCalls/fetchRoutes"
import {BsHeart} from "react-icons/bs";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import success from '../../images/true-icon.png'
import emptyCart from '../../images/emptycart.png'
// import Loader from "../Loading"
import LoadingAddress from "./LoadingAddress"
import add from "date-fns/add";
import AddressItem from "./addressItem"
import cod from '../../images/cod.png'
import pod from '../../images/pod.png'
import { TailSpin } from 'react-loader-spinner'
import './cart.scss'
import { useEffect } from "react"

const addressDataStructure = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    phoneNumber: ''
}

const contentConst = {
    cart: 'CART',
    address: 'ADDRESS',
    payment: 'PAYMENT',
    success: 'SUCCESS'
}

const Cart = () => {
    const [content, setContent] = useState('CART')
    const { cartProducts } = useSelector((state) => state.cart)
    const { userLogged, userData } = useSelector((state) => state.user)
    const { storeData } = useSelector((state) => state.store)
    const { copyrightMessage } = storeData.settings.footer
    const [address, setAddress] = useState(addressDataStructure)
    const [addressType, setAddressType] = useState('Home')
    const [useDefault, setDefault] = useState(false)
    const [error, setError] = useState('')
    const [showError, setErrorVisibulity] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState()
    const [transactionId, setTransactionId] = useState('')
    const [transactionError, setTransactionError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formStatus, setFormStatus] = useState(false)
    let addressKeys = []
    let activeKey = ''
    if (userData.addAddress !== {} && userData.address !== undefined){
        addressKeys = Object.keys(userData.address)
        activeKey = addressKeys[0]
        if (addressKeys.length !== 0){
            addressKeys.forEach(each => {
                if (userData.address[each].defaultAddress === true){
                    activeKey = each
                }
            })}
    }
    const [activeAddressKey, setActiveAddressKey] = useState(activeKey)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let activeAddress = ''
    if(userLogged && activeAddressKey !== ''){
        activeAddress = userData.address[activeAddressKey].fullAddress
    }
    const cartLength = cartProducts.length
    let cartItemError = false
    const checkList = cartProducts.filter(eachProduct => eachProduct.checked)
    checkList.forEach(each => {
        let outOfStock
        if (each.hasVariants) {
            outOfStock = each.productCount > each.variants[each.size][each.color].stock
        } else {
            outOfStock = each.productCount > each.productUnits
        }
        if (outOfStock) {
            cartItemError = true
        } else if (each.error) {
            cartItemError = true
        }
    })
    let selectedItemsLength = checkList.length
    let total = 0
    let gstTotal = 0
    let originaltotal = 0
    let discounttotal = 0;
    const activeCartProducts = cartProducts.filter(each => each.checked === true)
    if (activeCartProducts.length !== 0) {
        const eachTotal = activeCartProducts.map(each => {
            gstTotal = gstTotal + Math.round(((each.onePiecePrice / 100) * each.gst) * each.productCount)
            return each.productCount * each.onePiecePrice
        })
        total = eachTotal.reduce((tot, each) => tot + each)

        const eachOriginaltotal = activeCartProducts.map(each => {
            return each.productCount * each.productPrice
        })
        originaltotal = eachOriginaltotal.reduce((eachot, each) => eachot + each)
        discounttotal = originaltotal - total
    }

    const date = new Date()
    const expectedDeliveryDate = add(new Date(date), {days: 7}).toDateString().split(' ')

    useEffect(() => {
        if (activeCartProducts.length !== 0) {
            activeCartProducts.forEach(each => {
                gstTotal = gstTotal + Math.round(((each.onePiecePrice / 100) * each.gst) * each.productCount)
            })
        }
    })

    async function loadUserData (){
        try {
            const {data} = await getUserData(userData.email)
            data.orders.reverse()
            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }
    }

    const onClickConfirmOrder = async () => {
        if (paymentMethod === 'COD') {
            setLoading(true)
            try {
                const { data } = await placeOrder(activeAddress, userData, cartProducts, total, transactionId, paymentMethod)
                if (data.response) {
                    dispatch(removeOrderPlacedItems())
                    setContent(contentConst.success)
                }
                setLoading(false)
                } catch (e) {
                    console.log(e)
                    alert("SOMETHING WAS WORNG PLEASE TRY AGAIN")
                    setLoading(false)
                }
        } else {
            if (transactionId.length === 23) {
                setLoading(true)
                setTransactionError(false)
                try {
                    const { data } = await placeOrder(activeAddress, userData, cartProducts, total, transactionId, paymentMethod)
                    if (data.response) {
                        dispatch(removeOrderPlacedItems())
                        setContent(contentConst.success)
                    }
                    setLoading(false)
                } catch (e) {
                    console.log(e)
                    alert("SOMETHING WAS WORNG PLEASE TRY AGAIN")
                    setLoading(false)
                }
            } else {
                setTransactionError(true)
            }
        }
    }

    const updateUser = async () => {
        try {
            await addAddress(address, userData, addressType, useDefault)
            await loadUserData()
            setLoading(false)
            setFormStatus(false)
        } catch (e) {
            setError('Something was worng')
            setErrorVisibulity(true)
        }
    }


    const onClickAddAddress = async (e) => {
        e.preventDefault()
        if (address.fullName !== '') {
            if (address.address !== '') {
                if (address.city !== '') {
                    if (address.state !== '') {
                        if (address.country !== '') {
                            if (address.pincode !== '') {
                                if (address.pincode.length === 6) {
                                        if (address.phoneNumber !== '') {
                                            if (address.phoneNumber.length === 10) {
                                                setLoading(true)
                                                setError('')
                                                setErrorVisibulity(false)
                                                updateUser()
                                            } else {
                                                setError('Enter Valid Number')
                                                setErrorVisibulity(true)
                                            }
                                        } else {
                                            setError('Enter Mobile Number')
                                            setErrorVisibulity(true)
                                        }
                                } else {
                                    setError('Enter Valid Pincode')
                                    setErrorVisibulity(true)
                                }
                            } else {
                                setError('Enter Pincode')
                                setErrorVisibulity(true)
                            }
                        } else {
                            setError('Enter Country')
                            setErrorVisibulity(true)
                        }
                    } else {
                        setError('Enter State')
                        setErrorVisibulity(true)
                    }
                } else {
                    setError('Enter City')
                    setErrorVisibulity(true)
                }
            }
            else {
                setError('Enter address')
                setErrorVisibulity(true)
            }
        } else {
            setError('Enter Fullname')
            setErrorVisibulity(true)
        }
    }

    const updatePhoneNumber = (e) => {
        setAddress({ ...address, 'phoneNumber': e.target.value })
    }

    const updatePincode = (e) => {
        setAddress({ ...address, 'pincode': e.target.value })
    }

    const updateState = (e) => {
        setAddress({ ...address, 'state': e.target.value })
    }

    const updateCity = (e) => {
        setAddress({ ...address, 'city': e.target.value })
    }

    const updateAddress = (e) => {
        setAddress({ ...address, 'address': e.target.value })
    }


    const updateFirstName = (e) => {
        setAddress({ ...address, 'fullName': e.target.value })
    }

    const changeAddress = (addressKey) => {
        setActiveAddressKey(addressKey)
    }

    const changeFormStatus = () => {
        setFormStatus(true)
    }

    const onClickContiue = () => {
        if (!userLogged) {
            alert("PLEASE LOGIN TO CONFIRM YOUR ORDER")
            navigate('/login')
        } else {
            setContent(contentConst.address)
        }
    }

    const renderSuccessView = () => (
        <div className="success-view">
            <h1 className="success-heading">ORDER PLACED SUCCESSFULLY</h1>
            <img src={success} alt="success" className="success-img" />
            <Link to="/"><button className="continue-shoping-btn" type="button">CONTINUE SHOPPING</button></Link>
        </div>
    )

    const renderPaymentView = () => (
        <>
            {!paymentMethod ?
            <div className="payment-methods-con">
                <div onClick={() => setPaymentMethod('UPI')} className="payment-btn">
                        <h1 className="payment-type">PAY ONLINE {!storeData.cod && 'ONLY'}</h1>
                    <img src={pod} alt="pay on delivery" className="payment-img" />
                </div>
                    {storeData.cod && <div onClick={() => setPaymentMethod('COD')} className="payment-btn">
                        <h1 className="payment-type">CASH ON DELIVERY</h1>
                        <img src={cod} alt="cash on delivery" className="payment-img" />
                    </div>}
            </div> :
                <>
                    {paymentMethod === 'COD' ?
                        <div className="cod-bg-con">
                            <h1 className="cod-h">Please Be Available While Delivery.</h1>
                            <img src={cod} alt="cod" className="cod-img" />
                            <div className="buttons-con">{loading ? <TailSpin height={30} width={30} radius={9} color="#0293A8" /> : <><button type="button" onClick={() => setPaymentMethod()} className="cancel-btn">CANCEL</button><button type="button" onClick={onClickConfirmOrder} className="confirm-btn">CONFIRM</button></>}</div>
                        </div> :
                        <>
                            <hr className="horizontal-line"></hr>
                            <div className="payment-container">
                                <div className="qr-code">
                                    <h1 className="payment-heading">SCAN TO PAY OR CLICK TO REDIRECT</h1>
                                    <a href={`upi://pay?pa=${storeData.upiId}&amp;pn=PHONEPE&amp;cu=INR&amp;am=${total}`} className="upi-pay1"><div className="qr-bg-container"><img src={storeData.QRCode} alt="qrcode" className="qrcode" /></div></a>
                                    <a href={`upi://pay?pa=${storeData.upiId}&amp;pn=PHONEPE&amp;cu=INR&amp;am=${total}`} className="upi-pay1">{storeData.upiId}</a>
                                    <h1 className="total-amount">TOTAL AMOUNT : ₹ {total}</h1>
                                </div>
                                <div className="vertical-line"></div>
                                <div className="payment-details">
                                    <h5 className="order-summary">ORDER SUMMARY</h5>
                                    <h1 className="price-details">PRICE DETAILS</h1>
                                    <div className="bill">
                                        <div className="total-discount-amount">
                                            <div className="text">Total MRP</div>
                                            <div className="text">&#8377;{originaltotal}</div>
                                        </div>
                                        <div className="total-discount-amount">
                                            <div className="text">Discount</div>
                                            <div className="text-1">-&#8377;{discounttotal}</div>
                                        </div>
                                        <div className="total-discount-amount">
                                            <div className="text">Convenience Fee</div>
                                            <div className="text-1"><span style={{ color: "black" }}><del>&#8377;99</del></span>&nbsp;&nbsp;Free</div>
                                        </div>
                                        <hr></hr>
                                        <div className="total-discount-amount">
                                            <div className="totals">Total Amount</div>
                                            <div className="totals">&#8377;{total}</div>
                                        </div>
                                        <div className="transaction-container">
                                            <input className="full-width-input" placeholder="Transaction ID" type='text' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                                            {transactionError && <p className="error">PLEASE ENTER VALID TRANSACTION ID</p>}
                                            {transactionError && <p>Something Was Wrong</p>}
                                            {loading ? <button className="confirm-btn" type="button">Please wait..</button> : <button className="confirm-btn" onClick={onClickConfirmOrder} type="button">CONFIRM ORDER</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>}
        </>
    )

    const renderAddressFormView = () => (
                <>
                    <hr className="horizontal-line"></hr>
                    <div className="form-address-payment">
                        {(userData.address && userData.address !== {} && !formStatus) ? (
                            <div className="address-add-address-container">
                                <div className="address-bg-container">
                                    <ul className="address-container">
                                        {addressKeys.map(each => <AddressItem addressData={userData.address[each]} activeAddressKey={activeAddressKey} changeAddress={changeAddress} addressKey={each} key={each} />)}
                                    </ul>
                                    
                                </div>
                                <div className="bottom-btn-container">
                                    <button type="submit" onClick={changeFormStatus} className="confirm-btn">ADD ADDRESS</button>
                                </div>
                            </div>
                            
                        ) :(
                            <div className="form-container">
                                {loading ? (<div className="load"><LoadingAddress/></div>) : (
                                <form className="form" onSubmit={onClickAddAddress}>
                                    <h1 className="address-heading">CONTACT DETAILS</h1>
                                    {showError && <p className="address-form-error-msg">{error}</p>}
                                    <input type="text" onChange={updateFirstName} placeholder="Name" id="Address" value={address.firstName} className="full-width-input" />
                                    <input type="number" onChange={updatePhoneNumber} placeholder="Mobile Number" id="Address" value={address.phoneNumber} className="full-width-input" />
                                    <h1 className="address-heading">ADDRESS</h1>
                                    <input type="number" onChange={updatePincode} placeholder="Pincode" id="Address" value={address.pincode} className="full-width-input" />
                                    <input type="text" onChange={updateAddress} placeholder="Address(House no,Building,Street area)" id="Address" value={address.address} className="full-width-input" />
                                    <div className="form-two-line-container">
                                        <input type="text" onChange={updateCity} placeholder="City" id="city" value={address.city} className="hulf-Width-input" />
                                        <input type="text" onChange={updateState} placeholder="State" id="state" value={address.state} className="hulf-Width-input" />
                                    </div>
                                    <h2 className="save-address">Save Address as</h2>
                                    <div className="address-type-button">
                                        <button type="button" className={`select-btn ${addressType === "Home" && 'active'}`} onClick={() => setAddressType('Home')}>Home</button>
                                        <button type="button" className={`select-btn ${addressType === "Work" && 'active'}`} onClick={() => setAddressType('Work')}>Work</button>
                                    </div>
                                    <div className="default-address">
                                        <input type="checkbox" id="address-default" className="checkbox" checked={useDefault} onChange={() => setDefault(prev => !prev)} />
                                        <label htmlFor="address-default" className="save-text">  Make this my default address</label>
                                    </div>
                                    <div className="bottom-btns-container">
                                        {(userData.address && userData.address !== {}) && <button type="button" className="cancel-btn" onClick={() => setFormStatus(false)}>Cancel</button>}
                                        <button type="submit" className={(userData.address && userData.address !== {}) ? "confirm-btn-hulf" : "confirm-btn"}>ADD ADDRESS</button>
                                    </div>
                                </form>
                                )}
                            </div>
                        )}
                        <div className="vertical-line"></div>
                        <div className="payment-details">
                            <p>Estimated Delivery by {`${expectedDeliveryDate[2]}th ${expectedDeliveryDate[1]} ${expectedDeliveryDate[3]}`}</p>
                            <h1 className="price-details">PRICE DETAILS</h1>
                            <div className="bill">
                                <div className="total-discount-amount">
                                    <div className="text">Total MRP</div>
                                    <div className="text">&#8377;{originaltotal}</div>
                                </div>
                                <div className="total-discount-amount">
                                    <div className="text">Discount</div>
                                    <div className="text-1">-&#8377;{discounttotal}</div>
                                </div>
                                <div className="total-discount-amount">
                                    <div className="text">Convenience Fee</div>
                                    <div className="text-1"><span style={{color:"black"}}><del>&#8377;99</del></span>&nbsp;&nbsp;Free</div>
                                </div>
                                <hr></hr>
                                <div className="total-discount-amount">
                                    <div className="totals">Total Amount</div>
                                    <div className="totals">&#8377;{total}</div>
                                </div>
                                <div className="bottom-btn-container">
                            <button type="button" disabled={activeAddressKey === "" || activeAddressKey === undefined || cartItemError} className={`continue-btn ${(activeAddressKey === "" || activeAddressKey === undefined || cartItemError) && 'disabled'}`} onClick={() => setContent(contentConst.payment)}>CONFIRM ADDRESS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        
    )

    const renderCartView = () => (
        <>
            {cartProducts.length === 0 ? (
                <div className="empty-cart-container">
                    <img src={emptyCart} alt="empty cart" className="empty-cart-img" />
                    <h1 className="empty-cart-heading">
                        Hey, it feels so light!
                    </h1>
                    <p className="cart-subheading">There’s nothing in your bag. Lets add some items</p>
                    <Link to="/wishlist"><button type="button" className="wishlist-btn">ADD ITEMS FROM WISHLIST</button></Link>
                </div>
            ) : (
                <>
                    <hr className="horizontal-line"></hr>
                    <div className="cart-items-bg-container">
                        <div className="cart-items-container">
                            <div className="cart-items-top-section">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="items" className="checkbox" checked={selectedItemsLength === cartLength} onChange={() => dispatch(checkAll())} />
                                    <label htmlFor="items" className="lable-text">{selectedItemsLength} / {cartLength} Items Selected</label>
                                </div>
                                <div className="rm-mtw-btns">
                                    <button type="button" className="rm-btn" onClick={() => dispatch(removeChecked())}>REMOVE</button>
                                    <button type="button" className="mtw-btn" onClick={() => dispatch(moveToWishlist())} >MOVE TO WISHLIST</button>
                                </div>
                            </div>
                            <ul className="cart-items">
                                {cartProducts.map((eachCartItem, index) => <CartItem cartItemData={eachCartItem} key={index} />)}
                            </ul>
                            
                            <div className="wishlist-button">
                            <Link to="/wishlist">
                                <div className="wishlistbtn"><p className="text-wish">Add more from Wishlist </p>
                                    <BsHeart/>
                                </div>
                                </Link>
                            </div>
                            
                        </div>
                        <hr className="vertical-line"/>
                        <div className="address-payment-details">
                            <div className="selected-address-container">
                                <p className="address">Deliver to : {activeAddress !== '' ? <span className="address-text">{`${activeAddress}`}</span>  : "Address Not Found..!"}</p>
                            </div>
                            <div className="payment-details">
                                <h1 className="price-details">PRICE DETAILS</h1>
                                <div className="bill">
                                    <div className="total-discount-amount">
                                        <div className="text">Total MRP</div>
                                        <div className="text">&#8377;{originaltotal}</div>
                                    </div>
                                    <div className="total-discount-amount">
                                        <div className="text">Discount</div>
                                        <div className="text-1">&#8377;{discounttotal}</div>
                                    </div>
                                    <div className="total-discount-amount">
                                        <div className="text">Convenience Fee</div>
                                        <div className="text-1"><span style={{color:"black"}}><del>&#8377;99</del></span>&nbsp;&nbsp;Free</div>
                                        </div>
                                    <div className="total-discount-amount">
                                        <div className="text">GST</div>
                                        <div className="text-1">&#8377;{gstTotal}</div>
                                    </div>
                                    <hr />
                                    <div className="total-discount-amount">
                                        <div className="totals">Total Amount</div>
                                        <div className="totals">&#8377;{total}</div>
                                    </div>
                                </div>
                                <div className="bottom-btn-container">
                                    <button type="submit" disabled={(selectedItemsLength === 0) || cartItemError} className={`confirm-btn ${(selectedItemsLength === 0 || cartItemError) && 'disabled'}`} onClick={onClickContiue}>PLACE ORDER</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

        </>
    )

    const renderContent = () => {
        switch (content) {
            case contentConst.cart:
                return renderCartView()
            case contentConst.address:
                return renderAddressFormView()
            case contentConst.payment:
                return renderPaymentView()
            case contentConst.success:
                return renderSuccessView()
            default:
                break;
        }
    }

    return (
        <div className="cart-container">
            <Header />
            <div className="progressBar">
                <h1 className={`progress-item ${content === contentConst.cart && 'active'}`} onClick={() => setContent(contentConst.cart)}>Bag</h1><hr className="dash-line" /><h1 className={`progress-item ${content === contentConst.address && 'active'}`} onClick={() => {if(selectedItemsLength !== 0 && userLogged && !cartItemError) { setContent(contentConst.address)}}}>Address</h1><hr className="dash-line" /><h1 className={`progress-item ${content === contentConst.payment && 'active'}`} onClick={() =>{if((selectedItemsLength !== 0 && !cartItemError) && userLogged && activeAddressKey !== undefined){ setContent(contentConst.payment)}}} >Payment</h1>
            </div>
            {renderContent()}
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
    )
}

export default Cart