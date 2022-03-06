import React from 'react'
import { useAuth } from '../utils/auth';
import { FieldValues, useForm, SubmitHandler  } from "react-hook-form";
import { addItem } from '../services/ApiService';

export const ItemForm = () => {
  const auth = useAuth();
  console.log(auth);
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    defaultValues: {
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      categories: ""
    }
  });

  const onSubmit = data => {
    const newItem = {
      itemName: data.itemName,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      categories: data.categories,
      sellerId: auth.getUserFromSession()
    };
    console.log(newItem);
    addItem(newItem)
    // reset()
  }

  return (
    <div>ItemForm

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Item" {...register("itemName", 
        { required: true, minLength:1, maxLength: 30 }
        )} />
        <input placeholder="Item description" {...register("itemDesc", 
        { required: true, minLength:10, maxLength: 100 }
        )} />
        <input placeholder="Price" {...register("itemPrice", 
        { required: true }
        )} />
        <select {...register("categories", {required: true})}>
          <option disabled selected value> -- select an option -- </option>
          <option value="Food">Food</option>
          <option value="Furniture">Furniture</option>
          <option value="Mobility">Mobility</option>
          <option value="Other">Other</option>
        </select>
        {errors.itemName && <span>Item name required (between 1 and 30 characters)</span>}
        {errors.itemDesc && <span>Item description required (between 10 and 100 characters)</span>}
        {errors.password && <span>This field is required. Minimum eight characters, at least one letter and one number</span>}
        <button>Add</button>
      </form>
    </div>
  )
}
 