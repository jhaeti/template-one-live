import Image from "next/image";

const LoginBoxLeft = () => (
	<div className="login-box__left">
		<Image
			priority="true"
			src="/imgs/login-pizza.jpg"
			alt="Pizza"
			layout="intrinsic"
			sizes="50vw"
			width={540}
			height={640}
			className="login-pizza"
		/>
	</div>
);

export default LoginBoxLeft;
