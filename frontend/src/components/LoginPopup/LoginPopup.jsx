import React, {  useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Storecontext } from '../../Context/Storecontext'
import axios from 'axios'

const LoginPopup = ({setShowLoginPopup}) => {
  const {url,setToken}=useContext(Storecontext);

  const [currstate,setcurrstate]=useState("sign up")
  const [data,setdata]=useState({
    name:"",
    email:"",
    password:""
  })
  const onchangehandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setdata(data=>({...data,[name]:value}))
  }

  const onLogin=async(event)=>{
    event.preventDefault();
    let newurl=url;
    if (currstate==="Login"){
      newurl+="/api/user/login"
    }
    else{
      newurl+="/api/user/register"
    }
    const response=await axios.post(newurl,data);

    if (response.data.success){
      setToken(response.data.token);
      localStorage.setItem("Token",response.data.token);
      setShowLoginPopup(false)
    }
    else{
      alert(response.data.message)
      console.log(response)
    }
  }

  return (
    <div className='Login-Popup'>
      <form action="" className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currstate}</h2>
          <img onClick={()=>setShowLoginPopup(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-icons">
          {currstate==='Login'?<></>:<input name='name' onChange={onchangehandler} value={data.name} type="text" placeholder='Your Name' required/>}
          <input name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Your Mail'  required/>
          <input name='password' onChange={onchangehandler} value={data.password} type="password" placeholder='Password'  required/>
        </div>
        <button type='submit'>{currstate==="sign up"?"Create account":"Login"}</button>
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
