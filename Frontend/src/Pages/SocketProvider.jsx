import { createContext, useEffect, useState } from "react";
import { Manager } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const api = import.meta.env.VITE_API_BASE_URL;
    const [namespaceSocket, setNamespaceSocket] = useState(null);

    useEffect(() => {
        const socket = new Manager(`${api}/`);
        const nsSocket = socket.socket("/");

        nsSocket.on('connect', () => {
            console.log("Connected with id ", nsSocket.id);
        });

        nsSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        nsSocket.on("error", (err) => {
            console.error("Socket error:", err);
        });

        setNamespaceSocket(nsSocket);

        return () => {
            console.log("Disconnecting socket...");
            nsSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={namespaceSocket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;