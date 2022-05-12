import React from "react";
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
          {checkboxes.map((type) => {
            return (
              <Checkbox
                key={type}
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
