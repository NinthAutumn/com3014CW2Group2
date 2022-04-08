import { g as getContext, c as create_ssr_component, s as setContext, v as validate_component } from "../../chunks/index-28a5b476.js";
import { h as http } from "../../chunks/http-5f19d396.js";
import Cookie from "js-cookie";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const throw_error = (verb) => {
  throw new Error(`Can only ${verb} session store in browser`);
};
const session = {
  subscribe(fn) {
    const store = getStores().session;
    return store.subscribe(fn);
  },
  set: () => throw_error("set"),
  update: () => throw_error("update")
};
var HeaderNav_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".header-nav.svelte-1dp675s{height:5rem;position:fixed;top:0;left:0;box-sizing:border-box}.header-nav__container.svelte-1dp675s{background:var(--container-background-color);border-bottom-left-radius:1rem;border-bottom-right-radius:1rem;height:5rem;box-sizing:border-box;padding:0.5rem;margin-top:-1rem}.header-nav__actions.svelte-1dp675s{display:flex;justify-content:flex-end}.header-nav__avatar.svelte-1dp675s{border-radius:10rem;overflow:hidden;padding:1rem;height:4rem;box-sizing:border-box}",
  map: null
};
const HeaderNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const auth = getContext("auth")?.state;
  $$result.css.add(css$1);
  return `<nav class="${"header-nav page svelte-1dp675s"}"><div class="${"container"}"><div class="${"header-nav__container svelte-1dp675s"}"><div class="${"header-nav__actions svelte-1dp675s"}"><div class="${"header-nav__action"}"><div class="${"header-nav__avatar svelte-1dp675s"}">${auth.authenticated ? `<img src="${"/avatar.svg"}" height="${"20"}" width="${"20"}" alt="${""}">` : `<img src="${"/icon-user.svg"}" height="${"20"}" width="${"20"}" alt="${""}">`}</div></div></div></div></div>
</nav>`;
});
class AuthStore {
  constructor(state) {
    this.state = {
      authenticated: false,
      user: {},
      token: {},
      isMobile: false
    };
    if (state.authenticated)
      ;
    this.state = state;
  }
  logoutUser() {
  }
  async loginUser(form) {
    const data = await http(fetch)("/auth/login", "POST", form);
    if (data.error) {
      return { error: data.error };
    }
    return this.setAuth(data);
  }
  async setAuth({ user, token }) {
    await this.state.update((value) => {
      return { ...value, user, authenticated: true, token };
    });
    console.log("updated");
    Cookie.set("access_token", token, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7))
    });
  }
  async registerUser(form) {
    const data = await http(fetch)("/auth/register", "POST", form);
    if (data.error) {
      return { error: data.error };
    } else if (data.success) {
      return { success: data.success };
    }
  }
}
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.theme-green{--white:white;--lightest:#D8F3DC;--lighter:#95D5B2;--light:#74C69D;--color:#52B788;--dark:#40916C;--darker:#2D6A4F;--darkest:#1B4332;--black:#081C15;--error:#B75252;--error-light:#F3D8D8}.theme-green--light{--primary-background:var(--color);--primary-color:var(--white);--container-background:var(--white);--text-color:var(--darker);--success-background:var(--lightest);--success-color:var(--color);--error-background:var(--error-light);--error-color:var(--error);--content-background:var(--lighter);--background-color:var(--lightest);--box-shadow:0 0.063em 0.313em 0 rgba(0, 0, 0, 0.07),\n    0 0.438em 1.063em 0 rgba(0, 0, 0, 0.1);--input-background-color:var(--color);--input-placeholder:var(--lightest);--input-color:var(--white);--pill-background:var(--lightest);--pill-color:var(--darkest);--table-header-background:var(--darker);--table-header-color:var(--lightest);--table-light-header-background:var(--lightest);--table-light-header-color:var(--darkest)}.theme-azure{--white:white;--lightest:#9efabe;--lighter:#95D5B2;--light:#a6afff;--color:#6573ff;--dark:#374677;--darker:#2a3761;--darkest:#202945;--sub-darkest:#293456;--black:#081C15;--error:#ff333d;--error-light:rgb(255, 247, 247)}.theme-azure--dark{--primary-background:var(--color);--primary-color:var(--white);--container-background:var(--sub-darkest);--text-color:var(--white);--success-background:var(--light);--success-color:var(--color);--error-background:var(--pill-background);--error-color:var(--error);--content-background:var(--light);--background-color:var(--darkest);--box-shadow:0 0.063em 0.313em 0 rgba(0, 0, 0, 0.07),\n    0 0.438em 1.063em 0 rgba(0, 0, 0, 0.1);--input-background-color:var(--darkest);--input-placeholder:var(--color);--input-color:var(--white);--input-border:var(--light);--pill-background:var(--black);--pill-color:var(--light);--table-header-background:var(--dark);--table-header-color:var(--white);--table-light-header-background:var(--darkest);--table-light-header-color:var(--light);--link-background:var(--dark);--link-hover-color:var(--light);--table-unselected:var(--black)}.theme-default{--primary:#4379FF;--light-primary:#F7FAFC;--primary-back:#DAE8FF;--secondary:#092540;--light-secondary:#3c4257;--error:#C52D2D;--success:#3ECF8E;--very-small-box-shadow:rgba(0, 0, 0, 0) 0px 0px 0px 0px,\n  rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,\n  rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,\n  rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;--small-box-shadow:rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,\n    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,\n    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,\n    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;--box-shadow:0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08);--error-text-color:var(--error);--success-text-color:var(--success);--link-text-color:var(--primary);--text-color:var(--secondary);--background-color:var(--light-primary);--label-text-color:var(--light-secondary);--emphasized-text-color:var(--primary);--button-color:white;--container-background-color:white;--text-background-color:white}.button{display:grid;place-content:center;font-weight:bold;white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.button--back{display:flex;align-items:center;justify-content:center;font-size:1.5rem;height:4rem;width:4rem;background:white;border-radius:10rem;margin-top:1rem;color:var(--primary)}.button--close{display:flex;align-items:center;justify-content:center;font-size:1.6rem;height:4.5rem;width:4.5rem;background:white;border-radius:10rem;margin-top:1rem;color:var(--error)}.button--primary{background:var(--primary);color:white}.button--primary--light{background:#DAE8FF;color:var(--primary)}.button__icon{margin-right:1rem}.button--secondary{background:var(--secondary);color:white}.button--stripe{background:#5469d4;color:white}.button--green{background:var(--success);color:white}.button--very-round{border-radius:100px}.button--round{border-radius:5px}.button--normal{height:5rem;padding:0 2.5rem;font-size:1.6rem}.button--small{height:3rem;padding:0 2rem;font-size:1.4rem;white-space:nowrap}.button--big{height:4rem;padding:0 3rem;font-size:1.8rem}.pill{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}@media screen and (max-width: 750px){.pill{flex-grow:1;text-align:center}}.pill--normal{border-radius:10rem;font-weight:bold;padding:0.5rem 4rem;font-size:1.4rem}.pill--error{color:var(--error-color);background:var(--error-background);border:1px solid var(--error-background);transition:200ms}.pill--success{color:var(--darkest);background:var(--success-background);transition:200ms;border:1px solid var(--success-color)}.pill--primary{color:var(--pill-color);background:var(--pill-background);border:1px solid var(--pill-background);transition:200ms}.flex{display:flex}.flex--right{justify-content:flex-end}.flex--center{justify-content:center}.flex--between{justify-content:space-between}.flex--align{align-items:center}.flex--col{flex-direction:column}input[type=date]{font-family:inherit}.input{border:none;box-sizing:border-box;margin-bottom:1rem;margin-top:0.5rem}.input__dollar{height:100%;width:2.5rem;display:grid;place-content:center;font-size:1.5rem}.input:active,.input:focus{outline:0}.input--textarea{height:10rem;font-size:1.3rem;width:100%;font-weight:400;padding:1rem 1.2rem;border-radius:0.5rem;font-family:inherit}.input--normal{height:5rem;font-size:1.6rem;width:100%;padding:0 1.2rem;border-radius:0.5rem}.input--white{background-color:var(--container-background-color);box-shadow:var(--very-small-box-shadow)}.input--primary{border:1px solid #f7f7f7;background-color:var(--background-color)}.error{color:var(--error);font-size:1.4rem;margin-bottom:2rem}body{background:var(--background-color);padding:0;margin:0;color:var(--text-color);padding-top:6rem}@media screen and (max-width: 320px){html{font-size:8px}}@media screen and (max-width: 750px){html{font-size:9px}}@media screen and (min-width: 751px){html{font-size:10px}}.container{width:100%;max-width:40rem;padding:1rem;box-sizing:border-box;margin:0 auto}@media screen and (max-width: 750px){.container{padding:0.5rem !important}}.page{width:100%}h1{font-size:3rem;margin:0;margin-bottom:2rem;margin-top:1rem}h2{font-size:2.5rem;margin:0;margin-bottom:2rem;margin-top:1rem}h3{font-size:2rem;margin:0;margin-bottom:0.5rem;margin-top:1rem}p{margin-top:0}input,textarea,select{background:var(--input-background-color);color:var(--input-color);border:var(--input-border)}:root{color:var(--text-color);-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;font-feature-settings:"pnum";font-variant-numeric:proportional-nums;box-sizing:border-box;line-height:normal;-webkit-tap-highlight-color:transparent;font-family:"Noto Sans JP", "Helvetica Neue", "Segoe UI", Helvetica, Verdana, Arial, sans-serif;font-weight:400}ul,li{list-style:none;padding:0}label{font-size:1.4rem}a{text-decoration:none;color:var(--text-color)}',
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  setContext("auth", new AuthStore(session));
  $$result.css.add(css);
  return `<main>${slots.default ? slots.default({}) : ``}
	${validate_component(HeaderNav, "HeaderNav").$$render($$result, {}, {}, {})}
</main>`;
});
export { _layout as default };
