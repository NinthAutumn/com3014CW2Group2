import pre from 'svelte-preprocess';
import autoPrefixer from 'autoprefixer';
import node from '@sveltejs/adapter-node';
const preprocess = pre({
	preserve: ['ld+json'],
	postcss: {
		plugins: [autoPrefixer]
	},
	scss: {
		includePaths: ['src']
		// prependData: ``,
	}
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess,

	kit: {
		adapter: node({
			host: '0.0.0.0',
			port: 8080,
			out: 'dist'
			// env: {
			//     port: '8080',
			// },
		}),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		vite: {
			server: {
				proxy: {
					'/api/auth': {
						target: 'http://0.0.0.0:3000',
						changeOrigin: true,
						secure: false,
						rewrite: (path) => path.replace(/^\/api\/auth/, '')
					},
					'/api/users': {
						target: 'http://0.0.0.0:3001',
						changeOrigin: true,
						secure: false,
						rewrite: (path) => path.replace(/^\/api\/users/, '')
					}
				}
			}
		}
	}
};

export default config;
