import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MessagesPage.css";
import NavBar from "../NavBar/NavBar";
import Contacts from "./Contacts";
import Conversation from "./Conversation";
import { useContacts } from "../../Context/Contacts/ContactsContext";
import { useConversations } from "../../Context/Conversations/ConversationsContext";

export default function MessagesPage({ clearPermission }) {
	const navigate = useNavigate();

	const { contacts, createContact } = useContacts();
	const { conversations } = useConversations();
	const [selectedContact, setSelectedContact] = useState({});
	const [selectedConversation, setSelectedConversation] = useState([]);

	if (contacts.length === 0) {
		navigate("/");
	}
	useEffect(() => {
		// It will exist but may be empty
		setSelectedConversation(Object.values(conversations)[0]);
	}, []);

	function handleLogout() {
		clearPermission();
		navigate("/login");
	}

	function handleContactClick(contact) {
		setSelectedContact(contact);
		setSelectedConversation(conversations[contact.conversationKey]);
		console.log("Talking to", selectedContact.firstname, selectedConversation);
	}

	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="messages-container">
				<div className="contacts-container">
					<Contacts
						handleContactClick={handleContactClick}
						allContacts={contacts}
						createContact={createContact}
					/>
				</div>
				<div className="conversation-container">
					<Conversation
						contact={selectedContact}
						selectedConversation={selectedConversation}
					/>
				</div>
			</div>
		</>
	);
}
