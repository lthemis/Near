/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { getUser } from "../../services/ApiService";
import { useAuth } from "../../utils/auth";
import styles from "./Map.module.scss";
import { Tag } from "../Tag/Tag";
import RoutingMachine from "../../utils/RoutingMachine";

export const Map = ({ items, selectedDistance }) => {
  const auth = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(auth.getUserFromSession());
      setUser(result);
    };
    if (Object.keys(user).length === 0) {
      fetchData();
    }
  });
  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <MapContainer
          className={styles.mapContainer}
          center={[user.location.latitude, user.location.longitude]}
          zoom={12}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            center={[user.location.latitude, user.location.longitude]}
            radius={selectedDistance}
          />
          {Array.isArray(items)
            ? items.map((item) => {
                return <Tag key={item._id} item={item} />;
              })
            : <Tag item={items} /> && (
                <RoutingMachine
                  userLocation={user.location}
                  itemLocation={items.location}
                />
              )}
        </MapContainer>
      ) : null}
    </div>
  );
};
