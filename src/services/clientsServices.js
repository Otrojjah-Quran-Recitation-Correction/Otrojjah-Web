import http from "./httpServices";
import { clientsUrl } from "../config.json";

function clientUrl(id) {
  return `${clientsUrl}/${id}`;
}

export function getClients() {
  return http.get(clientsUrl);
}

export function getClient(id) {
  return http.get(clientUrl(id));
}

export function deleteClient(client, jwt) {
  return http.delete(clientUrl(client._id), client, {
    headers: { "x-auth-token": jwt }
  });
}

export function updateClient(client, id, jwt) {
  return http
    .put(clientUrl(id), client, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addClient(client) {
  return http.post(clientsUrl, client);
}
