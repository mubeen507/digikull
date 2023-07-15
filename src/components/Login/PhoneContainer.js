import React from "react";
const PhoneContainer = () => {
    return (
        <div className="Container">
            <div className="buttons">
                <div className="email">
                    <h1 className="email-heading">Enter Your Phone Number</h1>
                    <input type="email" placeholder="Phone Number" id="email" className="full-width-input" />
                </div>
                <div className="bottom-btn-container">
                    <button type="button" className="btn">
                        Request OTP
                    </button>
                </div>
                <div className="already">Don't have an Account?<span className="sign">SIGNUP</span></div>
            </div>
        </div>
    )
}

export default PhoneContainer;