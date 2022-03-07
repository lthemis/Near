import React from 'react'
import { Logout } from '../components/Logout';
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <div>Navbar
         <Link to={'/profile'}>Profile</Link>

        <Logout></Logout>
    </div>
  )
}
