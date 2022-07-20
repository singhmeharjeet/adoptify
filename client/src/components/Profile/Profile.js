import React, { useContext } from "react";
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

	const { userDetails, postsDetails, deletePostData } =
		useContext(GlobalContext);
	console.log("postdetails: ", postsDetails);
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
	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};

	const onSubmit = async (e) => {
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
						<br />
						<br />
						<div className="profile-picture-container">
							<img
								className="profile-picture"
								src="/sample-pic.jpg"
							/>
						</div>
						<br />
						<br />
						<br />
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
							<form method="post" className="posts-form">
								{postsDetails.map((postInfo) => (
									<div
										className="posts"
										key={postInfo?.postid}
									>
										<div className="posts-image-container">
											<img
												className="posts-picture"
												src={postInfo.images[0]}
											/>
										</div>
										<div className="posts-contents">
											<div className="post-content-upper">
												<div className="post-title">
													<p className="pet-name">
														{postInfo?.pet_name}
													</p>
													<p className="pet-species">
														{postInfo?.pet_species}
													</p>
												</div>
												<div className="post-buttons">
													<input
														type="button"
														className="post-edit-button"
														value="EDIT"
													></input>
													<button
														className="post-delete-button"
														value={postInfo?.postid}
														onClick={onSubmit}
													>
														DELETE
													</button>
												</div>
											</div>
											<hr className="posts-separator"></hr>
											<p className="pet-description">
												{postInfo?.description}
											</p>
										</div>
									</div>
								))}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
