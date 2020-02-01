import http from "./httpServices";
import { apiUrl } from "../config.json";

export function getAyat() {
  return http.get(apiUrl);
}
