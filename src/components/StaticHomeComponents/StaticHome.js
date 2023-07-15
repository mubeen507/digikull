import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/land-logo.png";
import blog41 from "../../images/blog41.png";
import blog42 from "../../images/blog42.png";
import blog43 from "../../images/blog43.png";
import img2 from "../../images/iPhone 13 Pro Max.png";
import pic from "../../images/Gandhiji.jpg";
import desktopMobile from "../../images/desktopMobile.png";
import fifth from "../../images/fifth.png";
import second from "../../images/second.png";
import third from "../../images/third.png";
import fourth from "../../images/fourth.png";
import card from "../../images/card.jpg";
import ContactUs from "./Home/ContactUs";
import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";
import "./statichome.scss";
const StaticHome = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar" id="navbar">
        <img src={Logo} alt="logo" className="logo" />
        <div className="tabs-container">
          <a href="#home" className="link">
            Home
          </a>
          <a href="#aboutUs" className="link">
            About Us
          </a>
          <a href="#features" className="link">
            Features
          </a>
          <a href="#app" className="link">
            The Store App
          </a>
        </div>
        <GiHamburgerMenu
          className="burger-menu"
          onClick={() => setMenu(!menu)}
        />
      </nav>
      {menu && (
        <div className="tab-items">
          <a href="#home" className="link tab">
            Home
          </a>
          <a href="#aboutUs" className="link">
            About Us
          </a>
          <a href="#features" className="link tab">
            Features
          </a>
          <a href="#app" className="link tab">
            The Store App
          </a>
        </div>
      )}

      <div className="sheader">
        <div className="sheader-left">
          <div className="sheadertitle">DIGISTALL</div>
          <div className="sheadertext">
            Your Gateway
            <br />
            To E-Commerce
          </div>
          <button className="squesbutton">Get Started</button>
        </div>

        <div className="sheader-right">
          <img src={desktopMobile} alt="image" className="desktopMobile-img" />
        </div>
      </div>
      {/* getting started with 4 steps */}
      <div className="sgetting">
        <div>
          <h1 className="sgetting-title">Getting Started with 4 Steps</h1>
        </div>
        <div className="sgetting-started">
          <div className="sgetting-begin">START</div>
          <div className="sgetting-timeline">
            <div className="sgetting-checkpoint">
              <div>
                <img src={second} />
              </div>
            </div>
            <div className="sgetting-checkpoint">
              <div>
                <img src={third} />
              </div>
            </div>
            <div className="sgetting-checkpoint">
              <div>
                <img src={fourth} />
              </div>
            </div>
            <div className="sgetting-checkpoint">
              <div>
                <img src={fifth} />
              </div>
            </div>
          </div>
          <div className="sgetting-begin">FINISH</div>
        </div>
      </div>
      <div className="sdownloadnow" id="app">
        <div className="sdownloadleft">
          <div>
            <img src={img2}></img>
          </div>
        </div>

        <div className="sdownloadright">
          <div className="sdownloadtitle">Download Our App</div>
          <div className="sdownloadtext">
            Enjoy the App for more productivity
          </div>
          <button className="squesbutton">Download Now</button>
        </div>
      </div>

      <div className="scards">
        <div className="scards-title sdownloadtitle">Subscription Plans</div>
        <div className="scards-cards">
          <div className="scards-outer">
            <div className="scards-image">
              <img src={card} alt="cards" />
            </div>
            <p>Virtual Card</p>
            <div className="scards-card-name silver">Silver Card</div>
            <div className="scards-pricing">
              <div className="scards-pricing-left">
                <i class="fa fa-inr price-icon" aria-hidden="true" />
                <p>499</p>
              </div>
              <div className="scards-pricing-right">
                Per user
                <br />
                Per month
              </div>
            </div>

            <div className="scards-billed">
              Billed <i class="fa fa-inr" aria-hidden="true" /> 1499 every
              3months
            </div>

            <button className="squesbutton scards-btn">Subscribe Now</button>
          </div>
          <div className="scards-outer">
            <div className="scards-image">
              <img src={card} alt="cards" />
            </div>
            <p>Virtual Card</p>
            <div className="scards-card-name gold">Gold Card</div>
            <div className="scards-pricing">
              <div className="scards-pricing-left">
                <i class="fa fa-inr price-icon" aria-hidden="true" />
                <p>429</p>
              </div>
              <div className="scards-pricing-right">
                Per user
                <br />
                Per month
              </div>
            </div>

            <div className="scards-billed">
              Billed <i class="fa fa-inr" aria-hidden="true" /> 2599 every
              6months
            </div>
            <button className="squesbutton scards-btn">Subscribe Now</button>
          </div>
        </div>
      </div>
      <div className="sfeatures" id="features">
        <div className="sfeatures-title">FEATURES</div>
        <div className="sfeatures-boxes">
          <div className="sfeatures-box">
            <div className="sfeatures-box-logo">
              <img src={blog41} alt="feature" className="feature-img" />
            </div>
            <div className="sfeatures-box-title">High Speed Performance</div>
            <div className="sfeatures-box-text">
              We assure you a hassle free web app building experience, with
              maximum productivity.
            </div>
          </div>
          <div className="sfeatures-box">
            <div className="sfeatures-box-logo">
              <img src={blog42} alt="feature" className="feature-img" />
            </div>
            <div className="sfeatures-box-title">High Speed Performance</div>
            <div className="sfeatures-box-text">
              We assure you a hassle free web app building experience, with
              maximum productivity.
            </div>
          </div>
          <div className="sfeatures-box">
            <div className="sfeatures-box-logo">
              <img src={blog43} alt="feature" className="feature-img" />
            </div>
            <div className="sfeatures-box-title">High Speed Performance</div>
            <div className="sfeatures-box-text">
              We assure you a hassle free web app building experience, with
              maximum productivity.
            </div>
          </div>
        </div>
      </div>

      <div className="sabout" id="aboutUs">
        <div className="saboutustitle">ABOUT US</div>
        <div className="tcontainer">
          <div className="tbox1">
            <img className="teacher-pic" src={pic} alt="" />
          </div>
          <div className="tbox2">
            <p>
              The endeavor is a tribute to Gandhi’s vision of Gram Swaraj— a
              term coined by Mahatma Gandhi which encourages the conversion of
              every village into a self-efficient autonomous entity where all
              the systems and facilities for a dignified living are available.
              Gandhian ideology has always inspired and motivated humans of
              self-sufficiency and Swaraj is self-rule with perpetual effort
              towards sustainable growth and self-reliance. Gram Swaraj is
              decentralized, human-centric, and non-exploiting. It adheres to
              working towards a simple village economy and to achieve
              self-sufficiency.
            </p>
          </div>
        </div>
      </div>

      <ContactUs />
      <div className="sfooter">
        <div className="sfooterup">
          <div className="sfooterup-left">
            <div>
              <img src={Logo} alt="logo" className="sfooter-logo" />
            </div>
            <div className="sbottomright">
              <div className="insta social-icon">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/digistallapp/"
                  target="_blank"
                >
                  {" "}
                  <AiOutlineInstagram className="insta social-icon" />
                </a>
              </div>
              <div className="youtube social-icon">
                <a
                  href="https://www.youtube.com/@humansofruralindia1989"
                  target="_blank"
                >
                  {" "}
                  <AiFillYoutube className="youtube social-icon" />
                </a>
              </div>
              <div className="linkedin social-icon">
                <a
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/humans-of-rural-india/"
                  target="_blank"
                >
                  {" "}
                  <AiFillLinkedin className="linkedin social-icon" />
                </a>
              </div>
              <div className="facebook social-icon">
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com/humansofruralindia/"
                  target="_blank"
                >
                  {" "}
                  <AiFillFacebook className="facebook social-icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="sfooterup-right">
            {/* <div className="stext">Tel: +91 9874563210</div> */}
            <div className="stext">Email: humansofruralindia@gmail.com</div>
            <div className="stext">7 , Siyag House Gotan Tehsil </div>
            <div className="stext">Merta 342902</div>
            <div className="stext">Siyag Rural Market Private Limited</div>
            <div className="stext">CIN No. :- U52100RJ2021PTC077111</div>
            <div className="stext"> GSTIN :- 08ABGCS8909L1ZN</div>
          </div>
        </div>
        <div className="sfooterdown">
          <div className="sfooterdown-left sfooterbottom">
            All Rights Reserved (C) | Digistall.in
          </div>
          <div className="sfooterdown-right">
            <div className="sfooterbottom">Terms and Conditions</div>
            <div className="sfooterbottom">Privacy Policy</div>
            {/* <div className="sfooterbottom">CIN Number</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticHome;
