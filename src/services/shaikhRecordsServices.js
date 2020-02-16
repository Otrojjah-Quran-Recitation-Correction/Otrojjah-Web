import http from "./httpServices";
import { shaikhsUrl, uploadFolderUrl } from "../config.json";

function shaikhUrl(id) {
  return `${shaikhsUrl}/${id}`;
}

export function getShaikhRecords() {
  return http.get(shaikhsUrl);
}

export function getShaikhRecord(id) {
  return http.get(shaikhUrl(id));
}

export function deleteShaikhRecord(shaikh, jwt) {
  return http.delete(shaikhUrl(shaikh._id), shaikh, {
    headers: { "x-auth-token": jwt }
  });
}

export function updateShaikhRecord(shaikh, id, jwt) {
  return http
    .put(shaikhUrl(id), shaikh, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function downloadRecords(data, jwt) {
  return http
    .post(uploadFolderUrl, data, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
