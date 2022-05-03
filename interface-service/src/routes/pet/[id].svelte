<script context="module">
	export const load = async ({ session, params, fetch }) => {
		if (!session.authenticated) {
			return {
				redirect: '/auth/login',
				status: 302
			};
		}

		const pet = await http(fetch)('/pets/pets/' + params.id);
		let shelter = {};
		if (pet.shelter_id) shelter = await http(fetch)('/shelters/shelters/' + pet.shelter_id);
		return {
			props: {
				pet,
				shelter
			}
		};
	};
</script>

<script>
	import { goto } from '$app/navigation';

	import PetCard from '$lib/components/Pet/PetCard.svelte';
	import { http } from '$lib/http';
	import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
	import { getContext, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	export let pet = {},
		shelter = {},
		match = {},
		matched_users = [];
	const auth = getContext('auth');
	onMount(async () => {
		const shelter = await http(fetch)('/shelters/shelters/user');
		if (shelter.length > 0) {
			console.log(shelter);
			auth.setShelter(shelter[0]);
			if (shelter[0].id == pet.shelter_id)
				matched_users = await http(fetch)(`/match/pets/${pet.id}/users`);
		}
		match = await http(fetch)(`/match/pets/${pet.id}/status`);
	});
	async function adoptedHandler() {
		matched_users = await http(fetch)(`/match/pets/${pet.id}/users`);
	}
	async function matchHandler() {
		match = await http(fetch)(`/match/pets/${pet.id}/status`);
	}

	function goBack(defaultRoute = '/home') {
		history.back();
	}
</script>

<div class="pet-page page">
	<div class="pet-page__container container">
		<div class="button button--back" style="margin-bottom:2rem;" on:click={() => goBack('/')}>
			<Fa icon={faArrowLeft} />
		</div>
		<div class="pet-page__card">
			<PetCard
				on:adopted={adoptedHandler}
				on:matched={matchHandler}
				{matched_users}
				{pet}
				{shelter}
				{match}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.pet-page {
		&__card {
			background: var(--container-background-color);
			padding: 2rem;
			border-radius: 2rem;
			max-width: 40rem;
			margin: 0 auto;
			margin-bottom: 2rem;
		}
	}
</style>
