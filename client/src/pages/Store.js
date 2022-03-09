import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getItems, getUser } from '../services/ApiService';
import { Item } from '../components/Item';
import { MapComponent } from '../components/MapComponent';
import { useAuth } from '../utils/auth';
import '../styles/Store/Store.css';

export const Store = (props) => {
  const [items, setItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(100);
  const [selectedDistance, setSelectedDistance] = useState(0);


  const auth = useAuth();

  const fetchItems = async () => {
    const itemsFromDb = await getItems(); /// API CALL TO THE DB
    const userId = auth.getUserFromSession();
    const user = await getUser(userId);

    const itemsWithDistance = itemsFromDb.map(item => {
      item.distance = calculateDistanceInMeters(user.location, item.location);
      return item;
    });
    return itemsWithDistance;
  }

  const fetchMaxDistance = async (itemsWithDistance) => {
    let sortedItems;
    if (items.length > 1){
      sortedItems = itemsWithDistance.sort((a, b) => {
        return b.distance - a.distance;
      });
    } else {
      sortedItems = itemsWithDistance;
    }
    console.log("ITEMS",items);
    return Math.ceil(sortedItems[0].distance)
  };

  const setStates = async ( ) => {
    const fetchedItems = await fetchItems()
    const fetchedMaxDistance = await fetchMaxDistance(fetchedItems)
    setItems(fetchedItems)
    setMaxDistance(fetchedMaxDistance)
  }

  useEffect(() => {
    setStates()
  }, []);

  const calculateDistanceInMeters = (userLocation, itemLocation) => {
    const userLat = userLocation.latitude;
    const userLon = userLocation.longitude;
    const itemLat = itemLocation.latitude;
    const itemLon = itemLocation.longitude;

    // source: https://www.movable-type.co.uk/scripts/latlong.html
    const R = 6371e3; // metres
    const φ1 = (userLat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (itemLat * Math.PI) / 180;
    const Δφ = ((itemLat - userLat) * Math.PI) / 180;
    const Δλ = ((itemLon - userLon) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const handleDistanceFilter = e => {
    setSelectedDistance(Math.ceil(Number(e.target.value)));
  };

  return (
    <div className='storeContainer'>

      <div className='listContainer'>
        <div className="filterAreaContainer">
          <div className="filtersContainer">
            <div className="rangeFilterContainer">
              <label className="distanceLabel"  for='range'>Distance: {selectedDistance}</label>
              <input
                onChange={handleDistanceFilter}
                type='range'
                id='range'
                name='range'
                min='100'
                max={maxDistance}
              />
            </div>

            <div className='checkboxContainer'>
              <div>
                <label className="checkboxLabel" for="Food">Food</label>
                <input type="checkbox" name="Food"></input>
              </div>
              <div>
                <label className="checkboxLabel" for="Furniture">Furniture</label>
                <input type="checkbox" name="Furniture"></input>
              </div>            
              <div>
                <label className="checkboxLabel" for="Mobility">Mobility</label>
                <input type="checkbox" name="Mobility"></input>
              </div>            
              <div>
                <label className="checkboxLabel" for="Other">Other</label>
                <input type="checkbox" name="Other"></input>
              </div>
            </div>
            
          </div>
          <div className="searchBarContainer">
            <label for="search">Search</label>
            <input name="search" type="text"></input>
          </div>
        </div>
        
        <div className="listItemContainer" style={{overflow: "scroll", height: "80vh"}}>
          {items
            .filter(item => item.distance <= selectedDistance)
            .map(item => {
              console.log('store item', item);
              return <Item key={item._id} item={item}></Item>;
            })}
        </div>
      </div>

      <div className='mapContainer'>
        <MapComponent
          items={items.filter(item => item.distance <= selectedDistance)}
        ></MapComponent>
      </div>
    </div>
  );
};
