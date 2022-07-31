import React, { createContext, useReducer, useEffect, useContext } from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../components/constants";
import { INSERT_USER_DATA, INSERT_ALL_DATA, DELETE_POST, UPDATE_POST } from "./Types.js";


// Initial state
const initialState = {
	allUsers: [],
	allPosts: [],
	userDetails: {},
	postsDetails: [],
};

// Create context
const GlobalContext = createContext(initialState);

export function useGlobalData() {
	return useContext(GlobalContext);
}

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
			})
				.then((r) => r.json())
				.then((data) => {
					if (data.status) {	
						dispatch({ 
							type: DELETE_POST,
							payload: {
								postid: id,
							}
						})
					}
				});
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
	function getUserDetailsFromUsername(username) {
		return state.allUsers.find((user) => user.username === username)
	}
	async function editUserPost(id, name, species, des) {
		try {
			const responseJSON = await (
				await fetch(`${BASE_URL}/editPost`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id, name, species, des
					}),
				})
			).json();
			if (responseJSON.status) {
				dispatch({
					type: UPDATE_POST,
					payload: {
						post: responseJSON?.data
					},
				});
			}
			console.log('responseJSON', responseJSON);
		} catch (error) {
			console.log("error", error);
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
				editUserPost,
				getUserDetailsFromUsername
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
