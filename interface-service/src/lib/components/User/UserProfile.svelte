<script>
	import { http } from '$lib/http';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		if (user.shelter) {
			shelter_pets = await http(fetch)(`/pets/pets/${user.shelter.id}/list`);
		}
	});
</script>

<div class="user-profile">
	{#if shelter_form}
		<div class="dialog dialog__container">
			<div class="dialog__close" on:click={() => (shelter_form = false)} />
			<div class="dialog__content">
				<div class="dialog__header flex flex--align flex--between">
					<h3>Become Shelter</h3>
					<div class="button button--close">
						<Fa icon={faTimes} />
					</div>
				</div>
				<ShelterForm />
			</div>
		</div>
	{/if}
	{#if pet_form}
		<div class="dialog dialog__container">
			<div class="dialog__close" on:click={() => (pet_form = false)} />
			<div class="dialog__content">
				<div class="dialog__header flex flex--align flex--between">
					<h3>Add Pets</h3>
					<div class="button button--close">
						<Fa icon={faTimes} />
					</div>
				</div>
				<PetForm />
			</div>
		</div>
	{/if}
	<div class="user-profile__container">
		<div class="user-profile__shelter">
			{#if user.shelter}
				<h3>Shelter Pets</h3>

				<PetList pets={shelter_pets} shelter={true} />
				<button
					on:click={() => (pet_form = true)}
					style="width:100%;margin-top:1rem;"
					class="button button--normal button--secondary button--very-round"
				>
					Put Pet For Adoption
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
		{#if !user.shelter}
			<div class="user-profile__matched">
				<h3>Matched Pets</h3>
				<PetList pets={user_pets} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.user-profile {
	}
</style>
