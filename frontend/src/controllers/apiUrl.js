const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NEXT_PUBLIC_API_DEV_URL;
export default apiUrl;
