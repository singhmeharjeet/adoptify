import React from "react";
import "./NavBar.css";

export default function NavBar({handleLogout}) {
	
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
				</div>
				<div className="right">
					<a onClick={handleLogout} className="profile button">
						Sign Out
					</a>
				</div>
			</nav>
		</>
	);
}
