import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import Operations from "../components/products-management/Operations";
import ProductsTable from "../components/products-management/ProductsTable";
import useCheckAdminUserOnRefresh from "../hooks/useCheckAdminUserOnRefresh";

const ProductsPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	useCheckAdminUserOnRefresh(router, dispatch);
	return (
		<Layout>
			<div className="container">
				<h2 className="heading">Products</h2>
				<Operations />
				<ProductsTable />
			</div>
		</Layout>
	);
};

export default ProductsPage;
