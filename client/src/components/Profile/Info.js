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
				<div className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faUser}
					></FontAwesomeIcon>
					<div>
						{userDetails.firstname ? userDetails.firstname : ""}{" "}
						{userDetails.lastname ? userDetails.lastname : ""}
					</div>
				</div>
			</div>
			<div className="info-section">
				<div className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faEnvelope}
					></FontAwesomeIcon>
					<div>{userDetails.email}</div>
				</div>
			</div>
			<div className="info-section">
				<div className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faMobileScreen}
					></FontAwesomeIcon>
					<div>{userDetails.phone}</div>
				</div>
			</div>
			<div className="info-section">
				<div className="profile-text">
					<FontAwesomeIcon
						className="profile-icon"
						icon={faMapLocationDot}
					></FontAwesomeIcon>
					<div>{userDetails.address}</div>
				</div>
			</div>
		</>
	);
}
