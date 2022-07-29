import React from "react";

export default function NavModal({ handleLogout, exit }) {
	



	return (
		<>
			<div className="navModal-overlay" onClick={exit} />
			<div className="navModal">
				<div className="confirm-row">
					Want to Sign Out?
					<button className="button" onClick={handleLogout}>
						Sign Out
					</button>
				</div>
				<div className="confirm-row">
					Go Back to the website
					<button className="button" onClick={exit}>
						Go Back
					</button>
				</div>
			</div>
		</>
	);
}
