import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";

import { GlobalContext } from "../../global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faMobileScreen,
	faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({ clearPermission }) => {
	const navigate = useNavigate();

	const { userDetails, postsDetails, deletePostData, editUserPost } =
		useContext(GlobalContext);
	const [postState, setPostState] = useState(-1);
	/*
		Stucture of myData and myPostsData is as follows:
	
		userDetails = { 
			username: "harry.potter123@gmail.com", 
			password: "password123",
			firstname: "Harry", 
			lastname: "Potter", 
			phone: "778-023-1234", 
			email: "harry.potter123@gmail.com", 
			address: "Washington Street", 
			profilepicture: "imageProfileURL", 
			isadmin: "false" 
		}
		postsDetails = [
			{ 
				postid: "1",	
				pet_name; "oreo",	
				pet_species: "dog",	
				pet_color: "black",	
				images: ["imgLink1", "imgLink2", "imgLink3", ...],
				description: "He is a big dog" ,
				fk_username: "harry.potter123@gmail.com", 
			},
			{ 
				...
			}
		]
	*/
	// -1 as a post id means that it is not editing
	const isPostEditing = (pid) => {
		if(pid === postState){
			return true;
		}
		return false;
	}
	
	const editPost = (pid) => {
		setPostState(pid);
	}; 

	const savePost = async (e) => {
		e.preventDefault();
		// postState has the current id, do not change until the end
		const info = document.getElementById(postState).getElementsByTagName('input')
		let post_name = info[0].value;
		let post_species = info[1].value;
		let post_description = info[2].value;
		// console.log(post_name + "\n" + post_species + "\n" + post_description);

		editUserPost(postState, post_name, post_species, post_description);
		// do query stuff here
		
		setTimeout(() => window.location.reload(), 500);
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
							Hi,{" "}
							{userDetails?.firstname +
								" " +
								userDetails?.lastname}
							!
						</p>
						<div className="profile-picture-container">
							<img
								className="profile-picture"
								src="/sample-pic.jpg"
							/>
						</div>
						<div className="profile-info-container">
							<div className="info-section">
								<p className="profile-text">
									{" "}
									<FontAwesomeIcon
										className="profile-icon"
										icon={faUser}
									></FontAwesomeIcon>{" "}
									&nbsp; &nbsp; &nbsp; &nbsp;
									{userDetails.firstname}{" "}
									{userDetails.lastname}
								</p>
							</div>
							<div className="info-section">
								<p className="profile-text">
									{" "}
									<FontAwesomeIcon
										className="profile-icon"
										icon={faEnvelope}
									></FontAwesomeIcon>{" "}
									&nbsp; &nbsp; &nbsp; &nbsp;
									{userDetails.email}
								</p>
							</div>
							<div className="info-section">
								<p className="profile-text">
									{" "}
									<FontAwesomeIcon
										className="profile-icon"
										icon={faMobileScreen}
									></FontAwesomeIcon>{" "}
									&nbsp; &nbsp; &nbsp; &nbsp;
									{userDetails.phone}
								</p>
							</div>
							<div className="info-section">
								<p className="profile-text">
									{" "}
									<FontAwesomeIcon
										className="profile-icon"
										icon={faMapLocationDot}
									></FontAwesomeIcon>{" "}
									&nbsp; &nbsp; &nbsp; &nbsp;
									{userDetails.address}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="posts-container">
					<p className="posts-label">My Posts:</p>
					{/* start of posts */}
					<div className="posts-list">
						<div>
							{postsDetails.map((postInfo) => (
								<div key={postInfo?.postid} id={postInfo?.postid}>
								{isPostEditing(postInfo?.postid) ?
									<div className="posts">
									<div className="posts-image-container">
										<img
											className="posts-picture"
											src={postInfo.images[0]}
										/>
									</div>
									<div className="posts-contents">
										<br />
										<div className="post-buttons">
											<button onClick={savePost}
											>SAVE</button>
											
											<button
												className="delete-button"
												value={postInfo?.postid}
												onClick={onDelete}
											>DELETE</button>
										</div>
										<input className="pet-name" defaultValue={postInfo?.pet_name}/>
										<input className="pet-species" defaultValue={postInfo?.pet_species}/>
										<hr
											style={{
												width: "90%",
												color: "#bbb",
												"marginbottom": "1em",
											}}
										></hr>
										<input className="pet-description" defaultValue={postInfo?.description}/>
									</div>
								</div>
									
									: 

								<div className="posts" key={postInfo?.postid}>
									<div className="posts-image-container">
										<img
											className="posts-picture"
											src={postInfo.images[0]}
										/>
									</div>
									<div className="posts-contents">
										<br />
										<div className="post-buttons">
											<button onClick={() => editPost(postInfo?.postid)}
											>EDIT</button>
											<button
												className="delete-button"
												value={postInfo?.postid}
												onClick={onDelete}
											>DELETE</button>
										</div>
										<p className="pet-name">
											{postInfo?.pet_name}
										</p>
										<p className="pet-species">
											{postInfo?.pet_species}
										</p>
										<hr
											style={{
												width: "90%",
												color: "#bbb",
												"marginbottom": "1em",
											}}
										></hr>
										<p className="pet-description">
											{postInfo?.description}
										</p>
									</div>
								</div>
								}
								</div>
								))}
							<br />
							<br />
							<br />
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
