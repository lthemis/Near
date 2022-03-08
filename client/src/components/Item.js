import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Item/Item.css"

export const Item = (props) => {
  const item = props.item;
  return (
    <div className='itemContainer'> This is item
      <div>
        <h1>{item.itemName}</h1>
        <p>{item.itemPrice}</p>
        <p>{item.categories}</p>
      </div>
      <img src={item.photoUrl} alt="itemPhoto"></img>
      <Link to={`/store/${item._id}`}>Product details</Link>
    </div>
  )
}
