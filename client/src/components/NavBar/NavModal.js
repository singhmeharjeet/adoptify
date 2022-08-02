import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faX,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function NavModal({ handleLogout, exit }) {
	return (
		<>
			<div className="navModal-overlay" onClick={exit} />
			<div className="navModal">
				<div className="modal-confirm-row">
					Want to Sign Out?
					<button className="modal-signout-button" onClick={handleLogout}>
						Sign Out
					</button>
				</div>
				<FontAwesomeIcon
							className="signout-close-icon"
							icon={faX}
							onClick={exit}
				></FontAwesomeIcon>
			</div>
		</>
	);
}
