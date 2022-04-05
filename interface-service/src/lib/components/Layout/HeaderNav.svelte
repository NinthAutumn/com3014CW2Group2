<script>
	import { goto } from '$app/navigation';

	import { getContext } from 'svelte';

	const auth = getContext('auth')?.state;
</script>

<nav class="header-nav page">
	<div class="container">
		<div class="header-nav__container">
			<div class="header-nav__actions">
				<div class="header-nav__action">
					<div class="header-nav__avatar">
						{#if auth.authenticated}
							<img src="/avatar.svg" height="20" width="20" alt="" />
						{:else}
							<img
								on:click={() => {
									goto('/auth/login');
								}}
								src="/icon-user.svg"
								height="20"
								width="20"
								alt=""
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.header-nav {
		height: 5rem;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		&__container {
			background: var(--container-background-color);
			// box-shadow: var(--box-shadow);
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
			height: 5rem;
			box-sizing: border-box;
			padding: 0.5rem;
			margin-top: -1rem;
		}
		&__actions {
			display: flex;
			justify-content: flex-end;
		}
		&__avatar {
			border-radius: 10rem;
			overflow: hidden;
			// box-shadow: var(--box-shadow);
			padding: 1rem;
			height: 4rem;
			box-sizing: border-box;
		}
	}
</style>
