import React from "react";
import styles from "./Checkbox.module.scss";

export const Checkbox = ({ type }) => {
  return (
    <div>
      <label className={styles.checkboxLabel} htmlFor={type}>
        {type}
      </label>
      <input type="checkbox" name={type} />
    </div>
  );
};
