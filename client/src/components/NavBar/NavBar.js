import React, { useState } from "react";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { useContacts } from "../../Context/Contacts/ContactsContext";
import { Link } from "react-router-dom";
import "./NavBar.css";
import NavModal from "./NavModal";

export default function NavBar({ handleLogout }) {
	const { userDetails } = useGlobalData();
	const { contacts } = useContacts();
	const [confirm, setConfirm] = useState(false);

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
					{contacts.length === 0 ? null : (
						<Link to="/messages" className="addPost button">
							Messages
						</Link>
					)}
					{userDetails?.isadmin ? (
						<Link to="/admin" className="addPost button">
							Admin
						</Link>
					) : null}
					<Link to="/profile" className="addPost button">
						Profile
					</Link>
					<a
						onClick={() => setConfirm(true)}
						className="profile button"
					>
						Sign Out
					</a>
					{confirm ? (
						<NavModal
							handleLogout={handleLogout}
							exit={() => setConfirm(false)}
						/>
					) : (
						""
					)}
				</div>
			</nav>
		</>
	);
}
