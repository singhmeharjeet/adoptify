import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Navigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL } from "../constants";
import images from "../../images.json";
import { getPermission } from "../utils";

async function authenticate(username, password) {
	let result = "";
	await fetch(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	})
		.then((res) => res.json())
		.then((data) => {
			result = data.token;
			console.log('result', result)
		})
		.catch((error) => {
			console.log('error', error)
		});

	return result;
}
export default function Login({ setPermission }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	let navigate = useNavigate();
	
	const token = getPermission();
	if (token) {
		return <Navigate to="/"></Navigate>;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = (await authenticate(username, password));
		console.log("token", token);
		setPermission(token);
		if(token === '') {
			console.log('Please enter correct username and password')
			return
		}
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
