import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import useFetch from "../hooks/useFetch";

import Admin from "../components/Admin";
import Layout from "../components/Layout";

import { loadUser } from "../redux/actions/userAction";
import apiUrl from "../controllers/apiUrl";

const AdminPanel = ({ role, loadUser }) => {
	const { data: userData, error } = useFetch(`${apiUrl}/users/me`);

	// This is used to redirect non-admin access to admin-panel back to the index if they try accessing the admin-page by typing it in the address
	const router = useRouter();
	useEffect(() => {
		if (Object.keys(router.components).length === 2) {
			if (error || (userData && userData.user.role !== "ADMIN")) {
				router.push("/");
			} else if (userData) {
				loadUser(userData);
			}
		}
	}, [userData]);

	return (
		<Layout title="admin-panel" description="Index for the Boilerplate">
			<Admin role={role} />
		</Layout>
	);
};

const mapStateToProps = (state) => {
	if (!state.auth.user) {
		return { role: "SCAM" };
	}
	return { role: state.auth.user.role };
};

const mapDispatchToProps = { loadUser };

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
