const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://nearappber.herokuapp.com";

// const postConfig = {
//   method: 'POST',
//   // credentials: 'include',
//   mode: 'cors',
//   headers: { 'Content-Type': 'application/json' },
// }

export const addUser = (data) => {
  return fetch(`${BASE_URL}/addUser`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 300) {
      return response.json();
    }
    console.log("error", response.status);
    return new Error(`There was an error`);
  });
};

export const getUser = (id) => {
  return fetch(`${BASE_URL}/getUser/${id}`)
    .then((response) => {
      if (response.status < 300) {
        return response.json();
      }
      console.log("error", response.status);
      return new Error(`There was an error`);
    })
    .catch((e) => console.log(e));
};

export const loginUser = (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    mode: "cors",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 300) {
      return response.json();
    }
    console.log("error", response.status);
    return new Error(`There was an error`);
  });
};

export const logoutUser = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    // credentials: 'include',
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addItem = (data) => {
  return fetch(`${BASE_URL}/addItem`, {
    method: "POST",
    mode: "cors",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 300) {
      return response.json();
    }
    console.log("error", response.status);
    return new Error(`There was an error`);
  });
};

export const getItems = () => {
  return fetch(`${BASE_URL}/getItems`)
    .then((response) => {
      if (response.status < 300) {
        return response.json();
      }
      console.log("error", response.status);
      return new Error(`There was an error`);
    })
    .then((data) => {
      console.log("datainfetch", data);
      return data;
    });
};

export const getItem = (id) => {
  return fetch(`${BASE_URL}/getItem/${id}`)
    .then((response) => {
      if (response.status < 300) {
        return response.json();
      }
      console.log("error", response.status);
      return new Error(`There was an error`);
    })
    .then((data) => {
      console.log("datainfetch", data);
      return data;
    });
};

export const deleteItem = (itemId, buyerId) => {
  return fetch(`${BASE_URL}/deleteItem`, {
    method: "DELETE",
    mode: "cors",
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, buyerId }),
  })
    .then((response) => {
      if (response.status < 300) {
        return response.json();
      }
      console.log("error", response.status);
      return new Error(`There was an error`);
    })
    .catch((e) => console.log(e));
};
