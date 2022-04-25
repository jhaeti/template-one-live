import { connect } from "react-redux";
import Item from "./Item";

const Items = ({ items }) =>
	items.map((item) => <Item key={item._id} item={item} />);

const mapStateToProps = (state) => ({
	items: state.item.items,
});

export default connect(mapStateToProps, null)(Items);
