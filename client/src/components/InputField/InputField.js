import React from "react";
import styles from "./InputField.module.scss";

export const InputField = ({ type, errors, register }) => {
  const placeholder = `${type.substring(0, 1).toUpperCase()}${type.substring(
    1
  )}`;

  if (errors && type === "email") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input
          name={type}
          placeholder={placeholder}
          type={type}
          {...register}
        />
        {errors.email && (
          <span className={styles.inputError}>incorrect format</span>
        )}
      </label>
    );
  }

  if (errors && type === "password") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input
          name={type}
          placeholder={placeholder}
          type={type}
          {...register}
        />
        {errors.password && (
          <span className={styles.inputError}>
            This field is required.
            <br /> Minimum eight characters, at least one letter and one number
          </span>
        )}
      </label>
    );
  }

  if (errors && type === "username") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input name={type} placeholder={type} {...register} />
        {errors.username && (
          <span className={styles.inputError}>Username required</span>
        )}
      </label>
    );
  }

  if (errors && type === "item") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input name={type} placeholder={type} {...register} />
        {errors.itemName && (
          <span className={styles.inputError}>
            Item name required (between 1 and 30 characters)
          </span>
        )}
      </label>
    );
  }

  if (errors && type === "description") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input name={type} placeholder={type} {...register} />
        {errors.itemDesc && (
          <span className={styles.inputError}>
            Item description required (between 10 and 100 characters)
          </span>
        )}
      </label>
    );
  }

  if (errors && type === "price") {
    return (
      <label htmlFor={type}>
        {" "}
        {placeholder}:
        <input name={type} placeholder={type} {...register} />
        {errors.itemPrice && (
          <span className={styles.inputError}>This field is required.</span>
        )}
      </label>
    );
  }

  return (
    <label htmlFor={type}>
      {" "}
      {placeholder}:
      <input name={type} placeholder={placeholder} {...register} />
    </label>
  );
};
