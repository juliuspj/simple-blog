<script>
	import BlogCard from "$components/BlogCard.svelte";
	import { getUserState } from "$components/state/user-state.svelte";
	import Icon from "@iconify/svelte";

	let userContext = getUserState();
	let { userName, allBlogs } = $derived(userContext);
</script>

<div class="dashboard">
	<div class="dashboard-header mb-m">
		<a href="../main/add/" class="add-blog">
			<Icon icon="icons8:plus" width={"72"} height={"72"} />
			<p>Add a blog</p>
		</a>
	</div>
	{#each allBlogs as blog}
		<BlogCard {blog} />
	{/each}
</div>

<style>
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		height: 10%;
	}
	.add-blog {
		display: flex;
		align-items: center;
		text-decoration: none;
	}
	.add-blog p {
		text-align: right;
	}
</style>
