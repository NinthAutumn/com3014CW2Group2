<script context="module">
	export const load = async ({ session, url, fetch }) => {
		if (session.authenticated) {
			return {
				redirect: '/',
				status: 302
			};
		} else {
			if (!!url.searchParams.get('verify')) {
				let verified;
				try {
					const data = await http(fetch)('/user/verifyEmail', 'POST', {
						token: url.searchParams.get('verify')
					});

					if (data) {
						verified = 'Account has been verified, please log in';
					} else {
						verified = 'Cannot verify account';
					}
				} catch (_) {
					verified = 'Something went wrong';
				}
				return {
					props: {
						verified
					}
				};
			}
		}
		return {};
	};
</script>

<script>
	import { http } from '$lib/http';
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let form = {
		credential: '',
		password: ''
	};
	let error = '';
	export let verified = '';
	const auth = getContext('auth');
	async function submitHandler(e) {
		e.preventDefault();

		let res = await auth.loginUser(form);
		if (res?.error) {
			error = res.error;
			return;
		}
		goto('/');
	}
</script>

<div class="login-page page">
	<div class="login-page__container container">
		<form on:submit={submitHandler} class="login-page__card">
			<h1>Login</h1>
			<label for="username">Username・Email</label>
			<input
				placeholder="Username・Email"
				type="text"
				required
				class="input input--normal input--white"
				bind:value={form.credential}
			/>

			<label for="username">Password</label>
			<input
				type="password"
				required
				placeholder="*********"
				class="input input--normal input--white"
				bind:value={form.password}
			/>
			<div class="error error--center">
				{error}
			</div>
			<a style="margin:2rem 0;" href="/auth/forgotten">Forgotten Your Password</a>
			<button
				type="submit"
				style="width:100%;"
				class="button button--normal button--primary button--very-round">Login</button
			>
			<a style="margin:2rem 0;" href="/auth/register">Create a New Account</a>
		</form>
	</div>
</div>

<style lang="scss">
	.login-page {
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
