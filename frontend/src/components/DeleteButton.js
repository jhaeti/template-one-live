import { connect } from "react-redux";
import { deleteProduct } from "../redux/actions/productAction";

const DeleteButton = ({ deleteProdut, id }) => (
	<button onClick={() => deleteProdut(id)} className="btn btn--danger">
		Delete Item
	</button>
);

const mapDispatchToProps = { deleteProduct };

export default connect(null, mapDispatchToProps)(DeleteButton);
