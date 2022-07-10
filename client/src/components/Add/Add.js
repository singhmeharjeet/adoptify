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
	
	async function handleSubmit({
		petName,
		petSpecies,
		petColor,
		petImage,
		petDescription,
	}) {
		await fetch(`${BASE_URL}/addPost`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: getPermission(),
				petName,
				petSpecies,
				petColor,
				petImage,
				petDescription,
			}),
		})
			.then((res) => {
				res.json();
			})
			.catch((error) => {
				console.log("error", error);
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
