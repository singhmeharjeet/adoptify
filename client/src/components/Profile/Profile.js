import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
// import { BASE_URL } from "../constants";
import NavBar from "../NavBar/NavBar";
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

	const { userDetails, postsDetails } = useContext(GlobalContext);

	/*
		Stucture of myData and myPostsData is as follows:
	
		myData = { 
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
		myPostsData = [
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
							Hi, {userDetails?.firstname + " " + userDetails?.lastname}!
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
					<br />
					<br />
					{/* start of posts */}
					<div className="posts-list">
						<div>
							<form method="post">
								{postsDetails.map((postInfo) => (
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
												<input
													type="button"
													className="edit-button"
													value="EDIT"
												></input>
												&nbsp; &nbsp;
												<input
													type="button"
													className="delete-button"
													value="DELETE"
												></input>
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
													"margin-bottom": "1em",
												}}
											></hr>
											<p className="pet-description">
												{postInfo?.description}
											</p>
										</div>
									</div>
								))}
							</form>
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
