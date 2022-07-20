import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../src/components/constants";
import { INSERT_USER_DATA } from "./Types.js";

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
	useEffect(() => {
		putUserData(localStorage.getItem("token"));
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				userDetails: state.userDetails,
				postsDetails: state.postsDetails,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
