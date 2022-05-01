<script>
	import { http } from '$lib/http';

	export let pets = [],
		shelter = false,
		match = false;
	async function deleteHandler() {}
	async function matchHandler(pet) {
		await http(fetch)('/match/', 'POST', { petId: pet.id });
		pets = pets.filter((item) => item.id != pet.id);
	}
</script>

<ul class="pet-list">
	{#each pets as pet (pet.id)}
		<li class="pet-list__item">
			<div class="pet-list__avatar">
				<img style="max-width: 100%;width:100%;" src={pet.image_url || '/pet.png'} alt="" />
			</div>
			<div class="pet-list__name">{pet.name}</div>
			<p class="pet-list__description">{pet.description}</p>
			{#if shelter}
				<div class="pet-list__actions">
					<div class="button button--normal button--error" on:click={deleteHandler}>Delete</div>
				</div>
			{/if}

			{#if match}
				<div class="pet-list__actions">
					<div
						class="button button--normal button--secondary button--very-round"
						on:click={() => matchHandler(pet)}
					>
						Match
					</div>
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	.pet-list {
		&__item {
			max-width: 30rem;
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
