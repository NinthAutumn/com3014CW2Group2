<script>
	import { http } from '$lib/http';
	import { getContext } from 'svelte';

	export let pet = {};
	export let shelter = {};

	const auth = getContext('auth')?.state;

	function errorHandler(e) {
		this.src = '/pet.png';
	}

	async function deleteHandler() {}
	async function matchHandler(pet) {
		await http(fetch)('/match/', 'POST', { petId: pet.id });
	}
</script>

<div class="pet-card">
	<div class="pet-card__container">
		<div class="pet-card__avatar">
			<img
				style="max-width:100%;width:100%;"
				on:error={errorHandler}
				src={pet.image_url || '/pet.png'}
				alt=""
			/>
		</div>

		<div class="pet-card__name">{pet.name}</div>
		<div style="margin-bottom:1rem;" class="pet-card__age">Age: {pet.age}</div>
		<p class="pet-card__address">Address: {shelter.address}</p>
		<p class="pet-card__description">{pet.description}</p>
		{#if $auth.user.shelter && $auth.user.shelter.id == shelter.id}
			<div class="pet-card__actions">
				<div class="button button--small button--error button--very-round" on:click={deleteHandler}>
					Delete
				</div>
			</div>
		{/if}

		<div class="pet-card__actions">
			<div
				class="button button--normal button--secondary button--very-round"
				on:click={() => matchHandler(pet)}
			>
				Match
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.pet-card {
		p {
			font-size: 1.6rem;
		}
		&__name {
			font-size: 2rem;
			text-align: center;
			margin: 1rem 0;
			font-weight: bold;
		}
		&__age {
			font-size: 2rem;
		}
		&__avatar {
			overflow: hidden;
			transform: scale(1);
			transition: 200ms;
			&:hover,
			&:active,
			&:focus {
				img {
					transform: scale(1.5);
					transition: 200ms;
				}
			}
		}
		&__description {
			font-size: 2rem;
			display: -webkit-box;
		}
	}
</style>
