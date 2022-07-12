import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { useParams, useNavigate} from "react-router-dom"
import NavBar from "../NavBar/NavBar";
import './Profile.css'

export default function Profile({clearPermission}) {
    const navigate = useNavigate();

	const handleLogout = () => {
		clearPermission();
		navigate("/login");
	};
    const { username } = useParams();

    const [myData, setMyData] = useState('');
    useEffect(() => {
    async function getData(username){
        let result = "";
        try {
            const responseJSON = await (
                await fetch(`${BASE_URL}/profile/${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            ).json();
            // if response is sucessful
            result = responseJSON; 
        } catch (error) {
            console.log("error", error);
        }
        setMyData(result.rows[0]);
    }
     getData(username);
  }, [])
    console.log("myData: ", myData)
    return (
        <>
            <NavBar handleLogout={handleLogout}/>
            <div className="profile-container">
                <h1>Profile page</h1>
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
                                opacity: "1",
                            }}
                        />
                    </div>
                <h2>The profile page of {myData.username}</h2>
            </div>

        </>
    );
}