import http from 'http';
import express from 'express';
import socket_io from 'socket.io';

let app = express();
app.use(express.static('build'));

let server = http.Server(app);
let io = socket_io(server);

// Listen for Client connecting to the server.
io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for Draw Event.
    socket.on('draw', (position) => {
       socket.broadcast.emit('draw', position);
   });

   // Listen for Client leaving the server.
   socket.on('disconnect', () => {
     console.log('Client disconnected');
   });
});

server.listen(process.env.PORT || 3000);
