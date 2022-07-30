import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../../Context/Contacts/ContactsContext";
import { useConversations } from "../../Context/Conversations/ConversationsContext";
import { useGlobalData } from "../../Context/global/GlobalContext";
const overlay = {
	position: "fixed",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	backgroundColor: "rgba(0,0,0,0.7)",
	zIndex: 1000,
};

const modal = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#FFF",
	padding: "50px",
	zIndex: 1000,
};

export default function Modal({ postInfo, closeModal }) {
	const navigate = useNavigate();
    const { createContact } = useContacts();
    const { createConversation } = useConversations();
    const { getUserDetailsFromUsername } = useGlobalData();

	function handleMessageClick() {
        const postOwnerDetails = getUserDetailsFromUsername(postInfo.fk_username);
        const newContact = createContact(postOwnerDetails);
        createConversation(newContact);
		navigate("/messages");
	}
	return (
		<>
			<div style={overlay} onClick={closeModal} />
			<div style={modal}>
				<div className="post" key={postInfo?.postid}>
					<div className="post-image-container">
						<img
							className="post-picture"
							src={postInfo.images[0]}
						/>
					</div>
					<div className="post-contents">
						<div className="post-content-upper">
							<div className="post-title">
								<p className="pet-name">{postInfo?.pet_name}</p>
								<p className="pet-species">
									{postInfo?.pet_species}
								</p>
							</div>
							<div className="post-buttons">
								<button
									className="post-edit-button"
									onClick={closeModal}
								>
									CLOSE
								</button>
								<button
									className="post-edit-button"
									onClick={handleMessageClick}
								>
									MESSAGE
								</button>
							</div>
						</div>
						<p className="pet-description">
							{postInfo?.description}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
