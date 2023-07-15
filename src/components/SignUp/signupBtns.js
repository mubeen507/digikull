import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './signUp.scss'

const SignupBtns = () => {
    const { userLogged } = useSelector((state) => state.user)
    const navigate = useNavigate()


    useEffect(() => {
        if (userLogged) {
            navigate('/')
        }
    })


    return (
        <div className="buttons-container">
            <div className="email-number-btns">
                <Link to="email" className="link"><button type="button" className="email-btn">Continue with Email</button></Link>
                <div className="or-container">
                    <hr className="hulf-line" />
                    <p className="or">or</p>
                    <hr className="hulf-line" />
                </div>
                <button type="button" onClick={() => alert('Sorry to say. We are working on it. Please try to sight up with your E-Mail')} className="email-btn">Continue with Phone Number</button>
            </div>
            <p className="already">Already have an Account? <Link to="/login" className="sign link">Login</Link></p>
        </div>
    )
}

export default SignupBtns