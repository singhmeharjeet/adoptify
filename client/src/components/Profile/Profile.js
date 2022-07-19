import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { useParams, useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import './Profile.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faEnvelope, faMobileScreen, faMapLocationDot} from '@fortawesome/free-solid-svg-icons';


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
            <NavBar handleLogout={handleLogout} username={username}/>
            {/* 
                Front end HTML portion of profile page:
            */}
            <div className = "container">
            <div className = "profile-container">
                <div className = "profile-contents">
                <p className = "profile-greeting">Hi, {myData.firstname} {myData.lastname}!</p>
                <br/>
                <br/>
                <div className = "profile-picture-container">
                    <img className = "profile-picture" src="/sample-pic.jpg"/>
                </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className = "profile-info-container">
                        <div className = "info-section">
                            <p className = "profile-text"> <FontAwesomeIcon className = "profile-icon" icon = {faUser}></FontAwesomeIcon> &nbsp; &nbsp; &nbsp; &nbsp;{myData.firstname} {myData.lastname}</p>
                        </div>
                        <div className = "info-section">
                            <p className = "profile-text"> <FontAwesomeIcon className = "profile-icon" icon = {faEnvelope}></FontAwesomeIcon> &nbsp; &nbsp; &nbsp; &nbsp;{myData.email}</p>
                        </div>
                        <div className = "info-section">             
                            <p className = "profile-text"> <FontAwesomeIcon className = "profile-icon" icon = {faMobileScreen}></FontAwesomeIcon> &nbsp; &nbsp; &nbsp; &nbsp;{myData.phone}</p>
                        </div>
                        <div className = "info-section">             
                            <p className = "profile-text"> <FontAwesomeIcon className = "profile-icon" icon = {faMapLocationDot}></FontAwesomeIcon> &nbsp; &nbsp; &nbsp; &nbsp;{myData.address}</p>
                        </div>
                    </div>
                </div>
                
            {/*
                <h7>Profile of: {myData.username}</h7>
                <div>
                    <p>First Name: {myData.firstname}</p>
                    <p>Last Name: {myData.lastname}</p>
                    <p>Email address: {myData.email}</p>
                    <p>Phone Number: {myData.phone}</p>
                    <label>Profile Picure: </label>
                    <img src={myData.profilepicture} name="pfp"/>
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
                                width: "95%",
                                height: "80%",
                                opacity: "1",
                            }}
                        />
                    </div> */}
                
            </div>
            <div className = "posts-container">
              <p className = "posts-label">My Posts:</p>
              <br/>
              <br/>
                {/* start of posts */}
                <div className = "posts-list">
                    <form method = "post">
                        <div className = "posts"> 
                            <div className = "posts-image-container">
                                <img className = "posts-picture" src="/sample-pic.jpg"/>
                            </div>
                            <div className = "posts-contents">
                                <br/>
                                <div className = "post-buttons">
                                    <input type = "button" className = "edit-button"
                                        value = "EDIT"></input>
                                    &nbsp; &nbsp;
                                    <input type = "button" className = "delete-button"
                                        value = "DELETE"></input>
                                </div>
                                <p className = "pet-name">Rocky</p>
                                <p className = "pet-species">Species: Black Dog</p>
                                <textarea className = "pet-description" rows = "9" cols = "60" value = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." disabled>      
                                </textarea>
                            </div>
                        </div>
                    </form>
                    <br/>
                {/* end of posts */}
                <br/>
                <br/>
                <br/>
                <br/>
                </div>
            </div>
            </div>

        </>
    );
}