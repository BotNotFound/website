import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Empty for a user site or a custom domain; "/<repo>" for a GitHub Pages project
// site, where everything is served under a subpath. The deploy workflow sets it.
// Every hand-written link and asset path in the app is prefixed with `base` from
// $app/paths, so both cases work from the same source.
const basePath = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			paths: {
				base: basePath
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				precompress: false,
				strict: true
			})
		})
	]
});