import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../fetures/user/userSlice";
import { removeAddress, getUserData } from "../../fetchCalls/fetchRoutes";
import './addressItem.scss'

const SavedAddress = ({addressData, onClickDelete, addressKey}) =>{
    const {addressType, fullAddress} = addressData
    const [loading, setLoadingStatus] = useState(false)
    const addressArray = fullAddress.split(',')
    const {userData} = useSelector(state => state.user)
    const {email} = userData
    const dispatch = useDispatch()

    async function loadUserData (){
      const {data} = await getUserData(email)
      data.orders.reverse()
      dispatch(setUserData(data))
    }

    const deleteAddress = async () => {
        setLoadingStatus(true)
        try {
            await removeAddress({email, addressKey})
            loadUserData()
        } catch (e) {
            setLoadingStatus(false)
        }
    }

    return(
        <li className="saved-address-item">
            <div className="saved-address-details">
                <p className="name">{addressArray[0]}</p>
                <p className="address-number">{addressArray[1]},</p>
                <p className="address">{addressArray[2]}, {addressArray[3]},</p>
                <p className="address">{addressArray[4]},</p>
                <p className="address">{addressArray[5]}  {addressArray[6]}.</p>
                <div className="address-type">{addressType}</div>
                <div className="butns">
                    {loading ? <button type="button" className="btns">Removing..</button> : <button type="button" onClick={deleteAddress} className="btns">Remove</button> }
                    <button type="button" className="btns" onClick={()=>alert("We are working on it. Sorry for the incovenience")}>Edit</button>
                </div>
            </div>
        </li>
    )
}

export default SavedAddress