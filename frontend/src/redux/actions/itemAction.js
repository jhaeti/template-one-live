import axios from "axios";
import { setMsg } from "./userAction";

export const GET_ITEMS = "GET_ITEMS";
export const IS_LOADING = "IS_LOADING";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CLEAR_ITEMS = "CLEAR_ITEMS";

const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_API_DEV_URL;

// Get all items in database
export const getItems = (data) => ({
	type: GET_ITEMS,
	payload: data,
});

// Clears all items in database
export const clearItems = () => ({ type: CLEAR_ITEMS });

export const loadingItems = () => ({ type: IS_LOADING });

// Try to add an item to database
export const addItem = (name) => (dispatch) => {
	if (!name || "") {
		dispatch(setMsg("Please type the name of your item"));
	} else {
		axios
			.post(`${apiUrl}/items`, { name }, { withCredentials: true })
			.then((res) => {
				dispatch({
					type: ADD_ITEM,
					payload: res.data,
				});
			})
			// Notify user for login before action
			.catch((err) => err && dispatch(setMsg("Login to add an item")));
	}
};

// Try to delete and item from database
export const deleteItem = (id) => (dispatch) => {
	axios
		.delete(`${apiUrl}/items/${id}`, { withCredentials: true })
		.then(() => {
			dispatch({
				type: DELETE_ITEM,
				payload: id,
			});
		})
		// Notify User to login before action
		.catch((err) => err && dispatch(setMsg("Login to delete an item")));
};
