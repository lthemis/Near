import React from 'react'
import { Logout } from '../components/Logout'
import { ItemForm } from '../components/ItemForm';

export const Profile = () => {
  return (
    <div>Profile
      <Logout></Logout>
      <ItemForm></ItemForm>
    </div>
  )
}
