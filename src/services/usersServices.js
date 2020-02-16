import http from "./httpServices";
import { usersUrl } from "../config.json";

function userUrl(id) {
  return `${usersUrl}/${id}`;
}

export function getUsers() {
  return http.get(usersUrl);
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function getUserData(user) {
  return http.get(userUrl("me"), user);
}

export function deleteUser(user, jwt) {
  return http.delete(userUrl(user._id), user, {
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
    .post(usersUrl, user, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
