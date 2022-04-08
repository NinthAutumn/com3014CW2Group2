import { getContext } from 'svelte/internal';
// import {getConte}
import Cookie from 'js-cookie';

// let clientClient, serverClient;
// let instance = axios.create({
//   baseURL: API_ROUTE,
//   // timeout: 1000,
//   headers: {
//     post: { "Content-Type": "application/json" },
//     patch: { "Content-Type": "application/json" },
//   },
// });
// instance.interceptors.request.use((config) => {
//   // console.log();
//   // const auth = getContext("auth");
//   // console.log(auth);
//   if (Cookie.get("access_token")) {
//     config.headers["authorization"] = `Bearer ${Cookie.get("access_token")}`;
//   }
//   return config;
// });

// export default instance;

function fetchHandler(f, access_token?) {
	let headers = { 'Content-Type': 'application/json' };
	if (access_token) {
		headers['authorization'] = `Bearer ${access_token}`;
	} else if (Cookie.get('access_token')) {
		headers['authorization'] = `Bearer ${Cookie.get('access_token')}`;
	}
	return async function (route, method?, data?) {
		return (
			await f(`/api${route}`, {
				method: method || 'GET',
				...(() => {
					if (data) {
						return { body: JSON.stringify(data) };
					}
					return {};
				})(),
				headers: { ...headers }
			})
		)?.json();
	};
}
export const http = fetchHandler;
