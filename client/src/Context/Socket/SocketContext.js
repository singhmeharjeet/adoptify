import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGlobalData } from "../global/GlobalContext";
const SocketContext = React.createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export default function SocketContextProvider({ children }) {
	const userDetails = useGlobalData();
	const [socket, setSocket] = useState();

	useEffect(() => {
		(async () => {
			console.log("userDetails?.username", userDetails?.username);
			const newSocket = io("http://localhost:5010", {
				query: {
					id: await userDetails?.username,
				},
			});
			setSocket(newSocket);
			socket?.onAny((event, ...args) => {
				console.log(event, args);
			});
			// return () => newSocket?.close();
		})();

	}, [userDetails.username]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}
