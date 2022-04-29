export const GET_NAME = "GET_NAME";
export const CLEAR_NAME = "CLEAR_NAME";
export const LOADING_NAME = "LOADING_NAME";

export const getName = (name) => (dispatch) => {
	dispatch({
		type: LOADING_NAME,
	});
	// console.log(name);
	// const res = await axios("http://localhost:5000/name");
	dispatch({
		type: GET_NAME,
		payload: name,
	});

	// const fetcher = (url) => axios.get(url).then((res) => res.data);

	// const data = useSWR("http://localhost:5000/name", fetcher);

	// if (data) {
	// 	dispatch({
	// 		type: GET_NAME,
	// 		payload: data,
	// 	});
	// } else {
	// 	dispatch({
	// 		type: CLEAR_NAME,
	// 	});
	// }
};
