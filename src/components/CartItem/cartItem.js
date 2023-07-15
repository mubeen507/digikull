import { increaseProductCount, decreaseProductCount, changeCheckStatus, removeProductFromCart } from "../../fetures/cart/cartSlice"
import { useDispatch } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {RxCross2} from "react-icons/rx"
import add from "date-fns/add";
import './cartItem.scss'

const CartItem = ({ cartItemData }) => {
    const {shopId, productId, productImages, variants, productName, productUnits, productDescription, hasVariants, size, color, checked, productCount, onePiecePrice} = cartItemData
    let miniDescription = "";
    if (productDescription){
       miniDescription = productDescription.split('.')[0] + "."
    }
    if (miniDescription.length > 60){
        miniDescription = miniDescription.slice(0, 49) + '..'
    }
    let outOfStock
    let error = cartItemData.error
    if (hasVariants) {
        outOfStock = productCount > variants[size][color].stock
    } else {
        outOfStock = productCount > productUnits
    }
    
    const dispatch = useDispatch()
    const date = new Date()
    const expectedDeliveryDates = add(new Date(date), {days: 6}).toDateString().split(' ')

    const increaseCount = () => {
        if (hasVariants){
            dispatch(increaseProductCount({productId, hasVariants, size, color}))
        }else{
            dispatch(increaseProductCount({productId}))
        }
        
    }

    const decreaseCount = () => {
        if (hasVariants){
            dispatch(decreaseProductCount({productId, hasVariants, size, color}))
        }else{
            dispatch(decreaseProductCount({productId}))
        }
    }

    const removeProduct = () => {
        if (hasVariants){
            dispatch(removeProductFromCart({productId, hasVariants, size, color}))
        }else{
            dispatch(removeProductFromCart({productId}))
        }
    }


    return (
        <li className='cart-item'>
            <div className='cart-item-img-details-container'>
            <div className="cart-item-image">
                {productImages.length !== 0 ? <img src={productImages[0]} alt="Product" className='cart-item-image' /> : <img src="http://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg" alt="Product" className='cart-item-image' /> 
                }
                <div className="tick-box">
                            <input type="checkbox" id="address-default" checked={checked} className="checkbox" onChange={() => dispatch(changeCheckStatus(cartItemData))} />
                        </div>
                        </div>

                <div className='cart-item-details-container'>
                    <h1 className='product-name'>{productName.length > 17 ? productName.slice(0, 17) + '..' : productName}</h1>
                    <p className="mini-desc">{miniDescription}</p>
                    <div className="size-color-shop-contollers-container">
                        <div className="size-color-shop-container">
                            {hasVariants ? <div className="size-color-container"><div className="size-container"><p className="size-h">Size :</p><p className="size">{size}</p></div><div className="color-container"><p className="color-h">Color :</p><div className="Color-ind" style={{backgroundColor: `${color}`}}></div></div></div> : <p className="seller-name">Sold by: {shopId}</p>}
                        </div>
                    </div>
                    <div className='count-controlls'>
                            <p className="qnt">Qnt:</p>
                            <AiOutlinePlus className='controll-btn' onClick={increaseCount} />
                            <p className='product-count'>{productCount}</p>
                            <AiOutlineMinus className='controll-btn' onClick={decreaseCount} />
                    </div>
                    <p className='product-price'>Rs : {onePiecePrice}</p>
                    {(outOfStock || error) ? <p className="out-of-stock">{error ? error : 'OUT OF STOCK' }</p> : <p className="delivery-date">Delivery till: {`${expectedDeliveryDates[2]}th ${expectedDeliveryDates[1]} ${expectedDeliveryDates[3]}`}</p>}
                </div>
            </div>
            <h1 onClick={removeProduct} className="delete-icon"><RxCross2 style={{fontWeight:"bold"}}/></h1>
        </li>

    )
}

export default CartItem