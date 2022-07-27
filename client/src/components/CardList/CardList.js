import "./CardList.css";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../global/GlobalContext";
export default function CardList() {
	const { allPosts: list } = useContext(GlobalContext);
	const [filteredList, setFilteredList] = useState([]);

	window.onload = () => {
		document.getElementById("card-list-all-button").focus();
		document.getElementById("card-list-all-button").click();
	}

	useEffect(() => {
		setFilteredList(list);
	}, []);

	const handleBtns = (e) => {
		let pet = e.target.value;

		if (pet === "All") {
			setFilteredList(list);
		} else if (pet === "Dogs") {
			const filtered = list.filter(
				(list) =>
					list.pet_species.toLowerCase() === "dog" || list.pet_species.toLowerCase() === "dogs"
			);

			setFilteredList(filtered);
		} else if (pet === "Cats") {
			const filtered = list.filter(
				(list) =>
					list.pet_species.toLowerCase() === "cat" || list.pet_species.toLowerCase() === "cats"
			);
			setFilteredList(filtered);
		} else {
			const filtered = list.filter(list => 
				list.pet_species.toLowerCase() !== 'dog' && list.pet_species.toLowerCase() !== 'dogs' && 
				list.pet_species.toLowerCase() !== 'cat' &&  list.pet_species.toLowerCase() !== 'cats');
			setFilteredList(filtered);
		}
	};

	return (
		<>
			<div className="card-list-all">
				<div className="display-bar">
					<button
						id="card-list-all-button"
						className="display-bar-btn"
						value="All"
						onClick={handleBtns}
					>
						All
					</button>
					<button
						className="display-bar-btn"
						value="Dogs"
						onClick={handleBtns}
					>
						Dogs
					</button>
					<button
						className="display-bar-btn"
						value="Cats"
						onClick={handleBtns}
					>
						Cats
					</button>
					<button
						className="display-bar-btn"
						value="Others"
						onClick={handleBtns}
					>
						Others
					</button>
				</div>
				<div className="card-list-container">
					<div className="-fx-image-gal">
						{filteredList.map((filteredList) => (
							<div className="-fx-gal-item" key={filteredList.id}>
								<div className="-fx-gal-image-thumb">
									<img
										alt="No Image"
										src={filteredList.images[0]}
										style={{ "max-width": "100%" }}
									/>
								</div>
								<div className="-fx-gal-image-text">
									<ul>
										<li>
											<h2>{filteredList.pet_name}</h2>
										</li>
										<li>
											<p>{filteredList.pet_species}</p>
										</li>
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
