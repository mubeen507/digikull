import React from "react";
import { Link, useNavigate} from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import { sendLoginOtp, verifyOTP } from "../../fetchCalls/fetchRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, changeLoginStatus } from "../../fetures/user/userSlice";

const EmailLogin = () => {
    const { userLogged } = useSelector((state) => state.user)
    const emailRef = useRef(null)
    const [email, setEmail] = useState('')
    const [otpSent, setOtpStatus] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [error, setError] = useState('')
    const [OTP, setOtp] = useState(new Array(6).fill(''))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let hidenMail = ""
    if (otpSent){
        hidenMail = `${email.slice(0, 4)}****${email.slice(-13)}`
    }

    useEffect(() => {
        if (!otpSent){
            emailRef.current.focus()
        }
        if (userLogged) {
            navigate('/')
        }
    })

    const onClickVerify = async () => {
        let otp = ''
        OTP.forEach(each => otp = otp + each)
        if (otp.length === 6){
            setError('')
            setLoadingStatus(true)
            try {
                const userData = {email, otp,}
                const {data} = await verifyOTP(userData)
                const userDetails = data
                dispatch(setUserData(userDetails))
                dispatch(changeLoginStatus())
                setLoadingStatus(false)
            } catch (e) {
                setError(e.response.data)
                setLoadingStatus(false)
            }
        }else{
            setOtp(new Array(6).fill(""))
            setError('Enter OTP')
            setLoadingStatus(false)
        }
    }

    async function sendOtpAgain () {
        setLoadingStatus(true)
        setError('')
        try {
            await sendLoginOtp(email)
            setLoadingStatus(false)
        } catch (e) {
            setError('Something was wrong')
            setLoadingStatus(false)
        }
    }

    function changeFocus (target, index){
        if ( isNaN(target.value)){
            return false
        }
        setOtp([...OTP.map((v, ind) => (ind === index ? target.value : v))])
        if (target.nextSibling) {
            target.nextSibling.focus();
        }
    }

    const onClickSendOtp = async () => {
        const email = emailRef.current.value
        if (email.endsWith('.com')) {
            setLoadingStatus(true)
            setError('')
            try {
                const {data} = await sendLoginOtp(email)
                if (data.response === true){
                    setOtpStatus(true)
                    setEmail(email)
                    setLoadingStatus(false)
                }else{
                    setError('E-Mail Not found. Please SIGN UP')
                    setLoadingStatus(false)
                }
            } catch (e) {
                setError('Something was wrong. Please try again')
                setLoadingStatus(false)
            }
        } else {
            setError('Enter valid email')
        }
    }


    return (
        <div className="email-bg-Container">
            {!otpSent ? (
                <div className="email-container">
                    <div className="email-input-container">
                        <label htmlFor="email" className="email-heading">Enter Your Email</label>
                        <input id="email" type="email" ref={emailRef} className="email-input" />
                        {loadingStatus ? (<button className="rqs-btn">Please Wait..</button>) : (
                            <button type="button" onClick={onClickSendOtp} className="rqs-btn">
                                Request OTP
                            </button>
                        )}
                        <p className="error-msg">{error}</p>
                    </div>
                    <div className="already">Don't have an Account? <Link to="/signup" className="signup"><p>SIGNUP</p></Link></div>
                </div>
            ) : (
                 <div className="otp-bg-container">
                    <div className="otp-container">
                        <p className="otp-heading">We have sent a code to your email:<br />{hidenMail}</p>
                        <div className="Otp">
                            {OTP.map((each, index) => {
                                return(
                                    <input type="text" value={each} key={index} maxLength={1} name="otp" onChange={(e) => changeFocus(e.target, index)} onFocus={e => e.target.select()} className="otp-field" />
                                )
                            })}
                        </div>
                        {loadingStatus ? (<button className="ver-btn">Please Wait..</button>) : (
                            <button type="button" onClick={onClickVerify} className="ver-btn">
                            Verify
                            </button>
                        )}
                    </div>
                <div className="already">Didn't Receive the Code?<span className="signup" onClick={sendOtpAgain}>Resend</span></div>
                </div>
            )}            
        </div>
    )
}

export default EmailLogin;