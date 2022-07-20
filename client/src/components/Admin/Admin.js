import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import NavBar from "../NavBar/NavBar";
import { useParams, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faPaw, faUsers, faShieldDog} from '@fortawesome/free-solid-svg-icons';
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

    const navigate = useNavigate();

	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};
    const { username } = useParams();

    const [allUsers, setAllUsers] = useState('');
    useEffect(() => {
        async function getAllUsers(){
            let result = "";
            try {
                const responseJSON = await (
                    await fetch(`${BASE_URL}/admin`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                ).json();
                // if response is sucessful
                result = responseJSON; 
            } catch (error) {
                console.log("error", error);
            }
            setAllUsers(result.rows);
        }
        getAllUsers();
    }, [])
    // console.log(allUsers) 
    let Array = [];
    console.log(allUsers);
    for (var i=0; i<2; i++) {
        console.log(allUsers[i]);
        Array.push(allUsers[i]);
    }
    // console.log(Array)
    // var arr = [];
    // for (var i=0; i<2; i++) {
    //     arr.push(allUsers[i].firstname)
    // }

    //it runs like we expect on the first initial run but if we refresh, we get errors like 
    //'cannot read properties of undefined 
    return(
        <>
        {/* 
        <div>
            {Array.map(user => <h1>{user.firstname}</h1>)} 
        </div>
        */}
       <NavBar handleLogout={handleLogout} username={username}/>
       <div className = "container">
            <div className = "admin-container">
                <div className = "menu-container">
                    <p className = "admin-greeting">Hi, Admin!</p>
                    {/* 
                        // add in links for users and posts
                    */}

                    <div className = "admin-links">
                        <a href = "#"> <FontAwesomeIcon className = "profile-icon" icon = {faUser}></FontAwesomeIcon> &nbsp; List of Users</a>
                        <br/>
                        <a href = "#"> <FontAwesomeIcon className = "profile-icon" icon = {faPaw}></FontAwesomeIcon> &nbsp; List of Posts</a>
                    </div>
                    <div className = "site-info">
                        <div className = "site-info-header-container">
                            <p className = "site-info-header"><span className = "header-bg">Site Info</span></p>
                            {/* <p className = "site-info-subheader">Stay Updated!</p> */}

                            <p className = "site-info-users-header">Total Number of Users</p>
                            <p><FontAwesomeIcon className = "site-info-users-icon" icon = {faUsers}></FontAwesomeIcon><span className = "num-users">1000</span></p>

                            <p className = "site-info-posts-header">Total Number of Posts</p>
                            <p><FontAwesomeIcon className = "site-info-posts-icon" icon = {faShieldDog}></FontAwesomeIcon><span className = "num-posts">1000</span></p>
                            
                        </div>
                    </div>


                </div>
                <div className = "users-container">
                    {/* 
                        // add in users table heading
                        // add in users
                    */}
                    <p className = "admin-greeting">List of Users</p>
                    <div className = "table-container">
                        <table className="users-table">
                            <thead className = "table-header">
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>Password123</td>
                                    <td>Harry Potter</td>
                                    <td>778-123-4567</td>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>1604 Brentwood Drive Madison Avenue, Burnaby</td>
                                    <td><input type="button" className = "delete-button" value="Delete"/></td>
                                </tr>
                                <tr>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>Password123</td>
                                    <td>Harry Potter</td>
                                    <td>778-123-4567</td>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>1604 Brentwood Drive Madison Avenue, Burnaby</td>
                                    <td><input type="button" className = "delete-button" value="Delete"/></td>
                                </tr>
                                <tr>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>Password123</td>
                                    <td>Harry Potter</td>
                                    <td>778-123-4567</td>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>1604 Brentwood Drive Madison Avenue, Burnaby</td>
                                    <td><input type="button" className = "delete-button" value="Delete"/></td>
                                </tr>
                                <tr>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>Password123</td>
                                    <td>Harry Potter</td>
                                    <td>778-123-4567</td>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>1604 Brentwood Drive Madison Avenue, Burnaby</td>
                                    <td><input type="button" className = "delete-button" value="Delete"/></td>
                                </tr>
                                <tr>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>Password123</td>
                                    <td>Harry Potter</td>
                                    <td>778-123-4567</td>
                                    <td>harry.potter123@gmail.com</td>
                                    <td>1604 Brentwood Drive Madison Avenue, Burnaby</td>
                                    <td><input type="button" className = "delete-button" value="Delete"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}