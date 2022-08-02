import React, { useContext, useState } from "react";
import { useGlobalData } from "../global/GlobalContext";
const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

export default function ContactsContextProvider({ children }) {
	/* States */
	const [contacts, setContacts] = useState([]);
	const { userDetails: loggedInUserDetails } = useGlobalData();

	/* Helper Functions */
	function isContactCreated(contact) {
		return contacts.find((e) => e.username === contact.username);
	}

	function getConversationKey(receiverDetails) {
		// The key should be alphabetically ordered to make it unique for both the ends (loggedUser, otherUser);
		let key = null;
		if (
			loggedInUserDetails.username.toLowerCase() <
			receiverDetails.username.toLowerCase()
		) {
			key = `${loggedInUserDetails.username}-${receiverDetails.username}`;
		} else {
			key = `${receiverDetails.username}-${loggedInUserDetails.username}`;
		}
		return key;
	}

	/* Provided Functions */
	function createContact(otherUserDetails) {
		if (!isContactCreated(otherUserDetails)) {
			otherUserDetails.conversationKey =
				getConversationKey(otherUserDetails);

			setContacts((prevContacts) => [...prevContacts, otherUserDetails]);

			return otherUserDetails;
		}
	}
	return (
		<ContactsContext.Provider
			value={{
				contacts,
				createContact,
			}}
		>
			{children}
		</ContactsContext.Provider>
	);
}
