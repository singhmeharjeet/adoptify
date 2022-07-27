import React from 'react'

export default function Post({postInfo, editPost, onDelete}) {
  return (
		<>
			<div className="post" key={postInfo?.postid}>
				<div className="post-image-container">
					<img className="post-picture" src={postInfo.images[0]} />
				</div>
				<div className="post-contents">
					<div className="post-content-upper">
						<div className="post-title">
							<p className="pet-name">{postInfo?.pet_name}</p>
							<p className="pet-species">
								{postInfo?.pet_species}
							</p>
						</div>
						<div className="post-buttons">
							<button
								className="post-edit-button"
								onClick={() => editPost(postInfo?.postid)}
							>
								EDIT
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
					<p className="pet-description">{postInfo?.description}</p>
				</div>
			</div>
		</>
  );
}
