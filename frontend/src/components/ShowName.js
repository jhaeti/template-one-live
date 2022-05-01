import { connect } from "react-redux";

const ShowName = ({ name }) =>
	name ? (
		<div>
			{/* <button onClick={handleClick}>Show Name</button> */}
			<div className="name">{name ? `Welcome ${name}` : ""}</div>
			<style jsx>
				{`
					.name {
						font-size: 20px;
					}
				`}
			</style>
		</div>
	) : (
		<></>
	);

const mapStateToProps = (state) => ({
	name: state.auth.user && state.auth.user.name,
});

export default connect(mapStateToProps, null)(ShowName);
