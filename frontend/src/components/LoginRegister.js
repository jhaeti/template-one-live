import LoginBoxLeft from "./login-register/LoginBoxLeft";
import LoginBoxRight from "./login-register/LoginBoxRight";

const LoginRegister = () => (
	<div className="col col--center col-fill-between">
		<div className="container">
			<div className="row row--center">
				<div className="login-box">
					<LoginBoxLeft />
					<LoginBoxRight />
				</div>
			</div>
		</div>
	</div>
);

export default LoginRegister;
