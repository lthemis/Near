import React from 'react'
import { Logout } from '../components/Logout';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../utils/auth';

export const Navbar = () => {
  const auth = useAuth()

  const path = auth.checkIfAuthenticated() ? "store" : "/";

  return (
    <div>
        <NavLink to={`${path}`}>
          <img src={require('../assets/cover.png')} alt='logo'></img>
        </NavLink>

        {auth.checkIfAuthenticated()?
          <nav>
            <NavLink to={'/store'}>Store</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <Logout></Logout>
          </nav>
        :
          <div>
            <nav>
              <NavLink to={'login'}>Login</NavLink>
              <NavLink to={'register'}>Register</NavLink>
            </nav>
          </div>
      }
    </div>
  )
}
