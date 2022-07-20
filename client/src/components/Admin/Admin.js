import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import NavBar from "../NavBar/NavBar";
import { useParams, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faPaw, faChild, faDog, faUsers, faShieldDog} from '@fortawesome/free-solid-svg-icons';
import "./Admin.css";

// BUGGED NOT WORKING RN, WILL FIX LATER
// admin page should show all the users in the database, delete certain users
export default function Admin({ clearPermission }) {
	// const [allUsers, setAllUsers] = useState("");
	// async function getAllUsers() {
	// 	let result = "";
	// 	try {
	// 		const responseJSON = await (
	// 			await fetch(`${BASE_URL}/admin`, {
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			})
	// 		).json();
	// 		// if response is sucessful
	// 		result = responseJSON;
	// 	} catch (error) {
	// 		console.log("error", error);
	// 	}
	// 	return result.rows;
	// }
	//work on adding permission check

	// setAllUsers(getAllUsers());
	// console.log("allUsers: ", allUsers);
	// console.log(Array)
	// var arr = [];
	// for (var i=0; i<2; i++) {
	//     arr.push(allUsers[i].firstname)
	// }

	//it runs like we expect on the first initial run but if we refresh, we get errors like
	//'cannot read properties of undefined
	return (
		<>
			<h1>Admin Page</h1>
			<div>
				{allUsers.map((user) => (
					<h1>{user.firstname}</h1>
				))}{" "}
			</div>
		</>
	);
}
