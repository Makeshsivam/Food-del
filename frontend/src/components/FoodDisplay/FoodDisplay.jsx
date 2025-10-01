import React, { useContext } from 'react'
import './FoodDisplay.css'
import { Storecontext } from '../../Context/Storecontext'
import Fooditem from '../FoodItem/Fooditem'

const FoodDisplay = ({category}) => {
    const {food_list}=useContext(Storecontext)
  return (
    <div className='food-display' id='food-display'>
        <h2>The best Dishes for You</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(category==="All"|| category===item.category){
                return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>

              }
            })}
        </div>
      
    </div>
  )
}

export default FoodDisplay
