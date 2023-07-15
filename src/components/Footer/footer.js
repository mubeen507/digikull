import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useSelector } from "react-redux";
import './footer.scss'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const {storeData} = useSelector((state) => state.store)
    const {shopName, settings} = storeData
    const {footer} = settings
    const { about, address, copyrightMessage, facebookUrl, instgramUrl, youtubeUrl } = footer
    const navigate = useNavigate()

    const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, includedLanguages: 'en,hi,te,ta,pa,', autoDisplay: false, multilanguagePage: true }, 'google_translate_element')
  }

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [])

    return(
        <div className="footer-container">
            <div className="footer-top-section">
                <div className="about">
                    <h1 className="about-heading">{`About ${shopName.toUpperCase()}`}</h1>
                    <p className="contact-description">{about.slice(0, 150)}</p>
                </div>
                <div className="address-container">
                    <h1 className="address-heading">Address</h1>
                    <p className="address">{address}</p>
                    <a href="/terms" target="_blank" className="terms-heading">Terms And Conditions</a>
                    <a href="/msme" target="_blank" className="msme-certificate">MSME Certificate</a>
                    <div id="google_translate_element"></div>
                </div>
            </div>
            <hr className="line"/>
            <div className="footer-bottom-section">
                <p className="copy-right">{copyrightMessage}</p>
                <div className="social-media-icons-container">
                    <a href={instgramUrl.startsWith('https://') ? instgramUrl : `https://${instgramUrl}`} target="_blank" rel="noreferrer" className="insta social-icon">
                      <AiOutlineInstagram className="insta social-icon" />
                     </a>
                     <a  href={youtubeUrl.startsWith('https://') ? youtubeUrl : `https://${youtubeUrl}`} target="_blank" rel="noreferrer" className="youtube social-icon">
                      <AiFillYoutube className="youtube social-icon" />
                      </a>
                      <a href={facebookUrl.startsWith('https://') ? facebookUrl : `https://${facebookUrl}`} target="_blank" rel="noreferrer" className="facebook social-icon">
                    <BsFacebook className="facebook social-icon" />
                      </a>
                </div>
            </div>
        </div>
    )
}

export default Footer