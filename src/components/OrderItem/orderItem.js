import add from "date-fns/add"
import "./orderItem.scss"

const formatter = new Intl.NumberFormat(undefined, {
  currency: 'INR',
  style: "currency"
})

const OrderItem = ({orderData}) => {
    const { orderId, productImage, productName, shopId, totalCartValue, productCount, orderStatus, address, date, orderNote } = orderData
    const expectedDeleiverDates = add(new Date(date), {days: 5}).toDateString().split(" ")
    const backgroundColor = orderId.slice(30,)
    
    let status = ''
    let statusColor = ''
    switch (orderStatus) {
        case 'PENDING':
            status = `Your order in Pending`
            statusColor = "#3a2cff"
            break
        case 'CONFIRMED':
            status = 'Your Order was Confirmed'
            statusColor = '#ff9500'
            break;
        case 'SHIPPED':
            status = !orderNote && `Expected Delivery date  ${expectedDeleiverDates[2]} ${expectedDeleiverDates[1]} ${expectedDeleiverDates[3]}`
            statusColor = "#00ff21"
            break
        case 'CANCEL':
            status = `Your order was Canceled`
            statusColor = "#ff0000"
            break
        default:
            break;
    }

    return(
        <li className="order-item" style={{backgroundColor: `#${backgroundColor}10`}}>
            <div className="product-details">
                <p className="product-name">{productName.length > 22 ? productName.slice(0, 22) + '..' : productName}</p>
                <p className="shop">Sold by : {shopId}</p>
                <p className="shop">Amount : <span style={{color: '#28a745'}}>{formatter.format(totalCartValue)}</span></p>
            </div>
            <div className="order-status-container">
                <p className="order-placed-at" style={{color: `${statusColor}` }}>{status}</p>
                {orderNote && <p className="order-note">{`Delivery Partner: ${orderNote.deliveryPartner}`}<br />{`ShippingID: ${orderNote.ShippingId}`}<br />{`Expected Delivery Date & Time: ${orderNote.deliveryDate}:${orderNote.deliveryTime}`}</p>}
            </div>
            <img src={productImage} alt="order-item" className="product-img" />
        </li>
    )
}

export default OrderItem