import { useEffect } from "react";
import { connect } from "react-redux";

import { loadUser } from "../redux/actions/userAction";
import Layout from "../components/Layout";

import useFetch from "../hooks/useFetch";

import Items from "../components/Items";
import AddItem from "../components/AddItem";
import apiUrl from "../controllers/apiUrl";

const Index = ({ loadUser, isAuthenticated }) => {
	const url = `${apiUrl}/users/me`;

	const { data } = useFetch(url);
	useEffect(() => {
		if (data) {
			loadUser(data);
		}
	}, [data]);

	return (
		<Layout title="Boilerplate" description="Index for the Boilerplate">
			<AddItem />
			<div className="container">{isAuthenticated && <Items />}</div>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = { loadUser };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
