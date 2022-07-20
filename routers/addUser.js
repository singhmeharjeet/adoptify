const express = require("express"),
	router = express.Router();

const pool = require("../database");
const AWS = require('aws-sdk')
const fs = require('fs');

//s3 stuff needed if user is required to upload profile picture AT signup
const s3 = new AWS.S3({
	region: 'us-west-2',
	accessKeyId: 'AKIAQPWQC7WAFUD3JVNS',
	secretAccessKey: '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',
});

module.exports = router.post("/", async (req, res) => {
    const {uFirstName, uLastName, uPhoneNum, uAddress, uEmail, uPassword} = req.body;

    console.log("firstname: ", uFirstName);
    console.log("lastname: ", uLastName);
    console.log("phone: ", uPhoneNum);
    console.log("address: ", uAddress);
    console.log("email: ", uEmail);
    console.log("password: ", uPassword);

    const newUserQ = `INSERT INTO users(username, password, firstname, lastname, profilePicture, phone, email, address, isadmin) VALUES 
    ('${uEmail}', '${uPassword}', '${uFirstName}', '${uLastName}', NULL, '${uPhoneNum}', '${uEmail}', '${uAddress}', false);`
    
    await pool.query(newUserQ);
    console.log("New user added successfully!")

});