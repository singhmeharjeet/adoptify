import React, {useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { BASE_URL } from "../constants";
import images from "../../images.json";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalData } from "../../Context/global/GlobalContext";
import {
	faCaretLeft,
	faCheckCircle,
	faExclamationCircle,
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
	const [isError, setError] = useState(false);
	const [isValid, setValid] = useState(false);
	const [isClicked, setClicked] = useState(false);
	const [confPasswordType, setconfPasswordType] = useState("password");
	const [errFirstName,setErrFirstName] = useState(" ");
	const [errLastName,setErrLastName] = useState(" ");
	const [errPhoneNum,setErrPhoneNum] = useState(" ");
	const [errAddress,setErrAddress] = useState(" ");
	const [errEmail,setErrEmail] = useState(" ");
	const [errPassword,setErrPassword] = useState(" ");
	const [errConfPassword,setErrConfPassword] = useState(" ");
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
	}
	
	const validateFirstName=(event) => {
		const firstname = event.target.value;
		const patt = RegExp(/^[A-Za-z0-9]{3,16}$/i);
		// console.log(firstname);
		setFirstName(firstname);
		if(firstname == "")
		{
			setErrFirstName("First name is required");
			
			setError(true);	
		}
		else if(!patt.test(firstname)){
			setErrFirstName("First Name should be 3-16 characters long and shouldn't include any special character! ")
			setError(true);	
		
		}
		else{
			setErrFirstName("");
			setError(false);	
		}
	}
	const validateLastName=(event) => {
		const lastname = event.target.value;
		const patt = RegExp(/^[A-Za-z0-9]{2,16}$/i);
		// console.log(lastname)
		setLastName(lastname);
		if(lastname == "")
		{
			setErrLastName("Last name is required");
			setError(true);
			
		}
		else if(!patt.test(lastname)){
			setErrLastName("Last name should be 2-16 characters long and shouldn't include any special character! ");
			setError(true);
			
		}
		else{
			setErrLastName("");
			setError(false);
			
		}
	}

	const validatePhoneNum=(event) => {
		const phonenum = event.target.value;
		const patt = RegExp(/^\d{3}\d{3}\d{4}$/i);
		// console.log(phonenum)
		setPhoneNum(phonenum);
		if(phonenum == "")
		{
			setErrPhoneNum("Phone number is required");
			setError(true);
		
		}
		else if(!patt.test(phonenum)){
			setErrPhoneNum("Invalid phone number! Should contain 10 digits")
			setError(true);
		
		}
		else{
			setErrPhoneNum("");
			setError(false);
			
		}
	}

	const validateAddress =(event) => {
		const address = event.target.value;
		// console.log(address)
		setAddress(address);
		if(address== "")
		{
			setErrAddress("City should not be empty");
			setError(true);
			
		}
		else{
			setErrAddress("");
			setError(false);
			
		}
	}

	const validateEmail=(event) => {
		const email= event.target.value;
		const patt = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
		// console.log(email)
		setEmail(email);
		if(email== "")
		{
			setErrEmail("Email is required");
			setError(true);
			
		}
		else if(!patt.test(email)){
			setErrEmail("Invalid email address. Should be of format abc@abc.abc")
			setError(true);
			
		}
		else{
			setErrEmail("");
			setError(false);
			
		}

	}
		const validatePassword=(event) => {
		const password= event.target.value;
		const patt = RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i);
		console.log(password)
		setPassword(password);
		if(password== "")
		{
			setErrPassword("Password is required");
			setError(true);
			
		}
		else if(!patt.test(password)){
			setErrPassword("Use 8 or more characters with a mix of letters, numbers & symbols ")
			setError(true);
			
		}
		else if(password !== uConfirmPassword){
			setErrPassword("")
			setErrConfPassword("Confirm password don't match with Password! Try again.");	
			setError(true);
		}
		
		else{
			setErrPassword("");
			setErrConfPassword("");	
			setError(false);
			
		}
	}



	const validateConfPassword=(event) => {	
		
		const confirmPassword = event.target.value;
		// console.log(confirmPassword)
		setConfirmPassword(confirmPassword);
		if(confirmPassword !== uPassword){
			setErrConfPassword("Confirm password don't match with Password! Try again.");	
			setError(true );
		}
		else {
			setErrConfPassword("");
			setError(false);
			
		}
	}



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
		setClicked(true);
		if(errFirstName !== "" || errLastName !==  "" || errPhoneNum !== "" || errAddress !== ""
		|| errPassword !== "" || errConfPassword !== "")
		{	   
			return;
		}
		
		else{
            setValid(true);
		const userFormData = new FormData();
		userFormData.append("uFirstName", uFirstName);
		userFormData.append("uLastName", uLastName);
		userFormData.append("uPhoneNum", uPhoneNum);
		userFormData.append("uAddress", uAddress);
		userFormData.append("uEmail", uEmail);
		userFormData.append("uPassword", uPassword);
		userFormData.append("uConfirmPassword", uConfirmPassword);
		try {
			await axios
				.post(`${BASE_URL}/addUser`, userFormData)
				.then(response => console.log(response));
		} catch (err) {
			if (err) {
				console.log(err);
			}
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
						
						<div className="signup-form-outline" >
						
							<form
							id="formId"
								className="signup-form"
								 onSubmit={onSubmit}
							>
						<div>
                         { isClicked ?  <div className="alert"><i className="circleErrorIcon"  >
							<FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon></i>
								Please fill the form Carefully</div>: null }
                        </div>
						<div>
                         { isValid ?  <div className="alert-success"><i className="circleCheckIcon"  >
							<FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
								Signed In Successfully!</div>: null }
                        </div>
						<div className="groupFirstLastName">
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
											validateFirstName(event);
											
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
											validateLastName(event)
										}}
									/>
								
								</div>
								</div>
							
								<div className="groupErrFirstLastName">
									
								<label className="errMsg">{errFirstName}
										</label>				
								<label className="errMsg">{errLastName}
										</label>					
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
										placeholder="Phone"
										required
										onChange={(event) => {
											validatePhoneNum(event)
										}}
									/>
									
								</div>
								<div className="form-field">
										<label className="errMsg">{errPhoneNum}
										</label>
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
										placeholder="City"
										required
										onChange={(event) => {
											validateAddress(event)
										}}
									/>
									
								</div>
								<div className="form-field">
										<label className="errMsg">{errAddress}
										</label>
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
											validateEmail(event)
										}}
									/>
									
								</div>
								<div className="form-field">
										<label className="errMsg">{errEmail}
										</label>
								</div>
								<div className="groupPwdConfPwd">
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
											validatePassword(event)
											
										}}
										
									/>
									
										<i  className="eyeIcon" onClick={handleEyeClick}>
										{passwordType === "password" ? <FontAwesomeIcon id="passEyeSlash"  icon={faEyeSlash}></FontAwesomeIcon> : <FontAwesomeIcon id="passEye"  icon={faEye}></FontAwesomeIcon>}
									</i>
									</div>
									<div className="form-field">
									<img
										alt=""
										id="lockConfPwd"
										src={images["login-lock-icon"]}
									/>
									<input
										className="form-input"
										name="confirmPassword"
										type={confPasswordType}
										placeholder="Confirm Password"
										required
										onChange={(event) => {
											validateConfPassword(event)
											
										}}
									/>
									
									<i className="eyeConfIcon" onClick={handleConfEyeClick}>
										{confPasswordType === "password" ? <FontAwesomeIcon id="passEyeSlash"  icon={faEyeSlash}></FontAwesomeIcon> : <FontAwesomeIcon id="passEye"  icon={faEye}></FontAwesomeIcon>}
									</i>
									</div>
								</div>
								
								<div className="groupPwdConfPwd">
										<label className="errMsg">{errPassword}
										</label>
										<label className="errMsg">{errConfPassword}
										</label>
								</div>
								<div>
									<div className="login-form-button-wrapper">
										<button type="submit" id = "sign-up-button"  disabled={isDisabled}
										 >Sign Up</button>
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
