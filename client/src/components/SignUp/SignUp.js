import React from "react";
import "./SignUp.css";
import images from "../../images.json";

export default function SignUp() {
	return (
		<>
			<div className="signup-page">
				<div className="login-title">
					<img id="bg" alt="" src={images["signup-background"]} />
				</div>
				<div className="signup-form-wrapper">
					<div className="signup-backtologin">
						<a href="/login">&lt; Login</a>
					</div>
					<div className="signup-form-title">Adoptify</div>
					<div className="signup-form-outline">
						<form
							className="signup-form"
							action="/login"
							method="post"
						>
							<div className="form-field">
								<img
									alt=""
									id="signup-user-first-name"
									src={images["signup-user-name-icon"]}
								/>
								<input
									type="text"
									placeholder="First Name"
									required
								/>
							</div>
							<div className="form-field">
								<img
									alt=""
									id="signup-user-last-name"
									src={images["signup-user-name-icon"]}
								/>
								<input
									type="text"
									placeholder="Last Name"
									required
								/>
							</div>
							<div className="form-field">
								<img
									alt=""
									id="signup-user-phone"
									src={images["signup-user-phone-icon"]}
								/>
								<input
									type="tel"
									pattern="[0-9]{10}"
									placeholder="Phone"
									required
								/>
							</div>
							<div className="form-field">
								<img
									alt=""
									id="signup-user-address"
									src={images["signup-user-address-icon"]}
								/>
								<input
									type="text"
									placeholder="Address"
									required
								/>
							</div>
							<div className="form-field">
								<img
									alt=""
									id="user"
									src={images["signup-user-email-icon"]}
								/>
								<input
									type="email"
									placeholder="Email"
									required
								/>
							</div>

							<div className="form-field">
								<img
									alt=""
									id="lock"
									src={images["login-lock-icon"]}
								/>
								<input
									type="password"
									placeholder="Password"
									required
								/>{" "}
							</div>

							<div>
								<div className="login-form-button-wrapper">
									<button type="submit">Sign Up</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
