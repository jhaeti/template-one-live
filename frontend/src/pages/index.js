import { useEffect } from "react";
import { connect } from "react-redux";

import { loadUser } from "../redux/actions/userAction";
import Layout from "../components/Layout";

import useFetch from "../hooks/useFetch";

import Products from "../components/Products";
import AddItem from "../components/AddItem";
import apiUrl from "../controllers/apiUrl";

const Index = ({ loadUser }) => {
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
			<div className="container">
				<Products />
			</div>
		</Layout>
	);
};

const mapDispatchToProps = { loadUser };

export default connect(null, mapDispatchToProps)(Index);
