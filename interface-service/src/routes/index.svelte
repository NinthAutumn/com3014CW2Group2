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
	import PetList from '$lib/components/Pet/PetList.svelte';
	import { http } from '$lib/http';

	import { onMount } from 'svelte';

	let pets = [],
		page = 1,
		limit = 20;

	onMount(async () => {
		pets = await http(fetch)(`/match/pets/not-matched?page=${page}&limit=${limit}`);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="landing-page page">
	<div class="landing-page__container container">
		<div class="landing-page__pet-list">
			<PetList bind:pets match={true} />
		</div>
	</div>
</div>

<style lang="scss">
	.landing-page {
		&__pet-list {
			background: var(--container-background-color);
			padding: 2rem;
			border-radius: 2rem;
			max-width: 40rem;
			margin: 0 auto;
		}
	}
</style>
