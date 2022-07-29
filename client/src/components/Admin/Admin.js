import React, { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import UsersTable from "./UsersTable";
import PostsTable from "./PostsTable";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faPaw,
	faUsers,
	faShieldDog,
} from "@fortawesome/free-solid-svg-icons";
import "./Admin.css";

export default function Admin({ clearPermission }) {
	const navigate = useNavigate();
	const [showUsers, setShowUsers] = useState(true);
	const { userDetails, allUsers, allPosts, deleteUserData, deletePostData } =
		useContext(GlobalContext);
	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};

	//if they are admin then show, if not redirect back to homepage
	if (userDetails?.isadmin === false) {
		navigate("/");
	}

	//it runs like we expect on the first initial run but if we refresh, we get errors like
	//'cannot read properties of undefined
	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="container">
				<div className="admin-container">
					<div className="menu-container">
						<p className="admin-greeting">Hi, Admin!</p>
						<div className="admin-links">
							<p
								onClick={() => setShowUsers(true)}
							>
								<FontAwesomeIcon
									className="profile-icon"
									icon={faUser}
								></FontAwesomeIcon>
								List of Users
							</p>
							<p
								onClick={() => setShowUsers(false)}
							>
								<FontAwesomeIcon
									className="profile-icon"
									icon={faPaw}
								></FontAwesomeIcon>
								List of Posts
							</p>
						</div>
						<div className="site-info">
							<div className="site-info-header-container">
								<p className="site-info-header">
									<span className="header-bg">Site Info</span>
								</p>
								<p className="site-info-subheader">
									Stay Updated!
								</p>

								<p className="site-info-users-header">
									Total Number of Users
								</p>
								<p>
									<FontAwesomeIcon
										className="site-info-users-icon"
										icon={faUsers}
									></FontAwesomeIcon>
									<span className="num-users">
										{allUsers.length}
									</span>
								</p>

								<p className="site-info-posts-header">
									Total Number of Posts
								</p>
								<p>
									<FontAwesomeIcon
										className="site-info-posts-icon"
										icon={faShieldDog}
									></FontAwesomeIcon>
									<span className="num-posts">
										{allPosts.length}
									</span>
								</p>
							</div>
						</div>
					</div>
					{showUsers ? (
						<div className="users-container">
							<p className="admin-greeting">List of Users</p>
							<UsersTable
								allUsers={allUsers}
								deleteUserData={deleteUserData}
							/>
						</div>
					) : (
						<div className="users-container">
							<p className="admin-greeting">List of Posts</p>
							<PostsTable
								allPosts={allPosts}
								deletePostData={deletePostData}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
