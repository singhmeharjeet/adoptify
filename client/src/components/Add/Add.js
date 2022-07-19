import Form from "../Form/Form";
import "./Add.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function Add({ clearPermission, username }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};

	return (
		<>
			<NavBar handleLogout={handleLogout} username={username} />
			<div className="add-outer">
				<Form username={username} />
			</div>
		</>
	);
}
