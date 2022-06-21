import Link from "next/link";
import useFetch from "../hooks/useFetch";
import apiUrl from "../controllers/apiUrl";

const Admin = ({ role }) => {
	const { data: itemsCount, error: itemsError } = useFetch(
		`${apiUrl}/admin/items-count`
	);
	const { data: usersCount, error: usersError } = useFetch(
		`${apiUrl}/admin/users-count`
	);
	if (role === "ADMIN") {
		return (
			<div className="container admin-panel">
				<div className="row row--center row--v-center col-fill-between">
					<Link href="/products-page">
						<a className="product-box">
							<div className="row row--center row--v-center">
								<div>
									{(!itemsCount &&
										!itemsError &&
										"Loading") ||
										itemsCount}{" "}
									Products
								</div>
							</div>
						</a>
					</Link>
					<Link href="/users-page">
						<a className="user-box">
							<div className="row row--center row--v-center">
								<div>
									{(!usersCount &&
										!usersError &&
										"Loading") ||
										usersCount}{" "}
									Users
								</div>
							</div>
						</a>
					</Link>
				</div>
			</div>
		);
	}
	return "";
};

export default Admin;
