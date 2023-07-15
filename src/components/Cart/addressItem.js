const AddressItem = ({addressData, addressKey, activeAddressKey, changeAddress}) =>{
    const {addressType, fullAddress} = addressData
    const addressArray = fullAddress.split(',')

    return(
        <li className="address-item">
            <input type="checkbox" className="address-item-checkbox" id={`${addressKey}`} checked={activeAddressKey === addressKey} onChange={() => changeAddress(addressKey)} />
            <label htmlFor={`${addressKey}`}><div className="address-details"><p className="name">{addressArray[0]}</p><p className="address-number">{addressArray[1]},</p><p className="address">{addressArray[2]}, {addressArray[3]},</p><p className="address">{addressArray[4]},</p><p className="address">{addressArray[5]}  {addressArray[6]}.</p><button type="button" className="address-type">{addressType}</button></div></label>
        </li>
    )
}

export default AddressItem