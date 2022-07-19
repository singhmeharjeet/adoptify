import {
	// INSERT_TOKEN,
	INSERT_USER_DETAILS,
	// INSERT_POST_DETAILS,
} from "./Types.js";

const AppReducer = (state, action) => {
	switch (action.type) {
		// case INSERT_TOKEN:
		// 	localStorage.setItem("token", action?.payload?.token);
		// 	return {
		// 		...state,
		// 		token: action?.payload?.token,
		// 	};
		case INSERT_USER_DETAILS:
			console.log(
				"action?.payload?.userDetails,",
				action?.payload?.userDetails
			);
			return {
				...state,
				userDetails: action?.payload?.userDetails,
			};
		// case INSERT_POST_DETAILS:
		// 	console.log(
		// 		"action?.payload?.profileDetails",
		// 		action?.payload?.profileDetails
		// 	);
		// 	return {
		// 		...state,
		// 		profileDetails: action?.payload?.profileDetails,
		// 		userDetails: action?.payload?.userDetails,
		// 	};

		default:
			return state;
	}
};
export default AppReducer;
