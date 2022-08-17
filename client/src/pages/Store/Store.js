/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Item } from "../../components/Item/Item";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Store.module.scss";
import { Filter } from "../../components/Filter/Filter";
import { calculateDistanceInMeters } from "../../utils/helpers";
import { useHtml } from "../../hooks/useHtml";
import { ListItemContainer } from "../../components/ListItemContainer/ListItemContainer";
import { getItems, getUser } from "../../services/ApiService";

export const Store = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedItems, setModifiedItems] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [checkboxFilter, setCheckboxFilter] = useState([]);
  const auth = useAuth();
  // const { isLoading, error, sendRequest } = useHtml();
  const getUserIdFromSession = useCallback(() => {
    return auth.getUserFromSession();
  }, [auth]);

  // const fetchData = async () => {
  //   const items = await getItems();
  //   setItems(items);
  // };
  // if (Object.keys(user).length === 0) {
  //   fetchData();
  // }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getItems();
      setItems(response);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   sendRequest({ route: "/getItems" }, setItems);
  // }, [sendRequest]);

  useEffect(() => {
    const userId = getUserIdFromSession();
    const transformItems = (user) => {
      const itemsWithDistance = items.map((item) => {
        item.distance = calculateDistanceInMeters(user.location, item.location);
        return item;
      });
      setModifiedItems(itemsWithDistance);
    };
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getUser(userId);
      transformItems(response);
      setIsLoading(false);
    };
    fetchData();
  }, [getUserIdFromSession, items]);

  // useEffect(() => {
  //   const userId = getUserIdFromSession();
  //   const transformItems = (user) => {
  //     const itemsWithDistance = items.map((item) => {
  //       item.distance = calculateDistanceInMeters(user.location, item.location);
  //       return item;
  //     });
  //     setModifiedItems(itemsWithDistance);
  //   };
  //   const fetchData = async () => {
  //     const response = await getUser(userId);
  //     console.log(response);
  //     transformItems(response);
  //   };
  //   fetchData();
  //   sendRequest({ route: `/getUser/${userId}` }, transformItems);
  // }, [getUserIdFromSession, items, sendRequest]);

  useEffect(() => {
    function calculateMaxDistance(itemsWithDistance) {
      if (
        itemsWithDistance[0] &&
        // eslint-disable-next-line no-prototype-builtins
        itemsWithDistance[0].hasOwnProperty("distance")
      ) {
        // eslint-disable-next-line no-use-before-define
        return Math.ceil(sortItems(itemsWithDistance)[0].distance);
      }
      return null;
    }
    setMaxDistance(calculateMaxDistance(modifiedItems));
  }, [modifiedItems]);

  // eslint-disable-next-line no-shadow
  function sortItems(items) {
    if (items.length > 1) {
      return items.sort((a, b) => {
        return b.distance - a.distance;
      });
    }
    return items;
  }

  function getItemsToDisplay() {
    console.log(modifiedItems);
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
        {/* {!isLoading && ( */}
        {!isLoading && (
          <ListItemContainer itemsToDisplay={getItemsToDisplay()} />
        )}
        {/* {!isLoading && (
          <div
            className={styles.listItemContainer}
            style={{ overflow: "scroll", height: "80vh" }}
          >
            {getItemsToDisplay().map((item) => {
              return <Item key={item._id} item={item} />;
            })}
          </div>
        )} */}
        {/* {isLoading && !error && <p>Loading</p>} */}
        {/* {error && <p>{error.message}</p>} */}
      </div>

      <Map
        selectedDistance={calculateDefaultSelectedDistance()}
        items={getItemsToDisplay()}
      />
    </div>
  );
};
