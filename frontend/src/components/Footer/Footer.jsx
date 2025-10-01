import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footercontent-left">
                <img className='foot'src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dignissimos odio impedit. Facilis molestias ad odit exercitationem dolorem! Quaerat eum maiores, perferendis sed odio commodi at pariatur quae eos cum?</p>
                <div className="footersocial-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon }alt="" />
                </div>

            </div>
            <div className="footercontent-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>
            </div>
            <div className="footercontent-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>8148360766</li>
                    <li>makesh@mk2005gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copy-right">© 2025 Tomato.com. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
