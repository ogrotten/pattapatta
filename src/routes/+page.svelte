<script lang="ts">
	import ThemeSelect from '$lib/components/ThemeSelect.svelte';
	import { config } from '$lib/config';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

theme chooser

<!-- <select data-choose-theme>
	{#each config.daisyui.themes as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select> -->

<ThemeSelect />
