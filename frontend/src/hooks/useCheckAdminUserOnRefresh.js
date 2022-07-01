import useFetch from "./useFetch";
import { loadUser } from "../redux/actions/userAction";

// Redirect non admin users trying to access the admin only pages to the home page
const useCheckAdminUserOnRefresh = async (router, dispatch) => {
	const { data, error } = await useFetch("/api/users/me");

	// Object.Keys(router.components) === 2 returns true if the page was reload or access directly from the address
	if (router.components && Object.keys(router.components).length === 2) {
		if (error || (data && data.user.role !== "ADMIN")) {
			router.push("/");
		} else if (data) {
			// Data is loaded into redux from cache if user actually is an admin but simply doing a refresh
			dispatch(loadUser(data));
		}
	}
};

export default useCheckAdminUserOnRefresh;
