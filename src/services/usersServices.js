import http from "./httpServices";
import { usersUrl } from "../config.json";
import jwt_decode from "jwt-decode";

function userUrl(id) {
  return `${usersUrl}/${id}`;
}

export function getUsers(jwt) {
  return http.get(usersUrl, {
    headers: { "x-auth-token": jwt }
  });
}

export function getUser(id, jwt) {
  return http.get(userUrl(id), {
    headers: { "x-auth-token": jwt }
  });
}

export function getUserData(user) {
  return http.get(userUrl("me"), user);
}

export function deleteUser(user, jwt) {
  return http.delete(userUrl(user._id), {
    headers: { "x-auth-token": jwt }
  });
}

export function updateUser(user, id, jwt) {
  return http
    .put(userUrl(id), user, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addUser(user, jwt) {
  return http
    .post(userUrl("shaikh"), user, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function getUserRole() {
  const jwt = localStorage.getItem("token");
  if (jwt) {
    const user = jwt_decode(jwt);
    return user.isShaikh ? "shaikh" : "admin";
  }
  return "client";
}
