import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import Operations from "../components/products-management/Operations";
import ProductsTable from "../components/products-management/ProductsTable";
import useCheckAdminUserOnRefresh from "../hooks/useCheckAdminUserOnRefresh";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../redux/actions/productAction";

const ProductsPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { data: products } = useFetch("/api/products");

	useEffect(() => {
		dispatch(getProducts(products));
	}, [products]);

	useCheckAdminUserOnRefresh(router, dispatch);
	return (
		<Layout>
			<div className="container">
				<h2 className="title mt--5 ml--2">Products</h2>
				<Operations />
				<ProductsTable />
			</div>
		</Layout>
	);
};

export default ProductsPage;
