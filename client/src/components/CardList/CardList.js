import "./CardList.css";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../global/GlobalContext";

export default function CardList() {
	const { allPosts: list } = useContext(GlobalContext);
	const [filteredList, setFilteredList] = useState(list);

	console.log('list', list);
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
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "95%",
							height: "80%",
							opacity: "0",
						}}
					/>
				</div>
				<div className="display-bar">
					<button
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
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "90%",
							height: "80%",
							color: "#bbb",
						}}
					/>
				</div>
				<div className="card-list-container">
					<div className="-fx-image-gal">
						{filteredList.map((filteredList) => (
							<div className="-fx-gal-item" key={filteredList.id}>
								<div
									className="-fx-gal-image-thumb"
									tabIndex="1"
								>
									<img alt="" src={filteredList.images} />
								</div>
								<div className="-fx-gal-image-text">
									<ul>
										<li>{filteredList.pet_name}</li>
										<li>{filteredList.pet_color}</li>
									</ul>
									<p className="-fx-gal-image-text-description">
										{filteredList.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "90%",
							height: "80%",
							opacity: "0",
						}}
					/>
				</div>
			</div>
		</>
	);
}
