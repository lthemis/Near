import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/auth'

export const RequireAuth = ({children}) => {
  const auth = useAuth();

  if (!auth.checkIfAuthenticated() ) {
    return <Navigate 
      to='/login' 
      >
        </Navigate>
  }

  return children;
}