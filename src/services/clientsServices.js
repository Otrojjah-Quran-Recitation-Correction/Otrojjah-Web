import http from "./httpServices";
import { clientsUrl } from "../config.json";

export function getClients() {
  return http.get(clientsUrl);
}
