/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Filter.module.scss";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import { Checkbox } from "../Checkbox/Checkbox";

const checkboxes = ["Food", "Furniture", "Mobility", "Other"];

export const Filter = ({
  selectedDistance,
  maxDistance,
  handleDistanceFilter,
  handleSearchFilter,
  setCheckboxFilter,
}) => {
  return (
    <div className={styles.filterAreaContainer}>
      <div className={styles.filtersContainer}>
        <div className={styles.rangeFilterContainer}>
          <label className={styles.distanceLabel} htmlFor="range">
            Distance: {selectedDistance}
          </label>
          {maxDistance !== null ? (
            <RangeSlider
              min={1}
              max={maxDistance}
              defaultValue={maxDistance / 2}
              handleDistanceFilter={handleDistanceFilter}
            />
          ) : null}
        </div>

        <div className={styles.checkboxContainer}>
          {checkboxes.map((type, i) => {
            return (
              <Checkbox
                key={i}
                type={type}
                setCheckboxFilter={setCheckboxFilter}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.searchBarContainer}>
        <label htmlFor="search">Search</label>
        <input
          name="search"
          type="text"
          onChange={(e) => handleSearchFilter(e)}
        />
      </div>
    </div>
  );
};
