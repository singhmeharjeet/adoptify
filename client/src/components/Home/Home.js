import "./Home.css";
import CardList from "../CardList/CardList";
import { useNavigate, Navigate } from "react-router-dom";
import { getPermission } from "../utils";
import NavBar from "../NavBar/NavBar"
export default function Home({clearPermission}) {
	const navigate = useNavigate();
	
	const token = getPermission();
	if (!token) {
		return <Navigate to="/login"></Navigate>;
	}

	function handleLogout() {
		clearPermission();
		navigate("/login");
	};

	return (
		<>
			<NavBar handleLogout={handleLogout} />
			<div className="home-container">
				<div className="home-left"></div>
				<div className="home-center">
					<div className="home-center-heading">find my new pet.</div>
					<CardList />
				</div>
				<div className="home-right"></div>
			</div>
		</>
	);
}
