import { createContext, useEffect, useState } from "react";
import {food_list} from "../assets/assets"
export const Storecontext=createContext(null)

const StorecontextProvider=(props)=>{
    const [cartitems,setcartitems]=useState({});
    const addtocart =(itemid)=>{
        if (!cartitems[itemid]){
            setcartitems((prev)=>({...prev,[itemid]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[itemid]:prev[itemid]+1}))
        }
    }
    const removefromcart=(itemid)=>{
        setcartitems((prev)=>({...prev,[itemid]:prev[itemid]-1}))
    }

    const getTotalcartamount=()=>{
        let totalamount=0;
        for (const item in cartitems){
            if (cartitems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item)
                totalamount+=iteminfo.price* cartitems[item];
            }
        }
        return totalamount
    }
    const contextvalue={
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        getTotalcartamount
    }
    useEffect(()=>{
        console.log(cartitems)
    },[cartitems])
    return (
        <Storecontext.Provider value={contextvalue}>
            {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;