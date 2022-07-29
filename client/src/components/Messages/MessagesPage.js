import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import NavBar from "../NavBar/NavBar";
import Contacts from "./Contacts";
import Conversation from "./Conversation";
import { useContacts } from "../../Context/Contacts/ContactsContext";

export default function MessagesPage({ clearPermission }) {
	const [selectedIds, setSelectedIds] = useState([]);
	const navigate = useNavigate();

	const { contacts, createContact } = useContacts();
	console.log("contacts", contacts);

	function handleLogout() {
		clearPermission();
		navigate("/login");
	}

	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="messages-container">
				<div className="contacts-container">
					<Contacts
						allContacts={contacts}
						createContact={createContact}
					/>
				</div>
				<div className="conversation-container">
					<Conversation />
				</div>
			</div>
		</>
	);
}
