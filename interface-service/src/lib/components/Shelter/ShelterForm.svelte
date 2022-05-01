<script>
	import { http } from '$lib/http';
	import { createEventDispatcher } from 'svelte';

	let form = {
		name: '',
		description: '',
		email: '',
		phone_number: '',
		address: ''
	};

	async function submitHandler(e) {
		e.preventDefault();
		await http(fetch)('/shelters/shelters/', 'POST', {
			...form
		});
		createEventDispatcher()('created');
	}
</script>

<form on:submit={submitHandler} class="pet-form">
	<label for="">Name</label>
	<input class="input input--normal input--white" type="text" bind:value={form.name} />
	<label for="">Description</label>
	<textarea class="input input--textarea input--white" type="text" bind:value={form.description} />
	<label for="">Email</label>
	<input type="text" class="input input--normal input--white" bind:value={form.email} />
	<label for="">Phone Number</label>
	<input class="input input--normal input--white" type="text" bind:value={form.phone_number} />
	<label for="">Address</label>
	<input class="input input--normal input--white" type="text" bind:value={form.address} />
	<button style="width:100%;" class="button button--normal button--primary button--very-round"
		>Create Shelter</button
	>
</form>
