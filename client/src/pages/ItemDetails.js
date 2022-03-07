import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteItem, getItem } from '../services/ApiService'
import { useAuth } from '../utils/auth'

export const ItemDetails = () => {
  const [item, setItem] = useState({})
  const { itemId } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const userId = auth.getUserFromSession()

  useEffect( () => {
    const fetchData = async () => {
      const itemData = await getItem(itemId);
      setItem(itemData)
    }
    fetchData()
  },[])

  const clickHandler = async () => {
    console.log(itemId, userId);
    const result = await deleteItem(itemId, userId)
    console.log(result);
    navigate('/store', { replace: true })
  }

  return (
    <div>Item details
      <h1>{item.itemName}</h1>
      <p>{item.itemDesc}</p>
      <p>{item.itemPrice}</p>
      <p>{item.sellerId}</p>
      <button onClick={clickHandler}>Buy</button>
    </div>
  )
}
