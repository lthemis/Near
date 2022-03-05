import React from 'react'
import { FieldValues, useForm, SubmitHandler  } from "react-hook-form";
import { LoginData } from '../Models/user';
import { loginUser } from '../Services/apiCall';
import { useAuth } from '../Utils/auth';
import { useNavigate, useLocation } from 'react-router-dom'

type Props = {}

interface CustomizedState {
  path: string
}


export default function LoginForm({}: Props) {

  const { register, handleSubmit, formState: { errors }, reset} = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const state = location.state as CustomizedState;
  const { path } = state;
  const redirectPath = path? path : '/';
  // const redirectPath: LocationState | unknown = location.state ? location.state.path: null;
  
  // console.log(redirectPath)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const user: LoginData = {
      email: data.email,
      password: data.password
    }
    const res = await loginUser(user); //set setate = if typeof res is error and return the user 
    if (res.error) {
      alert(`${res.message}`);
    } else {
      auth!.login(user)
      // navigate('/store', {replace: true})
      navigate(redirectPath, {replace: true})
// 
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email", 
      { required: true }
      )} />
      <input placeholder="Password" {...register("password", 
      { required: true }
      )} />
      {errors.email && <span>Email required</span>}
      {errors.password && <span>Password required</span>}
      <button type="submit">Submit</button>
    </form>
  )
}