import {
	// INSERT_TOKEN,
	INSERT_USER_DATA,
	INSERT_ALL_DATA,
	// INSERT_POST_DETAILS,
} from "./Types.js";

const AppReducer = (state, action) => {
	switch (action.type) {
		case INSERT_USER_DATA:
			return {
				...state,
				userDetails: action?.payload?.userDetails,
				postsDetails: action?.payload?.postsDetails,
			}; 
		case INSERT_ALL_DATA:
			return {
				...state,
				allUsers: action?.payload?.allUsers,
				allPosts: action?.payload?.allPosts
			}
		default:
			return state;
	}
};
export default AppReducer;
