import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Post({ postInfo, editPost, onDelete }) {
	console.log("postInfo.images[0]", postInfo.images[0]);
	return (
		<>
			<div className="post">
				<div className="post-image-container">
					<img
						className="post-picture"
						src={postInfo.images[0]}
						alt="pet"
						key={postInfo?.postid}
					/>
				</div>
				<div className="post-contents">
					<div className="post-content-upper">
						<div className="post-title">
							<p className="pet-name">{postInfo?.pet_name}</p>
							<p className="pet-species">
								{postInfo?.pet_species} | {postInfo?.pet_color}
							</p>
						</div>
						<div className="post-buttons">
							<FontAwesomeIcon
								id="post-edit-icon"
								icon={faPenToSquare}
								onClick={() => editPost(postInfo?.postid)}
							></FontAwesomeIcon>

							<FontAwesomeIcon
								id="post-delete-icon"
								icon={faTrashCan}
								value={postInfo?.postid}
								onClick={onDelete}
							></FontAwesomeIcon>
						</div>
					</div>
					<p className="pet-description">{postInfo?.description}</p>
				</div>
			</div>
		</>
	);
}
