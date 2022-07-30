import React from "react";
import images from "../../images.json";
import "./Contacts.css";

export default function Contacts({
	allContacts,
	createContact,
	handleContactClick,
}) {
	return (
		<>
			<div className="contact-search-bar">
				<input type="text" placeholder="Find Contact" />
				{/* <button>Find</button> */}
			</div>
			<div className="contacts">
				{allContacts.map((contact, index) => (
					<div
						onClick={() => handleContactClick(contact, index)}
						className="contact"
						key={index}
					>
						<div className="contact-img">
							{contact.profilepicture ? (
								<img
									src={`${contact.profilepicture}`}
									alt="Contact Image"
								/>
							) : (
								<img
									src={`${images["profile-placeholder"]}`}
									alt="img"
								/>
							)}
						</div>
						<div className="contact-name">{`${contact.firstname} ${contact.lastname}`}</div>
					</div>
				))}
			</div>
		</>
	);
}
