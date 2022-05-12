import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ btnRole, onClick }) => {
  if (btnRole) {
    return (
      <button className={styles.buttonMain} type="submit" onClick={onClick}>
        {btnRole}
      </button>
    );
  }
  return (
    <button className={styles.buttonMain} type="submit">
      Submit
    </button>
  );
};
