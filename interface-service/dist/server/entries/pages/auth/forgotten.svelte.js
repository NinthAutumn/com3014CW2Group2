import { c as create_ssr_component, g as getContext, a as add_attribute, e as escape } from "../../../chunks/index-28a5b476.js";
import "js-cookie";
var forgotten_svelte_svelte_type_style_lang = "";
const css = {
  code: ".forgotten-page.svelte-19mtr7l h1.svelte-19mtr7l{text-align:center}.forgotten-page__card.svelte-19mtr7l.svelte-19mtr7l{background:var(--container-background-color);padding:2rem;border-radius:2rem;max-width:40rem;margin:0 auto}.forgotten-page.svelte-19mtr7l label.svelte-19mtr7l{font-size:2rem}",
  map: null
};
const load = async ({ session, url, fetch }) => {
  if (session.authenticated) {
    return { redirect: "/", status: 302 };
  } else {
    let token = "";
    if (url.searchParams.get("token")) {
      token = url.searchParams.get("token");
    }
    return { props: { token } };
  }
};
const Forgotten = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = { credential: "" };
  let { token = "" } = $$props;
  let reset_form = { password: "", confirm_password: "" };
  let error = "", success = "";
  let { verified = "" } = $$props;
  getContext("store");
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.verified === void 0 && $$bindings.verified && verified !== void 0)
    $$bindings.verified(verified);
  $$result.css.add(css);
  return `<div class="${"forgotten-page page svelte-19mtr7l"}"><div class="${"forgotten-page__container container"}">${!token ? `<form class="${"forgotten-page__card svelte-19mtr7l"}"><h1 class="${"svelte-19mtr7l"}">Forgotten Password</h1>
				<label for="${"username"}" class="${"svelte-19mtr7l"}">Your Username\u30FBEmail</label>
				<input placeholder="${"Username\u30FBEmail"}" type="${"text"}" required class="${"input input--normal input--white"}"${add_attribute("value", form.credential, 0)}>

				<div class="${"error error--center"}">${escape(error)}</div>
				<div class="${"forgotten-page__success"}">${escape(success)}</div>
				<button type="${"submit"}" style="${"width:100%;"}" class="${"button button--normal button--primary button--very-round"}">Send Reset Email</button></form>` : `<form class="${"forgotten-page__card svelte-19mtr7l"}"><h1 class="${"svelte-19mtr7l"}">Change Password</h1>
				<label for="${"username"}" class="${"svelte-19mtr7l"}">New Password</label>
				<input placeholder="${"Username\u30FBEmail"}" type="${"text"}" required class="${"input input--normal input--white"}"${add_attribute("value", reset_form.password, 0)}>
				<label for="${"username"}" class="${"svelte-19mtr7l"}">Confirm Password</label>
				<input placeholder="${"Username\u30FBEmail"}" type="${"text"}" required class="${"input input--normal input--white"}"${add_attribute("value", reset_form.confirm_password, 0)}>
				<div class="${"error error--center"}">${escape(error)}</div>

				<button type="${"submit"}" style="${"width:100%;"}" class="${"button button--normal button--primary button--very-round"}">Update Password</button></form>`}</div>
</div>`;
});
export { Forgotten as default, load };
