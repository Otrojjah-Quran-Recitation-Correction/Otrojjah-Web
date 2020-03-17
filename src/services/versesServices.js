import http from "./httpServices";
import { versesUrl } from "../config.json";

function verseUrl(id) {
  return `${versesUrl}/${id}`;
}

function verseQuery(id) {
  return `${versesUrl}?${id}`;
}

export function getVerses(id) {
  const ruleId = `ruleId=${id}`;
  return http.get(verseQuery(ruleId));
}

export function getVerse(id) {
  const Id = `id=${id}`;
  return http.get(verseQuery(Id));
}

export function deleteVerse(verse, jwt) {
  return http.delete(verseUrl(verse._id), {
    headers: { "x-auth-token": jwt }
  });
}

export function updateVerse(verse, id, jwt) {
  return http
    .put(verseUrl(id), verse, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addVerse(verse, jwt) {
  return http
    .post(versesUrl, verse, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
