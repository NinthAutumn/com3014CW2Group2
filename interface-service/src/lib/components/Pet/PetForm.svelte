<script>
	import { http } from '$lib/http';
	import { createEventDispatcher } from 'svelte';

	let form = {
		name: '',
		description: '',
		age: 0,
		image_url: ''
	};
	const dispatch = createEventDispatcher();

	async function submitHandler(e) {
		e.preventDefault();
		await http(fetch)('/pets/pets/', 'POST', {
			...form
		});

		form = {
			name: '',
			description: '',
			age: 0,
			image_url: ''
		};
		dispatch('created');
	}
</script>

<form on:submit={submitHandler} class="pet-form">
	<label for="">Name</label>
	<input required class="input input--normal input--white" type="text" bind:value={form.name} />
	<label for="">Description</label>
	<textarea
		required
		maxlength="500"
		class="input input--textarea input--white"
		type="text"
		bind:value={form.description}
	/>
	<label for="">Image URL</label>
	<input
		required
		class="input input--normal input--white"
		type="text"
		bind:value={form.image_url}
	/>
	<label for="">Age</label>
	<input required type="number" class="input input--normal input--white" bind:value={form.age} />
	<button style="width:100%;" class="button button--normal button--primary button--very-round"
		>Create Pet</button
	>
</form>
