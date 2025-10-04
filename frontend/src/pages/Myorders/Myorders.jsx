import React, { useContext, useEffect, useState } from 'react'
import "./Myorder.css"
import { Storecontext } from '../../Context/Storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = () => {
  const {url,Token}=useContext(Storecontext);
  const [data,setdata]=useState([]);
  const fetchorders=async()=>{
    const response=await axios.post(url+'/api/order/userorders',{},{headers:{Token}})
    setdata(response.data.data);
  }

  useEffect(()=>{
    if (Token) {
      fetchorders();
    }
  },[Token])
  return (
    <div className='myorders'>
      <h2>MY Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return(
            <div key={index} className='myorders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item,index)=>{
                if (index===order.items.length-1) {
                  return item.name + 'x'+item.quantity
                }
                else{
                  return item.name + 'x'+item.quantity+','
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchorders}>Track order</button>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default Myorders
