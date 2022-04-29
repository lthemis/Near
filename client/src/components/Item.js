/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Item/Item.css";

export const Item = (props) => {
  const { item } = props;
  return (
    <div className="itemContainer">
      <div className="photoContainer">
        <img className="imgElement" src={item.photoUrl} alt="itemPhoto" />
      </div>

      <div className="textContainer">
        <h1 className="itemHeader">
          Item: <span className="descDetail">{item.itemName}</span>
        </h1>
        <p>
          Price: <span className="descDetail">{item.itemPrice}</span>
        </p>
        <p>
          Category: <span className="descDetail">{item.categories}</span>
        </p>
      </div>
      <Link className="itemBtn" to={`/store/${item._id}`}>
        See more
      </Link>
    </div>
  );
};
