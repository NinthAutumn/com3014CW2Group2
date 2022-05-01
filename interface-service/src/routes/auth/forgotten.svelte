<script context="module">
	export const load = async ({ session, url, fetch }) => {
		if (session.authenticated) {
			return {
				redirect: '/',
				status: 302
			};
		} else {
			let token = '';
			if (url.searchParams.get('token')) {
				token = url.searchParams.get('token');
			}
			return {
				props: {
					token
				}
			};
		}
	};
</script>

<script>
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let form = {
		credential: ''
	};
	export let token = '';
	let reset_form = {
		password: '',
		confirm_password: ''
	};
	let error = '',
		success = '';
	export let verified = '';

	const auth = getContext('auth');
	async function resetHandler(e) {
		e.preventDefault();
		if (reset_form.password != reset_form.confirm_password) {
			return (error = 'Confirm Password is different from Password');
		}
	}
	async function submitHandler(e) {
		e.preventDefault();
		success = '';
		const res = await http(fetch)('/auth/reset/request', 'POST', {
			...form
		});
		if (res?.error) {
			error = res.error;
			return;
		}
		success = `Sent Confirmation Email to Associated User's email`;
	}
</script>

<div class="forgotten-page page">
	<div class="forgotten-page__container container">
		{#if !token}
			<form on:submit={submitHandler} class="forgotten-page__card">
				<h1>Forgotten Password</h1>
				<label for="username">Your Username・Email</label>
				<input
					placeholder="Username・Email"
					type="text"
					required
					class="input input--normal input--white"
					bind:value={form.credential}
				/>

				<div class="error error--center">
					{error}
				</div>
				<div class="forgotten-page__success">{success}</div>
				<button
					type="submit"
					style="width:100%;"
					class="button button--normal button--primary button--very-round">Send Reset Email</button
				>
			</form>
		{:else}
			<form on:submit={resetHandler} class="forgotten-page__card">
				<h1>Change Password</h1>
				<label for="username">New Password</label>
				<input
					placeholder="Username・Email"
					type="text"
					required
					class="input input--normal input--white"
					bind:value={reset_form.password}
				/>
				<label for="username">Confirm Password</label>
				<input
					placeholder="Username・Email"
					type="text"
					required
					class="input input--normal input--white"
					bind:value={reset_form.confirm_password}
				/>
				<div class="error error--center">
					{error}
				</div>

				<button
					type="submit"
					style="width:100%;"
					class="button button--normal button--primary button--very-round">Update Password</button
				>
			</form>
		{/if}
	</div>
</div>

<style lang="scss">
	.forgotten-page {
		h1 {
			text-align: center;
		}
		a {
			text-decoration: none;
			color: var(--text-color);
			font-size: 1.6rem;
			margin: 1rem 0;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			// margin: 0 auto;
		}
		&__card {
			background: var(--container-background-color);
			padding: 2rem;
			border-radius: 2rem;
			max-width: 40rem;
			margin: 0 auto;
		}
		label {
			font-size: 2rem;
		}
	}
</style>
