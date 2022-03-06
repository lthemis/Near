const BASE_URL = 'http://localhost:3000'


const postConfig = {
  method: 'POST',
  // credentials: 'include',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
}

export const addUser = async (data) => {
  return await fetch(`${BASE_URL}/addUser`, 
  {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if( response.status < 300) {
      return response.json()
    } else {
      console.log('error', response.status);
      return new Error(`There was an error`)
    }
   })
}

export const loginUser = async (data) => {
  return await fetch(`${BASE_URL}/login`, 
  {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if( response.status < 300) {
      return response.json()
    } else {
      console.log('error', response.status);
      return new Error(`There was an error`)
    }
   })
}

export const logoutUser = async () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    // credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export const addItem = async (data) => {
  return await fetch(`${BASE_URL}/addItem`, 
  {
    method: 'POST',
    mode: 'cors',
    // credentials: 'include',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if( response.status < 300) {
      return response.json()
    } else {
      console.log('error', response.status);
      return new Error(`There was an error`)
    }
   })
}
