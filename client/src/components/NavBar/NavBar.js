import React, { useContext } from "react";
import { GlobalContext } from "../../global/GlobalContext";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ handleLogout }) {
	const { userDetails } = useContext(GlobalContext);
	return (
		<>
			<nav className="nav">
				<div className="left">
					<Link to="/" className="logo">
						Adoptify
					</Link>
				</div>
				<div className="center">
					<Link to="/" className="home button">
						Home
					</Link>
					<Link to="/add" className="addPost button">
						Add Post
					</Link>
					<Link to="/messages" className="addPost button">
						Messages
					</Link>
					{userDetails?.isadmin ? (
						<Link to="/admin" className="addPost button">
							Admin
						</Link>
					) : null}
					<Link to="/profile" className="addPost button">
						Profile
					</Link>
					<a onClick={handleLogout} className="profile button">
						Sign Out
					</a>
				</div>
			</nav>
		</>
	);
}
