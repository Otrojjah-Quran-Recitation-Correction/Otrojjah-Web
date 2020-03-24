import http from "./httpServices";
import { recordsUrl } from "../config.json";

function recordQuery(id) {
  return `${recordsUrl}?${id}`;
}

function recordUrl(id) {
  return `${recordsUrl}/${id}`;
}

export function getRecords(id, jwt) {
  const verseId = `verseId=${id}`;
  return http.get(recordQuery(verseId), { headers: { "x-auth-token": jwt } });
}

export function getRecord(id, jwt) {
  const Id = `id=${id}`;
  return http.get(recordQuery(Id), { headers: { "x-auth-token": jwt } });
}

export function getRandomRecord(type, jwt) {
  const recordType = `random/${type}`;
  return http.get(recordUrl(recordType), { headers: { "x-auth-token": jwt } });
}

export function deleteRecord(record, jwt) {
  return http.delete(recordUrl(record._id), record, {
    headers: { "x-auth-token": jwt }
  });
}

export function labelRecord(label, id, jwt) {
  const labelRoute = `label/${id}`;
  return http
    .put(recordUrl(labelRoute), label, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error.response.data);
      alert(error.response.data);
      return error.response.data;
    });
}

export function updateRecord(record, id, jwt) {
  return http
    .put(recordUrl(id), record, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addRecord(record, jwt) {
  return http
    .post(recordsUrl, record, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
