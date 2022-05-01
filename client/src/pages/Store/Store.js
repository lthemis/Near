/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { getItems, getUser } from "../../services/ApiService";
import { Item } from "../../components/Item/Item";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../utils/auth";
import styles from "./Store.module.scss";
import { Filter } from "../../components/Filter/Filter";
import { calculateDistanceInMeters } from "../../utils/helpers";

export const Store = () => {
  const [items, setItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    setStates();
  }, []);

  function getItemsWithDistance(items, user) {
    return items.map((item) => {
      item.distance = calculateDistanceInMeters(user.location, item.location);
      return item;
    });
  }

  async function fetchItems() {
    const itemsFromDb = await getItems();
    const userId = auth.getUserFromSession();
    const user = await getUser(userId);

    return getItemsWithDistance(itemsFromDb, user);
  }

  function getMaxDistance(itemsWithDistance) {
    let sortedItems;
    if (items.length > 1) {
      sortedItems = itemsWithDistance.sort((a, b) => {
        return b.distance - a.distance;
      });
    } else {
      sortedItems = itemsWithDistance;
    }
    return Math.ceil(sortedItems[0].distance);
  }

  async function setStates() {
    const items = await fetchItems();
    const fetchedMaxDistance = getMaxDistance(items);
    setItems(items);
    setMaxDistance(fetchedMaxDistance);
    if (selectedDistance === null) setSelectedDistance(fetchedMaxDistance / 2);
  }

  const handleDistanceFilter = (value) => {
    setSelectedDistance(Math.ceil(Number(value)));
  };

  const handleSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.listContainer}>
        <Filter
          selectedDistance={selectedDistance}
          maxDistance={maxDistance}
          handleDistanceFilter={handleDistanceFilter}
          handleSearchFilter={handleSearchFilter}
        />

        <div
          className={styles.listItemContainer}
          style={{ overflow: "scroll", height: "80vh" }}
        >
          {items
            .filter((item) => item.distance <= selectedDistance)
            .filter((item) => {
              if (searchFilter) {
                return item.itemName.toLowerCase().includes(searchFilter)
                  ? item
                  : null;
              }
              return item;
            })
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
