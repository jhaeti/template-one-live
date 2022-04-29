import Router from "next/router";
import axios from "axios";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CLEAR_MSG = "CLEAR_MSG";
export const SET_MSG = "SET_MSG";

// const apiUrl = process.env.API_URL;
const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_API_DEV_URL;

// Attempt to login
export const login = (user) => (dispatch) => {
	axios
		.post(`${apiUrl}/users/login`, user, {
			withCredentials: true,
		})
		.then((res) => {
			// Redirect to Homepage after successfully loggin in
			Router.push("/");
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response,
			});
		});
};

export const setMsg = (msg) => ({ type: SET_MSG, payload: msg });

// Logout a user
export const logout = () => (dispatch) => {
	axios
		.get(`${apiUrl}/users/logout`, {
			withCredentials: true,
		})
		.then(() => dispatch({ type: LOGOUT_SUCCESS }));
};

// Attempt to load user on page reload
export const loadUser = (data) => ({
	type: LOAD_USER_SUCCESS,
	payload: data,
});

// Attempt to register a user
export const register = (user) => (dispatch) => {
	axios
		.post(`${apiUrl}/users/register`, user, {
			withCredentials: true,
		})
		.then((res) => {
			// Redirect to the Homepage after successfully registering
			Router.push("/");
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response,
			});
		});
};

export const clearMsg = () => ({
	type: CLEAR_MSG,
});
