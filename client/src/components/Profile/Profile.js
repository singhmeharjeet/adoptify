import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import Post from "./Post";
import EditPost from "./EditPost";
import Info from "./Info.js";
import images from "../../images.json";
import "./Profile.css";
import EditUser from "./EditUser";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Admin/Admin.css'
import {
	faUser,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ clearPermission }) => {
	const navigate = useNavigate();
	const {
		userDetails,
		postsDetails,
		deletePostData,
		editUserPost,
		editProfileImage,
	} = useGlobalData();
	const [allOfMyPosts, setAllOfMyPosts] = useState(postsDetails);
	const [postState, setPostState] = useState(-1);
	const [newProfilePic, setNewProfilePic] = useState();
	const [editUser, setEditUser] = useState(false);

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
		let post_name = infoInput[1].value.replace("'", "''");
		let post_species = infoInput[2].value.replace("'", "''");
		let post_color = infoInput[3].value.replace("'", "''");

		const infoTextArea = document
			.getElementById(postState)
			.getElementsByTagName("textarea");

		let post_description = infoTextArea[0].value.replace("'", "''");

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

	async function onDelete(e, postInfo) {
		e.preventDefault();

		const postId = postInfo?.postid;
		console.log('postId', postId);
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

	useEffect(() => {
		setAllOfMyPosts(postsDetails);
	},[postsDetails.length])
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
						</div>
						<div className="profile-info-container">
							<Info userDetails={userDetails} />
						</div>

						<div className="link-wrap">
							<div className="profile-links">
								<div onClick={() => setEditUser(false)}>
									<FontAwesomeIcon
										className="profile-icon"
										icon={faPaw}
									></FontAwesomeIcon>
									<div>My Posts</div>
								</div>
								<div onClick={() => setEditUser(true)}>
									<FontAwesomeIcon
										className="profile-icon"
										icon={faUser}
									></FontAwesomeIcon>
									<div>Edit Profile</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="posts-container">
					{editUser ? (
						<>
							<p className="posts-label">Edit Profile</p>
							<div className="posts-list-wrapper">
								<EditUser
									setNewProfilePic={setNewProfilePic}
									handleProfilePictureSubmit={
										handleProfilePictureSubmit
									}
								/>
							</div>
						</>
					) : (
						<>
							<p className="posts-label">My Posts</p>
							{/* start of posts */}
							<div className="posts-list-wrapper">
								<div className="posts-list">
									{allOfMyPosts.map((postInfo) => (
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
