<script lang="ts">
	import BlogLogo from "$assets/blogging.png";
	import { Button } from "$components";
	import { getUserState } from "$components/state/user-state.svelte";
	import { backIn } from "svelte/easing";
	let userContext = getUserState();
	let { user, userName } = $derived(userContext); //change user based on userContext
</script>

<header>
	<a href={user ? "/main/dashboard" : "/"}>
		<img class="logo" src={BlogLogo} alt="Go to home" />
		<!-- flaticon.com -->
	</a>
	<nav>
		{#if !user}
			<ul>
				<li>
					<Button isMenu={true} href="/register">Create account</Button>
				</li>
				<li>
					<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
				</li>
			</ul>
		{:else}
			<ul>
				<li>Welcome back, {userName}</li>
				<li>
					<Button isMenu={true} onclick={() => userContext.logout()}>Logout</Button>
				</li>
			</ul>
		{/if}
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
	}
	ul {
		display: flex;
		align-items: center;
		column-gap: 24px;
	}
	.logo {
		height: 72px;
	}
</style>
