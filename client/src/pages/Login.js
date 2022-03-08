import React from 'react'
import { FieldValues, useForm, SubmitHandler  } from "react-hook-form";
import { loginUser } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import '../styles/Forms/forms.css'

export const Login = () => {
  console.log('LOGIN COMPONENT');

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
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email"> Email:
        <input name="email" placeholder="Email" {...register("email", 
        { required: true }
        )} />
        {errors.email && <span className="inputError">Email required</span>}
      </label>

      <label htmlFor="password"> Password:
        <input name="password" placeholder="Password" type="password" {...register("password", 
        { required: true }
        )} />
      {errors.password && <span className="inputError">Password required</span>}
      </label>
      
      <button type="submit">Submit</button>
    </form>
  )
}

