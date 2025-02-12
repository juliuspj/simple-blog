import type { LayoutServerLoad } from "./$types";
export const prerender = "auto";
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session } = await safeGetSession();
	return {
		session,
		cookies: cookies.getAll()
	};
};
