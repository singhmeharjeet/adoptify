import React from "react";
import Message from "./Message";
export default function Conversation() {
	return (
		<>
			<div className="conversation">
				<div className="allMsgWrap">
					<div className="allMsg">
						<Message own={true} />
						<Message />
						<Message />
						<Message own={true} />
						<Message own={true} />
						<Message own={true} />
						<Message />
						<Message />
						<Message own={true} />
						<Message />
						<Message />
						<Message own={true} />
						<Message own={true} />
						<Message own={true} />
						<Message />
						<Message />
					</div>
				</div>
				<div className="msgInput">
					<textarea name="messageInput" rows="1" ></textarea>
					<button type="submit">Send</button>
				</div>
			</div>
		</>
	);
}
