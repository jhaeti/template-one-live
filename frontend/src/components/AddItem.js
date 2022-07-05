import Image from "next/image";
import { useState } from "react";
import { connect } from "react-redux";
import { useSWRConfig } from "swr";
import apiUrl from "../controllers/apiUrl";
import { addProduct } from "../redux/actions/productAction";

const AddItem = ({ isAuthenticated, addProduct, products }) => {
	const [item, setItem] = useState("");
	const { mutate } = useSWRConfig();

	const handleChange = (e) => {
		setItem(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addProduct(isAuthenticated, item);

		setItem("");
		// - This updates the new product added with id from data base since the page was updated without the id.
		// - This is done to enable delete product functionality work for the just added item else it would try to delete an item it the id whiles the id is not present
		mutate(`${apiUrl}/products`, products);
	};

	return (
		<div className="add-item">
			<div className="container">
				<form className="add-item__form" onSubmit={handleSubmit}>
					<input
						disabled={!isAuthenticated}
						className="add-item__input"
						onChange={handleChange}
						type="text"
						name="item"
						placeholder="Item name"
						value={item}
					/>
					<button className="add-item__submit-button">
						<Image
							priority="true"
							src="/icons/plus.svg"
							alt="Add item Icon"
							className="add-item__icon"
							width="100"
							height="100"
						/>
					</button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	products: state.product.products,
});
const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
