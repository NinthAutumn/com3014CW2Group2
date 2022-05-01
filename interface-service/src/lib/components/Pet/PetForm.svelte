<script>
	import { http } from '$lib/http';

	let form = {
		name: '',
		description: '',
		age: 0
	};

	async function submitHandler(e) {
		e.preventDefault();
		await http(fetch)('/pets/pets/', 'POST', {
			...form
		});
		createEventDispatcher()('created');
	}
</script>

<form on:submit={submitHandler} class="pet-form">
	<label for="">Name</label>
	<input class="input input--normal input--white" type="text" bind:value={form.name} />
	<label for="">Description</label>
	<input class="input input--normal input--white" type="text" bind:value={form.description} />
	<label for="">Age</label>
	<input type="number" class="input input--normal input--white" bind:value={form.age} />
	<button style="width:100%;" class="button button--normal button--primary button--very-round"
		>Create Pet</button
	>
</form>
