import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getItems } from '../services/ApiService';
import { Item } from '../components/Item';
import { MapComponent } from '../components/MapComponent';


export const Store = () => {

  const [items, setItems] = useState([])

  useEffect( () => {
    const fetchData = async () => {
      const result  = await getItems()
      setItems(result)
    }
    fetchData()
  },[])


  return (
    <div>
      <div>
      {items.map(item => {
        console.log('store item',item);
        return <Item key={item._id} item={item}></Item>
      })} 
      </div>
      <MapComponent items={items}></MapComponent>
      
    </div>
  )
}
