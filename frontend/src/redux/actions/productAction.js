import axios from "axios";
import { setMsg } from "./userAction";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const IS_LOADING = "IS_LOADING";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

// Get all items in database
export const getProducts = (data) => ({
	type: GET_PRODUCTS,
	payload: data,
});

// Clears all products in database
export const clearProducts = () => ({ type: CLEAR_PRODUCTS });

export const loadingProducts = () => ({ type: IS_LOADING });

// Try to add an item to database
export const addProduct = (isAuthenticated, name) => (dispatch) => {
	if (!isAuthenticated) {
		dispatch(setMsg("Please login to add item"));
	} else if (!name) {
		dispatch(setMsg("Please type the name of your item"));
	} else {
		dispatch({
			type: ADD_PRODUCT,
			payload: { name },
		});
		axios
			.post(`/api/product`, { name }, { withCredentials: true })
			.then()
			// Notify user for login before action
			.catch((err) => err && dispatch(setMsg("Login to add an item")));
	}
};

// Try to delete and item from database
export const deleteProduct = (id) => (dispatch) => {
	axios
		.delete(`/api/products/${id}`, { withCredentials: true })
		.then(() => {
			dispatch({
				type: DELETE_PRODUCT,
				payload: id,
			});
		})
		// Notify User to login before action
		.catch((err) => err && dispatch(setMsg("Login to delete an item")));
};
