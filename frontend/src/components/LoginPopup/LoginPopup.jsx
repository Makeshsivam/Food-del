import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLoginPopup}) => {
  const [currstate,setcurrstate]=useState("sign up")
  return (
    <div className='Login-Popup'>
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currstate}</h2>
          <img onClick={()=>setShowLoginPopup(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-icons">
          {currstate==='Login'?<></>:<input type="text" placeholder='Your Name' required/>}
          <input type="email" placeholder='Your Mail'  required/>
          <input type="password" placeholder='Password'  required/>
        </div>
        <button>{currstate==="sign up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By Continue iam agree to the term of use and privacy policy</p>
        </div>
        {currstate==='Login'?
        <p>Create a new account <span onClick={()=>setcurrstate("sign up")}>Click Here</span></p>
        :<p>Already have an account <span onClick={()=>setcurrstate("Login")}>Login Here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopup
