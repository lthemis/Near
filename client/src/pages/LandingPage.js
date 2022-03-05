import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div>LandingPage
      <Link to={'/register'}>Register</Link>
      <Link to={'/login'}>Login</Link>
      <Outlet></Outlet>
    </div>
  )
}
