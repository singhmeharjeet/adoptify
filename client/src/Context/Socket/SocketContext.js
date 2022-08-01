// import React, { useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useGlobalData } from "../global/GlobalContext";
// const SocketContext = React.createContext();

// export function useSocket() {
// 	return useContext(SocketContext);
// }

// export default function SocketContextProvider({ children }) {
// 	const userDetails = useGlobalData();
// 	const [socket, setSocket] = useState();

// 	useEffect(() => {
// 		const newSocket = io("http://localhost:5000", {
// 			query: {
// 				id: userDetails?.username,
// 			},
// 		});

// 		setSocket(newSocket);

// 		return () => newSocket.close();
// 	}, [userDetails?.username]);

// 	socket?.onAny((event, ...args) => {
// 		console.log(event, args);
// 	});

// 	return (
// 		<SocketContext.Provider value={socket}>
// 			{children}
// 		</SocketContext.Provider>
// 	);
// }
