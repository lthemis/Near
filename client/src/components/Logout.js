import React from 'react'
import { useAuth } from '../utils/auth'

export const Logout = () => {
  const auth = useAuth()
  const clickHandler = () => {
    auth.logout()
  }

  return (
    <button onClick={clickHandler}>Logout</button>
  )
}
