import React from 'react'
import { FieldValues, useForm, SubmitHandler  } from "react-hook-form";
import { addUser } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate() 
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      country: "",
      city: "",
      street: "",
      homeNum: "",
      zip: "",
    }
  });
   
  const onSubmit = data => {
    const user = {
      userName: data.username,
      email: data.email,
      password: data.password,
      address: {
        country: data.country,
        city: data.city,
        street: data.street,
        homeNum: data.homeNum,
        zip: data.zip
      },
      wallet: {
        income: 0,
        expenses: 0
      }
    }
    addUser(user).then(response => console.log('r', response)); //set setate = if typeof res is error and return the user 
    reset()
    navigate('/store', {replace:true})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" {...register("username", 
      { required: true, minLength:1, maxLength: 30 }
      )} />
      <input placeholder="Email" {...register("email", 
      { required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ }
      )} />
      <input placeholder="Password" {...register("password", 
      { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }
      )} />
      <input placeholder="Country" {...register("country")} />
      <input placeholder="City" {...register("city")} />
      <input placeholder="Street" {...register("street")} />
      <input placeholder="Home number" {...register("homeNum")} />
      <input placeholder="Zip" {...register("zip")} />
      <button type="submit">Submit</button>
      {errors.username && <span>Username required</span>}
      {errors.email && <span>incorrect format</span>}
      {errors.password && <span>This field is required. Minimum eight characters, at least one letter and one number</span>}
    </form>
  )
}





  