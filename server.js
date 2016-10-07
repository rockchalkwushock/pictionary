import http from 'http';
import express from 'express';
import socket_io from 'socket.io';

let app = express();
app.use(express.static('build'));

let server = http.Server(app);
let io = socket_io(server);
let drawerSocketID;
let words = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];

// Randomly choose a word.
// NOTE: refactor with Lodash.
let getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Listen for Client connecting to the server.
io.on('connection', (socket) => {
  console.log('Client connected');
    if(!drawerSocketID) {
      drawerSocketID = socket.id;
      io.to(drawerSocketID).emit('clientAction', {client: 'Drawer'}, getWord());
    } else {
      io.to(socket.id).emit('clientAction', {client: 'Guesser'});
    }

    // Listen for Draw Event.
    socket.on('draw', (position) => {
       socket.broadcast.emit('draw', position);
   });

   // Listen for Guess Event.
   socket.on('guess', (guess) => {
     socket.broadcast.emit('guess', guess);
   });

   // Listen for Client leaving the server.
   socket.on('disconnect', () => {
     console.log('Client disconnected');
   });
});

server.listen(process.env.PORT || 3000);
