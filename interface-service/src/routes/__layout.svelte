<script>
	import { session } from '$app/stores';
	import HeaderNav from '$lib/components/Layout/HeaderNav.svelte';
	import AuthStore from '$lib/stores/auth';
	import { setContext } from 'svelte';

	setContext('auth', new AuthStore(session));
</script>

<main>
	<slot />
	<HeaderNav />
</main>

<style lang="scss" global>
	@import './src/styles/main.scss';
</style>
