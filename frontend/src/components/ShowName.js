// import useSWR from "swr";
import { useEffect } from "react";
import { connect } from "react-redux";
import useFetch from "../contex/useFetch";
import { getName } from "../redux/actions/printAction";

const ShowName = ({ getName, name }) => {
	const { data, error } = useFetch("/name");
	useEffect(() => {
		if (error) {
			getName(error.response.data);
		} else if (data) {
			getName(data);
		}
	}, [data, error, getName]);

	return name ? (
		<div>
			{/* <button onClick={handleClick}>Show Name</button> */}
			<div className="name">{name}</div>
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
};
const mapStateToProps = (state) => ({
	name: state.print.name,
});
export default connect(mapStateToProps, { getName })(ShowName);
