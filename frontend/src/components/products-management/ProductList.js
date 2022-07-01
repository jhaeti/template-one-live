import { connect } from "react-redux";
import ProductListItem from "./ProductListItem";

const ProductList = ({ products }) => {
	if (!products) return <div>Loading</div>;

	return products.map((product, index) => (
		<ProductListItem
			key={product._id}
			index={1 + index}
			product={product}
		/>
	));
};

const mapStateToProps = (state) => ({ products: state.product.products });

export default connect(mapStateToProps, null)(ProductList);
