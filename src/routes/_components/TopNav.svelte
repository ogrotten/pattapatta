<script lang="ts">
	import { Badge } from '$lib/components/ui/badge'
	import Button from '$lib/components/ui/button/button.svelte'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import { dbUser } from '$lib/firestore'
</script>

<div class="flex justify-between">
	<div class="flex-1">
		<ul class="flex justify-start space-x-4">
			{#if $dbUser}
				<li><a href={$dbUser.id}>Manage</a></li>
				<li><a href={`/show/${$dbUser.id}`}>Show</a></li>
			{:else}
				<li><a href="/">Home</a></li>
			{/if}
		</ul>
	</div>
	<div class="flex-1">
		<ul class="flex justify-end space-x-4">
			{#if $dbUser}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="outline" size="sm">{$dbUser.email}</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item><a href="/logout">Logout</a></DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<li><a href="/login">Login</a></li>
			{/if}
		</ul>
	</div>
</div>

<style>
	li {
		@apply font-semibold hover:text-blue-500 hover:underline;
	}
	ul {
		list-style: none;
	}
</style>
