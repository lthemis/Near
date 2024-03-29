/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/InputField/InputField";
import { useHtml } from "../../hooks/useHtml";
import { addUser } from "../../services/ApiService";

export const Register = () => {
  const { sendRequest } = useHtml();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: "",
      city: "",
      street: "",
      homeNum: "",
      zip: "",
    },
  });

  const onSubmit = (data) => {
    const user = {
      userName: data.username,
      email: data.email,
      password: data.password,
      address: {
        country: data.country,
        city: data.city,
        street: data.street,
        homeNum: data.homeNum,
        zip: data.zip,
      },
      wallet: {
        income: 0,
        expenses: 0,
      },
    };
    // sendRequest({
    //   route: "/addUser",
    //   body: user,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });
    addUser(user);
    reset();
    navigate("/store", { replace: true });
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInputContainer}>
        <InputField
          type="username"
          errors={errors}
          register={register("username", {
            required: true,
            minLength: 1,
            maxLength: 30,
          })}
        />

        <InputField
          type="email"
          errors={errors}
          register={register("email", {
            required: true,
            pattern:
              /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
          })}
        />

        <InputField
          type="password"
          errors={errors}
          register={register("password", {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
        />

        <InputField
          type="country"
          errors={errors}
          register={register("country")}
        />
      </div>
      <div className={styles.formInputContainer}>
        <InputField type="city" errors={errors} register={register("city")} />
        <InputField
          type="street"
          errors={errors}
          register={register("street")}
        />
        <InputField
          type="homeNum"
          errors={errors}
          register={register("homeNum")}
        />
        <InputField type="zip" errors={errors} register={register("zip")} />
      </div>
      <div className={styles.btnRegister}>
        <Button />
      </div>
    </form>
  );
};
