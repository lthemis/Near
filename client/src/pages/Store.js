import React from 'react'
import { Link } from 'react-router-dom'

export const Store = () => {
  return (
    <div>Store
      <Link to={'/profile'}>Profile</Link>
    </div>
  )
}
