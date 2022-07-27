import React from "react";

export default function UsersTable({ allUsers, deleteUserData }) {
	return (
		<div>
			<div className="table-container">
				<table className="users-table">
					<thead className="table-header">
						<tr>
							<th>Username</th>
							<th>Password</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Address</th>
							<th></th>
						</tr>
					</thead>
					{allUsers.map((user) => (
						<tbody key={user?.username}>
							<tr>
								<td>{user.username}</td>
								<td>{user.password}</td>
								<td>{user.firstname + " " + user.lastname}</td>
								<td>{user.phone}</td>
								<td>{user.email}</td>
								<td>{user.address}</td>
								<td>
									<input
										type="button"
										className="delete-button"
										value="Delete"
										onClick={() => {
											deleteUserData(user?.username);
											setTimeout(
												() => window.location.reload(),
												500
											);
										}}
									/>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
