import { connect } from "react-redux";
import { mutate } from "swr";
import { useEffect } from "react";
import useFetch from "../contex/useFetch";
import Item from "./Item";
import { getItems } from "../redux/actions/itemAction";

const Items = ({ items, getItems }) => {
	const { data } = useFetch("/items");
	useEffect(() => {
		if (data) {
			getItems(data);
		}
		return () => {
			mutate("http://localhost:5000/items");
		};
	}, [data, getItems]);

	if (!data) return <div>Loading...</div>;
	return items.map((item) => <Item key={item._id} item={item} />);
};

const mapStateToProps = (state) => ({
	items: state.item.items,
});

const mapDispatchToProps = { getItems };
export default connect(mapStateToProps, mapDispatchToProps)(Items);
