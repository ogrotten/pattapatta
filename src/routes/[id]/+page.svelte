<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { db } from '$lib/firebase'
	import { dbUser } from '$lib/firestore'
	import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'

	let setupLink = 'https://char.show/show/'
	let loading = true,
		linkcopied = false,
		idcopied = false

	let show = { gallery: false, now: false, carousel: false, galleryTile: false }

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
</script>

{#if loading}
	<div class="" />
{:else}
	<div class="flex flex-col gap-10">
		<span class="">
			<p class="flex flex-row items-center font-semibold">
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
		</span>
	</div>
{/if}

<style>
	button {
		@apply text-gray-800;
	}
	.unselected {
		@apply btn-neutral text-gray-200;
	}
	.active {
		@apply bg-neutral tab-active rounded-t-lg;
	}
</style>
