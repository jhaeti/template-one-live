const NavMenuBtn = ({ showMenu, setShowMenu }) => (
	<div
		onClick={() => setShowMenu(!showMenu)}
		className={`nav-menu-btn ${showMenu && "close"}`}
	>
		<div className="nav-menu-btn__line"></div>
		<div className="nav-menu-btn__line"></div>
		<div className="nav-menu-btn__line"></div>
	</div>
);

export default NavMenuBtn;
