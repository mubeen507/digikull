import React from "react";
import Logo from "../../images/land-logo.png";
import editor3 from "../../images/editor3.png";
import editor4 from "../../images/editor4.png";
import editor5 from "../../images/editor5.png";
import { AiOutlineInstagram, AiFillYoutube, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";
import editor from "../../images/Editor2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blog41 from "../../images/blog41.png";
import blog42 from "../../images/blog42.png";
import blog43 from "../../images/blog43.png";
import bg1 from "../../images/blogbg1.png";
import img1 from "../../images/iPad Pro.svg";
import img2 from "../../images/iPhone 13 Pro Max.png";
import path from "../../images/path.png";

import "./statichome.scss";
const StaticHomeNew = () => {
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
          <a href="#features" className="link">
            Features
          </a>
          <a href="#app" className="link">
            The Store App
          </a>
          <a href="#tools" className="link">
            Tools
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
          <a href="#features" className="link tab">
            Features
          </a>
          <a href="#app" className="link tab">
            The Store App
          </a>
          <a href="#tools" className="link tab">
            Tools
          </a>
        </div>
      )}
      <div className="top-section" id="home">
        <img src={bg1} alt="bg" className="blog-1-bg-imgage" />
        <h1 className="digistall-h">Digistall</h1>
        <p className="tagline">Your Gateway to E-Commerce</p>
        <div className="belownavimg">
          <img src={img1} alt="blog-1" className="image-1" />
          <img src={img2} alt="blog-1" className="image-2" />
        </div>
        <div className="path-block">
          <div>
            <img src={path} alt="path" className="path-img" />
          </div>
          <div className="path-block-right">
            <h1 className="path-block-right-h">
              Create your
              <br />
              website
            </h1>
            <p className="path-block-tag">In Four Simple Steps!</p>
            <a href="https://admin.digistall.in">
              <button type="button" className="join-button">
                Try For Free Now
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="ssecond">
        <div className="features" id="features">
          <div className="feature">
            <img src={blog41} alt="feature" className="feature-img" />
            <h1>High Speed Performance</h1>
            <p>
              We assure you a hassle free web app building experience, with
              maximum productivity.
            </p>
          </div>
          <div className="feature">
            <img src={blog42} alt="feature" className="feature-img" />
            <h1>24/7 Online Support</h1>
            <p>
              Our team will be present 24/7 to help you build your store,
              resolve your queries.
            </p>
          </div>
          <div className="feature">
            <img src={blog43} alt="feature" className="feature-img" />
            <h1>Easy to Use Services</h1>
            <p>
              Just a few click to your way out and our editor will help you
              build your store.
            </p>
          </div>
        </div>
      </div>
      <div className="sProftools">
        <div className="sprofleft">
          <div className="tools-context" id="tools">
            <h1>Professional</h1>
            <h1>Tools</h1>
            <p className="tools-tag">
              Be more professional and socially
              <br />
              active with the tools we offer.
            </p>
            <div>
              <div className="tool">
                <div className="num">1</div>{" "}
                <p className="tool-name">Business Card</p>
              </div>
              <div className="tool">
                <div className="num">2</div>{" "}
                <p className="tool-name">Social media post</p>
              </div>
              <div className="tool">
                <div className="num">3</div>{" "}
                <p className="tool-name">Business Stamp</p>
              </div>
              <div className="tool">
                <div className="num">4</div>{" "}
                <p className="tool-name">Billing form</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sprofright">
          <div className="sprofrightimg">
            <div className="sprofimg1">
              <img src={editor3}></img>
            </div>
            <div className="sprofimg2">
              <img src={editor4}></img>
            </div>
            <div className="sprofimg3">
              <img src={editor5}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="sblog">
        <div className="sblogleft">
          <img src={editor} />
        </div>
        <div className="sblogright">
          <div className="sbloghead">Try Our</div>
          <div className="sbloghead">Web Editor</div>
          <div className="sfeature">
            <ul>
              <li>build your store within minutes</li>
              <li>make it available to masses.</li>
              <li>increase your productivity</li>
              <li>add your items and we will do the rest</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sdownloadnow">
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
          <div className="squesbutton">
            <button>Download Now</button>
          </div>
        </div>
      </div>
      <div className="swhoarewe">
        <div className="squestion">Who are we?</div>
        <div className="squestext">
          We at Humans of Rural India Are building a SaaS based product for
          Rural Artisans , Self Help Groups and Farmer Producer Organization to
          reach directly to their Customer.
        </div>
        <div className="squesbutton">
          <button>Contact Us</button>
        </div>
      </div>
      <div className="sfooter">
        <div className="sfooterup">
          <div className="sup-left">
            <img src={Logo} />
            <div className="slefttext">
              <div className="sheads">Contact Us</div>
              <div className="stext">Email: humansofruralindia@gmail.com</div>
              <div className="sheads">Address</div>
              <div className="stext">7, Siyag House , Gotan 342902</div>
            </div>
          </div>
          <div className="sup-right">
            <div className="sheads">About Us</div>
            <div className="stextright">
              We at Humans of Rural India Are building a SaaS based product for
              Rural Artisans , Self Help Groups and Farmer Producer Organization
              to reach directly to their Customer.
            </div>
            <div className="sheads">Terms and Conditions</div>
            <div className="sheads">MSME Certificate</div>
            <div className="sheads">Company Certificate </div>
          </div>
        </div>
        <div className="sfooterbottom">
          <div className="sbottomleft">
            All Rights Reserved (C) | Digistall.in
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
      </div>
    </div>
  );
};
export default StaticHomeNew;
