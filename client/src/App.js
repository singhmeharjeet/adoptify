import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
	getPermission,
	setPermission,
	clearPermission,
} from "./components/utils";

import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";
import MessagesPage from "./components/Messages/MessagesPage";
import GlobalContextProvider from "./Context/global/GlobalContext";
import ContactsContextProvider from "./Context/Contacts/ContactsContext";

export default function App() {
	const [perm, setPerm] = useState(() => getPermission());

	const clearTokenAtApp = () => {
		setPerm("");
		clearPermission();
	};

	const messagesPage = (
		<ContactsContextProvider>
			{/* <ConversationsContextProvider>
			</ConversationsContextProvider> */}
				<MessagesPage clearPermission={clearTokenAtApp} />
		</ContactsContextProvider>
	);

	return (
		<div className="App">
			<BrowserRouter>
				<GlobalContextProvider>
					<Routes>
						<Route
							exact
							caseSensitive={false}
							path="/login"
							element={
								<Login
									setPermission={setPermission}
									permission={perm}
								/>
							}
						/>
						<Route
							exact
							caseSensitive={false}
							path="/signup"
							element={<SignUp />}
						/>
						<Route
							exact
							caseSensitive={false}
							path="/"
							element={<Home clearPermission={clearTokenAtApp} />}
						/>
						<Route
							exact
							caseSensitive={false}
							path="/add"
							element={
								<Add
									clearPermission={clearTokenAtApp}
									username={perm}
								/>
							}
						/>
						<Route
							caseSensitive={false}
							path="/profile"
							element={
								<Profile clearPermission={clearTokenAtApp} />
							}
						/>
						<Route
							caseSensitive={false}
							path="/admin"
							element={
								<Admin clearPermission={clearTokenAtApp} />
							}
						/>
						<Route
							caseSensitive={false}
							path="/messages"
							element={messagesPage}
						/>
						<Route
							path="*"
							caseSensitive={false}
							element={<PageNotFound />}
						/>
					</Routes>
				</GlobalContextProvider>
			</BrowserRouter>
		</div>
	);
}
