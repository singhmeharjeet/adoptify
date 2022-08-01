import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function PostsTable({ allPosts, deletePostData }) {
	return (
		<div>
			<div className="table-container">
				<table className="users-table">
					<thead className="table-header">
						<tr>
							<th>From</th>
							<th>Pet Name</th>
							<th>Pet Color</th>
							<th>Pet Species</th>
							<th>Pet Description</th>
							<th></th>
						</tr>
					</thead>
					{allPosts.map((post) => (
						<tbody key={post?.postid}>
							<tr>
								<td>{post.fk_username}</td>
								<td>{post.pet_name}</td>
								<td>{post.pet_color}</td>
								<td>{post.pet_species}</td>
								<td>{post.description}</td>
								<td>
									<FontAwesomeIcon
										id="post-table-delete-icon"
										icon={faTrashCan}
										value="Delete"
										onClick={() => {
											deletePostData(post?.postid);
											setTimeout(
												() => window.location.reload(),
												500
											);
										}}
									></FontAwesomeIcon>
									{/* <input
										type="button"
										className="delete-button"
										value="Delete"
										onClick={() => {
											deletePostData(post?.postid);
											setTimeout(
												() => window.location.reload(),
												500
											);
										}}
									/> */}
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
