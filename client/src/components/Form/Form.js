import React, { useState } from "react";
import { BASE_URL } from "../constants";
import "./Form.css";
import axios from "axios";

export default function Form({ username }) {
	const [petName, setPetName] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petImage, setPetImage] = useState();
	const [petDescription, setPetDescription] = useState("");

	const [petImageName, setPetImageName] = useState("");
	const [uploadedImage, setUploadedImage] = useState({});

	const onSubmit = async (e) => {
		e.preventDefault();	
		/*
			when petName is empty then	
				if (petName) => returns false, so if block doesn't execute

			when petName is empty, we want to run the if block
				so we need to add 
					if (!petName) => returns true when petname is empty.
		*/
		if (
			!petName ||
			!petSpecies ||
			!petColor ||
			!petImageName ||
			!petImage ||
			!petDescription
		) {
			alert("Please Enter all the values and try again.");
			return;
		}
		

		const formData = new FormData();
		formData.append("username", username);
		formData.append("petName", petName);
		formData.append("petSpecies", petSpecies);
		formData.append("petColor", petColor);
		formData.append("petDescription", petDescription);
		formData.append("petImage", petImage);

		try {
			const res = await axios.post(`${BASE_URL}/addPost`, formData);
			const { imageName, imagePath } = res.data;

			setUploadedImage({ imageName, imagePath });
			console.log("uploadedImage", uploadedImage);
		} catch (err) {
			if (err.response.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err.response.data.msg);
			}
		}
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
												setPetImageName(
													e.target.files[0].name
												);
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
