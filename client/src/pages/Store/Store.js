/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from "react";
import { Item } from "../../components/Item/Item";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../utils/auth";
import styles from "./Store.module.scss";
import { Filter } from "../../components/Filter/Filter";
import { calculateDistanceInMeters } from "../../utils/helpers";
import { useHtml } from "../../hooks/useHtml";

export const Store = () => {
  const [items, setItems] = useState([]);
  const [modifiedItems, setModifiedItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [checkboxFilter, setCheckboxFilter] = useState([]);
  const auth = useAuth();
  const { isLoading, error, sendRequest } = useHtml();
  const getUserIdFromSession = useCallback(() => {
    return auth.getUserFromSession();
  }, [auth]);

  useEffect(() => {
    sendRequest({ route: "/getItems" }, setItems);
  }, [sendRequest]);

  useEffect(() => {
    const userId = getUserIdFromSession();
    const transformItems = (user) => {
      const itemsWithDistance = items.map((item) => {
        item.distance = calculateDistanceInMeters(user.location, item.location);
        return item;
      });
      setModifiedItems(itemsWithDistance);
    };
    sendRequest({ route: `/getUser/${userId}` }, transformItems);
  }, [getUserIdFromSession, items, sendRequest]);

  useEffect(() => {
    function calculateMaxDistance(itemsWithDistance) {
      if (
        itemsWithDistance[0] &&
        itemsWithDistance[0].hasOwnProperty("distance")
      ) {
        return Math.ceil(sortItems(itemsWithDistance)[0].distance);
      }
      return null;
    }
    setMaxDistance(calculateMaxDistance(modifiedItems));
  }, [modifiedItems]);

  function sortItems(items) {
    if (items.length > 1) {
      return items.sort((a, b) => {
        return b.distance - a.distance;
      });
    }
    return items;
  }

  function getItemsToDisplay() {
    const userId = getUserIdFromSession();
    return modifiedItems.filter((item) => {
      if (
        item.distance <= selectedDistance &&
        item.sellerId !== userId &&
        (item.itemName.toLowerCase().includes(searchFilter) || !searchFilter) &&
        (checkboxFilter.some((elem) => elem === item.categories[0]) ||
          checkboxFilter.length === 0)
      )
        return item;
      return null;
    });
  }

  const handleDistanceFilter = (value) => {
    setSelectedDistance(Math.ceil(Number(value)));
  };

  const handleSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  const calculateDefaultSelectedDistance = () => {
    return selectedDistance === null ? maxDistance / 2 : selectedDistance;
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.listContainer}>
        <Filter
          selectedDistance={calculateDefaultSelectedDistance()}
          maxDistance={maxDistance}
          handleDistanceFilter={handleDistanceFilter}
          handleSearchFilter={handleSearchFilter}
          setCheckboxFilter={setCheckboxFilter}
        />
        {!isLoading && (
          <div
            className={styles.listItemContainer}
            style={{ overflow: "scroll", height: "80vh" }}
          >
            {getItemsToDisplay().map((item) => {
              return <Item key={item._id} item={item} />;
            })}
          </div>
        )}
        {isLoading && !error && <p>Loading</p>}
        {error && <p>{error.message}</p>}
      </div>

      <Map
        selectedDistance={calculateDefaultSelectedDistance()}
        items={getItemsToDisplay()}
      />
    </div>
  );
};
