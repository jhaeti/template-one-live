import { connect } from "react-redux";
import Layout from "../components/Layout";

const about = ({ products }) => (
	<Layout title="About the Boilerplate" description="About the boilerplate">
		<div>About Page</div>
		{products &&
			products.map((product) => <h3 key={product.id}>{product.name}</h3>)}
	</Layout>
);

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	products: state.product.products,
});
export default connect(mapStateToProps, null)(about);
