/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from "react";
import styles from "./Filter.module.scss";
import { RangeSlider } from "../RangeSlider/RangeSlider";

export const Filter = ({
  selectedDistance,
  maxDistance,
  handleDistanceFilter,
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
              min={0}
              max={maxDistance}
              defaultValue={maxDistance / 2}
              handleDistanceFilter={handleDistanceFilter}
            />
          ) : null}
        </div>

        <div className={styles.checkboxContainer}>
          <div>
            <label className={styles.checkboxLabel} htmlFor="Food">
              Food
            </label>
            <input type="checkbox" name="Food" />
          </div>
          <div>
            <label className={styles.checkboxLabel} htmlFor="Furniture">
              Furniture
            </label>
            <input type="checkbox" name="Furniture" />
          </div>
          <div>
            <label className={styles.checkboxLabel} htmlFor="Mobility">
              Mobility
            </label>
            <input type="checkbox" name="Mobility" />
          </div>
          <div>
            <label className={styles.checkboxLabel} htmlFor="Other">
              Other
            </label>
            <input type="checkbox" name="Other" />
          </div>
        </div>
      </div>
      <div className={styles.searchBarContainer}>
        <label htmlFor="search">Search</label>
        <input name="search" type="text" />
      </div>
    </div>
  );
};
