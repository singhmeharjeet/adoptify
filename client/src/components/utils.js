export function setPermission(userToken) {
	const withoutLiterals = JSON.stringify(userToken).replaceAll('"', '');
	localStorage.setItem("token", withoutLiterals);
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
