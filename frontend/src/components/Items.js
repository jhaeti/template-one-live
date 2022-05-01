import { connect } from "react-redux";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Item from "./Item";
import { getItems } from "../redux/actions/itemAction";
import apiUrl from "../controllers/apiUrl";

const Items = ({ items, getItems }) => {
	const url = `${apiUrl}/items`;
	const { data } = useFetch(url);

	useEffect(() => {
		if (data) {
			getItems(data);
		}
	}, [data]);

	if (!data) return <div>Loading...</div>;
	return items.map((item) => <Item key={item._id} item={item} />);
};

const mapStateToProps = (state) => ({
	items: state.item.items,
});

const mapDispatchToProps = { getItems };
export default connect(mapStateToProps, mapDispatchToProps)(Items);
