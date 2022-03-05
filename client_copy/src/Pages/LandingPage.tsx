import React from 'react'
import RegisterForm from '../Components/RegisterForm';
import { Link, Outlet } from "react-router-dom";
import './LandingPage.css'

type Props = {}

export default function LandingPage({}: Props) {
  return (
    <div>
      <img src={require("../Assets/cover.png")} alt="Logo" />
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <Outlet></Outlet>
    </div>
  )
}