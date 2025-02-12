import { redirect } from "@sveltejs/kit";
export const prerender = "auto";
interface ReturnObject {
	success: boolean;
	errors: string[];
	title: string;
	blogs: string;
}
export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		// default: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get("title") as string;
		const blogs = formData.get("blogs") as string;

		const returnObject: ReturnObject = {
			success: true,
			title,
			blogs,
			errors: []
		};
		if (title.length < 3) {
			returnObject.errors.push("The title is too short. Must be at least 3 characters.");
			console.log("here", returnObject);
			return returnObject;
		}
		if (!blogs.length) {
			returnObject.errors.push("Blog is required.");
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}
		//insert flow.
		try {
			await supabase.from("blogs").insert({
				title: title,
				blog: blogs
			});
		} catch (error) {
			console.log(error);
		}

		redirect(303, "/main/dashboard");
	}
};
