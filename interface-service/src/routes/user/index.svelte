<script context="module">
	export const load = async ({ session, url, fetch }) => {
		if (!session.authenticated) {
			return {
				redirect: '/auth/login',
				status: 302
			};
		}
		return {
			props: {
				// user: ''
			}
		};
	};
</script>

<script>
	import UserProfile from '$lib/components/User/UserProfile.svelte';
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	const auth = getContext('auth');
	const state = auth?.state;
	// console.log($state);
	let user = $state.user;
	onMount(async () => {
		const shelter = await http(fetch)('/shelters/shelters/user');
		if (shelter.length > 0) {
			auth.setShelter(shelter[0]);
		}
	});
</script>

<div class="user-page page">
	<div class="user-page__container container">
		<UserProfile {user} />
	</div>
</div>

<style lang="scss"></style>
