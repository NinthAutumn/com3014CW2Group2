<script context="module">
	export const load = async ({ session, params, fetch }) => {
		if (!session.authenticated) {
			return {
				redirect: '/auth/login',
				status: 302
			};
		}

		const pet = await http(fetch)('/pets/pets/' + params.id);
		const shelter = await http(fetch)('/shelters/shelters/' + pet.shelter_id);
		return {
			props: {
				pet,
				shelter
			}
		};
	};
</script>

<script>
	import PetCard from '$lib/components/Pet/PetCard.svelte';
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	export let pet = {},
		shelter = {};
	const auth = getContext('auth');
	onMount(async () => {
		const shelter = await http(fetch)('/shelters/shelters/user');
		if (shelter.length > 0) {
			console.log(shelter);
			auth.setShelter(shelter[0]);
		}
	});
</script>

<div class="pet-page page">
	<div class="pet-page__container container">
		<div class="pet-page__card">
			<PetCard {pet} {shelter} />
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
