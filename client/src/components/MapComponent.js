import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getUser } from '../services/ApiService'
import { useAuth } from '../utils/auth'
import './MapComponent.css'
import { Link } from 'react-router-dom';
import { Tag } from './Tag';
import RoutingMachine from './RoutingMachine';

export const MapComponent = ({items}) => {
  const auth = useAuth()
  const [user, setUser] = useState({})

  useEffect( () => {
    const fetchData = async () => {
      const result  = await getUser(auth.getUserFromSession())
      setUser(result)
    }
    if (Object.keys(user).length === 0){
      fetchData()
    }
  })

  return (
    <div>
      {console.log(user.location,items.location)}
      {Object.keys(user).length !== 0 ?
      <MapContainer className={'mapContainer'} center={[user.location.latitude, user.location.longitude]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          { Array.isArray(items) ?
          items.map((item) => {
            return <Tag key={item._id} item={item}/> 
          }) : 
          <Tag item={items}/> 
          && 
          <RoutingMachine userLocation={user.location} itemLocation={items.location}/>
        }
      </MapContainer>
      : null }
    </div>
  )
}