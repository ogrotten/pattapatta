<script lang="ts">
	import { goto } from '$app/navigation'
	import ThemeSelect from '$lib/components/ThemeSelect.svelte'
	import { auth } from '$lib/firebase'
	import { dbUser } from '$lib/firestore'
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
	import { onMount } from 'svelte'

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider()
		const user = await signInWithPopup(auth, provider).then((res) => {
			console.log('res', res)
			// goto('/' + res.user.id)
		})
	}

	onMount(async () => {})
	$: console.log(`LOG..+page: $dbUser?.id`, $dbUser?.id)
</script>

<div class="">
	<h1>Welcome</h1>

	{#if $dbUser}
		<p>Logged in as {$dbUser.email}</p>
		<button
			on:click={auth.signOut().then(() => {
				console.log('sign out')
			})}>signout</button
		>
	{:else}
		<button class="btn btn-primary" on:click={signInWithGoogle}>signin</button>
	{/if}
</div>

<ThemeSelect />
