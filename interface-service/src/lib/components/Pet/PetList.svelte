<script>
	export let pets = [],
		shelter = false,
		match = false;
	async function deleteHandler() {}
	async function matchHandler() {}
</script>

<ul class="pet-list">
	{#each pets as pet (pet.id)}
		<li class="pet-list__item">
			<div class="pet-list__avatar">
				<img src={pet.avatar || '/pet.png'} alt="" />
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
					<div class="button button--normal button--primary" on:click={matchHandler}>Match</div>
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
		}
		&__name {
			font-size: 1.6rem;
		}
		&__description {
			font-size: 1.4rem;
			display: -webkit-box;
		}
	}
</style>
