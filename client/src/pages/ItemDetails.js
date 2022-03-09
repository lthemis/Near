import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteItem, getItem } from '../services/ApiService'
import { useAuth } from '../utils/auth'
import { MapComponent } from '../components/MapComponent';
import '../styles/Store/Store.css';
import '../styles/Item/Item.css';



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
    <div className='itemDetailsContainer'>
      <div className='itemDetailsTextContainer'>
        <h1 className='headerSell'>Item details</h1>
        <p>Item: <span className='detail'>{item.itemName}</span></p>
        <p>Item desription: <span className='detail'>{item.itemDesc}</span></p>
        <p>Price: <span className='detail'>{item.itemPrice}</span></p>
        <p>Seller: <span className='detail'>{item.sellerId}</span></p>
        <button className="itemBtn" onClick={clickHandler}>Buy</button>
      </div>
 
      { Object.keys(item).length !== 0  ?
      <div className="mapContainer">
        <MapComponent items={item}></MapComponent>
      </div>
      :
      <div></div>
      }
    </div>
  )
}
