import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom';

export const Tag = ({item}) => {
  return (
    <Marker
      key={item._id}
      position={[item.location.latitude, item.location.longitude]}
    >
      <Popup>
        <h3>{item.itemName}</h3>
        <p>{item.itemDesc}</p>
        <p>Price: {item.itemPrice}</p>
        <Link to={`/store/${item._id}`}>Product details</Link>
      </Popup>
    </Marker>
  );
};
