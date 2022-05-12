/* eslint-disable no-underscore-dangle */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { loginUser } from "../../services/ApiService";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.scss";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    const res = await loginUser(user);
    if (res._id) {
      auth.login(res._id);
      navigate("/store", { replace: true });
    } else {
      alert(res);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        {" "}
        Email:
        <input
          name="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className={styles.inputError}>Email required</span>
        )}
      </label>

      <label htmlFor="password">
        {" "}
        Password:
        <input
          name="password"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className={styles.inputError}>Password required</span>
        )}
      </label>

      <Button />
    </form>
  );
};
