/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addItem } from "../services/ApiService";
import { useAuth } from "../utils/auth";
/// import profile css

export const ItemForm = (props) => {
  // export const ItemForm = ({setStoreRenderFlag, storeRenderFlag}) => {

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
    // eslint-disable-next-line react/destructuring-assignment
    await addItem(newItem).then((res) => props.setLastItem(res));
    // console.log("DDAADSADASDADA",itemItemFromDb);
    reset();
    // setStoreRenderFlag(!storeRenderFlag)
    // props.setFlag(!props.flag)
    // props.setLastItem(itemItemFromDb)
    navigate("/store", { replace: true });
  };

  return (
    <div>
      <form className="newItemForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="item">Item</label>
        <input
          name="item"
          placeholder="Item"
          {...register("itemName", {
            required: true,
            minLength: 1,
            maxLength: 30,
          })}
        />
        {errors.itemName && (
          <span>Item name required (between 1 and 30 characters)</span>
        )}
        <label htmlFor="itemDesc">Item description</label>
        <input
          name="itemDesc"
          placeholder="Item description"
          {...register("itemDesc", {
            required: true,
            minLength: 10,
            maxLength: 100,
          })}
        />
        {errors.itemDesc && (
          <span>Item description required (between 10 and 100 characters)</span>
        )}
        <label htmlFor="itemPrice">Price</label>
        <input
          name="itemPrice"
          placeholder="Price"
          {...register("itemPrice", { required: true })}
        />
        {errors.itemPrice && (
          <span>
            This field is required. Minimum eight characters, at least one
            letter and one number
          </span>
        )}
        <label htmlFor="Photo">Photo url</label>
        <input name="Photo" placeholder="Photo" {...register("photoUrl")} />
        <label htmlFor="category">Category</label>
        <select name="category" {...register("categories", { required: true })}>
          <option disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          <option value="Food">Food</option>
          <option value="Furniture">Furniture</option>
          <option value="Mobility">Mobility</option>
          <option value="Other">Other</option>
        </select>

        <button type="button">Add</button>
      </form>
    </div>
  );
};
