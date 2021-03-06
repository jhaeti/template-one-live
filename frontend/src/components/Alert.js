import { connect } from "react-redux";
import { clearMsg } from "../redux/actions/userAction";

const Alert = ({ msg, clearMsg }) =>
	msg &&
	//  CLears Message after 3s.
	setTimeout(() => {
		clearMsg();
	}, 3000) && (
		<div className="alert row row--end">
			<div className="alert__msg mr--5">
				{msg}
				<div
					onClick={() => {
						clearMsg();
					}}
					className="alert__close-btn"
				>
					x
				</div>
			</div>
			<style jsx>{``}</style>
		</div>
	);

const mapStateToProps = (state) => ({
	msg: state.auth.msg,
});

const mapDispatchToProps = { clearMsg };

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
