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
				user: ''
			}
		};
	};
</script>

<script>
	import UserProfile from '$lib/components/User/UserProfile.svelte';
	export let user = {};
</script>

<div class="user-page page">
	<div class="user-page__container container">
		<UserProfile {user} />
	</div>
</div>

<style lang="scss"></style>
