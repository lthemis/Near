import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/auth';

type Props = {}

export default function Store({}: Props) {
  const auth = useAuth()
  const navigate = useNavigate()


  const logoutHandler = () => {
    auth!.logout()
    navigate('/')
  }
  const profileHandler = () => {
    navigate('profile')
  }
  
  return (
    <div>Store - all you need {auth!.user.email}
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={profileHandler}>Profile</button>
    </div>
  )
}