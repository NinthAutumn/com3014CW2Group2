import Cookie from "js-cookie";
function fetchHandler(f, access_token) {
  let headers = { "Content-Type": "application/json" };
  if (access_token) {
    headers["authorization"] = `Bearer ${access_token}`;
  } else if (Cookie.get("access_token")) {
    headers["authorization"] = `Bearer ${Cookie.get("access_token")}`;
  }
  return async function(route, method, data) {
    return (await f(`http://0.0.0.0:8080/api${route}`, {
      method: method || "GET",
      ...(() => {
        if (data) {
          return { body: JSON.stringify(data) };
        }
        return {};
      })(),
      headers: { ...headers }
    })).json();
  };
}
const http = fetchHandler;
export { http as h };
