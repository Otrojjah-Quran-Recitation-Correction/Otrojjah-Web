import http from "./httpServices";
import { usersUrl } from "../config.json";

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
