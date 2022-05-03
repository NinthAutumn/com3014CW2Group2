<script>
	export let shelter = {};
</script>

<div class="shelter-info">
	<div class="shelter-info__contact">
		<h3>Contact</h3>
		<div class="shelter-info__email">
			Email: {shelter.email}
		</div>
		<div class="shelter-info__phone">
			Phone Number: {shelter.phone_number}
		</div>
		<div class="shelter-info__address">
			Address: {shelter.address}
		</div>
	</div>
</div>

<style lang="scss">
	.shelter-info {
		padding: 1rem;
		border-radius: 0.5rem;
		background: var(--light-primary);
		margin: 1rem 0;
		h3 {
			margin-bottom: 2rem;
		}
		&__email {
			font-size: 1.6rem;
			margin-bottom: 1rem;
		}
		&__phone {
			margin-bottom: 1rem;

			font-size: 1.6rem;
		}
		&__address {
			font-size: 1.6rem;
		}
	}
</style>
