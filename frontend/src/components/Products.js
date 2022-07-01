import { connect } from "react-redux";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Product from "./Product";
import { getProducts } from "../redux/actions/productAction";

const Products = ({ products, getProducts }) => {
	const url = `/api/products`;
	const { data } = useFetch(url);

	useEffect(() => {
		if (data) {
			getProducts(data);
		}
	}, [data]);

	if (!data) return <div>Loading...</div>;
	return products.map((product) => (
		<Product key={product._id} product={product} />
	));
};

const mapStateToProps = (state) => ({
	products: state.product.products,
});

const mapDispatchToProps = { getProducts };
export default connect(mapStateToProps, mapDispatchToProps)(Products);
