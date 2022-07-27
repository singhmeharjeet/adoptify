import React from "react";

export default function EditPost({ postInfo, savePost, onDelete }) {
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
							<button
								className="post-edit-button"
								onClick={savePost}
							>
								SAVE
							</button>

							<button
								className="post-delete-button"
								value={postInfo?.postid}
								onClick={onDelete}
							>
								DELETE
							</button>
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
