import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Admin from "../components/Admin";
import Layout from "../components/Layout";

import useCheckAdminUserOnRefresh from "../hooks/useCheckAdminUserOnRefresh";

const AdminPanel = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	useCheckAdminUserOnRefresh(router, dispatch);

	return (
		<Layout title="admin-panel" description="Index for the Boilerplate">
			<Admin />
		</Layout>
	);
};

export default AdminPanel;
