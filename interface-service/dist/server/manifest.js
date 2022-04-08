export const manifest = {
	appDir: "_app",
	assets: new Set(["avatar.svg","favicon.png","icon-user.svg","robots.txt","svelte-welcome.png","svelte-welcome.webp"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain",".webp":"image/webp"},
	_: {
		entry: {"file":"start-b1e9c97a.js","js":["start-b1e9c97a.js","chunks/vendor-9f39b42c.js","chunks/singletons-d1fb5791.js"],"css":["assets/vendor-5101306d.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "auth/forgotten",
				pattern: /^\/auth\/forgotten\/?$/,
				names: [],
				types: [],
				path: "/auth/forgotten",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "auth/register",
				pattern: /^\/auth\/register\/?$/,
				names: [],
				types: [],
				path: "/auth/register",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "auth/login",
				pattern: /^\/auth\/login\/?$/,
				names: [],
				types: [],
				path: "/auth/login",
				shadow: null,
				a: [0,5],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
