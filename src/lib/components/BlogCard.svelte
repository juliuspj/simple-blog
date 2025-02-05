<script lang="ts">
	import type { Blogs } from "$components/state/user-state.svelte";

	interface BlogCardProps {
		blog: Blogs;
	}

	let { blog }: BlogCardProps = $props();
</script>

<a class="blog-card" href={`/private/blogs/${blog.id}`}>
	<div class="blog-info">
		<h4>{blog.title}</h4>
		<p>{blog.created_at}</p>
		<p class="mb-s">{blog.blog}</p>
	</div>
</a>

<style>
	.blog-card {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 360px;
		height: 250px;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		color: white;
		text-decoration: none;
		text-align: left;
	}
	.blog-info {
		background-color: rgba(0, 0, 0, 0.4);
		height: 100%;
		width: 100%;
		padding: 60px 16px 0 16px;
		border-radius: 12px;
	}
	.blog-info h4 {
		font-family: "EB Garamond", serif;
	}
	.blog-info p {
		font-size: 14px;
		font-weight: 400;
		font-style: italic;
	}
</style>
