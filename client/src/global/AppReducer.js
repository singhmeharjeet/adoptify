import {
	// INSERT_TOKEN,
	INSERT_USER_DATA,
	// INSERT_POST_DETAILS,
} from "./Types.js";

const AppReducer = (state, action) => {
	switch (action.type) {
		case INSERT_USER_DATA:
			return {
				userDetails: action?.payload?.userDetails,
				postsDetails: action?.payload?.postsDetails,
			};
		default:
			return state;
	}
};
export default AppReducer;
