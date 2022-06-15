import Image from "next/image";
import { useState } from "react";
import { connect } from "react-redux";
import { useSWRConfig } from "swr";
import apiUrl from "../controllers/apiUrl";
import { addItem } from "../redux/actions/itemAction";

const AddItem = ({ isAuthenticated, addItem, items }) => {
	const [item, setItem] = useState("");
	const { mutate } = useSWRConfig();

	const handleChange = (e) => {
		setItem(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addItem(isAuthenticated, item);

		setItem("");
		// NOTE: Updates the new item added with id from data base since the page was updated without the id.
		// - This is done to enable delete item functionality work for the just added item else it would try to delete an item it the id whiles the id is not present
		mutate(`${apiUrl}/items`, items);
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
	items: state.item.items,
});
const mapDispatchToProps = { addItem };

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
