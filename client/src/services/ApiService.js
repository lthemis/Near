const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://nearappber.herokuapp.com";

const parseFetch = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  }
  return response.json().then((res) => {
    throw new Error(res.error);
  });
};

const catchError = (error) => {
  console.log("e", error);
  return error;
};

export const addUser = (data) => {
  return fetch(`${BASE_URL}/addUser`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const getUser = (id) => {
  return fetch(`${BASE_URL}/getUser/${id}`)
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const loginUser = (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const logoutUser = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const addItem = (data) => {
  return fetch(`${BASE_URL}/addItem`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const getItems = () => {
  return fetch(`${BASE_URL}/getItems`)
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const getItem = (id) => {
  return fetch(`${BASE_URL}/getItem/${id}`)
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};

export const deleteItem = (itemId, buyerId) => {
  return fetch(`${BASE_URL}/deleteItem`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, buyerId }),
  })
    .then(parseFetch)
    .then((response) => {
      return response.data;
    })
    .catch(catchError);
};
