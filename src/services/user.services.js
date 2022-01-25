import { API, IS_MOCK } from "./base";
import { cookies } from "./auth.service";

export const getUser = (user) => {
  console.log(cookies.get("authtoken"))
  return fetch(`${API}/user/get-users?user=me`, {
      headers: {
        "Content-Type": "application/json",
        authtoken: cookies.get("authtoken"),
      }
  }).then(data => data.json());
};
