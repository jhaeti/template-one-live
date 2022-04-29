import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) =>
	axios.get(url, { withCredentials: true }).then((res) => res.data);

const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_API_DEV_URL;
const useFetch = (url) => {
	const { data, error } = useSWR(`${apiUrl}${url}`, fetcher);

	return { data, error };
};

export default useFetch;
