import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { login, register } from "../../redux/actions/userAction";

const LoginBoxRight = ({ login, register }) => {
	const [state, setState] = useState({ email: "", password: "", name: "" });
	const [route, setRoute] = useState("login");
	const [inProp, setInProp] = useState(false);

	useEffect(() => {
		setInProp(route === "register");
	}, [route]);

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	// Attempting to Login / Register
	const handleSubmit = (e) => {
		e.preventDefault();
		if (route === "login") {
			login(state);
		} else {
			register(state);
		}
	};
	return (
		<div className="login-box__right pl--3 pr--3 pt--3 pb--3">
			<form onSubmit={handleSubmit} className="login-box__form">
				<div className={`form-head ${route}`}>
					<div
						onClick={() => setRoute("login")}
						className="form-head--login"
					>
						Login
					</div>
					<div
						onClick={() => setRoute("register")}
						className="form-head--register"
					>
						Register
					</div>
				</div>
				<div className="form-body">
					<CSSTransition
						in={inProp}
						timeout={200}
						classNames="form-control"
					>
						<div className="form-control">
							<input
								className="login-box__input"
								type="name"
								id="name"
								name="name"
								onChange={handleChange}
								value={state.name}
								required
							/>

							<label
								htmlFor="name"
								className={`login-box__label ${
									state.name ? "shrink" : ""
								}`}
							>
								Name
							</label>
						</div>
					</CSSTransition>

					<div className="form-control">
						<input
							className="login-box__input"
							type="email"
							id="email"
							name="email"
							onChange={handleChange}
							value={state.email}
							required
						/>
						<label
							htmlFor="email"
							className={`login-box__label ${
								state.email ? "shrink" : ""
							}`}
						>
							Email
						</label>
					</div>
					<div className="form-control">
						<input
							className="login-box__input"
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
							value={state.password}
							required
						/>
						<label
							htmlFor="password"
							className={`login-box__label ${
								state.password ? "shrink" : ""
							}`}
						>
							Password
						</label>
					</div>
					<input
						className="btn login-box__submit mt--2"
						type="submit"
						id="submit"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = { login, register };

export default connect(null, mapDispatchToProps)(LoginBoxRight);
