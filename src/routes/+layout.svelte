<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte'
	import '../app.css'
	import TopNav from './_components/TopNav.svelte'
	import { dbUser } from '$lib/firestore'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	const { pathname } = $page.url
	const show = pathname.includes('show') || pathname.includes('/clock')

	if (!dbUser) {
		console.log(`LOG..+layout: no user`)
		goto('/')
	}

	const debug = false
</script>

{#if !show}
	<div class="w-full px-10 py-4 border-b">
		<TopNav />
	</div>
{/if}

<div class="w-full h-full min-h-screen" class:bg-red-800={debug} class:p-10={!show}>
	<slot />
</div>
