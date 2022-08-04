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

	useEffect(() => {
		setTimeout(() => setEditStatus(""), 4000);
	}, [editStatus]);
	
	async function saveUserDetails() {
		let pw = document.getElementById("pw").value;
		let c_pw = document.getElementById("c_pw").value;

		if (pw !== c_pw) {
			window.alert("password and cofirmed password are not the same");
			return;
		}

		var patt = RegExp(/^[A-Za-z0-9]{3,16}$/i);
		let fname = document.getElementById("fname").value;
		if (!patt.test(fname)) {
			window.alert("invalid firstname input\n3-16 letters required");
			return;
		}

		patt = RegExp(/^[A-Za-z0-9]{2,16}$/i);
		let lname = document.getElementById("lname").value;
		if (!patt.test(lname)) {
			window.alert("invalid lastname input\n2-16 letters required");
			return;
		}

		patt = RegExp(/^\d{3}\d{3}\d{4}$/i);
		let p_num = document.getElementById("p_num").value;
		if (!patt.test(p_num)) {
			window.alert(
				"invalid phone number input\n10 digit input is required"
			);
			return;
		}

		patt = RegExp(
			/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/i
		);
		if (!patt.test(pw)) {
			window.alert(
				"invalid password input\nUse 8 or more characters with a mix of letters, numbers & symbols"
			);
			return;
		}

		let address = document
			.getElementById("address")
			.value.replace("'", "''");

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
										/>
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
										></input>
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
										></input>
									</td>
								</tr>
								<tr className="editUser-row">
									<th className="editUser-row-left">City:</th>
									<td className="editUser-row-right">
										<input
											defaultValue={userDetails?.address}
											id="address"
										></input>
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
									<th className="editUser-row-left">
										Confirm Password:
									</th>
									<td className="editUser-row-right">
										<input
											id="c_pw"
											type={confirmPasswordType}
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
