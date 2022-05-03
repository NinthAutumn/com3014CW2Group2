<script>
	import { goto } from '$app/navigation';

	import { http } from '$lib/http';

	export let pets = [],
		shelter = false,
		match = false;
	async function deleteHandler() {}

	function errorHandler(e) {
		this.src = '/pet.png';
	}
</script>

<div class="pet-list">
	{#each pets as pet (pet.id)}
		<div class="pet-list__item" on:click={() => goto(`/pet/${pet.id}`)}>
			<div class="pet-list__avatar">
				<img
					style="max-width:100%;width:100%;"
					on:error={errorHandler}
					src={pet.image_url || '/pet.png'}
					alt=""
				/>
			</div>
			<div class="pet-list__name">{pet.name} (Age: {pet.age})</div>
			<p class="pet-list__description">{pet.description}</p>
			{#if shelter}
				<div class="pet-list__actions">
					<div
						class="button button--small button--error button--very-round"
						on:click={deleteHandler}
					>
						Delete
					</div>
				</div>
			{/if}

			{#if pet.match}
				<div class="pet-list__actions">
					<div class="button button--normal button--primary button--very-round">
						Match Status: {pet.match.status.toUpperCase()}
					</div>
				</div>
			{/if}

			{#if match}
				<div class="pet-list__actions">
					<div
						class="button button--normal button--secondary button--very-round"
						on:click={() => goto(`/pet/${pet.id}`)}
					>
						Check Out Pet
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.pet-list {
		&__item {
			// max-width: 30rem;
			width: 100%;
			// height: 100vh;
			margin-bottom: 2rem;
		}
		&__name {
			font-size: 2rem;
			text-align: center;
			margin: 1rem 0;
			font-weight: bold;
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
			font-size: 1.6rem;
			display: -webkit-box;
		}
	}
</style>
