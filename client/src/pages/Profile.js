import React, {useEffect, useState} from 'react'
import { Logout } from '../components/Logout'
import { ItemForm } from '../components/ItemForm';
import { getUser } from '../services/ApiService';
import { useAuth } from '../utils/auth';
import { Chart } from '../components/Chart';

export const Profile = () => {
  const auth = useAuth()
  const [user, setUser] = useState({})

  useEffect( () => {
    const fetchData = async () => {
      const result  = await getUser(auth.getUserFromSession())
      setUser(result)
    }
    if (Object.keys(user).length === 0){
      fetchData()
    }
  })

  return (
    <div> Profile page:

      {Object.keys(user).length !== 0 ? 
      <div>
        <h1>Welcome {user.userName}!</h1>
        <p>Income: {user.wallet.income}</p>
        <p>Expenses: {user.wallet.expenses}</p>
        <ItemForm></ItemForm>
        <Chart income={user.wallet.income} expenses={user.wallet.expenses}></Chart>
      </div>
        : null}
    </div>
  )
}
