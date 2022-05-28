import * as WebSocket from 'ws'
import conn from './socket'

export default function (server) {

    //initialize the WebSocket server instance
    const wss = new WebSocket.Server({
        server: server,
        path: process.env.SOCKET_PATH,
    });

    conn(wss)
}