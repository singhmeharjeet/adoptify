import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import Post from "./Post";
import EditPost from "./EditPost";
import Info from "./Info.js";
import images from "../../images.json";
import axios from "axios";
import { BASE_URL } from "../constants";
import "./Profile.css";
import EditUser from "./EditUser";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ clearPermission }) => {
	const navigate = useNavigate();

	const {
		userDetails,
		postsDetails,
		deletePostData,
		editUserPost,
		editProfileImage,
	} = useGlobalData();
	const [postState, setPostState] = useState(-1);
	const [newProfilePic, setNewProfilePic] = useState();
	const [isPicClicked, setIsPicClicked] = useState(false);
	const [editUser, setEditUser] = useState(true);

	// -1 as a post id means that it is not editing
	function isPostEditing(pid) {
		if (pid === postState) {
			return true;
		}
		return false;
	}

	async function savePost(e) {
		e.preventDefault();

		// postState has the current id, do not change until the end
		const infoInput = document
			.getElementById(postState)
			.getElementsByTagName("input");
		console.log("infoInput", infoInput);
		let post_name = infoInput[1].value;
		let post_species = infoInput[2].value;
		let post_color = infoInput[3].value;

		const infoTextArea = document
			.getElementById(postState)
			.getElementsByTagName("textarea");

		let post_description = infoTextArea[0].value;

		// postState = postid;
		editUserPost(
			postState,
			post_name,
			post_species,
			post_color,
			post_description
		);

		setPostState(-1);
	}

	async function handleProfilePictureSubmit(e) {
		e.preventDefault();
		editProfileImage(userDetails.username, newProfilePic);
	}

	function handleLogout() {
		clearPermission();
		navigate("/login");
	}

	async function onDelete(e) {
		e.preventDefault();
		const postId = e.currentTarget.value;
		deletePostData(postId);
	}

	function editPost(pid) {
		setPostState(pid);
	}

	async function cancelEdit(e) {
		editPost(-1);
	}

	function profilePictureExists(imgURL) {
		if (imgURL) return imgURL.includes("adoptify");
		else return false;
	}

	function handlePicClick() {
		//should maybe pop up modal and show a choose new image screen
		setIsPicClicked(!isPicClicked);
		console.log("pic button clicked");
	}

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
							{profilePictureExists(
								userDetails.profilepicture
							) ? (
								<img
									alt="profile"
									className="profile-picture"
									src={userDetails?.profilepicture}
								/>
							) : (
								<img
									alt="profile placeholder"
									className="profile-picture"
									src={images["profile-placeholder"]}
								/>
							)}
							<i onClick={handlePicClick}>
								<FontAwesomeIcon
									id="editPicIcon"
									icon={faImagePortrait}
								/>
							</i>
							<>
								{isPicClicked ? (
									<form onSubmit={handleProfilePictureSubmit}>
										<input
											type="file"
											name="newPic"
											accept=".jpg, .jpeg, .png, .svg"
											onChange={(e) => {
												setNewProfilePic(
													e.target.files[0]
												);
											}}
										/>
										<button
											type="submit"
											className="app-form-button"
										>
											Submit
										</button>
									</form>
								) : (
									""
								)}
							</>
						</div>
						<div className="profile-info-container">
							<Info userDetails={userDetails} />
						</div>
						<button onClick={() => setEditUser(!editUser)}>
							{" "}
							{editUser ? "My Posts" : "User Details"}
						</button>
					</div>
				</div>
				<div className="posts-container">
					{editUser ? (
						<>
							<p className="posts-label">Edit Profile</p>
							<div className="posts-list-wrapper">
								<div className="posts-list">
									<div
										style={{
											width: "80%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<EditUser />
									</div>
								</div>
							</div>
						</>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default Profile;
