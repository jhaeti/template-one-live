/* eslint-disable default-param-last */
import { CLEAR_NAME, GET_NAME, LOADING_NAME } from "../actions/printAction";

const initialPrintState = {
	name: "",
	isLoading: false,
};

const printReducer = (state = initialPrintState, action) => {
	switch (action.type) {
		case LOADING_NAME:
			return {
				...state,
				isLoading: true,
			};
		case GET_NAME:
			return {
				...state,
				name: action.payload,
				isLoading: false,
			};
		case CLEAR_NAME:
		default:
			return state;
	}
};

export default printReducer;
