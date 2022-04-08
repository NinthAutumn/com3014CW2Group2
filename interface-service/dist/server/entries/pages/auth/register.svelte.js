import { c as create_ssr_component, a as add_attribute, e as escape, n as null_to_empty, g as getContext, v as validate_component } from "../../../chunks/index-28a5b476.js";
import { h as http } from "../../../chunks/http-5f19d396.js";
import "js-cookie";
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
var faArrowLeft = {
  prefix: "fas",
  iconName: "arrow-left",
  icon: [448, 512, [8592], "f060", "M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"]
};
const parseNumber = parseFloat;
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss([
    `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
    `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
    rotate && `rotate(${rotate}${rotateUnit})`
  ], " ");
}
var fa_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".spin.svelte-1w3t65e{-webkit-animation:svelte-1w3t65e-spin 2s 0s infinite linear;animation:svelte-1w3t65e-spin 2s 0s infinite linear}.pulse.svelte-1w3t65e{-webkit-animation:svelte-1w3t65e-spin 1s infinite steps(8);animation:svelte-1w3t65e-spin 1s infinite steps(8)}@-webkit-keyframes svelte-1w3t65e-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes svelte-1w3t65e-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}",
  map: null
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  let { id = "" } = $$props;
  let { style = "" } = $$props;
  let { icon } = $$props;
  let { size = "" } = $$props;
  let { color = "" } = $$props;
  let { fw = false } = $$props;
  let { pull = "" } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = "" } = $$props;
  let { flip = false } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let i;
  let c;
  let s;
  let transform;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
    $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
    $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
    $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
    $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
    $$bindings.flip(flip);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
    $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
    $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
    $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
    $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
    $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
    $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css$1);
  i = icon && icon.icon || [0, 0, "", [], ""];
  c = joinCss([clazz, "svelte-fa", spin && "spin", pulse && "pulse"], " ");
  s = getStyles(style, size, pull, fw);
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  return `${i[4] ? `<svg${add_attribute("id", id, 0)} class="${escape(null_to_empty(c)) + " svelte-1w3t65e"}"${add_attribute("style", s, 0)}${add_attribute("viewBox", `0 0 ${i[0]} ${i[1]}`, 0)} aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g${add_attribute("transform", `translate(${i[0] / 2} ${i[1] / 2})`, 0)}${add_attribute("transform-origin", `${i[0] / 4} 0`, 0)}><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>` : `<path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>`}</g></g></svg>` : ``}`;
});
var register_svelte_svelte_type_style_lang = "";
const css = {
  code: ".register-page.svelte-1evv4cj h1.svelte-1evv4cj{text-align:center}.register-page__card.svelte-1evv4cj.svelte-1evv4cj{background:var(--container-background-color);padding:2rem;border-radius:2rem;max-width:40rem;margin:0 auto}.register-page.svelte-1evv4cj label.svelte-1evv4cj{font-size:2rem}",
  map: null
};
const load = async ({ session, url, fetch: fetch2 }) => {
  return {};
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = {
    email: "",
    password: "",
    confirm_password: "",
    username: ""
  };
  let error = "", username_taken = false, email_taken = false;
  let { verified = "" } = $$props;
  getContext("auth");
  async function checkEmailTaken(email) {
    if (!email)
      return;
    const { taken } = await http(fetch)(`/users/user/email/${email}/taken`);
    email_taken = taken;
  }
  async function checkUsernameTaken(username) {
    if (!username)
      return;
    const { taken } = await http(fetch)(`/users/user/username/${username}/taken`);
    username_taken = taken;
  }
  if ($$props.verified === void 0 && $$bindings.verified && verified !== void 0)
    $$bindings.verified(verified);
  $$result.css.add(css);
  {
    checkEmailTaken(form.email);
  }
  {
    checkUsernameTaken(form.username);
  }
  return `<div class="${"register-page page svelte-1evv4cj"}"><div class="${"register-page__container container"}"><div class="${"button button--close"}" style="${"margin-bottom:1rem;"}">${validate_component(Fa, "Fa").$$render($$result, { icon: faArrowLeft }, {}, {})}</div>
		<form class="${"register-page__card svelte-1evv4cj"}"><h1 class="${"svelte-1evv4cj"}">Register</h1>

			<label for="${"username"}" class="${"svelte-1evv4cj"}">Username</label>
			<input placeholder="${"Username"}" type="${"text"}" class="${"input input--normal input--white"}" style="${"margin-bottom:2rem;"}" required${add_attribute("value", form.username, 0)}>

			${username_taken ? `<div class="${"error"}">This Username is Already Taken!</div>` : ``}

			<label for="${"username"}" class="${"svelte-1evv4cj"}">Email</label>
			<input placeholder="${"Email"}" type="${"text"}" class="${"input input--normal input--white"}" required style="${"margin-bottom:2rem;"}"${add_attribute("value", form.email, 0)}>
			${email_taken ? `<div class="${"error"}">This Email is Already Taken!</div>` : ``}

			<label for="${"username"}" class="${"svelte-1evv4cj"}">Password</label>
			<input type="${"password"}" placeholder="${"*********"}" class="${"input input--normal input--white"}" required style="${"margin-bottom:2rem;"}" minlength="${"6"}"${add_attribute("value", form.password, 0)}>
			<label for="${"username"}" class="${"svelte-1evv4cj"}">Confirm Password</label>
			<input type="${"password"}" placeholder="${"*********"}" class="${"input input--normal input--white"}" style="${"margin-bottom:2rem;"}" required minlength="${"6"}"${add_attribute("value", form.confirm_password, 0)}>

			<div class="${"error error--center"}">${escape(error)}</div>

			<button type="${"submit"}" style="${"width:100%;"}" class="${"button button--normal button--secondary button--very-round"}">Register</button></form></div>
</div>`;
});
export { Register as default, load };
