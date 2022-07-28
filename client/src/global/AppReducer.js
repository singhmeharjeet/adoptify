import {
	// INSERT_TOKEN,
	INSERT_USER_DATA,
	DELETE_POST,
	INSERT_ALL_DATA,
	UPDATE_POST,
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
			console.log('type of allPost', typeof allPost[0].postid);
			console.log('type of action?.payload?.postid', typeof action?.payload?.postid);
			console.log('allPost', allPost)
			let filteredPosts = allPost.filter(
				(post) => post.postid != action?.payload?.postid
			);
			console.log('filteredPosts', filteredPosts)
			return {
				...state,
				postsDetails: filteredPosts,
			};
		}
		case UPDATE_POST: {
			let allPost = [...state.postsDetails];
			let updatedPostsArray = allPost.reduce((acc, cv) => {
				if (action?.payload?.post.postid === cv.postid) {
					acc.push(action.payload.post)
				}
				else {
					acc.push(cv);
				}
				return acc;
			}, []);
			
			return {
				...state,
				postsDetails: updatedPostsArray,
			};
		}
		default:
			return state;
	}
};
export default AppReducer;
