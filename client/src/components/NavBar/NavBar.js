import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ handleLogout }) {
	return (
		<>
			<nav className="nav">
				<div className="left">
					<Link to="/" className="logo button">
						Adoptify
					</Link>
				</div>
				<div className="center">
					<Link to="/"className="home button">
						Home
					</Link>
					<Link to="/add" className="addPost button">
						Add Post
					</Link>
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
