import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { BASE_URL } from "../../src/components/constants";
import {
	// INSERT_TOKEN,
	INSERT_USER_DETAILS,
	// INSERT_POST_DETAILS,
} from "./Types.js";
// Initial state
const initialState = {
	userDetails: {},
	postDetails: [],
};

// 1. call an action
// 2. then call a dispatch fuction inside action
// 3. dispatch type goes inside AppReducer
// 4. AppReducer will identify the action type and make changes at the global level

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
	// function clearAuth() {
	// 	dispatch({
	// 		type: CLEAR_TOKEN,
	// 	});
	// }

	// function storeAuth(token) {
	// 	dispatch({
	// 		type: INSERT_TOKEN,
	// 		payload: { token },
	// 	});
	// }

	function putUserDetails(username) {
		fetch(`${BASE_URL}/profile/${username}`)
			.then((r) => r.json())
			.then((data) => {
				console.log("data.rows[0]", data.rows[0]);
				dispatch({
					type: INSERT_USER_DETAILS,
					payload: { userDetails: data.rows[0] },
				});
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	// function putPostDetails(username) {
	//   fetch(`${BASE_URL}/profile/${username}`)
	//       .then((r)=> r.json())
	//       .then((data)=> {
	//           dispatch({
	//             type: INSERT_USER_POST_DETAILS,
	//             payload: { userDetails: data.rows[0] },
	//           });
	//       })
	//       .catch((error)=> {
	//           console.log("error", error);
	//       })
	// }
	useEffect(() => {
		putUserDetails(localStorage.getItem("token"));
	}, []);
	return (
		<GlobalContext.Provider
			value={{
				userDetails: state.userDetails,
				putUserDetails,
				// postDetails: state.postDetails,
				// token: state.token,
				// clearAuth,
				// storeAuth,
				// putProfileDetails,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
