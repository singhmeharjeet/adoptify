import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import Post from "./Post";
import EditPost from "./EditPost";
import Info from "./Info.js";
import "./Profile.css";

import { GlobalContext } from "../../global/GlobalContext";

const Profile = ({ clearPermission }) => {
	const navigate = useNavigate();

	const { userDetails, postsDetails, deletePostData, editUserPost } =
		useContext(GlobalContext);
	const [postState, setPostState] = useState(-1);

	// -1 as a post id means that it is not editing
	const isPostEditing = (pid) => {
		if (pid === postState) {
			return true;
		}
		return false;
	};

	const editPost = (pid) => {
		setPostState(pid);
	};

	const savePost = async (e) => {
		e.preventDefault();

		// postState has the current id, do not change until the end
		const infoInput = document
			.getElementById(postState)
			.getElementsByTagName("input");
		console.log("infoInput", infoInput);
		let post_name = infoInput[0].value;
		let post_species = infoInput[1].value;

		const infoTextArea = document
			.getElementById(postState)
			.getElementsByTagName("textarea");

		let post_description = infoTextArea[0].value;

		editUserPost(postState, post_name, post_species, post_description);
		setPostState(-1);
	};

	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};

	const onDelete = async (e) => {
		e.preventDefault();
		const postId = e.currentTarget.value;
		deletePostData(postId);
	};

	const cancelEdit = async (e) => {
		editPost(-1);
	};
	return (
		<>
			<NavBar
				handleLogout={handleLogout}
				username={userDetails.username}
			/>
			<div className="container">
				<div className="profile-container">
					<div className="profile-contents">
						<p className="profile-greeting">
							Hi{" "}
							{userDetails.firstname ? userDetails.firstname : ""}{" "}
							{userDetails.lastname ? userDetails.lastname : ""}!
						</p>
						<div className="profile-picture-container">
							<img
								className="profile-picture"
								src="/sample-pic.jpg"
							/>
						</div>
						<div className="profile-info-container">
							<Info userDetails={userDetails} />
						</div>
					</div>
				</div>
				<div className="posts-container">
					<p className="posts-label">My Posts</p>
					{/* start of posts */}
					<div className="posts-list-wrapper">
						<div className="posts-list">
							{postsDetails.map((postInfo) => (
								<div
									key={postInfo?.postid}
									id={postInfo?.postid}
									style={{
										width: "80%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{isPostEditing(postInfo?.postid) ? (
										<EditPost
											postInfo={postInfo}
											savePost={savePost}
											onDelete={onDelete}
											cancelEdit={cancelEdit}
										/>
									) : (
										<Post
											postInfo={postInfo}
											editPost={editPost}
											onDelete={onDelete}
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
