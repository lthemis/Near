import React, {useEffect, useState} from 'react'
import { Logout } from '../components/Logout'
import { ItemForm } from '../components/ItemForm';
import { getUser } from '../services/ApiService';
import { useAuth } from '../utils/auth';
import { Chart } from '../components/Chart';
import '../styles/Profile/Profile.css'

// export const Profile = ({setStoreRenderFlag, storeRenderFlag}) => {
export const Profile = (props) => {

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
    <div className='container'>

      {Object.keys(user).length !== 0 ? 
      <div className="profileContainer">
        <div className='textContainer'>
          <h1 className='headerSell' >Welcome <span className='detail'>{user.userName}</span>! Time to sell something? <br/> Do it here!</h1>
      
          <ItemForm flag={props.flag} setLastItem={props.setLastItem}></ItemForm>
        </div>
        <div className='chartContainer'>
          <Chart income={user.wallet.income} expenses={user.wallet.expenses}></Chart>
        </div>
      </div>
        : null}
    </div>
  )
}
