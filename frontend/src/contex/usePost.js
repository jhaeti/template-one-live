import axios from "axios";
import { useState } from "react";

const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_API_DEV_URL;

const usePost = async (url, body) => {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const res = await axios.post(`${apiUrl + url}`, body, {
		withCredentials: true,
	});
	if (error) {
		setError(error);
	}
	if (!error && !data) {
		setLoading(!loading);
	}
	if (data) {
		setLoading(false);
		setData(res.data);
	}

	return { data, error, loading };
};

export default usePost;
