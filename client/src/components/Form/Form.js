import React from "react";
import "./Form.css";
export default function Form({handleSubmit}) {


	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");

	return (
		<>
			<div className="background">
				<div className="form-container">
					<div className="screen">
						<div className="screen-body">
							<div className="screen-body-item left">
								<div className="app-title">
									<span>List Your</span>
									<span>Pet</span>
								</div>
							</div>
							<div className="screen-body-item">
								<form
									action="/addPost"
									method="post"
									className="app-form"
								>
									<div className="app-form-group">
										<input
											name="pet_name"
											className="app-form-control"
											placeholder="PET'S NAME"
										/>
									</div>
									<div className="app-form-group">
										<input
											name="pet_species"
											className="app-form-control"
											placeholder="PET'S SPECIES"
										/>
									</div>
									<div className="app-form-group">
										<input
											name="pet_color"
											className="app-form-control"
											placeholder="PET'S COLOR"
										/>
									</div>
									<div className="app-form-group message">
										<textarea
											type="text"
											name="description"
											className="app-form-control"
											placeholder="PET'S DESCRIPTION"
										></textarea>
									</div>
									<div className="app-form-group" id="input">
										<label>Pet's Image</label>
										<input
											name="images"
											type="file"
											accept=".jpg, .jpeg, .png, .svg, .gif"
										/>
									</div>
									<div className="app-form-group-button">
										<button
											type="submit"
											className="app-form-button"
											// onSubmit={(event) => handleSubmit(
											// 	pet_name, pet_species, pet_color, images, description
											// )}
										>
											SEND
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

