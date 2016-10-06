import http from 'http';
import express from 'express';
import socket_io from 'socket.io';

let app = express();
app.use(express.static('build'));

let server = http.Server(app);
let io = socket_io(server);

server.listen(process.env.PORT || 3000);
