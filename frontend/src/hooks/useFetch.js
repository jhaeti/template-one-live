import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
	axios.get(url, { withCredentials: true }).then((res) => res.data);

const useFetch = (url) => {
	const { data, error, mutate } = useSWR(url, fetcher);
	// if (error) {
	// 	mutate(initialState);
	// }
	return { data, error, mutate };
};

export default useFetch;
