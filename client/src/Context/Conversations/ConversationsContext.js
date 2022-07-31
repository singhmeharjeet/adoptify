import React, { useContext, useState } from "react";

const ConversationContext = React.createContext();

export function useConversations() {
	return useContext(ConversationContext);
}

export default function ConversationsContexProvider({ children }) {
	const [conversations, setConversations] = useState({});

	function createConversation(contact) {
		if (!(contact.conversationKey in conversations)) {
			setConversations((prevConversations) => {
				return {
					...prevConversations,
					[contact.conversationKey]: [],
				};
			});
		}
	}

	function addMessageToConversation(
		key,
		sender_id,
		receiver_id,
		text,
		time_stamp
	) {
		// console.log("conversations before adding", conversations);
		if (
			key != null &&
			sender_id != null &&
			receiver_id != null &&
			text != null
		) {
			conversations[key].push({
				sender_id,
				reciver_id: receiver_id,
				message: text,
				time_stamp,
			});
		}
		console.log("conversations after adding", conversations);
	}

	return (
		<ConversationContext.Provider
			value={{
				conversations,
				createConversation,
				addMessageToConversation,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
}
