import React from 'react'
import { FieldValues, useForm, SubmitHandler  } from "react-hook-form";
import { loginUser } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = async data => {

    const user = {
      email: data.email,
      password: data.password
    }

    const res = await loginUser(user); //set setate = if typeof res is error and return the user 
    if (res._id) {
      auth.login(res._id)
      navigate('/store', {replace:true})
    } else {
      alert('Wrong email or password')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email", 
      { required: true }
      )} />
      <input placeholder="Password" type="password" {...register("password", 
      { required: true }
      )} />
      {errors.email && <span>Email required</span>}
      {errors.password && <span>Password required</span>}
      <button type="submit">Submit</button>
    </form>
  )
}

