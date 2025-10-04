import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Storecontext } from "../../Context/Storecontext";
import "./verify.css";

const Verify = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const { url } = useContext(Storecontext);
  const navigate = useNavigate();
    const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");
      const verifyPayment = async () => {
        const response=await axios.post(url+"/api/order/verify",{success,orderId})
        if (response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
      }
      useEffect(()=>{
        verifyPayment();

      },[])
};

export default Verify;
