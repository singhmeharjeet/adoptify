import React, { useContext, useState } from "react";

const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

const allUsers = [
	{
		username: "msa235@sfu.ca",
		password: "mehar111",
		firstname: "Mehar",
		lastname: "Singh",
		phone: "6042220000",
		email: "msa235@sfu.ca",
		address: "Surrey, BC",
		profilepicture:
			"https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
		isadmin: false,
	},
	{
		username: "matt@gmail.com",
		password: "matt111",
		firstname: "Matt",
		lastname: "Lan",
		phone: "6040000000",
		email: "matt@gmail.com",
		address: "Langley, BC",
		profilepicture:
			"https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
		isadmin: false,
	},
	{
		username: "pug@gmail.com",
		password: "pug111",
		firstname: "Pug",
		lastname: "Man",
		phone: "1234561111",
		email: "pug@gmail.com",
		address: "Delta, BC",
		profilepicture:
			"https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
		isadmin: false,
	},
	{
		username: "sally@gmail.com",
		password: "sally111",
		firstname: "Sally",
		lastname: "Smith",
		phone: "6042221111",
		email: "sally@gmail.com",
		address: "Abbotsford, BC",
		profilepicture:
			"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
		isadmin: false,
	},
	{
		username: "someone@gmail.com",
		password: "someone",
		firstname: "some",
		lastname: "one",
		phone: "9999999999",
		email: "someone@gmail.com",
		address: "60 100ave 59641",
		profilepicture:
			"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
		isadmin: false,
	},
	{
		username: "whoswho@gmail.com",
		password: "password",
		firstname: "whos",
		lastname: "who",
		phone: "3333333334",
		email: "whoswho@gmail.com",
		address: "surrey central",
		profilepicture:
			"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
		isadmin: false,
	},
	{
		username: "bottle@gmail.com",
		password: "lew",
		firstname: "lew",
		lastname: "yang",
		phone: "6046046004",
		email: "bottle@gmail.com",
		address: "guildford",
		profilepicture:
			"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
		isadmin: false,
	},
	{
		username: "streets@gmail.com",
		password: "password",
		firstname: "great",
		lastname: "nice",
		phone: "1234567891",
		email: "streets@gmail.com",
		address: "gulag",
		profilepicture:
			"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
		isadmin: false,
	},
	{
		username: "harry.potter123@gmail.com",
		password: "password123",
		firstname: "Harry",
		lastname: "Potter",
		phone: "778-023-1234",
		email: "harry.potter123@gmail.com",
		address: "Washington Street",
		profilepicture:
			"https://adoptify-posts.s3.us-west-2.amazonaws.com/harry.potter123%40gmail.com-23.jpg",
		isadmin: true,
	},
	{
		username: "abc@abc.com",
		password: "password123",
		firstname: "ta",
		lastname: "ta",
		phone: "1234567890",
		email: "abc@abc.com",
		address: "usa",
		profilepicture: null,
		isadmin: false,
	},
];
export default function ContactsContextProvider({ children }) {
	const [contacts, setContacts] = useState(allUsers);

	function createContact(otherUserDetails) {
		setContacts((prevContacts) => [...prevContacts, otherUserDetails]);
	}
	return (
		<ContactsContext.Provider
			value={{
				contacts,
				createContact,
			}}
		>
			{children}
		</ContactsContext.Provider>
	);
}
