<script lang="ts">
	export let header = false
	export let footer = false
</script>

<section class="container">
	{#if header}
		<header class="w-full px-4 py-2 bg-primary text-primary-content">
			<p class="text-lg font-bold"><slot name="header" /></p>
		</header>
	{/if}
	<main class="m-4"><slot name="main" /></main>
	{#if footer}
		<footer class="flex justify-end px-4 py-2 bg-secondary text-secondary-content">
			<slot name="footer" />
		</footer>
	{/if}
</section>

<style lang="postcss">
	.container {
		@apply w-full border-2 rounded-lg border-primary my-8;
	}
</style>
