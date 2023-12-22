<script lang="ts">
	import Container from '../_components/Container.svelte'

	import { fly, fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { db } from '$lib/firebase'
	import { dbUser } from '$lib/firestore'
	import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'
	import ThemeSelect from '$lib/components/ThemeSelect.svelte'

	let setupLink = `${$page.url.origin}/session/`
	let loading = true,
		linkcopied = false,
		idcopied = false

	let session: Session,
		sessionActive: boolean = false

	onMount(async () => {
		if ($dbUser?.id !== $page.params.id) {
			console.log(`LOG..+page: NOPE`, $dbUser?.id, $page.params.id)
			goto('/')
		} else {
			loading = false
			setupLink += $dbUser?.id
		}
	})

	function setup() {}

	$: if ($dbUser?.id) setup()

	$: {
		if (linkcopied || idcopied) {
			setTimeout(() => {
				idcopied = false
				linkcopied = false
			}, 1500)
		}
	}

	const startSession = () => {
		session = {
			id: $dbUser?.id,
			status: 'active',
			created: new Date(),
			updated: new Date(),
			items: []
		}
		sessionActive = true
	}

	const endSession = () => {
		session.status = 'completed'

		sessionActive = false
	}
</script>

{#if loading}
	<div class="" />
{:else}
	<div class="flex justify-end gap-4">
		<button class="btn btn-primary btn-sm" disabled={sessionActive} on:click={startSession}> Start Session </button>
		<button class="btn btn-primary btn-sm" disabled={!sessionActive} on:click={endSession}> End Session </button>
	</div>

	{#if sessionActive}
		<Container header>
			<div class="flex flex-col gap-10" slot="header">
				<p class="flex flex-row items-center text-sm font-semibold">
					Pass out this url for the session:
					<button
						class="z-50 h-full ml-2 transition-all border w-fit border-warning btn-outline btn-warning btn-xs"
						on:click={() => {
							navigator.clipboard.writeText(setupLink).then(() => {})
							linkcopied = true
						}}
					>
						{setupLink}
					</button>
					{#if linkcopied}
						<button
							class="z-0 h-full font-bold transition duration-200 border pointer-events-none w-fit border-success btn-outline btn-success btn-xs"
							transition:fly={{ x: 20 }}
						>
							👍 Copied!
						</button>
					{/if}
				</p>
			</div>
		</Container>
	{/if}
{/if}

<style lang="postcss">
	.container {
		@apply w-full border-2 rounded-lg border-primary my-8;
	}
</style>
