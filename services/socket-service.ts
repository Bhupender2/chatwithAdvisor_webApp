import { Socket, io } from "socket.io-client";

let socketInstance: Socket | null = null; // null or socket dono allowed h

export const getSocket = (token: string) => {
  // if connected already return the previous socket
  if (socketInstance && socketInstance.connected) return socketInstance;

  // if not new connection should get build
  socketInstance = io("https://chat.neetadvisor.com", {
    path: "/api/socket",
    transports: ["websocket"],
    auth: { token },
  });
  return socketInstance;
};

// socket disconnected

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

//// Server pe socket ka endpoint kahan hai
// Jaise REST API ka hota hai /api/v1/...
// Socket ka hai /api/socket

// Without path → default "/socket.io" dhundta
// With path → "/api/socket" pe connect karta
