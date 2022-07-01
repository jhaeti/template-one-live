import Link from "next/link";
import useFetch from "../hooks/useFetch";

const Admin = () => {
	const { data: productsCount, error: productsError } = useFetch(
		"/api/products-count"
	);
	const { data: usersCount, error: usersError } =
		useFetch("/api/users-count");

	return (
		<div className="container admin-panel">
			<div className="row row--center row--v-center col-fill-between">
				<Link href="/admin-products-management">
					<a className="product-box">
						<div className="row row--center row--v-center">
							<div>
								{(!productsCount &&
									!productsError &&
									"Loading") ||
									productsCount}{" "}
								Products
							</div>
						</div>
					</a>
				</Link>
				<Link href="/users-page">
					<a className="user-box">
						<div className="row row--center row--v-center">
							<div>
								{(!usersCount && !usersError && "Loading") ||
									usersCount}{" "}
								Users
							</div>
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Admin;
