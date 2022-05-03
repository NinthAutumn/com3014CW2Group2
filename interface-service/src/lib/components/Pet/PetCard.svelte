<script>
	import { http } from '$lib/http';
	import { createEventDispatcher, getContext } from 'svelte';
	import ShelterInfo from '$lib/components/Shelter/ShelterInfo.svelte';
	import { goto } from '$app/navigation';

	export let pet = {};
	export let shelter = {};
	export let match,
		matched_users = [];

	const auth = getContext('auth')?.state;

	function errorHandler(e) {
		this.src = '/pet.png';
	}
	const dispatch = createEventDispatcher();
	async function deleteHandler() {
		const { message } = await http(fetch)(`/pets/pets/${pet.id}`, 'DELETE');
		if (message) {
			goto('/user');
		}
	}
	async function acceptHandler(user_id) {
		await http(fetch)(`/match/accept`, 'PATCH', {
			user_id,
			pet_id: pet.id,
			status: 'adopted'
		});
		dispatch('adopted');
	}
	async function matchHandler(pet) {
		await http(fetch)('/match/', 'POST', { petId: pet.id });
		dispatch('matched');
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
			<div class="pet-card__actions" style="margin-bottom:2rem;">
				<div class="button button--small button--error button--very-round" on:click={deleteHandler}>
					Delete
				</div>
			</div>

			<div class="pet-card__matches">
				<h3>User Matches</h3>
				{#each matched_users as user (user.id)}
					<div class="pet-card__match pet-card__match--{user.match.status}">
						<div class="pet-card__info">
							<div class="pet-card__avatar">
								<img src="/avatar.svg" height="30" width="30" />
							</div>
							<div class="pet-card__username">{user.username}</div>
						</div>
						{#if user.match.status == 'pending'}
							<div
								class="button button--success button--small button--very-round"
								on:click={() => acceptHandler(user.id)}
							>
								Accept
							</div>
						{:else if user.match.status == 'adopted'}
							<div disabled class="button button--primary button--small button--very-round">
								Adopted
							</div>
						{:else if user.match.status == 'not_approved'}
							<div disabled class="button button--secondary button--small button--very-round">
								Denied
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<div class="pet-card__actions">
			{#if match?.id}
				<div class="button button--normal button--primary button--very-round">
					Match Status: {match?.status?.toUpperCase()}
				</div>

				<ShelterInfo {shelter} />
			{:else}
				<div
					class="button button--normal button--secondary button--very-round"
					on:click={() => matchHandler(pet)}
				>
					Match
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.pet-card {
		p {
			font-size: 1.6rem;
		}
		&__match {
			display: flex;
			justify-content: space-between;
			padding: 1rem;
			background: var(--light-primary);
			margin: 1rem 0;
			border-radius: 0.5rem;
			align-items: center;
		}
		&__info {
			width: 5rem;
			text-align: center;
		}
		&__username {
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
