import React from 'react'
import './ExploreMenu.css'
import { menu_list} from '../../assets/assets'

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='ExploreMenu' id='ExploreMenu'>
        <h1>Explore Menu</h1>
        <p className='ExploreMenu-text'>we have a tough job buddy choose the one food from our menu. yeah it is tough to select the best among the best dishes done it to kill the hungry buddy . a small task</p>
        <div className="ExploreMenu-List">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?'All':item.menu_name)}className="ExploreMenu-Listitems" key={index}>
                        <img className={category===item.menu_name?'active':'6'} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
      
    </div>
  )
}

export default ExploreMenu
