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

export function deleteClient(client) {
  return http.delete(clientUrl(client._id), client);
}

export function updateClient(client, id) {
  return http
    .put(clientUrl(id), client)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
