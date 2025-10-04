import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/verify'
import Myorders from './pages/Myorders/Myorders'

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
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/myorders' element={<Myorders/>}></Route>
      </Routes>
      
    </div>
    <Footer/>
    </>
    
  )
}

export default App
