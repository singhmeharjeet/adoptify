import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import { BASE_URL } from "../constants";
import NavBar from "../NavBar/NavBar";
import './Profile.css';

import axios from 'axios'
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
    console.log("postdetails: ", postsDetails)
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

    const onSubmit = async(e) => {
        e.preventDefault();

        const postId = e.currentTarget.value;
        const formData = new FormData();

        try {
            const res = await axios.delete(`${BASE_URL}/${userDetails.username}/${postId}`, formData);
        } catch (err) {
			if (err) {
				console.log("There was a problem with the server");
			} else {
				console.log("success");
			}
		}
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
							Hi, {userDetails.firstname} {userDetails.lastname}!
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
                {postsDetails.map(postDetails => (
                    <div className="posts-list" key={postDetails.postid}>
                    <form method="post">
                        <div className="posts">
                            <div className="posts-image-container">
                                <img
                                    className="posts-picture"
                                    src="/sample-pic.jpg"
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
                                    <button
                                        type="button"
                                        className="delete-button"
                                        value="DELETE"
                                        onClick={onSubmit}
                                    >DELETE</button>
                                </div>
                                <p className="pet-name">
                                    {postDetails?.pet_name}
                                </p>
                                <p className="pet-species">
                                    {postDetails?.pet_species}
                                </p>
                                <hr
                                    style={{
                                        width: "90%",
                                        color: "#bbb",
                                        "marginbottom": "1em"
                                    }}
                                ></hr>
                                <p className="pet-description">
                                    {postDetails?.description}
                                </p>
                            </div>
                        </div>
                    </form>
                    <br />
                    {/* end of posts */}
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                ))}
                {/* <div className = "posts-list">
                    <form method = "post">
                        <div className = "posts"> 
                            <div className = "posts-image-container">
                                <img className = "posts-picture" src="/sample-pic.jpg"/>
                            </div>
                            <div className = "posts-contents">
                                <br/>
                                <div className = "post-buttons">
                                    <input type = "button" className = "edit-button"
                                        value = "EDIT"></input>
                                    &nbsp; &nbsp;
                                    <input type = "button" className = "delete-button"
                                        value = "DELETE" ></input>
                                </div>
                                <p className = "pet-name">Rocky</p>
                                <p className = "pet-species">Species: Black Dog</p>
                                <textarea className = "pet-description" rows = "9" cols = "60" value = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." disabled>      
                                </textarea>
                            </div>
                        </div>
                    </form>

                    <br/> */}
                {/* end of posts */}
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}
	
			

export default Profile;
