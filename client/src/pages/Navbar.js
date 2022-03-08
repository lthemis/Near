import React from 'react'
import { Logout } from '../components/Logout';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../utils/auth';
import '../styles/Navbar/Navbar.css';

export const Navbar = () => {
  const auth = useAuth()

  const path = auth.checkIfAuthenticated() ? "store" : "/";

  return (
    <nav className="navContainer">
        <NavLink to={`${path}`}>
          <img src={require('../assets/cover.png')} alt='logo'></img>
        </NavLink>

        {auth.checkIfAuthenticated()?
          <div>
            <NavLink to={'/store'}>Store</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <Logout></Logout>
          </div>
        :
          <div>
              <NavLink to={'login'}>Login</NavLink>
              <NavLink to={'register'}>Register</NavLink>
          </div>
      }
    </nav>
  )
}
