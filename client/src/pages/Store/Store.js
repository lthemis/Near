/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { getItems, getUser } from "../../services/ApiService";
import { Item } from "../../components/Item/Item";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../utils/auth";
import styles from "./Store.module.scss";
import { RangeSlider } from "../../components/RangeSlider/RangeSlider";
import { Filter } from "../../components/Filter/Filter";

export const Store = () => {
  const [items, setItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(0);
  const auth = useAuth();

  const fetchItems = async () => {
    const itemsFromDb = await getItems(); /// API CALL TO THE DB
    const userId = auth.getUserFromSession();
    const user = await getUser(userId);

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

    const itemsWithDistance = itemsFromDb.map((item) => {
      item.distance = calculateDistanceInMeters(user.location, item.location);
      return item;
    });
    return itemsWithDistance;
  };

  const fetchMaxDistance = async (itemsWithDistance) => {
    let sortedItems;
    if (items.length > 1) {
      sortedItems = itemsWithDistance.sort((a, b) => {
        return b.distance - a.distance;
      });
    } else {
      sortedItems = itemsWithDistance;
    }
    return Math.ceil(sortedItems[0].distance);
  };

  const setStates = async () => {
    const fetchedItems = await fetchItems();
    const fetchedMaxDistance = await fetchMaxDistance(fetchedItems);
    setItems(fetchedItems);
    setMaxDistance(fetchedMaxDistance);
  };
  useEffect(() => {
    setStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDistanceFilter = (value) => {
    setSelectedDistance(Math.ceil(Number(value)));
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.listContainer}>
        <Filter
          selectedDistance={selectedDistance}
          maxDistance={maxDistance}
          handleDistanceFilter={handleDistanceFilter}
        />

        <div
          className={styles.listItemContainer}
          style={{ overflow: "scroll", height: "80vh" }}
        >
          {items
            .filter((item) => item.distance <= selectedDistance)
            .map((item) => {
              // eslint-disable-next-line no-underscore-dangle
              return <Item key={item._id} item={item} />;
            })}
        </div>
      </div>

      <Map items={items.filter((item) => item.distance <= selectedDistance)} />
    </div>
  );
};
