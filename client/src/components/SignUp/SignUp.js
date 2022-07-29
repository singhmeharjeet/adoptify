import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { BASE_URL } from "../constants";
import images from "../../images.json";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
	const [uFirstName, setFirstName] = useState("");
	const [uLastName, setLastName] = useState("");
	const [uPhoneNum, setPhoneNum] = useState("");
	const [uAddress, setAddress] = useState("");
	const [uEmail, setEmail] = useState("");
	const [uPassword, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		const userFormData = new FormData();
		userFormData.append("uFirstName", uFirstName);
		userFormData.append("uLastName", uLastName);
		userFormData.append("uPhoneNum", uPhoneNum);
		userFormData.append("uAddress", uAddress);
		userFormData.append("uEmail", uEmail);
		userFormData.append("uPassword", uPassword);
		// userFormData.append("uImage", uImage);   IF we are having them insert their profile pic during sign up

		try {
			const res = await axios
				.post(`${BASE_URL}/addUser`, userFormData)
				.then(response => console.log(response))
				.then(alert("Signed up successfully!"));
		} catch (err) {
			if(err){ 
				console.log(err);
			}
		}
	};
	return (
		<>
			<div className="signup-page">
				<div className="signup-title">
					<img id="bg" alt="" src={images["signup-background"]} />
				</div>
				<div className="signup-form-wrapper">
					<div className="signup-backtologin">
						<Link className="back-to-login-link" to="/login">
							<FontAwesomeIcon
								className="profile-icon"
								icon={faCaretLeft}
							></FontAwesomeIcon>{" "}
							Login
						</Link>
					</div>
					<div className="sign-up-form-container">
						<div className="signup-form-title">Adoptify</div>
						<div className="signup-form-outline">
							<form
								className="signup-form"
								onSubmit={onSubmit}
								// action="/login"
								// method="post"
							>
								<div className="form-field">
									<img
										alt=""
										id="signup-user-first-name"
										src={images["signup-user-name-icon"]}
									/>
									<input
										name="firstname"
										type="text"
										placeholder="First Name"
										required
										onChange={(event) => {
											return setFirstName(
												event.target.value
											);
										}}
									/>
								</div>
								<div className="form-field">
									<img
										alt=""
										id="signup-user-last-name"
										src={images["signup-user-name-icon"]}
									/>
									<input
										name="lastname"
										type="text"
										placeholder="Last Name"
										required
										onChange={(event) => {
											return setLastName(
												event.target.value
											);
										}}
									/>
								</div>
								<div className="form-field">
									<img
										alt=""
										id="signup-user-phone"
										src={images["signup-user-phone-icon"]}
									/>
									<input
										name="phonenum"
										type="tel"
										pattern="[0-9]{10}"
										placeholder="Phone"
										required
										onChange={(event) => {
											return setPhoneNum(
												event.target.value
											);
										}}
									/>
								</div>
								<div className="form-field">
									<img
										alt=""
										id="signup-user-address"
										src={images["signup-user-address-icon"]}
									/>
									<input
										name="address"
										type="text"
										placeholder="Address"
										required
										onChange={(event) => {
											return setAddress(
												event.target.value
											);
										}}
									/>
								</div>
								<div className="form-field">
									<img
										alt=""
										id="user"
										src={images["signup-user-email-icon"]}
									/>
									<input
										name="email"
										type="email"
										placeholder="Email"
										required
										onChange={(event) => {
											return setEmail(event.target.value);
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
										name="password"
										type="password"
										placeholder="Password"
										required
										onChange={(event) => {
											return setPassword(
												event.target.value
											);
										}}
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
			</div>
		</>
	);
}
