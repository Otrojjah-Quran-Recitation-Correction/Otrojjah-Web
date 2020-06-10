import http from "./httpServices";

const apiEndPoint = "/record";

function recordQuery(id) {
  return `${apiEndPoint}?${id}`;
}

function recordUrl(id) {
  return `${apiEndPoint}/${id}`;
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
  const query = `id=${record._id}`;
  return http.delete(recordQuery(query), {
    headers: { "x-auth-token": jwt }
  });
}

export function deleteGSCRecord(record, jwt) {
  const query = `id=${record._id}&storageDelete=${true}`;
  return http.delete(recordQuery(query), {
    headers: { "x-auth-token": jwt }
  });
}

export function deleteGSCRecords(verseId, isShaikh, jwt) {
  const query = `verseId=${verseId}&isShaikh=${isShaikh}&storageDelete=${true}`;
  return http.delete(recordQuery(query), {
    headers: { "x-auth-token": jwt }
  });
}

export function labelRecord(label, id, jwt) {
  const labelRoute = `label/${id}`;
  return http
    .put(recordUrl(labelRoute), label, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function updateRecord(record, id, jwt) {
  return http
    .put(recordUrl(id), record, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addRecord(record) {
  return http
    .post(apiEndPoint, record)
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
