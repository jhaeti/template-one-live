import { connect } from "react-redux";
import { deleteItem } from "../redux/actions/itemAction";

const DeleteButton = ({ deleteItem, id }) => (
	<button onClick={() => deleteItem(id)} className="btn btn--danger">
		Delete Item
	</button>
);

const mapDispatchToProps = { deleteItem };

export default connect(null, mapDispatchToProps)(DeleteButton);
