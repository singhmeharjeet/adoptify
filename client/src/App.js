import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {getPermission, setPermission, clearPermission} from "./components/utils"

import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PageNotFound from "./components/PageNotFound/PageNotFound";


export default function App() {
	const [perm, setPerm] = useState(() => getPermission());

	const clearTokenAtApp = () => {
		setPerm('')
		clearPermission()
  	}

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						exact
						caseSensitive={false}
						path="/login"
						element={<Login setPermission={setPermission} />}
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
								<Add clearPermission={clearTokenAtApp} />
						}
					/>
					<Route
						path="*"
						caseSensitive={false}
						element={<PageNotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
