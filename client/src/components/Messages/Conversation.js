import React, { useState } from "react";
import Message from "./Message";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { useConversations } from "../../Context/Conversations/ConversationsContext";

export default function Conversation({ selectedConversation, contact }) {
	const { userDetails } = useGlobalData();
	const { addMessageToConversation } = useConversations();
	const [msg, setMsg] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		// Sender is always the Logged In user.
		addMessageToConversation(
			contact.conversationKey,
			userDetails.username,
			contact.username,
			msg,
			new Date().getTime()
		);

		setMsg("");
	}
	function handleChange(e) {
		setMsg(e.target.value);
	}
	return (
		<>
			<div className="conversation">
				<div className="allMsgWrap">
					<div className="allMsg">
						{selectedConversation.map((message, index) => {
							return (
								<Message
									key={index}
									own={
										message.sender_id ===
										userDetails.username
									}
									text={message.message}
								/>
							);
						})}
					</div>
				</div>
				<div className="msgInput">
					<textarea
						name="messageInput"
						rows="1"
						placeholder="Enter Your Message"
						value={msg}
						onChange={handleChange}
					></textarea>
					<button type="submit" onClick={handleSubmit}>
						Send
					</button>
				</div>
			</div>
		</>
	);
}
