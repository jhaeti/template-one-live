import { connect } from "react-redux";
import { useEffect } from "react";
import Layout from "../components/Layout";

import useFetch from "../contex/useFetch";
import { loadUser } from "../redux/actions/userAction";

import Items from "../components/Items";
import AddItem from "../components/AddItem";

const Index = ({ loadUser, isAuthenticated }) => {
	const { data } = useFetch("/users/me");

	useEffect(() => {
		if (data) {
			loadUser(data);
		}
	}, [data, loadUser]);

	return (
		<Layout title="Boilerplate" description="Homepage for the Boilerplate">
			<AddItem />
			<div className="container">{isAuthenticated && <Items />}</div>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(Index);
