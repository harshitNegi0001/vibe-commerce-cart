import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express()
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'*',
        credentials: true
    }
});



io.on('connection',(socket)=>{
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
    });


})