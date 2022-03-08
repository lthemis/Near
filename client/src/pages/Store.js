import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getItems, getUser } from '../services/ApiService';
import { Item } from '../components/Item';
import { MapComponent } from '../components/MapComponent';
import { useAuth } from '../utils/auth';

export const Store = () => {

  const [items, setItems] = useState([])
  const [maxDistance, setMaxDistance] = useState(0)
  const [selectedDistance, setSelectedDistance] = useState(0)

  const auth = useAuth();

  useEffect( () => {
    const fetchData = async () => {
      const items  = await getItems()
      const userId = auth.getUserFromSession()
      const user = await getUser(userId)

      const itemsWithDistance = items.map( item => {
        item.distance = calculateDistanceInMeters(user.location, item.location)
        return item
      })

      setItems(itemsWithDistance)
      const sortedItems = items.sort((a,b) => {
        return b.distance - a.distance
      })
      setMaxDistance(Math.ceil(sortedItems[0].distance))
    }
    fetchData()
  },[])

  const calculateDistanceInMeters = (userLocation, itemLocation) => {
    const userLat = userLocation.latitude;
    const userLon = userLocation.longitude;
    const itemLat = itemLocation.latitude;
    const itemLon = itemLocation.longitude;

    // source: https://www.movable-type.co.uk/scripts/latlong.html
    const R = 6371e3; // metres
    const φ1 = userLat * Math.PI/180; // φ, λ in radians
    const φ2 = itemLat * Math.PI/180;
    const Δφ = (itemLat-userLat) * Math.PI/180;
    const Δλ = (itemLon-userLon) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres
    return d
  }

  const handleDistanceFilter = (e) => {
    setSelectedDistance(Math.ceil(Number(e.target.value)))
    console.log(selectedDistance)
    console.log('X',items.filter(item => item.distance <= selectedDistance))
  }

  return (
    <div>
      Filer: 
      <div>
       <input onChange={handleDistanceFilter} type="range" id="range" name="range"
         min="0" max={maxDistance}/>
      <label for="tange">Distance</label>
    </div>
      Category:
      
      <div>
      {items.filter(item => item.distance <= selectedDistance).map(item => {
        console.log('store item',item);
        return <Item key={item._id} item={item}></Item>
      })} 
      </div>
      <MapComponent items={items.filter(item => item.distance <= selectedDistance)}></MapComponent>
      
    </div>
  )
}
