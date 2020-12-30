import socketIOClient from "socket.io-client";
import api from "./api"
import config from "../config"

export const socket = socketIOClient(config['server-domain']);



