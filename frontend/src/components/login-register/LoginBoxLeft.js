import Image from "next/image";
import pizza from "https://raw.githubusercontent.com/jhaeti/template-one-live/main/frontend/public/imgs/login-pizza.jpg";

const LoginBoxLeft = () => (
	<div className="login-box__left">
		<Image
			priority="true"
			src={pizza}
			alt="Pizza"
			objectFit="contain"
			layout="responsive"
			className="login-pizza"
		/>
	</div>
);

export default LoginBoxLeft;
