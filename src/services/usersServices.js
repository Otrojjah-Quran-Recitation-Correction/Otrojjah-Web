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

export function deleteUser(user) {
  return http.delete(userUrl(user._id), user);
}

export function updateUser(user, id) {
  return http
    .put(userUrl(id), user)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addUser(user) {
  return http
    .post(usersUrl, user)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
