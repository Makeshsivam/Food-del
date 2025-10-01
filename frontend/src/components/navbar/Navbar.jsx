import React,{useContext, useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { Storecontext } from '../../Context/Storecontext'
const Navbar = ({setShowLoginPopup}) => {
    const[menu , setMenu] = React.useState("home")
    const {getTotalcartamount}=useContext(Storecontext)
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
                <button onClick={() => setShowLoginPopup(true)}>
                    sign in
                </button>
            </div>
        </div>
    )
}

export default Navbar
