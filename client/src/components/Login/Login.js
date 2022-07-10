import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Navigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL } from "../constants";
import images from "../../images.json";

async function authenticate(username, password) {
	let result = "";
	try {
		const responseJSON = await (
			await fetch(`${BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})
		).json();

		// if response is sucessfull
		result = responseJSON.token;
	} catch (error) {
		console.log("error", error);
	}
	return result;
}
export default function Login({ setPermission, permission }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();

	if (permission) return <Navigate to="/"></Navigate>;

	const handleSubmit = async (event) => {
		event.preventDefault();

		// isAuthenticated is a string that has the users username.
		const isAuthenticated = await authenticate(username, password);

		if (isAuthenticated !== username) {
			console.log("Username or Password invalid");
			return;
		}

		// When we receive the token from the server, we set it to the local storage of the browser
		setPermission(isAuthenticated);

		// Allow the user to go to the home page
		navigate("/", { replace: true });
	};

	return (
		<>
			<div className="login-page">
				<div className="login-title">
					<img alt="" id="bg" src={images["login-background"]} />
				</div>
				<div className="login-form-wrapper">
					<div className="login-form-outline">
						<div className="login-form-title">Adoptify</div>
						<form className="login-form">
							<div className="form-field">
								<img
									alt=""
									id="user"
									src={images["login-user-icon"]}
								/>
								<input
									type="email"
									placeholder="Email"
									required
									onChange={(e) => {
										setUsername(e.target.value);
									}}
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
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>{" "}
							</div>

							<div>
								<div className="login-form-button-wrapper">
									<button
										type="submit"
										onClick={(e) => handleSubmit(e)}
									>
										Log in
									</button>
								</div>
							</div>
							<div className="login-form-signup">
								<p>Not a user?</p>
								<a href="/signup">Sign Up</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
Login.propTypes = {
	setPermission: PropTypes.func.isRequired,
};
