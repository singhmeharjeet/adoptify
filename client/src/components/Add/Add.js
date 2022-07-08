import Form from "../Form/Form";
import "./Add.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { getPermission } from "../utils";
import { BASE_URL } from "../constants";

export default function Add({ clearPermission }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};

	const handleSubmit = async ({ pet_name, pet_species, pet_color, images, description }) => {
		const uName = getPermission();
		await fetch(`${BASE_URL}/addPost`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: uName, pet_name, pet_species, pet_color, images, description}),
		})
			.then((res) => res.json())
			.catch((error) => {
				console.log('error', error)
			});
	}
	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="add-outer">
				<Form handleSubmit={handleSubmit} />
			</div>
		</>
	);
}
