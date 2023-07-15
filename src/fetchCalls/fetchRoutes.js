import axios from "axios";
// const API_PATH = "https://backend.digistall.in"
const API_PATH = "http://localhost:5000"

export const getSubdomains = async () => {
    const response = await axios.get(`${API_PATH}/subdomains`)
    return response
}

export const getShopData = async (shopId) => {
    const response = await axios.post(`${API_PATH}/shop`, {'shopId': shopId})
    return response
}

export const getProductData = async (shopId, productId)=>{
  const response = await axios.post(`${API_PATH}/shop/product`, {'shopId': shopId, 'productId': productId})
  return response
}

export const getUserData = async (email) => {
    const response = await axios.post(`${API_PATH}/customer/getcustomer`, {'email': email})
    return response
}

export const updateUserData = async (userData) => {
    const response = await axios.post(`${API_PATH}/customer/updatecustomer`, userData)
    return response
}

export const sendOtp = async (email) => {
    const response = await axios.post(`${API_PATH}/customer/sendotp`, {'email': email})
    return response
}

export const sendLoginOtp = async (email) => {
    const response = await axios.post(`${API_PATH}/customer/sendloginotp`, {'email': email})
    return response
}

export const verifyOTP = async (userData) => {
    const response = await axios.post(`${API_PATH}/customer/verifyotp`, userData)
    return response
}

export const loginWithPassword = async (userData) => {
    const response = await axios.post(`${API_PATH}/customer/loginwithpass`, userData)
    return response
}

export const createUser = async (email, firstName, lasteName) => {
    const name = firstName + " " + lasteName
    const response = await axios.post(`${API_PATH}/customer/createcustomer`, {'email': email, 'name': name})
    return response
}

export const addAddress = async (addressObject, userData, addressType, makeDefault) => {
    const {email} = userData
    const {fullName, address, city, state, country, pincode, phoneNumber} = addressObject
    const fullAddress = `${fullName} , ${"+91-" + String(phoneNumber)}, ${address}, ${city}, ${state} - ${pincode}, ${country}`
    const addressData = {
        email, address: fullAddress, addressType, makeDefault
    }
    const response = await axios.post(`${API_PATH}/customer/updateaddress`, addressData)
    return response;
}

export const removeAddress = async (addressData) => {
    const response = await axios.post(`${API_PATH}/customer/deleteaddress`, addressData)
    return response
}

export const EditAddress = async (addressData) => {
    const response = await axios.post(`${API_PATH}/customer/editaddress`, addressData)
    return response
}

export const placeOrder = async (address, userData, products, total, transactionId, paymentMethod) => {
    const selectedProducts = products.filter(each => each.checked === true)
    const updatedProducts = selectedProducts.map(eachProduct => ({
        ...eachProduct,
        address,
        productImage: eachProduct.productImages[0],
        totalCartValue: total,
        transactionId: transactionId,
        email: userData.email,
        paymentMethod,
    }))
    const body = {
        "email": userData.email,
        "orders": updatedProducts
    }
    const response = await axios.post(`${API_PATH}/customer/addorder`, body)
    return response
}