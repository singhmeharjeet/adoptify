import React, {
	createContext,
	useReducer,
	useEffect,
	useContext,
	useState,
} from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../components/constants";
import {
	INSERT_USER_DATA,
	INSERT_ALL_DATA,
	DELETE_POST,
	UPDATE_POST,
	UPDATE_USER,
} from "./Types.js";
import axios from "axios";

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
	const [changeCounter, setChangeCounter] = useState(0);

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
							},
						});
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
		setChangeCounter((prev) => prev + 1);
	}
	async function editUserData(
		username,
		password,
		firstname,
		lastname,
		phone,
		address
	) {
		try {
			const responseJSON = await (
				await fetch(`${BASE_URL}/editUser`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						password,
						firstname,
						lastname,
						phone,
						address,
					}),
				})
			).json();
			if (responseJSON.status) {
				dispatch({
					type: UPDATE_USER,
					payload: {
						userDetails: responseJSON?.data,
					},
				});
			}
			console.log("responseJSON", responseJSON);
		} catch (error) {
			console.log("error", error);
		}
		setChangeCounter((prev) => prev + 1);
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
		setChangeCounter((prev) => prev + 1);
	}
	function getUserDetailsFromUsername(username) {
		return state.allUsers.find((user) => user.username === username);
	}
	const editUserPost = async (id, name, species, color, des) => {
		try {
			const responseJSON = await (
				await fetch(`${BASE_URL}/editPost`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id,
						name,
						species,
						color,
						des
					}),
				})
			).json();
			if (responseJSON.status) {
				dispatch({
					type: UPDATE_POST,
					payload: {
						post: responseJSON?.data,
					},
				});
			}
			console.log("responseJSON", responseJSON);
		} catch (error) {
			console.log("error", error);
		}
		setChangeCounter((prev) => prev + 1);
	};

	async function editUserPostWithImage(
		username,
		id,
		name,
		species,
		des,
		imageFile
	) {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("id", id);
		formData.append("name", name);
		formData.append("species", species);
		formData.append("des", des);
		formData.append("imageFile", imageFile);

		try {
			const responseJSON = await axios.post(
				`${BASE_URL}/editPostPicture`,
				formData
			);
			if (responseJSON.status) {
				console.log("responseJSON?.data", responseJSON?.data);
				dispatch({
					type: UPDATE_POST,
					payload: {
						post: responseJSON?.data,
					},
				});
			}
		} catch (err) {
			if (err.response.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err.response.data.msg);
			}
		}
		for (let i = 0; i < state.postsDetails.length; i++) {
			if (state.postsDetails[i].postid === id) {
				return state.postsDetails[i];
			}
		}
		return null;
	}

	useEffect(() => {
		putAllData();
		putUserData(localStorage.getItem("token"));
	}, [changeCounter]);

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
				editUserPostWithImage,
				editUserData,
				getUserDetailsFromUsername,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
