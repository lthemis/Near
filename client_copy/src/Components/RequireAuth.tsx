import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Utils/auth'

export const RequireAuth = ({children}: any) => {
  const location = useLocation();
  const auth = useAuth();
  console.log('location', location);
  
  
  if (!auth!.user.email ) {
    return <Navigate to='/login' state={{path: location.pathname}}></Navigate>
  }

  return children;
}