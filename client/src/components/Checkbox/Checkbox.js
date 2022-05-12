import React from "react";
import styles from "./Checkbox.module.scss";

export const Checkbox = ({ type, setCheckboxFilter }) => {
  function handleCheckbox() {
    setCheckboxFilter((prev) => {
      if (prev.includes(type)) {
        return [...prev.filter((elem) => elem !== type)];
      }
      return [...prev, type];
    });
  }

  return (
    <div>
      <label className={styles.checkboxLabel} htmlFor={type}>
        {type}
      </label>
      <input type="checkbox" name={type} onChange={() => handleCheckbox()} />
    </div>
  );
};
