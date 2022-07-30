import React from "react";
import "./Message.css";

export default function Message({ own, text }) {
	return (
		<>
			<div className={own ? "msgWrap own" : "msgWrap"}>
				<div className={own ? "msg own" : "msg"}>
					<p>{text}</p>
				</div>
			</div>
		</>
	);
}
