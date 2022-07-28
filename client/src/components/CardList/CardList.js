import "./CardList.css";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../global/GlobalContext";
<<<<<<< HEAD
import Modal from "../Modal/Modal";
import e from "cors";
export default function CardList() {
	const { allPosts: list } = useContext(GlobalContext);
	const [filteredList, setFilteredList] = useState([]);
	const [modalData, setModalData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
=======
import images from "../../images.json";
export default function CardList() {
	const { allPosts: list } = useContext(GlobalContext);
	const [filteredList, setFilteredList] = useState([]);
	const acceptedURLS = [
		"adoptify",
		"media.istockphoto.com",
		"images.unsplash.com",
	];
>>>>>>> df9b5f6818b3258fe89a2cc3af2689401479563f

	function checkForAcceptedURLS(imgURL) {
		// some will megre bool values with ||
		// every will merge bool values with &&
		return acceptedURLS.some((correctLink) => {
			return imgURL.includes(correctLink);
		});
	}
	useEffect(() => {
		setFilteredList(list);
	}, []);

	useEffect(() => {
		if (list.length) {
			handleBtns();
		}
	}, [list]);

	const handleBtns = (e) => {
		let pet = e?.target?.value ?? "All";

		if (pet === "All") {
			setFilteredList(list);
		} else if (pet === "Dogs") {
			const filtered = list.filter(
				(list) =>
					list.pet_species.toLowerCase() === "dog" ||
					list.pet_species.toLowerCase() === "dogs"
			);

			setFilteredList(filtered);
		} else if (pet === "Cats") {
			const filtered = list.filter(
				(list) =>
					list.pet_species.toLowerCase() === "cat" ||
					list.pet_species.toLowerCase() === "cats"
			);
			setFilteredList(filtered);
		} else {
			const filtered = list.filter(
				(list) =>
					list.pet_species.toLowerCase() !== "dog" &&
					list.pet_species.toLowerCase() !== "dogs" &&
					list.pet_species.toLowerCase() !== "cat" &&
					list.pet_species.toLowerCase() !== "cats"
			);
			setFilteredList(filtered);
		}
	};

	const openModal = (data) => {
		setModalData(data)
		setIsOpen(true)
	}


	return (
		<>
			<div className="card-list-all">
				<div className="display-bar">
					<button
						// ref={allRef}
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
<<<<<<< HEAD
						{filteredList.map((filteredList) => (
							<div className="-fx-gal-item" key={filteredList.postid}
							 onClick={()=> openModal(filteredList)}>
=======
						{filteredList.map((filteredList, index) => (
							<div className="-fx-gal-item" key={index}>
>>>>>>> df9b5f6818b3258fe89a2cc3af2689401479563f
								<div className="-fx-gal-image-thumb">
									{checkForAcceptedURLS(
										filteredList.images[0]
									) ? (
										<img
											alt="Pet Image"
											src={filteredList.images[0]}
										/>
									) : (
										<img
											alt="Image Placeholder"
											src={images["image-placeholder"]}
											style={{
												maxWidth: "100%",
												padding: "4em",
											}}
										/>
									)}
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
					{isOpen ? <Modal postInfo={modalData} closeModal={() => setIsOpen(false)}>
						Modal
					</Modal> : ""}
				</div>
			</div>
		</>
	);
}
