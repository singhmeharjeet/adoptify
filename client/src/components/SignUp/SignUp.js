import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { BASE_URL } from "../constants";
import images from "../../images.json";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalData } from "../../Context/global/GlobalContext";
import {
	faCaretLeft,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
	const [uFirstName, setFirstName] = useState("");
	const [uLastName, setLastName] = useState("");
	const [uPhoneNum, setPhoneNum] = useState("");
	const [uAddress, setAddress] = useState("");
	const [uEmail, setEmail] = useState("");
	const [uPassword, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");
	const { allUsers } = useGlobalData();
	const [isDisabled, setDisabled] = useState(false);
	const [confPasswordType, setconfPasswordType] = useState("password");
	const [isError, setError] = useState("");
	const [uConfirmPassword, setConfirmPassword] = useState("");
	const handleEyeClick = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};
	const handleConfEyeClick = () => {
		if (confPasswordType === "password") {
			setconfPasswordType("text");
		} else {
			setconfPasswordType("password");
		}
	};

	const checkValidation = (event) => {
		const confirmPassword = event.target.value;
		setConfirmPassword(confirmPassword);
		if (uPassword !== confirmPassword) {
			setError("Confirm Password should match with Password");
		} else {
			setError("");
		}
	};

	const checkUsername = (email) => {
		const tempUsernames = allUsers.map((d) => d.username);
		if (tempUsernames.includes(email)) {
			// window.alert("Warning: This email is already taken. Please enter another email.")
			setDisabled(true);
		} else {
			setDisabled(false);
		}
		console.log(tempUsernames);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const userFormData = new FormData();
		userFormData.append("uFirstName", uFirstName);
		userFormData.append("uLastName", uLastName);
		userFormData.append("uPhoneNum", uPhoneNum);
		userFormData.append("uAddress", uAddress);
		userFormData.append("uEmail", uEmail);
		userFormData.append("uPassword", uPassword);
		userFormData.append("uConfirmPassword", uConfirmPassword);
		// userFormData.append("uImage", uImage);   IF we are having them insert their profile pic during sign up

		try {
			await axios
				.post(`${BASE_URL}/addUser`, userFormData)
				.then((response) => console.log(response))
				.then(alert("Signed up successfully!"));
		} catch (err) {
			if (err) {
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
										className="form-input"
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
										className="form-input"
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
										className="form-input"
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
										className="form-input"
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
								<div
									className="form-field"
									onBlur={(event) => {
										checkUsername(event.target.value);
									}}
								>
									<img
										alt=""
										id="user"
										src={images["signup-user-email-icon"]}
									/>
									<input
										className="form-input"
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
										className="form-input"
										name="password"
										type={passwordType}
										placeholder="Password"
										required
										onChange={(event) => {
											return setPassword(
												event.target.value
											);
										}}
									/>
									<i
										className="eyeIcon"
										onClick={handleEyeClick}
									>
										{passwordType === "password" ? (
											<FontAwesomeIcon
												id="passEye"
												icon={faEyeSlash}
											></FontAwesomeIcon>
										) : (
											<FontAwesomeIcon
												id="passEyeSlash"
												icon={faEye}
											></FontAwesomeIcon>
										)}
									</i>{" "}
								</div>
								<div className="form-field">
									<img
										alt=""
										id="lock"
										src={images["login-lock-icon"]}
									/>
									<input
										className="form-input"
										name="confirmPassword"
										type={passwordType}
										placeholder="Confirm Password"
										required
										onBlur={(event) =>
											checkValidation(event)
										}
									/>
									<i
										className="eyeConfIcon"
										onClick={handleConfEyeClick}
									>
										{confPasswordType === "password" ? (
											<FontAwesomeIcon
												id="passEye"
												icon={faEyeSlash}
											></FontAwesomeIcon>
										) : (
											<FontAwesomeIcon
												id="passEyeSlash"
												icon={faEye}
											></FontAwesomeIcon>
										)}
									</i>{" "}
								</div>
								<div className="form-field">
									<span>
										<svg
											aria-hidden="true"
											fill="currentColor"
											focusable="false"
											width="16px"
											height="16px"
											viewBox="0 0 24 24"
											xmlns="https://www.w3.org/2000/svg"
										>
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
										</svg>
									</span>
									<div>{isError}</div>
									{/* <div style={{position: "absolute", top:20,marginLeft: 330}}>
											{isError}
										</div> */}
								</div>

								<div>
									<div className="login-form-button-wrapper">
										<button
											type="submit"
											id="sign-up-button"
											disabled={isDisabled}
										>
											Sign Up
										</button>
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
