<script>
	export const prerender = true;
	import { Header } from "$components";
	import "./../app.css";
	import { invalidate } from "$app/navigation";
	import { setUserState } from "$components/state/user-state.svelte";

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user }); //initiate data from first render

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			userState.updateState({ session: newSession, supabase, user: newSession?.user || null });

			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header />
{@render children()}
