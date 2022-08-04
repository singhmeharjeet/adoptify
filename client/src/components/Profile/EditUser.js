import React, { useEffect, useState } from "react";
import "./EditUser.css";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function EditUser({
	setNewProfilePic,
	handleProfilePictureSubmit,
}) {
	const { editUserData, userDetails } = useGlobalData();
	const [passwordType, setPasswordType] = useState("password");
	const [confirmPasswordType, setConfirmPasswordType] = useState("password");
	const [editStatus, setEditStatus] = useState("");
    const[isError,setError] = useState(false);
	const [uFirstName, setFirstName] = useState("");
	const [uLastName, setLastName] = useState("");
	const [uPhoneNum, setPhoneNum] = useState("");
	const [uAddress, setAddress] = useState("");
	const [uPassword, setPassword] = useState("");
	const [uConfirmPassword, setConfirmPassword] = useState("");
	const [errFirstName,setErrFirstName] = useState("");
	const [errLastName,setErrLastName] = useState("");
	const [errPhoneNum,setErrPhoneNum] = useState("");
	const [errAddress,setErrAddress] = useState("");
	const [errPassword,setErrPassword] = useState("");
	const [errConfPassword,setErrConfPassword] = useState(""); 

	useEffect(() => {
		setTimeout(() => setEditStatus(""), 4000);
	}, [editStatus]);
	
	const validateFirstName=(event) => {
		const firstname = event.target.value;
		const patt = RegExp(/^[A-Za-z0-9]{3,16}$/i);
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
		setLastName(lastname);
		const patt = RegExp(/^[A-Za-z0-9]{2,16}$/i);
		// console.log(lastname)
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
		setPhoneNum(phonenum);
		const patt = RegExp(/^\d{3}\d{3}\d{4}$/i);
		// console.log(phonenum)
		if(phonenum == "")
		{
			setErrPhoneNum("Phone number is required");
			setError(true);
		
		}
		else if(!patt.test(phonenum)){
			setErrPhoneNum("Invalid phone number \n10 digit input is required")
			setError(true);
		
		}
		else{
			setErrPhoneNum("");
			setError(false);
			
		}
	}
	const validateAddress =(event) => {
		const address = event.target.value;
		setAddress(address);
		// console.log(address)
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

	const validatePassword=(event) => {
		const password= event.target.value;
		setPassword(password);
		let c_pw = document.getElementById("c_pw").value;
		const patt = RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i);
		console.log(password)
		if(password== "")
		{
			setErrPassword("Password is required");
			setError(true);
			
		}
		else if(!patt.test(password)){
			setErrPassword("Use 8 or more characters with a mix of letters, numbers & symbols ")
			setError(true);
			
		}
		else if(password !== c_pw){
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
		let pw = document.getElementById("pw").value;
		const confirmPassword = event.target.value;
		setConfirmPassword(confirmPassword);
		// console.log(confirmPassword)
		
		if(confirmPassword !== pw){
			setErrConfPassword("Confirm password don't match with Password! Try again.");	
			setError(true );
		}
		else {
			setErrConfPassword("");
			setError(false);
			
		}
	}

	async function saveUserDetails() {
		if(errFirstName || errLastName || errAddress || errPhoneNum || errPassword || errConfPassword){
			return false;
		}

		let fname = document.getElementById("fname").value;
		let lname = document.getElementById("lname").value;
		let p_num = document.getElementById("p_num").value;
		let address = document
			.getElementById("address")
			.value.replace("'", "''");
		let pw = document.getElementById("pw").value;
		let c_pw = document.getElementById("c_pw").value;
		const isEdited = await editUserData(
			userDetails?.username,
			pw,
			fname,
			lname,
			p_num,
			address
		);
	
		return isEdited;
	}

	const handleEyeClick = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const handleConfirmEyeClick = () => {
		if (confirmPasswordType === "password") {
			setConfirmPasswordType("text");
		} else {
			setConfirmPasswordType("password");
		}
	};

	return (
		<>
			<div className="posts-list">
				<div
					style={{
						width: "80%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="editUser-card">
						<div className="editUser-table">
							<form
								onSubmit={handleProfilePictureSubmit}
								className="editUserImage-form"
							>
								<div
									style={{
										fontWeight: "bolder",
										width: "25%",
									}}
									htmlFor="newPic"
								>
									Edit Profile Picture
								</div>
								<input
									type="file"
									name="newPic"
									accept=".jpg, .jpeg, .png, .svg"
									onChange={(e) => {
										setNewProfilePic(e.target.files[0]);
									}}
								/>
								<button
									type="submit"
									className="app-form-button"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>

				<div
					style={{
						width: "80%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="editUser-card">
						<table className="editUser-table">
							<tbody className="editUser-body">
								<tr className="editUser-row">
									<th className="editUser-row-left">
										First Name:{" "}
									</th>
									<td className="editUser-row-right">
										<input
											defaultValue={
												userDetails?.firstname
											}
											id="fname"
											onChange={(event) => {
												validateFirstName(event);
												
											}}
										/>
									</td>
									
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errFirstName}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">
										Last Name:
									</th>
									<td className="editUser-row-right">
										<input
											defaultValue={userDetails?.lastname}
											id="lname"
											onChange={(event) => {
												validateLastName(event)
											}}
										></input>
									</td>
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errLastName}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">
										Phone Number:
									</th>
									<td className="editUser-row-right">
										<input
											defaultValue={userDetails?.phone}
											id="p_num"
											onChange={(event) => {
												validatePhoneNum(event)
											}}
										></input>
									</td>
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errPhoneNum}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">City:</th>
									<td className="editUser-row-right">
										<input
											defaultValue={userDetails?.address}
											id="address"
											onChange={(event) => {
												validateAddress(event)
											}}
										></input>
									</td>
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errAddress}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">
										Password:
									</th>
									<td className="editUser-row-right">
										<input
											id="pw"
											type={passwordType}
											defaultValue={userDetails?.password}
											onChange={(event) => {
												validatePassword(event)
												
											}}
										></input>
										<i onClick={handleEyeClick}>
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
										</i>
									</td>
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errPassword}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">
										Confirm Password:
									</th>
									<td className="editUser-row-right">
										<input
											id="c_pw"
											type={confirmPasswordType}
											onChange={(event) => {
												validateConfPassword(event)
												
											}}
											defaultValue={userDetails?.password}
										></input>
										<i onClick={handleConfirmEyeClick}>
											{confirmPasswordType ===
											"password" ? (
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
										</i>
									</td>
								</tr>
								<tr className="editUser-row">
									<td className="editUser-row-right">
									<div><label className="errMsgEditUser">{errConfPassword}
										</label></div>
									</td>
								</tr>
								<tr className="editUser-btn-wrap">
									<td
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										{editStatus === "pass" ? (
											<div className="update-badge">
												Details Edited!
											</div>
										) : null}
										{editStatus === "fail" ? (
											<div
												className="update-badge"
												style={{
													borderLeft: "0.5em solid red"
												}}
											>
												Edit Failed!
											</div>
										) : null}
									</td>
									<td>
										<button
											className="app-form-button"
											onClick={async () => {
												const isEdited =
													await saveUserDetails();
												if (isEdited)
													setEditStatus("pass");
												else setEditStatus("fail");
											}}
										>
											save
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
