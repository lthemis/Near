import React from "react";
import styles from "./ListItemContainer.module.scss";
import { Item } from "../Item/Item";

export const ListItemContainer = ({ itemsToDisplay, cancelFlag }) => {
  return (
    <div
      className={styles.listItemContainer}
      style={{ overflow: "scroll", height: "80vh" }}
    >
      {itemsToDisplay.map((item) => {
        return <Item key={item._id} item={item} cancelFlag={cancelFlag} />;
      })}
    </div>
  );
};
