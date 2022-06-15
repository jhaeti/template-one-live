import NavBranding from "./navbar/NavBranding";
import NavMenu from "./navbar/NavMenu";

const Navbar = () => (
	<div className="nav">
		<div className="container">
			<div className="nav__box">
				<NavBranding />
				<NavMenu />
			</div>
		</div>
	</div>
);

export default Navbar;
