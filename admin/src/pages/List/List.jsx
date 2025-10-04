import React, { useEffect } from 'react'
import "./List.css"
import axios from 'axios'
const List = ({url}) => {
  const [list, setList] = React.useState([])
  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);
    if (response.data.SUCCESS) {
      setList(response.data.data)
    }
  }

  const removeFood = async(id)=>{
    const response = await axios.post(`${url}/api/food/remove/`,{id:id})
    await fetchlist();
    if(response.data.SUCCESS){
      alert("Food Removed Successfully")
    }
    else{
      alert("Error While Removing Food")
    } 
  }
  useEffect(() => {
    fetchlist();
  }, [])
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)}>x</p>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default List
