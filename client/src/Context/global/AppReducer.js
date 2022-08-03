import {
	// INSERT_TOKEN,
	INSERT_USER_DATA,
	DELETE_POST,
	INSERT_ALL_DATA,
	UPDATE_POST,
	UPDATE_USER,
	ADD_POST
} from "./Types.js";

const AppReducer = (state, action) => {
	switch (action.type) {
		case INSERT_USER_DATA: {
			return {
				...state,
				userDetails: action?.payload?.userDetails,
				postsDetails: action?.payload?.postsDetails,
			};
		}
		case INSERT_ALL_DATA: {
			return {
				...state,
				allUsers: action?.payload?.allUsers,
				allPosts: action?.payload?.allPosts,
			};
		}
		case DELETE_POST: {
			let allPost = [...state.postsDetails];
			let filteredPosts = allPost.filter(
				(post) => post.postid != action?.payload?.postid
			);
			console.log("filteredPosts", filteredPosts);
			return {
				...state,
				postsDetails: filteredPosts,
			};
		}
		case UPDATE_POST: {
			// Changing the Details in my posts array
			let postsOfUser = [...state.postsDetails];
			let updatedPostsArray = postsOfUser.reduce((acc, cv) => {
				if (action?.payload?.post.postid === cv.postid) {
					acc.push(action.payload.post);
				} else {
					acc.push(cv);
				}
				return acc;
			}, []);

			// Changing the Details in allPosts array
			let allPosts = [...state.allPosts];
			let updatedAllPostsArray = allPosts.reduce((acc, cv) => {
				if (cv.postid === action?.payload?.post.postid) {
					acc.push(action.payload.post);
				} else {
					acc.push(cv);
				}
				return acc;
			}, []);

			return {
				...state,
				allPosts: updatedAllPostsArray,
				postsDetails: updatedPostsArray,
			};
		}
		case UPDATE_USER: {
			// Update Current User Details // except for profile picture
			let updatedUserDetails = action?.payload?.userDetails;
			updatedUserDetails.profilepicture =
				state?.userDetails?.profilepicture;

			// Update Details in allUsers array
			let allUsers = [...state.allUsers];
			let updatedAllUsersArray = allUsers.reduce((acc, cv) => {
				if (cv.username === updatedUserDetails.username) {
					acc.push(updatedUserDetails);
				} else {
					acc.push(cv);
				}
				return acc;
			}, []);

			return {
				...state,
				allUsers: updatedAllUsersArray,
				userDetails: updatedUserDetails,
			};
		}
		case ADD_POST: {
			return {
				...state,
				postsDetails: [...state?.postsDetails, action?.payload?.post],
				allPosts: [...state?.allPosts, action?.payload?.post]
			}
		}
		default:
			return state;
	}
};
export default AppReducer;
