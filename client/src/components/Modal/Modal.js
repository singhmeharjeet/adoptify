import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../../Context/Contacts/ContactsContext";
import { useConversations } from "../../Context/Conversations/ConversationsContext";
import { useGlobalData } from "../../Context/global/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faMessage } from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

const overlay = {
	position: "fixed",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	backgroundColor: "rgba(0,0,0,0.7)",
	zIndex: 1000,
};

export default function Modal({ postInfo, closeModal }) {
	const navigate = useNavigate();
	const { createContact } = useContacts();
	const { createConversation } = useConversations();
	const { getUserDetailsFromUsername, userDetails } = useGlobalData();

	function handleMessageClick() {
		const postOwnerDetails = getUserDetailsFromUsername(
			postInfo.fk_username
		);
		const newContact = createContact(postOwnerDetails);
		createConversation(newContact);
		navigate("/messages");
	}
	return (
		<>
			<div style={overlay} onClick={closeModal} />
			<div className="modal">
				<div className="modalContainer" key={postInfo?.postid}>
					<div className="photoContainer">
						<img
							className="photo"
							src={postInfo.images[0]}
							alt="pet"
						/>
					</div>
					<div className="modalDescription">
						<div className="modal-title">
							<p className="modal-pet-name">
								{postInfo?.pet_name}
							</p>
							<p className="modal-pet-species">
								{postInfo?.pet_species} | {postInfo?.pet_color}
							</p>
						</div>
						<p className="modal-description-header">
							<span className="modal-description">About</span>
						</p>
						<p className="modal-pet-description">
							{postInfo?.description}
						</p>
						<p className="modal-description-header">
							<span className="modal-description">Contact</span>
						</p>
						<div className="modal-contact">
							<div className="modal-description">
								<div>Parent: </div>
								<span>
									{
										getUserDetailsFromUsername(
											postInfo?.fk_username
										)?.firstname
									}
								</span>
							</div>
							<div className="modal-description">
								<div>Phone: </div>
								<span>
									{
										getUserDetailsFromUsername(
											postInfo?.fk_username
										)?.phone
									}
								</span>
							</div>
							<div className="modal-description">
								<div>Email: </div>
								<span>
									{
										getUserDetailsFromUsername(
											postInfo?.fk_username
										)?.username
									}
								</span>
							</div>
						</div>
					</div>
					<div className="modalIcons">
						{postInfo?.fk_username ===
						userDetails.username ? null : (
							<FontAwesomeIcon
								className="modal-message-icon"
								icon={faMessage}
								onClick={handleMessageClick}
							></FontAwesomeIcon>
						)}
						<FontAwesomeIcon
							className="modal-close-icon"
							icon={faX}
							onClick={closeModal}
						></FontAwesomeIcon>
					</div>
				</div>
			</div>
		</>
	);
}
