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

export function deleteShaikhRecord(shaikh) {
  return http.delete(shaikhUrl(shaikh._id), shaikh);
}

export function updateShaikhRecord(shaikh, id) {
  return http
    .put(shaikhUrl(id), shaikh)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function downloadRecords(data) {
  return http
    .post(uploadFolderUrl, data)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
