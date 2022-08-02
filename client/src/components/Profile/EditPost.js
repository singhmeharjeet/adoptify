import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFloppyDisk,
	faX
} from "@fortawesome/free-solid-svg-icons";

export default function EditPost({ postInfo, savePost, cancelEdit }) {
	return (
		<>
			<div className="post">
				<div className="post-image-container">
					<img className="post-picture" src={postInfo.images[0]} />
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
							<FontAwesomeIcon id="post-save-icon"  icon={faFloppyDisk}
								onClick={savePost}>
							</FontAwesomeIcon>

							<FontAwesomeIcon id="post-cancel-icon"  icon={faX}
								onClick={cancelEdit}>
							</FontAwesomeIcon>
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
