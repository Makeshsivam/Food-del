import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad",
    });
    const onchangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler= async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
        const response =await axios.post(`${url}/api/food/add`,formData);
        if (response.data.SUCCESS){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad",});
                setImage(false);
                alert("Product Added Successfully");

            }
        else{
            alert("Error! Please try again.",response.data.message);
        }
    }
    return (
        <div className='Add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col"></div>
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onchangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onchangeHandler}  value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onchangeHandler} name="category" >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwhich">Sandwhich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pastha">Pastha</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onchangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-button'>ADD</button>
            </form>
        </div>
    )
}

export default Add
