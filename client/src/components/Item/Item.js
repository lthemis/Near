/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Item.module.scss";

export const Item = (props) => {
  const { item } = props;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.photoContainer}>
        <img
          className={styles.imgElement}
          src={item.photoUrl}
          alt="itemPhoto"
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.itemHeader}>
          Item: <span className={styles.descDetail}>{item.itemName}</span>
        </h1>
        <p>
          Price: <span className={styles.descDetail}>{item.itemPrice}</span>
        </p>
        <p>
          Category: <span className={styles.descDetail}>{item.categories}</span>
        </p>
      </div>
      <Link className={styles.itemBtn} to={`/store/${item._id}`}>
        See more
      </Link>
    </div>
  );
};
