import * as cookie from 'cookie';
import { http } from '$lib/http';
import Cookie from 'js-cookie';
import fetch from 'node-fetch';

export async function handle({ event, resolve }) {
	event.locals.token = {
		access_token: cookie.parse(event.request.headers.get('cookie') ?? '')['access_token']
	};

	const response = await resolve(event);

	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(req) {
	let isMobile = false; //initiate as false
	// device detection
	if (
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
			req.request.headers['user-agent']
		)
	) {
		isMobile = true;
	}

	const context = req.locals;
	let initSession = {
		user: {},
		isMobile,
		authenticated: false,
		token: context.token
	};
	if (context['token'].access_token) {
		// http.defaults.headers.common[
		//   "authorization"
		// ] = `Bearer ${context.access_token}`;

		const data = await http(fetch, context['token'].access_token)('/users/self');
		if (data.statusCode) {
			Cookie.remove('access_token');
			return initSession;
		}
		initSession = {
			user: data.user,
			authenticated: true,
			isMobile,
			token: context['token'].access_token
		};
	}

	return initSession;
}
