import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";

import useCheckAdminUserOnRefresh from "../../hooks/useCheckAdminUserOnRefresh";
import Layout from "../../components/Layout";
import {
	selectProductById,
	selectProducts,
} from "../../selectors/productSelector";

const ProductEditPage = ({ products }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	useCheckAdminUserOnRefresh(router, dispatch);
	const { id } = router.query;

	// Get products from store
	// FIXME Should get from database
	const { name, price, quantity, ns: sold } = selectProductById(products, id);

	return (
		<Layout>
			<h2>This is the page for {name}</h2>
			<h4>The price is {price}</h4>
			<h4>There are {quantity} remaining</h4>
			<h4>{sold} is sold</h4>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	products: selectProducts(state),
});

export default connect(mapStateToProps, null)(ProductEditPage);
