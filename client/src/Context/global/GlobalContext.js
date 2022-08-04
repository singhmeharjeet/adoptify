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
	ADD_POST,
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
				console.log("The number of posts is: ", data?.allPosts?.length);
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
			else {
				setChangeCounter((prev) => prev + 1);
				return true;
			}
		} catch (error) {
			console.log("error", error);
			return false;
		}
		setChangeCounter((prev) => prev + 1);
		return true;
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
	async function addPost(username, name, species, color, des, petImage) {
		if (!name || !species || !color || !petImage || !petImage || !des) {
			alert("Please Enter all the values and try again.");
			return;
		}

		const formData = new FormData();
		formData.append("username", username.replace("'", "''"));
		formData.append("petName", name.replace("'", "''"));
		formData.append("petSpecies", species.replace("'", "''"));
		formData.append("petColor", color.replace("'", "''"));
		formData.append("petDescription", des.replace("'", "''"));
		formData.append("petImage", petImage);

		try {
			const responseJSON = await (
				await axios.post(`${BASE_URL}/addPost`, formData)
			).json();

			if (responseJSON.status) {
				dispatch({
					type: ADD_POST,
					payload: {
						post: responseJSON?.data,
					},
				});
			} else {
				return false;
			}
			setChangeCounter((prev) => prev + 1);
		} catch (err) {
			setChangeCounter((prev) => prev + 1);
			if (err?.response?.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err?.response?.data?.msg);
				return false;
			}
		}
		setChangeCounter((prev) => prev + 1);
		return true;
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
						des,
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

	async function editPostImage(pic, username, postid) {
		if (pic !== null) {
			const formData = new FormData();
			formData.append("newPostPic", pic);
			formData.append("username", username);
			formData.append("postid", postid);

			try {
				await axios.post(`${BASE_URL}/editPostImage`, formData);
			} catch (err) {
				if (err.response.status === 500) {
					console.log("There was a problem with the server");
				} else {
					console.log(err.response.data.msg);
				}
			}
		}
		setChangeCounter((prev) => prev + 1);
	}

	async function editProfileImage(username, imageFile) {
		const formData = new FormData();
		formData.append("newProfilePic", imageFile);
		formData.append("username", username);

		try {
			const responseJSON = await (
				await axios.post(`${BASE_URL}/editProfilePic`, formData)
			).json();
			if (responseJSON.status) {
				dispatch({
					type: UPDATE_POST,
					payload: {
						post: responseJSON?.data,
					},
				});
			}
		} catch (err) {
			if (err?.response?.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err?.response);
			}
		}
		setChangeCounter((prev) => prev + 1);
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
				editProfileImage,
				editPostImage,
				editUserData,
				getUserDetailsFromUsername,
				addPost,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
