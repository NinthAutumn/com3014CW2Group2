import { derived, writable } from 'svelte/store';
import { http } from '$lib/http';
import Cookie from 'js-cookie';
import { browser } from '$app/env';

export default class AuthStore {
	state = writable({
		authenticated: false,
		user: {},
		token: {},
		isMobile: false
	}) as any;

	user = {};
	constructor(state) {
		if (state.authenticated) {
			// Cookie.set("access_token", state.token);
			// axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
		}
		this.state = state;

		this.state.subscribe((val) => {
			this.user = val;
		});
	}

	logoutUser() {}

	async loginUser(form) {
		const data = await http(fetch)('/auth/login', 'POST', form);
		if (data.error) {
			return { error: data.error };
		}
		return this.setAuth(data);
	}

	async setAuth({ user, token }) {
		await this.state.update((value) => {
			return { ...value, user, authenticated: true, token };
		});
		console.log('updated');
		Cookie.set('access_token', token, {
			expires: new Date(new Date().setDate(new Date().getDate() + 7))
		});
		// axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
	}

	async registerUser(form) {
		const data = await http(fetch)('/auth/register', 'POST', form);
		if (data.error) {
			return { error: data.error };
		} else if (data.success) {
			return { success: data.success };
		}
		// return this.setAuth(data);
	}
}
