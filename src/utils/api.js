const baseUrl = "http://localhost:3001";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

export const addItems = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");
  debugger;
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(processServerResponse);
};

export const deleteItems = (_id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const updateUser = (name, avatar, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(processServerResponse);
};

export const addCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const removeCardLike = (_id, token) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
