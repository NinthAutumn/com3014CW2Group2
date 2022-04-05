<script>
	import { session } from '$app/stores';
	import AuthStore from '$lib/stores/auth';
	import { setContext } from 'svelte';

	setContext('auth', new AuthStore(session));
</script>

<main>
	<slot />
</main>

<style lang="scss" global>
	@import './src/styles/main.scss';
</style>
