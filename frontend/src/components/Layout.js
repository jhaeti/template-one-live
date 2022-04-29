import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "./Alert";

const Layout = ({ children, title, description }) => (
	<div>
		<Head>
			<title>{title || ""}</title>
			<meta charSet="UTF-8" />
			<meta name="description" content={description || ""} />
			<meta
				name="keywords"
				content="Nextjs, React, Node, Boilerplate, Redux, Mongodb"
			/>
			<meta name="author" content="Ti Jhae" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
		</Head>
		<Navbar />
		<div className="col-fill-between">
			<Alert />

			{children}
		</div>
		<Footer />
	</div>
);

export default Layout;
