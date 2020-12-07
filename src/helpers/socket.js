import socketIOClient from "socket.io-client";
import api from "./api"

export const socket = socketIOClient(api.apiUrl);


