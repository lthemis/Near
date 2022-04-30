import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../services/ApiService";
import styles from "./Register.module.scss";

export const Register = () => {
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
    addUser(user).then((response) => console.log("r", response)); // set setate = if typeof res is error and return the user
    reset();
    navigate("/store", { replace: true });
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
      {/* <div> */}
      <div className={styles.formInputContainer}>
        <label htmlFor="username">
          {" "}
          Username:
          <input
            name="username"
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
          />
          {errors.username && (
            <span className={styles.inputError}>Username required</span>
          )}
        </label>

        <label htmlFor="email">
          {" "}
          Email:
          <input
            name="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
            })}
          />
          {errors.email && (
            <span className={styles.inputError}>incorrect format</span>
          )}
        </label>

        <label htmlFor="password">
          {" "}
          Password:
          <input
            name="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
          />
          {errors.password && (
            <span className={styles.inputError}>
              This field is required.
              <br /> Minimum eight characters, at least one letter and one
              number
            </span>
          )}
        </label>

        <label htmlFor="country">
          {" "}
          Country:
          <input
            name="country"
            placeholder="Country"
            {...register("country")}
          />
        </label>
      </div>
      <div className={styles.formInputContainer}>
        <label htmlFor="city">
          {" "}
          City:
          <input name="city" placeholder="City" {...register("city")} />
        </label>

        <label htmlFor="street">
          {" "}
          Street:
          <input name="street" placeholder="Street" {...register("street")} />
        </label>

        <label htmlFor="homeNum">
          {" "}
          Home number:
          <input
            name="homeNum"
            placeholder="Home number"
            {...register("homeNum")}
          />
        </label>

        <label htmlFor="zip">
          {" "}
          Zip:
          <input name="zip" placeholder="Zip" {...register("zip")} />
        </label>
      </div>
      {/* </div> */}
      <div className={styles.btnRegister}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
