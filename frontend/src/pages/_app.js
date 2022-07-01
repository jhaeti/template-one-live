import wrapper from "../redux/store";

import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
