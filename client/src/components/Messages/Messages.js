import React from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css"
import NavBar from "../NavBar/NavBar";
import Contacts from "./Contacts";
import Conversation from "./Conversation";

export default function Messages({ clearPermission }) {
	const navigate = useNavigate();

	function handleLogout() {
		clearPermission();
		navigate("/login");
	}
	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="messages-container">
				<div className="contacts-container">
					<Contacts />
				</div>
				<div className="conversation-container">
					<Conversation />
				</div>
			</div>
		</>
	);
}
