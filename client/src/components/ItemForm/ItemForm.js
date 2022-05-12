import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../services/ApiService";
import { useAuth } from "../../hooks/useAuth";
import { InputField } from "../InputField/InputField";
import styles from "./ItemForm.module.scss";

export const ItemForm = ({ setLastItem }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      categories: "",
      photoUrl: "",
    },
  });

  const onSubmit = async (data) => {
    const newItem = {
      itemName: data.itemName,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      categories: data.categories,
      sellerId: auth.getUserFromSession(),
      photoUrl: data.photoUrl,
    };
    await addItem(newItem).then((res) => setLastItem(res));
    reset();
    navigate("/store", { replace: true });
  };

  return (
    <section>
      <form className={styles.addItemForm} onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="Item"
          errors={errors}
          register={register("itemName", {
            required: true,
            minLength: 1,
            maxLength: 30,
          })}
        />
        <InputField
          type="Description"
          errors={errors}
          register={register("itemDesc", {
            required: true,
            minLength: 10,
            maxLength: 100,
          })}
        />
        <InputField
          type="price"
          errors={errors}
          register={register("itemPrice", { required: true })}
        />
        <InputField
          type="Photo url"
          errors={errors}
          register={register("photoUrl")}
        />
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            {...register("categories", { required: true })}
          >
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
            <option value="Mobility">Mobility</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit">Add</button>
      </form>
    </section>
  );
};
