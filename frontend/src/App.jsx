import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrde'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {
  const [showLoginPopup , setShowLoginPopup] = useState(false)
  return (
    <>
    {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
    <div className='app'>
      <Navbar setShowLoginPopup={setShowLoginPopup} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Cart' element={<Cart/>}></Route>
        <Route path='/order' element={<PlaceOrder/>}></Route>
      </Routes>
      
    </div>
    <Footer/>
    </>
    
  )
}

export default App
