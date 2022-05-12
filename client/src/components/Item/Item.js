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
        <p className={styles.itemHeader}>{item.itemName}</p>
        <p>
          Price: <span className={styles.descDetail}>{item.itemPrice}</span>
        </p>
        <p>
          Category: <span className={styles.descDetail}>{item.categories}</span>
        </p>
      </div>
      <Link className={styles.itemBtn} to={`/store/${item._id}`}>
        <p>See more</p>
      </Link>
    </div>
  );
};
