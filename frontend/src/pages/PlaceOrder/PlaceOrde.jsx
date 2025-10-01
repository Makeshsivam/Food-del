import React, { useContext } from 'react'
import './PlaceOrder.css'
import { Storecontext } from '../../Context/Storecontext'

const PlaceOrder = () => {
    const {getTotalcartamount}=useContext(Storecontext);
  return (
    <form className="placeorder">
      <div className="placeorder-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalcartamount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalcartamount()===0?0:getTotalcartamount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to Payment</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
