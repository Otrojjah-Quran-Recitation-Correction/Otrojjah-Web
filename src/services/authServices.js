import http from "./httpServices";

const apiEndPoint = "/auth";

export function loginUser(email, password) {
  return http
    .post(apiEndPoint, {
      email,
      password
    })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      alert(error.response.data);
    });
}
