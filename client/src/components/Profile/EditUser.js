import React from 'react'
import "./EditUser.css"
const styling = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
}

const table = {
    width: "100%"
}

export default function EditUser({userData, setUserData}) {
    
    const saveUserDetails = () => {
        let pw = document.getElementById('pw').value;
        let c_pw = document.getElementById('c_pw').value;

        if (pw !== c_pw)
        {
            window.alert("password and cofirmed password are not the same");
            return;
        }
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        let p_num = document.getElementById('p_num').value;
        let address = document.getElementById('address').value;
    }

  return (
    <>
        <div className="card">
            <table style={table}>
                <tbody>
                    <tr>
                        <th>First Name: </th>
                        <td>
                            <input 
                            defaultValue={userData?.firstname} 
                            style={styling}
                            id="fname"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name:</th>
                        <td>
                            <input 
                            defaultValue={userData?.lastname} 
                            style={styling}
                            id="lname"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>
                            <input defaultValue={userData?.phone} 
                            style={styling}
                            id="p_num"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td>
                            <input defaultValue={userData?.address} 
                            style={styling}
                            id="address"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>Password:</th>
                        <td>
                            <input style={styling}
                            id="pw"></input> 
                        </td>
                    </tr>
                    <tr>
                        <th>Confirm Password:</th>
                        <td>
                            <input style={styling}
                            id="c_pw"></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => saveUserDetails()}>save</button>
        </div>
    </>
  )
}
