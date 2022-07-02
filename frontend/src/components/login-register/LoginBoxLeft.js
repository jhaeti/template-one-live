import Image from "next/image";

const LoginBoxLeft = () => (
	<div className="login-box__left">
		<Image
			className="login-pizza"
			priority="true"
			src="/imgs/loginPizza.jpg"
			alt="Pizza"
			layout="intrinsic"
			width={540}
			height={640}
		/>
	</div>
);

export default LoginBoxLeft;
