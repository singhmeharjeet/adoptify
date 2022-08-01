import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faEnvelope,
	faMobileScreen,
	faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
export default function Info({ userDetails }) {
	return (
		<>
			<div className="info-section">
				<p className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faUser}
					></FontAwesomeIcon>
					{userDetails.firstname ? userDetails.firstname : ""}{" "}
					{userDetails.lastname ? userDetails.lastname : ""}
				</p>
			</div>
			<div className="info-section">
				<p className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faEnvelope}
					></FontAwesomeIcon>
					{userDetails.email}
				</p>
			</div>
			<div className="info-section">
				<p className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faMobileScreen}
					></FontAwesomeIcon>
					{userDetails.phone}
				</p>
			</div>
			<div className="info-section">
				<p className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faMapLocationDot}
					></FontAwesomeIcon>
					{userDetails.address}
				</p>
			</div>
		</>
	);
}
