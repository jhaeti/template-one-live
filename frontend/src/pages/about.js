import { connect } from "react-redux";
import Layout from "../components/Layout";

const about = ({ items }) => (
	<Layout title="About the Boilerplate" description="About the boilerplate">
		<div>About Page</div>
		{items && items.map((item) => <h3 key={item.id}>{item.name}</h3>)}
	</Layout>
);

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	items: state.item.items,
});
export default connect(mapStateToProps, null)(about);
