import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../src/components/constants";
import { INSERT_USER_DATA, DELETE_POST } from "./Types.js";

// Initial state
const initialState = {
	userDetails: {},
	postsDetails: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

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
            const res = fetch(`${BASE_URL}/delete/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
			// dispatch({
			// 	type: DELETE_POST,
			// 	payload: {
			// 		id,
			// 		putUserData
			// 	}
			// })
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
		putUserData(localStorage.getItem("token"));
	}, []);
	
	return (
		<GlobalContext.Provider
			value={{
				userDetails: state.userDetails,
				postsDetails: state.postsDetails,
				putUserData,
				deletePostData
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
