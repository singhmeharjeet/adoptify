import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faX } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { BASE_URL } from "../constants";

export default function EditPost({ postInfo, savePost, cancelEdit }) {

	const [newPostPic, setNewPostPic] = useState(null);

	const handleNewPicSubmit = async (e) => {
		if (newPostPic !== null) {
			console.log("new post pic: ", newPostPic);
			e.preventDefault();
			const formData = new FormData();
			formData.append("newPostPic", newPostPic);
			formData.append("username", postInfo.fk_username);
			formData.append("postid", postInfo.postid);
			
			try {
				await axios.post(`${BASE_URL}/editPostImage`, formData);
			} catch (err) {
				if (err.response.status === 500) {
					console.log("There was a problem with the server");
				} else {
					console.log(err.response.data.msg); 
				}
			}
		}
	}

	return (
		<>
			<div className="post">
				<div className="post-image-container">
					<img
						className="post-picture" 
						src={postInfo.images[0]}
						alt="pet" 
					/>
					{/* <input type="file"></input> */}
					<input type="file" accept=".jpg, .jpeg, .png, .svg" onChange={(e) => {
						setNewPostPic(e.target.files[0]);
					}}>	
					</input>
				</div>
				<div className="post-contents">
					<div className="post-content-upper">
						<div className="post-title">
							<input
								className="pet-name"
								defaultValue={postInfo?.pet_name}
							/>
							<input
								className="pet-species"
								defaultValue={postInfo?.pet_species}
							/>
						</div>
						<div className="post-buttons">
							<button onClick={handleNewPicSubmit} type="submit" style={{border: "none"}}>
							<FontAwesomeIcon
								id="post-save-icon"
								icon={faFloppyDisk}
								onClick={(e) => savePost(e, uploadedPostImage)}
							></FontAwesomeIcon>
							</button>

							<FontAwesomeIcon
								id="post-cancel-icon"
								icon={faX}
								onClick={cancelEdit}
							></FontAwesomeIcon>
						</div>
					</div>
					<textarea
						id="input-description"
						className="pet-description"
						defaultValue={postInfo?.description}
					></textarea>
				</div>
			</div>
		</>
	);
}
