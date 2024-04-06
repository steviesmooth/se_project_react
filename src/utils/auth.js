import { processServerResponse } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "put the URL for your deployed backend here, including https://"
    : "http://localhost:3001";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
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
      if (data) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
      return;
    });
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
