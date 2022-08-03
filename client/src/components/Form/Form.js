import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../Context/global/GlobalContext";
import "./Form.css";
//
export default function Form({ username }) {
	const [petName, setPetName] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petImage, setPetImage] = useState();
	const [petDescription, setPetDescription] = useState("");
	const navigate = useNavigate();

	const { addPost } = useGlobalData();

	const onSubmit = async (e) => {
		e.preventDefault();
		const isAdded = addPost(
			username,
			petName,
			petSpecies,
			petColor,
			petDescription,
			petImage
		);
		if (isAdded) navigate("/profile");
	};
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
								<form className="app-form" onSubmit={onSubmit}>
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
											style={{ resize: "none" }}
											name="description"
											className="app-form-control"
											placeholder="PET'S DESCRIPTION"
											onChange={(event) => {
												return setPetDescription(
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
											onChange={(e) => {
												setPetImage(e.target.files[0]);
											}}
										/>
									</div>
									<div className="app-form-group-button">
										<button
											type="submit"
											className="app-form-button"
										>
											POST
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
