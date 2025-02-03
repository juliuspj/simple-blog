<script lang="ts">
	import type { Blogs } from "$components/state/user-state.svelte";
	import Icon from "@iconify/svelte";

	interface BlogPageProps {
		data: {
			blog: Blog;
		};
	}
	let { data }: BlogPageProps = $props();
	let blog = $derived(data.blog);
	function goBack() {
		history.back();
	}
</script>

<div class="blog-page">
	<button onclick={goBack} aria-label="Go Back"><Icon icon="ep:back" width={"40"} /> </button>
</div>
<h2 class="blog-title mt-m">{blog.title}</h2>
<p class="blog-published">Date published: {blog.created_at}</p>
<p class="blog-content">{blog.blog}</p>
