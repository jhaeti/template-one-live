import Link from "next/link";
import Image from "next/image";

const NavBranding = () => (
	<div className="nav__branding">
		<Link href="/">
			<a className="nav__logo">
				<Image
					priority="true"
					src="/icons/logo.svg"
					alt="Add item Icon"
					className="logo-svg"
					width="100"
					height="100"
				/>
			</a>
		</Link>
	</div>
);

export default NavBranding;
