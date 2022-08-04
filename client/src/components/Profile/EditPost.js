import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faX } from "@fortawesome/free-solid-svg-icons";
import { useGlobalData } from "../../Context/global/GlobalContext";

export default function EditPost({ postInfo, savePost, cancelEdit }) {
	const [newPostPic, setNewPostPic] = useState(null);
	const { editPostImage } = useGlobalData();

	const handleNewPicSubmit = async (e) => {
		e.preventDefault();
		editPostImage(newPostPic, postInfo?.fk_username, postInfo?.postid);
	};

	return (
		<>
			<div className="post">
				<div className="post-image-edit-container">
					<img
						className="post-picture"
						src={postInfo.images[0]}
						alt="pet"
					/>
					{/* <input type="file"></input> */}
					<input
						type="file"
						accept=".jpg, .jpeg, .png, .svg"
						onChange={(e) => {
							setNewPostPic(e.target.files[0]);
						}}
					></input>
				</div>
				<div className="post-contents">
					<div className="post-content-upper">
						<div className="post-title">
							<input
								className="pet-name"
								defaultValue={postInfo?.pet_name}
							/>
							<div className="post-species-and-color">
								<input
									className="post-pet-species"
									defaultValue={postInfo?.pet_species}
								/>
								&nbsp;
								<input
									className="post-pet-color"
									defaultValue={postInfo?.pet_color}
								/>
							</div>
						</div>
						<div className="post-buttons">
							<button
								onClick={handleNewPicSubmit}
								type="submit"
								style={{ border: "none" }}
							>
								<FontAwesomeIcon
									id="post-save-icon"
									icon={faFloppyDisk}
									onClick={savePost}
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
