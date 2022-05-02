<script>
	import { http } from '$lib/http';
	import { createEventDispatcher } from 'svelte';

	export let form = {
		name: '',
		description: '',
		email: '',
		phone_number: '',
		address: ''
	};
	const dispatch = createEventDispatcher();

	async function submitHandler(e) {
		e.preventDefault();
		if (form.id) {
			const shelter = await http(fetch)('/shelters/shelters/' + form.id, 'PATCH', {
				...form
			});
			dispatch('updated', shelter);
		} else {
			await http(fetch)('/shelters/shelters/', 'POST', {
				...form
			});
			dispatch('created');
		}
	}
</script>

<form on:submit={submitHandler} class="pet-form">
	<label for="">Name</label>
	<input required class="input input--normal input--white" type="text" bind:value={form.name} />
	<label for="">Description</label>
	<textarea
		required
		class="input input--textarea input--white"
		type="text"
		bind:value={form.description}
	/>
	<label for="">Email</label>
	<input required type="email" class="input input--normal input--white" bind:value={form.email} />
	<label for="">Phone Number (no hyphen or space)</label>
	<input
		required
		minlength="10"
		maxlength="15"
		class="input input--normal input--white"
		type="number"
		bind:value={form.phone_number}
	/>
	<label for="">Address</label>
	<input required class="input input--normal input--white" type="text" bind:value={form.address} />
	<button style="width:100%;" class="button button--normal button--primary button--very-round"
		>{!form.id ? 'Become a Shelter' : 'Update Shelter Detail'}</button
	>
</form>
