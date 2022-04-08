import * as cookie from "cookie";
import { h as http } from "./http-5f19d396.js";
import Cookie from "js-cookie";
import fetch from "node-fetch";
async function handle({ event, resolve }) {
  event.locals.token = {
    access_token: cookie.parse(event.request.headers.get("cookie") ?? "")["access_token"],
    refresh_token: cookie.parse(event.request.headers.get("cookie") ?? "")["refresh_token"]
  };
  const response = await resolve(event);
  return response;
}
async function getSession(req) {
  let isMobile = false;
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(req.request.headers["user-agent"])) {
    isMobile = true;
  }
  const context = req.locals;
  let initSession = {
    user: {},
    isMobile,
    authenticated: false,
    token: context.token
  };
  if (context["token"].refresh_token) {
    Cookie.remove("access_token");
    const data = await http(fetch)("/auth/refreshToken", "PATCH", {
      refresh_token: context["token"].refresh_token
    });
    if (data.statusCode) {
      Cookie.remove("refresh_token");
      return initSession;
    }
    initSession = {
      user: data.user,
      authenticated: true,
      isMobile,
      token: data.token
    };
  }
  return initSession;
}
export { getSession, handle };
