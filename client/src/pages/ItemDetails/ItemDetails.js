import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, deleteItem } from "../../services/ApiService";
import { useAuth } from "../../hooks/useAuth";
import { Map } from "../../components/Map/Map";
import styles from "./ItemDetails.module.scss";

export const ItemDetails = () => {
  const [item, setItem] = useState({});
  const { itemId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const userId = auth.getUserFromSession();

  useEffect(() => {
    const fetchData = async () => {
      const itemData = await getItem(itemId);
      setItem(itemData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = async () => {
    await deleteItem(itemId, userId);
    navigate("/store", { replace: true });
  };

  return (
    <div className={styles.itemDetailsContainer}>
      <div className={styles.itemDetailsTextContainer}>
        <h1 className={styles.headerSell}>Item details</h1>
        <p>
          Item: <span className={styles.detail}>{item.itemName}</span>
        </p>
        <p>
          Item desription:{" "}
          <span className={styles.detail}>{item.itemDesc}</span>
        </p>
        <p>
          Price: <span className={styles.detail}>{item.itemPrice}</span>
        </p>
        <p>
          Seller: <span className={styles.detail}>{item.sellerId}</span>
        </p>
        <button type="button" className={styles.itemBtn} onClick={clickHandler}>
          Buy
        </button>
      </div>

      {Object.keys(item).length !== 0 ? (
        <div className={styles.mapContainer}>
          <Map items={item} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
