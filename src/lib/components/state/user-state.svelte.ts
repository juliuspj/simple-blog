import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";
interface UserStateProps {
	session: Session | null;
	supabase: SupabaseClient | null;
	user: User | null;
}
export interface Blogs {
	blog: string | null;
	created_at: string;
	id: number;
	user_id: string | null;
	title: string | null;
}
export class UserState {
	session = $state<Session | null>(null);
	supabase = $state<SupabaseClient<Database> | null>(null);
	user = $state<User | null>(null);
	allBlogs = $state<Blogs[]>([]);
	userName = $state<string | null>(null);

	constructor(data: UserStateProps) {
		//set session,supabase,user
		this.updateState(data);
	}

	updateState(data: UserStateProps) {
		this.session = data.session;
		this.supabase = data.supabase;
		this.user = data.user;
		this.fetchUserData();
	}
	async fetchUserData() {
		if (!this.user || !this.supabase) {
			return;
		}
		const userId = this.user.id;

		const [blogsResponse, userNamesResponse] = await Promise.all([
			this.supabase
				.from("blogs")
				.select("*")
				.eq("user_id", userId)
				.range(0, 9)
				.order("id", { ascending: false }),
			this.supabase.from("user_names").select("name").eq("user_id", userId).single()
		]);

		if (
			blogsResponse.error ||
			!blogsResponse.data ||
			userNamesResponse.error ||
			!userNamesResponse.data
		) {
			console.log("Error fetching all books for user");
			console.log({ blogsError: blogsResponse.error, userNamesError: userNamesResponse.error });
			return;
		}

		this.allBlogs = blogsResponse.data;
		this.userName = userNamesResponse.data.name;
	}
	getBlogById(blogId: number) {
		return this.allBlogs.find((blog) => blog.id === blogId);
	}

	async logout() {
		await this.supabase?.auth.signOut();
		goto("/login");
	}
}
const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
	return setContext(USER_STATE_KEY, new UserState(data));
}
//return value setUserState
export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
