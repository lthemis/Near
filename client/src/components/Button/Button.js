import React from "react";
import styles from "./Button.module.scss";

export const Button = () => {
  return (
    <button className={styles.buttonMain} type="submit">
      Submit
    </button>
  );
};
