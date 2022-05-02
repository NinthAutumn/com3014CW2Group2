<script>
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	import PetList from '$lib/components/Pet/PetList.svelte';
	import ShelterForm from '$lib/components/Shelter/ShelterForm.svelte';
	import PetForm from '$lib/components/Pet/PetForm.svelte';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let user;
	let shelter_pets = [
			{
				name: 'dog',
				description: 'dog info',
				avatar: ''
			}
		],
		user_pets = [],
		pet_form = false,
		shelter_form = false;
	const auth = getContext('auth');
	onMount(async () => {
		if (user.shelter) {
			shelter_pets = await http(fetch)(`/pets/pets/${user.shelter.id}/list`);
		}
		user_pets = await http(fetch)(`/match/pets/user`);
	});

	async function createdHandler() {
		shelter_form = false;
		const shelter = await http(fetch)('/shelters/shelters/user');
		if (shelter.length > 0) {
			auth.setShelter(shelter[0]);
		}
	}

	function updateHandler({ detail }) {
		console.log(detail);
		auth.setShelter(detail);
	}

	async function petCreatedHandler() {
		shelter_pets = await http(fetch)(`/pets/pets/${user.shelter.id}/list`);
	}
</script>

<div class="user-profile">
	{#if shelter_form}
		<div class="dialog dialog__container">
			<div class="dialog__close" on:click={() => (shelter_form = false)} />
			<div class="dialog__content" style="max-width:50rem;padding-top:0;">
				<div class="dialog__header flex flex--align flex--between">
					<h3>Become Shelter</h3>
					<div class="button button--close" on:click={() => (shelter_form = false)}>
						<Fa icon={faTimes} />
					</div>
				</div>
				<ShelterForm on:created={createdHandler} />
			</div>
		</div>
	{/if}
	{#if pet_form}
		<div class="dialog dialog__container">
			<div class="dialog__close" on:click={() => (pet_form = false)} />
			<div class="dialog__content">
				<div class="dialog__header flex flex--align flex--between">
					<h3>Add Pets</h3>
					<div class="button button--close" on:click={() => (pet_form = false)}>
						<Fa icon={faTimes} />
					</div>
				</div>
				<PetForm on:created={petCreatedHandler} />
			</div>
		</div>
	{/if}
	<div class="user-profile__container">
		<div class="user-profile__shelter">
			{#if user.shelter}
				<h3>Shelter Details</h3>
				<ShelterForm on:updated={updateHandler} form={user.shelter} />
				<hr style="margin:2rem 0;" />

				<h3>Shelter Pets</h3>

				<PetList pets={shelter_pets} shelter={true} />
				<hr style="margin:2rem 0;" />
				<button
					on:click={() => (pet_form = true)}
					style="width:100%;margin-top:1rem;"
					class="button button--normal button--secondary button--very-round"
				>
					Place New Pet For Adoption
				</button>
			{:else}
				<button
					on:click={() => (shelter_form = true)}
					style="width:100%;margin-top:1rem;"
					class="button button--normal button--primary button--very-round"
				>
					Become a Shelter
				</button>
			{/if}
		</div>
		<!-- {#if !user.shelter} -->
		<div class="user-profile__matched">
			<h3>Matched Pets</h3>
			<PetList pets={user_pets} />
			{#if user_pets.length < 1}
				<p style="font-size:1.6rem;text-align:center;margin:2rem 0;">No Matched Pets Yet</p>
			{/if}
		</div>
		<!-- {/if} -->
	</div>
</div>

<style lang="scss">
	.user-profile {
		&__shelter {
			background: var(--container-background-color);
			padding: 2rem;
			border-radius: 2rem;
			max-width: 40rem;
			margin: 0 auto;
			margin-bottom: 2rem;
		}

		&__matched {
			background: var(--container-background-color);
			padding: 2rem;
			border-radius: 2rem;
			max-width: 40rem;
			margin-bottom: 2rem;
		}
	}
</style>
