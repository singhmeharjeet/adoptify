import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../src/components/constants";
import { INSERT_USER_DATA, INSERT_ALL_DATA } from "./Types.js";
import axios from "axios"

// Initial state
const initialState = {
	allUsers: [],
	allPosts: [],
	userDetails: {},
	postsDetails: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function putAllData() {
		fetch(`${BASE_URL}/allData`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((r) => r.json())
			.then((data) => {
				dispatch({
					type: INSERT_ALL_DATA,
					payload: {
						allUsers: data.allUsers,
						allPosts: data.allPosts,
					},
				});
				console.log("The number of users is: ", data?.allUsers?.length);
			})
			.catch((error) => {
				console.log("error", error);
			});
	}
	function putUserData(username) {
		fetch(`${BASE_URL}/profile/${username}`)
			.then((r) => r.json())
			.then((data) => {
				dispatch({
					type: INSERT_USER_DATA,
					payload: {
						userDetails: data.userDetails,
						postsDetails: data.postsDetails,
					},
				});
				
			})
			.catch((error) => {
				console.log("error", error);
			});
	}
	function deletePostData(id) {
		try {
			fetch(`${BASE_URL}/delete/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			putUserData(localStorage.getItem("token"));
		} catch (err) {
			if (err) {
				console.log("There was a problem with the server");
			} else {
				console.log("success");
				putUserData(localStorage.getItem("token"));
			}
		}
	}
	function deleteUserData(username) {
		try {
			console.log("The username in DeleteUsereData is: ", username);
			fetch(`${BASE_URL}/deleteUser/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			putAllData();
		} catch (err) {
			if (err) {
				console.log("There was a problem with the server");
			} else {
				console.log("User Deleted Successfully");
			}
		}
	}
	async function editUserPost(id, name, species, des) {
		try {
			let formData = new FormData();
			formData.append("id", id);
			formData.append("name", name);
			formData.append("species", species);
			formData.append("des", des);
			await axios.post(`${BASE_URL}/editPost`, formData);
			putUserData(localStorage.getItem("token"));
		} catch (err) {
			if (err) {
				console.log("There was a problem with the server");
			} else {
				console.log("success");
				putUserData(localStorage.getItem("token"));
			}
		}
	}
	useEffect(() => {
		putAllData();
		putUserData(localStorage.getItem("token"));
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				allUsers: state.allUsers,
				allPosts: state.allPosts,
				userDetails: state.userDetails,
				postsDetails: state.postsDetails,
				putUserData,
				deleteUserData,
				deletePostData,
				editUserPost
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
