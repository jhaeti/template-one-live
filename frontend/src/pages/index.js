import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Layout from "../components/Layout";

import { getItems } from "../redux/actions/itemAction";
import { loadUser } from "../redux/actions/userAction";

import Items from "../components/Items";
import AddItem from "../components/AddItem";

class Index extends Component {
	componentDidMount() {
		this.props.getItems();
		// Try to load the user when the component mounts
		this.props.loadUser();
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<Layout
				title="Boilerplate"
				description="Homepage for the Boilerplate"
			>
				<AddItem />
				<div className="container">
					<Items />
				</div>
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getItems: bindActionCreators(getItems, dispatch),
	loadUser: bindActionCreators(loadUser, dispatch),
});

export default connect(null, mapDispatchToProps)(Index);
