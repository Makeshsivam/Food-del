import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const Storecontext=createContext(null)

const StorecontextProvider=(props)=>{
    const [cartitems,setcartitems]=useState({});
    const url="http://localhost:4000"
    const [Token,setToken]=useState('');
    const [food_list,setfood_list]=useState([])
    const addtocart = async(itemid)=>{
        if (!cartitems[itemid]){
            setcartitems((prev)=>({...prev,[itemid]:1}))
        }
        else{
            setcartitems((prev)=>({...prev,[itemid]:prev[itemid]+1}))
        }
        if (Token) {
            await axios.post(url + "/api/cart/add", { itemId: itemid }, { headers: { Token } });
            
        }
    }
    const removefromcart= async(itemid)=>{
        setcartitems((prev)=>({...prev,[itemid]:prev[itemid]-1}))

        if (Token) {
            await axios.post(url + "/api/cart/remove", { itemId: itemid }, { headers: { Token } });
            
        }
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


    const fetchfoodlist= async()=>{
        const response=await axios.get(url+"/api/food/list")
        setfood_list(response.data.data)
    }

    const loadcartdata= async(Token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{Token}});
        setcartitems(response.data.cartData)
    }

    useEffect(()=>{
       
        async function loadData() {
            await fetchfoodlist()
        
         if(localStorage.getItem("Token")){
            setToken(localStorage.getItem('Token'));
            await loadcartdata(localStorage.getItem("Token"))
        }
    }
        loadData();
    },[])
    const contextvalue={
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        getTotalcartamount,
        url,
        Token,
        setToken
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