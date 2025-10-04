import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { Storecontext } from '../../Context/Storecontext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalcartamount, Token, food_list, cartitems, url } = useContext(Storecontext);

    const [data, setdata] = useState({
        firstName: "",
        LastName: '',
        email: "",
        street: "",
        city: "",
        state: "",
        Zipcode: '',
        country: "",
        phone: ""
    })

    const onchangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }

    const handPlaceorder = async (event) => {
        event.preventDefault();
        let orderitems = [];
        food_list.forEach((item) => {
            if (cartitems[item._id] > 0) {
                let iteminfo = { ...item, quantity: cartitems[item._id] };
                orderitems.push(iteminfo);
            }
        })

        let orderdata = {
            userId: localStorage.getItem("userId"), // ✅ make sure you saved userId when logging in
            address: data,
            items: orderitems,
            amount: getTotalcartamount() + 2,
            payment: false
        }

        try {
            let response = await axios.post(url + "/api/order/place", orderdata, { headers: { Token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Order failed: " + response.data.message);
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    }

    const navigate=useNavigate();

    useEffect(()=>{
        if (!Token) {
            navigate('/cart')
        }
        else if(getTotalcartamount()===0){
            navigate('/cart')
        }
    })
    return (
        <form className="placeorder" onSubmit={handPlaceorder}>
            <div className="placeorder-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name="LastName" onChange={onchangehandler} value={data.LastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email Address' />
                <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='Zipcode' onChange={onchangehandler} value={data.Zipcode} type="text" placeholder='Zip Code' />
                    <input required name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='Phone' />
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
                            <p>${getTotalcartamount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed to Payment</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
