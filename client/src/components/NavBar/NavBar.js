import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ handleLogout }) {
	const navigate = useNavigate();
	const handleProfile = () => {
		navigate(`/profile`);
	};
	return (
		<>
			<nav className="nav">
				<div className="left">
					<a href="/" className="logo button">
						Adoptify
					</a>
				</div>
				<div className="center">
					<a href="/" className="home button">
						Home
					</a>
					<a href="/add" className="addPost button">
						Add Post
					</a>
					<a onClick={handleProfile} className="addPost button">
						Profile
					</a>
					<a onClick={handleLogout} className="profile button">
						Sign Out
					</a>
				</div>
			</nav>
		</>
	);
}
