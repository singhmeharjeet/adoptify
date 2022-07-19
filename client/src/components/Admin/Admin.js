import React, { useState, useEffect} from "react";
import { BASE_URL } from "../constants";
import './Admin.css';

//BUGGED NOT WORKING RN, WILL FIX LATER
//admin page should show all the users in the database, delete certain users
export default function Admin() {

    //work on adding permission check

    const [allUsers, setAllUsers] = useState('');
    useEffect(() => {
        async function getAllUsers(){
            let result = "";
            try {
                const responseJSON = await (
                    await fetch(`${BASE_URL}/admin`, {
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
            setAllUsers(result.rows);
        }
        getAllUsers();
    }, [])
    // console.log(allUsers) 
    let Array = [];
    console.log(allUsers);
    for (var i=0; i<2; i++) {
        console.log(allUsers[i]);
        Array.push(allUsers[i]);
    }
    // console.log(Array)
    // var arr = [];
    // for (var i=0; i<2; i++) {
    //     arr.push(allUsers[i].firstname)
    // }

    //it runs like we expect on the first initial run but if we refresh, we get errors like 
    //'cannot read properties of undefined 
    return(
        <>
        <div>
            {Array.map(user => <h1>{user.firstname}</h1>)} 
        </div>
        
       <h1>Admin Page</h1> 

        </>
    )
}