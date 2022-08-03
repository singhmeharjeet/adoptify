import React from "react";
import "./EditUser.css";
import { useGlobalData } from "../../Context/global/GlobalContext"
export default function EditUser() {
    const { editUserData, userDetails } = useGlobalData();
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

        editUserData(userDetails?.username, pw, fname, lname, p_num, address);
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
									defaultValue={userDetails?.firstname}
									id="fname"
								/>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Last Name:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userDetails?.lastname}
									id="lname"
								></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Phone Number:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userDetails?.phone}
									id="p_num"
								></input>
							</td>
						</tr>
						<tr className="editUser-row">
							<th className="editUser-row-left">Address:</th>
							<td className="editUser-row-right">
								<input
									defaultValue={userDetails?.address}
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
