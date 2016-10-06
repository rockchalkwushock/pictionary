import http from 'http';
import express from 'express';
import socket_io from 'socket.io';

let app = express();
app.use(express.static('build'));

let server = http.Server(app);
let io = socket_io(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.broadcast.emit('user connected');

    // Listen for Draw Event.
    socket.on('draw', (position) => {
       socket.broadcast.emit('draw', position);
   });

   // Listen for User Leaving
   socket.on('disconnect', () => {
     console.log('Client disconnected');
     socket.broadcast.emit('user disconnected');
   });
});

server.listen(process.env.PORT || 3000);
