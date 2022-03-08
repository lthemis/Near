import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
export const LandingPage = () => {
  return (
    <div>
      <h1>~TEST</h1>
      <Outlet></Outlet>
    </div>
  )
}
