import React from "react";
import "./Message.css";

export default function Message({ own }) {
	
	return (
		<>
			<div className={own ? "msgWrap own" : "msgWrap"}>
				<div className={own ? "msg own" : "msg"}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Veritatis id molestias quasi, quae cum dolore
						consequatur deleniti fugiat quidem nisi!
					</p>
				</div>
			</div>
		</>
	);
}
