import {
	ADD_PRODUCT,
	DELETE_PRODUCTS,
	GET_PRODUCTS,
	IS_LOADING,
	CLEAR_PRODUCTS,
} from "../actions/productAction";

const initialProductState = {
	products: [],
	isLoading: false,
};

const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case IS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				isLoading: false,
			};
		case ADD_PRODUCT:
			return {
				...state,
				products: [action.payload, ...state.products],
			};
		case DELETE_PRODUCTS:
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== action.payload
				),
			};
		// Clears the state when a user logs out successfully
		case CLEAR_PRODUCTS:
			// mutate("http://localhost:5000/products");
			return {
				...state,
				products: [],
				isLoading: false,
			};
		default:
			return state;
	}
};

export default productReducer;
