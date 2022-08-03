import React, { useContext, useState, useEffect } from "react";
import { useSocket } from "../Socket/SocketContext";

const ConversationContext = React.createContext();

export function useConversations() {
	return useContext(ConversationContext);
}

export default function ConversationsContexProvider({ children }) {
	const [conversations, setConversations] = useState({});
	const socket = useSocket();

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
	function sendMessage(payload) {
		// socket.emit("send-message", {
		// 	conversationKey: payload?.conversationKey,
		// 	sender_id: payload?.sender_id,
		// 	receiver_id: payload?.receiver_id,
		// 	text: payload?.text,
		// 	time_stamp: payload?.time_stamp,
		// });
		addMessageToConversation(
			payload?.conversationKey,
			payload?.sender_id,
			payload?.receiver_id,
			payload?.text,
			payload?.time_stamp
		);
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
			conversations[key].push({
				sender_id,
				reciver_id: receiver_id,
				text,
				time_stamp,
			});
		} else {
			console.log("Couldn't add the conversation");
		}
	};

	// Prevents Unwanted event listeners to our socket
	useEffect(() => {
		if (socket == null) return;
		socket.on("receive-message", async (payload) => {
			console.log("response from server", await payload);
			addMessageToConversation(
				payload?.conversationKey,
				payload?.sender_id,
				payload?.receiver_id,
				payload?.text,
				payload?.time_stamp
			);
		});

		return () => socket.off("receive-message");
	}, [socket, addMessageToConversation]);

	return (
		<ConversationContext.Provider
			value={{
				conversations,
				createConversation,
				sendMessage,
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
}
