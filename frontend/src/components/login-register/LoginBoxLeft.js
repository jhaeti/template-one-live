import Image from "next/image";
import loginPizza from "../../../public/imgs/loginPizza.jpg";

const LoginBoxLeft = () => (
	<div className="login-box__left">
		<Image
			className="login-pizza"
			priority="true"
			src={loginPizza}
			alt="Pizza"
			placeholder="blur"
			sizes="50vw"
		/>
	</div>
);

export default LoginBoxLeft;
