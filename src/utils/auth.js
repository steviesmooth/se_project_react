const baseUrl = "http://localhost:3001";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  })
    .then(processServerResponse)
    .then((data) => {
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
      return;
    })
    .catch((err) => console.error(err));
};

export const getUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .then((data) => {
      return data;
    });
};
