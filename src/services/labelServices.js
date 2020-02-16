import http from "./httpServices";
import { clientsUrl, labelsUrl } from "../config.json";

function clientUrl(id) {
  return `${clientsUrl}/${id}`;
}

function labelUrl(id) {
  return `${labelsUrl}/${id}`;
}

export function getRandomClient() {
  return http.get(clientUrl("random"));
}

export function updateLabel(client, id, jwt) {
  return http
    .put(labelUrl(id), client, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
