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
			ssr: {
				noExternal: ['@fortawesome/free-solid-svg-icons']
			},
			server: {}
		}
	}
};

export default config;
