import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import NavMenuBtn from "./NavMenuBtn";

const NavMenu = ({ isAuthenticated, user, logout }) => {
	const [showMenu, setShowMenu] = useState(false);
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const onLogoutClick = async () => {
		// Log user out
		await logout();
		// CLear cache else data would still be in cache
		await mutate(`/api/users/me`, null, { rollbackOnError: false });
	};
	// This is just for adding syles for active class
	const isCurrentPage = (path) =>
		router.pathname === path ? "active nav__link" : "nav__link";
	return (
		<>
			<ul className={`nav__list ${showMenu && "show"}`}>
				<li className="nav__item">
					<Link href="/">
						<a className={isCurrentPage("/")}>Home</a>
					</Link>
				</li>
				<li className="nav__item">
					<Link href="/about">
						<a className={isCurrentPage("/about")}>About</a>
					</Link>
				</li>
				{!isAuthenticated ? (
					<li className="nav__item">
						<Link href="/auth">
							<a className={isCurrentPage("/auth")}>Sign in</a>
						</Link>
					</li>
				) : (
					<>
						<li className="nav__item">
							<Link href="/my-profile">
								<a className={isCurrentPage("/my-profile")}>
									Profile
								</a>
							</Link>
						</li>
						<li className="nav__item">
							<Link href="/cart">
								<a className={isCurrentPage("/cart")}>Cart</a>
							</Link>
						</li>
						{user.role === "ADMIN" && (
							<li className="nav__item">
								<Link href="/admin-panel">
									<a
										className={`${isCurrentPage(
											"/admin-panel"
										)} ${
											/^\/admin/.test(router.pathname) &&
											"active"
										}`}
									>
										Admin panel
									</a>
								</Link>
							</li>
						)}
						<li className="nav__item">
							<Link href="/auth">
								<a
									className={isCurrentPage("/logout")}
									onClick={onLogoutClick}
								>
									Logout
								</a>
							</Link>
						</li>
					</>
				)}
			</ul>
			<NavMenuBtn showMenu={showMenu} setShowMenu={setShowMenu} />
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
