import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderItem from "../OrderItem/orderItem";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginStatus, setUserData } from "../../fetures/user/userSlice";
import { getUserData, updateUserData, addAddress } from "../../fetchCalls/fetchRoutes";
import emptyCart from '../../images/emptycart.png'
import './profile.scss'
import SavedAddress from "./addressItem";

const contentConst = {
  profile: "PROFILE",
  editForm: "EDIT",
  history: "HISTORY",
  address: "ADDRESS"
}

const addressDataStructure = {
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    phoneNumber: ''
}

const Profile = () => {
  const {userData} = useSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState("PROFILE")
  const { name, phoneNumber, email, gender, DOB, location, alternateNumber, address, orders } = userData
  const copyData = userData
  const [formData, setFormData] = useState(copyData)
  const [loadingstatus, setLoadingStatus] = useState(false)
  const [addressForm, setAddressForm] = useState(false)
  const [addressData, setAddress] = useState(addressDataStructure)
  const [addressType, setAddressType] = useState('Home')
  const [useDefault, setDefault] = useState(false)
  const [showError, setErrorVisibulity] = useState(false)
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(false)
  const [error, setError] = useState('')
  let addressKeys
  if (address !== undefined || null){
    addressKeys = Object.keys(address)
  }
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

  async function loadUserData (){
      const {data} = await getUserData(email)
      data.orders.reverse()
      dispatch(setUserData(data))
  }

  useEffect(() => {
    loadUserData()
  }, [])

  const onClickLogout = () => {
    dispatch(changeLoginStatus())
    dispatch(setUserData({}))
    setPopup(false)
    setActiveTab();
    navigate('/')
  }

  const saveProfileChanges = async (e) => {
    e.preventDefault()
    setError("")
    setLoadingStatus(pre => true)
    if (loadingstatus !== true){
      const userData = {email: email, updatedData: formData}
      try {
        await updateUserData(userData)
        setLoadingStatus(false)
        setActiveTab(contentConst.profile)
        dispatch(setUserData(formData))
      } catch ({data}) {
        setError("Something was wrong")
        setLoadingStatus(false)
      }
    }
  }

  const updateUser = async () => {
        try {
            await addAddress(addressData, userData, addressType, useDefault)
            await loadUserData()
            setLoading(false)
            setAddressForm(false)
        } catch (e) {
            setError('Something was worng')
            setErrorVisibulity(true)
        }
  }
  
    const onClickAddAddress = async (e) => {
      e.preventDefault()
        if (addressData.fullName !== '') {
            if (addressData.address !== '') {
                if (addressData.city !== '') {
                    if (addressData.state !== '') {
                        if (addressData.country !== '') {
                            if (addressData.pincode !== '') {
                                if (addressData.pincode.length === 6) {
                                        if (addressData.phoneNumber !== '') {
                                            if (addressData.phoneNumber.length === 10) {
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
        setAddress({ ...addressData, 'phoneNumber': e.target.value })
    }

    const updatePincode = (e) => {
        setAddress({ ...addressData, 'pincode': e.target.value })
    }

    const updateState = (e) => {
        setAddress({ ...addressData, 'state': e.target.value })
    }

    const updateCity = (e) => {
        setAddress({ ...addressData, 'city': e.target.value })
    }

    const updateAddress = (e) => {
        setAddress({ ...addressData, 'address': e.target.value })
    }


    const updateFirstName = (e) => {
        setAddress({ ...addressData, 'fullName': e.target.value })
    }


  const onClickAddress = () => {
    setActiveTab(contentConst.address)
  }

  const onClickHistory = () => {
    setActiveTab(contentConst.history)
  }

  const onClickEdit = () => {
    setActiveTab(contentConst.editForm)
  }

  const onClickAccount = () => {
    setActiveTab(contentConst.profile)
  }

  const renderAddress = () => {
    return(
      <>
        {addressForm ?
          <>
            {loading ? <h1>Adding Address..</h1> :
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
                  {(userData.address && userData.address !== {}) && <button type="button" className="cancel-btn" onClick={() => setAddressForm(false)}>Cancel</button>}
                  <button type="submit" className={(userData.address && userData.address !== {}) ? "confirm-btn-hulf" : "confirm-btn"}>ADD ADDRESS</button>
                </div>
              </form>}
            </>
 :
          <div className="content-address">
            <div className="saved-addresses-bg-container">
              {
                address ? <ul className="saved-addresses-container">
                  {addressKeys.map(each => <SavedAddress addressData={address[each]} addressKey={each} key={each} />)}
                </ul> : <>No Address found..!</>
              }
        
            </div>
            <div className="bttns">
              <button type="button" onClick={() => setAddressForm(true)} className="add-address">ADD ANOTHER ADDRESS</button>
            </div>
          </div>}
        </>
    )
  }

    const renderHistory = () => {
    return(
      <div className="orders-container">
        <h1 className="orders-h">MY ORDER HISTORY ({orders.length} Items)</h1>
        {(orders.length !== 0) ? (
        <ul className="orders-container">
            {orders.map((eachOrder, index) => <OrderItem orderData={eachOrder} key={index} />)}
        </ul>) : 
        <div className="empty-orders">
          <img src={emptyCart} alt="empty cart" className="empty-cart" />
          <h1 className="empty-cart-h">You haven't placed an Order.</h1>
          <p className="empty-cart-p">Lets place some orders.</p>
          <Link to="/"><button type="button" className="empty-cart-btn">GO TO SHOP</button></Link>
        </div>}
      </div>
    )
  }

    const renderEditForm = () => {
    return(
      <div className="edit-profile-container">
        <h1 className="edit-profile-h">Edit Profile</h1>
          <form className="edit-form-container" onSubmit={saveProfileChanges}>
            <label htmlFor="phone">Mobile Number</label>
            <input type="number" id="phone" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}  />
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}  />
            <label htmlFor="email">E-Mail Address</label>
            <input type="email" disabled id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}  />
            <div className="gender-container">
              <button className={`gender-btn ${formData.gender === "MALE" && "active"}`} type="button" onClick={() => setFormData({...formData, gender: "MALE"})}>Male</button>
              <button className={`gender-btn ${formData.gender === "FEMALE" && "active"}`}  type="button" onClick={() => setFormData({...formData, gender: "FEMALE"})}>Female</button>
            </div>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={formData.DOB} onChange={(e) => setFormData({...formData, DOB: e.target.value})}  />
            <label htmlFor="phone">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}  />
            <label htmlFor="phone">Alternate Mobile Number</label>
            <input type="number" value={formData.alternateNumber} onChange={(e) => setFormData({...formData, alternateNumber: e.target.value})}  />
            <p className="error-note">{error}</p>
            {loadingstatus ? <button className="form-btn" >UPDATING..</button> : 
            <div className="edit-form-btns">
              <button type="button" className="form-btn cancel-btn" onClick={() =>{ setActiveTab(contentConst.profile); setFormData(userData)}}>Cancel</button>
              <button className="form-btn save-btn"  type="submit">Save</button>
            </div>}
          </form>
      </div>
    )
  }

  const renderProfile = () => {
    return(
      <div className="profile-container">
        <h1 className="profile-h">MY PROFILE</h1>
        <div className="profile-details">
          <div className="keys">
            <p className="key">Full Name</p>
            <p className="key">Mobile Number</p>
            <p className="key">Email ID</p>
            <p className="key">Gender</p>
            <p className="key">Date of Birth</p>
            <p className="key">Location</p>
            <p className="key">Alternate Mobile</p>
          </div>
          <div className="values">
            <p className="value">{name ? name : "- not added -"}</p>
            <p className="value">{phoneNumber ? phoneNumber : "- not added -"}</p>
            <p className="value">{email ? email : "- not added -"}</p>
            <p className="value">{gender ? gender : "- not added -"}</p>
            <p className="value">{DOB ? DOB : "- not added -"}</p>
            <p className="value">{location ? location : "- not added -"}</p>
            <p className="value">{alternateNumber ? alternateNumber : "- not added -"}</p>
          </div>
        </div>
        <div className="edit-btn-container">
          <button type="button" className="edit-btn" onClick={onClickEdit}>Edit</button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case contentConst.profile:
        return renderProfile();
      case contentConst.editForm:
        return renderEditForm()
      case contentConst.history:
        return renderHistory();
      case contentConst.address:
        return renderAddress();
      default:
        break;
    }
  }

  return (
    <div className="profile-bg-container">
      <div className="tabs-bg-container">
        <div className="tabs-container">
          <button type="button" onClick={onClickAccount} className={( activeTab === contentConst.profile || activeTab === contentConst.editForm ) ? "tab active-tab" : "tab"}>PROFILE</button>
          <button type="button" onClick={onClickAddress} className={(activeTab === contentConst.address) ? "tab active-tab" : "tab"}>ADDRESS</button>
          <button type="button" onClick={onClickHistory} className={(activeTab === contentConst.history) ? "tab active-tab" : "tab"}>HISTORY</button>
        </div>
        <button type="button" className="logout-btn" onClick={() => setPopup(true)}>Logout </button>
        {popup && <div className="popup-div">
          <h1 className="popup-h">Come back soon!</h1>
          <p >Would you like to logout ?</p>
          <div className="popup-btn-div">
            <button type="button" onClick={() => onClickLogout()} className="popup-btn yes">Yes</button>
            <button type="button" onClick={() => setPopup(false)} className="popup-btn">No</button>
          </div>
        </div>}
      </div>
      <hr className="p-vertical-line" />
      <div className="content-container">
        {!popup && renderContent()}
      </div>
    </div>
  )
}

export default Profile