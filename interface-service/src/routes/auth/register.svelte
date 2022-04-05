<script context="module">
	export const load = async ({ session, url, fetch }) => {
		return {};
	};
</script>

<script>
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let form = {
		email: '',
		password: '',
		confirm_password: '',
		username: ''
	};
	let error = '',
		username_taken = false,
		email_taken = false;
	export let verified = '';
	const auth = getContext('auth');
	$: checkEmailTaken(form.email);
	$: checkUsernameTaken(form.username);

	async function checkEmailTaken(email) {
		if (!email) return;
		const { taken } = await http(fetch)(`/users/user/email/${email}/taken`);
		email_taken = taken;
	}
	async function checkUsernameTaken(username) {
		if (!username) return;

		const { taken } = await http(fetch)(`/users/user/username/${username}/taken`);
		username_taken = taken;
	}
	async function submitHandler(e) {
		e.preventDefault();
		if (form.confirm_password != form.password) {
			return (error = 'Confirm Password is different from your password.');
		}
		let res = await auth.registerUser(form);
		if (res?.error) {
			error = res.error;
			return;
		}
		goto('/');
	}
</script>

<div class="register-page page">
	<div class="register-page__container container">
		<div
			class="button button--close"
			style="margin-bottom:1rem;"
			on:click={() => goto('/auth/login')}
		>
			<Fa icon={faArrowLeft} />
		</div>
		<form on:submit={submitHandler} class="register-page__card">
			<h1>Register</h1>

			<label for="username">Username</label>
			<input
				placeholder="Username"
				type="text"
				class="input input--normal input--white"
				bind:value={form.username}
				style="margin-bottom:2rem;"
				required
			/>

			{#if username_taken}
				<div class="error">This Username is Already Taken!</div>
			{/if}

			<label for="username">Email</label>
			<input
				placeholder="Email"
				type="text"
				class="input input--normal input--white"
				bind:value={form.email}
				required
				style="margin-bottom:2rem;"
			/>
			{#if email_taken}
				<div class="error">This Email is Already Taken!</div>
			{/if}

			<label for="username">Password</label>
			<input
				type="password"
				placeholder="*********"
				class="input input--normal input--white"
				bind:value={form.password}
				required
				style="margin-bottom:2rem;"
				minlength="6"
			/>
			<label for="username">Confirm Password</label>
			<input
				type="password"
				placeholder="*********"
				class="input input--normal input--white"
				bind:value={form.confirm_password}
				style="margin-bottom:2rem;"
				required
				minlength="6"
			/>

			<div class="error error--center">
				{error}
			</div>

			<button
				type="submit"
				style="width:100%;"
				class="button button--normal button--secondary button--very-round">Register</button
			>
		</form>
	</div>
</div>

<style lang="scss">
	.register-page {
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
