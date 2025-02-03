<script lang="ts">
	import Button from "$components/Button.svelte";
	import type { ActionData } from "../../routes/private/add/$types";
	interface ComponentProps {
		formBlog: ActionData;
	}
	let { formBlog }: ComponentProps = $props();
</script>

<form method="POST">
	{#if formBlog && formBlog.errors?.length}
		{#each formBlog.errors as error}
			<div class="auth-error">
				<p>{error}</p>
			</div>
		{/each}
	{/if}

	<input
		class="input input-title mt-m mb-xs"
		name="title"
		type="text"
		placeholder="Title..."
		value={formBlog?.title || ""}
	/>
	<div class="input-blog">
		<textarea
			class="textarea"
			placeholder="Input your blog here..."
			name="blogs"
			value={formBlog?.blogs || ""}
		></textarea>
	</div>
	<Button type="submit">Post a Blog</Button>
</form>

<style>
	.input {
		padding: 20px 40px;
		max-width: 100%;
	}
	.textarea {
		width: 100%;
	}
	.auth-error {
		background-color: rgb(122, 35, 35);
		color: white;
		font-size: 18px;
		border-radius: 12px;
		padding: 12px;
		width: 100%;
		margin-bottom: 8px;
	}
	.auth-error:last-of-type {
		margin-bottom: 16px;
	}
</style>
