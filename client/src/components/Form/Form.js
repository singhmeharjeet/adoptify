import React, { useState } from "react";
import "./Form.css";
export default function Form({ handleSubmit }) {
	const [petName, setPetName] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petImage, setPetImage] = useState(null);
	const [petDiscription, setPetDiscription] = useState("");

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
											onChange={(event) => {
												return setPetName(
													event.target.value
												);
											}}
										/>
									</div>
									<div className="app-form-group">
										<input
											name="pet_species"
											className="app-form-control"
											placeholder="PET'S SPECIES"
											onChange={(event) => {
												return setPetSpecies(
													event.target.value
												);
											}}
										/>
									</div>
									<div className="app-form-group">
										<input
											name="pet_color"
											className="app-form-control"
											placeholder="PET'S COLOR"
											onChange={(event) => {
												return setPetColor(
													event.target.value
												);
											}}
										/>
									</div>
									<div className="app-form-group message">
										<textarea
											type="text"
											name="description"
											className="app-form-control"
											placeholder="PET'S DESCRIPTION"
											onChange={(event) => {
												return setPetDiscription(
													event.target.value
												);
											}}
										></textarea>
									</div>
									<div className="app-form-group" id="input">
										<label>Pet's Image</label>
										<input
											name="images"
											type="file"
											accept=".jpg, .jpeg, .png, .svg, .gif"
											onChange={(event) => {
												return setPetImage(
													event.target.files[0]
												);
											}}
										/>
									</div>
									<div className="app-form-group-button">
										<button
											type="submit"
											className="app-form-button"
											onChange={(event) => {
												event.preventDefault();
												handleSubmit(
													petName,
													petSpecies,
													petColor,
													petImage,
													petDiscription
												);
											}}
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
}
