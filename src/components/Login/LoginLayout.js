import { Link, Outlet } from "react-router-dom";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsFacebook } from "react-icons/bs";
import digistallLogo from '../../images/land-logo.png'
import "./login.scss"

const LoginSheredLayout = () => {
    const {storeData} = useSelector((state) => state.store)
    const {settings} = storeData
    const {footer} = settings
    const { copyrightMessage} = footer
    return(
        <div className="Login-Container">
            <div className="login-header">
                <img src={digistallLogo} alt="logo" className="auth-logo" />
                <div className="signup-login-container">
                    <Link to="/signup" className="link"><p className="nav-link">Signup</p></Link>
                    <Link to="/login" className="link"><p className="nav-link active">Login</p></Link>
                </div>
            </div>
            <div className="body-Container">
                <div className="content-content">
                    <h1 className="content-heading">
                        Welcome
                    </h1>
                    <p className="content-writing">
                        Thousands of people are already a<br />part of our journey.<br />
                        Lets start yours.
                    </p>
                </div>
                <Outlet />
            </div>
            <div className="footer">
                <p className="copy-right">{copyrightMessage}</p>
                <div className="social-media-icons-container">
                    <AiOutlineInstagram className="insta social-icon icon" />
                    <AiFillYoutube className="youtube social-icon icon" />
                    <BsFacebook className="facebook social-icon icon" />
                </div>
            </div>
        </div>
    )
}

export default LoginSheredLayout