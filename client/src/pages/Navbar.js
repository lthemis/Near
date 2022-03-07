import React from 'react'
import { Logout } from '../components/Logout';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../utils/auth';


export const Navbar = () => {
  const auth = useAuth()
  return (
    <div>
        <img src={require('../assets/cover.png')} alt='logo'></img>
        {auth.checkIfAuthenticated()?
          <nav>
            <Link to={'/store'}>Store</Link>
            <Link to={'/profile'}>Profile</Link>
            <Logout></Logout>
          </nav>
        :
          <div>
            <nav>
              <Link to={'login'}>Login</Link>
              <Link to={'register'}>Register</Link>
            </nav>
            <Outlet></Outlet>
          </div>
      }
    </div>
  )
}
