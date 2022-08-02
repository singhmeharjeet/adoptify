import React from "react";
import "./EditUser.css";

export default function EditUser({ userData, setUserData }) {
	const saveUserDetails = () => {
		let pw = document.getElementById("pw").value;
		let c_pw = document.getElementById("c_pw").value;

		if (pw !== c_pw) {
			window.alert("password and cofirmed password are not the same");
			return;
		}
		let fname = document.getElementById("fname").value;
		let lname = document.getElementById("lname").value;
		let p_num = document.getElementById("p_num").value;
		let address = document.getElementById("address").value;
	};

	return (
		<>
			<div className="editUser-card">
				<table className="editUser-table">
					<tbody className="editUser-body">
						<tr className="editUser-row">
							<th className="editUser-row-left">First Name: </th>
							<td className="editUser-row-right">
								<input
									defaultValue={userData?.firstname}
									id="fname"
								/>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Last Name:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userData?.lastname}
									id="lname"
								></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Phone Number:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userData?.phone}
									id="p_num"
								></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Address:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userData?.address}
									id="address"
								></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Password:</th>
							<td className="editUser-row-right">
								<input id="pw"></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">
								Confirm Password:
							</th>
							<td className="editUser-row-right">
								<input id="c_pw"></input>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="editUser-btn-wrap">
					<button
						className="app-form-button"
						onClick={() => saveUserDetails()}
					>
						save
					</button>
				</div>
			</div>
		</>
	);
}
