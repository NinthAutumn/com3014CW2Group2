import { c as create_ssr_component, g as getContext, a as add_attribute, e as escape } from "../../../chunks/index-28a5b476.js";
import { h as http } from "../../../chunks/http-5f19d396.js";
import "js-cookie";
var login_svelte_svelte_type_style_lang = "";
const css = {
  code: ".login-page.svelte-10ltlt5 h1.svelte-10ltlt5{text-align:center}.login-page.svelte-10ltlt5 a.svelte-10ltlt5{text-decoration:none;color:var(--text-color);font-size:1.6rem;margin:1rem 0;text-align:center;display:flex;align-items:center;justify-content:center}.login-page__card.svelte-10ltlt5.svelte-10ltlt5{background:var(--container-background-color);padding:2rem;border-radius:2rem;max-width:40rem;margin:0 auto}.login-page.svelte-10ltlt5 label.svelte-10ltlt5{font-size:2rem}",
  map: null
};
const load = async ({ session, url, fetch }) => {
  if (session.authenticated) {
    return { redirect: "/", status: 302 };
  } else {
    if (!!url.searchParams.get("verify")) {
      let verified;
      try {
        const data = await http(fetch)("/user/verifyEmail", "POST", { token: url.searchParams.get("verify") });
        if (data) {
          verified = "Account has been verified, please log in";
        } else {
          verified = "Cannot verify account";
        }
      } catch (_) {
        verified = "Something went wrong";
      }
      return { props: { verified } };
    }
  }
  return {};
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = { credential: "", password: "" };
  let error = "";
  let { verified = "" } = $$props;
  getContext("store");
  if ($$props.verified === void 0 && $$bindings.verified && verified !== void 0)
    $$bindings.verified(verified);
  $$result.css.add(css);
  return `<div class="${"login-page page svelte-10ltlt5"}"><div class="${"login-page__container container"}"><form class="${"login-page__card svelte-10ltlt5"}"><h1 class="${"svelte-10ltlt5"}">Login</h1>

			<label for="${"username"}" class="${"svelte-10ltlt5"}">Username\u30FBEmail</label>
			<input placeholder="${"Username\u30FBEmail"}" type="${"text"}" required class="${"input input--normal input--white"}"${add_attribute("value", form.credential, 0)}>

			<label for="${"username"}" class="${"svelte-10ltlt5"}">Password</label>
			<input type="${"password"}" required placeholder="${"*********"}" class="${"input input--normal input--white"}"${add_attribute("value", form.password, 0)}>
			<div class="${"error error--center"}">${escape(error)}</div>
			<a style="${"margin:2rem 0;"}" href="${"/auth/forgotten"}" class="${"svelte-10ltlt5"}">Forgotten Your Password</a>
			<button type="${"submit"}" style="${"width:100%;"}" class="${"button button--normal button--primary button--very-round"}">Login</button>
			<a style="${"margin:2rem 0;"}" href="${"/auth/register"}" class="${"svelte-10ltlt5"}">Create a New Account</a></form></div>
</div>`;
});
export { Login as default, load };
