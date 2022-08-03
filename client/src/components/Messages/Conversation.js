import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { useConversations } from "../../Context/Conversations/ConversationsContext";

export default function Conversation({
	selectedConversation,
	selectedContact,
}) {
	const { userDetails } = useGlobalData();
	const { sendMessage } = useConversations();
	const [text, setText] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		sendMessage({
			conversationKey: selectedContact?.conversationKey,
			sender_id: userDetails?.username,
			receiver_id: selectedContact?.username,
			text,
			time_stamp: new Date()?.getTime(),
		});
		setText("");
	}
	function handleChange(e) {
		setText(e.target.value);
	}
	useEffect(
		() => console.log("Update on the front end...", selectedConversation),
		[
			selectedConversation.length,
			selectedContact,
			selectedConversation.sendMessage,
		]
	);
	return (
		<>
			<div className="conversation">
				<div className="allMsgWrap">
					<div className="allMsg">
						{selectedConversation?.map((message, index) => {
							return (
								<Message
									key={index}
									own={
										message.sender_id ===
										userDetails.username
									}
									text={message.text}
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
						value={text}
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
