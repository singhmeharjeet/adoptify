import React, { useContext, useState } from "react";
// import { useSocket } from "../Socket/SocketContext";

const ConversationContext = React.createContext();

export function useConversations() {
	return useContext(ConversationContext);
}

export default function ConversationsContexProvider({ children }) {
	const [conversations, setConversations] = useState({});
	// const socket = useSocket();

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

	const addMessageToConversation = (
		key,
		sender_id,
		receiver_id,
		text,
		time_stamp
	) => {
		if (
			key != null &&
			sender_id != null &&
			receiver_id != null &&
			text != null
		) {
			// const message = {
			// 	sender_id,
			// 	reciver_id: receiver_id,
			// 	message: text,
			// 	time_stamp,
			// };
			// socket.emit("send-message", key, message);

			conversations[key].push({
				sender_id,
				reciver_id: receiver_id,
				message: text,
				time_stamp,
			});
		}
		// console.log("conversations after adding", conversations);
	};

	// Prevents Unwanted event listeners to our socket
	// useEffect(() => {
	// 	if (socket == null) return;
	// 	socket.on("receive-message", addMessageToConversation);

	// 	return () => socket.off("receive-message");
	// }, [socket, addMessageToConversation]);

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
