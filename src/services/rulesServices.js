import http from "./httpServices";

const apiEndPoint = "/rule";

function ruleUrl(id) {
  return `${apiEndPoint}/${id}`;
}

function ruleQuery(id) {
  return `${apiEndPoint}?${id}`;
}

export function getRoot() {
  const root = `name=root`;
  return http.get(ruleQuery(root));
}

export function getRules(id) {
  const parentId = `parentId=${id}`;
  return http.get(ruleQuery(parentId));
}

export function getRule(id) {
  const Id = `id=${id}`;
  return http.get(ruleQuery(Id));
}

export function deleteRule(rule, jwt) {
  return http.delete(ruleUrl(rule._id), rule, {
    headers: { "x-auth-token": jwt }
  });
}

export function updateRule(rule, id, jwt) {
  return http
    .put(ruleUrl(id), rule, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}

export function addRule(rule, jwt) {
  return http
    .post(apiEndPoint, rule, { headers: { "x-auth-token": jwt } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      alert(error.response.data);
      return error.response.data;
    });
}
