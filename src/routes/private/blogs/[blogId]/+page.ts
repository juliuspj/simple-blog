import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent();
	const { blogId } = params;

	const { data } = await supabase.from("blogs").select("*").eq("id", blogId).single();

	if (data) {
		return { blog: data };
	}
	error(404, "Not Found");
};
