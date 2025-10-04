import React,{useContext, useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Storecontext } from '../../Context/Storecontext'
const Navbar = ({setShowLoginPopup}) => {
    const[menu , setMenu] = React.useState("home")
    const {getTotalcartamount, Token,setToken}=useContext(Storecontext)
    const navigte=useNavigate();
    const logout=()=>{
        localStorage.removeItem("Token")
        setToken('')
        navigte("/")
    }

    return (
        <div className='navbar'>
            <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""} >home</Link>
                <a href="#ExploreMenu"><li onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>menu</li></a>
                <a href="#app-download"><li onClick={() => setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li></a>
                <a href="#footer"><li  onClick={() => setMenu("contact us")}className={menu==="contact us"?"active":""}>contact us</li></a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalcartamount()===0?"":'dot'}></div>
                </div>
                {!Token?<button onClick={() => setShowLoginPopup(true)}>sign in</button>
                : <div  className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li onClick={()=>{navigte('/myorders')}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li><img src={assets.logout_icon} alt="" /><p onClick={logout}>Logout</p></li>
                    </ul>
                    </div>}
                
            </div>
        </div>
    )
}

export default Navbar
