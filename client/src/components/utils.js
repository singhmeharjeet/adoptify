export function setPermission(userToken) {
	localStorage.setItem("token", JSON.stringify(userToken));
}

export function getPermission() {
	return localStorage.getItem("token");
	// const tokenString = localStorage.getItem("token");
	// try {
	// 	const userToken = JSON.parse(tokenString);
	// 	return userToken.token;
	// } catch (e) {
	// 	return "";
	// }
}

export function clearPermission() {
	localStorage.setItem("token", "");
}
